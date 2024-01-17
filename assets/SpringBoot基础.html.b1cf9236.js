import{_ as t,o as l,c as r,b as s,d as p,F as o,a,e as n,r as c}from"./app.d740ecc1.js";const i={},u=a(`<p>\u6700\u8FD1\u9879\u76EE\u67B6\u6784\u9700\u8981\u66F4\u65B0\u4E3ASpringBoot\uFF0C\u6240\u4EE5\u91CD\u65B0\u7CFB\u7EDF\u6027\u7684\u5B66\u4E60\u4E00\u6B21\uFF0C\u8FD9\u662F\u6211\u7684\u7B14\u8BB0\u3002(\u57FA\u4E8E2.2.4)</p><h2 id="\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u6982\u8FF0" aria-hidden="true">#</a> \u6982\u8FF0</h2><h3 id="_1-\u521D\u59CB\u5316" tabindex="-1"><a class="header-anchor" href="#_1-\u521D\u59CB\u5316" aria-hidden="true">#</a> 1.\u521D\u59CB\u5316</h3><p>idea\u521D\u59CB\u5316\u7684SpringBoot\u6A21\u5757\u4F1A\u751F\u6210\u7684\u6838\u5FC3\u6587\u4EF6\u4E3Asrc\u76EE\u5F55\u4E0B\u7684\u4E09\u4E2A\u6587\u4EF6\u5939:</p><ul><li><strong>src/main/java</strong>\u4E0B\u7684\u7A0B\u5E8F\u5165\u53E3\uFF1AApplication</li><li><strong>src/main/resources</strong>\u4E0B\u7684\u914D\u7F6E\u6587\u4EF6\uFF1Aapplication.properties</li><li><strong>src/test</strong>/\u4E0B\u7684\u6D4B\u8BD5\u5165\u53E3\uFF1AChapter11ApplicationTests- \u4EE5\u53CApom.xml\u6587\u4EF6,\u4E3B\u8981\u6709\u56DB\u4E2A\u90E8\u5206</li><li><strong>\u9879\u76EE\u5143\u6570\u636E</strong>\uFF1A\u521B\u5EFA\u65F6\u5019\u8F93\u5165\u7684Project Metadata\u90E8\u5206\uFF0C\u4E5F\u5C31\u662FMaven\u9879\u76EE\u7684\u57FA\u672C\u5143\u7D20\uFF0C\u5305\u62EC\uFF1AgroupId\u3001artifactId\u3001version\u3001name\u3001description\u7B49 parent\uFF1A\u7EE7\u627Fspring-boot-starter-parent\u7684\u4F9D\u8D56\u7BA1\u7406\uFF0C\u63A7\u5236\u7248\u672C\u4E0E\u6253\u5305\u7B49\u5185\u5BB9</li><li><strong>dependencies</strong>\uFF1A\u9879\u76EE\u5177\u4F53\u4F9D\u8D56\uFF0C\u8FD9\u91CC\u5305\u542B\u4E86spring-boot-starter-web\u7528\u4E8E\u5B9E\u73B0HTTP\u63A5\u53E3\uFF08\u8BE5\u4F9D\u8D56\u4E2D\u5305\u542B\u4E86Spring MVC\uFF09\uFF1Bspring-boot-starter-test\u7528\u4E8E\u7F16\u5199- \u5355\u5143\u6D4B\u8BD5\u7684\u4F9D\u8D56\u5305\u3002</li><li><strong>build</strong>\uFF1A\u6784\u5EFA\u914D\u7F6E\u90E8\u5206\u3002\u9ED8\u8BA4\u4F7F\u7528\u4E86spring-boot-maven-plugin\uFF0C\u914D\u5408spring-boot-starter-parent\u5C31\u53EF\u4EE5\u628ASpring Boot\u5E94\u7528\u6253\u5305\u6210JAR\u6765\u76F4\u63A5\u8FD0\u884C\u3002</li></ul><h3 id="_2-web" tabindex="-1"><a class="header-anchor" href="#_2-web" aria-hidden="true">#</a> 2.Web</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestController
public class TestController {

    @RequestMapping(&quot;/test&quot;)
    public String index() {
        return &quot;Hello&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_3-tests" tabindex="-1"><a class="header-anchor" href="#_3-tests" aria-hidden="true">#</a> 3.Tests</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest
class DemoApplicationTests {
    private MockMvc mvc;
    @Test
    public void getHello() throws Exception {
        mvc = MockMvcBuilders.standaloneSetup(new TestController()).build();
        mvc.perform(MockMvcRequestBuilders.get(&quot;/test&quot;).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo(&quot;Hello&quot;)));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u6D4B\u8BD5\u5B8C\u6210.</p><h3 id="_4-\u5DE5\u7A0B\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#_4-\u5DE5\u7A0B\u7ED3\u6784" aria-hidden="true">#</a> 4.\u5DE5\u7A0B\u7ED3\u6784</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>com
  +- example
    +- myproject
      +- Application.java//\u53EF\u626B\u63CF\u5230myproject\u4E0B\u7684\u914D\u7F6E\u7C7B\u7B49
      +- domain
         +- Customer.java
         +- CustomerRepository.java
      +- service
	 +- impl
	      +- CustomerServiceImpl.java
         +- CustomerService.java
      +- web
         +- CustomerController.java
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_5-\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_5-\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 5. \u914D\u7F6E\u6587\u4EF6</h3><p>\u5176\u76EE\u5F55\u4E3A:src/main/resources/application.properties\uFF0C\u5728\u6B64\u5904\u5B9A\u4E49\u6570\u636E\u5E93\u3001\u65E5\u5FD7\u3001\u670D\u52A1\u7B49\u914D\u7F6E\u4FE1\u606F\uFF0C\u9664\u6B64\u4E4B\u5916\u4E5F\u53EF\u4EE5\u81EA\u5B9A\u4E49\u914D\u7F6E\u4FE1\u606F\uFF1A author:RaynorZong \u4F7F\u7528\u7684\u65F6\u5019 @Value(&quot;$&quot;),\u518D\u8BE5\u914D\u7F6E\u6587\u4EF6\u4E2D\u81EA\u5B9A\u4E49\u5C5E\u6027\u76F4\u63A5\u4E5F\u53EF\u4EE5\u901A\u8FC7PlaceHolder\u8FDB\u884C\u5F15\u7528,\u6BD4\u5982 desc:author is $</p><h3 id="_6-\u591A\u73AF\u5883\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_6-\u591A\u73AF\u5883\u914D\u7F6E" aria-hidden="true">#</a> 6. \u591A\u73AF\u5883\u914D\u7F6E</h3><p>\u65B0\u589E\u4E09\u4E2A\u914D\u7F6E\u6587\u4EF6\u5728\u76F8\u540C\u76EE\u5F55\u4E0B application-dev.properties\uFF1A\u5F00\u53D1\u73AF\u5883 application-test.properties\uFF1A\u6D4B\u8BD5\u73AF\u5883 application-prod.properties\uFF1A\u751F\u4EA7\u73AF\u5883 \u5728application.properties\u4E2D\u901A\u8FC7spring.profiles.active=dev\u53EF\u4EE5\u8BBE\u7F6E\u5F53\u524D\u73AF\u5883\u4E3A\u5F00\u53D1\u73AF\u5883</p><h3 id="_7-\u52A0\u8F7D\u987A\u5E8F" tabindex="-1"><a class="header-anchor" href="#_7-\u52A0\u8F7D\u987A\u5E8F" aria-hidden="true">#</a> 7. \u52A0\u8F7D\u987A\u5E8F</h3><p>Spring Boot\u4E3A\u4E86\u80FD\u591F\u66F4\u5408\u7406\u7684\u91CD\u5199\u5404\u5C5E\u6027\u7684\u503C\uFF0C\u4F7F\u7528\u4E86\u4E0B\u9762\u8FD9\u79CD\u8F83\u4E3A\u7279\u522B\u7684\u5C5E\u6027\u52A0\u8F7D\u987A\u5E8F\uFF1A</p><ol><li>\u547D\u4EE4\u884C\u4E2D\u4F20\u5165\u7684\u53C2\u6570\u3002</li><li>SPRING_APPLICATION_JSON\u4E2D\u7684\u5C5E\u6027\u3002SPRING_APPLICATION_JSON\u662F\u4EE5JSON\u683C\u5F0F\u914D\u7F6E\u5728\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF\u4E2D\u7684\u5185\u5BB9\u3002</li><li>java:comp/env\u4E2D\u7684JNDI\u5C5E\u6027\u3002</li><li>Java\u7684\u7CFB\u7EDF\u5C5E\u6027\uFF0C\u53EF\u4EE5\u901A\u8FC7System.getProperties()\u83B7\u5F97\u7684\u5185\u5BB9\u3002</li><li>\u64CD\u4F5C\u7CFB\u7EDF\u7684\u73AF\u5883\u53D8\u91CF</li><li>\u901A\u8FC7random.*\u914D\u7F6E\u7684\u968F\u673A\u5C5E\u6027</li><li>\u4F4D\u4E8E\u5F53\u524D\u5E94\u7528jar\u5305\u4E4B\u5916\uFF0C\u9488\u5BF9\u4E0D\u540C\u73AF\u5883\u7684\u914D\u7F6E\u6587\u4EF6\u5185\u5BB9\uFF0C\u4F8B\u5982\uFF1Aapplication-.properties\u6216\u662FYAML\u5B9A\u4E49\u7684\u914D\u7F6E\u6587\u4EF6</li><li>\u4F4D\u4E8E\u5F53\u524D\u5E94\u7528jar\u5305\u4E4B\u5185\uFF0C\u9488\u5BF9\u4E0D\u540C\u73AF\u5883\u7684\u914D\u7F6E\u6587\u4EF6\u5185\u5BB9\uFF0C\u4F8B\u5982\uFF1Aapplication-.properties\u6216\u662FYAML\u5B9A\u4E49\u7684\u914D\u7F6E\u6587\u4EF6</li><li>\u4F4D\u4E8E\u5F53\u524D\u5E94\u7528jar\u5305\u4E4B\u5916\u7684application.properties\u548CYAML\u914D\u7F6E\u5185\u5BB9</li><li>\u4F4D\u4E8E\u5F53\u524D\u5E94\u7528jar\u5305\u4E4B\u5185\u7684application.properties\u548CYAML\u914D\u7F6E\u5185\u5BB9</li><li>\u5728@Configuration\u6CE8\u89E3\u4FEE\u6539\u7684\u7C7B\u4E2D\uFF0C\u901A\u8FC7@PropertySource\u6CE8\u89E3\u5B9A\u4E49\u7684\u5C5E\u6027</li><li>\u5E94\u7528\u9ED8\u8BA4\u5C5E\u6027\uFF0C\u4F7F\u7528SpringApplication.setDefaultProperties\u5B9A\u4E49\u7684\u5185\u5BB9</li></ol><h3 id="_8-\u914D\u7F6E\u6587\u4EF6\u7279\u6027" tabindex="-1"><a class="header-anchor" href="#_8-\u914D\u7F6E\u6587\u4EF6\u7279\u6027" aria-hidden="true">#</a> 8. \u914D\u7F6E\u6587\u4EF6\u7279\u6027</h3>`,20),b=n("List\u7C7B\u578B\u7528 []\u6765\u8868\u793A: spring.my-example.url[0]="),m={href:"http://example.com/",target:"_blank",rel:"noopener noreferrer"},d=n("http://example.com"),k=a(`<p>\u652F\u6301\u9017\u53F7\u5206\u9694: spring.resources.static-locations=classpath:/templates/,classpath:/static/</p><p>\u5C5E\u6027\u7ED1\u5B9A,\u6BD4\u5982List\u7C7B\u578B com.test[0]=test0 com.test[1]=test1</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ApplicationContext context = SpringApplication.run(Application.class, args);
Binder binder = Binder.get(context.getEnvironment());
// \u7ED1\u5B9AList\u914D\u7F6E
List&lt;String&gt; test= binder.bind(&quot;com.test&quot;, Bindable.listOf(String.class)).get();
System.out.println(post);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="web\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#web\u914D\u7F6E" aria-hidden="true">#</a> Web\u914D\u7F6E</h2><h3 id="\u81EA\u52A8\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8\u914D\u7F6E" aria-hidden="true">#</a> \u81EA\u52A8\u914D\u7F6E</h3>`,5),g=n("\u5728SpringBoot\u4E2D\u81EA\u52A8\u914D\u7F6E\u7684WebMvcAutoConfiguration\u7C7B\u4E2D\u5DF2\u7ECF\u5B9E\u73B0\u4E86\u90E8\u5206Mvc\u76F8\u5173\u7684\u914D\u7F6E, \u5B98\u7F51\u53C2\u8003\u5982\u4E0B: "),h={href:"https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc-auto-configuration",target:"_blank",rel:"noopener noreferrer"},v=n("WebMvcAutoConfiguration"),f=n(" The auto-configuration adds the following features on top of Spring\u2019s defaults:"),q=a(`<ul><li>Inclusion of ContentNegotiatingViewResolver and BeanNameViewResolver beans.</li><li>Support for serving static resources, including support for WebJars (covered later in this document)).</li><li>Automatic registration of Converter, GenericConverter, and Formatter beans.</li><li>Support for HttpMessageConverters (covered later in this document).</li><li>Automatic registration of MessageCodesResolver (covered later in this document).</li><li>Static index.html support.</li><li>Custom Favicon support (covered later in this document).</li><li>Automatic use of a ConfigurableWebBindingInitializer bean (covered later in this document).</li></ul><p>\u5982\u679C\u9700\u8981\u81EA\u5B9A\u4E49\u914D\u7F6E\u7684\u65F6\u5019,\u7531\u4E8ESpringBoot 2.0\u4E4B\u540EWebMvcConfigurerAdapter\u5DF2\u7ECF\u8FC7\u65F6,\u901A\u8FC7\u5B9E\u73B0WebMvcConfigurer\u63A5\u53E3,\u53EF\u4EE5\u901A\u8FC7JavaBean\u7684\u65B9\u5F0F\u5BF9SpringMVC\u8FDB\u884C\u5B9A\u5236,\u4E5F\u53EF\u4EE5\u901A\u8FC7\u6CE8\u89E3@EnableWebMvc\u5173\u95EDWebMvcAutoConfiguration.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer{}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="webmvcconfigurer" tabindex="-1"><a class="header-anchor" href="#webmvcconfigurer" aria-hidden="true">#</a> WebMvcConfigurer</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface WebMvcConfigurer {
    default void configurePathMatch(PathMatchConfigurer configurer) {
    }
    default void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
    }
    default void configureAsyncSupport(AsyncSupportConfigurer configurer) {
    }
    default void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    }
    default void addFormatters(FormatterRegistry registry) {
    }
    default void addInterceptors(InterceptorRegistry registry) {
    }
    default void addResourceHandlers(ResourceHandlerRegistry registry) {
    }
    default void addCorsMappings(CorsRegistry registry) {
    }
    default void addViewControllers(ViewControllerRegistry registry) {
    }
    default void configureViewResolvers(ViewResolverRegistry registry) {
    }
    default void addArgumentResolvers(List&lt;HandlerMethodArgumentResolver&gt; resolvers) {
    }
    default void addReturnValueHandlers(List&lt;HandlerMethodReturnValueHandler&gt; handlers) {
    }
    default void configureMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters) {
    }
    default void extendMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters) {
    }
    default void configureHandlerExceptionResolvers(List&lt;HandlerExceptionResolver&gt; resolvers) {
    }
    default void extendHandlerExceptionResolvers(List&lt;HandlerExceptionResolver&gt; resolvers) {
    }
    @Nullable
    default Validator getValidator() {
        return null;
    }
    @Nullable
    default MessageCodesResolver getMessageCodesResolver() {
        return null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>\u5176\u4E2D\u6240\u6709\u65B9\u6CD5\u90FD\u6DFB\u52A0\u4E86default\u5173\u952E\u5B57,\u4ECE\u800C\u5728\u5B9E\u73B0\u8BE5\u63A5\u53E3\u7684\u65F6\u5019\u53EF\u4EE5\u9009\u62E9\u6027\u7684\u4FEE\u6539\u67D0\u4E9B\u5177\u4F53\u7684\u65B9\u6CD5.</p><h3 id="\u9759\u6001\u8D44\u6E90\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u9759\u6001\u8D44\u6E90\u5904\u7406" aria-hidden="true">#</a> \u9759\u6001\u8D44\u6E90\u5904\u7406</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#\u9ED8\u8BA4\u4E3A */**
spring.mvc.static-path-pattern: /static/**
#\u9ED8\u8BA4\u503C\u5982\u4E0B
spring.resources.static-locations:classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u524D\u8005\u7528\u6765\u5339\u914D\u8BF7\u6C42\u8DEF\u5F84,\u5F53\u8DEF\u5F84\u4E2D\u5305\u542B/static/\u7684\u65F6\u5019\u624D\u8FDB\u884C\u5904\u7406,\u5339\u914D\u547D\u4E2D\u540E\u624D\u5B9A\u4F4D\u5230\u5177\u4F53\u7684\u8D44\u6E90,\u6B64\u65F6\u9700\u8981\u540E\u8005\u8FDB\u884C\u4F18\u5148\u7EA7\u7684\u5904\u7406,\u5B83\u8868\u793A\u5728\u7F6E\u9876\u8DEF\u5F84\u4E0B\u7684\u5339\u914D\u987A\u5E8F. \u9664\u6B64\u4E4B\u5916\u4E5F\u53EF\u4EE5\u4F7F\u7528 \u7EE7\u627F WebMvcConfigurerAdapter (\u5DF2\u8FC7\u65F6)\u6216\u8005\u5B9E\u73B0WebMvcConfigurer \u63A5\u53E3(\u63A8\u8350)\u5904\u7406\u9759\u6001\u8D44\u6E90\u7B49\u95EE\u9898 \u4E0B\u9762\u662FWebMvcConfigurer \u63A5\u53E3\u4E2D\u58F0\u660E\u7684\u65B9\u6CD5:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class MvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(&quot;/static/**&quot;)
                .addResourceLocations(&quot;classpath:/static/&quot;);
        registry.addResourceHandler(&quot;/templates/**&quot;)
                .addResourceLocations(&quot;classpath:/templates/&quot;);
        registry.addResourceHandler(&quot;/webjars/** &quot;).addResourceLocations(&quot;classpath:/META-INF/resources/webjars/ &quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="\u6570\u636E\u8F6C\u6362\u5668" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u8F6C\u6362\u5668" aria-hidden="true">#</a> \u6570\u636E\u8F6C\u6362\u5668</h3><p>\u5176\u4E2DaddResourceHandlers\u548CconfigureMessageConverters\u4E4B\u524D\u5747\u5DF2\u7ECF\u4F7F\u7528\u8FC7,\u5206\u522B\u7528\u6765\u5904\u7406\u9759\u6001\u8D44\u6E90\u548CJSON\u89E3\u6790\u5668\u7684\u66FF\u6362\u95EE\u9898. \u5982\u4E0B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    
    @Override
    public void configureMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters) {
        for (int i = converters.size() - 1; i &gt;= 0; i--) {
            if (converters.get(i) instanceof MappingJackson2HttpMessageConverter) {
                converters.remove(i);
            }
        }
        FastJsonHttpMessageConverter fastJsonHttpMessageConverter = new FastJsonHttpMessageConverter();
        FastJsonConfig config = new FastJsonConfig();
        config.setSerializerFeatures(
                SerializerFeature.WriteMapNullValue,        // \u662F\u5426\u8F93\u51FA\u503C\u4E3Anull\u7684\u5B57\u6BB5,\u9ED8\u8BA4\u4E3Afalse,\u6211\u4EEC\u5C06\u5B83\u6253\u5F00
                SerializerFeature.WriteNullListAsEmpty,     // \u5C06Collection\u7C7B\u578B\u5B57\u6BB5\u7684\u5B57\u6BB5\u7A7A\u503C\u8F93\u51FA\u4E3A[]
                SerializerFeature.WriteNullStringAsEmpty,   // \u5C06\u5B57\u7B26\u4E32\u7C7B\u578B\u5B57\u6BB5\u7684\u7A7A\u503C\u8F93\u51FA\u4E3A\u7A7A\u5B57\u7B26\u4E32
                SerializerFeature.WriteNullNumberAsZero,    // \u5C06\u6570\u503C\u7C7B\u578B\u5B57\u6BB5\u7684\u7A7A\u503C\u8F93\u51FA\u4E3A0
                SerializerFeature.WriteDateUseDateFormat,
                SerializerFeature.DisableCircularReferenceDetect    // \u7981\u7528\u5FAA\u73AF\u5F15\u7528
        );
        fastJsonHttpMessageConverter.setFastJsonConfig(config);
        List&lt;MediaType&gt; fastMediaTypes = new ArrayList&lt;&gt;();
        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
        fastJsonHttpMessageConverter.setSupportedMediaTypes(fastMediaTypes);
        converters.add(fastJsonHttpMessageConverter);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><ol><li>\u5176\u4E2DaddResourceHandlers\u4E2D\u53EF\u4EE5\u6DFB\u52A0\u591A\u4E2A\u9759\u6001\u8D44\u6E90\u6620\u5C04,\u533A\u522B\u4E8Eapplication.properties\u4E2D\u7684</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring.resources.static-locations=classpath:/static/,classpath:/templates/
spring.mvc.static-path-pattern=/static/**
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u5B83\u53EF\u4EE5\u6DFB\u52A0\u591A\u4E2Apattern,\u8868\u793A\u5728\u8BF7\u6C42\u8DEF\u5F84\u4E2D\u5339\u914D\u4E0D\u540C\u7684pathPattern\u5BFB\u627E\u4E0D\u540C\u7684\u8DEF\u5F84\u4E0B\u7684\u8D44\u6E90 \u53E6\u5916\u5728SpringBoot\u9ED8\u8BA4\u914D\u7F6E\u7684WebMvcAutoConfiguration\u4E2D\u5DF2\u7ECF\u914D\u7F6E\u4E86\u90E8\u5206\u9759\u6001\u8D44\u6E90\u548C\u9ED8\u8BA4\u7684\u89C6\u56FE\u8DF3\u8F6C &quot;/&quot;---&gt; &quot;index.html&quot; \u6BD4\u5982\u65B0\u5EFA\u4E00\u4E2A\u6A21\u5757,\u5728static\u4E0B\u65B0\u5EFA\u4E00\u4E2Aindex.html,\u8BBF\u95EE\u7AEF\u53E3\u540E\u4F1A\u81EA\u52A8\u8DF3\u8F6C\u5230\u8BE5\u9875\u9762(\u5982\u679C\u5F15\u5165\u4E86spring-boot-starter-thymeleaf,\u5219\u5728templates\u4E0B\u65B0\u5EFAindex.html\u4E5F\u4F1A\u6B63\u5E38\u8BBF\u95EE,\u5176\u4F18\u5148\u7EA7\u5C0F\u4E8Estatic;\u5982\u679C\u6211\u4EEC\u5728Controller\u4E2D\u7F16\u5199\u4E86/\u7684\u8DF3\u8F6C\u4E3Atest.html,\u90A3\u4E48\u5B83\u5C06\u4F1A\u8986\u76D6\u9ED8\u8BA4\u7684index.html,\u4E14\u5982\u679C\u5F15\u5165\u4E86thymeleaf,\u90A3\u4E48test.html\u5FC5\u987B\u5728templates\u76EE\u5F55\u4E0B)\u5176\u4E2D\u9ED8\u8BA4\u914D\u7F6E\u7684addResourceHandlers\u4EE3\u7801\u5982\u4E0B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // \u5982\u679Cspring.resources.addMappings \u4E3Afalse,\u5219\u4E0D\u8FDB\u884C\u5904\u7406
        if (!this.resourceProperties.isAddMappings()) {
            logger.debug(&quot;Default resource handling disabled&quot;);
            return;
        }
        // \u83B7\u5F97\u7F13\u5B58\u65F6\u95F4,\u9ED8\u8BA4\u6CA1\u914D\u7F6E
        Integer cachePeriod = this.resourceProperties.getCachePeriod();
        if (!registry.hasMappingForPattern(&quot;/webjars/**&quot;)) {
            // \u5982\u679CResourceHandlerRegistry\u4E2D\u4E0D\u5305\u542B/webjars/**\u7684\u8DEF\u5F84\u6620\u5C04,
            // \u5219\u6DFB\u52A0 /webjars/** --&gt; classpath:/META-INF/resources/webjars/ \u7684\u6620\u5C04\u89C4\u5219
            customizeResourceHandlerRegistration(
                    registry.addResourceHandler(&quot;/webjars/**&quot;)
                            .addResourceLocations(
                                    &quot;classpath:/META-INF/resources/webjars/&quot;)
                            .setCachePeriod(cachePeriod));
        }
        // \u83B7\u5F97\u9759\u6001\u8D44\u6E90\u7684\u6620\u5C04\u8DEF\u5F84,\u9ED8\u8BA4\u4E3A /**,\u7531\u4E8E\u9ED8\u8BA4\u914D\u7F6E\u7684/**\u4F7F\u7528\u8303\u56F4\u592A\u5C0F,\u66F4\u591A\u7684\u9700\u8981\u81EA\u5DF1\u914D\u7F6E\u9759\u6001\u8D44\u6E90
        String staticPathPattern = this.mvcProperties.getStaticPathPattern();
        if (!registry.hasMappingForPattern(staticPathPattern)) {
            // \u5982\u679CResourceHandlerRegistry\u4E2D\u4E0D\u5305\u542B\u9759\u6001\u8D44\u6E90\u7684\u6620\u5C04\u8DEF\u5F84,
            // \u5219\u6DFB\u52A0 staticPathPattern --&gt; classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/, classpath:/public/ \u7684\u6620\u5C04\u89C4\u5219
            customizeResourceHandlerRegistration(
                    registry.addResourceHandler(staticPathPattern)
                            .addResourceLocations(
                                    this.resourceProperties.getStaticLocations())
                            .setCachePeriod(cachePeriod));
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>\u800Cwebjars\u6D4B\u8BD5\u5982\u4E0B:\u5F15\u5165(webjars-locator\u53EF\u4EE5\u5728\u5F15\u7528\u7684\u65F6\u5019\u5E2E\u52A9\u7701\u53BB\u7248\u672C\u53F7)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	&lt;dependency&gt;
            &lt;groupId&gt;org.webjars&lt;/groupId&gt;
            &lt;artifactId&gt;bootstrap&lt;/artifactId&gt;
            &lt;version&gt;3.3.6&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.webjars&lt;/groupId&gt;
            &lt;artifactId&gt;webjars-locator&lt;/artifactId&gt;
            &lt;version&gt;0.30&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u8BBF\u95EE:http://localhost:8080/webjars/bootstrap/css/bootstrap.min.css\u5373\u53EF\u52A0\u8F7D\u5BF9\u5E94\u7684\u8D44\u6E90\u6587\u4EF6</p><ol><li>\u5176\u4E2DconfigureMessageConverters\u5B9E\u73B0\u4E86\u9ED8\u8BA4\u7684Jackson\u66FF\u6362\u4E3AFastjson.</li></ol><h3 id="\u62E6\u622A\u5668" tabindex="-1"><a class="header-anchor" href="#\u62E6\u622A\u5668" aria-hidden="true">#</a> \u62E6\u622A\u5668</h3><p>\u9996\u5148\u9700\u8981\u5B9E\u73B0\u4E00\u4E2AHandlerInterceptor\u63A5\u53E3\u7684\u62E6\u622A\u5668\u5B9E\u4F8B, \u6BD4\u5982</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Component
@Slf4j
public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        log.info(&quot;\u8BF7\u6C42\u8DEF\u5F84\uFF1A{}&quot;, request.getRequestURI());
//	\u4E1A\u52A1\u5904\u7406
        return true;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>registry\u4E2D\u7684\u65B9\u6CD5:</p><ul><li>addInterceptor:\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684\u62E6\u622A\u5668\u5B9E\u4F8B</li><li>addPathPatterns: \u62E6\u622A\u89C4\u5219</li><li>excludePathPatterns:\u8FC7\u6EE4\u89C4\u5219</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Resource
    MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns(&quot;/**&quot;)
                .excludePathPatterns(&quot;/toLogin&quot;,&quot;/login&quot;,&quot;/js/**&quot;,&quot;/css/**&quot;,&quot;/images/**&quot;);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="\u9875\u9762\u8DF3\u8F6C" tabindex="-1"><a class="header-anchor" href="#\u9875\u9762\u8DF3\u8F6C" aria-hidden="true">#</a> \u9875\u9762\u8DF3\u8F6C</h3><p>\u5927\u90E8\u5206\u9875\u9762\u8DF3\u8F6C\u901A\u8FC7\u624B\u5199Controller\u7C7B\u4E2D\u7684\u65B9\u6CD5\u5B9E\u73B0,\u5BF9\u4E8E\u7C7B\u4F3C\u767B\u5F55\u8DF3\u8F6C\u7B49,\u53EF\u4EE5\u901A\u8FC7\u8BE5\u65B9\u6CD5\u5B9E\u73B0</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController(&quot;/toLogin&quot;).setViewName(&quot;test.html&quot;);
    }
\`\`
\u8FD9\u91CC\u5199\u7684\u5982\u679C\u548CWebMvcAutoConfiguration\u4E2D\u9ED8\u8BA4\u7684 &quot;/&quot;,\u5219\u4F18\u5148\u7EA7\u5927\u4E8E\u9ED8\u8BA4\u914D\u7F6E.
### \u9ED8\u8BA4\u9759\u6001\u8D44\u6E90\u5904\u7406\u5668 configureDefaultServletHandling

\u8FD9\u91CC\u62FF webjar\u6765\u8BF4\u660E:
\u5728Servlet 3 \u4E2D \u6253\u5305\u540E\u7684webjar\u4F1A\u88AB\u653E\u5728 WEB-INF/lib \u76EE\u5F55\u4E0B\uFF0C\u800C Servlet 3 \u5141\u8BB8\u76F4\u63A5\u8BBF\u95EE WEB-INF/lib \u4E0B jar \u4E2D\u7684 /META-INF/resources \u76EE\u5F55\u4E0B\u7684\u8D44\u6E90\u3002\u7B80\u5355\u6765\u8BF4\u5C31\u662F WEB-INF/lib/{\\*.jar}/META-INF/resources \u4E0B\u7684\u8D44\u6E90\u53EF\u4EE5\u88AB\u76F4\u63A5\u8BBF\u95EE\u3002
\u5BF9\u4E8E Servlet 3 \uFF0C\u76F4\u63A5\u4F7F\u7528 http://localhost:8080/webjars/jquery/3.4.0/jquery.js \u5373\u53EF\u8BBF\u95EE\u5230 webjar \u4E2D\u7684 jquery.js \uFF0C\u800C\u4E0D\u7528\u505A\u5176\u5B83\u7684\u914D\u7F6E\u3002
\u5BF9\u4E8ESpringMVC\u6765\u8BF4,\u5176\u5904\u7406\u6D41\u7A0B\u53EA\u662F\u5C06\u5165\u53E3\u5B9E\u73B0\u4E3ADispatcherServlet,\u6240\u6709\u7684\u8BF7\u6C42\u90FD\u4F1A\u6C47\u96C6\u4E8E\u8BE5\u7C7B\uFF0C\u800C\u540E\u5206\u53D1\u7ED9\u4E0D\u540C\u7684\u5904\u7406\u7C7B\u3002\u5982\u679C\u4E0D\u505A\u989D\u5916\u7684\u914D\u7F6E\uFF0C\u662F\u65E0\u6CD5\u8BBF\u95EE\u9759\u6001\u8D44\u6E90\u7684\u3002\u5982\u679C\u60F3\u8BA9 Dispatcher Servlet \u76F4\u63A5\u53EF\u4EE5\u8BBF\u95EE\u5230\u9759\u6001\u8D44\u6E90\uFF0C\u6700\u7B80\u5355\u7684\u65B9\u6CD5\u5F53\u7136\u662F\u4EA4\u7ED9\u9ED8\u8BA4\u7684 Servlet \u3002
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><a href="/Override">@Override </a> public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) { configurer.enable();//\u8FD9\u79CD\u60C5\u51B5\u4E0B Spring MVC \u5BF9\u8D44\u6E90\u7684\u5904\u7406\u4E0E Servlet \u65B9\u5F0F\u76F8\u540C.\u5728\u5173\u95ED\u81EA\u52A8\u914D\u7F6E\u7684\u60C5\u51B5\u4E0B,webjars\u4E5F\u80FD\u88AB\u8BBF\u95EE. }</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u5177\u4F53\u7684\u5185\u5BB9\u53EF\u53C2\u8003
[\u6DF1\u5165 Spring \u7CFB\u5217\u4E4B\u9759\u6001\u8D44\u6E90\u5904\u7406](https://www.v2ex.com/t/312216)
\u8BE6\u7EC6\u7684\u4ECB\u7ECD\u4E86SpringMVC\u7684\u9759\u6001\u8D44\u6E90\u5904\u7406\u7684\u8FC7\u7A0B.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="\u6570\u636E\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5904\u7406" aria-hidden="true">#</a> \u6570\u636E\u5904\u7406</h2><h3 id="\u6570\u636E\u6821\u9A8C" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u6821\u9A8C" aria-hidden="true">#</a> \u6570\u636E\u6821\u9A8C</h3><h4 id="\u601D\u8003" tabindex="-1"><a class="header-anchor" href="#\u601D\u8003" aria-hidden="true">#</a> \u601D\u8003</h4><p>restful \u98CE\u683C\u5F3A\u8C03\u4E86\u8D44\u6E90\u800C\u975E\u52A8\u4F5C,\u8BF7\u6C42\u8DEF\u5F84\u8D44\u6E90\u5316,\u9002\u5408\u5355\u4E00\u8D44\u6E90\u7684\u589E\u5220\u6539\u67E5\u7684\u63A5\u53E3\u98CE\u683C\u7EDF\u4E00,\u4F46\u662F\u4E5F\u5B58\u5728\u4E0D\u7075\u6D3B\u7684\u95EE\u9898,\u6BD4\u5982\u767B\u5F55,\u767B\u5F55\u52A8\u4F5C\u62BD\u8C61\u4E3A\u8D44\u6E90\u53EF\u4EE5\u7406\u89E3\u4E3A\u521B\u5EFAsession: post /session \u663E\u7136\u4E0D\u548C\u903B\u8F91,\u6279\u91CF\u5220\u9664\u4E5F\u6CA1\u529E\u6CD5\u6309\u7167restful\u98CE\u683C\u7B49\u7B49.\u5B9E\u9645\u5F00\u53D1\u4E2D\u9700\u8981\u524D\u540E\u53F0\u7EDF\u4E00\u4E00\u79CD\u98CE\u683C,\u800C\u975E\u5168\u76D8\u6309\u7167restful\u98CE\u683C.</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h4 id="\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56" aria-hidden="true">#</a> \u4F9D\u8D56</h4><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-validation<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="\u6821\u9A8C\u5F02\u5E38\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u6821\u9A8C\u5F02\u5E38\u5904\u7406" aria-hidden="true">#</a> \u6821\u9A8C\u5F02\u5E38\u5904\u7406</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">MethodArgumentNotValidException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResponseBody</span> <span class="token function">handlerMethodArgumentNotValidException</span><span class="token punctuation">(</span><span class="token class-name">MethodArgumentNotValidException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;\u975E\u6CD5\u53C2\u6570\u5F02\u5E38: {} &quot;</span><span class="token punctuation">,</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> errors <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getBindingResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAllErrors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">ObjectError</span><span class="token operator">::</span><span class="token function">getDefaultMessage</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toCollection</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResponseBody</span><span class="token punctuation">(</span><span class="token constant">PARAMS_ERROR</span><span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">PARAMS_ERROR</span><span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>errors<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> demo</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zong<span class="token punctuation">.</span>web</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>common<span class="token punctuation">.</span>collect<span class="token punctuation">.</span></span><span class="token class-name">Lists</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">AllArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>validation<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Validated</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>validation<span class="token punctuation">.</span>constraints<span class="token punctuation">.</span></span><span class="token class-name">Max</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>validation<span class="token punctuation">.</span>constraints<span class="token punctuation">.</span></span><span class="token class-name">Min</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> zongkxc
 * @Description
 * <span class="token keyword">@create</span> 2021/5/31  17:23
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/rest&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestfulController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Data</span>
    <span class="token annotation punctuation">@AllArgsConstructor</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PageRespVO</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">Integer</span> pageNum<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Integer</span> pageSize<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Long</span> total<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Data</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PageVO</span><span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Max</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">40L</span><span class="token punctuation">,</span>message <span class="token operator">=</span> <span class="token string">&quot;\u5206\u9875\u6700\u5927\u503C\u4E0D\u8D85\u8FC740&quot;</span><span class="token punctuation">)</span>
        <span class="token annotation punctuation">@Min</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">,</span>message <span class="token operator">=</span> <span class="token string">&quot;\u5206\u9875\u6700\u5C0F\u503C\u4E0D\u5C0F\u4E8E1&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">private</span> <span class="token class-name">Integer</span> pageSize <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token annotation punctuation">@Min</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">,</span>message <span class="token operator">=</span> <span class="token string">&quot;\u9875\u7801\u6700\u5C0F\u503C\u4E0D\u5C0F\u4E8E1&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">private</span> <span class="token class-name">Integer</span> pageNum <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Data</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u5206\u9875\u67E5\u8BE2</span>
    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">PageRespVO</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">,</span><span class="token annotation punctuation">@Validated</span> <span class="token class-name">PageVO</span> pageVO<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PageRespVO</span><span class="token punctuation">(</span>pageVO<span class="token punctuation">.</span><span class="token function">getPageNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>pageVO<span class="token punctuation">.</span>pageSize<span class="token punctuation">,</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u6839\u636Eid\u83B7\u53D6</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getOne</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u65B0\u589E</span>
    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> user<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u8865\u4E01(\u66F4\u65B0\u90E8\u5206\u5C5E\u6027)</span>
    <span class="token annotation punctuation">@PatchMapping</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">updatePartProperty</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u4FEE\u6539(\u66F4\u65B0\u5168\u90E8\u5C5E\u6027)</span>
    <span class="token annotation punctuation">@PutMapping</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">updateAllProperty</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br></div></div><h3 id="\u7EDF\u4E00\u8FD4\u56DE\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u7EDF\u4E00\u8FD4\u56DE\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> \u7EDF\u4E00\u8FD4\u56DE\u6570\u636E\u7ED3\u6784</h3><p>\u4E3B\u8981\u4E3Acode\u7801/\u8FD4\u56DE\u6570\u636Edata/\u9519\u8BEF\u63D0\u793AerrorMessage/\u7CFB\u7EDF\u65F6\u95F4currentTime</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Class RestResult.java
    private String code;
    private Object data;
    private Object errorMessage;
    private LocalDateTime currentTime;
Enum ErrorMessage.java
    SYSTEM_EXCEPTION (&quot;\u7CFB\u7EDF\u5F02\u5E38&quot;),
    LOGIC_EXCEPTION(&quot;\u4E1A\u52A1\u5F02\u5E38&quot;);
    private String msg;
    ErrorMessage(String msg){
        this.msg = msg;
    }
    public String msg() {
        return this.msg;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u518D\u901A\u8FC7@RestControllerAdvice\u5B9E\u73B0\u8FD4\u56DE\u7ED3\u679C\u7684\u5C01\u88C5,\u8BE5\u6CE8\u89E3\u4E0E@ControllerAdvice\u7684\u533A\u522B\u53EF\u7C7B\u6BD4@RestController\u548C@Controller, \u6B64\u5904\u53EA\u5BF9JSON\u7ED3\u679C\u8FDB\u884C\u5C01\u88C5,\u975EJSON\u7ED3\u679C\u4E0D\u8FDB\u884C\u5904\u7406.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestControllerAdvice
public class RestResultWrapper implements ResponseBodyAdvice&lt;Object&gt; {
    //\u53EF\u6307\u5B9A\u9488\u5BF9\u67D0\u4E9B\u8FD4\u56DE\u503C\u7684\u7C7B\u578B\u624D\u8FDB\u884Crest\u98CE\u683C\u7684\u5C01\u88C5
    @Override
    public boolean supports(MethodParameter returnType, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; converterType) {
          Method returnTypeMethod = returnType.getMethod();
          if (returnTypeMethod != null) {
               /////\u5904\u7406
               return  false;
          }
	  return true;
    }
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (MediaType.IMAGE_JPEG.getType().equalsIgnoreCase(selectedContentType.getType())) {
            return body;//\u53EF\u6839\u636E\u5B9E\u9645\u9700\u6C42\u9009\u62E9\u662F\u5426\u5305\u88C5\u8FD4\u56DE\u7684\u7ED3\u679C
        }
        if (body instanceof RestResult) {
            return body;//\u5982\u679C\u6570\u636E\u5DF2\u7ECF\u5305\u88C5\u8FC7,\u5219\u76F4\u63A5\u8FD4\u56DE
        }
        return new RestResult(&quot;1&quot;, body, &quot;&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="\u7EDF\u4E00\u5F02\u5E38\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u7EDF\u4E00\u5F02\u5E38\u5904\u7406" aria-hidden="true">#</a> \u7EDF\u4E00\u5F02\u5E38\u5904\u7406</h3><p>\u5728\u6CA1\u6709\u5F02\u5E38\u7684\u60C5\u51B5\u4E0B,\u7EDF\u4E00\u8FD4\u56DE\u7684\u7ED3\u6784\u4E3ARestResult,\u51FA\u73B0\u7CFB\u7EDF\u5F02\u5E38\u6216\u8005\u4E1A\u52A1\u5F02\u5E38\u7684\u65F6\u5019,\u9700\u8981\u5168\u5C40\u5F02\u5E38\u5904\u7406,\u540C\u65F6\u5BF9RestResult\u52A0\u5DE5\u4E00\u4E0B. \u9996\u5148\u9700\u8981\u58F0\u660E\u4E00\u4E2A\u4E1A\u52A1\u5F02\u5E38\u7C7B,\u7EE7\u627FRuntimeException.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Data
public class LogicException extends RuntimeException{
    private String errorMsg;
    private String code;
    private LogicException(String errorMsg) {
        super(errorMsg);
        this.code = errorMsg.substring(0, 1);
        this.errorMsg = errorMsg.substring(2);
    }
    public static LogicException le(String errorMsg) {
        return new LogicException(errorMsg);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u63A5\u4E0B\u6765\u662F\u5168\u5C40\u5F02\u5E38\u5904\u7406\u7C7B,\u9700\u8981@ControllerAdvice\u6CE8\u89E3,\u5728\u5BF9\u5176\u4E2D\u7684\u65B9\u6CD5\u6DFB\u52A0\u6CE8\u89E3: [[@ExceptionHandler(value ](/ExceptionHandler(value ) ](/ExceptionHandler(value ) = Exception.class),\u5373\u53EF\u5B9E\u73B0\u5F02\u5E38\u7684\u5904\u7406,\u5F53\u7136\u6B64\u5904\u4E5F\u53EF\u4EE5\u662FMyException.class,\u901A\u8FC7\u4E0D\u540C\u7684\u65B9\u6CD5\u5B9E\u73B0\u5BF9\u4E0D\u540C\u7C7B\u578B\u5F02\u5E38\u7684\u5904\u7406.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Log
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Object logicExceptionHandler(HttpServletRequest request, Exception e, HttpServletResponse response) {
        RestResult result = new RestResult(&quot;-1&quot;, e.getMessage(), ErrorMessage.SYSTEM_EXCEPTION.msg());
        if (e instanceof LogicException) {//\u4E1A\u52A1\u5F02\u5E38\u5904\u7406
            LogicException logicException = (LogicException) e;
            result.setCode(logicException.getCode());
            result.setErrorMessage(logicException.getErrorMsg());
        } else {
            log.info(&quot;\u7CFB\u7EDF\u5F02\u5E38:&quot; + e.getMessage());
        }
        return result;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="mvc-mime\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#mvc-mime\u5904\u7406" aria-hidden="true">#</a> MVC MIME\u5904\u7406</h2><h3 id="mime" tabindex="-1"><a class="header-anchor" href="#mime" aria-hidden="true">#</a> MIME</h3><p>\u662F\u7528\u6765\u63CF\u8FF0\u6D88\u606F\u5185\u5BB9\u7C7B\u578B\u7684\u56E0\u7279\u7F51\u6807\u51C6,\u80FD\u5305\u542B\u6587\u672C\u3001\u56FE\u50CF\u3001\u97F3\u9891\u3001\u89C6\u9891\u4EE5\u53CA\u5176\u4ED6\u5E94\u7528\u7A0B\u5E8F\u4E13\u7528\u7684\u6570\u636E,\u5728HTTP\u4E2D\u5B83\u662F\u7528\u6765\u5B9A\u4E49\u6587\u6863\u6027\u8D28\u53CA\u683C\u5F0F\u7684\u6807\u51C6.</p><h3 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> JSON</h3><p>\u6BD4\u5982\u4E0B\u9762\u8FD9\u6837\u7684\u8BF7\u6C42:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>POST /json HTTP/1.1
Content-Length: 18
Host: localhost:8080
Content-Type: application/json
{&quot;content&quot;:&quot;test&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u5B83\u6307\u5B9A\u4E86\u5BA2\u6237\u7AEF\u53D1\u9001application/json\u683C\u5F0F\u7684\u6570\u636E\u5230\u670D\u52A1\u7AEF,\u540C\u6837\u7684\u5728SpringMVC\u4E2D\u4E5F\u53EF\u4EE5\u6307\u5B9A\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F,\u6BD4\u5982</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(value =&quot;/json&quot;, consumes={MediaType.APPLICATION_JSON_UTF8_VALUE }, produces=&quot;application/json;charset=UTF-8&quot;)
// consumes \u6307\u5B9A\u8BE5\u65B9\u6CD5\u53EA\u5904\u7406application/json\u683C\u5F0F\u7684\u6570\u636E
// produces \u5219\u4F1A\u5728\u54CD\u5E94\u5934\u4E2D\u6307\u5B9A:Content-Type=application/json;charset=UTF-8
// @RestController\u6216@ResponseBody\u6307\u5B9A\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u6570\u636E\u5728ResponseBody
//\u5982\u4E0B\u9762ResponseBody\u4E2D\u7684{&quot;content&quot;:&quot;test&quot;}
\u5982\u4E0B:
HTTP/1.1 200
Content-Type: application/json;charset=UTF-8
Content-Length: 70
Date: Thu, 20 Feb 2020 13:40:25 GMT
Keep-Alive: timeout=60
Connection: keep-alive

{&quot;content&quot;:&quot;test&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="xml" tabindex="-1"><a class="header-anchor" href="#xml" aria-hidden="true">#</a> XML</h3><p>Json\u4F5C\u4E3A\u5E38\u7528\u7684\u6570\u636E\u7C7B\u578B,\u4E0A\u8FF0\u4F8B\u5B50\u5DF2\u7ECF\u5C55\u793A\u4E86\u5176\u7528\u6CD5,XML\u5728soap,rpc\u9886\u57DF\u4E2D\u5E38\u7528,\u5728\u67D0\u4E9B\u4E1A\u52A1\u573A\u666F\u4E5F\u7ECF\u5E38\u4F7F\u7528,SpringBoot\u9ED8\u8BA4\u7684Jackson\u60F3\u8981\u5B9E\u73B0XML\u6570\u636E\u7684\u5904\u7406,\u9700\u8981\u5F15\u5165</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>   &lt;dependency&gt;
       &lt;groupId&gt;com.fasterxml.jackson.dataformat&lt;/groupId&gt;
       &lt;artifactId&gt;jackson-dataformat-xml&lt;/artifactId&gt;
   &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5728Spring\u9879\u76EE\u4E2D,\u5F15\u5165\u8BE5\u4F9D\u8D56\u540E\u8FD8\u9700\u8981\u914D\u7F6EconfigureMessageConverters,\u5728 WebMvcConfigurer\u63A5\u53E3\u4E2D\u53EF\u4EE5\u5B9E\u73B0</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> @Override
    public void configureMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters) {
        Jackson2ObjectMapperBuilder builder = Jackson2ObjectMapperBuilder.xml();
        builder.indentOutput(true);
        converters.add(new MappingJackson2XmlHttpMessageConverter(builder.build()));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u4E0D\u8FC7SpringBoot\u5728\u5F15\u5165\u4F9D\u8D56\u540E\u4F1A\u81EA\u52A8\u5F15\u5165MappingJackson2XmlHttpMessageConverter\u7684\u5B9E\u73B0 \u8BF7\u6C42:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>POST /xml HTTP/1.1
Content-Length: 35
Host: localhost:8080
Content-Type: application/xml

&lt;user&gt;
  &lt;name&gt;Paul&lt;/name&gt;
&lt;/user&gt;
@PostMapping(value = &quot;xml&quot;,consumes = {MediaType.APPLICATION_XML_VALUE},produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public User xml(@RequestBody User user){
      log.info(user.getName());//    Paul
      return user;
    }

Content-Type: application/xml
Transfer-Encoding: chunked
Date: Thu, 20 Feb 2020 14:06:16 GMT
Keep-Alive: timeout=60
Connection: keep-alive
&lt;User&gt;&lt;name&gt;Paul&lt;/name&gt;&lt;/User&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="http\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#http\u53C2\u6570" aria-hidden="true">#</a> HTTP\u53C2\u6570</h3><p>\u901A\u5E38\u53EF\u4EE5\u4F7F\u7528@RequestParam\u6765\u63A5\u6536\u6BD4\u5982\u8868\u5355\u8BF7\u6C42(application/x-www-form-urlencoded)\u4E2D\u7684form data,\u4E5F\u53EF\u4EE5\u662F\u5176\u5B83\u7C7B\u578B\u8BF7\u6C42\u7684Request URL\u4E2D\u5305\u542B\u7684\u53C2\u6570,\u5426\u5219\u4F1A\u51FA\u73B0Required String parameter &#39;name&#39; is not present,\u6BD4\u5982\u4F7F\u7528POST :application/json,\u5728body\u4E2D\u6DFB\u52A0\u53C2\u6570,\u540E\u53F0\u5C06\u4E0D\u80FD\u7ED1\u5B9A\u5230\u8BE5\u6570\u636E.\u5F53\u7136\u8FD9\u4E2A\u5F02\u5E38\u53EF\u4EE5\u7528\u8BE5\u6CE8\u89E3\u7684\u5C5E\u6027(required=false)\u6765\u907F\u514D,\u4E0D\u8FC7\u8FD9\u6837\u5C31\u65E0\u6CD5\u63A5\u6536\u5230\u6570\u636E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @RequestMapping(value = &quot;/form&quot;)
    @ResponseBody
    public String form1(@RequestParam String name){
        return name;
    }
    //\u9664\u6B64\u4E4B\u5916\u4E5F\u53EF\u4EE5\u76F4\u63A5\u7528 User(name\u5C5E\u6027)\u6765\u8FDB\u884C\u7ED1\u5B9A.
    @RequestMapping(value = &quot;/form2&quot;)
    @ResponseBody
    public String form2( User user){
        return user.getName();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u4EE5\u4E0A\u4EE3\u7801\u53EF\u4EE5\u7528\u8868\u5355\u6570\u636E\u6216\u8005URL\u5E26\u53C2\u6570\u6765\u83B7\u53D6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>POST /form HTTP/1.1
Content-Length: 9
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded

Form Data:
 name=Paul
//\u6216\u8005

GET /form?name=Paul HTTP/1.1
Host: localhost:8080
Content-Type: text/plain;charset=UTF-8
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="\u6587\u4EF6\u4E0A\u4F20" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u4E0A\u4F20" aria-hidden="true">#</a> \u6587\u4EF6\u4E0A\u4F20</h3><p>\u6587\u4EF6\u7684\u683C\u5F0F\u4E3A:multipart/form-data</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @ResponseBody //\u8FD4\u56DEjson\u6570\u636E
    @RequestMapping(value = &quot;/upload&quot;, method = RequestMethod.POST)
    public JSONObject uploadImg(@RequestParam(&quot;file&quot;) MultipartFile file, HttpServletRequest request) {
        String contentType = file.getContentType();
        System.out.print(contentType);
        String fileName = System.currentTimeMillis()+file.getOriginalFilename();
        String filePath = ClassUtils.getDefaultClassLoader()
                .getResource(&quot;&quot;).getPath()+&quot;static/admin/upload/&quot;;
        JSONObject jo = new JSONObject();//\u5B9E\u4F8B\u5316json\u6570\u636E
        if (file.isEmpty()) {
            jo.put(&quot;success&quot;, 0);
            jo.put(&quot;fileName&quot;, &quot;&quot;);
        }
        try {
            uploadFile(file.getBytes(), filePath, fileName);
            jo.put(&quot;success&quot;, 1);
            jo.put(&quot;fileName&quot;, fileName);
        } catch (Exception e) {
        }
        return jo;
    }
    public static void uploadFile(byte[] file, String filePath, String fileName) throws Exception {
        File targetFile = new File(filePath);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath +&quot;/&quot;+ fileName);
        out.write(file);
        out.flush();
        out.close();
    }
        function fileLoad(){
            var form = new FormData();
            form.append(&quot;file&quot;, document.getElementById(&quot;file&quot;).files[0]);
            $.ajax({
                url: &quot;/upload&quot;,
                data: form,
                cache: false,
                async: false,
                type: &quot;POST&quot;, 
                dataType: &#39;json&#39;, //\u6570\u636E\u8FD4\u56DE\u7C7B\u578B
                processData: false,
                contentType: false,
                success: function (data) { 
                    var res = eval(data);
                    } else {
                        alert(&quot;\u5931\u8D25&quot;);
                    }
                }
            });
        }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h3 id="\u6587\u4EF6\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u4E0B\u8F7D" aria-hidden="true">#</a> \u6587\u4EF6\u4E0B\u8F7D</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@GetMapping(path =&quot;/download&quot;)
    public ResponseEntity&lt;Resource&gt; download(@RequestParam(&quot;name&quot;)String name)throws IOException{
        File file =new File(&quot;D:/Raynor&quot;, name);
        Path path = Paths.get(file.getAbsolutePath());
        ByteArrayResource resource =new ByteArrayResource(Files.readAllBytes(path));
        return ResponseEntity.ok().header(&quot;Content-Disposition&quot;,&quot;attachment;fileName=&quot;+ name)
                .contentLength(file.length()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
    }

GET /download?name=1.txt HTTP/1.1
Host: localhost:8080

HTTP/1.1 200
Content-Disposition: attachment;fileName=1.txt //\u8868\u793A\u6587\u6863\u4F5C\u4E3A\u9644\u4EF6\u4FDD\u5B58,\u540D\u79F0\u4E3A1.txt
Accept-Ranges: bytes
Content-Type: application/octet-stream // \u8868\u793A\u54CD\u5E94\u7684\u6587\u6863\u662F\u672A\u77E5\u4E8C\u8FDB\u5236\u7C7B\u578B,\u591A\u6570\u6D4F\u89C8\u5668\u4F1A\u76F4\u63A5\u4E0B\u8F7D
Content-Length: 0
Date: Tue, 25 Feb 2020 11:50:08 GMT
Keep-Alive: timeout=60
Connection: keep-alive
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="\u5B57\u8282\u6D41" tabindex="-1"><a class="header-anchor" href="#\u5B57\u8282\u6D41" aria-hidden="true">#</a> \u5B57\u8282\u6D41</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(value = &quot;/data1&quot;, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String data1(@RequestBody byte[] body) throws Exception {
        return body.toString();
    }
    @PostMapping(value = &quot;/data2&quot;, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String data2(InputStream inputStream, HttpServletRequest request) throws Exception {
        log.info(request.getInputStream().toString());
        return inputStream.toString();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="mybatis" tabindex="-1"><a class="header-anchor" href="#mybatis" aria-hidden="true">#</a> Mybatis</h2><h3 id="_1-\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#_1-\u4F9D\u8D56" aria-hidden="true">#</a> 1.\u4F9D\u8D56</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	&lt;dependency&gt;
            &lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;
            &lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;2.1.1&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;
            &lt;artifactId&gt;pagehelper-spring-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;1.2.12&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_2-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-\u914D\u7F6E" aria-hidden="true">#</a> 2. \u914D\u7F6E</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#mysql
spring.datasource.url=jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=utf8&amp;serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#mybatis\u626B\u63CF\u8DEF\u5F84,\u8FD9\u91CC\u914D\u7F6E\u7684\u662F resources/mapper/\u8DEF\u5F84,\u4E5F\u53EF\u4EE5\u662F\u5176\u4ED6\u8DEF\u5F84
mybatis.mapper-locations=classpath:mapper/*.xml
#\u5BF9\u5E94\u5B9E\u4F53\u7C7B\u7684\u8DEF\u5F84,\u8FD9\u6837\u5728xml\u91CC\u9762\u53EA\u7528\u5199\u5B9E\u4F53\u7C7B\u540D\u5C31\u80FD\u627E\u5230\u5BF9\u5E94\u7684\u7C7B,\u6BD4\u5982resultType=&quot;User&quot;
mybatis.type-aliases-package=com.demo.model
#PageHelper
pagehelper.helper-dialect=mysql
pagehelper.reasonable=true
pagehelper.support-methods-arguments=true
pagehelper.params=count=countSql
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u63A5\u4E0B\u6765\u53EA\u9700\u8981\u7EF4\u62A4_.xml\u548C_Mapper.java\u63A5\u53E3\u5C31\u884C,\u5176\u4E2Dxml\u4E2Dmapper\u6807\u7B7E\u7684namespace\u5C5E\u6027\u8981\u4E0E\u5BF9\u5E94Mapper\u63A5\u53E3\u7684\u8DEF\u5F84\u4E00\u81F4 \u4F8B\u5982:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.demo.mapper.UserMapper&quot;&gt;
    &lt;select id=&quot;selectUser&quot; resultType=&quot;User&quot;&gt;
      select * from user
    &lt;/select&gt;
    &lt;select id=&quot;selectUserById&quot; resultType=&quot;User&quot;&gt;
      select * from user where id = #{id}
    &lt;/select&gt;
    &lt;insert id=&quot;addUser&quot; parameterType=&quot;User&quot;&gt;
      insert into user (id,name,pwd) values (#{id},#{name},#{pwd})
    &lt;/insert&gt;
    &lt;update id=&quot;updateUser&quot; parameterType=&quot;User&quot;&gt;
      update user set name=#{name},pwd=#{pwd} where id = #{id}
    &lt;/update&gt;
    &lt;delete id=&quot;deleteUser&quot; parameterType=&quot;int&quot;&gt;
      delete from user where id = #{id}
   &lt;/delete&gt;
&lt;/mapper&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ol><li><a href="/Mapper">@Mapper </a> \u5B83\u662Fmybatis\u63D0\u4F9B\u7684\u6CE8\u89E3,\u7528\u4E8E\u5C06\u8FD9\u4E2ADAO\u4EA4\u7ED9Spring\u7BA1\u7406,\u751F\u6210\u5BF9\u5E94\u7684\u5B9E\u73B0\u7C7B,\u53E6\u5916\u4E5F\u53EF\u4EE5\u4E0D\u4F7F\u7528\u8BE5\u6CE8\u89E3,\u800C\u662F\u5728SpringBoot\u7684\u542F\u52A8\u7C7B\u4E0A\u6DFB\u52A0@MapperScan(&quot;com.demo.mapper&quot;)\u6765\u5B9E\u73B0.</li><li><a href="/Repository">@Repository </a> UserMapper\u63A5\u53E3\u53EF\u4EE5\u6DFB\u52A0\u6CE8\u89E3@Repository,\u4E5F\u53EF\u4EE5\u4E0D\u6DFB\u52A0 \u8BE5\u6CE8\u89E3\u7528\u4E8E\u5C06\u6570\u636E\u8BBF\u95EE\u5C42\u7684\u63A5\u53E3\u8868\u793A\u4E3ASpring Bean,\u6DFB\u52A0\u540E\u53EF\u4EE5\u88ABspring\u6846\u67B6\u6240\u626B\u63CF\u5E76\u6CE8\u5165\u5230spring\u5BB9\u5668\u6765\u8FDB\u884C\u7BA1\u7406,\u7C7B\u4F3C\u7684\u8FD8\u6709@Service,@Component,@Controller,\u5176\u4E3B\u8981\u533A\u522B\u5728\u4E8E\u4F7F\u7528\u4E8E\u4E0D\u540C\u5C42,\u6B64\u5904\u56E0\u4E3AMybatis\u7684\u914D\u7F6E\u7684MapperScannerConfigurer\u5B9E\u73B0\u4E86\u5B9E\u4F8B\u5316Spring Bean\u7684\u529F\u80FD,\u6240\u4EE5\u53EF\u4EE5\u9009\u62E9\u4E0D\u4F7F\u7528<a href="/Repository.">@Repository. </a></li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.demo.mapper;
import com.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.List;
@Mapper
@Repository
public interface UserMapper {
    List&lt;User&gt; selectUser();
    User selectUserById(int id);
    int addUser(User user);
    int updateUser(User user);
    int deleteUser(int id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u5206\u9875\u53EA\u9700\u8981\u5728\u67E5\u8BE2\u524D\u9762,\u6DFB\u52A0</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    PageHelper.startPage(pageNum,pageSize);
    List&lt;User&gt; list= userService.pageUser();
    PageInfo&lt;User&gt; page = new PageInfo&lt;&gt;(list);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_3-jdbctemplate" tabindex="-1"><a class="header-anchor" href="#_3-jdbctemplate" aria-hidden="true">#</a> 3. JdbcTemplate</h3><p>\u4E5F\u53EF\u4EE5\u901A\u8FC7org.springframework.jdbc.core.JdbcTemplate,\u76F4\u63A5\u6CE8\u5165\u8FD9\u4E2Abean\u5C31\u53EF\u4EE5\u4F7F\u7528JDBC\u6765\u64CD\u4F5C\u6570\u636E\u5E93.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    //JdbcTemplate \u662F core \u5305\u7684\u6838\u5FC3\u7C7B\uFF0C\u7528\u4E8E\u7B80\u5316 JDBC\u64CD\u4F5C\uFF0C\u8FD8\u80FD\u907F\u514D\u4E00\u4E9B\u5E38\u89C1\u7684\u9519\u8BEF\uFF0C\u5982\u5FD8\u8BB0\u5173\u95ED\u6570\u636E\u5E93\u8FDE\u63A5
    //Spring Boot \u9ED8\u8BA4\u63D0\u4F9B\u4E86\u6570\u636E\u6E90\uFF0C\u9ED8\u8BA4\u63D0\u4F9B\u4E86 org.springframework.jdbc.core.JdbcTemplate
    //JdbcTemplate \u4E2D\u4F1A\u81EA\u5DF1\u6CE8\u5165\u6570\u636E\u6E90\uFF0C\u4F7F\u7528\u8D77\u6765\u4E5F\u4E0D\u7528\u518D\u81EA\u5DF1\u6765\u5173\u95ED\u6570\u636E\u5E93\u8FDE\u63A5
    @Autowired
    JdbcTemplate jdbcTemplate;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_4-\u6CE8\u89E3\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_4-\u6CE8\u89E3\u5B9E\u73B0" aria-hidden="true">#</a> 4. \u6CE8\u89E3\u5B9E\u73B0</h3><p>Mybatis\u9664\u4E86\u7075\u6D3B\u7684xml,\u4E5F\u63D0\u4F9B\u4E86\u8BF8\u5982@Select\u3001@Update\u7B49\u6CE8\u89E3\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5B9E\u73B0\u5927\u90E8\u5206\u7B80\u5355\u7684CRUD\u529F\u80FD\u3002 \u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Mapper
public interface UserMapper  {

    @Select(&quot;select * from user where id = #{id}&quot;)
    User getUserById(Long id);

    @Delete(&quot;delete from user where id=#{id}&quot;)
    int deleteUserById(Long id);

    @Options(useGeneratedKeys = true,keyProperty = &quot;id&quot;,keyColumn = &quot;id&quot;)
    @Insert(&quot;insert into user (name,password) values(#{name},#{password})&quot;)
    int insertUser(User user);

    @Update(&quot;update user set name=#{name} where id = #{id}&quot;)
    int updateUser(User user);

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>\u5176\u4E2D@Options: userGeneratedKeys = &quot;true&quot; : \u662F\u5728\u652F\u6301\u4E3B\u952E\u81EA\u589E\u7684\u6570\u636E\u5E93\u4E2D\u4F7F\u7528\u4E3B\u952E\u81EA\u589E\u5C5E\u6027 keyProperty = &quot;id&quot; : \u8868\u793A\u8FD4\u56DE\u7684\u4E3B\u952E\u503C\u5C06\u63D2\u5165\u5230\u5B9E\u4F53\u7C7B\u7684id\u5C5E\u6027\u4E2D keyColumn = &quot;id&quot; : \u8868\u793A\u4E3B\u952E\u5BF9\u5E94\u7684\u5B57\u6BB5\u540D\u4E3Aid \u610F\u4E3A\u63D2\u5165\u6570\u636E\u540E\u5C06\u6570\u636E\u5E93\u7684\u4E3B\u952E\u8FD4\u56DE,\u5176\u4E2Did\u8868\u793A\u4E3B\u952E\u540D. \u53E6\u5916@Delete\u548C@Update\u5728\u6267\u884C\u6210\u529F\u5747\u8FD4\u56DE 1,\u5931\u8D25\u8FD4\u56DE0 \u6D4B\u8BD5\u5982\u4E0B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> 	User user = userMapper.getUserById(1L);
        log.info(user.toString());
        user.setName(&quot;xxx1&quot;);
        user.setId(10L);
        int update = userMapper.updateUser(user);
        log.info(&quot;\u6210\u529F\u8FD4\u56DE1,\u5931\u8D25\u8FD4\u56DE0:&quot;+update);
        User user1 = new User();
        user1.setName(&quot;Eric&quot;);
        user1.setPassword(&quot;123456&quot;);
        int id = userMapper.insertUser(user);
        log.info(&quot;\u63D2\u5165\u6570\u636E\u7684\u4E3B\u952E:&quot;+user.getId()+&quot;&quot;);
        int del = userMapper.deleteUserById(user.getId());
        log.info(&quot;\u6210\u529F\u8FD4\u56DE1,\u5931\u8D25\u8FD4\u56DE0:&quot;+del);
 User(id=1, name=xxx1, password=null, time=null, records=null)
 \u6210\u529F\u8FD4\u56DE1,\u5931\u8D25\u8FD4\u56DE0:0
 \u63D2\u5165\u6570\u636E\u7684\u4E3B\u952E:7
 \u6210\u529F\u8FD4\u56DE1,\u5931\u8D25\u8FD4\u56DE0:1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="_5-\u81EA\u5B9A\u4E49\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#_5-\u81EA\u5B9A\u4E49\u6CE8\u89E3" aria-hidden="true">#</a> 5. \u81EA\u5B9A\u4E49\u6CE8\u89E3</h3><p>SimpleInsertLangDriver/SimpleSelectLangDriver/SimpleUpdateLangDriver\u4E09\u4E2A\u5BF9\u8C61\u5747\u9700\u8981</p><p>\u7EE7\u627FXMLLanguageDriver \u5E76\u91CD\u5199createSqlSource\u65B9\u6CD5</p><h4 id="insert" tabindex="-1"><a class="header-anchor" href="#insert" aria-hidden="true">#</a> insert</h4><p>\u5728\u6570\u636E\u63D2\u5165\u7684\u65F6\u5019,\u53EF\u80FD\u5B58\u5728\u6BD4\u5982Oracle\u4E2D\u5E8F\u5217\u7684\u4F7F\u7528,\u6B64\u65F6\u901A\u8FC7\u81EA\u5B9A\u4E49\u6CE8\u89E3\u5373\u53EF\u5B8C\u6210,\u80FD\u6700\u5927\u5316\u7A0B\u5EA6\u4E0A\u51CF\u5C11\u65E0\u7528\u4EE3\u7801.\u6BD4\u5982\u4E0B\u9762\u4EE3\u7801\u4E2D\u7684PrimrayKey\u6CE8\u89E3,\u901A\u8FC7\u5B9E\u4F53\u7C7B\u4E2D\u67D0\u4E2A\u5B57\u6BB5\u7684\u6CE8\u89E3,\u5373\u53EF\u5B8C\u6210\u76F8\u5E94\u7684\u529F\u80FD.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>annotation</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ElementType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Retention</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RetentionPolicy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Target</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">FIELD</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">PrimrayKey</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> <span class="token function">seq_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>db</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PrimrayKey</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>mapping<span class="token punctuation">.</span></span><span class="token class-name">SqlSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>scripting<span class="token punctuation">.</span></span><span class="token class-name">LanguageDriver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>scripting<span class="token punctuation">.</span>xmltags<span class="token punctuation">.</span></span><span class="token class-name">XMLLanguageDriver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token class-name">Field</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Objects</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>regex<span class="token punctuation">.</span></span><span class="token class-name">Matcher</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>regex<span class="token punctuation">.</span></span><span class="token class-name">Pattern</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleInsertLangDriver</span> <span class="token keyword">extends</span> <span class="token class-name">XMLLanguageDriver</span> <span class="token keyword">implements</span> <span class="token class-name">LanguageDriver</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Pattern</span> inPattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\(#\\\\{(\\\\w+)\\\\}\\\\)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSource</span> <span class="token function">createSqlSource</span><span class="token punctuation">(</span><span class="token class-name">Configuration</span> configuration<span class="token punctuation">,</span> <span class="token class-name">String</span> script<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> parameterType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> inPattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">StringBuilder</span> tmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;(&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Field</span> field<span class="token operator">:</span>parameterType<span class="token punctuation">.</span><span class="token function">getDeclaredFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span>isAnnotationPresent <span class="token punctuation">(</span><span class="token class-name">PrimrayKey</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token class-name">PrimrayKey</span> primrayKey <span class="token operator">=</span> field<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">PrimrayKey</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">String</span> seqName <span class="token operator">=</span> primrayKey<span class="token punctuation">.</span><span class="token function">seq_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    tmp<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;#{&quot;</span><span class="token operator">+</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;} || &quot;</span><span class="token operator">+</span>seqName<span class="token operator">+</span><span class="token string">&quot;.nextval,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    tmp<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;#{&quot;</span><span class="token operator">+</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token function">getJdbcType</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;},&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            sb<span class="token punctuation">.</span><span class="token function">deleteCharAt</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tmp<span class="token punctuation">.</span><span class="token function">deleteCharAt</span><span class="token punctuation">(</span>tmp<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;) values (&quot;</span><span class="token operator">+</span>tmp<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            script <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            script <span class="token operator">=</span> <span class="token string">&quot;&lt;script&gt;&quot;</span><span class="token operator">+</span>script<span class="token operator">+</span><span class="token string">&quot;&lt;/script&gt;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">createSqlSource</span><span class="token punctuation">(</span>configuration<span class="token punctuation">,</span> script<span class="token punctuation">,</span> parameterType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getJdbcType</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>clazz<span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;,jdbcType=VARCHAR&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>clazz<span class="token punctuation">,</span><span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;,jdbcType=DATE&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>clazz<span class="token punctuation">,</span><span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>clazz<span class="token punctuation">,</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;,jdbcType=NUMERIC&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div><h4 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>db</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>mapping<span class="token punctuation">.</span></span><span class="token class-name">SqlSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>parsing<span class="token punctuation">.</span></span><span class="token class-name">XNode</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>scripting<span class="token punctuation">.</span></span><span class="token class-name">LanguageDriver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>scripting<span class="token punctuation">.</span>xmltags<span class="token punctuation">.</span></span><span class="token class-name">XMLLanguageDriver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token class-name">Field</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>regex<span class="token punctuation">.</span></span><span class="token class-name">Matcher</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>regex<span class="token punctuation">.</span></span><span class="token class-name">Pattern</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleSelectLangDriver</span> <span class="token keyword">extends</span> <span class="token class-name">XMLLanguageDriver</span> <span class="token keyword">implements</span> <span class="token class-name">LanguageDriver</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Pattern</span> inPattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\(#\\\\{(\\\\w+)\\\\}\\\\)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSource</span> <span class="token function">createSqlSource</span><span class="token punctuation">(</span><span class="token class-name">Configuration</span> configuration<span class="token punctuation">,</span> <span class="token class-name">String</span> script<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> parameterType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> inPattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;where&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Field</span> field<span class="token operator">:</span>parameterType<span class="token punctuation">.</span><span class="token function">getDeclaredFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">String</span> tmp <span class="token operator">=</span> <span class="token string">&quot;&lt;if test=\\&quot;_field != null \\&quot;&gt; AND _column= #{_field}&lt;/if&gt;&quot;</span><span class="token punctuation">;</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>tmp<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;_field&quot;</span><span class="token punctuation">,</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;_column&quot;</span><span class="token punctuation">,</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;/where&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            script <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            script <span class="token operator">=</span> <span class="token string">&quot;&lt;script&gt;&quot;</span><span class="token operator">+</span>script<span class="token operator">+</span><span class="token string">&quot;&lt;/script&gt;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">createSqlSource</span><span class="token punctuation">(</span>configuration<span class="token punctuation">,</span> script<span class="token punctuation">,</span> parameterType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> update</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>db</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>mapping<span class="token punctuation">.</span></span><span class="token class-name">SqlSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>scripting<span class="token punctuation">.</span></span><span class="token class-name">LanguageDriver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>scripting<span class="token punctuation">.</span>xmltags<span class="token punctuation">.</span></span><span class="token class-name">XMLLanguageDriver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token class-name">Field</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Objects</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>regex<span class="token punctuation">.</span></span><span class="token class-name">Matcher</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>regex<span class="token punctuation">.</span></span><span class="token class-name">Pattern</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleUpdateLangDriver</span> <span class="token keyword">extends</span> <span class="token class-name">XMLLanguageDriver</span> <span class="token keyword">implements</span> <span class="token class-name">LanguageDriver</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Pattern</span> inPattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\(#\\\\{(\\\\w+)\\\\}\\\\)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSource</span> <span class="token function">createSqlSource</span><span class="token punctuation">(</span><span class="token class-name">Configuration</span> configuration<span class="token punctuation">,</span> <span class="token class-name">String</span> script<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> parameterType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> inPattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;set&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Field</span> field<span class="token operator">:</span>parameterType<span class="token punctuation">.</span><span class="token function">getDeclaredFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;xlh&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">String</span> tmp <span class="token operator">=</span> <span class="token string">&quot;&lt;if test=\\&quot;_field != null \\&quot;&gt;_column=#{_field},&lt;/if&gt;&quot;</span><span class="token punctuation">;</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>tmp<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;_field&quot;</span><span class="token punctuation">,</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;_column&quot;</span><span class="token punctuation">,</span>field<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sb<span class="token punctuation">.</span><span class="token function">deleteCharAt</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;/set&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            script <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            script <span class="token operator">=</span> <span class="token string">&quot;&lt;script&gt;&quot;</span><span class="token operator">+</span>script<span class="token operator">+</span><span class="token string">&quot;&lt;/script&gt;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">createSqlSource</span><span class="token punctuation">(</span>configuration<span class="token punctuation">,</span> script<span class="token punctuation">,</span> parameterType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h4 id="\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528" aria-hidden="true">#</a> \u5E94\u7528</h4><p>insert</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Insert</span><span class="token punctuation">(</span><span class="token string">&quot; insert into TableName (#{htxx})&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Lang</span><span class="token punctuation">(</span><span class="token class-name">SimpleInsertLangDriver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token comment">//\u63D2\u5165\u540E\u83B7\u53D6htid</span>
<span class="token annotation punctuation">@SelectKey</span><span class="token punctuation">(</span>keyColumn <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>keyProperty <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>resultType <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>before <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> statement <span class="token operator">=</span> <span class="token string">&quot;select id from TableName where xlh = #{xlh}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">Htxx</span> htxx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>update</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Update</span><span class="token punctuation">(</span><span class="token string">&quot; update  TableName (#{htxx}) WHERE xlh = #{xlh} &quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Lang</span><span class="token punctuation">(</span><span class="token class-name">SimpleUpdateLangDriver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token comment">//\u66F4\u65B0\u524D\u83B7\u53D6htid</span>
<span class="token annotation punctuation">@SelectKey</span><span class="token punctuation">(</span>keyColumn <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>keyProperty <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>resultType <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>before <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> statement <span class="token operator">=</span> <span class="token string">&quot;select id from TableName where xlh = #{xlh}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Htxx</span> htxx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>select</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@ResultType</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>model<span class="token punctuation">.</span></span>A</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">&quot; select * FROM TableName where xlh = #{xlh}&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">A</span><span class="token punctuation">&gt;</span></span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token class-name">String</span> xlh<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="\u7F3A\u70B9" tabindex="-1"><a class="header-anchor" href="#\u7F3A\u70B9" aria-hidden="true">#</a> \u7F3A\u70B9</h4><p>\u8BE5\u65B9\u6CD5\u9700\u8981\u5728mapper\u4E2D\u901A\u8FC7\u5B57\u7B26\u4E32\u62FC\u63A5\u7684\u65B9\u6CD5\u4E66\u5199\u5927\u91CF\u7684sql\u8BED\u53E5,\u7EF4\u62A4\u8D77\u6765\u53EF\u80FD\u5B58\u5728\u95EE\u9898,\u5C24\u5176\u662Fselect</p><h3 id="_6-\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#_6-\u7F13\u5B58" aria-hidden="true">#</a> 6.\u7F13\u5B58</h3><p>Mybatis\u63D0\u4F9B\u4E86\u4E00\u7EA7\u4E8C\u7EA7\u7F13\u5B58,\u540C\u65F6\u9884\u7559\u4E86\u96C6\u6210\u7B2C\u4E09\u65B9\u4E09\u7EA7\u7F13\u5B58\u7684\u63A5\u53E3.MyBatis \u8DDF\u7F13\u5B58\u76F8\u5173\u7684\u7C7B\u90FD\u5728cache \u5305\u91CC\u9762\uFF0C\u5176\u4E2D\u6709\u4E00\u4E2ACache \u63A5\u53E3\uFF0C\u53EA\u6709\u4E00\u4E2A\u9ED8\u8BA4\u7684\u5B9E\u73B0\u7C7B PerpetualCache\uFF0C\u5B83\u662F\u7528HashMap \u5B9E\u73B0.</p><blockquote><p>SpringBott+MyBatis\u4E2D\u4E00\u7EA7\u7F13\u5B58\u548C\u4E8C\u7EA7\u7F13\u5B58\u90FD\u662F\u5F00\u542F\u7684\uFF0C\u6CE8\u610F\u4E8C\u7EA7\u7F13\u5B58\u867D\u7136\u662F\u5F00\u542F\u72B6\u6001\u4F46\u662F\u9700\u8981\u8FDB\u884C\u914D\u7F6E\u624D\u53EF\u4EE5\u4F7F\u7528 SqlSession \uFF1A \u5BF9\u5E94\u4E00\u6B21\u6570\u636E\u5E93\u7684CURD\u64CD\u4F5C\u3002\u5F53\u6240\u6709\u7684CURD\u90FD\u5904\u4E8E\u540C\u4E00\u4E2A\u4E8B\u52A1\u7BA1\u7406\u4E2D\uFF0CSqlSession\u53EA\u4F1A\u5EFA\u7ACB\u4E00\u6B21\u3002</p></blockquote><h4 id="\u4E00\u7EA7\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#\u4E00\u7EA7\u7F13\u5B58" aria-hidden="true">#</a> \u4E00\u7EA7\u7F13\u5B58</h4><p>\u4E00\u7EA7\u7F13\u5B58(\u672C\u5730\u7F13\u5B58)\u9ED8\u8BA4\u5F00\u542F,\u662F\u5B58\u5728\u4F1A\u8BDD\u5C42(SqlSession)\u4E2D\u7684. MyBatis\u4F1A\u5728\u4E00\u6B21\u4F1A\u8BDD\u7684\u8868\u793A----\u4E00\u4E2ASqlSession\u5BF9\u8C61\u4E2D\u521B\u5EFA\u4E00\u4E2A\u672C\u5730\u7F13\u5B58(local cache)\uFF0C\u5BF9\u4E8E\u6BCF\u4E00\u6B21\u67E5\u8BE2\uFF0C\u90FD\u4F1A\u5C1D\u8BD5\u6839\u636E\u67E5\u8BE2\u7684\u6761\u4EF6\u53BB\u672C\u5730\u7F13\u5B58\u4E2D\u67E5\u627E\u662F\u5426\u5728\u7F13\u5B58\u4E2D\uFF0C\u5982\u679C\u5728\u7F13\u5B58\u4E2D\uFF0C\u5C31\u76F4\u63A5\u4ECE\u7F13\u5B58\u4E2D\u53D6\u51FA\uFF0C\u7136\u540E\u8FD4\u56DE\u7ED9\u7528\u6237\uFF1B\u5426\u5219\uFF0C\u4ECE\u6570\u636E\u5E93\u8BFB\u53D6\u6570\u636E\uFF0C\u5C06\u67E5\u8BE2\u7ED3\u679C\u5B58\u5165\u7F13\u5B58\u5E76\u8FD4\u56DE\u7ED9\u7528\u6237\u3002 \u5176\u751F\u547D\u5468\u671F\u5982\u4E0B:</p><ol><li>MyBatis\u5728\u5F00\u542F\u4E00\u4E2A\u6570\u636E\u5E93\u4F1A\u8BDD\u65F6\uFF0C\u4F1A \u521B\u5EFA\u4E00\u4E2A\u65B0\u7684SqlSession\u5BF9\u8C61\uFF0CSqlSession\u5BF9\u8C61\u4E2D\u4F1A\u6709\u4E00\u4E2A\u65B0\u7684Executor\u5BF9\u8C61\uFF0CExecutor\u5BF9\u8C61\u4E2D\u6301\u6709\u4E00\u4E2A\u65B0\u7684PerpetualCache\u5BF9\u8C61\uFF1B\u5F53\u4F1A\u8BDD\u7ED3\u675F\u65F6\uFF0CSqlSession\u5BF9\u8C61\u53CA\u5176\u5185\u90E8\u7684Executor\u5BF9\u8C61\u8FD8\u6709PerpetualCache\u5BF9\u8C61\u4E5F\u4E00\u5E76\u91CA\u653E\u6389\u3002</li><li>\u5982\u679CSqlSession\u8C03\u7528\u4E86close()\u65B9\u6CD5\uFF0C\u4F1A\u91CA\u653E\u6389\u4E00\u7EA7\u7F13\u5B58PerpetualCache\u5BF9\u8C61\uFF0C\u4E00\u7EA7\u7F13\u5B58\u5C06\u4E0D\u53EF\u7528\uFF1B</li><li>\u5982\u679CSqlSession\u8C03\u7528\u4E86clearCache()\uFF0C\u4F1A\u6E05\u7A7APerpetualCache\u5BF9\u8C61\u4E2D\u7684\u6570\u636E\uFF0C\u4F46\u662F\u8BE5\u5BF9\u8C61\u4ECD\u53EF\u4F7F\u7528\uFF1B</li><li>SqlSession\u4E2D\u6267\u884C\u4E86\u4EFB\u4F55\u4E00\u4E2Aupdate\u64CD\u4F5C(update()\u3001delete()\u3001insert()) \uFF0C\u90FD\u4F1A\u6E05\u7A7APerpetualCache\u5BF9\u8C61\u7684\u6570\u636E\uFF0C\u4F46\u662F\u8BE5\u5BF9\u8C61\u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\uFF1B \u4F8B\u5982\u4E0B\u9762:</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Autowired
    SqlSessionFactory sqlSessionFactory;

    @Test
    void test(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        log.info(userMapper.getUserById(1L).toString());
        log.info(userMapper.getUserById(1L).toString());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u53EF\u4EE5\u770B\u5230\u63A7\u5236\u53F0\u53EA\u6253\u5370\u4E86\u4E00\u6B21sql\u8BED\u53E5. ( \u5F00\u542Fsql\u8F93\u51FA:logging.level.com.demo.mapper=debug)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Autowired
    SqlSessionFactory sqlSessionFactory;

    @Test
    void test(){
        SqlSession sqlSession = sqlSessionFactory.openSession(true);//true\u81EA\u52A8\u63D0\u4EA4\u4E8B\u52A1,false\u624B\u52A8
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User user = userMapper.getUserById(1L);
        log.info(user.toString());
        user.setPassword(&quot;123&quot;);
        userMapper.updateUser(user);
        log.info(userMapper.getUserById(1L).toString());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u5982\u679C\u5176\u8C03\u7528\u4E86update\u6216delete,\u5C06\u4F1A\u5220\u9664\u7F13\u5B58</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Test
    void test1(){
        SqlSession sqlSession1 = sqlSessionFactory.openSession();
        UserMapper userMapper1 = sqlSession1.getMapper(UserMapper.class);

        SqlSession sqlSession2 = sqlSessionFactory.openSession();
        UserMapper userMapper2 = sqlSession2.getMapper(UserMapper.class);

        User user = userMapper1.getUserById(1L);
        log.info(user.toString());

        user.setPassword(&quot;123&quot;);
        userMapper2.updateUser(user);

        log.info(userMapper1.getUserById(1L).toString());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>\u7531\u4E8E\u4E00\u7EA7\u7F13\u5B58\u4E0D\u80FD\u8DE8\u4F1A\u8BDD\u5171\u4EAB,\u6240\u4EE5\u4E0A\u8FF0\u4F8B\u5B50\u4F1A\u4F7F\u5176\u83B7\u53D6\u5230\u810F\u6570\u636E \u63A7\u5236\u53F0\u8F93\u51FA\u4E24\u7AEFsql,\u4E00\u4E2A\u67E5\u8BE2,\u4E00\u4E2A\u66F4\u65B0.\u6700\u540E\u8F93\u51FA\u7684user\u5BF9\u8C61\u662F\u88ABsession2\u66F4\u6539 \u524D\u7684\u810F\u6570\u636E.\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898,\u4E00\u662F\u4F7F\u7528\u4E8C\u7EA7\u7F13\u5B58,\u4E8C\u662F\u66F4\u6539\u4E00\u7EA7\u7F13\u5B58\u7684\u7EA7\u522B\u4E3Astatement(\u9ED8\u8BA4\u4E3Asession ):\u6BCF\u6B21\u67E5\u8BE2\u7ED3\u675F\u90FD\u4F1A\u6E05\u6389\u4E00\u7EA7\u7F13\u5B58</p><h4 id="\u4E8C\u7EA7\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u7EA7\u7F13\u5B58" aria-hidden="true">#</a> \u4E8C\u7EA7\u7F13\u5B58</h4><p>\u8303\u56F4\u662Fnamespace\u7EA7\u522B\u7684\uFF0C\u53EF\u4EE5\u88AB\u591A\u4E2ASqlSession \u5171\u4EAB\uFF08\u53EA\u8981\u662F\u540C\u4E00\u4E2A\u63A5\u53E3\u91CC\u9762\u7684\u76F8\u540C\u65B9\u6CD5\uFF0C\u90FD\u53EF\u4EE5\u5171\u4EAB\uFF09\uFF0C\u751F\u547D\u5468\u671F\u548C\u5E94\u7528\u540C\u6B65\u3002\u4F7F\u7528\u4E86\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u4E14Mapper\u548Cselect\u8BED\u53E5\u4E5F\u914D\u7F6E\u4F7F\u7528\u4E86\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u90A3\u4E48\u5728\u6267\u884Cselect\u67E5\u8BE2\u7684\u65F6\u5019\uFF0CMyBatis\u4F1A\u5148\u4ECE\u4E8C\u7EA7\u7F13\u5B58\u4E2D\u53D6\u8F93\u5165\uFF0C\u5176\u6B21\u624D\u662F\u4E00\u7EA7\u7F13\u5B58</p><blockquote><p>MyBatis \u7528\u4E86\u4E00\u4E2A\u88C5\u9970\u5668\u7684\u7C7B\u6765\u7EF4\u62A4\uFF0C\u5C31\u662FCachingExecutor\u3002\u5982\u679C\u542F\u7528\u4E86\u4E8C\u7EA7\u7F13\u5B58\uFF0CMyBatis \u5728\u521B\u5EFAExecutor \u5BF9\u8C61\u7684\u65F6\u5019\u4F1A\u5BF9Executor \u8FDB\u884C\u88C5\u9970\u3002CachingExecutor \u5BF9\u4E8E\u67E5\u8BE2\u8BF7\u6C42\uFF0C\u4F1A\u5224\u65AD\u4E8C\u7EA7\u7F13\u5B58\u662F\u5426\u6709\u7F13\u5B58\u7ED3\u679C\uFF0C\u5982\u679C\u6709\u5C31\u76F4\u63A5\u8FD4\u56DE\uFF0C\u5982\u679C\u6CA1\u6709\u59D4\u6D3E\u4EA4\u7ED9\u771F\u6B63\u7684\u67E5\u8BE2\u5668Executor \u5B9E\u73B0\u7C7B\uFF0C\u6BD4\u5982SimpleExecutor \u6765\u6267\u884C\u67E5\u8BE2\uFF0C\u518D\u8D70\u5230\u4E00\u7EA7\u7F13\u5B58\u7684\u6D41\u7A0B\u3002\u6700\u540E\u4F1A\u628A\u7ED3\u679C\u7F13\u5B58\u8D77\u6765\uFF0C\u5E76\u4E14\u8FD4\u56DE\u7ED9\u7528\u6237\u3002</p></blockquote><p>SpringBoot\u901A\u8FC7\u542F\u52A8\u7C7B\u6CE8\u89E3@EnableCaching(\u6216\u8005\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u6DFB\u52A0mybatis.configuration.cache-enabled=true)\u5373\u53EF\u5F00\u542F\u4E8C\u7EA7\u7F13\u5B58 A.\u540C\u65F6\u5728mapper\u63A5\u53E3\u4E0A\u6DFB\u52A0\u6CE8\u89E3</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Cacheable(cacheNames = &quot;user&quot;)
    @Select(&quot;select * from user where id = #{id}&quot;)
    User getUserById(Long id);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>//\u4E8C\u7EA7\u7F13\u5B58\u9700\u8981User\u5B9E\u73B0\u5E8F\u5217\u53F7\u63A5\u53E3 \u7136\u540E\u518D\u5BF9\u4E0A\u9762\u7684\u8BFB\u810F\u6570\u636E\u7684\u4F8B\u5B50\u6D4B\u8BD5\u540E\u53D1\u73B0,\u6CA1\u6709\u518D\u51FA\u73B0\u810F\u6570\u636E\u7684\u95EE\u9898. B.\u6216\u8005\u5728*Mapper.xml\u4E2D\u6DFB\u52A0\u4EE5\u4E0B\u914D\u7F6E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;cache type=&quot;org.apache.ibatis.cache.impl.PerpetualCache&quot;
    size=&quot;1024&quot;
    eviction=&quot;LRU&quot;//\u6700\u8FD1\u6700\u5C11\u4F7F\u7528-\u56DE\u6536\u7B56\u7565
    flushInterval=&quot;120000&quot;//\u7F13\u5B58\u5237\u65B0\u95F4\u9694
    readOnly=&quot;false&quot;/&gt; //\u53EA\u8BFB\u66F4\u5FEB,\u53EF\u8BFB\u5199\u66F4\u5B89\u5168
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote><p>1.\u6620\u5C04\u8BED\u53E5\u6587\u4EF6\u4E2D\u6240\u6709\u7684select\u8BED\u53E5\u5C06\u4F1A\u88AB\u7F13\u5B58 2.\u6620\u5C04\u8BED\u53E5\u6587\u4EF6\u4E2D\u6240\u6709\u7684insert update delete\u8BED\u53E5\u4F1A\u5237\u65B0\u7F13\u5B58 3.\u7F13\u5B58\u4F1A\u4F7F\u7528(Least Flush Interval,LRU\u6700\u8FD1\u6700\u5C11\u4F7F\u7528\u7684)\u7B97\u6CD5\u6765\u6536\u56DE 4.\u6839\u636E\u65F6\u95F4\u8868\uFF08\u5982 no Flush Interval,\u6CA1\u6709\u5237\u65B0\u95F4\u9694\uFF09\uFF0C\u7F13\u5B58\u4E0D\u4F1A\u4EE5\u4EFB\u4F55\u65F6\u95F4\u987A\u5E8F\u6765\u5237\u65B0 5.\u7F13\u5B58\u4F1A\u5B58\u50A8\u96C6\u5408\u6216\u5BF9\u8C61\uFF08\u65E0\u8BBA\u67E5\u8BE2\u65B9\u6CD5\u8FD4\u56DE\u4EC0\u4E48\u7C7B\u578B\u7684\u503C\uFF09\u76841024\u4E2A\u5F15\u7528 6.\u7F13\u5B58\u4F1A\u88AB\u89C6\u4E3Aread/wriete(\u53EF\u8BFB/\u53EF\u5199)\u7684\uFF0C\u610F\u5473\u7740\u5BF9\u8C61\u68C0\u7D22\u4E0D\u662F\u5171\u4EAB\u7684\uFF0C\u800C\u4E14\u53EF\u4EE5\u5B89\u5168\u7684\u88AB\u8C03\u7528\u8005\u4FEE\u6539\uFF0C\u800C\u4E0D\u5E72\u6270\u5176\u4ED6\u8C03\u7528\u8005\u6216\u8005\u7EBF\u7A0B\u6240\u505A\u7684\u6F5C\u5728\u4FEE\u6539\u3002 7.\u5728\u5F00\u542F\u4E8B\u52A1\u7684\u524D\u63D0\u4E0B,\u4E8B\u52A1\u4E0D\u63D0\u4EA4\u7684\u8BDD\u4E8C\u7EA7\u7F13\u5B58\u5C06\u4E0D\u4F1A\u751F\u6548</p></blockquote><p>\u4E8C\u7EA7\u7F13\u5B58\u7684\u9002\u7528\u8303\u56F4:</p><blockquote><ol><li>\u4E3A\u6240\u6709\u7684\u589E\u5220\u6539\u90FD\u4F1A\u5237\u65B0\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u5BFC\u81F4\u4E8C\u7EA7\u7F13\u5B58\u5931\u6548\uFF0C\u6240\u4EE5\u9002\u5408\u5728\u67E5\u8BE2\u4E3A\u4E3B\u7684\u5E94\u7528\u4E2D\u4F7F\u7528\uFF0C\u6BD4\u5982\u5386\u53F2\u4EA4\u6613\u3001\u5386\u53F2\u8BA2\u5355\u7684\u67E5\u8BE2\u3002\u5426\u5219\u7F13\u5B58\u5C31\u5931\u53BB\u4E86\u610F\u4E49\u3002</li><li>\u5982\u679C\u591A\u4E2Anamespace \u4E2D\u6709\u9488\u5BF9\u4E8E\u540C\u4E00\u4E2A\u8868\u7684\u64CD\u4F5C\uFF0C\u6BD4\u5982Blog \u8868\uFF0C\u5982\u679C\u5728\u4E00\u4E2Anamespace \u4E2D\u5237\u65B0\u4E86\u7F13\u5B58\uFF0C\u53E6\u4E00\u4E2Anamespace \u4E2D\u6CA1\u6709\u5237\u65B0\uFF0C\u5C31\u4F1A\u51FA\u73B0\u8BFB\u5230\u810F\u6570\u636E\u7684\u60C5\u51B5\u3002\u6240\u4EE5\uFF0C\u63A8\u8350\u5728\u4E00\u4E2AMapper \u91CC\u9762\u53EA\u64CD\u4F5C\u5355\u8868\u7684\u60C5\u51B5\u4F7F\u7528\u3002</li></ol></blockquote><p>\u9274\u4E8EMybatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u5E76\u4E0D\u662F\u5F88\u597D,\u5176\u914D\u7F6E\u53EF\u4EE5\u53C2\u8003\u5982\u4E0B,\u4E4B\u540E\u5C06\u5B66\u4E60\u5F15\u5165Ehcachehe\u548CRedis\u4F5C\u4E3A\u7B2C\u4E09\u65B9\u7F13\u5B58.</p><h3 id="_7-\u591A\u6570\u636E\u6E90" tabindex="-1"><a class="header-anchor" href="#_7-\u591A\u6570\u636E\u6E90" aria-hidden="true">#</a> 7. \u591A\u6570\u636E\u6E90</h3><h4 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h4><p>\u5728\u4E00\u4E2A\u5355\u72EC\u7684\u6A21\u5757\u4E2D,\u914D\u7F6E\u4E24\u79CD\u6570\u636E\u6E90,\u64CD\u4F5C\u4E0D\u540C\u7C7B\u578B\u7684\u6570\u636E\u5E93.</p><p>\u901A\u8FC7\u81EA\u5B9A\u4E49\u914D\u7F6E\u7C7B\u6765\u6307\u5411\u4E0D\u540C\u7684DataSource\u914D\u7F6E,\u6838\u5FC3\u5728\u4E8EMybatis\u4E2D\u7684SqlSessionFactory\u5BF9\u8C61,\u800C\u6CE8\u89E3</p><p>MapperScan\u4E2D\u53EF\u4EE5\u901A\u8FC7sqlSessionFactoryRef\u5C5E\u6027\u6307\u5B9A\u67D0\u4E2AMapper\u5305\u4E0B\u7684\u63A5\u53E3\u7684\u5B9E\u73B0.</p><h4 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h4><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.ds2.jdbc-url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:oracle:thin:@//172.16.0.148:1521/ORCL</span>
<span class="token key attr-name">spring.datasource.ds2.username</span><span class="token punctuation">=</span><span class="token value attr-value">htjgzkx</span>
<span class="token key attr-name">spring.datasource.ds2.password</span><span class="token punctuation">=</span><span class="token value attr-value">htjgzkx</span>
<span class="token key attr-name">spring.datasource.ds2.driver-class-name</span><span class="token punctuation">=</span><span class="token value attr-value">oracle.jdbc.OracleDriver</span>


<span class="token key attr-name">spring.datasource.ds3.jdbc-url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://localhost:3306/</span>
<span class="token key attr-name">spring.datasource.ds3.username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">spring.datasource.ds3.password</span><span class="token punctuation">=</span><span class="token value attr-value">123</span>
<span class="token key attr-name">spring.datasource.ds3.driver-class-name</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.Driver</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="\u914D\u7F6E\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u7C7B" aria-hidden="true">#</a> \u914D\u7F6E\u7C7B</h4><p>\u4E0B\u9762\u7684\u4E24\u4E2A\u914D\u7F6E\u7C7B\u6CE8\u518C\u4E86\u4E0D\u540C\u7684bean,\u6765\u4E3Adb2,db3\u5305\u4E0B\u7684mapper\u63A5\u53E3\u63D0\u4F9B\u4E0D\u540C\u7684\u5BF9\u8C61.Mapper\u63A5\u53E3\u6B63\u5E38\u5199\u5373\u53EF.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>confg<span class="token punctuation">.</span>datasource</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactoryBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">MapperScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Qualifier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span></span><span class="token class-name">DataSourceBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DataSourceTransactionManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">&quot;com.mapper.db2&quot;</span><span class="token punctuation">,</span>sqlSessionFactoryRef <span class="token operator">=</span> <span class="token string">&quot;test2SqlSessionFactory&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSource2Config</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test2&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string">&quot;spring.datasource.ds2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test2SqlSessionFactory&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">test2SqlSessionFactory</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;test2&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">SqlSessionFactoryBean</span> bean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test2TransactionManager&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">test2TransactionManager</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;test2&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test2SqlSessionTemplates&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionTemplate</span> <span class="token function">test2SqlSessionTemplates</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;test2SqlSessionFactory&quot;</span><span class="token punctuation">)</span> <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionTemplate</span><span class="token punctuation">(</span>sqlSessionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>sys<span class="token punctuation">.</span>confg<span class="token punctuation">.</span>datasource</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactoryBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">MapperScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Qualifier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span></span><span class="token class-name">DataSourceBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DataSourceTransactionManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">&quot;com.mapper.db3&quot;</span><span class="token punctuation">,</span>sqlSessionFactoryRef <span class="token operator">=</span> <span class="token string">&quot;test3SqlSessionFactory&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSource3Config</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test3&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string">&quot;spring.datasource.ds3&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test3SqlSessionFactory&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">test3SqlSessionFactory</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;test3&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">SqlSessionFactoryBean</span> bean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test3TransactionManager&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">test3TransactionManager</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;test3&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;test3SqlSessionTemplates&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionTemplate</span> <span class="token function">test3SqlSessionTemplates</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;test3SqlSessionFactory&quot;</span><span class="token punctuation">)</span> <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionTemplate</span><span class="token punctuation">(</span>sqlSessionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br></div></div><h4 id="\u95EE\u9898\u548C\u7F3A\u70B9" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u548C\u7F3A\u70B9" aria-hidden="true">#</a> \u95EE\u9898\u548C\u7F3A\u70B9</h4><p>\u4E8B\u52A1:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;test2TransactionManager&quot;</span><span class="token punctuation">,</span>propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span><span class="token constant">REQUIRES_NEW</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u5982\u679C\u53EA\u662F\u8BFB\u53D6Oracle\u4E2D\u7684\u6570\u636E\u518D\u5199\u5165\u5230Mysql\u4E2D,\u4E8B\u52A1\u53EA\u9700\u8981\u8BBE\u7F6E\u88AB\u5199\u5165\u65B9\u5373\u53EF;\u82E5\u5747\u5B58\u5728\u5199\u5165\u7684\u60C5\u51B5,\u4E8B\u52A1\u5C06\u4E0D\u65B9\u4FBF\u5904\u7406.</p><p>\u66F4\u597D\u7684\u89E3\u51B3\u65B9\u6848:</p><p>\u662F\u5426\u53EF\u4EE5\u901A\u8FC7\u81EA\u5B9A\u4E49\u6CE8\u89E3,\u6765\u5B9E\u73B0Mapper\u63A5\u53E3\u5B9E\u73B0\u7684\u65F6\u5019\u6240\u4F7F\u7528\u7684\u5B9E\u4F8B,\u800C\u4E0D\u662F\u9700\u8981\u5B9E\u73B0\u914D\u7F6E\u597D\u5305.</p><h2 id="mybatis-plus" tabindex="-1"><a class="header-anchor" href="#mybatis-plus" aria-hidden="true">#</a> Mybatis-plus</h2><h3 id="\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165" aria-hidden="true">#</a> \u5F15\u5165</h3>`,159),y=n("MybatisPlus\u80FD\u591F\u4F5C\u4E3A\u4E00\u4E2A\u589E\u5F3AMybatis\u7684\u5DE5\u5177\uFF0C\u5728\u80FD\u591F\u4F7F\u7528MybatisXML\u81EA\u5B9A\u4E49Sql\u7684\u57FA\u7840\u4E0A\uFF0C\u4EE5\u65E0\u4FB5\u5165\u7684\u7279\u70B9\u901A\u8FC7\u5185\u7F6E\u7684Mapper\u548CService\u5B9E\u73B0\u5927\u90E8\u5206\u5355\u8868\u7684\u589E\u4E0A\u6539\u67E5\u64CD\u4F5C\uFF0C\u7B80\u5316\u4EE3\u7801\u3002\u5176\u4E2D\u5E38\u7528\u7684\u5305\u62EC\u4EE3\u7801\u6784\u9020\u5668\u3001\u5206\u9875\u3001QueryWrapper\u7684\u4F7F\u7528\u3002\u66F4\u591A\u4F7F\u7528\u6307\u5357\u5B98\u7F51:"),x={href:"https://mp.baomidou.com/guide/generator.html",target:"_blank",rel:"noopener noreferrer"},S=n("MybatisPlus"),w=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> 	&lt;!--Mybatis Plus--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
            &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;3.0.6&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="\u4EE3\u7801\u751F\u6210\u5668" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u751F\u6210\u5668" aria-hidden="true">#</a> \u4EE3\u7801\u751F\u6210\u5668</h3><p>\u5728\u5F53\u524D\u6700\u65B0\u7684\u7248\u672C\u4E2D3.0.3\u4E4B\u540E\u79FB\u9664\u4E86\u4EE3\u7801\u751F\u6210\u5668\u4E0E\u6A21\u677F\u5F15\u64CE\u7684\u9ED8\u8BA4\u4F9D\u8D56,\u9700\u8981\u624B\u52A8\u5F15\u5165\u6A21\u677F\u5F15\u64CE,\u6BD4\u5982Freemaker.\u5728\u751F\u6210\u7684Mapper\u63A5\u53E3\u4E2D,\u9ED8\u8BA4\u6CA1\u6709\u6DFB\u52A0@Mapper\u6CE8\u89E3,\u5EFA\u8BAE\u5728SpringBoot\u7684\u542F\u52A8\u7C7B\u4E0A\u6DFB\u52A0\u6CE8\u89E3 @MapperScan(&quot;com.demo.mapper&quot;)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	&lt;dependency&gt;
            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;
            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u8FD0\u884C\u4E0B\u9762\u7684main\u65B9\u6CD5\u5373\u53EF\u751F\u6210\u76F8\u5173\u8868\u7684MVC\u4E09\u5C42\u7ED3\u6784\u7684\u4EE3\u7801.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.demo.code;

