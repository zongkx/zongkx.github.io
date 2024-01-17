## Spring MVC

### 1. 参数绑定

@RequestParam: 接收的参数是来自requestHeader中，即请求头。通常用于GET请求,可以获取URL上的数据.用来处理 Content-Type 为 application/x-www-form-urlencoded 编码的内容，Content-Type默认为该属性

- required 表示是否必须，默认为 true，必须。
- defaultValue 可设置请求参数的默认值。
- value 为接收url的参数名（相当于key值）。

@RequestBody: 接收的参数是来自requestBody中，即请求体.一般用于处理非 Content-Type: application/x-www-form-urlencoded编码格式的数据，比如：application/json、application/xml等类型的数据。 比如

```java
@PostMapping("/map")
public @ResponseBody User getMap(@RequestBody Map<String,Object> map){}
//对应到Talent API Tester 请求应该是[在postman中将body选为raw->JSON(application/json)]
//POST:http://localhost/map 
//HEADERS:Content-Type/application/json
//BODY:{"name":"啊"}		 
@PostMapping("/map1")
public @ResponseBody User getMap1(@RequestParam Map<String,Object> map){}
//对应的请求应该是(在Postman中将body选为x-www-form-urlencoded )
//POST:http://localhost/map1
//HEADERS:Content-Type/application/x-www-form-urlencoded
//BODY:{"name":"啊"}
```

#### 1.包装数据类型

包装数据类型绑定的时候(一般不使用基础数据类型),前台请求key值可以不传,数据也可以为空,成功绑定需要key值和参数名一致,另外可以@RequestParam来建立对应关系.

#### 2.数组元素

```java
@RequestMapping("/array")
@ResponseBody
public String[] getUser(String[] name){
    return  name;
}
// http://localhost/user?name=a&name=b
```

#### 3.多层级对象

```java
@RequestMapping("/user")
@ResponseBody
public User getUser(User user){
    return user;
}
// http://localhost/user?name=a&role.name=admin
// User对象中包含role对象
```

##### 3.1 多对象含相同属性

user:name\type... role:name\type...

```java
@InitBinder("user")
public void initUser(WebDataBinder binder){
    binder.setFieldDefaultPrefix("user.");
}
@InitBinder("role")
public void  initAdmin(WebDataBinder binder){
    binder.setFieldMarkerPrefix("role.");

}
//同时在请求中要在各个属性前加上 对象前缀.
```

##### 3.2 List类型

需要新建一个类用来保存list对象,

```java
    UserList{ private List<User> users;//users与前台请求一致}

    @GetMapping("/list")
    @ResponseBody
    public String getUser(UserList userList){
         return userList.toString();
    }

   http://localhost/list?users[0].name=xxx&users[1].name=yyy
```

##### 3.3 Map类型

和List类似,需要额外的类用来维护该对象

### 2. Restful API

```java
@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/")//get请求:用户列表
    public List<User> listUsers(){
        return new ArrayList<User>();
    }
    @PostMapping("/")// post请求:新增用户
    public String postUser(@RequestBody(required = false) User user){
        return "success";
    }
    @GetMapping("/{id}")// get请求:根据id获取用户
    public User getUser(@PathVariable Long id){
        return new User();
    }
    @PutMapping("/{id}")// put请求:根据id,user更新用户
    public String putUser(@PathVariable Long id,@RequestBody User user){
        return "success";
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){
        return "success";
    }
}
```

测试:

```
1.GET 		http://localhost/users/
2.Post    	http://localhost/users/
  HEADERS 	Content-Type:application/json
  BODY    	{"name":"aaa"}
3.GET 		http://localhost/users/1
4.PUT		http://localhost/users/1
  HEADERS 	Content-Type:application/json
  BODY    	{"name":"aaa"}
5.DELETE	http://localhost/users/1
```

### 3. JSON解析器

SpringBoot默认使用Jackson,替换为:Fastjson,先引入com.alibaba.fastjson

