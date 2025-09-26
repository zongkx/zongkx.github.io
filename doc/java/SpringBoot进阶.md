## SpringBoot3 startup

```java
public class Demo {
    static void main(String[] args) {
        SpringApplication app = new SpringApplication(CmsApplication.class);
        app.setApplicationStartup(new BufferingApplicationStartup(2048));
        app.run(args);
    }

}
```

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "health,info,metrics,prometheus,startup"
      cors:
        allowed-origins: "*"
        allowed-methods: "GET,POST"
```

## 基于时间轮的异步任务

```java


public void execute() {
    log.info("dbt sync mode wheel timer init success");
    //初始化时间轮
    HashedWheelTimer timer = new HashedWheelTimer(5, TimeUnit.SECONDS);
    ScheduledTaskRegistrar taskRegistrar = new ScheduledTaskRegistrar();
    taskRegistrar.setTaskScheduler(taskScheduler);
    Runnable task = () -> {
        ArrayBlockingQueue<String> syncQueue = new ArrayBlockingQueue(100);
        Object poll = syncQueue.poll();
        if (Objects.nonNull(poll)) {
            timer.newTimeout(timeout -> sync(poll.toString()), 0, TimeUnit.SECONDS);
        }
    };
    taskRegistrar.addTriggerTask(task, new PeriodicTrigger(5 * 1000));
    taskRegistrar.afterPropertiesSet();
}
```

## jar包 resource

比如 需要把一个csv文件打包到jar里面,然后被其它项目引入后读取csv文件的内容

```xml
<!--打包 sys_area.csv文件到jar里面-->
<build>
    <resources>
        <resource>
            <directory>${project.basedir}/src/main/resources</directory>
            <includes>
                <include>/area/sys_area.csv</include>
            </includes>
        </resource>
    </resources>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-resources-plugin</artifactId>
            <version>3.3.1</version>
            <configuration>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```

```java
    private Resource[] getResources(String location) {
    try {
        return resourceResolver.getResources(location);
    } catch (IOException e) {
        return new Resource[0];
    }
}

public Resource[] resolveMapperLocations() {
    return Stream.of(Optional.of("classpath*:/area/sys_area.csv")
                    .orElse(Arrays.toString(new String[0])))
            .flatMap(location -> Stream.of(getResources(location))).toArray(Resource[]::new);
}

@Async
public void init() {
    Resource[] resources = resolveMapperLocations();
    Arrays.stream(resources).forEach(a -> {
        try (CsvReader csvReader = new CsvReader(new CsvReadConfig())) {
            InputStream inputStream = a.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
            CsvData read = csvReader.read(br);
            List<CsvRow> rows = read.getRows();
            //do something
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    });
}
```

如果是需要文件拷贝到指定目录,拿`duckdb`的插件文件为例(
由于网络的缘故,需要把duckdb的插件文件打包到jar里面,项目启动的时候把它们复制到某个目录作为duckdb的插件目录)

```xml

<build>
    <resources>
        <resource>
            <directory>${project.basedir}/src/main/resources</directory>
            <includes>
                <include>/**/*</include>
            </includes>
        </resource>
    </resources>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-resources-plugin</artifactId>
            <version>3.3.1</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>resources</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```

```java
public String path() {
    String os = System.getProperty("os.name").toLowerCase();//不同的os需要的插件不一样
    String scanPath, basePath, copyPath;
    if (os.contains("win")) {
        scanPath = "classpath*:/duckdb/extensions/v0.10.0/windows_amd64/mysql_scanner.duckdb_extension";
        basePath = "C:\\extensions";//如果是用户目录,存在无权限的问题
        copyPath = "/v0.10.0/windows_amd64/mysql_scanner.duckdb_extension";
    } else {
        scanPath = "classpath*:/duckdb/extensions/v0.10.0/linux_amd64_gcc4/mysql_scanner.duckdb_extension";
        basePath = System.getProperty("user.home");//一般适用于docker容器
        copyPath = "/v0.10.0/linux_amd64_gcc4/mysql_scanner.duckdb_extension";
    }
    Resource[] array = Stream.of(Optional.of(scanPath)
                    .orElse(Arrays.toString(new String[0])))
            .flatMap(location -> Stream.of(getResources(location))).toArray(Resource[]::new);
    for (Resource resource : array) {
        Path outputPath = Paths.get(basePath + copyPath).normalize();
        Files.createDirectories(outputPath.getParent());//把完整的目录结构给创建好
        Files.copy(resource.getInputStream(), outputPath, REPLACE_EXISTING);//文件复制

    }
    return basePath;
}

@PostConstruct
public void init() throws Exception {
    String path = path();
    HikariConfig config = new HikariConfig();
    config.setDriverClassName(DuckDBDriver.class.getCanonicalName());
    config.setMaximumPoolSize(10);
    config.setJdbcUrl("jdbc:duckdb:memory.db");
    config.setCatalog(DEFAULT_CATALOG);
    config.setSchema(DEFAULT_SCHEMA);
    HikariDataSource hikariDataSource = new HikariDataSource(config);
    setJdbcTemplate(new JdbcTemplate(hikariDataSource));
    jdbcTemplate.execute("PRAGMA extension_directory='" + path + "';");
    jdbcTemplate.execute("install mysql_scanner;");
    jdbcTemplate.execute("load mysql_scanner;");
    Db db = new Db(dataSourceProperties.getUrl());
    String s = "ATTACH 'host=%s password=%s user=%s port=%s database=%s' AS mysql (TYPE mysql)";
    jdbcTemplate.execute(String.format(s, db.ip, dataSourceProperties.getPassword(),
            dataSourceProperties.getUsername(), db.port, db.db));
}
```

## download/upload

```java
public void download(@RequestBody List<Long> ids, HttpServletResponse response) {
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "demo.json");
    response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
    StreamUtils.copy(new ByteArrayInputStream(JSON.toJSONBytes(new ArrayList<>())), response.getOutputStream());
    response.flushBuffer();
}

