## 部署

### 集群

### 配置文件

1. github下载tar解压缩到/opt下,更新 application.properties 的数据库配置,可直接使用OB替代mysql
2. 进入 cluster.conf 添加集群节点(至少3节点)

需要注意的是
[https://nacos.io/zh-cn/docs/2.0.0-compatibility.html](https://nacos.io/zh-cn/docs/2.0.0-compatibility.html)
Nacos2.0版本相比1.X新增了gRPC的通信方式，因此需要增加2个端口。新增端口是在配置的主端口(server.port)基础上，进行一定偏移量自动生成。

| 端口   | 与主端口的偏移量 | 描述                              |
|------|----------|---------------------------------|
| 9848 | 1000     | 客户端gRPC请求服务端端口，用于客户端向服务端发起连接和请求 |
| 9849 | 1001     | 服务端gRPC请求服务端端口，用于服务间同步等         |

**使用VIP/nginx请求时，需要配置成TCP转发，不能配置http2转发，否则连接会被nginx断开。**

### service注册

> systemctl enable nacos.service

> [Unit]
> Description=nacos
> After=network.target
>
> [Service]
> Type=forking
> ExecStart=/opt/nacos/bin/startup.sh
> ExecReload=/opt/nacos/bin/shutdown.sh
> ExecStop=/opt/nacos/bin/shutdown.sh
> PrivateTmp=true
>
> [Install]
> WantedBy=multi-user.target

## SpringBoot

```xml

<dependencies>
    <dependency>
        <groupId>com.alibaba.boot</groupId>
        <artifactId>nacos-config-spring-boot-starter</artifactId>
        <version>0.2.11</version>
    </dependency>
    <!--用于解决bean刷新的问题-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-context</artifactId>
        <version>3.0.3</version>
    </dependency>
</dependencies>
```

### 多环境Profile问题

为了能够利用mvn的profile能力,区分不同环境的配置文件

```yaml
spring:
  application:
    name: nacos-config-demo
  profiles:
    active: ${profile-name}

nacos:
  config:
    server-addr: 192.168.203.1:8848
    username: nacos
    password: nacos
    namespace: 98ab843c-e546-4fdd-be7a-189494fb7872
    data-id: nacos-config-${profile-name}.yaml
    auto-refresh: true
    group: DEFAULT_GROUP
    type: yaml
    bootstrap:
      enable: true
      log-enable: true

```

```java

@Data
@Configuration
@NacosConfigurationProperties(dataId = "${nacos.config.data-id}", prefix = "", autoRefreshed = true)
public class Conf {
    private String custom;
}
```

或者使用 `spring-cloud-context`包中 `@RefreshScope`注解同样可以实现自动刷新配置的功能,不过该注解需要实现一个监听器

```java

@Configuration
@Data
@RefreshScope
@ConfigurationProperties(prefix = "spring.data.mongodb")
public class MongoBean {
    private String uri;
}

```

```java

@Autowired
private ContextRefresher contextRefresher;

@NacosConfigListener(dataId = "${nacos.config.data-id}")
public void aaaa(String msg) {
    System.out.println("refresh" + msg);
    new Thread(() -> contextRefresher.refresh()).start();
}
```

### bean刷新问题

与前面同样的措施,需要 `contextRefresher`和 `@NacosConfigListener`
以`Mysql`和`JdbcTemplate`为例

```java

@Configuration
@Data
@RefreshScope
@ConfigurationProperties(prefix = "mysql")
public class MysqlBean {
    private String url;
    private String name;
    private String password;
}
```

```java

@Configuration
public class DbConf {
    @Bean
    @RefreshScope// 该注解放在 类上存在不生效的问题,此处暂时没有深入研究
    public DataSource dataSource(MysqlBean mysqlBean) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(mysqlBean.getUrl());
        config.setUsername(mysqlBean.getName());
        config.setPassword(mysqlBean.getPassword());
        config.setMaximumPoolSize(20);
        config.setMaxLifetime(TimeUnit.SECONDS.toMillis(60));
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return new HikariDataSource(config);
    }

    @Bean
    @DependsOn("dataSource")
    @RefreshScope
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

nacos配置文件:

```yaml
mysql:
  url: jdbc:mysql://39.97.243.43:3306/xxl
  name: root
  password: 11111
```

此时修改url中的数据库连接,可以自动更新`DataSource`和` JdbcTemplate`bean