```java
public class MvcConfig implements WebMvcConfigurer {
@Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        /*
         先把Jackson的消息转换器删除.
         备注:
         (1)源码分析可知，返回json的过程为: Controller调用结束后返回一个数据对象，for循环遍历conventers，找到支持application/json的HttpMessageConverter，然后将返回的数据序列化成json。
          具体参考org.springframework.web.servlet.mvc.method.annotation.AbstractMessageConverterMethodProcessor的writeWithMessageConverters方法
         (2)由于是list结构，我们添加的fastjson在最后。因此必须要将jackson的转换器删除，不然会先匹配上jackson，导致没使用fastjson
        */
        for (int i = converters.size() - 1; i >= 0; i--) {
            if (converters.get(i) instanceof MappingJackson2HttpMessageConverter) {
                converters.remove(i);
            }
        }
        FastJsonHttpMessageConverter fastJsonHttpMessageConverter = new FastJsonHttpMessageConverter();
        //自定义fastjson配置
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
        // 添加支持的MediaTypes;不添加时默认为*/*,也就是默认支持全部
        // 但是MappingJackson2HttpMessageConverter里面支持的MediaTypes为application/json
        // 参考它的做法, fastjson也只添加application/json的MediaType
        List<MediaType> fastMediaTypes = new ArrayList<>();
        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
        fastJsonHttpMessageConverter.setSupportedMediaTypes(fastMediaTypes);
        converters.add(fastJsonHttpMessageConverter);
    }
}
```

测试如下

```java
    @JSONField(format = "yyyy-MM-dd")
    LocalDateTime time;

    @GetMapping("/")//get请求:用户列表
    public List<User> listUsers(){
        List<User> list = new ArrayList<User>();
        User user = new User();
        user.setName("1");
        user.setTime(LocalDateTime.now());
        list.add(user);
        return list;
    }
    //  [{"name":"1","time":"2020-02-14"}]
```

### 4.  表单验证

表单验证如果仅仅在前端处理,仍然有比如直接用postman请求来跳过其验证的方法,所以后台往往也需要添加数据验证,表单验证可以使用JSR 303的Bean Validation,在实体类上添加相应的注解,就可以完成后台表单验证

```java
@Data
public class User {
    @NotNull(message = "名字不能为空")
    @Size(min = 2 ,max = 10, message = "长度在2到10之间")
    private String name;

    @JSONField(format = "yyyy-MM-dd")
    private LocalDateTime time;
}
```

