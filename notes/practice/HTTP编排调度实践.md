## 背景
目前遇到了较多从第三方系统 拉取数据，缓存至本地的需求，介于第三方系统各不相同的http调用方式以及不同的auth方式，我尝试写了一套基于json配置化的http编排调度工具，目的在于避免无意义的定制化开发。
## 思路
```json
{   

    "url":{
        "temp":"http://localhost/query?page=1&size=10&id={{id}}&name={{name}}",
        "builder":{
            "id":[1,2,3],
            "name":["a","b"]
        }
    },
    "method":"POST",
    "page":{
        "key":"page",
        "total":"data.totalPage"
    },
    "header":{
        "Content-Type":"application/json"
    },
    
    "body":{
        "temp":{
            "page":1,
            "size":100,
            "name":"{{name}}",
            "id":"{{id}}",
            "date":"{{date}}"
        },
        "builder":{
            "id":[1,2,3],
            "name":["a","b"],
            "date":"select '2020-01-01' as date UNION ALL select '2020-01-02'"
        }
    }

}
```
### 模板引擎
 json 文件中配置` body/header/url `模板
以上文为例，， `url.temp`中配置的`url`模板会在 `url.builder`中所有的条件进行排列组合后 替换掉模板中的占位符，这样可以实现 组合条件以实现请求。
### JMESPath
从响应结果中提取 包括 数据/分页信息等
以上文为例，`page.total`负责 获取请求响应数据的总页码，以实现对分页请求的探测。
### Json Path
对于某些请求的 `body/header`进行 替换
以上文为例，`json path` 负责 对`body`中的页码`pageNum`进行替换。
### Jackson 多态
对不同的配置`json` 进行不同的策略
目前实现了  `http source`和`S3 sink`，利用`jackson` 多态可以方便后续扩展。
### SQL
为了实现接口间潜在的依赖关系，比如B接口的参数需要A接口取到的数据的某个`ID`，并且提高条件`builder`的灵活性，为此引入了sql支持
如上文中的`body.builder.date`
### 上下文
上下文核心目的在于串联 source/sink 逻辑，提供各种source/sink所依赖的执行环境。
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PullContext {
    private OkHttpClient okHttpClient;
    private ObjectMapper objectMapper;
    private MinioClient minioClient;
    private JdbcTemplate jdbcTemplate;
    private JmesPath<JsonNode> jmespath;
    private String jobId;
    private Object sourceData;
    
}
```
### Auth
介于各个系统的auth并不统一，且加密解密算法无法有效统一，考虑利用 okhttp的拦截器功能，在注册bean或者初始化改执行上下文时，添加拦截器，提供auth能力

## 依赖
以下依赖均围绕Jackson/OkHttp3作为基础
```xml
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>

        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
        </dependency>

        <dependency>
          <groupId>com.hubspot.jinjava</groupId>
          <artifactId>jinjava</artifactId>
          <version>2.5.6</version>
        </dependency>
        <dependency>
            <groupId>com.github.java-json-tools</groupId>
            <artifactId>json-patch</artifactId>
            <version>1.13</version>
        </dependency>
        <dependency>
            <groupId>io.burt</groupId>
            <artifactId>jmespath-jackson</artifactId>
            <version>0.5.0</version>
        </dependency>