import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CodeGenerator {

    /**
     * \u8BFB\u53D6\u63A7\u5236\u53F0\u5185\u5BB9
     */
    public static String scanner(String tip) {
        @SuppressWarnings(&quot;resource&quot;)
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append(&quot;\u8BF7\u8F93\u5165&quot; + tip + &quot;\uFF1A&quot;);
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotEmpty(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException(&quot;\u8BF7\u8F93\u5165\u6B63\u786E\u7684&quot; + tip + &quot;\uFF01&quot;);
    }
    /*
        Mybatis-plus \u7248\u672C,\u6700\u65B0\u7248\u672C\u6709\u95EE\u9898
        &lt;dependency&gt;
            &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
            &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;3.0.6&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;
            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;
        &lt;/dependency&gt;
     */
    public static void main(String[] args) {
        // \u4EE3\u7801\u751F\u6210\u5668
        AutoGenerator mpg = new AutoGenerator();

        // \u5168\u5C40\u914D\u7F6E
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty(&quot;user.dir&quot;);
        gc.setOutputDir(projectPath + &quot;/day08/src/main/java&quot;);//\u6A21\u5757\u540D
        gc.setAuthor(&quot;Raynor&quot;);
        gc.setOpen(false);
        // gc.setSwagger2(true); \u5B9E\u4F53\u5C5E\u6027 Swagger2 \u6CE8\u89E3
        mpg.setGlobalConfig(gc);

        // \u6570\u636E\u6E90\u914D\u7F6E
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl(&quot;jdbc:mysql://localhost:3306/test?useUnicode=true&amp;useSSL=false&amp;characterEncoding=utf8&amp;serverTimezone=UTC&quot;);
        //dsc.setSchemaName(&quot;public&quot;);
        dsc.setDriverName(&quot;com.mysql.cj.jdbc.Driver&quot;);
        dsc.setUsername(&quot;root&quot;);
        dsc.setPassword(&quot;123456&quot;);
        mpg.setDataSource(dsc);

        // \u5305\u914D\u7F6E
        PackageConfig pc = new PackageConfig();
        //pc.setModuleName(scanner(&quot;\u6A21\u5757\u540D&quot;));
        pc.setParent(&quot;com.demo&quot;);
        mpg.setPackageInfo(pc);

        // \u81EA\u5B9A\u4E49\u914D\u7F6E
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };
        List&lt;FileOutConfig&gt; focList = new ArrayList&lt;&gt;();
        focList.add(new FileOutConfig(&quot;/templates/mapper.xml.ftl&quot;) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // \u81EA\u5B9A\u4E49\u8F93\u5165\u6587\u4EF6\u540D\u79F0
                return projectPath + &quot;/code/src/main/resources/mapper/&quot;
                        + &quot;/&quot; + tableInfo.getEntityName() + &quot;Mapper&quot; + StringPool.DOT_XML;
            }
        });
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);
        mpg.setTemplate(new TemplateConfig().setXml(null));

        // \u7B56\u7565\u914D\u7F6E
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        // strategy.setSuperEntityClass(&quot;com.baomidou.ant.common.BaseEntity&quot;);
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // strategy.setSuperControllerClass(&quot;com.baomidou.ant.common.BaseController&quot;);
        strategy.setInclude(scanner(&quot;\u8868\u540D&quot;));
        strategy.setSuperEntityColumns(&quot;id&quot;);
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + &quot;_&quot;);
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br></div></div><h3 id="\u517C\u5BB9\u539F\u751Fmybatis" tabindex="-1"><a class="header-anchor" href="#\u517C\u5BB9\u539F\u751Fmybatis" aria-hidden="true">#</a> \u517C\u5BB9\u539F\u751FMybatis</h3><p>\u5728SpringBoot\u7684\u914D\u7F6E\u6587\u4EF6\u4E2D\u6DFB\u52A0\u4E00\u4E0B\u914D\u7F6E,\u80FD\u591F\u542F\u7528\u539F\u751FMybatis\u7684\u529F\u80FD.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#mybatis-plus \u5B9E\u73B0\u540C\u65F6\u517C\u4EFB\u539F\u751FMybatis\u7684xml\u529F\u80FD
mybatis-plus.mapper-locations=classpath:mapper/*.xml
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u793A\u4F8B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.demo.mapper.UserMapper&quot;&gt;
    &lt;select id=&quot;selectUserByName&quot; resultType=&quot;com.demo.entity.User&quot; parameterType=&quot;java.lang.String&quot;&gt;
        select * from user where name = #{name}
    &lt;/select&gt;
&lt;/mapper&gt;
================================
public interface UserMapper extends BaseMapper&lt;User&gt; {
    List&lt;User&gt; selectUserByName(String name);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="\u5206\u9875\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5206\u9875\u63D2\u4EF6" aria-hidden="true">#</a> \u5206\u9875\u63D2\u4EF6</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.demo.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;


@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
@MapperScan(&quot;com.demo.mapper&quot;)//\u626B\u63CF mapper\u63A5\u53E3\u5BF9\u5E94\u7684\u5305

public class MybatisPageConfig {
	
	/**
     * mybatis-plus SQL\u6267\u884C\u6548\u7387\u63D2\u4EF6\u3010\u751F\u4EA7\u73AF\u5883\u53EF\u4EE5\u5173\u95ED\u3011
     */
    @Bean
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }
	/**
     * \u5206\u9875\u63D2\u4EF6
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
    @GetMapping(&quot;/{limit}/{offset}/&quot;)
    public IPage&lt;User&gt; userPage(@PathVariable Long limit,@PathVariable Long offset){
        IPage&lt;User&gt; p = new Page&lt;User&gt;(offset,limit);
        return userService.page(p);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="querywrapper" tabindex="-1"><a class="header-anchor" href="#querywrapper" aria-hidden="true">#</a> QueryWrapper</h3><p>\u7EE7\u627F\u81EA AbstractWrapper ,\u81EA\u8EAB\u7684\u5185\u90E8\u5C5E\u6027 entity \u4E5F\u7528\u4E8E\u751F\u6210 where \u6761\u4EF6.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/{limit}/{offset}/&quot;)
    public IPage&lt;User&gt; userPage(@PathVariable Long limit, @PathVariable Long offset, @RequestBody User user){
        QueryWrapper&lt;User&gt; queryWrapper =new QueryWrapper();
        queryWrapper.eq(&quot;name&quot;,user.getName())
                .eq(&quot;password&quot;,user.getPassword())
                .orderByDesc(&quot;time&quot;);
        IPage&lt;User&gt; p = new Page&lt;User&gt;(offset,limit);
        return userService.page(p,queryWrapper);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="jpa" tabindex="-1"><a class="header-anchor" href="#jpa" aria-hidden="true">#</a> JPA</h2><h3 id="\u5F15\u5165-1" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165-1" aria-hidden="true">#</a> \u5F15\u5165</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u57FA\u7840\u914D\u7F6E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>##validate \u52A0\u8F7Dhibernate\u65F6\uFF0C\u9A8C\u8BC1\u521B\u5EFA\u6570\u636E\u5E93\u8868\u7ED3\u6784
##create  \u6BCF\u6B21\u52A0\u8F7Dhibernate\uFF0C\u91CD\u65B0\u521B\u5EFA\u6570\u636E\u5E93\u8868\u7ED3\u6784
##create-drop \u52A0\u8F7Dhibernate\u65F6\u521B\u5EFA\uFF0C\u9000\u51FA\u662F\u5220\u9664\u8868\u7ED3\u6784
##update \u52A0\u8F7Dhibernate\u81EA\u52A8\u66F4\u65B0\u6570\u636E\u5E93\u7ED3\u6784
##validate \u542F\u52A8\u65F6\u9A8C\u8BC1\u8868\u7684\u7ED3\u6784\uFF0C\u4E0D\u4F1A\u521B\u5EFA\u8868
##none \u542F\u52A8\u65F6\u4E0D\u505A\u4EFB\u4F55\u64CD\u4F5C
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="jparepository-crudrepository" tabindex="-1"><a class="header-anchor" href="#jparepository-crudrepository" aria-hidden="true">#</a> JpaRepository/CrudRepository</h3><p>Jpa\u7684\u6838\u5FC3\u5C31\u662F\u58F0\u660E\u4E00\u4E2A\u63A5\u53E3\u7EE7\u627FJpa\u63D0\u4F9B\u7684\u63A5\u53E3,\u5176\u4E2D\u5E38\u7528\u7684\u662FJpaRepository/CrudRepository,\u524D\u8005\u7EE7\u627F\u4E86PagingAndSortingRepository,\u80FD\u591F\u5B9E\u73B0\u5206\u9875\u548C\u6392\u5E8F\u7684\u76F8\u5173\u64CD\u4F5C,\u540E\u8005\u63D0\u4F9B\u57FA\u7840\u7684\u589E\u4E0A\u6539\u67E5\u64CD\u4F5C,\u5176\u4E2D\u5177\u4F53\u7684\u5B9E\u73B0\u6709\u4E00\u5B9A\u7684\u533A\u522B,\u4E0B\u9762\u7528JpaRepository\u4F5C\u4E3A\u793A\u4F8B,\u4E0B\u9762\u5B9E\u73B0\u4E86\u5206\u9875\u548C\u81EA\u5B9A\u4E49\u67E5\u8BE2\u7684\u529F\u80FD.</p><h4 id="user-java" tabindex="-1"><a class="header-anchor" href="#user-java" aria-hidden="true">#</a> User.java</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import lombok.Data;
import javax.persistence.*;

@Entity //\u9ED8\u8BA4\u6240\u6709\u5C5E\u6027\u6620\u5C04\u5230\u6570\u636E\u5E93\u4E2D\u7684\u540C\u540D\u5B57\u6BB5
@Table(name = &quot;jpa_user&quot;) // \u8868\u540D
@Data
public class User {
    @Id //\u4E3B\u952E
    @GeneratedValue(strategy = GenerationType.AUTO) // \u81EA\u589E
    private Long id;
    private String username;

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="blog-java" tabindex="-1"><a class="header-anchor" href="#blog-java" aria-hidden="true">#</a> Blog.java</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Entity
@Table(name = &quot;jpa_blog&quot;)
@Data
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String content;
    @ManyToOne
    private User author;// \u5EFA\u8868\u540E\u5C06\u521B\u5EFA\u5916\u952E:\u4E3Auser\u8868\u7684\u4E3B\u952E,\u9ED8\u8BA4\u7EA7\u8054\u5173\u7CFB\u4E3ARESTRICT,\u5B57\u6BB5\u540D\u4E3A author_id
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="blogrepository" tabindex="-1"><a class="header-anchor" href="#blogrepository" aria-hidden="true">#</a> BlogRepository</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BlogRepository extends JpaRepository&lt;Blog,Long&gt; {
    @Query(&quot;select blog from Blog blog join blog.author author where author.username = ?1&quot;)
    Page&lt;Blog&gt; findByUsername(String username, Pageable pageable);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="blogcontroller" tabindex="-1"><a class="header-anchor" href="#blogcontroller" aria-hidden="true">#</a> BlogController</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;/blog&quot;)
public class BlogController {

    @Resource
    private BlogRepository blogRepository;

    @GetMapping(&quot;/{pageNum}/{pageSize}/{username}&quot;)
    public Page&lt;Blog&gt; getBlogByUsername(@PathVariable Integer pageNum,
        @PathVariable Integer pageSize, @PathVariable String username){
        PageRequest pageRequest = PageRequest.of(pageNum,pageSize);
        return blogRepository.findByUsername(username,pageRequest);
    }
    @PostMapping(&quot;/&quot;)
    public String addBlog(@RequestBody Blog blog){
        blogRepository.save(blog);
        return &quot;ok&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>\u5148\u6DFB\u52A0\u6570\u636E,\u5BF9\u4E0A\u8FF0addBlog\u63A5\u53E3\u800C\u8A00,\u76F4\u63A5\u7528Blog\u63A5\u6536\u524D\u53F0\u53C2\u6570,\u9700\u8981\u5B8C\u6574\u7684Json\u6570\u636E \u6BD4\u5982:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>POST /blog/1/1/Paul HTTP/1.1
Content-Length: 69
Content-Type: application/json
Host: localhost:8080
{&quot;title&quot;:&quot;title3&quot;,&quot;content&quot;:&quot;c3&quot;,&quot;author&quot;:{&quot;id&quot;:1,&quot;username&quot;:&quot;Paul&quot;}}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u6DFB\u52A0\u5B8C\u6570\u636E\u540E\u5C31\u53EF\u4EE5\u8C03\u7528\u67E5\u8BE2\u63A5\u53E3,\u8BE5\u63A5\u53E3\u4E3B\u8981\u662F\u6EE1\u8DB3\u6839\u636E\u7528\u6237\u540D\u67E5\u627E\u8BE5\u7528\u6237\u521B\u5EFA\u7684blog\u6570\u636E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>http://localhost:8080/blog/0/2/Paul
//\u9700\u8981\u6CE8\u610F\u7684\u662FPageRequest.of(pageNum,pageSize) pageNum\u662F\u4ECE0\u5F00\u59CB\u7684
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="jpa\u52A8\u6001\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#jpa\u52A8\u6001\u67E5\u8BE2" aria-hidden="true">#</a> Jpa\u52A8\u6001\u67E5\u8BE2</h3>`,36),C=n("Jpa\u5F00\u53D1\u7EF4\u62A4\u7B80\u5355\u9AD8\u6548,\u4F46\u662F\u5BF9\u4E8E\u4E1A\u52A1\u590D\u5236\u7684\u9700\u6C42\u800C\u8A00,\u5176\u5173\u8054\u67E5\u8BE2,\u52A8\u6001\u67E5\u8BE2\u90FD\u662F\u5176\u7F3A\u70B9,\u5BF9\u4E8E\u5E38\u7528\u7684\u52A8\u6001\u67E5\u8BE2,\u53EF\u4EE5\u53C2\u8003"),M={href:"https://github.com/wenhao/jpa-spec",target:"_blank",rel:"noopener noreferrer"},T=n("Jpa\u52A8\u6001\u67E5\u8BE2"),R=n(",\u4E0B\u9762\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u4F8B\u5B50,\u5982\u679C\u672A\u6765\u6709\u9700\u8981\u7684\u8BDD\u53EF\u4EE5\u6DF1\u5165\u7814\u7A76\u4E00\u4E0B."),P=a(`<h2 id="cache" tabindex="-1"><a class="header-anchor" href="#cache" aria-hidden="true">#</a> Cache</h2><h3 id="spring-cache" tabindex="-1"><a class="header-anchor" href="#spring-cache" aria-hidden="true">#</a> Spring-Cache</h3><p>Spring\u4ECE3.1\u5F00\u59CB\u5B9A\u4E49\u4E86org.springframework.cache.Cache\u548Corg.springframework.cache.CacheManager\u63A5\u53E3\u6765\u7EDF\u4E00\u4E0D\u540C\u7684\u7F13\u5B58\u6280\u672F\uFF1B\u5E76\u652F\u6301\u4F7F\u7528JCache\uFF08JSR-107\uFF09\u6CE8\u89E3 Spring\u81EA\u5E26\u7684\u7F13\u5B58\u7C7B\u578B\u4E3ASimple\uFF0C\u8FD9\u4E2A\u7F13\u5B58\u4E0ESpring Boot\u5E94\u7528\u5728\u540C\u4E00\u4E2AJava\u865A\u62DF\u673A\u5185\uFF0C\u9002\u5408\u5355\u4F53\u5E94\u7528\u7CFB\u7EDF\u3002</p><h4 id="\u914D\u7F6E\u548C\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u548C\u4F9D\u8D56" aria-hidden="true">#</a> \u914D\u7F6E\u548C\u4F9D\u8D56</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	&lt;!-- Spring boot Cache--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-cache&lt;/artifactId&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol><li>application.properties</li></ol><blockquote><p>#Simple\uFF1A\u57FA\u4E8EConcurrentHashMap\u5B9E\u73B0\u7684\u7F13\u5B58 #None\uFF1A\u7981\u6B62\u4F7F\u7528\u7F13\u5B58\u3002 #Redis\uFF1A\u4F7F\u7528Redis\u7F13\u5B58 .... spring.cache.type=Simple</p></blockquote><ol start="2"><li>\u542F\u52A8\u7C7B\u6DFB\u52A0\u6CE8\u89E3</li></ol><blockquote><p><a href="/EnableCaching">@EnableCaching </a></p></blockquote><h4 id="\u5E38\u7528\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u6CE8\u89E3" aria-hidden="true">#</a> \u5E38\u7528\u6CE8\u89E3</h4><blockquote><ol><li><a href="/Cacheable">@Cacheable </a> \u4E3B\u8981\u9488\u5BF9\u65B9\u6CD5\u914D\u7F6E\uFF0C\u80FD\u591F\u6839\u636E\u65B9\u6CD5\u7684\u8BF7\u6C42\u53C2\u6570\u5BF9\u5176\u8FDB\u884C\u7F13\u5B58</li><li><a href="/CachePut">@CachePut </a> \u4FDD\u8BC1\u65B9\u6CD5\u88AB\u8C03\u7528\uFF0C\u53C8\u5E0C\u671B\u7ED3\u679C\u88AB\u7F13\u5B58\u3002\u4E0E@Cacheable\u533A\u522B\u5728\u4E8E\u662F\u5426\u6BCF\u6B21\u90FD\u8C03\u7528\u65B9\u6CD5\uFF0C\u5E38\u7528\u4E8E\u66F4\u65B0</li><li><a href="/CacheEvict">@CacheEvict </a> \u6E05\u7A7A\u7F13\u5B58 \u4EE5\u4E0A\u4E09\u4E2A\u6CE8\u89E3\u90FD\u6709\u4EE5\u4E0B\u5C5E\u6027: value:\u6307\u5B9A\u81F3\u5C11\u4E00\u4E2A\u540D\u79F0 key:SpEL\u8868\u8FBE\u5F0F\u7F16\u5199(\u53EF\u7A7A),\u5982@Cacheable(value=&quot;demo&quot;,key=&quot;#id&quot;) condition:\u7F13\u5B58\u6761\u4EF6(\u53EF\u7A7A),\u5982 condition=&quot;#userName.length()&gt;2&quot; unless:\u5426\u5B9A\u7F13\u5B58,\u5F53\u7ED3\u679C\u4E3Atrue,\u5219\u4E0D\u7F13\u5B58unless=&quot;#userName.length()&gt;2&quot;</li></ol></blockquote><p>\u53E6\u5916@CacheEvict\u53E6\u5916\u6709allEntries=true:\u65B9\u6CD5\u8C03\u7528\u540E\u6E05\u9664\u7F13\u5B58 beforeInvocation=true:\u65B9\u6CD5\u6267\u884C\u524D\u6E05\u9664\u7F13\u5B58,\u51FA\u73B0\u5F02\u5E38\u5219\u4E0D\u4F1A</p><blockquote><p><a href="/CacheConfig">@CacheConfig </a> \u7EDF\u4E00\u914D\u7F6E\u672C\u7C7B\u7684\u7F13\u5B58\u6CE8\u89E3\u7684\u5C5E\u6027</p></blockquote><h4 id="spel" tabindex="-1"><a class="header-anchor" href="#spel" aria-hidden="true">#</a> SpEL</h4><p>SpEL\u7C7B\u4F3C\u4E8EEL\u8868\u8FBE\u5F0F, \u5E38\u89C1\u7684\u5305\u542B \u5173\u7CFB\u8FD0\u7B97:&gt; &lt; = != gt eq... \u7B97\u672F:+ - * / % \u903B\u8F91:&amp;&amp;\uFF0C||\uFF0C!\uFF0Cand\uFF0Cor\uFF0Cnot\uFF0Cbetween\uFF0Cinstanceof \u6761\u4EF6: ()?()\u{1F626}) \u5177\u4F53\u53EF\u53C2\u8003Spring\u5B98\u65B9\u6587\u6863 \u9664\u6B64\u4E4B\u5916\u8FD8\u63D0\u4F9B\u4E86\u4E00\u4E9BSpEL\u4E0A\u4E0B\u6587\u53EF\u4EE5\u4F7F\u7528</p><blockquote><ul><li>methodName:\u5F53\u524D\u88AB\u8C03\u7528\u7684\u65B9\u6CD5\u540D</li><li>method:\u5F53\u524D\u88AB\u8C03\u7528\u7684\u65B9\u6CD5</li><li>target:\u5F53\u524D\u88AB\u8C03\u7528\u7684\u76EE\u6807\u5BF9\u8C61\u5B9E\u4F8B</li><li>targetClass:\u5F53\u524D\u88AB\u8C03\u7528\u7684\u76EE\u6807\u5BF9\u8C61\u7684\u7C7B</li><li>args:\u5F53\u524D\u88AB\u8C03\u7528\u7684\u65B9\u6CD5\u7684\u53C2\u6570\u5217\u8868</li><li>caches:\u5F53\u524D\u65B9\u6CD5\u8C03\u7528\u4F7F\u7528\u7684\u7F13\u5B58\u5217\u8868 \u4EE5\u4E0A\u90FD\u5728#root\u4E0B,\u6BD4\u5982:#root.targetClass</li><li>Argument Name:\u5F53\u524D\u88AB\u8C03\u7528\u7684\u65B9\u6CD5\u7684\u53C2\u6570\uFF0C\u5982findUser(User user),\u53EF\u4EE5\u901A\u8FC7#user.id\u83B7\u5F97\u53C2\u6570</li><li>result:\u65B9\u6CD5\u6267\u884C\u540E\u7684\u8FD4\u56DE\u503C\uFF08\u4EC5\u5F53\u65B9\u6CD5\u6267\u884C\u540E\u7684\u5224\u65AD\u6709\u6548\uFF0C\u5982 unless cacheEvict\u7684beforeInvocation=false\uFF09</li></ul></blockquote><h4 id="\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B" aria-hidden="true">#</a> \u793A\u4F8B</h4><ol><li><a href="/Cacheable">@Cacheable </a></li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
@CacheConfig(cacheNames = &quot;myCache&quot;)
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt; implements IUserService {
    @Resource
    private UserMapper userMapper;

    @Override
    @Cacheable(key = &quot;#id&quot;)
    //\u5982\u679C\u5728CacheConfig\u4E2D\u6307\u5B9A\u4E86name,\u6B64\u5904\u53EF\u4EE5\u4E0D\u7528\u5199value\u503C
    //\u4E5F\u53EF\u4EE5\u7528 \u201C#p\u53C2\u6570index\u201D,\u6B64\u5904\u4E3A #p0
    public User getOne(Long id) {
        return userMapper.selectById(id);
    }
}

    @Resource
    IUserService userService;
    @Test
    void contextLoads() {
        log.info(userService.getOne(1L).toString());
        log.info(userService.getOne(1L).toString());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>\u8FDE\u7EED\u6267\u884C\u4E24\u6B21\u67E5\u8BE2\u540E,\u53EF\u89C1\u63A7\u5236\u53F0\u53EA\u6709\u4E00\u6B21SQL. 2. <a href="/CachePut">@CachePut </a></p><blockquote><p>\u4E3B\u8981\u9488\u5BF9\u65B9\u6CD5\u914D\u7F6E\uFF0C\u80FD\u591F\u6839\u636E\u65B9\u6CD5\u7684\u8BF7\u6C42\u53C2\u6570\u5BF9\u5176\u7ED3\u679C\u8FDB\u884C\u7F13\u5B58\uFF0C\u548C <a href="/Cacheable">@Cacheable </a> \u4E0D\u540C\u7684\u662F\uFF0C\u5B83\u6BCF\u6B21\u90FD\u4F1A\u89E6\u53D1\u771F\u5B9E\u65B9\u6CD5\u7684\u8C03\u7528 \u3002\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u7528\u6237\u66F4\u65B0\u7F13\u5B58\u6570\u636E\u3002\u4F46\u9700\u8981\u6CE8\u610F\u7684\u662F\u8BE5\u6CE8\u89E3\u7684value \u548C key \u5FC5\u987B\u4E0E\u8981\u66F4\u65B0\u7684\u7F13\u5B58\u76F8\u540C\uFF0C\u4E5F\u5C31\u662F\u4E0E<a href="/Cacheable">@Cacheable </a> \u76F8\u540C\u3002</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>     @Override
    @CachePut(key = &quot;#user.id&quot;)
    public User updateUser(User user) {
        return userMapper.updateById(user);
    }

    @Test
    void contextLoads() {
        User user = userService.getOne(1L);
        user.setPassword(&quot;11111&quot;);
        userService.updateUser(user);
        log.info(userService.getOne(1L).toString());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>//\u7531\u4E8EupdateUser\u548CgetOne\u90FD\u5728UserServiceImpl\u4E0B,\u800CUserServiceImpl\u914D\u7F6E\u4E86[[@CacheConfig(cacheNames ](/CacheConfig(cacheNames ) ](/CacheConfig(cacheNames ) = &quot;user&quot;),\u6240\u4EE5\u5728\u65B9\u6CD5\u4E0A\u672A\u58F0\u660Evalue\u503C\u5F97\u60C5\u51B5\u4E0B,\u8FD9\u4E9B\u65B9\u6CD5\u7684value\u90FD\u662F&#39;user&#39; // \u8FD9\u91CC\u6709\u4E00\u4E2A\u5751,\u5BF9\u4E8Ekey\u548Cvalue\u90FD\u76F8\u540C\u7684\u7F13\u5B58\u65B9\u6CD5,\u5982\u679C\u8FD4\u56DE\u7684\u7ED3\u679C\u4E0E@Cacheable\u7684\u8FD4\u56DE\u7ED3\u679C\u4E0D\u4E00\u81F4,\u5B83\u5C06\u5C1D\u8BD5\u7C7B\u578B\u8F6C\u6362,\u5982\u679C\u4E0A\u9762\u7684update\u8FD4\u56DEint\u7C7B\u578B,\u5219\u4F1A\u62A5\u7C7B\u578B\u8F6C\u6362\u5F02\u5E38:user\u4E0D\u80FD\u8F6C\u4E3Ainteger 3. <a href="/CacheEvict">@CacheEvict </a></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    //\u6E05\u9664\u4E00\u6761\u7F13\u5B58\uFF0Ckey\u4E3A\u8981\u6E05\u7A7A\u7684\u6570\u636E
    @CacheEvict(key = &quot;#p0.id&quot;)
    public void delete(User user){
    }

    //\u65B9\u6CD5\u8C03\u7528\u540E\u6E05\u7A7A\u6240\u6709\u7F13\u5B58
    @CacheEvict(allEntries = true)
    public void deleteAll(){

    }

    @Test
    void contextLoads() {
        User user = userService.getOne(1L);
        user.setPassword(&quot;11111&quot;);
        userService.updateUser(user);
        log.info(userService.getOne(1L).toString());
        userService.delete(user);
        log.info(userService.getOne(1L).toString());//\u53EF\u89C1\u7ED3\u679C:\u7F13\u5B58\u88AB\u5220\u9664\u540E,\u9700\u8981\u518D\u6B21\u67E5\u8BE2\u6570\u636E\u5E93
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="ehcache" tabindex="-1"><a class="header-anchor" href="#ehcache" aria-hidden="true">#</a> Ehcache</h3><blockquote><p>\u662F\u73B0\u5728\u6700\u6D41\u884C\u7684\u7EAFJava\u5F00\u6E90\u7F13\u5B58\u6846\u67B6\uFF0C\u914D\u7F6E\u7B80\u5355\u3001\u7ED3\u6784\u6E05\u6670\u3001\u529F\u80FD\u5F3A\u5927\uFF0C\u6700\u521D\u77E5\u9053\u5B83\uFF0C\u662F\u4ECEHibernate\u7684\u7F13\u5B58\u5F00\u59CB\u7684, \u662FHibernate\u7684\u4E8C\u7EA7\u7F13\u5B58\u6280\u672F\u4E4B\u4E00\uFF0C\u53EF\u4EE5\u628A\u67E5\u8BE2\u51FA\u6765\u7684\u6570\u636E\u5B58\u50A8\u5728\u5185\u5B58\u6216\u8005\u78C1\u76D8\uFF0C\u8282\u7701\u4E0B\u6B21\u540C\u6837\u67E5\u8BE2\u8BED\u53E5\u518D\u6B21\u67E5\u8BE2\u6570\u636E\u5E93\uFF0C\u5927\u5E45\u51CF\u8F7B\u6570\u636E\u5E93\u538B\u529B</p></blockquote><h4 id="\u4F9D\u8D56\u548C\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56\u548C\u914D\u7F6E" aria-hidden="true">#</a> \u4F9D\u8D56\u548C\u914D\u7F6E</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-cache&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.ehcache&lt;/groupId&gt;
    &lt;artifactId&gt;ehcache&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u52A0\u5165:</p><blockquote><p>spring.cache.type=ehcache spring.cache.ehcache.config=classpath:/ehcache.xml</p></blockquote><p>idea\u4E2D\u6DFB\u52A0\u5B8C\u4F9D\u8D56\u540E\u5C06\u5728src/resources\u4E0B\u51FA\u73B0\u4E00\u4E2Aehcahe.xml,</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;ehcache xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
         xsi:noNamespaceSchemaLocation=&quot;http://ehcache.org/ehcache.xsd&quot;
         name=&quot;ZONG&quot;
         updateCheck=&quot;false&quot;
         maxBytesLocalHeap=&quot;16M&quot;&gt;

    &lt;diskStore path=&quot;/data/app/cache/ehcache&quot;/&gt; &lt;!--\u78C1\u76D8\u8DEF\u5F84--&gt;
    &lt;defaultCache
            eternal=&quot;false&quot;
            overflowToDisk=&quot;false&quot;
            maxElementsInMemory=&quot;10000&quot;
            timeToIdleSeconds=&quot;3600&quot;
            timeToLiveSeconds=&quot;36000&quot;
    /&gt;
&lt;/ehcache&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>\u5728\u91CC\u9762\u6DFB\u52A0 cache-template \u548C cache \u6807\u7B7E,\u7136\u540E\u4F7F\u7528\u7684\u65F6\u5019[[@CacheConfig(cacheNames ](/CacheConfig(cacheNames ) ](/CacheConfig(cacheNames ) = {&quot;myuser&quot;})\u4E2D\u7684cacheNames\u7684\u540D\u5B57\uFF0Cxml\u4E2D\u7684alias\u5FC5\u987B\u4E5F\u6709\uFF0C\u4E0D\u7136\u4F1A\u62A5\u627E\u4E0D\u5230\u7F13\u5B58\u540D\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>     &lt;cache name=&quot;user&quot; eternal=&quot;false&quot;
           timeToIdleSeconds=&quot;120&quot; timeToLiveSeconds=&quot;600&quot; overflowToDisk=&quot;true&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u6CE8\u610F\u81EA\u5DF1\u5B9A\u4E49\u7684cache\u4E2D\u4E0D\u80FD\u6DFB\u52A0maxElementsInMemory\u5C5E\u6027,\u5426\u5219\u4F1A\u62A5\u9519</p><h3 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h3><ul><li>\u5BF9\u4E8E\u5206\u5E03\u5F0F\u5E94\u7528\uFF0C\u901A\u5E38\u90FD\u4F1A\u5C06\u7F13\u5B58\u653E\u5728\u4E00\u53F0\u6216\u8005\u591A\u53F0\u4E13\u95E8\u7684\u7F13\u5B58\u670D\u52A1\u5668\u4E0A\u3002\u4F7F\u7528Redis\u4F5C\u4E3A\u7F13\u5B58\u662F\u4E00\u79CD\u5E38\u7528\u7684\u9009\u62E9\u3002Redis\u4E0D\u4EC5\u53EF\u4EE5\u4F5C\u4E3A\u7F13\u5B58,\u540E\u7EED\u5C06\u4F1A\u5BF9Redis\u6DF1\u5165\u5B66\u4E60.</li></ul><h4 id="\u4F9D\u8D56\u548C\u914D\u7F6E-1" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56\u548C\u914D\u7F6E-1" aria-hidden="true">#</a> \u4F9D\u8D56\u548C\u914D\u7F6E</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-cache&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;!-- redis\u4F9D\u8D56commons-pool --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
    &lt;artifactId&gt;commons-pool2&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u914D\u7F6E\u5982\u4E0B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring.cache.type=Redis
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.lettuce.pool.max-active=8
spring.redis.lettuce.pool.max-idle=8
spring.redis.lettuce.pool.min-idle=0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="\u5B9A\u5236\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u5236\u7F13\u5B58" aria-hidden="true">#</a> \u5B9A\u5236\u7F13\u5B58</h4><p>\u53EF\u4EE5\u901A\u8FC7\u5BF9RedisCacheManager\u8FDB\u884C\u5B9A\u5236\u7F13\u5B58\u5B58\u6D3B\u65F6\u95F4\\\u5E8F\u5217\u5316\u7B49,\u4E5F\u53EF\u4EE5\u4E0D\u8FDB\u884C\u989D\u5916\u7684\u914D\u7F6E,\u6B64\u65F6\u76F4\u63A5\u6D4B\u8BD5\u53EF\u89C1Redis\u4E2D\u5DF2\u7ECF\u6709\u653E\u8FDB\u6765\u7684\u7F13\u5B58\u4E86.</p><p>RedisCacheManager\u9ED8\u8BA4\u4F7F\u7528\u7684\u662FJdkSerializationRedisSerializer,\u53EF\u4EE5\u4F7F\u7528Jackson2JsonRedisSerializer \u6BD4\u5982\u8FD9\u6837\u7684\u914D\u7F6E,\u914D\u7F6E\u4E86CacheManager\u7684\u540C\u65F6 \u5C06RedisCacheManager \u548CRedisTemplate\u90FD\u914D\u7F6E\u4E86Jackson\u89E3\u6790\u5668.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> package com.demo.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Configuration
@AutoConfigureAfter(RedisAutoConfiguration.class)
public class CacheConfig extends CachingConfigurerSupport {

     @Bean(name = &quot;redisTemplate&quot;)
     public RedisTemplate&lt;String,Object&gt; redisTemplate(RedisConnectionFactory redisConnectionFactory){
         RedisTemplate&lt;String,Object&gt; redisTemplate = new RedisTemplate&lt;&gt;();
         redisTemplate.setConnectionFactory(redisConnectionFactory);
         redisTemplate.setKeySerializer(keySerializer());
         redisTemplate.setHashKeySerializer(keySerializer());
         redisTemplate.setValueSerializer(valueSerializer());
         redisTemplate.setHashValueSerializer(valueSerializer());
         return redisTemplate;
     }

    private RedisSerializer&lt;String&gt; keySerializer() {
        return new StringRedisSerializer();
    }
    private RedisSerializer&lt;Object&gt; valueSerializer() {
        Jackson2JsonRedisSerializer&lt;Object&gt; jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer&lt;Object&gt;(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        return jackson2JsonRedisSerializer;
    }
    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory factory) {

        // \u751F\u6210\u4E00\u4E2A\u9ED8\u8BA4\u914D\u7F6E\uFF0C\u901A\u8FC7config\u5BF9\u8C61\u5373\u53EF\u5BF9\u7F13\u5B58\u8FDB\u884C\u81EA\u5B9A\u4E49\u914D\u7F6E
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(valueSerializer()));

        // \u8BBE\u7F6E\u7F13\u5B58\u7684\u9ED8\u8BA4\u8FC7\u671F\u65F6\u95F4\uFF0C\u4E5F\u662F\u4F7F\u7528Duration\u8BBE\u7F6E
        config = config.entryTtl(Duration.ofMinutes(10))
                .disableCachingNullValues();     // \u4E0D\u7F13\u5B58\u7A7A\u503C

        // \u8BBE\u7F6E\u4E00\u4E2A\u521D\u59CB\u5316\u7684\u7F13\u5B58\u7A7A\u95F4set\u96C6\u5408
        Set&lt;String&gt; cacheNames = new HashSet&lt;&gt;();
        cacheNames.add(&quot;space&quot;);
        cacheNames.add(&quot;user&quot;);

        // \u5BF9\u6BCF\u4E2A\u7F13\u5B58\u7A7A\u95F4\u5E94\u7528\u4E0D\u540C\u7684\u914D\u7F6E
        Map&lt;String, RedisCacheConfiguration&gt; configMap = new HashMap&lt;&gt;();
        // \u901A\u8FC7Duration\u53EF\u4EE5\u81EA\u5DF1\u5B9E\u73B0\u4EE5\u4EC0\u4E48\u65F6\u95F4\u4E3A\u5355\u4F4D
        configMap.put(&quot;space&quot;, config.entryTtl(Duration.ofMinutes(1)));
        configMap.put(&quot;user&quot;, config.entryTtl(Duration.ofSeconds(10)));

        return RedisCacheManager
                .builder(RedisCacheWriter.nonLockingRedisCacheWriter(factory))
                .initialCacheNames(cacheNames)
                 .withInitialCacheConfigurations(configMap)
                .cacheDefaults(config).build();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br></div></div>`,45);function j(I,L){const e=c("ExternalLinkIcon");return l(),r(o,null,[u,s("p",null,[b,s("a",m,[d,p(e)])]),k,s("p",null,[g,s("a",h,[v,p(e)]),f]),q,s("p",null,[y,s("a",x,[S,p(e)])]),w,s("p",null,[C,s("a",M,[T,p(e)]),R]),P],64)}var U=t(i,[["render",j],["__file","SpringBoot\u57FA\u7840.html.vue"]]);export{U as default};
