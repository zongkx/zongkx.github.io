## jsonlines

[https://jsonlines.org/examples/](https://jsonlines.org/examples/)
简化表格数据

```
        List<String> resp = Arrays.asList("aaa");
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (SequenceWriter seq = context.getObjectMapper().writer().withRootValueSeparator("\n")
                .writeValues(byteArrayOutputStream)) {
            resp.forEach((Consumer<Object>) s -> {
                try {
                    seq.write(s);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
        InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
```

## json patch
可以对json中的指定内容进行 crud操作



```
        <dependency>
            <groupId>com.github.java-json-tools</groupId>
            <artifactId>json-patch</artifactId>
            <version>1.13</version>
        </dependency>
```
```
   public static class PagePatch {
        private String op;
        private String path;
        private String value;
    }
    
    
```
```
        PagePatch pagePatch = new PagePatch("replace", "/pageNum", 2);
        JsonNode jsonNode1 = objectMapper.readTree(objectMapper.writeValueAsString(Arrays.asList(pagePatch)));
        JsonPatch patch = JsonPatch.fromJson(jsonNode1);
        JsonNode apply = patch.apply(objectMapper.readTree(body));// 将body: {"pageNum":"1","size":"100"}中的pageNum修改为2 ,apply结果为 {"pageNum":"2","size":"100"}
```
## json schema
json描述性信息,可以用来校验json



```
        <dependency>
            <groupId>com.github.fge</groupId>
            <artifactId>json-schema-validator</artifactId>
            <version>2.2.6</version>
        </dependency>
```

```
    @Test
    @SneakyThrows
    public void ah1 (){
        String schema ="{\"type\":\"object\",\"required\":[\"type\",\"query\"],\"properties\":{\"type\":{\"type\":\"string\"},\"query\":{\"type\":\"object\"}}}";

        String json = "{\n" +
                "    \"type\":\"com.oneservice.search.lawsuit.query\",\n" +
                "    \"query\":{\n" +
                "        \"creditCode\":\"91110000600001760P\"\n" +
                "    }\n" +
                "\n" +
                "}";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode1 = objectMapper.readTree(json);
        JsonNode jsonNode2 = objectMapper.readTree(schema);
        boolean processingReport = JsonSchemaUtil.getProcessingReport(jsonNode1, jsonNode2);
        System.out.println(processingReport);
    }
```
```
public class JsonSchemaUtil {
    private final static Logger log = LoggerFactory.getLogger(JsonSchemaUtil.class);


    public static boolean valid(JsonNode jsonNode, String filePath) throws IOException {
        JsonNode schemaNode = getJsonNodeFromFileFix(filePath);
        return getProcessingReport(jsonNode,schemaNode);
    }

    private static JsonNode getJsonNodeFromFile(File file) throws IOException {
        return new JsonNodeReader().fromReader(new FileReader(file));
    }

    /**
     * fix classpath validate
     * @param filePath
     * @return
     * @throws IOException
     */
    private static JsonNode getJsonNodeFromFileFix(String filePath) throws IOException {
        InputStreamReader  reader = new InputStreamReader(JsonSchemaUtil.class.getClassLoader().getResourceAsStream(filePath), StandardCharsets.UTF_8);
        return new JsonNodeReader().fromReader(reader);
    }
    public static boolean getProcessingReport(JsonNode jsonNode, JsonNode schemaNode) {
        ProcessingReport report = JsonSchemaFactory.byDefault().getValidator().validateUnchecked(schemaNode, jsonNode);
        if (report.isSuccess()) {
            return true;
        } else {
            StringBuilder ms = new StringBuilder();
            report.iterator().forEachRemaining(ms::append);
            log.error("JSON Parse Error:{}",ms);
            return false;
        }
    }
}
```

## JMESPath

通过jmespath可以轻松的获取json中的指定内容
[https://jmespath.org/](https://jmespath.org/)



```
        <dependency>
            <groupId>io.burt</groupId>
            <artifactId>jmespath-jackson</artifactId>
            <version>0.5.0</version>
        </dependency>
```
```
                    JmesPath<JsonNode> jmespath = new JacksonRuntime();
                    Expression<JsonNode> expression = jmespath.compile("data.totalPage");
                    JsonNode res = expression.search(objectMapper.readTree("{\"data\":{\"totalPage\":10}}"));

```