其中@[NotNull/@Size均是javax.validation.constraints包下的内容](mailto:NotNull/@Size%E5%9D%87%E6%98%AFjavax.validation.constraints%E5%8C%85%E4%B8%8B%E7%9A%84%E5%86%85%E5%AE%B9),更多使用方法可以参考 [JSR 303](https://beanvalidation.org/1.0/spec/#d0e5601) 控制器中相关地方只需要添加BindingResult和@Valid即可.

```java
@PostMapping("/test")
    public Object test(@Valid @RequestBody User user, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return bindingResult.getAllErrors();
        }
        return "ok";
    }
```

模拟请求和响应如下:

```
POST /valid/test HTTP/1.1
Content-Length: 12
Content-Type: application/json
Host: localhost:8080
{"name":"1"}

Content-Type: application/json;charset=UTF-8
Content-Length: 309
Date: Sun, 01 Mar 2020 08:07:25 GMT
Keep-Alive: timeout=60
Connection: keep-alive
[{"arguments":[{"arguments":[],"code":"name","codes":["user.name","name"],"defaultMessage":"name"},10,2],"bindingFailure":false,"code":"Size","codes":["Size.user.name","Size.name","Size.java.lang.String","Size"],"defaultMessage":"长度在2到10之间","field":"name","objectName":"user","rejectedValue":"1"}]
```

### 5.  请求Rest接口

```java
	@PostMapping("/test")
    public String test(){
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject("http://localhost:8080/users/1", UserDO.class).toString();
    }
```

### 6. 上传下载

```
//Servlet原生
response.setCharacterEncoding("utf-8");
response.setContentType("application/octet-stream");
response.setHeader("Content-disposition", "attachment;filename=\""
                   + new String(fileName.getBytes("UTF-8"),"ISO8859_1") + "\"");
FileInputStream fis = new FileInputStream(path+fileName);
ServletOutputStream sos = response.getOutputStream();
int b;
byte[] buffer = new byte[1024*8];
while ((b = fis.read(buffer))!= -1) {
    sos.write(buffer, 0, b);
}
fis.close();
sos.close();
  

//SpringMVC
  @RequestMapping("/download")
  public ResponseEntity<byte[]> download(@RequestParam String fileName) throws IOException {
      File file = new File("C:\\"+fileName);
      byte[] body = null;
      InputStream inputStream = new FileInputStream(file);
      body = new byte[inputStream.available()];
      inputStream.read(body);
      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add("Content-disposition","attachment;filename="+fileName);
      HttpStatus httpStatus = HttpStatus.OK;
      ResponseEntity<byte[]> entity = new ResponseEntity<>(body,httpHeaders,httpStatus);
      return entity;
  }
```



## Spring Bean

### Bean的生命周期

> 实例化 -> 属性赋值 -> 初始化 -> 销毁


### Bean级生命周期接口

1. BeanNameAware(对象实例化设置属性之后设置BeanName)
2. BeanFactoryAware(设置BeanFactory)
3. InitializingBean(实例化之后调用)
4. DisposableBean (销毁)

```
package com.demo.bean;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;

@Slf4j
public class Test implements BeanNameAware, BeanFactoryAware, InitializingBean, DisposableBean {
    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        System.out.println("setName"+name);
        this.name = name;
    }
    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println(beanFactory.toString());
    }
    @Override
    public void setBeanName(String s) {
        System.out.println("beanName:"+s);
    }
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("afterPropertiesSet");
    }
    @Override
    public void destroy() throws Exception {
        System.out.println("destroy");
    }
    private void myInit() {
        System.out.println("myInit");
    }
    private void myDestroy() {
        System.out.println("myDes");
    }
}

}
package com.demo.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

/**
 * 实例化完成之后调用该接口
 */
public class MyBeanPostProcessor implements BeanPostProcessor {
    //实例化完成，setBeanName/setBeanFactory完成之后调用该方法
    public Object postProcessBeforeInitialization(Object o, String s) throws BeansException {
        System.out.println("postProcessBeforeInitialization");
        return o;
    }
    //全部是实例化完成以后调用该方法
    public Object postProcessAfterInitialization(Object o, String s) throws BeansException {
        System.out.println("postProcessAfterInitialization");
        return o;
    }

}
package com.demo.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.InstantiationAwareBeanPostProcessorAdapter;

/**
 * 实例化前／后，及框架设置Bean属性时调用该接口
 */
public class MyInstantiationAwareBeanPostProcessor extends InstantiationAwareBeanPostProcessorAdapter {
    //在Bean对象实例化前调用
    @Override
    public Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException {
        System.out.println("postProcessBeforeInstantiation");
        return null;
    }
    //在Bean对象实例化后调用（如调用构造器之后调用）
    @Override
    public boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessAfterInstantiation");
        return true;
    }
}
<?xml version="1.0" encoding="UTF-8"?>
<beans
        xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:p="http://www.springframework.org/schema/p"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="test" class="com.demo.bean.Test"
          p:name = "Paul"
          init-method="myInit"
          destroy-method="myDestroy"
    />
</beans>
@Resource
    private BeanFactory beanFactory;
    @Test
    void beanFactory(){
        org.springframework.core.io.Resource resource =  new ClassPathResource("Test.xml");
        BeanFactory beanFactory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader((DefaultListableBeanFactory) beanFactory);
        reader.loadBeanDefinitions(resource);

        //向容器中注册后处理器 MyBeanPostProcessor
        ((DefaultListableBeanFactory) beanFactory).addBeanPostProcessor(new MyBeanPostProcessor());

        //向容器中注册后处理器 MyInstantiationAwareBeanPostProcessor
        //注意：后处理器调用顺序和注册顺序无关。在处理多个后处理器的情况下，必需通过实现Ordered接口来确定顺序
        ((DefaultListableBeanFactory) beanFactory).addBeanPostProcessor(new MyInstantiationAwareBeanPostProcessor());

        com.demo.bean.Test test = (com.demo.bean.Test) beanFactory.getBean("test");
        ((DefaultListableBeanFactory) beanFactory).destroySingletons();
    }

    }
```

输出如下:

> postProcessBeforeInstantiation postProcessAfterInstantiation setNamePaul beanName:test org.springframework.beans.factory.support.DefaultListableBeanFactory@2f0e7fa8: defining beans [test]; root of factory hierarchy postProcessBeforeInitialization afterPropertiesSet myInit postProcessAfterInitialization Paul destroy myDes


### 容器级Bean生命周期接口

1. InstantiationAwareBeanPostProcessorAdapter

```
    //在Bean对象实例化前调用
    @Override
    public Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException;
 
    //在Bean对象实例化后调用（如调用构造器之后调用）
    @Override
    public boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException;
 
    /**
     * 在设置某个属性前调用，然后再调用设置属性的方法
     * 注意：这里的设置属性是指通过配置设置属性，直接调用对象的setXX方法不会调用该方法，如bean配置中配置了属性address/age属性，将会调用该方法
     * @param pvs 如 PropertyValues: length=2; bean property 'address'; bean property 'age'
     */
    @Override
    public PropertyValues postProcessPropertyValues(PropertyValues pvs, PropertyDescriptor[] pds, Object bean, String beanName) throws BeansException;
```

1. BeanPostProcessor

```
    //实例化完成，setBeanName/setBeanFactory完成之后调用该方法
    public Object postProcessBeforeInitialization(Object o, String s) throws BeansException;
 
    //全部是实例化完成以后调用该方法
    public Object postProcessAfterInitialization(Object o, String s) throws BeansException;
```

### BeanFactory和ApplicationContext

- 前者是Spring容器底层实现的基础,负责配置创建管理bean,它主要的方法由getBean,在beanfactory初始化的时候并不会创建bean,只有在读取配置从容器中拿bean的时候才会实例化,与后者相比,它只能提供基本的DI功能.
- ApplicationContext(称为Spring上下文)是BeanFactory的子接口,它们都可以当做Spring的容器，Spring容器是生成Bean实例的工厂，并管理容器中的Bean。在基于Spring的Java EE应用中，所有组件都被当成Bean处理，包括数据源,SessionFactory、事务管理器等。在启动的时候就把所有的Bean全部实例化了。也可以为Bean配置lazy-init=true来让Bean延迟实例化.

其常用的实现类包括:

1. AnnotationConfigApplicationContext:从一个或多个基于java的配置类中加载上下文定义，适用于java注解的方式。
2. ClassPathXmlApplicationContext:从类路径下的一个或多个xml配置文件中加载上下文定义，适用于xml配置的方式。

### Bean的作用域

Spring默认的Bean是容器级单例的(即通过SpringIOC获取的对象都是唯一的),而Java中使用比如静态枚举类实现的单例是JVM级的单例. 通常使用@Scope来声明bean的作用域:

- singleton:IOC容器仅创建一个Bean实例，IOC容器每次返回的是同一个Bean实例。
- prototype:IOC容器可以创建多个Bean实例，每次返回的都是一个新的实例。
- request:该属性仅对HTTP请求产生作用，使用该属性定义Bean时，每次HTTP请求都会创建一个新的Bean，适用于WebApplicationContext环境。
- session:该属性仅用于HTTP Session，同一个Session共享一个Bean实例。不同Session使用不同的实例。(用于比如购物车等场景)
- global-session:该属性仅用于HTTP Session，同session作用域不同的是，所有的Session共享一个Bean实例。

### Bean循环依赖问题

比如classA中有一个成员变量B,B中又有A作为成员变量.在Spring中是通过三级缓存解决循环依赖的问题的(当bean是单例模式的时候才能被缓存). Spring单例对象的初始化主要是三步:

> 实例化(instance)-填充属性-初始化(调用init方法) 循环依赖主要是因为前两步: 在A实例化后,便将自己曝光在singletonFactories中,当注入B属性的时候发现B还没有被create,所以走create流程,B初始化第一步的时候发现依赖A,于是尝试getA,在一级缓存singletonObjects二级缓存earlySingletonObjects都没有找到A,尝试从三级缓存singletonFactories中,由于A的提前曝光,所以B能拿到A的引用,在B拿到之后便完成了初始化,并将自己放到一级缓存中,此时返回到A中,便能顺利完成初始化.


```
/** Cache of singleton objects: bean name --> bean instance */
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<String, Object>(256);

/** Cache of singleton factories: bean name --> ObjectFactory */
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<String, ObjectFactory<?>>(16);

/** Cache of early singleton objects: bean name --> bean instance */
private final Map<String, Object> earlySingletonObjects = new HashMap<String, Object>(16);
```

> singletonFactories ： 单例对象工厂的cache earlySingletonObjects ：提前暴光的单例对象的Cache singletonObjects：单例对象的cache 由于加入singletonFactories三级缓存的前提是执行了构造器，所以构造器的循环依赖没法解决.


### Bean的创建和使用

#### 创建

1. 注解 一般就是在类上添加@Component, @Service等注解（@Controller表示提供http接口的bean, @Configuration表示配置类Bean)(注意bean的包路径扫描配置)
2. [@Bean ](/Bean) 主要是结合Configuration来定义bean，首先是声明一个配置类，然后再配置类中，通过返回bean对象的方法形式来声明bean

