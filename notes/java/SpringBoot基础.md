

最近项目架构需要更新为SpringBoot，所以重新系统性的学习一次，这是我的笔记。(基于2.2.4)

## 概述

### 1.初始化 

idea初始化的SpringBoot模块会生成的核心文件为src目录下的三个文件夹:

- **src/main/java**下的程序入口：Application
- **src/main/resources**下的配置文件：application.properties
- **src/test**/下的测试入口：Chapter11ApplicationTests- 以及pom.xml文件,主要有四个部分
- **项目元数据**：创建时候输入的Project Metadata部分，也就是Maven项目的基本元素，包括：groupId、artifactId、version、name、description等 parent：继承spring-boot-starter-parent的依赖管理，控制版本与打包等内容
- **dependencies**：项目具体依赖，这里包含了spring-boot-starter-web用于实现HTTP接口（该依赖中包含了Spring MVC）；spring-boot-starter-test用于编写- 单元测试的依赖包。
- **build**：构建配置部分。默认使用了spring-boot-maven-plugin，配合spring-boot-starter-parent就可以把Spring Boot应用打包成JAR来直接运行。

### 2.Web

```
@RestController
public class TestController {

    @RequestMapping("/test")
    public String index() {
        return "Hello";
    }
}
```

### 3.Tests

```
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest
class DemoApplicationTests {
    private MockMvc mvc;
    @Test
    public void getHello() throws Exception {
        mvc = MockMvcBuilders.standaloneSetup(new TestController()).build();
        mvc.perform(MockMvcRequestBuilders.get("/test").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Hello")));
    }
}
```

测试完成.

### 4.工程结构

```
com
  +- example
    +- myproject
      +- Application.java//可扫描到myproject下的配置类等
      +- domain
         +- Customer.java
         +- CustomerRepository.java
      +- service
	 +- impl
	      +- CustomerServiceImpl.java
         +- CustomerService.java
      +- web
         +- CustomerController.java
```

### 5. 配置文件

其目录为:src/main/resources/application.properties，在此处定义数据库、日志、服务等配置信息，除此之外也可以自定义配置信息： author:RaynorZong 使用的时候 @Value("$"),再该配置文件中自定义属性直接也可以通过PlaceHolder进行引用,比如 desc:author is $

### 6. 多环境配置

新增三个配置文件在相同目录下 application-dev.properties：开发环境 application-test.properties：测试环境 application-prod.properties：生产环境 在application.properties中通过spring.profiles.active=dev可以设置当前环境为开发环境

### 7. 加载顺序

Spring Boot为了能够更合理的重写各属性的值，使用了下面这种较为特别的属性加载顺序：

1. 命令行中传入的参数。
2. SPRING_APPLICATION_JSON中的属性。SPRING_APPLICATION_JSON是以JSON格式配置在系统环境变量中的内容。
3. java:comp/env中的JNDI属性。
4. Java的系统属性，可以通过System.getProperties()获得的内容。
5. 操作系统的环境变量
6. 通过random.*配置的随机属性
7. 位于当前应用jar包之外，针对不同环境的配置文件内容，例如：application-.properties或是YAML定义的配置文件
8. 位于当前应用jar包之内，针对不同环境的配置文件内容，例如：application-.properties或是YAML定义的配置文件
9. 位于当前应用jar包之外的application.properties和YAML配置内容
10. 位于当前应用jar包之内的application.properties和YAML配置内容
11. 在@Configuration注解修改的类中，通过@PropertySource注解定义的属性
12. 应用默认属性，使用SpringApplication.setDefaultProperties定义的内容

### 8. 配置文件特性

List类型用 []来表示: spring.my-example.url[0]=[http://example.com](http://example.com/)

支持逗号分隔: spring.resources.static-locations=classpath:/templates/,classpath:/static/

属性绑定,比如List类型 com.test[0]=test0 com.test[1]=test1

```
ApplicationContext context = SpringApplication.run(Application.class, args);
Binder binder = Binder.get(context.getEnvironment());
// 绑定List配置
List<String> test= binder.bind("com.test", Bindable.listOf(String.class)).get();
System.out.println(post);
```

## Web配置

### 自动配置

在SpringBoot中自动配置的WebMvcAutoConfiguration类中已经实现了部分Mvc相关的配置, 官网参考如下: [WebMvcAutoConfiguration](https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc-auto-configuration) The auto-configuration adds the following features on top of Spring’s defaults:

- Inclusion of ContentNegotiatingViewResolver and BeanNameViewResolver beans.
- Support for serving static resources, including support for WebJars (covered later in this document)).
- Automatic registration of Converter, GenericConverter, and Formatter beans.
- Support for HttpMessageConverters (covered later in this document).
- Automatic registration of MessageCodesResolver (covered later in this document).
- Static index.html support.
- Custom Favicon support (covered later in this document).
- Automatic use of a ConfigurableWebBindingInitializer bean (covered later in this document).

如果需要自定义配置的时候,由于SpringBoot 2.0之后WebMvcConfigurerAdapter已经过时,通过实现WebMvcConfigurer接口,可以通过JavaBean的方式对SpringMVC进行定制,也可以通过注解@EnableWebMvc关闭WebMvcAutoConfiguration.

```
@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer{}
```

### WebMvcConfigurer

```
public interface WebMvcConfigurer {
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
    default void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
    }
    default void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
    }
    default void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    }
    default void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    }
    default void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
    }
    default void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
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
```

其中所有方法都添加了default关键字,从而在实现该接口的时候可以选择性的修改某些具体的方法.

### 静态资源处理

```
#默认为 */**
spring.mvc.static-path-pattern: /static/**
#默认值如下
spring.resources.static-locations:classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/
```

前者用来匹配请求路径,当路径中包含/static/的时候才进行处理,匹配命中后才定位到具体的资源,此时需要后者进行优先级的处理,它表示在置顶路径下的匹配顺序. 除此之外也可以使用 继承 WebMvcConfigurerAdapter (已过时)或者实现WebMvcConfigurer 接口(推荐)处理静态资源等问题 下面是WebMvcConfigurer 接口中声明的方法:

```
public class MvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/templates/**")
                .addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("/webjars/** ").addResourceLocations("classpath:/META-INF/resources/webjars/ ");
    }
}
```

### 数据转换器

其中addResourceHandlers和configureMessageConverters之前均已经使用过,分别用来处理静态资源和JSON解析器的替换问题. 如下:

```
    
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        for (int i = converters.size() - 1; i >= 0; i--) {
            if (converters.get(i) instanceof MappingJackson2HttpMessageConverter) {
                converters.remove(i);
            }
        }
        FastJsonHttpMessageConverter fastJsonHttpMessageConverter = new FastJsonHttpMessageConverter();
        FastJsonConfig config = new FastJsonConfig();
        config.setSerializerFeatures(
                SerializerFeature.WriteMapNullValue,        // 是否输出值为null的字段,默认为false,我们将它打开
                SerializerFeature.WriteNullListAsEmpty,     // 将Collection类型字段的字段空值输出为[]
                SerializerFeature.WriteNullStringAsEmpty,   // 将字符串类型字段的空值输出为空字符串
                SerializerFeature.WriteNullNumberAsZero,    // 将数值类型字段的空值输出为0
                SerializerFeature.WriteDateUseDateFormat,
                SerializerFeature.DisableCircularReferenceDetect    // 禁用循环引用
        );
        fastJsonHttpMessageConverter.setFastJsonConfig(config);
        List<MediaType> fastMediaTypes = new ArrayList<>();
        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
        fastJsonHttpMessageConverter.setSupportedMediaTypes(fastMediaTypes);
        converters.add(fastJsonHttpMessageConverter);
    }
```

