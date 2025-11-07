import{_ as a,c as n,o as e,a2 as p}from"./chunks/framework.tzhOafNO.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/java/Json.md","filePath":"doc/java/Json.md"}'),t={name:"doc/java/Json.md"};function o(l,s,i,c,r,u){return e(),n("div",null,[...s[0]||(s[0]=[p(`<h2 id="jsonlines" tabindex="-1">jsonlines <a class="header-anchor" href="#jsonlines" aria-label="Permalink to &quot;jsonlines&quot;">​</a></h2><p><a href="https://jsonlines.org/examples/" target="_blank" rel="noreferrer">https://jsonlines.org/examples/</a> 简化表格数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        List&lt;String&gt; resp = Arrays.asList(&quot;aaa&quot;);</span></span>
<span class="line"><span>        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();</span></span>
<span class="line"><span>        try (SequenceWriter seq = context.getObjectMapper().writer().withRootValueSeparator(&quot;\\n&quot;)</span></span>
<span class="line"><span>                .writeValues(byteArrayOutputStream)) {</span></span>
<span class="line"><span>            resp.forEach((Consumer&lt;Object&gt;) s -&gt; {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    seq.write(s);</span></span>
<span class="line"><span>                } catch (IOException e) {</span></span>
<span class="line"><span>                    throw new RuntimeException(e);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());</span></span></code></pre></div><h2 id="json-patch" tabindex="-1">json patch <a class="header-anchor" href="#json-patch" aria-label="Permalink to &quot;json patch&quot;">​</a></h2><p>可以对json中的指定内容进行 crud操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;com.github.java-json-tools&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;json-patch&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;1.13&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   public static class PagePatch {</span></span>
<span class="line"><span>        private String op;</span></span>
<span class="line"><span>        private String path;</span></span>
<span class="line"><span>        private String value;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        PagePatch pagePatch = new PagePatch(&quot;replace&quot;, &quot;/pageNum&quot;, 2);</span></span>
<span class="line"><span>        JsonNode jsonNode1 = objectMapper.readTree(objectMapper.writeValueAsString(Arrays.asList(pagePatch)));</span></span>
<span class="line"><span>        JsonPatch patch = JsonPatch.fromJson(jsonNode1);</span></span>
<span class="line"><span>        JsonNode apply = patch.apply(objectMapper.readTree(body));// 将body: {&quot;pageNum&quot;:&quot;1&quot;,&quot;size&quot;:&quot;100&quot;}中的pageNum修改为2 ,apply结果为 {&quot;pageNum&quot;:&quot;2&quot;,&quot;size&quot;:&quot;100&quot;}</span></span></code></pre></div><h2 id="json-schema" tabindex="-1">json schema <a class="header-anchor" href="#json-schema" aria-label="Permalink to &quot;json schema&quot;">​</a></h2><p>json描述性信息,可以用来校验json</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;com.github.fge&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;json-schema-validator&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;2.2.6&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Test</span></span>
<span class="line"><span>    @SneakyThrows</span></span>
<span class="line"><span>    public void ah1 (){</span></span>
<span class="line"><span>        String schema =&quot;{\\&quot;type\\&quot;:\\&quot;object\\&quot;,\\&quot;required\\&quot;:[\\&quot;type\\&quot;,\\&quot;query\\&quot;],\\&quot;properties\\&quot;:{\\&quot;type\\&quot;:{\\&quot;type\\&quot;:\\&quot;string\\&quot;},\\&quot;query\\&quot;:{\\&quot;type\\&quot;:\\&quot;object\\&quot;}}}&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        String json = &quot;{\\n&quot; +</span></span>
<span class="line"><span>                &quot;    \\&quot;type\\&quot;:\\&quot;com.oneservice.search.lawsuit.query\\&quot;,\\n&quot; +</span></span>
<span class="line"><span>                &quot;    \\&quot;query\\&quot;:{\\n&quot; +</span></span>
<span class="line"><span>                &quot;        \\&quot;creditCode\\&quot;:\\&quot;91110000600001760P\\&quot;\\n&quot; +</span></span>
<span class="line"><span>                &quot;    }\\n&quot; +</span></span>
<span class="line"><span>                &quot;\\n&quot; +</span></span>
<span class="line"><span>                &quot;}&quot;;</span></span>
<span class="line"><span>        ObjectMapper objectMapper = new ObjectMapper();</span></span>
<span class="line"><span>        JsonNode jsonNode1 = objectMapper.readTree(json);</span></span>
<span class="line"><span>        JsonNode jsonNode2 = objectMapper.readTree(schema);</span></span>
<span class="line"><span>        boolean processingReport = JsonSchemaUtil.getProcessingReport(jsonNode1, jsonNode2);</span></span>
<span class="line"><span>        System.out.println(processingReport);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class JsonSchemaUtil {</span></span>
<span class="line"><span>    private final static Logger log = LoggerFactory.getLogger(JsonSchemaUtil.class);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static boolean valid(JsonNode jsonNode, String filePath) throws IOException {</span></span>
<span class="line"><span>        JsonNode schemaNode = getJsonNodeFromFileFix(filePath);</span></span>
<span class="line"><span>        return getProcessingReport(jsonNode,schemaNode);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static JsonNode getJsonNodeFromFile(File file) throws IOException {</span></span>
<span class="line"><span>        return new JsonNodeReader().fromReader(new FileReader(file));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * fix classpath validate</span></span>
<span class="line"><span>     * @param filePath</span></span>
<span class="line"><span>     * @return</span></span>
<span class="line"><span>     * @throws IOException</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private static JsonNode getJsonNodeFromFileFix(String filePath) throws IOException {</span></span>
<span class="line"><span>        InputStreamReader  reader = new InputStreamReader(JsonSchemaUtil.class.getClassLoader().getResourceAsStream(filePath), StandardCharsets.UTF_8);</span></span>
<span class="line"><span>        return new JsonNodeReader().fromReader(reader);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public static boolean getProcessingReport(JsonNode jsonNode, JsonNode schemaNode) {</span></span>
<span class="line"><span>        ProcessingReport report = JsonSchemaFactory.byDefault().getValidator().validateUnchecked(schemaNode, jsonNode);</span></span>
<span class="line"><span>        if (report.isSuccess()) {</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            StringBuilder ms = new StringBuilder();</span></span>
<span class="line"><span>            report.iterator().forEachRemaining(ms::append);</span></span>
<span class="line"><span>            log.error(&quot;JSON Parse Error:{}&quot;,ms);</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="jmespath" tabindex="-1">JMESPath <a class="header-anchor" href="#jmespath" aria-label="Permalink to &quot;JMESPath&quot;">​</a></h2><p>通过jmespath可以轻松的获取json中的指定内容 <a href="https://jmespath.org/" target="_blank" rel="noreferrer">https://jmespath.org/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;io.burt&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;jmespath-jackson&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;0.5.0&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    JmesPath&lt;JsonNode&gt; jmespath = new JacksonRuntime();</span></span>
<span class="line"><span>                    Expression&lt;JsonNode&gt; expression = jmespath.compile(&quot;data.totalPage&quot;);</span></span>
<span class="line"><span>                    JsonNode res = expression.search(objectMapper.readTree(&quot;{\\&quot;data\\&quot;:{\\&quot;totalPage\\&quot;:10}}&quot;));</span></span></code></pre></div>`,17)])])}const g=a(t,[["render",o]]);export{h as __pageData,g as default};