```
@Configuration
public class BeanLoadConfig {
    @Bean
    public ConfigDemoBean configDemoBean() {
        return new ConfigDemoBean();
    }
}
```

1. 工厂类方式 实现FactoryBean接口

```
@Component
public class MyBean implements FactoryBean<Object> {


    @Override
    public Object getObject() throws Exception {
        return null;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }
}
```

再通过MyBean来获取所需要的bean对象

#### 使用

1. Autowired @Autowired或者@Resource添加到成员变量上，即表示这个成员变量会由Spring容器注入对应的Bean对象
2. Setter

```
private MyBean demo;

@Autowired
private void setMyBean(Mybean demo) {
    this.demo = demo;
}
```

1. 构造方法

```
public class DemoController {
    private MyBean demo;
    public DemoController(MyBean demo) {
        this.demo= demo;
    }
}
```

#### 多实例Bean的选择

比如一个接口两个实现类,

> IPrint: ConsolePrint,LogPrint


@Autowired注解时，属性名即为默认的Bean名，如下面的logPrint就是获取beanName=logPrint的bean @Resource(name=xxx) 直接指定Bean的name，来唯一选择匹配的bean

```
    @Resource(name = "consolePrint")
    private IPrint consolePrint;
    @Autowired
    private IPrint logPrint;
```