```

```java

@SneakyThrows
public void upload(@RequestParam MultipartFile file) {
    InputStream inputStream = file.getInputStream();
    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
    String collect = bufferedReader.lines().collect(Collectors.joining());
}


```

## https/ssl

1. 阿里云申请的ssl证书包括 `zkx.com_public.crt`,`zkx.com_common.crt`,`zkx.com.key`,使用1/3即可
2. [CRT-JKS在线转换](https://www.myssl.cn/tools/merge-jks-cert.html),输入key,cert已经密码即可生成对应的jks文件

<!--rehype:wrap-class=col-span-2-->

```yaml
server:
  port: 8080
  ssl:
    enabled: true
    key-store: classpath:zkx.com.jks
    key-store-type: JKS
    key-password: password
```

## yml配置自定义数组

demo如下

```yaml
users:
  conf:
    - id: 1
      name: Paul
    - id: 2
      name: Bob
```

```java

@Configuration
@Data
@ConfigurationProperties(prefix = "users")
public class UserConf {
    List<User> conf;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class User {
    private String id;
    private String name;
}
```

## CommandLineRunner 启动执行

```
    @Bean
    public CommandLineRunner commandLineRunner(){
        return args -> {};
    }
```

## 扫描所有bean中指定注解的方法中注解的值

```java

@Configuration
public class BeanConf {
    @MyAnnotation("test")
    public void test() {
        System.out.println("test");
    }
}
```

以下方法可获取所有的被@MyAnnotation的方法的value

```java

@Configuration
public class MyAware implements ApplicationContextAware {

    public List<String> list = new ArrayList<>();

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        for (String beanDefinitionName : applicationContext.getBeanDefinitionNames()) {
            Object bean = applicationContext.getBean(beanDefinitionName);
            Map<Method, MyAnnotation> annotatedMethods = MethodIntrospector.selectMethods(bean.getClass(),
                    (MethodIntrospector.MetadataLookup<MyAnnotation>) method
                            -> (MyAnnotation) AnnotatedElementUtils.findMergedAnnotation(method, MyAnnotation.class));
            annotatedMethods.forEach((method, myAnnotation) -> list.add(myAnnotation.value()));
        }

    }
}
```

## 静态变量注入bean

通过构造方法为静态变量赋值

拿minio为例

```java

@Component
public class MinioConf implements InitializingBean {
    @Value("${aws.s3.access-key}")
    private String accessKey;
    @Value("${aws.s3.secret-key}")
    private String accessSecret;
    @Value("${aws.s3.endpoint}")
    private String endpoint;
    @Value("${aws.s3.port}")
    private Integer port;

    private MinioClient minioClient;

    public MinioClient getMinioClient() {
        return minioClient;
    }

    @Override
    public void afterPropertiesSet() {
        this.minioClient = new MinioClient.Builder()
                .credentials(accessKey, accessSecret)
                .endpoint(endpoint, port, false)
                .build();
    }
}
```

MinioUtil中需要注入一个静态变量`MinioClient`

```java

@Component
public class MinioUtil {
    private static MinioClient minioClient;

    public MinioUtil(MinioConfig minioConf) {
        minioClient = minioConf.getMinioClient();
    }
}
```

## Swagger3 生成全局token参数

```java

@Bean
public Docket createRestApi() {
    log.info("swagger path:{}", "http://localhost:8080/swagger-ui/");
    log.info("knife4j path:{}", "http://localhost:8080/doc.html");

    //返回文档摘要信息
    return new Docket(DocumentationType.OAS_30)
            .enable(true)
            .apiInfo(apiInfo())
            .select()
            .paths(PathSelectors.any())
            .build()
            .globalRequestParameters(getGlobalRequestParameters());
}

private ApiInfo apiInfo() {
    return new ApiInfoBuilder().build();
}

