## CentralDogma

配置中心,也可以是别的比如库等,核心用于存储数据源配置信息,也可以结合openmetadata进行资产管理
```java
        <dependency>
            <groupId>com.linecorp.centraldogma</groupId>
            <artifactId>centraldogma-client-spring-boot-starter</artifactId>
            <version>0.51.1</version>
        </dependency>
```
```java
centraldogma:
  enable: true
  hosts:
    - localhost:36462
  access-token: appToken-d
  project: datasource
  repo: dev
  filename: /conf.json
```
```java
[
  {
    "id": "61e9107e283fcc36e66213a1",
    "alias": "mysql",
    "url": "",
    "username": "root",
    "password": "123456",
    "supportPool": true,
    "maximumPoolSize": 10,
    "maxLifetime": 2,
    "driver": "com.mysql.jdbc.Driver",
    "connectionTestQuery": "select 1"
  }
]

```
## MyDataSource

成员变量 `dataSourceManager` 和 dataSource, 前者为配置中心的配置数据,后者用于`DataSource`接口中声明的方法.
```java
public class MyDataSource implements DataSource {
    @Setter
    private DataSourceManager dataSourceManager;

    private DataSource dataSource;


    @SneakyThrows
    protected void init() {
        if (dataSourceManager.getSupportPool()) {
            HikariConfig config = new HikariConfig();
            config.setUsername(dataSourceManager.getUsername());
            config.setJdbcUrl(dataSourceManager.getUrl());
            config.setPassword(dataSourceManager.getPassword());
            config.setMaximumPoolSize(dataSourceManager.getMaximumPoolSize());
            config.setMaxLifetime(dataSourceManager.getMaxLifetime());
            config.setDriverClassName(dataSourceManager.getDriver());
            config.setConnectionTestQuery(dataSourceManager.getConnectionTestQuery());
            this.dataSource = new HikariDataSource(config);
        } else {
            SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
            dataSource.setUsername(dataSourceManager.getUsername());
            dataSource.setPassword(dataSourceManager.getPassword());
            dataSource.setUrl(dataSourceManager.getUrl());
            dataSource.setDriverClass((Class<? extends Driver>) Class.forName(dataSourceManager.getDriver()));
            this.dataSource = dataSource;
        }
    }

    @Override
    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public Connection getConnection(String s, String s1) throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public <T> T unwrap(Class<T> aClass) throws SQLException {
        return dataSource.unwrap(aClass);
    }

    @Override
    public boolean isWrapperFor(Class<?> aClass) throws SQLException {
        return dataSource.isWrapperFor(aClass);
    }

    @Override
    public PrintWriter getLogWriter() throws SQLException {
        return dataSource.getLogWriter();
    }

    @Override
    public void setLogWriter(PrintWriter printWriter) throws SQLException {
        dataSource.setLogWriter(printWriter);
    }

    @Override
    public int getLoginTimeout() throws SQLException {
        return dataSource.getLoginTimeout();
    }

    @Override
    public void setLoginTimeout(int i) throws SQLException {
        dataSource.setLoginTimeout(dataSource.getLoginTimeout());
    }

    @Override
    public Logger getParentLogger() throws SQLFeatureNotSupportedException {
        return dataSource.getParentLogger();
    }
}
```
## CommandLineRunner

1. 监听配置中心传来的数据
2. 循环注册bean
```java
    @Bean
    @ConditionalOnProperty(prefix = "centraldogma", value = "enable", havingValue = "true")
    @ConditionalOnMissingBean
    public CommandLineRunner dataSourceCommandLineRunner(CentralDogma dogma, ObjectMapper objectMapper, ConfigurableApplicationContext applicationContext) {
        Watcher watcher = dogma.fileWatcher(configuration.getProject(), configuration.getRepo(), Query.ofText(configuration.getFilename()));
        watcher.watch((revision, value) -> {
            log.info("Updated to {} at {}", value, revision);
            try {
                BeanDefinitionRegistry beanFactory = (BeanDefinitionRegistry) applicationContext.getBeanFactory();
                List<DataSourceManager> all = objectMapper.readValue(value.toString(), new TypeReference<List<DataSourceManager>>() {
                });
                for (DataSourceManager dataSourceManager : all) {
                   if (beanFactory.containsBeanDefinition(dataSourceManager.getId())) {
                        log.info("datasource exist id:{},name:{}", dataSourceManager.getId(), dataSourceManager.getAlias());
                        beanFactory.removeBeanDefinition(dataSourceManager.getId());
                        log.info("old datasource remove id:{},name:{}", dataSourceManager.getId(), dataSourceManager.getAlias());
                    }
                    BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(OneserviceDataSource.class);
                    beanDefinitionBuilder.addPropertyValue("dataSourceManager", dataSourceManager);// setter 注入
                    beanDefinitionBuilder.setInitMethodName("init");// init 方法初始化 私有变量
                    beanFactory.registerBeanDefinition(dataSourceManager.getId(), beanDefinitionBuilder.getBeanDefinition());
                    log.info("datasource register success  id :{},alias:{}", dataSourceManager.getId(), dataSourceManager.getAlias());
                }
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                log.error("json convert  error", e);
            }
        });
        return args -> {
        };
    }
```
## 注入
由于监听是异步操作 ,故bean应该是懒加载
```java
    @Autowired
    @Lazy
    @Qualifier("61e9107e283fcc36e66213a1")
    private DataSource dataSource;
```
