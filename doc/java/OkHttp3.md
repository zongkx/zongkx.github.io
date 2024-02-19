## demo和拦截器

```java
    // 简单的get请求
    @Test
    public void ah1() {
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder().get().url("http://localhost:8080/get?name=123").build();
        try (Response response = okHttpClient.newCall(request).execute()) {
            log.info(response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 简单的post请求  FormBody formBody = new FormBody.Builder().build();
    @Test
    public void ah2() throws JsonProcessingException {
        OkHttpClient okHttpClient = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json"), new ObjectMapper().writeValueAsString(ImmutableMap.of("k","v")));
        Request request = new Request.Builder().addHeader("Content-Type", "application/json").addHeader("token","test")
                .post(requestBody).url("http://localhost:8080/post").build();
        try (Response response = okHttpClient.newCall(request).execute()) {
            log.info(response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //含有拦截器的用法
    @Test
    @SneakyThrows
    public void ah3() {
        OkHttpClient okHttpClient= new OkHttpClient();
        OkHttpClient my =  okHttpClient.newBuilder().addInterceptor(new OkHttp3Interceptor(okHttpClient)).build();
        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json"), new ObjectMapper().writeValueAsString(ImmutableMap.of("k","v")));
        Request request = new Request.Builder().post(requestBody).url("http://localhost:8080/post").build();
        try (Response response = my.newCall(request).execute()) {
            log.info(response.body().string());
        }
    }
```
```java
package com.zongkx.okhttp3;

import lombok.RequiredArgsConstructor;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

@RequiredArgsConstructor
public  class OkHttp3Interceptor implements Interceptor {
    private final OkHttpClient okHttpClient;

    @Override
    public Response intercept( Chain chain) throws IOException {
        Request.Builder builder = chain.request().newBuilder();
        Request request = new Request.Builder().get().url("http://localhost:8080/get?name=aaaa").build();
        try (Response response = okHttpClient.newCall(request).execute()) {
            builder.addHeader("token", "test");
            builder.addHeader("Content-Type", "application/json");
            return chain.proceed(builder.build());
        }
    }
}
```
## 忽略SSL/超时等配置
```java
@Configuration
public class ClientConf {
    public static final X509TrustManager IGNORE_SSL_TRUST_MANAGER_X509 = new X509TrustManager() {
        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) {
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) {
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[]{};
        }
    };

    public static SSLContext sslContext() throws NoSuchAlgorithmException, KeyManagementException {
        SSLContext sslContext = SSLContext.getInstance("SSL");
        sslContext.init(null, new TrustManager[]{IGNORE_SSL_TRUST_MANAGER_X509}, new SecureRandom());
        return sslContext;
    }

    @Bean("okHttpClient")
    @Primary
    public OkHttpClient okHttpClient() {
        return new OkHttpClient().newBuilder()
                .connectTimeout(60, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .callTimeout(60, TimeUnit.SECONDS)
                .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean("httpsOkHttpClient")
    public OkHttpClient httpsOkHttpClient() throws NoSuchAlgorithmException, KeyManagementException {
        return new OkHttpClient()
                .newBuilder()
                .connectTimeout(60, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .callTimeout(60, TimeUnit.SECONDS)
                .sslSocketFactory(sslContext().getSocketFactory(), IGNORE_SSL_TRUST_MANAGER_X509)
                .hostnameVerifier((s, sslSession) -> true)
                .build();
    }

}

```