//生成全局通用参数
private List<RequestParameter> getGlobalRequestParameters() {
    List<RequestParameter> parameters = new ArrayList<>();
    parameters.add(new RequestParameterBuilder()
            .name("token")
            .description("token")
            .required(false)
            .in(ParameterType.HEADER)
            .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
            .required(true)
            .build());
    return parameters;
}
```

## bean构造注入

推荐构造注入,配合`lombok`注解`@RequiredArgsConstructor`,`@Autowire`潜在NPE风险且不利于mock

## 配置属性注入

推荐`@ConfigurationProperties`,不推荐`@Value`

```java

@Data
@ConfigurationProperties(prefix = "custom")
public class CustomConfiguration {
    private String name;
}
```

## 多环境配置

yml:

```yaml
server:
  port: { server-port }
spring:
  profiles:
    active: ${profile-name}
```

pom:

```xml

<profiles>
    <profile>
        <id>pro</id>
        <activation>
            <activeByDefault>false</activeByDefault>
        </activation>
        <properties>
            <profile-name>pro</profile-name>
            <server-port>8080</server-port>
        </properties>
    </profile>
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <profile-name>dev</profile-name>
            <server-port>8080</server-port>
        </properties>
    </profile>
</profiles>
```

```xml

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-resources-plugin</artifactId>
            <version>3.2.0</version>
            <configuration>
                <encoding>utf-8</encoding>
                <useDefaultDelimiters>true</useDefaultDelimiters>
                <resources>
                    <resource>
                        <directory>src/main/resources</directory>
                        <filtering>true</filtering>
                    </resource>
                    <resource>
                        <directory>src/main/k8s</directory>
                        <filtering>true</filtering>
                    </resource>
                </resources>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 手动注册bean

```java
public CommandLineRunner run(ConfigurableApplicationContext applicationContext) {
    BeanDefinitionRegistry beanFactory = (BeanDefinitionRegistry) applicationContext.getBeanFactory();
    BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(A.class);
    beanDefinitionBuilder.addPropertyValue("object", new ObjectMapper());// setter 注入
    beanDefinitionBuilder.setInitMethodName("init");// init 方法初始化 私有变量
    beanFactory.registerBeanDefinition(dataSourceManager.getId(), beanDefinitionBuilder.getBeanDefinition());
}

class A {
    @Setter
    private Object object;

    public void init() {
    }
}
```

## SmartInitializingSingleton 所有bean注册后的扩展点

```
public interface SmartInitializingSingleton {
    void afterSingletonsInstantiated();//所有bean注册后会调用该方法
}
```

比如xxl-job中spring集成便使用了改扩展点

XxlJobSpringExecutor

```
// start
    @Override
    public void afterSingletonsInstantiated() {

        // init JobHandler Repository
        /*initJobHandlerRepository(applicationContext);*/

        // init JobHandler Repository (for method)
        initJobHandlerMethodRepository(applicationContext);

        // refresh GlueFactory
        GlueFactory.refreshInstance(1);

        // super start
        try {
            super.start();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

     private void initJobHandlerMethodRepository(ApplicationContext applicationContext) {
        if (applicationContext == null) {
            return;
        }
        // init job handler from method
        String[] beanDefinitionNames = applicationContext.getBeanNamesForType(Object.class, false, true);
        for (String beanDefinitionName : beanDefinitionNames) {
            Object bean = applicationContext.getBean(beanDefinitionName);

            Map<Method, XxlJob> annotatedMethods = null;   // referred to ：org.springframework.context.event.EventListenerMethodProcessor.processBean
            try {
                annotatedMethods = MethodIntrospector.selectMethods(bean.getClass(),
                        new MethodIntrospector.MetadataLookup<XxlJob>() {
                            @Override
                            public XxlJob inspect(Method method) {
                                return AnnotatedElementUtils.findMergedAnnotation(method, XxlJob.class);
                            }
                        });
            } catch (Throwable ex) {
                logger.error("xxl-job method-jobhandler resolve error for bean[" + beanDefinitionName + "].", ex);
            }
            if (annotatedMethods==null || annotatedMethods.isEmpty()) {
                continue;
            }

            for (Map.Entry<Method, XxlJob> methodXxlJobEntry : annotatedMethods.entrySet()) {
                Method executeMethod = methodXxlJobEntry.getKey();
                XxlJob xxlJob = methodXxlJobEntry.getValue();
                // regist
                registJobHandler(xxlJob, bean, executeMethod);
            }
        }
    }
```

## 条件注解

- @ConditionalOnBean/ @ConditionalOnMissingBean

两者相反,前者是 Spring容器中存在指定class实例的对象是,对应配置生效

- @ConditionalOnClass/ ConditionalOnMissingClass

classPath中存在某些Class时条件才成立

- @ConditionalOnProperty

Environment中存在某些配置项时条件才成立  
name: 用于检测key是否存在
value: 检测值