也可以通过@Primary来解决:当有多个bean满足注入条件时，有这个注解的实例被选中

> @Primary注解的使用有唯一性要求：一个接口的子类中，只能有一个实现上有这个注解


## 

#### 尽量使用构造注入

> 保证依赖不可变（final关键字）
保证依赖不为空（省去了我们对其检查）


> 保证返回客户端（调用）的代码的时候是完全初始化的状态


> 避免了循环依赖


> 提升了代码的可复用性


```java
@RequiredArgsConstructor
@Service
public class AServiceImpl implements AService {
    private final JdbcTemplate jdbcTemplate;
}
```

#### 静态实例

```java
@Component
@Slf4j
public class MinioUtil {

    private static MinioClient minioClient;

    private MinioConfig minioConfig;
	//不需要显示的添加@Autowire(如果类只提供了一个带参数的构造方法)
    public MinioUtil(MinioConfig minioConfig) {
        this.minioConfig = minioConfig;
        minioClient = minioConfig.getMinioClient();
    }
}
```

## Spring AOP

### 异常处理

```java
@ControllerAdvice
@Slf4j
public class CommonExceptionAdvice {
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public CommonResponseBody handlerException(Exception e){
        log.error(" 公共异常: {} ",e);
        return new CommonResponseBody(ERROR.getCode(), ERROR.getMsg(),e.getMessage());
    }
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    public CommonResponseBody handlerIllegalArgumentException(IllegalArgumentException e){
        log.error("非法参数异常: {} ",e);
        return new CommonResponseBody(PARAMS_ERROR.getCode(), PARAMS_ERROR.getMsg(),e.getMessage());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public CommonResponseBody handlerMethodArgumentNotValidException(MethodArgumentNotValidException e){
        log.error("非法参数异常: {} ",e);
        List<String> errors = e.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.toCollection(ArrayList::new));
        return new CommonResponseBody(PARAMS_ERROR.getCode(), PARAMS_ERROR.getMsg(),errors);
    }
    @ExceptionHandler(NullPointerException.class)
    @ResponseBody
    public CommonResponseBody handlerNullPointerException(NullPointerException e){
        log.error("空值异常: {} ",e);
        return new CommonResponseBody(PARAMS_NULL.getCode(), PARAMS_NULL.getMsg(),e.getMessage());
    }
    @ExceptionHandler(CustomException.class)
    @ResponseBody
    public CommonResponseBody handlerCustomException(CustomException e){
        log.error("自定义异常: {} ",e);
        return new CommonResponseBody(e.getCode(),e.getMsg(),"");
    }

}
```