1. 其中addResourceHandlers中可以添加多个静态资源映射,区别于application.properties中的

```
spring.resources.static-locations=classpath:/static/,classpath:/templates/
spring.mvc.static-path-pattern=/static/**
```

它可以添加多个pattern,表示在请求路径中匹配不同的pathPattern寻找不同的路径下的资源 另外在SpringBoot默认配置的WebMvcAutoConfiguration中已经配置了部分静态资源和默认的视图跳转 "/"---> "index.html" 比如新建一个模块,在static下新建一个index.html,访问端口后会自动跳转到该页面(如果引入了spring-boot-starter-thymeleaf,则在templates下新建index.html也会正常访问,其优先级小于static;如果我们在Controller中编写了/的跳转为test.html,那么它将会覆盖默认的index.html,且如果引入了thymeleaf,那么test.html必须在templates目录下)其中默认配置的addResourceHandlers代码如下:

```
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 如果spring.resources.addMappings 为false,则不进行处理
        if (!this.resourceProperties.isAddMappings()) {
            logger.debug("Default resource handling disabled");
            return;
        }
        // 获得缓存时间,默认没配置
        Integer cachePeriod = this.resourceProperties.getCachePeriod();
        if (!registry.hasMappingForPattern("/webjars/**")) {
            // 如果ResourceHandlerRegistry中不包含/webjars/**的路径映射,
            // 则添加 /webjars/** --> classpath:/META-INF/resources/webjars/ 的映射规则
            customizeResourceHandlerRegistration(
                    registry.addResourceHandler("/webjars/**")
                            .addResourceLocations(
                                    "classpath:/META-INF/resources/webjars/")
                            .setCachePeriod(cachePeriod));
        }
        // 获得静态资源的映射路径,默认为 /**,由于默认配置的/**使用范围太小,更多的需要自己配置静态资源
        String staticPathPattern = this.mvcProperties.getStaticPathPattern();
        if (!registry.hasMappingForPattern(staticPathPattern)) {
            // 如果ResourceHandlerRegistry中不包含静态资源的映射路径,
            // 则添加 staticPathPattern --> classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/, classpath:/public/ 的映射规则
            customizeResourceHandlerRegistration(
                    registry.addResourceHandler(staticPathPattern)
                            .addResourceLocations(
                                    this.resourceProperties.getStaticLocations())
                            .setCachePeriod(cachePeriod));
        }
    }
```

而webjars测试如下:引入(webjars-locator可以在引用的时候帮助省去版本号)

```
	<dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>3.3.6</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>webjars-locator</artifactId>
            <version>0.30</version>
        </dependency>
```

访问:http://localhost:8080/webjars/bootstrap/css/bootstrap.min.css即可加载对应的资源文件

1. 其中configureMessageConverters实现了默认的Jackson替换为Fastjson.

### 拦截器

首先需要实现一个HandlerInterceptor接口的拦截器实例, 比如

```
@Component
@Slf4j
public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        log.info("请求路径：{}", request.getRequestURI());
//	业务处理
        return true;
    }
}
```

registry中的方法:

- addInterceptor:添加自定义的拦截器实例
- addPathPatterns: 拦截规则
- excludePathPatterns:过滤规则

```
    @Resource
    MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns("/**")
                .excludePathPatterns("/toLogin","/login","/js/**","/css/**","/images/**");
    }
```

### 页面跳转

大部分页面跳转通过手写Controller类中的方法实现,对于类似登录跳转等,可以通过该方法实现

```
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/toLogin").setViewName("test.html");
    }
``
这里写的如果和WebMvcAutoConfiguration中默认的 "/",则优先级大于默认配置.
### 默认静态资源处理器 configureDefaultServletHandling

这里拿 webjar来说明:
在Servlet 3 中 打包后的webjar会被放在 WEB-INF/lib 目录下，而 Servlet 3 允许直接访问 WEB-INF/lib 下 jar 中的 /META-INF/resources 目录下的资源。简单来说就是 WEB-INF/lib/{\*.jar}/META-INF/resources 下的资源可以被直接访问。
对于 Servlet 3 ，直接使用 http://localhost:8080/webjars/jquery/3.4.0/jquery.js 即可访问到 webjar 中的 jquery.js ，而不用做其它的配置。
对于SpringMVC来说,其处理流程只是将入口实现为DispatcherServlet,所有的请求都会汇集于该类，而后分发给不同的处理类。如果不做额外的配置，是无法访问静态资源的。如果想让 Dispatcher Servlet 直接可以访问到静态资源，最简单的方法当然是交给默认的 Servlet 。
```

[@Override ](/Override) public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) { configurer.enable();//这种情况下 Spring MVC 对资源的处理与 Servlet 方式相同.在关闭自动配置的情况下,webjars也能被访问. }

```
具体的内容可参考
[深入 Spring 系列之静态资源处理](https://www.v2ex.com/t/312216)
详细的介绍了SpringMVC的静态资源处理的过程.
```

## 数据处理

### 数据校验

#### 思考

restful 风格强调了资源而非动作,请求路径资源化,适合单一资源的增删改查的接口风格统一,但是也存在不灵活的问题,比如登录,登录动作抽象为资源可以理解为创建session: post /session 显然不和逻辑,批量删除也没办法按照restful风格等等.实际开发中需要前后台统一一种风格,而非全盘按照restful风格.

## 

#### 依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
```

#### 校验异常处理

```java
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public CommonResponseBody handlerMethodArgumentNotValidException(MethodArgumentNotValidException e){
        log.error("非法参数异常: {} ",e);
        List<String> errors = e.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.toCollection(ArrayList::new));
        return new CommonResponseBody(PARAMS_ERROR.getCode(), PARAMS_ERROR.getMsg(),errors);
    }
```

#### demo

```java
package com.zong.web;

import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

/**
 * @author zongkxc
 * @Description
 * @create 2021/5/31  17:23
 */
@RestController
@RequestMapping("/rest")
public class RestfulController {
    @Data
    @AllArgsConstructor
    private static class PageRespVO<T>{
        private Integer pageNum;
        private Integer pageSize;
        private Long total;
        private List<T> data;
    }
    @Data
    private static class PageVO{
        @Max(value = 40L,message = "分页最大值不超过40")
        @Min(value = 1L,message = "分页最小值不小于1")
        private Integer pageSize = 10;
        @Min(value = 1L,message = "页码最小值不小于1")
        private Integer pageNum = 1;
    }
    @Data
    private static class User{
        private String id;
        private String name;
    }
    //分页查询
    @GetMapping
    public PageRespVO get(User user,@Validated PageVO pageVO){
        System.out.println(user.getName());
        return new PageRespVO(pageVO.getPageNum(),pageVO.pageSize,2L, Lists.newArrayList("1","2"));
    }
    //根据id获取
    @GetMapping("/{id}")
    public User getOne(@PathVariable String id){
        System.out.println(id);
        return new User();
    }
    //新增
    @PostMapping
    public User add(@RequestBody User user){
        return user;
    }
    //补丁(更新部分属性)
    @PatchMapping
    public boolean updatePartProperty(@RequestBody User user){
        return true;
    }
    //修改(更新全部属性)
    @PutMapping
    public boolean updateAllProperty(@RequestBody User user){
        return true;
    }
}
```

### 统一返回数据结构

主要为code码/返回数据data/错误提示errorMessage/系统时间currentTime

```
Class RestResult.java
    private String code;
    private Object data;
    private Object errorMessage;
    private LocalDateTime currentTime;
