## 加密

仅使用加密模块

- jdk17需要额外引入jaxb相关依赖
- 可以排除一些依赖,减小包体积

```xml

<dependencies>
    <dependency>
        <groupId>javax.xml.bind</groupId>
        <artifactId>jaxb-api</artifactId>
        <version>2.3.1</version>
    </dependency>
    <dependency>
        <groupId>com.sun.xml.bind</groupId>
        <artifactId>jaxb-impl</artifactId>
        <version>2.3.0</version>
    </dependency>
    <dependency>
        <groupId>com.sun.xml.bind</groupId>
        <artifactId>jaxb-core</artifactId>
        <version>2.3.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.shardingsphere</groupId>
        <artifactId>shardingsphere-jdbc-core</artifactId>
        <version>5.4.1</version>
        <exclusions>
            <exclusion>
                <groupId>org.apache.shardingsphere.elasticjob</groupId>
                <artifactId>elasticjob-lite-core</artifactId>
            </exclusion>
            <exclusion>
                <groupId>org.apache.shardingsphere</groupId>
                <artifactId>shardingsphere-sql-parser-sqlserver</artifactId>
            </exclusion>
            <exclusion>
                <groupId>org.apache.shardingsphere</groupId>
                <artifactId>shardingsphere-sql-parser-opengauss</artifactId>
            </exclusion>
            <exclusion>
                <groupId>org.apache.shardingsphere</groupId>
                <artifactId>shardingsphere-sql-parser-oracle</artifactId>
            </exclusion>
            <exclusion>
                <groupId>org.apache.shardingsphere</groupId>
                <artifactId>shardingsphere-sql-parser-postgresql</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
</dependencies>
```

## 配置优化

为了避免多个地方配置同一数据源(spring配置的flyway/sharding配置)

使用下述类之后,spring中的数据源配置使用传统配置即可,而不是sharding要求的`ShardingSphereDriver`

https://developer.aliyun.com/article/1214856

```java

@ConditionalOnClass(value = ShardingSphereDriver.class)
@ConditionalOnResource(resources = {"classpath:sharding-config.yaml"})
@Configuration
@RequiredArgsConstructor
public class ShardingSphereConfig {
    private static final YamlRuleConfigurationSwapperEngine SWAPPER_ENGINE = new YamlRuleConfigurationSwapperEngine();
    @Value("classpath:sharding-config.yaml")
    private Resource shardingConfig;

    private void rebuildGlobalRuleConfiguration(YamlJDBCConfiguration jdbcConfig) {
        Collection var10000 = jdbcConfig.getRules();
        Objects.requireNonNull(YamlGlobalRuleConfiguration.class);
        var10000.removeIf(YamlGlobalRuleConfiguration.class::isInstance);
        if (null != jdbcConfig.getAuthority()) {
            jdbcConfig.getRules().add(jdbcConfig.getAuthority());
        }

        if (null != jdbcConfig.getTransaction()) {
            jdbcConfig.getRules().add(jdbcConfig.getTransaction());
        }

        if (null != jdbcConfig.getGlobalClock()) {
            jdbcConfig.getRules().add(jdbcConfig.getGlobalClock());
        }

        if (null != jdbcConfig.getSqlParser()) {
            jdbcConfig.getRules().add(jdbcConfig.getSqlParser());
        }

        if (null != jdbcConfig.getSqlTranslator()) {
            jdbcConfig.getRules().add(jdbcConfig.getSqlTranslator());
        }

        if (null != jdbcConfig.getTraffic()) {
            jdbcConfig.getRules().add(jdbcConfig.getTraffic());
        }

        if (null != jdbcConfig.getLogging()) {
            jdbcConfig.getRules().add(jdbcConfig.getLogging());
        }

        if (null != jdbcConfig.getSqlFederation()) {
            jdbcConfig.getRules().add(jdbcConfig.getSqlFederation());
        }

    }

    private String getDataBaseName(String url) {
        Pattern p = Pattern.compile("jdbc:(?<db>\\w+):.*((//)|@)(?<host>.+):(?<port>\\d+)(/|(;DatabaseName=)|:)(?<dbName>\\w+.+)\\?");
        Matcher m = p.matcher(url);
        if (m.find()) {
            return m.group("dbName");
        }
        return null;
    }

    /**
     * 主数据源, 默认注入
     */
    @Bean(name = "defaultDataSource")
    @Primary
    public DataSource dataSourceDev(DataSourceProperties dataSourceProperties) throws SQLException, IOException {
        HikariConfig config = new HikariConfig();
        config.setDriverClassName(dataSourceProperties.getDriverClassName());
        config.setMaximumPoolSize(30);
        config.setJdbcUrl(dataSourceProperties.getUrl());
        config.setUsername(dataSourceProperties.getUsername());
        config.setPassword(dataSourceProperties.getPassword());
        HikariDataSource hikariDataSource = new HikariDataSource(config);
        YamlJDBCConfiguration jdbcConfig = (new Yaml(new ShardingSphereYamlConstructor(YamlJDBCConfiguration.class)))
                .loadAs(shardingConfig.getContentAsString(Charset.defaultCharset()), YamlJDBCConfiguration.class);
        String dbName = getDataBaseName(dataSourceProperties.getUrl());
        rebuildGlobalRuleConfiguration(jdbcConfig);
        ModeConfiguration modeConfig = null == jdbcConfig.getMode() ? null
                : (new YamlModeConfigurationSwapper()).swapToObject(jdbcConfig.getMode());
        Collection<RuleConfiguration> ruleConfigs = SWAPPER_ENGINE.swapToRuleConfigurations(jdbcConfig.getRules());
        jdbcConfig.setDatabaseName(dbName);
        DataSource dataSource = ShardingSphereDataSourceFactory.createDataSource(jdbcConfig.getDatabaseName(),
                modeConfig, Collections.singletonMap(dbName, hikariDataSource), ruleConfigs, jdbcConfig.getProps());
        return dataSource;
    }
}


```

`sharding-config.yaml` 配置加密字段

```yaml
mode:
  type: Standalone
  repository:
    type: JDBC
    props:
      path: demo
rules:
  - !SINGLE
    tables: #https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-jdbc/yaml-config/rules/single/
      - "*.*" # 加载全部单表
  - !ENCRYPT
    tables:
      t_user:
        columns:
          email:
            cipher:
              name: email
              encryptorName: standard_encryptor
          mobile:
            cipher:
              name: mobile
              encryptorName: standard_encryptor
    encryptors:
      assisted_encryptor:
        type: MD5
      standard_encryptor:
        type: AES
        props:
          aes-key-value: 123456abc
props:
  sql-show: false

```