```java
@Data
@AllArgsConstructor
public class CommonResponseBody implements Serializable {
    private Integer  code;
    private String msg;
    private Object data;
    public CommonResponseBody(Integer code,String msg){
        this.code = code;
        this.msg = msg;
        this.data = "";
    }
}
@Data
@AllArgsConstructor
public class CustomException extends Exception {
    private Integer code;
    private String msg;
}
```

```java
@RestControllerAdvice
@RequiredArgsConstructor
public class CommonResponseBodyAdvice implements ResponseBodyAdvice<Object> {
    private final ObjectMapper objectMapper;

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @SneakyThrows
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (MediaType.IMAGE_JPEG.getType().equalsIgnoreCase(selectedContentType.getType())) {
            return body;
        }
        if (body instanceof CommonResponseBody) {
            return body;
        }
        if(body instanceof String){
            return objectMapper.writeValueAsString(new CommonResponseBody(SUCCESS.getCode(), SUCCESS.getMsg(),body));
        }
        return new CommonResponseBody(SUCCESS.getCode(), SUCCESS.getMsg(),body);
    }
}
```

```java
@Getter
public enum CommonResponseEnum {

    SUCCESS(20000, "操作成功！"),
    ERROR(40000, "操作失败！"),

    DATA_NOT_FOUND(40001, "查询失败！"),
    PARAMS_NULL(40002, "参数不能为空！"),
    NOT_LOGIN(40003, "当前账号未登录！"),
    PARAMS_ERROR(40005, "参数不合法！"),
    AUTH_DENY(4006,"没有权限"),
    ;

    private Integer code;
    private String msg;

    CommonResponseEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
```

### 简单AuthFilter

```java
@Component
public class CommonAuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        try {
            if(Objects.equals(request.getHeader("token"),"123")){
                filterChain.doFilter(servletRequest, servletResponse);
            }else{
                throw new CommonExceptionAdvice.CustomException(AUTH_DENY.getCode(), AUTH_DENY.getMsg());
            }
        } catch (CommonExceptionAdvice.CustomException e) {
            servletResponse.setCharacterEncoding("utf-8");
            servletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            servletResponse.getWriter().print(new ObjectMapper().writeValueAsString(new CommonResponseBody(e.getCode(),e.getMsg())));
        }
    }
}
```

### AOP 日志(非异步)

