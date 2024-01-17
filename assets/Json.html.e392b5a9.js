import{_ as t,o as l,c as o,b as e,d as a,F as p,e as n,a as r,r as i}from"./app.d740ecc1.js";const u={},c=e("h2",{id:"jsonlines",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#jsonlines","aria-hidden":"true"},"#"),n(" jsonlines")],-1),b={href:"https://jsonlines.org/examples/",target:"_blank",rel:"noopener noreferrer"},d=n("https://jsonlines.org/examples/"),m=n(" \u7B80\u5316\u8868\u683C\u6570\u636E"),g=r(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        List&lt;String&gt; resp = Arrays.asList(&quot;aaa&quot;);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (SequenceWriter seq = context.getObjectMapper().writer().withRootValueSeparator(&quot;\\n&quot;)
                .writeValues(byteArrayOutputStream)) {
            resp.forEach((Consumer&lt;Object&gt;) s -&gt; {
                try {
                    seq.write(s);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
        InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="json-patch" tabindex="-1"><a class="header-anchor" href="#json-patch" aria-hidden="true">#</a> json patch</h2><p>\u53EF\u4EE5\u5BF9json\u4E2D\u7684\u6307\u5B9A\u5185\u5BB9\u8FDB\u884C crud\u64CD\u4F5C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        &lt;dependency&gt;
            &lt;groupId&gt;com.github.java-json-tools&lt;/groupId&gt;
            &lt;artifactId&gt;json-patch&lt;/artifactId&gt;
            &lt;version&gt;1.13&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>   public static class PagePatch {
        private String op;
        private String path;
        private String value;
    }
    
    
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        PagePatch pagePatch = new PagePatch(&quot;replace&quot;, &quot;/pageNum&quot;, 2);
        JsonNode jsonNode1 = objectMapper.readTree(objectMapper.writeValueAsString(Arrays.asList(pagePatch)));
        JsonPatch patch = JsonPatch.fromJson(jsonNode1);
        JsonNode apply = patch.apply(objectMapper.readTree(body));// \u5C06body: {&quot;pageNum&quot;:&quot;1&quot;,&quot;size&quot;:&quot;100&quot;}\u4E2D\u7684pageNum\u4FEE\u6539\u4E3A2 ,apply\u7ED3\u679C\u4E3A {&quot;pageNum&quot;:&quot;2&quot;,&quot;size&quot;:&quot;100&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="json-schema" tabindex="-1"><a class="header-anchor" href="#json-schema" aria-hidden="true">#</a> json schema</h2><p>json\u63CF\u8FF0\u6027\u4FE1\u606F,\u53EF\u4EE5\u7528\u6765\u6821\u9A8Cjson</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        &lt;dependency&gt;
            &lt;groupId&gt;com.github.fge&lt;/groupId&gt;
            &lt;artifactId&gt;json-schema-validator&lt;/artifactId&gt;
            &lt;version&gt;2.2.6&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Test
    @SneakyThrows
    public void ah1 (){
        String schema =&quot;{\\&quot;type\\&quot;:\\&quot;object\\&quot;,\\&quot;required\\&quot;:[\\&quot;type\\&quot;,\\&quot;query\\&quot;],\\&quot;properties\\&quot;:{\\&quot;type\\&quot;:{\\&quot;type\\&quot;:\\&quot;string\\&quot;},\\&quot;query\\&quot;:{\\&quot;type\\&quot;:\\&quot;object\\&quot;}}}&quot;;

        String json = &quot;{\\n&quot; +
                &quot;    \\&quot;type\\&quot;:\\&quot;com.oneservice.search.lawsuit.query\\&quot;,\\n&quot; +
                &quot;    \\&quot;query\\&quot;:{\\n&quot; +
                &quot;        \\&quot;creditCode\\&quot;:\\&quot;91110000600001760P\\&quot;\\n&quot; +
                &quot;    }\\n&quot; +
                &quot;\\n&quot; +
                &quot;}&quot;;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode1 = objectMapper.readTree(json);
        JsonNode jsonNode2 = objectMapper.readTree(schema);
        boolean processingReport = JsonSchemaUtil.getProcessingReport(jsonNode1, jsonNode2);
        System.out.println(processingReport);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class JsonSchemaUtil {
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
            log.error(&quot;JSON Parse Error:{}&quot;,ms);
            return false;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="jmespath" tabindex="-1"><a class="header-anchor" href="#jmespath" aria-hidden="true">#</a> JMESPath</h2>`,12),h=n("\u901A\u8FC7jmespath\u53EF\u4EE5\u8F7B\u677E\u7684\u83B7\u53D6json\u4E2D\u7684\u6307\u5B9A\u5185\u5BB9 "),q={href:"https://jmespath.org/",target:"_blank",rel:"noopener noreferrer"},x=n("https://jmespath.org/"),v=r(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        &lt;dependency&gt;
            &lt;groupId&gt;io.burt&lt;/groupId&gt;
            &lt;artifactId&gt;jmespath-jackson&lt;/artifactId&gt;
            &lt;version&gt;0.5.0&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>                    JmesPath&lt;JsonNode&gt; jmespath = new JacksonRuntime();
                    Expression&lt;JsonNode&gt; expression = jmespath.compile(&quot;data.totalPage&quot;);
                    JsonNode res = expression.search(objectMapper.readTree(&quot;{\\&quot;data\\&quot;:{\\&quot;totalPage\\&quot;:10}}&quot;));

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,2);function j(y,N){const s=i("ExternalLinkIcon");return l(),o(p,null,[c,e("p",null,[e("a",b,[d,a(s)]),m]),g,e("p",null,[h,e("a",q,[x,a(s)])]),v],64)}var S=t(u,[["render",j],["__file","Json.html.vue"]]);export{S as default};