Enum ErrorMessage.java
    SYSTEM_EXCEPTION ("系统异常"),
    LOGIC_EXCEPTION("业务异常");
    private String msg;
    ErrorMessage(String msg){
        this.msg = msg;
    }
    public String msg() {
        return this.msg;
    }
```

再通过@RestControllerAdvice实现返回结果的封装,该注解与@ControllerAdvice的区别可类比@RestController和@Controller, 此处只对JSON结果进行封装,非JSON结果不进行处理.

```
@RestControllerAdvice
public class RestResultWrapper implements ResponseBodyAdvice<Object> {
    //可指定针对某些返回值的类型才进行rest风格的封装
    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
          Method returnTypeMethod = returnType.getMethod();
          if (returnTypeMethod != null) {
               /////处理
               return  false;
          }
	  return true;
    }
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (MediaType.IMAGE_JPEG.getType().equalsIgnoreCase(selectedContentType.getType())) {
            return body;//可根据实际需求选择是否包装返回的结果
        }
        if (body instanceof RestResult) {
            return body;//如果数据已经包装过,则直接返回
        }
        return new RestResult("1", body, "");
    }
}
```

### 统一异常处理

在没有异常的情况下,统一返回的结构为RestResult,出现系统异常或者业务异常的时候,需要全局异常处理,同时对RestResult加工一下. 首先需要声明一个业务异常类,继承RuntimeException.

```
@Data
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
```

接下来是全局异常处理类,需要@ControllerAdvice注解,在对其中的方法添加注解: [[@ExceptionHandler(value ](/ExceptionHandler(value ) ](/ExceptionHandler(value ) = Exception.class),即可实现异常的处理,当然此处也可以是MyException.class,通过不同的方法实现对不同类型异常的处理. 

```
@Log
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Object logicExceptionHandler(HttpServletRequest request, Exception e, HttpServletResponse response) {
        RestResult result = new RestResult("-1", e.getMessage(), ErrorMessage.SYSTEM_EXCEPTION.msg());
        if (e instanceof LogicException) {//业务异常处理
            LogicException logicException = (LogicException) e;
            result.setCode(logicException.getCode());
            result.setErrorMessage(logicException.getErrorMsg());
        } else {
            log.info("系统异常:" + e.getMessage());
        }
        return result;
    }
}
```

## MVC MIME处理

### MIME

是用来描述消息内容类型的因特网标准,能包含文本、图像、音频、视频以及其他应用程序专用的数据,在HTTP中它是用来定义文档性质及格式的标准.

### JSON

比如下面这样的请求:

```
POST /json HTTP/1.1
Content-Length: 18
Host: localhost:8080
Content-Type: application/json
{"content":"test"}
```

它指定了客户端发送application/json格式的数据到服务端,同样的在SpringMVC中也可以指定服务端返回的数据格式,比如

```
@PostMapping(value ="/json", consumes={MediaType.APPLICATION_JSON_UTF8_VALUE }, produces="application/json;charset=UTF-8")
// consumes 指定该方法只处理application/json格式的数据
// produces 则会在响应头中指定:Content-Type=application/json;charset=UTF-8
// @RestController或@ResponseBody指定该方法返回数据在ResponseBody
//如下面ResponseBody中的{"content":"test"}
如下:
HTTP/1.1 200
Content-Type: application/json;charset=UTF-8
Content-Length: 70
Date: Thu, 20 Feb 2020 13:40:25 GMT
Keep-Alive: timeout=60
Connection: keep-alive

{"content":"test"}
```

### XML

Json作为常用的数据类型,上述例子已经展示了其用法,XML在soap,rpc领域中常用,在某些业务场景也经常使用,SpringBoot默认的Jackson想要实现XML数据的处理,需要引入

```
   <dependency>
       <groupId>com.fasterxml.jackson.dataformat</groupId>
       <artifactId>jackson-dataformat-xml</artifactId>
   </dependency>
```

在Spring项目中,引入该依赖后还需要配置configureMessageConverters,在 WebMvcConfigurer接口中可以实现

```
 @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        Jackson2ObjectMapperBuilder builder = Jackson2ObjectMapperBuilder.xml();
        builder.indentOutput(true);
        converters.add(new MappingJackson2XmlHttpMessageConverter(builder.build()));
    }
```

不过SpringBoot在引入依赖后会自动引入MappingJackson2XmlHttpMessageConverter的实现 请求:

```
POST /xml HTTP/1.1
Content-Length: 35
Host: localhost:8080
Content-Type: application/xml

<user>
  <name>Paul</name>
</user>
@PostMapping(value = "xml",consumes = {MediaType.APPLICATION_XML_VALUE},produces = MediaType.APPLICATION_XML_VALUE)
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
<User><name>Paul</name></User>
```

### HTTP参数

通常可以使用@RequestParam来接收比如表单请求(application/x-www-form-urlencoded)中的form data,也可以是其它类型请求的Request URL中包含的参数,否则会出现Required String parameter 'name' is not present,比如使用POST :application/json,在body中添加参数,后台将不能绑定到该数据.当然这个异常可以用该注解的属性(required=false)来避免,不过这样就无法接收到数据

```
    @RequestMapping(value = "/form")
    @ResponseBody
    public String form1(@RequestParam String name){
        return name;
    }
    //除此之外也可以直接用 User(name属性)来进行绑定.
    @RequestMapping(value = "/form2")
    @ResponseBody
    public String form2( User user){
        return user.getName();
    }
```

以上代码可以用表单数据或者URL带参数来获取

```
POST /form HTTP/1.1
Content-Length: 9
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded

Form Data:
 name=Paul
//或者

GET /form?name=Paul HTTP/1.1
Host: localhost:8080
Content-Type: text/plain;charset=UTF-8
```

### 文件上传

文件的格式为:multipart/form-data

```
    @ResponseBody //返回json数据
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public JSONObject uploadImg(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String contentType = file.getContentType();
        System.out.print(contentType);
        String fileName = System.currentTimeMillis()+file.getOriginalFilename();
        String filePath = ClassUtils.getDefaultClassLoader()
                .getResource("").getPath()+"static/admin/upload/";
        JSONObject jo = new JSONObject();//实例化json数据
        if (file.isEmpty()) {
            jo.put("success", 0);
            jo.put("fileName", "");
        }
        try {
            uploadFile(file.getBytes(), filePath, fileName);
            jo.put("success", 1);
            jo.put("fileName", fileName);
        } catch (Exception e) {
        }
        return jo;
    }
    public static void uploadFile(byte[] file, String filePath, String fileName) throws Exception {
        File targetFile = new File(filePath);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath +"/"+ fileName);
        out.write(file);
        out.flush();
        out.close();
    }
        function fileLoad(){
            var form = new FormData();
            form.append("file", document.getElementById("file").files[0]);
            $.ajax({
                url: "/upload",
                data: form,
                cache: false,
                async: false,
                type: "POST", 
                dataType: 'json', //数据返回类型
                processData: false,
                contentType: false,
                success: function (data) { 
                    var res = eval(data);
                    } else {
                        alert("失败");
                    }
                }
            });
        }