```java
package com.yonyou.aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zongkxc
 * @Description
 * @create 2021/6/8  10:14
 */
@Component
@Aspect
@Slf4j
public class RequestLogAspect {

    @Pointcut("execution(* com.yonyou.web..*(..))")
    public void requestServer() {
    }

    @Around("requestServer()")
    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        Object result = proceedingJoinPoint.proceed();
        RequestInfo requestInfo = new RequestInfo();
        requestInfo.setIp(request.getRemoteAddr());
        requestInfo.setUrl(request.getRequestURL().toString());
        requestInfo.setHttpMethod(request.getMethod());
        requestInfo.setClassMethod(String.format("%s.%s", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName()));
        requestInfo.setRequestParams(getRequestParamsByProceedingJoinPoint(proceedingJoinPoint));
        requestInfo.setResult(result);
        requestInfo.setTimeCost(System.currentTimeMillis() - start);
        log.info("Request Info      : {}", new ObjectMapper().writeValueAsString(requestInfo));
        return result;
    }


    @SneakyThrows
    @AfterThrowing(pointcut = "requestServer()", throwing = "e")
    public void doAfterThrow(JoinPoint joinPoint, RuntimeException e) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        RequestErrorInfo requestErrorInfo = new RequestErrorInfo();
        requestErrorInfo.setIp(request.getRemoteAddr());
        requestErrorInfo.setUrl(request.getRequestURL().toString());
        requestErrorInfo.setHttpMethod(request.getMethod());
        requestErrorInfo.setClassMethod(String.format("%s.%s", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName()));
        requestErrorInfo.setRequestParams(getRequestParamsByJoinPoint(joinPoint));
        requestErrorInfo.setException(e);
        log.info("Error Request  Info      : {}", new ObjectMapper().writeValueAsString(requestErrorInfo));
    }


    private Map<String, Object> getRequestParamsByProceedingJoinPoint(ProceedingJoinPoint proceedingJoinPoint) {
        String[] paramNames = ((MethodSignature)proceedingJoinPoint.getSignature()).getParameterNames();
        Object[] paramValues = proceedingJoinPoint.getArgs();
        return buildRequestParam(paramNames, paramValues);
    }

    private Map<String, Object> getRequestParamsByJoinPoint(JoinPoint joinPoint) {
        String[] paramNames = ((MethodSignature)joinPoint.getSignature()).getParameterNames();
        Object[] paramValues = joinPoint.getArgs();
        return buildRequestParam(paramNames, paramValues);
    }

    private Map<String, Object> buildRequestParam(String[] paramNames, Object[] paramValues) {
        Map<String, Object> requestParams = new HashMap<>();
        for (int i = 0; i < paramNames.length; i++) {
            Object value = paramValues[i];
            if (value instanceof MultipartFile) {
                MultipartFile file = (MultipartFile) value;
                value = file.getOriginalFilename();
            }

            requestParams.put(paramNames[i], value);
        }

        return requestParams;
    }

    @Data
    public class RequestInfo {
        private String ip;
        private String url;
        private String httpMethod;
        private String classMethod;
        private Object requestParams;
        private Object result;
        private Long timeCost;
    }

    @Data
    public class RequestErrorInfo {
        private String ip;
        private String url;
        private String httpMethod;
        private String classMethod;
        private Object requestParams;
        private RuntimeException exception;
    }
}
```

### AOP 日志 (异步)

## Spring Transaction

Spring事务管理分为编程式和声明式，声明式基于AOP，将业务和事务解耦，声明式的事务不会污染业务代码，常用于Service层。

### 传播性（propagation）

1. PROPAGATION_REQUIRED（默认） 在程序运行中，如果一个方法已经在一个事务中，那么就加入改事务，否则创建一个新的事务。
2. PROPAGATION_REQUIRES_NEW 不管是否存在事务，该方法总会为自己发起一个新的事务。如果方法已经运行在一个事务中，则原有事务挂起，新的事务被创建。
3. PROPAGATION_SUPPORTS 假设ServiceB.methodB() 的事务级别为 PROPAGATION_SUPPORTS，那么当执行到ServiceB.methodB()时，如果发现ServiceA.methodA()已经开启了一个事务，则加入当前的事务，如果发现ServiceA.methodA()没有开启事务，则自己也不开启事务。这种时候，内部方法的事务性完全依赖于最外层的事务。

