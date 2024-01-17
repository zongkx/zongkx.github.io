声明式http客户端




```java
package com.zongkx.feign;

import feign.HeaderMap;
import feign.Headers;
import feign.Param;
import feign.RequestLine;

import java.util.Map;

/**
 * @author zongkxc
 */
public interface FeignService {

    @RequestLine("POST /post")
    @Headers("Content-Type: application/json")
    String list(String jsonNode, @HeaderMap Map<String, String> headers);


    @RequestLine("GET /get?name={name}")
    @Headers("Content-Type: application/json")
    String get(@Param("name") String name);
}

```
```java
    @Test
    @SneakyThrows
    public void  ah1(){
        // 使用 OkHttpClient 作为 feign的http客户端
        OkHttpClient okHttpClient = new OkHttpClient();
        // 且改OkHttpClient客户端使用了拦截器
        OkHttpClient build = okHttpClient.newBuilder().addInterceptor(new OkHttp3Interceptor(okHttpClient)).build();
        ObjectMapper objectMapper = new ObjectMapper();
        FeignService target = Feign.builder()
                .errorDecoder(new ExceptionDecoder())//异常解析器
                .logger(new Slf4jLogger())
                .logLevel(Logger.Level.BASIC)
                .decoder(new JacksonDecoder(objectMapper))// jackson
                .encoder(new JacksonEncoder(objectMapper))// jackson
                .client(new feign.okhttp.OkHttpClient(build))// client指定
                .target(FeignService.class, "http://localhost:8080");
        String list = target.list(objectMapper.writeValueAsString(ImmutableMap.of("k", "v")), new HashMap<>());
        System.out.println(list);
    }

    public static class ExceptionDecoder extends ErrorDecoder.Default {
        @Override
        public Exception decode(String methodKey, Response response) {
            Exception decode = super.decode(methodKey, response);
            return new RuntimeException(decode);
        }
    }
```