```

## 源码
### Pull.java
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class Pull {
    private BaseSource source;
    private BaseSink sink;

    public void execute(PullContext context) throws Exception {
        source.execute(context);
        sink.execute(context);
    }
}
```
### BaseSource.java
```java
@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = HttpSource.class, name = HttpSource.TYPE),
})
public abstract class BaseSource {
    private String type;

    public abstract void execute(PullContext context) throws Exception;
}
```
### BaseSink.java
```java
@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = S3Sink.class, name = S3Sink.TYPE),
})
public abstract class BaseSink {
    private String type;

    public abstract void execute(PullContext context) throws Exception;
}
```
### HttpSource.java
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class HttpSource extends BaseSource {
    public static final String TYPE = "http";
    private static final MediaType mediaType = MediaType.get("application/json; charset=utf-8");
    private Temp url;
    private Map header;
    private Temp body;
    private String method;
    private Page page;
    private String resp;

    public void execute(PullContext context) throws Exception {
        boolean GET = this.getMethod().equals("GET");
        List<String> urlList = init(context, this.getUrl().getBuilder(), this.getUrl().getTemp());
        List<String> list;
        if (GET) {
            // GET 请求仅针对 url参数进行 构建
            list = doGet(context, urlList);
        } else {
            // 其余类型的 请求 会对 url/body进行混合构建
            List<String> bodyList = init(context, this.getBody().getBuilder(), this.getBody().getTemp());
            list = doPost(context, urlList, bodyList);
        }
        log.info("http source jobId :{}, response size :{}", context.getJobId(), list.size());
        context.setSourceData(list);

    }

    public List<String> init(PullContext context, Map<String, Object> builder, Object template) throws JsonProcessingException {
        Jinjava jinjava = new Jinjava();
        List<List<String>> result = new ArrayList<>();
        List<String> keys = new ArrayList<>();
        builder.forEach((k, v) -> {
            keys.add(k);
            if (v instanceof List) {
                result.add((List<String>) v);
            } else {
                List<Map<String, Object>> list = context.getJdbcTemplate().queryForList(v.toString());
                List<String> collect = list.stream().map(a -> a.get(k).toString()).collect(Collectors.toList());
                result.add(collect);
            }
        });
        if (result.isEmpty()) {
            return Arrays.asList(template instanceof String ? template.toString() : context.getObjectMapper().writeValueAsString(template));
        } else {
            List<String> bodyOrUrlList = new ArrayList<>();
            List<List<String>> descartes = getDescartes(result);
            for (List<String> des : descartes) {
                Map<String, Object> contextMap = Maps.newHashMap();
                for (int i = 0; i < des.size(); i++) {
                    contextMap.put(keys.get(i), des.get(i));
                }
                String s = context.getObjectMapper().writeValueAsString(template);
                bodyOrUrlList.add(jinjava.render(s, contextMap));
            }
            return bodyOrUrlList;
        }

    }

    public List<String> doPost(PullContext context, List<String> urlList, List<String> bodyList) throws Exception {
        ObjectMapper objectMapper = context.getObjectMapper();
        OkHttpClient okHttpClient = context.getOkHttpClient();
        JmesPath<JsonNode> jmespath = context.getJmespath();
        List<String> list = new ArrayList<>();
        for (String url : urlList) {
            for (String body : bodyList) {
                Request request = new Request.Builder().url(url)
                        .headers(Headers.of(this.getHeader()))
                        .post(RequestBody.create(body, mediaType)).build();
                log.info("jobId:{},this post url:{}, this post body :{}", context.getJobId(), url, body);
                try (Response response = okHttpClient.newCall(request).execute()) {
                    String string = response.body().string();
                    Expression<JsonNode> expression = jmespath.compile(this.getResp());
                    JsonNode res = expression.search(objectMapper.readTree(string));
                    if (StringUtils.hasText(this.getPage().getTotal())) {
                        JsonNode input = objectMapper.readTree(string);
                        JsonNode jsonNode = jmespath.compile(this.getPage().getTotal()).search(input);
                        if (Objects.equals("null", jsonNode.toPrettyString()) || Objects.equals("null", res.toPrettyString())) {
                            log.error("jobId:{},totalPageJemsPath OR responseJemsPath is wrong :{},{},{}", this.getPage().getTotal(),
                                    this.getResp(), string);
                            throw new RuntimeException("totalPageJemsPath OR responseJemsPath is wrong");
                        }
                        int totalPage = jsonNode == null ? 1 : Integer.parseInt(jsonNode.toPrettyString());// 分页接口需要根据返回的total page num 进行 循环调用
                        if (totalPage > 1) {
                            for (int i = 2; i <= totalPage; i++) {
                                //利用 json path对body中的 pageNum进行替换
                                PagePatch pagePatch = new PagePatch("replace", this.getPage().getKeyPath(), i + "");
                                JsonNode jsonNode1 = objectMapper.readTree(objectMapper.writeValueAsString(Arrays.asList(pagePatch)));
                                JsonPatch patch = JsonPatch.fromJson(jsonNode1);
                                JsonNode apply = patch.apply(objectMapper.readTree(body));
                                Request request1 = new Request.Builder().url(url).headers(Headers.of(this.getHeader()))
                                        .post(RequestBody.create(apply.toPrettyString(), mediaType)).build();
                                try (Response response1 = okHttpClient.newCall(request1).execute()) {
                                    String string1 = response1.body().string();
                                    JsonNode res1 = expression.search(objectMapper.readTree(string1));
                                    List list1 = objectMapper.readValue(res1.toPrettyString(), List.class);
                                    if (list1 != null) {
                                        list.addAll(list1);
                                    }
                                }
                            }
                        }
                    }
                    List list1 = objectMapper.readValue(res.toPrettyString(), List.class);
                    if (list1 != null) {
                        list.addAll(list1);
                    }
                }
            }
        }
        return list;
    }

    public List<String> doGet(PullContext context, List<String> urlList) throws Exception {
        ObjectMapper objectMapper = context.getObjectMapper();
        OkHttpClient okHttpClient = context.getOkHttpClient();
        JmesPath<JsonNode> jmespath = context.getJmespath();
        List<String> list = new ArrayList<>();
        for (String url : urlList) {
            Request request = new Request.Builder().url(url).headers(Headers.of(this.getHeader())).get().build();
            try (Response response = okHttpClient.newCall(request).execute()) {
                String string = response.body().string();
                Expression<JsonNode> expression = jmespath.compile(this.getResp());
                JsonNode res = expression.search(objectMapper.readTree(string));
                String total = this.getPage().getTotal();
                if (StringUtils.hasText(total)) {
                    int totalPage;
                    if (!NumberUtils.isParsable(total)) {//如果配置了 jmespath 则根据响应结果进行判断
                        JsonNode input = objectMapper.readTree(string);
                        JsonNode jsonNode = jmespath.compile(this.getPage().getTotal()).search(input);
                        if (Objects.equals("null", jsonNode.toPrettyString()) || Objects.equals("null", res.toPrettyString())) {
                            log.error("jobId:{},totalPageJemsPath OR responseJemsPath is wrong :{},{},{}", this.getPage().getTotal(),
                                    this.getResp(), string);
                            throw new RuntimeException("totalPageJemsPath OR responseJemsPath is wrong");
                        }
                        totalPage = jsonNode == null ? 1 : Integer.parseInt(jsonNode.toPrettyString());// 分页接口需要根据返回的total page num 进行 循环调用
                    } else { // 如果直接配置了总页数，则直接使用
                        totalPage = Integer.parseInt(total);
                    }
                    if (totalPage > 1) {
                        HttpUrl.Builder urlBuilder = HttpUrl.get(url).newBuilder();
                        // 读取初始的pageNo，无论是0还是1，后续请求每次均 +1
                        String pageNo = urlBuilder.build().queryParameter(this.getPage().getKeyPath());
                        for (int i = 1; i < totalPage; i++) {
                            urlBuilder.addQueryParameter(this.getPage().getKeyPath(), String.valueOf(i + Integer.parseInt(pageNo)));
                            Request request1 = new Request.Builder().url(urlBuilder.build()).headers(Headers.of(this.getHeader())).get().build();
                            try (Response response1 = okHttpClient.newCall(request1).execute()) {
                                String string1 = response1.body().string();
                                JsonNode res1 = expression.search(objectMapper.readTree(string1));
                                List list1 = objectMapper.readValue(res1.toPrettyString(), List.class);
                                if (list1 != null) {
                                    list.addAll(list1);
                                }
                            }
                        }
                    }
                }
                List list1 = objectMapper.readValue(res.toPrettyString(), List.class);
                if (list1 != null) {
                    list.addAll(list1);
                }
            }
        }
        return list;
    }

    public <T> List<List<T>> getDescartes(List<List<T>> list) {
        List<List<T>> returnList = new ArrayList<>();
        descartesRecursive(list, 0, returnList, new ArrayList<T>());
        return returnList;
    }

    private <T> void descartesRecursive(List<List<T>> originalList, int position, List<List<T>> returnList, List<T> cacheList) {
        List<T> originalItemList = originalList.get(position);
        for (int i = 0; i < originalItemList.size(); i++) {
            List<T> childCacheList = (i == originalItemList.size() - 1) ? cacheList : new ArrayList<>(cacheList);
            childCacheList.add(originalItemList.get(i));
            if (position == originalList.size() - 1) {
                returnList.add(childCacheList);
                continue;
            }
            descartesRecursive(originalList, position + 1, returnList, childCacheList);
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Page {
        private String keyPath;
        private String total;
    }

    @AllArgsConstructor
    @Data
    @NoArgsConstructor
    public static class Temp {
        private Object temp;
        private Map<String, Object> builder;
    }

    @AllArgsConstructor
    @Data
    @NoArgsConstructor
    public static class PagePatch {
        private String op;
        private String path;
        private String value;
    }
}
```

### S3Sink.java
```java
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class S3Sink extends BaseSink {
    public static final String TYPE = "s3";
    private String bucket;
    private String objectName;

    private String path;
    private String date;


    @Override
    public void execute(PullContext context) throws Exception {
        List<String> resp = (List<String>) context.getSourceData();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (SequenceWriter seq = context.getObjectMapper().writer().withRootValueSeparator("\n")
                .writeValues(byteArrayOutputStream)) {
            resp.forEach((Consumer<Object>) s -> {
                try {
                    Map s1 = (Map) s;
                    s1.put("ts", LocalDateTime.now().toString());
                    seq.write(s1);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
        String format = LocalDateTime.now().format(DateTimeFormatter.ofPattern(this.date));
        String temp = "%s/%s/%s";
        String objectName = String.format(temp, this.path, format, this.objectName);
        InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
        log.info("before s3-put [jobId:{},bucket:{},objectName:{}]", context.getJobId(), this.bucket, objectName);
        context.getMinioClient().putObject(PutObjectArgs.builder().bucket(this.bucket).object(objectName)
                .stream(inputStream, inputStream.available(), -1)
                .build());
        log.info("after s3-put [jobId:{},bucket:{},objectName:{}]", context.getJobId(), this.bucket, objectName);
    }
}
```
### PullContext.java

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PullContext {
    private OkHttpClient okHttpClient;
    private ObjectMapper objectMapper;
    private MinioClient minioClient;
    private JdbcTemplate jdbcTemplate;
    private JmesPath<JsonNode> jmespath;
    private String jobId;
    private Object sourceData;

}
```