### 事务不生效的原因

1. spring默认是通过动态代理实现aop（jdk代理：基于接口，cglib基于继承），无法代理private方法。 可以手动织入，@spectj，编译的时候织入需要代理的方法；或者私有方法更改为public
2. 需要通过代理类调用方法才能调用事务增强过的方法。可以在service中注入一个selfbean，且子调用必须用注入的对象进行调用，否则还是this。 事务生效

### 回滚不生效的原因

1，手动catch到异常 2，默认只对runtimeexception和error进行回滚，对于受检异常，并不会回滚，这种异常常与业务相关。可以在@transactional（rollbackFor="Exception.class"）

## Spring Async

### 引入

今天线上的项目遇到一个问题，有个Ajax请求后台需要处理的时间太长，后台业务大致是主表和子表数据的迁移，子表数量过多且需要复制数据导致请求时间过长。 考虑Ajax轮询或者后台多线程处理，鉴于子表的数据迁移之间互不影响，所以使用@Async来异步处理子表的数据迁移工作。

### 开启

Spring原生配置application.xml

```
beans里面需要添加:
xmlns:task="http://www.springframework.org/schema/task"
xsi:schemaLocation中添加: 
http://www.springframework.org/schema/task 
http://www.springframework.org/schema/task/spring-task.xsd"
<task:annotation-driver>
```

SpringBoot只需要在启动类上添加注解@EnableAsync即可

### 带返回值的Future

测试例子如下:

```
@Component
public class AsyncTask {
    @Async
    public Future<String> doTask1(String xlhs) throws Exception {
        System.out.println("开始做任务一");
	// 子表1  拷贝入库操作
        return new AsyncResult<String>("ok");
    }
    @Async
    public Future<String> doTask2() throws Exception {
        System.out.println("开始做任务二");
        // 子表2  拷贝入库操作
	return new AsyncResult<String>("ok");
    }
}
```

控制器中代码:

```
	//
	Future<String> task1 = testTaskAsync.doTask1();
	Future<String> task2 = testTaskAsync.doTask2();
	while(true){
	    if(task1.isDone()&& task2.isDone()){
		break;	
	    }	    
	}
	//
```

控制台可见 任务一和任务二并不是顺序执行的，即完成@Async的使用，使用异步的核心就是程序在顺序执行时，不等待异步调用的语句返回结果就执行后面的程序。 每个异步方法都在在独立的线程内完成操作，这样可以有效减少响应时间。

### Future接口

```
public interface Future<V> {
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
    V get() throws InterruptedException, ExecutionException;
    V get(long timeout, TimeUnit unit)
        throws InterruptedException, ExecutionException, TimeoutException;
}
```

> - cancel方法用来取消任务，如果取消任务成功则返回true，如果取消任务失败则返回false。参数mayInterruptIfRunning表示是否允许取消正在执行却没有执行完毕的任务，如果设置true，则表示可以取消正在执行过程中的任务。如果任务已经完成，则无论mayInterruptIfRunning为true还是false，此方法肯定返回false，即如果取消已经完成的任务会返回false；如果任务正在执行，若mayInterruptIfRunning设置为true，则返回true，若mayInterruptIfRunning设置为false，则返回false；如果任务还没有执行，则无论mayInterruptIfRunning为true还是false，肯定返回true。 - isCancelled方法表示任务是否被取消成功，如果在任务正常完成前被取消成功，则返回 true。 - isDone方法表示任务是否已经完成，若任务完成，则返回true； - get()方法用来获取执行结果，这个方法会产生阻塞，会一直等到任务执行完毕才返回； - get(long timeout, TimeUnit unit)用来获取执行结果，如果在指定时间内，还没获取到结果，就直接返回null。


Future提供了三种功能：判断任务是否完成；能够中断任务；能够获取任务执行结果。