```

### 文件下载

```
@GetMapping(path ="/download")
    public ResponseEntity<Resource> download(@RequestParam("name")String name)throws IOException{
        File file =new File("D:/Raynor", name);
        Path path = Paths.get(file.getAbsolutePath());
        ByteArrayResource resource =new ByteArrayResource(Files.readAllBytes(path));
        return ResponseEntity.ok().header("Content-Disposition","attachment;fileName="+ name)
                .contentLength(file.length()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
    }

GET /download?name=1.txt HTTP/1.1
Host: localhost:8080

HTTP/1.1 200
Content-Disposition: attachment;fileName=1.txt //表示文档作为附件保存,名称为1.txt
Accept-Ranges: bytes
Content-Type: application/octet-stream // 表示响应的文档是未知二进制类型,多数浏览器会直接下载
Content-Length: 0
Date: Tue, 25 Feb 2020 11:50:08 GMT
Keep-Alive: timeout=60
Connection: keep-alive
```

### 字节流

```
@PostMapping(value = "/data1", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String data1(@RequestBody byte[] body) throws Exception {
        return body.toString();
    }
    @PostMapping(value = "/data2", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String data2(InputStream inputStream, HttpServletRequest request) throws Exception {
        log.info(request.getInputStream().toString());
        return inputStream.toString();
    }
```

## Mybatis

### 1.依赖

```
	<dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.1</version>
        </dependency>
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper-spring-boot-starter</artifactId>
            <version>1.2.12</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
```

### 2. 配置

```
#mysql
spring.datasource.url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#mybatis扫描路径,这里配置的是 resources/mapper/路径,也可以是其他路径
mybatis.mapper-locations=classpath:mapper/*.xml
#对应实体类的路径,这样在xml里面只用写实体类名就能找到对应的类,比如resultType="User"
mybatis.type-aliases-package=com.demo.model
#PageHelper
pagehelper.helper-dialect=mysql
pagehelper.reasonable=true
pagehelper.support-methods-arguments=true
pagehelper.params=count=countSql
```

接下来只需要维护_.xml和_Mapper.java接口就行,其中xml中mapper标签的namespace属性要与对应Mapper接口的路径一致 例如:

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.demo.mapper.UserMapper">
    <select id="selectUser" resultType="User">
      select * from user
    </select>
    <select id="selectUserById" resultType="User">
      select * from user where id = #{id}
    </select>
    <insert id="addUser" parameterType="User">
      insert into user (id,name,pwd) values (#{id},#{name},#{pwd})
    </insert>
    <update id="updateUser" parameterType="User">
      update user set name=#{name},pwd=#{pwd} where id = #{id}
    </update>
    <delete id="deleteUser" parameterType="int">
      delete from user where id = #{id}
   </delete>
</mapper>
```

1. [@Mapper ](/Mapper) 它是mybatis提供的注解,用于将这个DAO交给Spring管理,生成对应的实现类,另外也可以不使用该注解,而是在SpringBoot的启动类上添加@MapperScan("com.demo.mapper")来实现.
2. [@Repository ](/Repository) UserMapper接口可以添加注解@Repository,也可以不添加 该注解用于将数据访问层的接口表示为Spring Bean,添加后可以被spring框架所扫描并注入到spring容器来进行管理,类似的还有@Service,@Component,@Controller,其主要区别在于使用于不同层,此处因为Mybatis的配置的MapperScannerConfigurer实现了实例化Spring Bean的功能,所以可以选择不使用[@Repository. ](/Repository.)

```
package com.demo.mapper;
import com.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.List;
@Mapper
@Repository
public interface UserMapper {
    List<User> selectUser();
    User selectUserById(int id);
    int addUser(User user);
    int updateUser(User user);
    int deleteUser(int id);
}
```

分页只需要在查询前面,添加

```
    PageHelper.startPage(pageNum,pageSize);
    List<User> list= userService.pageUser();
    PageInfo<User> page = new PageInfo<>(list);
```

### 3. JdbcTemplate

也可以通过org.springframework.jdbc.core.JdbcTemplate,直接注入这个bean就可以使用JDBC来操作数据库.

```
    //JdbcTemplate 是 core 包的核心类，用于简化 JDBC操作，还能避免一些常见的错误，如忘记关闭数据库连接
    //Spring Boot 默认提供了数据源，默认提供了 org.springframework.jdbc.core.JdbcTemplate
    //JdbcTemplate 中会自己注入数据源，使用起来也不用再自己来关闭数据库连接
    @Autowired
    JdbcTemplate jdbcTemplate;
```

### 4. 注解实现

Mybatis除了灵活的xml,也提供了诸如@Select、@Update等注解，可以直接实现大部分简单的CRUD功能。 如下：

```
@Mapper
public interface UserMapper  {

    @Select("select * from user where id = #{id}")
    User getUserById(Long id);

    @Delete("delete from user where id=#{id}")
    int deleteUserById(Long id);

    @Options(useGeneratedKeys = true,keyProperty = "id",keyColumn = "id")
    @Insert("insert into user (name,password) values(#{name},#{password})")
    int insertUser(User user);

    @Update("update user set name=#{name} where id = #{id}")
    int updateUser(User user);

}
```

其中@Options: userGeneratedKeys = "true" : 是在支持主键自增的数据库中使用主键自增属性 keyProperty = "id" : 表示返回的主键值将插入到实体类的id属性中 keyColumn = "id" : 表示主键对应的字段名为id 意为插入数据后将数据库的主键返回,其中id表示主键名. 另外@Delete和@Update在执行成功均返回 1,失败返回0 测试如下:

```
 	User user = userMapper.getUserById(1L);
        log.info(user.toString());
        user.setName("xxx1");
        user.setId(10L);
        int update = userMapper.updateUser(user);
        log.info("成功返回1,失败返回0:"+update);
        User user1 = new User();
        user1.setName("Eric");
        user1.setPassword("123456");
        int id = userMapper.insertUser(user);
        log.info("插入数据的主键:"+user.getId()+"");
        int del = userMapper.deleteUserById(user.getId());
        log.info("成功返回1,失败返回0:"+del);
 User(id=1, name=xxx1, password=null, time=null, records=null)
 成功返回1,失败返回0:0
 插入数据的主键:7
 成功返回1,失败返回0:1
```

### 5. 自定义注解

SimpleInsertLangDriver/SimpleSelectLangDriver/SimpleUpdateLangDriver三个对象均需要

继承XMLLanguageDriver 并重写createSqlSource方法

#### insert

在数据插入的时候,可能存在比如Oracle中序列的使用,此时通过自定义注解即可完成,能最大化程度上减少无用代码.比如下面代码中的PrimrayKey注解,通过实体类中某个字段的注解,即可完成相应的功能.

```java
package com.sys.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface PrimrayKey {

    String seq_name() default "";

}
package com.sys.db;

import com.sys.annotation.PrimrayKey;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.scripting.LanguageDriver;
import org.apache.ibatis.scripting.xmltags.XMLLanguageDriver;
import org.apache.ibatis.session.Configuration;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SimpleInsertLangDriver extends XMLLanguageDriver implements LanguageDriver {

    private final Pattern inPattern = Pattern.compile("\\(#\\{(\\w+)\\}\\)");


    @Override
    public SqlSource createSqlSource(Configuration configuration, String script, Class<?> parameterType) {
        Matcher matcher = inPattern.matcher(script);
        if(matcher.find()){
            StringBuilder sb = new StringBuilder();
            StringBuilder tmp = new StringBuilder();
            sb.append("(");
            String s = "";
            for (Field field:parameterType.getDeclaredFields()){
                sb.append(field.getName().toLowerCase()+",");
                if(field.isAnnotationPresent (PrimrayKey.class)){
                    PrimrayKey primrayKey = field.getAnnotation(PrimrayKey.class);
                    String seqName = primrayKey.seq_name();
                    tmp.append("#{"+field.getName()+"} || "+seqName+".nextval,");
                }else{
                    tmp.append("#{"+field.getName()+getJdbcType(field.getType())+"},");
                }
            }
            sb.deleteCharAt(sb.lastIndexOf(","));
            tmp.deleteCharAt(tmp.lastIndexOf(","));
            sb.append(") values ("+tmp.toString()+")");
            script = matcher.replaceAll(sb.toString());
            script = "<script>"+script+"</script>";
        }
        return super.createSqlSource(configuration, script, parameterType);
    }

    protected String getJdbcType(Class<?> clazz){
        if (Objects.equals(clazz,String.class)){
            return ",jdbcType=VARCHAR";
        }else if(Objects.equals(clazz,Date.class)){
            return ",jdbcType=DATE";
        }else if(Objects.equals(clazz,Double.class) || Objects.equals(clazz,Long.class)){
            return ",jdbcType=NUMERIC";
        }else {
            return "";
        }

    }
}
```

#### select

```java
package com.sys.db;

import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.parsing.XNode;
import org.apache.ibatis.scripting.LanguageDriver;
import org.apache.ibatis.scripting.xmltags.XMLLanguageDriver;
import org.apache.ibatis.session.Configuration;

import java.lang.reflect.Field;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SimpleSelectLangDriver extends XMLLanguageDriver implements LanguageDriver {

    private final Pattern inPattern = Pattern.compile("\\(#\\{(\\w+)\\}\\)");
    @Override
    public SqlSource createSqlSource(Configuration configuration, String script, Class<?> parameterType) {
        Matcher matcher = inPattern.matcher(script);
        if(matcher.find()){
            StringBuilder sb = new StringBuilder();
            sb.append("<where>");
            for (Field field:parameterType.getDeclaredFields()){
                String tmp = "<if test=\"_field != null \"> AND _column= #{_field}</if>";
                sb.append(tmp.replaceAll("_field",field.getName().toLowerCase()).replaceAll("_column",field.getName().toLowerCase()));
            }
            sb.append("</where>");
            script = matcher.replaceAll(sb.toString());
            script = "<script>"+script+"</script>";
        }
        return super.createSqlSource(configuration, script, parameterType);
    }
}
```

#### update

```java
package com.sys.db;

import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.scripting.LanguageDriver;
import org.apache.ibatis.scripting.xmltags.XMLLanguageDriver;
import org.apache.ibatis.session.Configuration;

import java.lang.reflect.Field;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SimpleUpdateLangDriver extends XMLLanguageDriver implements LanguageDriver {

    private final Pattern inPattern = Pattern.compile("\\(#\\{(\\w+)\\}\\)");
    @Override
    public SqlSource createSqlSource(Configuration configuration, String script, Class<?> parameterType) {
        Matcher matcher = inPattern.matcher(script);
        if(matcher.find()){
            StringBuilder sb = new StringBuilder();
            sb.append("<set>");
            for (Field field:parameterType.getDeclaredFields()){
                if(Objects.equals(field.getName(),"xlh")){
                    continue;
                }
                String tmp = "<if test=\"_field != null \">_column=#{_field},</if>";
                sb.append(tmp.replaceAll("_field",field.getName().toLowerCase()).replaceAll("_column",field.getName().toLowerCase()));
            }
            sb.deleteCharAt(sb.lastIndexOf(","));
            sb.append("</set>");
            script = matcher.replaceAll(sb.toString());
            script = "<script>"+script+"</script>";
        }
        return super.createSqlSource(configuration, script, parameterType);
    }
}
```

#### 应用

insert

```java
@Insert(" insert into TableName (#{htxx})")
@Lang(SimpleInsertLangDriver.class)
//插入后获取htid
@SelectKey(keyColumn = "id",keyProperty = "id",resultType = String.class,before = false, statement = "select id from TableName where xlh = #{xlh}")
void insert(Htxx htxx);
```

update

```java
@Update(" update  TableName (#{htxx}) WHERE xlh = #{xlh} ")
@Lang(SimpleUpdateLangDriver.class)
//更新前获取htid
@SelectKey(keyColumn = "id",keyProperty = "id",resultType = String.class,before = true, statement = "select id from TableName where xlh = #{xlh}")
void update(Htxx htxx);
```

select

```java
@ResultType(com.model.A.class)
@Select(" select * FROM TableName where xlh = #{xlh}")
List<A> select(String xlh);
```

#### 缺点

该方法需要在mapper中通过字符串拼接的方法书写大量的sql语句,维护起来可能存在问题,尤其是select

### 6.缓存

Mybatis提供了一级二级缓存,同时预留了集成第三方三级缓存的接口.MyBatis 跟缓存相关的类都在cache 包里面，其中有一个Cache 接口，只有一个默认的实现类 PerpetualCache，它是用HashMap 实现.

> SpringBott+MyBatis中一级缓存和二级缓存都是开启的，注意二级缓存虽然是开启状态但是需要进行配置才可以使用 SqlSession ： 对应一次数据库的CURD操作。当所有的CURD都处于同一个事务管理中，SqlSession只会建立一次。


#### 一级缓存

一级缓存(本地缓存)默认开启,是存在会话层(SqlSession)中的. MyBatis会在一次会话的表示----一个SqlSession对象中创建一个本地缓存(local cache)，对于每一次查询，都会尝试根据查询的条件去本地缓存中查找是否在缓存中，如果在缓存中，就直接从缓存中取出，然后返回给用户；否则，从数据库读取数据，将查询结果存入缓存并返回给用户。 其生命周期如下:

1. MyBatis在开启一个数据库会话时，会 创建一个新的SqlSession对象，SqlSession对象中会有一个新的Executor对象，Executor对象中持有一个新的PerpetualCache对象；当会话结束时，SqlSession对象及其内部的Executor对象还有PerpetualCache对象也一并释放掉。
2. 如果SqlSession调用了close()方法，会释放掉一级缓存PerpetualCache对象，一级缓存将不可用；
3. 如果SqlSession调用了clearCache()，会清空PerpetualCache对象中的数据，但是该对象仍可使用；
4. SqlSession中执行了任何一个update操作(update()、delete()、insert()) ，都会清空PerpetualCache对象的数据，但是该对象可以继续使用； 例如下面:

```
    @Autowired
    SqlSessionFactory sqlSessionFactory;

    @Test
    void test(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        log.info(userMapper.getUserById(1L).toString());
        log.info(userMapper.getUserById(1L).toString());
    }
```

可以看到控制台只打印了一次sql语句. ( 开启sql输出:logging.level.com.demo.mapper=debug)

```
    @Autowired
    SqlSessionFactory sqlSessionFactory;

    @Test
    void test(){
        SqlSession sqlSession = sqlSessionFactory.openSession(true);//true自动提交事务,false手动
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User user = userMapper.getUserById(1L);
        log.info(user.toString());
        user.setPassword("123");
        userMapper.updateUser(user);
        log.info(userMapper.getUserById(1L).toString());
    }
```

如果其调用了update或delete,将会删除缓存

```
@Test
    void test1(){
        SqlSession sqlSession1 = sqlSessionFactory.openSession();
        UserMapper userMapper1 = sqlSession1.getMapper(UserMapper.class);

        SqlSession sqlSession2 = sqlSessionFactory.openSession();
        UserMapper userMapper2 = sqlSession2.getMapper(UserMapper.class);

        User user = userMapper1.getUserById(1L);
        log.info(user.toString());

        user.setPassword("123");
        userMapper2.updateUser(user);

        log.info(userMapper1.getUserById(1L).toString());
    }
```

由于一级缓存不能跨会话共享,所以上述例子会使其获取到脏数据 控制台输出两端sql,一个查询,一个更新.最后输出的user对象是被session2更改 前的脏数据.为了解决这个问题,一是使用二级缓存,二是更改一级缓存的级别为statement(默认为session ):每次查询结束都会清掉一级缓存

#### 二级缓存

范围是namespace级别的，可以被多个SqlSession 共享（只要是同一个接口里面的相同方法，都可以共享），生命周期和应用同步。使用了二级缓存，且Mapper和select语句也配置使用了二级缓存，那么在执行select查询的时候，MyBatis会先从二级缓存中取输入，其次才是一级缓存

> MyBatis 用了一个装饰器的类来维护，就是CachingExecutor。如果启用了二级缓存，MyBatis 在创建Executor 对象的时候会对Executor 进行装饰。CachingExecutor 对于查询请求，会判断二级缓存是否有缓存结果，如果有就直接返回，如果没有委派交给真正的查询器Executor 实现类，比如SimpleExecutor 来执行查询，再走到一级缓存的流程。最后会把结果缓存起来，并且返回给用户。


SpringBoot通过启动类注解@EnableCaching(或者在配置文件中添加mybatis.configuration.cache-enabled=true)即可开启二级缓存 A.同时在mapper接口上添加注解

```
    @Cacheable(cacheNames = "user")
    @Select("select * from user where id = #{id}")
    User getUserById(Long id);
```

//二级缓存需要User实现序列号接口 然后再对上面的读脏数据的例子测试后发现,没有再出现脏数据的问题. B.或者在*Mapper.xml中添加以下配置

```
<cache type="org.apache.ibatis.cache.impl.PerpetualCache"
    size="1024"
    eviction="LRU"//最近最少使用-回收策略
    flushInterval="120000"//缓存刷新间隔
    readOnly="false"/> //只读更快,可读写更安全
```

> 1.映射语句文件中所有的select语句将会被缓存 2.映射语句文件中所有的insert update delete语句会刷新缓存 3.缓存会使用(Least Flush Interval,LRU最近最少使用的)算法来收回 4.根据时间表（如 no Flush Interval,没有刷新间隔），缓存不会以任何时间顺序来刷新 5.缓存会存储集合或对象（无论查询方法返回什么类型的值）的1024个引用 6.缓存会被视为read/wriete(可读/可写)的，意味着对象检索不是共享的，而且可以安全的被调用者修改，而不干扰其他调用者或者线程所做的潜在修改。 7.在开启事务的前提下,事务不提交的话二级缓存将不会生效


二级缓存的适用范围:

> 1. 为所有的增删改都会刷新二级缓存，导致二级缓存失效，所以适合在查询为主的应用中使用，比如历史交易、历史订单的查询。否则缓存就失去了意义。
> 2. 如果多个namespace 中有针对于同一个表的操作，比如Blog 表，如果在一个namespace 中刷新了缓存，另一个namespace 中没有刷新，就会出现读到脏数据的情况。所以，推荐在一个Mapper 里面只操作单表的情况使用。


鉴于Mybatis的二级缓存并不是很好,其配置可以参考如下,之后将学习引入Ehcachehe和Redis作为第三方缓存.

### 7. 多数据源

#### 思路

在一个单独的模块中,配置两种数据源,操作不同类型的数据库.

通过自定义配置类来指向不同的DataSource配置,核心在于Mybatis中的SqlSessionFactory对象,而注解

MapperScan中可以通过sqlSessionFactoryRef属性指定某个Mapper包下的接口的实现.

#### 配置

```properties
spring.datasource.ds2.jdbc-url=jdbc:oracle:thin:@//172.16.0.148:1521/ORCL
spring.datasource.ds2.username=htjgzkx
spring.datasource.ds2.password=htjgzkx
spring.datasource.ds2.driver-class-name=oracle.jdbc.OracleDriver


spring.datasource.ds3.jdbc-url=jdbc:mysql://localhost:3306/
spring.datasource.ds3.username=root
spring.datasource.ds3.password=123
spring.datasource.ds3.driver-class-name=com.mysql.jdbc.Driver
```

#### 配置类

下面的两个配置类注册了不同的bean,来为db2,db3包下的mapper接口提供不同的对象.Mapper接口正常写即可.

```java
package com.sys.confg.datasource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
@MapperScan(basePackages = "com.mapper.db2",sqlSessionFactoryRef = "test2SqlSessionFactory")
public class DataSource2Config {

    @Bean(name = "test2")
    @ConfigurationProperties("spring.datasource.ds2")
    public DataSource test2(){
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "test2SqlSessionFactory")
    public SqlSessionFactory test2SqlSessionFactory(@Qualifier("test2") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }

    @Bean(name = "test2TransactionManager")
    public DataSourceTransactionManager test2TransactionManager(@Qualifier("test2") DataSource dataSource){
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "test2SqlSessionTemplates")
    public SqlSessionTemplate test2SqlSessionTemplates(@Qualifier("test2SqlSessionFactory") SqlSessionFactory sqlSessionFactory){
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}
package com.sys.confg.datasource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
@MapperScan(basePackages = "com.mapper.db3",sqlSessionFactoryRef = "test3SqlSessionFactory")
public class DataSource3Config {

    @Bean(name = "test3")
    @ConfigurationProperties("spring.datasource.ds3")
    public DataSource test3(){
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "test3SqlSessionFactory")
    public SqlSessionFactory test3SqlSessionFactory(@Qualifier("test3") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }

    @Bean(name = "test3TransactionManager")
    public DataSourceTransactionManager test3TransactionManager(@Qualifier("test3") DataSource dataSource){
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "test3SqlSessionTemplates")
    public SqlSessionTemplate test3SqlSessionTemplates(@Qualifier("test3SqlSessionFactory") SqlSessionFactory sqlSessionFactory){
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}
```

#### 问题和缺点

事务:

```java
@Transactional(value = "test2TransactionManager",propagation = Propagation.REQUIRES_NEW)
```

如果只是读取Oracle中的数据再写入到Mysql中,事务只需要设置被写入方即可;若均存在写入的情况,事务将不方便处理.

更好的解决方案:

是否可以通过自定义注解,来实现Mapper接口实现的时候所使用的实例,而不是需要实现配置好包.

## Mybatis-plus

### 引入

MybatisPlus能够作为一个增强Mybatis的工具，在能够使用MybatisXML自定义Sql的基础上，以无侵入的特点通过内置的Mapper和Service实现大部分单表的增上改查操作，简化代码。其中常用的包括代码构造器、分页、QueryWrapper的使用。更多使用指南官网:[MybatisPlus](https://mp.baomidou.com/guide/generator.html)

```
 	<!--Mybatis Plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.0.6</version>
        </dependency>
```

### 代码生成器

在当前最新的版本中3.0.3之后移除了代码生成器与模板引擎的默认依赖,需要手动引入模板引擎,比如Freemaker.在生成的Mapper接口中,默认没有添加@Mapper注解,建议在SpringBoot的启动类上添加注解 @MapperScan("com.demo.mapper")

```
	<dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
        </dependency>
```

运行下面的main方法即可生成相关表的MVC三层结构的代码.

```
package com.demo.code;

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
     * 读取控制台内容
     */
    public static String scanner(String tip) {
        @SuppressWarnings("resource")
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotEmpty(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }
    /*
        Mybatis-plus 版本,最新版本有问题
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.0.6</version>
        </dependency>
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
        </dependency>
     */
    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/day08/src/main/java");//模块名
        gc.setAuthor("Raynor");
        gc.setOpen(false);
        // gc.setSwagger2(true); 实体属性 Swagger2 注解
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/test?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=UTC");
        //dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("123456");
        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        //pc.setModuleName(scanner("模块名"));
        pc.setParent("com.demo");
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };
        List<FileOutConfig> focList = new ArrayList<>();
        focList.add(new FileOutConfig("/templates/mapper.xml.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输入文件名称
                return projectPath + "/code/src/main/resources/mapper/"
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);
        mpg.setTemplate(new TemplateConfig().setXml(null));

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        // strategy.setSuperEntityClass("com.baomidou.ant.common.BaseEntity");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // strategy.setSuperControllerClass("com.baomidou.ant.common.BaseController");
        strategy.setInclude(scanner("表名"));
        strategy.setSuperEntityColumns("id");
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
```

### 兼容原生Mybatis

在SpringBoot的配置文件中添加一下配置,能够启用原生Mybatis的功能.

```
#mybatis-plus 实现同时兼任原生Mybatis的xml功能
mybatis-plus.mapper-locations=classpath:mapper/*.xml
```

示例:

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.demo.mapper.UserMapper">
    <select id="selectUserByName" resultType="com.demo.entity.User" parameterType="java.lang.String">
        select * from user where name = #{name}
    </select>
</mapper>
================================
public interface UserMapper extends BaseMapper<User> {
    List<User> selectUserByName(String name);
}
```

### 分页插件

```
package com.demo.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;


@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
@MapperScan("com.demo.mapper")//扫描 mapper接口对应的包

public class MybatisPageConfig {
	
	/**
     * mybatis-plus SQL执行效率插件【生产环境可以关闭】
     */
    @Bean
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }
	/**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
    @GetMapping("/{limit}/{offset}/")
    public IPage<User> userPage(@PathVariable Long limit,@PathVariable Long offset){
        IPage<User> p = new Page<User>(offset,limit);
        return userService.page(p);
    }
```

### QueryWrapper

继承自 AbstractWrapper ,自身的内部属性 entity 也用于生成 where 条件.

```
@PostMapping("/{limit}/{offset}/")
    public IPage<User> userPage(@PathVariable Long limit, @PathVariable Long offset, @RequestBody User user){
        QueryWrapper<User> queryWrapper =new QueryWrapper();
        queryWrapper.eq("name",user.getName())
                .eq("password",user.getPassword())
                .orderByDesc("time");
        IPage<User> p = new Page<User>(offset,limit);
        return userService.page(p,queryWrapper);
    }
```

## JPA

### 引入

```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
```

基础配置

```
##validate 加载hibernate时，验证创建数据库表结构
##create  每次加载hibernate，重新创建数据库表结构
##create-drop 加载hibernate时创建，退出是删除表结构
##update 加载hibernate自动更新数据库结构
##validate 启动时验证表的结构，不会创建表
##none 启动时不做任何操作
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### JpaRepository/CrudRepository

Jpa的核心就是声明一个接口继承Jpa提供的接口,其中常用的是JpaRepository/CrudRepository,前者继承了PagingAndSortingRepository,能够实现分页和排序的相关操作,后者提供基础的增上改查操作,其中具体的实现有一定的区别,下面用JpaRepository作为示例,下面实现了分页和自定义查询的功能.

#### User.java

```
import lombok.Data;
import javax.persistence.*;

@Entity //默认所有属性映射到数据库中的同名字段
@Table(name = "jpa_user") // 表名
@Data
public class User {
    @Id //主键
    @GeneratedValue(strategy = GenerationType.AUTO) // 自增
    private Long id;
    private String username;

}
```

#### Blog.java

```
@Entity
@Table(name = "jpa_blog")
@Data
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String content;
    @ManyToOne
    private User author;// 建表后将创建外键:为user表的主键,默认级联关系为RESTRICT,字段名为 author_id
}
```

#### BlogRepository

```
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BlogRepository extends JpaRepository<Blog,Long> {
    @Query("select blog from Blog blog join blog.author author where author.username = ?1")
    Page<Blog> findByUsername(String username, Pageable pageable);
}
```

#### BlogController

```
@RestController
@RequestMapping("/blog")
public class BlogController {

    @Resource
    private BlogRepository blogRepository;

    @GetMapping("/{pageNum}/{pageSize}/{username}")
    public Page<Blog> getBlogByUsername(@PathVariable Integer pageNum,
        @PathVariable Integer pageSize, @PathVariable String username){
        PageRequest pageRequest = PageRequest.of(pageNum,pageSize);
        return blogRepository.findByUsername(username,pageRequest);
    }
    @PostMapping("/")
    public String addBlog(@RequestBody Blog blog){
        blogRepository.save(blog);
        return "ok";
    }
}
```

先添加数据,对上述addBlog接口而言,直接用Blog接收前台参数,需要完整的Json数据 比如:

```
POST /blog/1/1/Paul HTTP/1.1
Content-Length: 69
Content-Type: application/json
Host: localhost:8080
{"title":"title3","content":"c3","author":{"id":1,"username":"Paul"}}
```

添加完数据后就可以调用查询接口,该接口主要是满足根据用户名查找该用户创建的blog数据

```
http://localhost:8080/blog/0/2/Paul
//需要注意的是PageRequest.of(pageNum,pageSize) pageNum是从0开始的
```

### Jpa动态查询

Jpa开发维护简单高效,但是对于业务复制的需求而言,其关联查询,动态查询都是其缺点,对于常用的动态查询,可以参考[Jpa动态查询](https://github.com/wenhao/jpa-spec),下面是一个简单的例子,如果未来有需要的话可以深入研究一下.

## Cache

### Spring-Cache

Spring从3.1开始定义了org.springframework.cache.Cache和org.springframework.cache.CacheManager接口来统一不同的缓存技术；并支持使用JCache（JSR-107）注解 Spring自带的缓存类型为Simple，这个缓存与Spring Boot应用在同一个Java虚拟机内，适合单体应用系统。

#### 配置和依赖

```
	<!-- Spring boot Cache-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-cache</artifactId>
        </dependency>
```

1. application.properties

> #Simple：基于ConcurrentHashMap实现的缓存 #None：禁止使用缓存。 #Redis：使用Redis缓存 .... spring.cache.type=Simple


2. 启动类添加注解

> [@EnableCaching ](/EnableCaching)


#### 常用注解

> 1. [@Cacheable ](/Cacheable) 主要针对方法配置，能够根据方法的请求参数对其进行缓存
> 2. [@CachePut ](/CachePut) 保证方法被调用，又希望结果被缓存。与@Cacheable区别在于是否每次都调用方法，常用于更新
> 3. [@CacheEvict ](/CacheEvict) 清空缓存 以上三个注解都有以下属性: value:指定至少一个名称 key:SpEL表达式编写(可空),如@Cacheable(value="demo",key="#id") condition:缓存条件(可空),如 condition="#userName.length()>2" unless:否定缓存,当结果为true,则不缓存unless="#userName.length()>2"


另外@CacheEvict另外有allEntries=true:方法调用后清除缓存 beforeInvocation=true:方法执行前清除缓存,出现异常则不会

> [@CacheConfig ](/CacheConfig) 统一配置本类的缓存注解的属性


#### SpEL

SpEL类似于EL表达式, 常见的包含 关系运算:> < = != gt eq... 算术:+ - * / % 逻辑:&&，||，!，and，or，not，between，instanceof 条件: ()?():() 具体可参考Spring官方文档 除此之外还提供了一些SpEL上下文可以使用

> - methodName:当前被调用的方法名
> - method:当前被调用的方法
> - target:当前被调用的目标对象实例
> - targetClass:当前被调用的目标对象的类
> - args:当前被调用的方法的参数列表
> - caches:当前方法调用使用的缓存列表 以上都在#root下,比如:#root.targetClass
> - Argument Name:当前被调用的方法的参数，如findUser(User user),可以通过#user.id获得参数
> - result:方法执行后的返回值（仅当方法执行后的判断有效，如 unless cacheEvict的beforeInvocation=false）


#### 示例

1. [@Cacheable ](/Cacheable)

```
@Service
@CacheConfig(cacheNames = "myCache")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    @Resource
    private UserMapper userMapper;

    @Override
    @Cacheable(key = "#id")
    //如果在CacheConfig中指定了name,此处可以不用写value值
    //也可以用 “#p参数index”,此处为 #p0
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
```

连续执行两次查询后,可见控制台只有一次SQL. 2. [@CachePut ](/CachePut)

> 主要针对方法配置，能够根据方法的请求参数对其结果进行缓存，和 [@Cacheable ](/Cacheable) 不同的是，它每次都会触发真实方法的调用 。简单来说就是用户更新缓存数据。但需要注意的是该注解的value 和 key 必须与要更新的缓存相同，也就是与[@Cacheable ](/Cacheable) 相同。


```
     @Override
    @CachePut(key = "#user.id")
    public User updateUser(User user) {
        return userMapper.updateById(user);
    }

    @Test
    void contextLoads() {
        User user = userService.getOne(1L);
        user.setPassword("11111");
        userService.updateUser(user);
        log.info(userService.getOne(1L).toString());
    }
```

//由于updateUser和getOne都在UserServiceImpl下,而UserServiceImpl配置了[[@CacheConfig(cacheNames ](/CacheConfig(cacheNames ) ](/CacheConfig(cacheNames ) = "user"),所以在方法上未声明value值得情况下,这些方法的value都是'user' // 这里有一个坑,对于key和value都相同的缓存方法,如果返回的结果与@Cacheable的返回结果不一致,它将尝试类型转换,如果上面的update返回int类型,则会报类型转换异常:user不能转为integer 3. [@CacheEvict ](/CacheEvict)

```
    //清除一条缓存，key为要清空的数据
    @CacheEvict(key = "#p0.id")
    public void delete(User user){
    }

    //方法调用后清空所有缓存
    @CacheEvict(allEntries = true)
    public void deleteAll(){

    }

    @Test
    void contextLoads() {
        User user = userService.getOne(1L);
        user.setPassword("11111");
        userService.updateUser(user);
        log.info(userService.getOne(1L).toString());
        userService.delete(user);
        log.info(userService.getOne(1L).toString());//可见结果:缓存被删除后,需要再次查询数据库
    }
```

### Ehcache

> 是现在最流行的纯Java开源缓存框架，配置简单、结构清晰、功能强大，最初知道它，是从Hibernate的缓存开始的, 是Hibernate的二级缓存技术之一，可以把查询出来的数据存储在内存或者磁盘，节省下次同样查询语句再次查询数据库，大幅减轻数据库压力


#### 依赖和配置

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
```

在配置文件中加入:

> spring.cache.type=ehcache spring.cache.ehcache.config=classpath:/ehcache.xml


idea中添加完依赖后将在src/resources下出现一个ehcahe.xml,

```
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
         name="ZONG"
         updateCheck="false"
         maxBytesLocalHeap="16M">

    <diskStore path="/data/app/cache/ehcache"/> <!--磁盘路径-->
    <defaultCache
            eternal="false"
            overflowToDisk="false"
            maxElementsInMemory="10000"
            timeToIdleSeconds="3600"
            timeToLiveSeconds="36000"
    />
</ehcache>
```

在里面添加 cache-template 和 cache 标签,然后使用的时候[[@CacheConfig(cacheNames ](/CacheConfig(cacheNames ) ](/CacheConfig(cacheNames ) = {"myuser"})中的cacheNames的名字，xml中的alias必须也有，不然会报找不到缓存名。 

```
     <cache name="user" eternal="false"
           timeToIdleSeconds="120" timeToLiveSeconds="600" overflowToDisk="true" />
```

注意自己定义的cache中不能添加maxElementsInMemory属性,否则会报错

### Redis

- 对于分布式应用，通常都会将缓存放在一台或者多台专门的缓存服务器上。使用Redis作为缓存是一种常用的选择。Redis不仅可以作为缓存,后续将会对Redis深入学习.

#### 依赖和配置

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- redis依赖commons-pool -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

配置如下:

```
spring.cache.type=Redis
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.lettuce.pool.max-active=8
spring.redis.lettuce.pool.max-idle=8
spring.redis.lettuce.pool.min-idle=0
```

#### 定制缓存

可以通过对RedisCacheManager进行定制缓存存活时间\序列化等,也可以不进行额外的配置,此时直接测试可见Redis中已经有放进来的缓存了.

RedisCacheManager默认使用的是JdkSerializationRedisSerializer,可以使用Jackson2JsonRedisSerializer 比如这样的配置,配置了CacheManager的同时 将RedisCacheManager 和RedisTemplate都配置了Jackson解析器.

```
 package com.demo.config;

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

     @Bean(name = "redisTemplate")
     public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory redisConnectionFactory){
         RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
         redisTemplate.setConnectionFactory(redisConnectionFactory);
         redisTemplate.setKeySerializer(keySerializer());
         redisTemplate.setHashKeySerializer(keySerializer());
         redisTemplate.setValueSerializer(valueSerializer());
         redisTemplate.setHashValueSerializer(valueSerializer());
         return redisTemplate;
     }

    private RedisSerializer<String> keySerializer() {
        return new StringRedisSerializer();
    }
    private RedisSerializer<Object> valueSerializer() {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        return jackson2JsonRedisSerializer;
    }
    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory factory) {

        // 生成一个默认配置，通过config对象即可对缓存进行自定义配置
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(valueSerializer()));

        // 设置缓存的默认过期时间，也是使用Duration设置
        config = config.entryTtl(Duration.ofMinutes(10))
                .disableCachingNullValues();     // 不缓存空值

        // 设置一个初始化的缓存空间set集合
        Set<String> cacheNames = new HashSet<>();
        cacheNames.add("space");
        cacheNames.add("user");

        // 对每个缓存空间应用不同的配置
        Map<String, RedisCacheConfiguration> configMap = new HashMap<>();
        // 通过Duration可以自己实现以什么时间为单位
        configMap.put("space", config.entryTtl(Duration.ofMinutes(1)));
        configMap.put("user", config.entryTtl(Duration.ofSeconds(10)));

        return RedisCacheManager
                .builder(RedisCacheWriter.nonLockingRedisCacheWriter(factory))
                .initialCacheNames(cacheNames)
                 .withInitialCacheConfigurations(configMap)
                .cacheDefaults(config).build();
    }
}
```
