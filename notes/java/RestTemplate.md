## 忽略SSL

```java
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import javax.net.ssl.*;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;

/**
 * 跳过证书验证封装
 */
public class SSL extends SimpleClientHttpRequestFactory {

    @Override
    protected void prepareConnection(HttpURLConnection connection, String httpMethod)
            throws IOException {
        if (connection instanceof HttpsURLConnection) {
            prepareHttpsConnection((HttpsURLConnection) connection);
        }
        super.prepareConnection(connection, httpMethod);
    }

    private void prepareHttpsConnection(HttpsURLConnection connection) {
        connection.setHostnameVerifier(new SkipHostnameVerifier());
        try {
            connection.setSSLSocketFactory(createSslSocketFactory());
        }
        catch (Exception ex) {
            // Ignore
        }
    }

    private SSLSocketFactory createSslSocketFactory() throws Exception {
        SSLContext context = SSLContext.getInstance("TLS");
        context.init(null, new TrustManager[] { new SkipX509TrustManager() },
                new SecureRandom());
        return context.getSocketFactory();
    }

    private class SkipHostnameVerifier implements HostnameVerifier {

        @Override
        public boolean verify(String s, SSLSession sslSession) {
            return true;
        }

    }

    private static class SkipX509TrustManager implements X509TrustManager {

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
        }

        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) {
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) {
        }

    }

}
```

```java
    @Bean
    public RestTemplate restTemplate(ClientHttpRequestFactory factory) {
        return new RestTemplate(factory);
    }

    @Bean
    public ClientHttpRequestFactory simpleClientHttpRequestFactory() {
        SSL factory = new SSL();
        factory.setReadTimeout(30000);
        factory.setConnectTimeout(30000);
        return factory;
    }
```

## POST

```java
HttpEntity<Map<String,Object>> httpEntity = new HttpEntity<>(postData,headers);
HttpEntity<String> o = restTemplate.postForEntity("URL",httpEntity,String.class);
JSONObject jsonObject1 = JSON.parseObject(o.getBody());
```

## GET

```java
HttpEntity<String> requestEntity = new HttpEntity<>(headers);
ResponseEntity<String> resEntity = restTemplate.exchange("URL", HttpMethod.GET, requestEntity, String.class);
JSONObject hostJsonObject = JSON.parseObject(resEntity.getBody());
```

## PUT

```java
URI uri = UriComponentsBuilder.fromUriString("url").build().toUri();
RequestEntity<String> requestEntity = RequestEntity.put(uri)
    .headers(headers)
    .body(jsonObject.toJSONString());
ResponseEntity<String> resEntity = restTemplate.exchange(requestEntity, String.class);
return resEntity.toString();
```

## DELETE

```java
HttpEntity<String> requestEntity = new HttpEntity<>(headers);
ResponseEntity<String> resEntity = restTemplate.exchange("URL", HttpMethod.DELETE, requestEntity, String.class);
HttpStatus httpStatus = resEntity.getStatusCode();
result = httpStatus.is2xxSuccessful();
```
