## 概述

### 什么是微服务

从项目发展的历程来说，从最开始的All in one到垂直应用架构，伴随着项目的复杂度的提升，为了解决可靠性、拓展性，慢慢发展出了微服务架构的模式。 垂直应用架构虽然已经对各个模块做了拆分，但是并仍然存在代码复用性差、靠可行低的问题，而微服务架构的核心便是通过业务拆分单个服务，通过网络传输进行通信，通过统一的服务治理、负载均衡等实现易于拓展、高可用低耦合的目的。对于JavaWeb开发而言，微服务就是针对某个具体单一的业务需求而实现的程序，微服务架构提倡系统拆分为各个微服务，通过各个服务的协调配合来实现业务系统。

### 微服务的四个核心问题

1. 服务很多，客户端该怎么访问？

通过路由网关来实现：代理、路由、过滤的功能 ;实现外部访问统一入口的基础而过滤器功能则负责对请求的处理过程进行干预,是实现请求校验、服务聚合等功能的基础.

2. 服务之间通信问题？

服务之间通信问题可以通过HTTP协议或者RPC协议来实现

3. 服务很多，怎么治理？

其核心就是需要一个服务注册、发现的机制。

4. 服务很多，挂了怎么办？

微服务的核心问题就是服务事故的解决，其解决依赖于系统的容灾机制。

### 解决方案

#### Dubbo+Zookeeper

相较于SpringCloud，Dubbo更像一个纯粹的实现RPC通信的架构，它往往配合Zookeeper提供的服务注册发现中心的功能，来实现半自动的微服务系统架构的搭建。 该方案缺少API网关、熔断机制，需要第三方组件或者手动实现。

> RPC和HTTP协议


#### SpringCloud Netflix

API网关：Zuul 通信：Feign（基于HttpClient通信，同步阻塞） 服务注册发现：Eureka 熔断机制：Hystrix

#### SpringCloud Alibaba

由于Netflix中部分组件已经停更的问题，去年秋季Alibaba成功孵化，其核心还是一站式微服务解决方案。未来可能会得到更多应用。

### 微服务带来的负面问题

运维压力增大；系统部署依赖；通信成本；数据一致性问题；

### 微服务的各种组件

1. 服务配置管理：Archaius、Diamond
2. 服务注册发现：Eureka、Zookeeper、Consul
3. 服务调用：Rest、RPC、gRPC
4. 服务熔断器：Hystrix 、 Envoy
5. 负载均衡：Ribbon、Nginx
6. 服务接口调用（客户端调用服务简化工具）：Feign
7. 消息队列：Kafka、RabbtiMQ、ActiveMQ
8. 服务配置中心管理：SpringCloudConfig、Chef
9. 服务路由（API网关）：Zuul
10. 服务监控：Zabbix、Nagios、Metrics、Specataor
11. 全链路追踪：Zipkin、Brave、Dapper
12. 服务部署：Docker、OpenStack、Kubernetes
13. 数据流操作开发包：SpringCloudStream
14. 事件消息总线：SpringCloudBus

### 微服务的下一代发展

服务网格ServiceMesh，产品比如Istio

## Dubbo

之前已经学习使用了Dubbo+Zookeeper，其版本相较于目前更低， [Dubbo2.6](https://blog.csdn.net/ZzzPaul/article/details/82343603) 不过最新版的2.7.5在具体的使用上区别不大，下面只对有变化的地方：

### 依赖和配置

新增了curator-recipes依赖，同时需要排除log4j解决依赖冲突。其余除了@Service和@Reference包路径变化之外，仍然可以使用。下面例子使用了Zookeeper，其相关配置安装参考如下：[ZK和Dubbo Admin](https://blog.csdn.net/ZzzPaul/article/details/82315287)

```
 	<dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.7.5</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>2.8.0</version>
            <exclusions>
                <exclusion>
                        <groupId>log4j</groupId>
                        <artifactId>log4j</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.11</version>
            <exclusions>
                <exclusion>
                    <groupId>log4j</groupId>
                    <artifactId>log4j</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```

#### provider

```
# Service version
demo.service.version = 1.0.0
# Base packages to scan Dubbo Components (e.g @Service , @Reference)
dubbo.scan.basePackages  = com.demo.provider.service

# Dubbo Config properties
## ApplicationConfig Bean
#提供发应用名称,用于计算依赖关系
dubbo.application.id = my-dubbo-provider
dubbo.application.name = my-dubbo-provider


## ProtocolConfig Bean
#使用dubbo协议,在12345端口暴露服务
dubbo.protocol.id = dubbo
dubbo.protocol.name = dubbo
dubbo.protocol.port = 12345

## RegistryConfig Bean
#使用zookeeper注册中心暴露服务地址
dubbo.registry.id = my-registry
dubbo.registry.address = zookeeper://127.0.0.1:2181
#dubbo.registry.address = N/A
@org.apache.dubbo.config.annotation.Service(
        version = "${demo.service.version}",
        application = "${dubbo.application.id}",
        protocol = "${dubbo.protocol.id}",
        registry = "${dubbo.registry.id}"
)
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> userList() {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        return userMapper.selectList(queryWrapper);
    }
}
```

#### consumer

```
# Dubbo Config properties
## ApplicationConfig Bean消费方应用名称,用于计算依赖关系,不是匹配条件,不能和提供方名称一样
dubbo.application.id = my-dubbo-consumer
dubbo.application.name = my-dubbo-consumer

dubbo.service.version = 1.0.0

dubbo.registry.id = my-registry
dubbo.registry.address = zookeeper://127.0.0.1:2181
dubbo.registry.check=false

## ProtocolConfig Bean
dubbo.protocol.id = dubbo
dubbo.protocol.name = dubbo
dubbo.protocol.port = 12345
@RestController
public class IndexController {

    @Reference(version = "1.0.0")
    private UserService userService;

    @GetMapping("/users")
    public List<User> get(){
        return userService.userList();
    }
}
```

## SpringCloud

之后的SpringCloud将会以Netflix为主，版本为Hoxton.SR3，SpringBoot版本为2.2.4.RELEASE，这两者的版本需要相互配合：

> Hoxton 2.2.x Greenwich 2.1.x Finchley 2.0.x Edgware 1.5.x Dalston 1.5.x


Spring Cloud的子项目，大致可分成两类，一类是对现有成熟框架"Spring Boot化"的封装和抽象，也是数量最多的项目；第二类是开发了一部分分布式系统的基础设施的实现，如Spring Cloud Stream扮演的就是kafka, ActiveMQ这样的角色。

### Eureka

> 在微服务架构中往往会有一个注册中心，每个微服务都会向注册中心去注册自己的地址及端口信息，注册中心维护着服务名称与服务实例的对应关系。每个微服务都会定时从注册中心获取服务列表，同时汇报自己的运行情况，这样当有的服务需要调用其他服务时，就可以从自己获取到的服务列表中获取实例地址进行调用，Eureka实现了这套服务注册与发现机制。

### Eureka和Zookeeper

分布式结构的CAP定理：指的是在一个分布式系统中，Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），最多只能同时三个特性中的两个，三者不可兼得。

> RDBMS==>（MySql,Oracle,SqlServer等关系型数据库）遵循的原则是：ACID原则（A：原子性。C：一致性。I：独立性。D：持久性。）。 NoSql==>  （redis,Mogodb等非关系型数据库）遵循的原则是：CAP原则


> Zookeeper是CP放弃A，zookeeper分布式集群是使用主从模型实现的，在一个时间点上，只有一个leader真正的对外提供服务。其他的slave都会实时备份leader中的数据，当leader宕机，则slave选举出新的leader对外提供服务。 eureka是AP放弃C，eureka分布集群是平等模型（无主模型），所有的节点都是平等的，客户端访问任意节点都可以提供实时的服务响应。如果某节点发生宕机等故障，接收到的请求会转交给其他的节点。无主模型，每个节点的数据可能不实时一致，节点需要通过网络通讯从其他节点获取数据，并实现数据的一致，可能有网络延迟或者网络故障或者通讯频率问题。

Eureka Server和Client

Eureka是BS架构，相比于Zookeeper本地运行客户端，需要手动实现Eureka注册中心。 Eureka Cilent是一个Java客户端，类似于Zookeeper的zk-client，都是用于简化和注册中心的交互，它内置了使用轮询算法的负载均衡器，在应用启动后将会向Eureka Server发送心跳（默认30秒）。如果Server在多个心跳周期内没有接收到某个客户端的心跳（90秒），将会移除该节点

#### 依赖和配置

```
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
 	<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
server:
  port: 8001
spring:
  application:
    name: eureka-server
eureka:
  instance:
    hostname: localhost #server的实例名称
  client:
    fetch-registry: false #是否向注册中心注册自己
    register-with-eureka: false #false表示自己是注册中心
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/ # 监控页面
```

在启动类上添加注解：@EnableEurekaServer，启动后访问http://localhost:8001/即可。

#### 添加客户端

新建模块 client-eureka

#### 依赖和配置

```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
    
<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
# 指定运行端口
server:
  port: 8002

# 指定服务名称
spring:
  application:
    name: eureka-client
eureka:
  client:
    # 注册到Eureka的注册中心
    register-with-eureka: true
    # 获取注册实例列表
    fetch-registry: true
    service-url:
      # 配置注册中心地址
      defaultZone: http://localhost:8001/eureka
```

启动类添加注解@EnableEurekaClient即可，

> @EnableDiscoveryClient和@EnableEurekaClient共同点就是：都是能够让注册中心能够发现，扫描到改服务。


> 不同点：@EnableEurekaClient只适用于Eureka作为注册中心，@EnableDiscoveryClient 可以是其他注册中心。


再次访问[http://localhost:8001即可看到](http://localhost:8001%E5%8D%B3%E5%8F%AF%E7%9C%8B%E5%88%B0/)

> Application AMIs Availability Zones Status EUREKA-CLIENT n/a (1) (1) UP (1) - NoteBook:eureka-client:8002


#### 搭建Eureka注册中心集群

> 由于所有服务都会注册到注册中心去，服务之间的调用都是通过从注册中心获取的服务列表来调用，注册中心一旦宕机，所有服务调用都会出现问题。所以我们需要多个注册中心组成集群来提供服务，下面将搭建一个双节点的注册中心集群。


##### 搭建两个注册中心

首先给server-eureka添加两个配置文件 application-replica1.yml和application-replica2.yml

```
server:
  port: 8002
spring:
  application:
    name: eureka-server1
eureka:
  instance:
    hostname: replica1 #server的实例名称
  client:
    fetch-registry: true #是否向注册中心注册自己
    register-with-eureka: true #false表示自己是注册中心
    service-url:
      defaultZone: http://${eureka.instance.hostname}:8003/eureka/ # 监控页面
server:
  port: 8003
spring:
  application:
    name: eureka-server2
eureka:
  instance:
    hostname: replica2 #server的实例名称
  client:
    fetch-registry: true #是否向注册中心注册自己
    register-with-eureka: true #false表示自己是注册中心
    service-url:
      defaultZone: http://${eureka.instance.hostname}:8002/eureka/ # 监控页面
```

通过两个server相互注册，搭建了注册中心的双节点集群，由于defaultZone使用了域名，所以还需在本机的host文件中配置一下。 127.0.0.1 replica1 127.0.0.1 replica2

##### 分别运行两个注册中心

在idea的运行配置中，将Active profiles 分别修改为replica2和replica1，然后两次启动该组件。访问任一[http://localhost](http://localhost/):8003/或者http://localhost:8002/均可以看到

EUREKA-SERVER1 n/a (1) (1) UP (1) - NoteBook:eureka-server1:8002 EUREKA-SERVER2 n/a (1) (1) UP (1) - NoteBook:eureka-server2:8003

##### Client注册到两个服务中心

> defaultZone: [http://replica1:8002/eureka/,http://replica2:8003/eureka/](http://replica1:8002/eureka/,http://replica2:8003/eureka/)


#### 其它常用配置

```
eureka:
  client: #eureka客户端配置
    register-with-eureka: true #是否将自己注册到eureka服务端上去
    fetch-registry: true #是否获取eureka服务端上注册的服务列表
    service-url:
      defaultZone: http://localhost:8001/eureka/ # 指定注册中心地址
    enabled: true # 启用eureka客户端
    registry-fetch-interval-seconds: 30 #定义去eureka服务端获取服务列表的时间间隔
  instance: #eureka客户端实例配置
    lease-renewal-interval-in-seconds: 30 #定义服务多久去注册中心续约
    lease-expiration-duration-in-seconds: 90 #定义服务多久不去续约认为服务失效
    metadata-map:
      zone: guangdong #所在区域
    hostname: localhost #服务主机名称
    prefer-ip-address: false #是否优先使用ip来作为主机名
  server: #eureka服务端配置
    enable-self-preservation: false #关闭eureka服务端的保护机制
```

#### 添加认证

需要spring security

```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
spring:
  application:
    name: server-security-eureka
  security:
    user:
      # 配置spring security登录用户名和密码
      name: root
      password: 123456
```

WebConfig

```
@EnableWebSecurity
public class WebConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().ignoringAntMatchers("/eureka/**");
        super.configure(http);
    }
}
```

对Client而言需要配置中添加用户名密码信息

```
 http://${username}:${password}@${hostname}:${port}/eureka/
```

### Ribbon

在微服务架构中，很多服务都会部署多个，其他服务去调用该服务的时候，如何保证负载均衡是个不得不去考虑的问题。负载均衡可以增加系统的可用性和扩展性，当我们使用RestTemplate来调用其他服务时，Ribbon可以很方便的实现负载均衡功能。

#### RestTemplate

> RestTemplate是一个HTTP客户端，使用它我们可以方便的调用HTTP接口，支持GET、POST、PUT、DELETE等方法。


在前面的文章中也有RestTemplate的介绍，注入该实例就可以通过HTTP协议完成远程Restful接口调用。

#### User-Service

已有接口如下：

```
    @Resource
    private IUserService userService;

    @GetMapping("/")
    public List<User> userList(){
        return userService.list();
    }

    @GetMapping("/{id}")
    public User userOne(@PathVariable Long id ){
        return userService.getById(id);
    }
```

在没有引入ribbon的时候只需要注入RestTemplate便可以完成远程接口调用。 并且注册服务到Eureka-Server中

```
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  application:
    name: user-service
mybatis-plus:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.cloud.demo.entity
mybatis:

# 指定运行端口
server:
  port: 8010
eureka:
  client:
    # 注册到Eureka的注册中心
    register-with-eureka: true
    # 获取注册实例列表
    fetch-registry: true
    service-url:
      # 配置注册中心地址
      defaultZone: http://root:123456@localhost:8005/eureka
```

#### User-Ribbon-Service

#### 依赖和配置

```
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
server:
  port: 8011
# 指定服务名称
spring:
  application:
    name: user-service-ribbon-client

eureka:
  client:
    # 注册到Eureka的注册中心
    register-with-eureka: true
    # 获取注册实例列表
    fetch-registry: true
    service-url:
      # 配置注册中心地址
      defaultZone: http://root:123456@localhost:8005/eureka
```

对RestTemplate配置：

```
    @Bean
    @LoadBalanced//负载均衡
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
```

测试

```
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/user/{id}")
    public User userList(@PathVariable Long id ){
       User user = restTemplate.getForObject("http://user-service/user/"+id,User.class);
       return user;
    }
```

[//路径应该为spring.application.name](//xn--spring-vy7ih03iy0bb73q8xe.application.name)

#### Ribbon常用配置

##### 全局配置

```
ribbon:
  ConnectTimeout: 1000 #服务请求连接超时时间（毫秒）
  ReadTimeout: 3000 #服务请求处理超时时间（毫秒）
  OkToRetryOnAllOperations: true #对超时请求启用重试机制
  MaxAutoRetriesNextServer: 1 #切换重试实例的最大个数
  MaxAutoRetries: 1 # 切换实例后重试最大次数
  NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #修改负载均衡算法
```

##### 指定服务进行配置

> 调用user-service的单独配置,至于这个怎么使用,会在后面.


```
user-service:
  ribbon:
    ConnectTimeout: 1000 #服务请求连接超时时间（毫秒）
    ReadTimeout: 3000 #服务请求处理超时时间（毫秒）
    OkToRetryOnAllOperations: true #对超时请求启用重试机制
    MaxAutoRetriesNextServer: 1 #切换重试实例的最大个数
    MaxAutoRetries: 1 # 切换实例后重试最大次数
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #修改负载均衡算法
```

### Feign

Feign可以理解为社区版的Ribbon和Hystrix的集合，它简化了使用Ribbon所需要的RestTemplate的操作，更符合基于接口的开发模式，通过内部进一步的封装，可以通过注解的方式完成Rest接口调用和负载均衡的功能，同时它也提供了基于Hystrix的服务容错保护功能

#### 依赖和配置

```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```

配置基本不变，核心还是注册EurekaCilent

```
server:
  port: 8014

spring:
  application:
    name: feign-client

eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://root:123456@localhost:8005/eureka
```

#### [@FeignClient ](/FeignClient)

需要声明一个接口FeignClientService

```
@FeignClient(value = "USER-SERVICE")
public interface UserFeignService {

    @GetMapping("/user/")//路径要为user-service中的全路径,否则feign.FeignException$NotFound
    public List<User> userList();

}
```

除了value属性以外,也包含fallback = UserFallbackService.class等, 该属性等同于Hystrix的服务降级实现类.

#### Hystrix

1. 声明新类实现UserFeignService,实现接口中的方法,并且为该类添加[[@Component注解,修改FeignClientService接口的@FeignClient(value ](/Component注解,修改FeignClientService接口的@FeignClient(value ) ](/Component注解,修改FeignClientService接口的[@FeignClient(value ](/FeignClient(value ) ) = "USER-SERVICE")为[[@FeignClient(value ](/FeignClient(value ) ](/FeignClient(value ) = "USER-SERVICE",fallback = UserFallbackService.class) 即可完成服务熔断的调用,不过该方法无法处理异常 
2. 可以使用另一种方式: 实现类implements FallbackFactory,[[@FeignClient(value ](/FeignClient(value ) ](/FeignClient(value ) = "USER-SERVICE",fallbackFactory = UserFallbackService.class) 

```
@Component
public class TestServiceHystrix implements FallbackFactory<TestService> {
    @Override
    public TestService create(Throwable throwable) {
        return new TestService() {
            @Override
            public List<User> userList(){
	    //...
            };
        };
    }
}
```

#### 常见配置

```
#feign接口开启hystrix
feign.hystrix.enabled=true
#是否允许超时，默认、建议true
hystrix.command.default.execution.timeout.enabled=true
#超时时间，“hystrix.command.default.execution.timeout.enabled=true”时会生效
hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds=5000
#超时是否中断，默认、建议为true
hystrix.command.default.execution.isolation.thread.interruptOnTimeout=true
#取消是否中断，默认、建议为false
hystrix.command.default.execution.isolation.thread.interruptOnCancel=false
#最大并发请求，默认10，建议根据实际情况设定此值
hystrix.command.default.execution.isolation.semaphore.maxConcurrentRequests=100
#最大并发降级请求处理上线，默认10，建议根据实际情况设此值，降级请求并发量高于此值时，抛出异常
hystrix.command.default.fallback.isolation.semaphore.maxConcurrentRequests=20
#此属性确定断路器是否用于跟踪健康状况，以及当断路器打开的时候是否用于短路请求(使请求快速失败进入降级逻辑)。
#默认、建议true
hystrix.command.default.circuitBreaker.enabled=true
#断路器请求量阈值，默认20，建议默认，部分接口如果不能容忍此值可单独配置
#例如，如果值是20，那么如果在滑动窗口中只接收到19个请求(比如一个10秒的窗口)，
# 即使所有19个请求都失败了，断路器也不会打开
hystrix.command.default.circuitBreaker.requestVolumeThreshold=10
#隔离策略，默认、建议THREAD
hystrix.command.default.execution.isolation.strategy=THREAD
#断路器等待窗口时间，此属性设置断路器打开后拒绝请求的时间量，
# 每隔一段时间( sleepWindowInMilliseconds ，单位是毫秒)允许再次尝试(也就是放行一个请求)确定是否应该关闭断路器。
#默认5000，建议保持默认
hystrix.command.default.circuitBreaker.sleepWindowInMilliseconds=5000
#断路器错误百分比阈值，设置一个错误百分比，当请求错误率超过设定值，断路器就会打开。
#默认50，建议保持默认
hystrix.command.default.circuitBreaker.errorThresholdPercentage=50
```

### Hystrix

> 在微服务架构中，服务与服务之间通过远程调用的方式进行通信，一旦某个被调用的服务发生了故障，其依赖服务也会发生故障，此时就会发生故障的蔓延，最终导致系统瘫痪。Hystrix实现了断路器模式，当某个服务发生故障时，通过断路器的监控，给调用方返回一个错误响应，而不是长时间的等待，这样就不会使得调用方由于长时间得不到响应而占用线程，从而防止故障的蔓延。Hystrix具备服务降级、服务熔断、线程隔离、请求缓存、请求合并及服务监控等强大功能。


#### 执行顺序



#### 服务熔断

##### 依赖和配置

```
	<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
server:
  port: 8012
spring:
  application:
    name: hystrix-service
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://root:123456@localhost:8005/eureka
```

开启8005端口的Eureka Server和8010端口的服务提供者User-Service, 后者提供Restful接口

```
    @GetMapping("/{id}")
    public User userOne(@PathVariable Long id ){
        return userService.getById(id);
    }
```

在hystrix-service启动类上添加注解: @EnableCircuitBreaker用来表示开启熔断器

##### [@HystrixCommand ](/HystrixCommand)

在注册完RestTemplate的基础上,添加接口:

```
    @GetMapping("/hystrix/user/{id}")
    @HystrixCommand(fallbackMethod = "fallbackMethod1")//服务降级后调用下面的方法,其返回值应当一致
    public User getUser(@PathVariable Long id){
        return restTemplate.getForObject("http://localhost:8010/user/"+id,User.class);
    }

    public User fallbackMethod1(@PathVariable Long id){
        System.out.println("服务调用失败");
        return new User();
    }
```

在没有getUser出现异常的情况下,Hystrix会根据指定服务降级处理方法完成调用,避免出现长时间等待等问题.

@HystrixCommand的属性

> fallbackMethod：指定服务降级处理方法； ignoreExceptions：忽略某些异常，不发生服务降级； commandKey：命令名称，用于区分不同的命令； groupKey：分组名称，Hystrix会根据不同的分组来统计命令的告警及仪表盘信息； threadPoolKey：线程池名称，用于划分线程池。


##### 测试

1. 停掉User-Service或者更改为错误的请求路径

GET:[http://localhost:8012/hystrix/user/{1}](http://localhost:8012/hystrix/user/%7B1%7D)

> 服务调用失败


1. 添加属性 ignoreExceptions = NullPointerException.class

在其接口中throw new NullPointerException(); 再测试后服务未降级

```
 @GetMapping("/hystrix/exception/{id}")
    @HystrixCommand(fallbackMethod = "fallbackMethod1",
            ignoreExceptions = NullPointerException.class,
            commandKey = "getUserCommand",
            groupKey = "getUserGroup",
            threadPoolKey = "getUserThreadPool"
    )
    public User exceptionTest1(@PathVariable Long id){
        if (id == 1) {
            throw new IndexOutOfBoundsException();
        } else if (id == 2) {
            throw new NullPointerException();
        }
        return new User();
    }
```

##### 请求缓存

Hystrix有两种方式来应对高并发场景，分别是请求缓存与请求合并 前者鉴于其缺点:

- 是一个本地缓存。在集群情况下缓存是不能同步的。
- 不支持第三方缓存容器。Redis，memcache 不支持的。 所以往往使用SpringCache来替代.

> @CacheResult：开启缓存，默认所有参数作为缓存的key，cacheKeyMethod可以通过返回String类型的方法指定key； @CacheKey：指定缓存的key，可以指定参数或指定参数中的属性值为缓存key，cacheKeyMethod还可以通过返回String类型的方法指定； @CacheRemove：移除缓存，需要指定commandKey。


在缓存使用过程中，我们需要在每次使用缓存的请求前后对HystrixRequestContext进行初始化和关闭,否则会报异常:

> Request caching is not available. Maybe you need to initialize the HystrixRequestContext?


所以需要声明一个Filter,在doFilter中开启和关闭HystrixRequestContext

```
@Component
@WebFilter(urlPatterns = "/*",asyncSupported = true)
public class HystrixRequestContextFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HystrixRequestContext context = HystrixRequestContext.initializeContext();
        try {
            filterChain.doFilter(servletRequest,servletResponse);
        }finally {
            context.close();
        }
    }
}
```

##### 使用缓存

通过 [[@CacheResult(cacheKeyMethod ](/CacheResult(cacheKeyMethod ) ](/CacheResult(cacheKeyMethod ) = "getCacheKey") (其属性cacheKeyMethod需要手动实现一个方法:getCacheKey作为缓存的key,比如下面可以用查询主键作为cacheKey) 

```
    @GetMapping("/hystrix/user/{id}")
    @CacheResult(cacheKeyMethod = "getCacheKey")
    @HystrixCommand(fallbackMethod = "fallbackMethod1")
    public User getUser(@PathVariable Long id){
        return restTemplate.getForObject("http://localhost:8010/user/"+id,User.class);
    }

    public String getCacheKey(Long id) {//生成缓存key的方法
        return String.valueOf(id);
    }
```

连续两次使用相同的id请求该接口,可以发现user-service中只打印了一次请求日志.

##### 缓存删除

cacheKeyMethod获取cache的key,该方法的参数必须和当前接口的参数一致,且commandKey要和该缓存的@CacheResult的接口一致.

```
    @PutMapping("/hystrix/putUser")
    @HystrixCommand
    @CacheRemove(cacheKeyMethod = "getCacheKey1",commandKey = "getUser")
    public User user(@RequestBody User user){
        restTemplate.put("http://localhost:8010/user/",user,user.getId());
        return user;
    }
    public String getCacheKey1(User user) {
        return String.valueOf(user.getId());
    }
```

测试该接口再去请求get接口,缓存消失.

问题:怎么能再次设置缓存?

##### 请求合并

> 微服务系统中的服务间通信，需要通过远程调用来实现，随着调用次数越来越多，占用线程资源也会越来越多。Hystrix中提供了@HystrixCollapser用于合并请求，从而达到减少通信消耗及线程数量的效果。


在一次HTTP请求的过程中，收集一段时间内的相同请求，放到一个批处理命令中执行。实现合并请求，同样需要先初始化请求上下文.

注解@HystrixCollapser的常用属性

1. batchMethod：用于设置请求合并的方法；
2. collapserProperties：请求合并属性，用于控制实例属性，有很多；
3. timerDelayInMilliseconds：collapserProperties中的属性，用于控制每隔多少时间合并一次请求；

### DashBoard

用来监控hystrix实例的执行情况。

#### DashBoard模块

```
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        </dependency>
server:
  port: 8013
spring:
  application:
    name: hystrix-dashboard-service
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://root:123456@localhost:8005/eureka
```

启动类添加注解: @EnableHystrixDashboard [@EnableEurekaClient ](/EnableEurekaClient) 启动后访问: [http://localhost:8013/hystrix](http://localhost:8013/hystrix)

#### 被监控方

首先需要开启Actuator

```
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
management:
  endpoints:
    web:
      exposure:
        #暴露hystrix监控端点
        include: 'hystrix.stream'
```

被检控方需要注册一个servlet bean

```
    @Bean
    public ServletRegistrationBean getServlet(){
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/actuator/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
```

分别启动Eureka-Server,Hystrix-Service,User-Service,Dashboard-Service 服务注册完成后先测试Hystrix-Service接口, 在dashboard页面 添加URL [http://localhost:8012/actuator/hystrix.stream](http://localhost:8012/actuator/hystrix.stream) Delay:2000 Title:随意 点击MonitorStream即可监控Hystrix-Service该实例.

#### DashBoard图表

![](https://img-blog.csdnimg.cn/20191227163602699.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly90aGlua3dvbi5ibG9nLmNzZG4ubmV0,size_16,color_FFFFFF,t_70#alt=img#crop=0&crop=0&crop=1&crop=1&id=t3NQl&originHeight=617&originWidth=1265&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

---

### Gateway

#### Nginx和Gateway

> Nginx 负载均衡/反向代理 Gateway 路由网关/过滤器/统一鉴权


#### 为什么要有服务网关?

> Nginx作为网站请求的第一道,稳定性能强,能够独立完成反向代理和跨域的问题,但是使用Gateway,能够提供更丰富的功能,比如动态路由/过滤器(统一鉴权/限流)等,而且Gateway作为Cloud体系中的一环,集成功能更加简单.


#### Gateway和Zuul

> Gateway内置了限流过滤器 Gateway非阻塞式的API,并发更强 Zuul1编程模型简单，易于扩展； Gateway编程模型稍难，代码阅读难度要比Zuul高不少，扩展也稍复杂一些。


#### 依赖

```
	<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
```

#### yml

Gateway的基本功能仅用配置即可完成

```
spring:
  application:
    name: gateway-web
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]': #匹配所有的请求
            allowedOrigins: "*" # 跨域处理
            allowedMethods: #
              - GET
              - POST
              - PUT
              - DELETE
      routes:
        - id: shop-web-goods-route
#          uri: http://localhost:18081 #指定要路由的服务 http://localhost:18081
          uri: lb://GOODS #lb负载均衡,后面是微服务名称
          predicates: #路由断言,配置路由规则
            #- Host=zong.com** #所有的zong.com的请求都被路由到上面的uri,这里测试可以先修改windows的host文件如下,127.0.0.1 zong.com,
            # 访问http://zong.com:8001/brand/all,可看到正确路由
          - Path=/api/goods/** #所有以/brand开头的请求,都路由到http://localhost:18081微服务
          filters:
          - StripPrefix=1 # 所有以/api/brand开头的请求,都路由到  http://localhost:18081微服务,且/api由gateway自动去除
#          - name: RequestRateLimiter
#            args:
#              key-resolver: "#{@ipKeyResolver}"
#              redis-rate-limiter.replenishRate: 1
#              redis-rate-limiter.burstCapacity: 1
        - id: shop-web-user-route
          uri: lb://USER #lb负载均衡,后面是微服务名称
          predicates: #路由断言,配置路由规则
          - Path=/api/user/**
          filters:
          - StripPrefix=1 # 所有以/api/brand开头的请求,都路由到  http://localhost:18081微服务,且/api由gateway自动去除
#          - name: RequestRateLimiter #请求限流数,名字不能乱写,使用默认的factory
#            args:
#              key-resolver: "#{@ipKeyResolver}"
#              redis-rate-limiter.replenishRate: 1
#              redis-rate-limiter.burstCapacity: 1
management:
  endpoint:
    gateway:
      enabled: true
```

#### 配合JWT实现鉴权的demo

配置全局过滤器,对请求进行过滤,检测token是否有效.

```
package com.zong.filter;

import com.zong.util.JwtUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * 全局过滤器,用户校验
 */
@Component

public class AuthFilter implements GlobalFilter, Ordered {

    public static final String AUTH_TOKEN = "Auth";
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //获取用户令牌
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        //
        String token = request.getHeaders().getFirst(AUTH_TOKEN);
        boolean hasToken = true;
        if(StringUtils.isEmpty(token)){
            token = request.getQueryParams().getFirst(AUTH_TOKEN);
            hasToken = false;
        }
        if(StringUtils.isEmpty(token)){
            HttpCookie cookie = request.getCookies().getFirst(AUTH_TOKEN);
            if (cookie != null) {
                token = cookie.getValue();
                hasToken = false;
            }
        }
        if(StringUtils.isEmpty(token)){
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }
        try {
            //有效
            JwtUtil.parseJWT(token);
        } catch (Exception e) {
            //无效拦截
            e.printStackTrace();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }
        //放行
        //将令牌放入header
        if(!hasToken){
            request.mutate().header(AUTH_TOKEN,token);
        }
        return chain.filter(exchange);
    }

    @Override//排序,越小越先执行
    public int getOrder() {
        return 0;
    }
}
```

#### JWT定义

头部:{type:'JWT',alg:'HS256'},对头部进行base64加密,得到编码后的字符串

载荷:

1. 标准声明
2. 私有声明(不参与令牌校验)
3. 公共声明(不参与令牌校验)

比如: {'sub':"123456","name":"Paul","admin":true},将其base64加密,得到编码后的字符串

签名: 头部(加密后的)+载荷(加密后的)+密钥-> HS256加密(头中指定的加密算法) ->密文->签名

jwt:将三部分密文用.隔开拼在一起就是最终的jwt

校验:服务中存有密钥,对比头部+载荷+密钥 加密后的密文与调用方对比.

eg.

> 1. 在gateway中设置全局拦截器,依次尝试从header/参数/cookies中获取token
> 2. 利用密钥校验,失败或token为空,则返回401,跳到登录页面,成功则放行
> 3. 登录接口生成token,放入cookie,并返回token参数给前台 JWT生成和校验


```
	<dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.0</version>
        </dependency>
    public static void main(String[] args) {

        Map<String, Object> map = new HashMap<>();
        map.put("self","aaa");

        JwtBuilder builder = Jwts.builder()
                .setId("Paul")
                .setSubject("AAA")
                .setIssuedAt(new Date())//颁发时间
                .addClaims(map)//载荷中自定义的部分
                .setExpiration(new Date(System.currentTimeMillis()+2000))//过期时间 20秒
                .signWith(SignatureAlgorithm.HS256,"itcast");//加密算法和密钥
//        System.out.println(builder.compact());
        String token = builder.compact();

        String t =  token;
        Claims claims = Jwts.parser().setSigningKey("itcast")
                .parseClaimsJws(t)
                .getBody();
        System.out.println(claims.toString());


    }
```

在用户微服务login接口中生成jwt token

```
 User user = userService.findById(name);
        if(BCrypt.checkpw(password,user.getPassword())){
            //创建用户令牌信息
            Map<String, Object> map = new HashMap<>();
            map.put("role","USER");
            map.put("success","SUCCESS");
            map.put("name",name);
            String token = JwtUtil.createJWT(UUID.randomUUID().toString(), JSON.toJSONString(map),null);
            //存入cookie
            Cookie cookie = new Cookie("Auth", token);
            cookie.setDomain("localhost");
            cookie.setPath("/");
            response.addCookie(cookie);
            //令牌作为参数给用户
            return token;
        }
        return "error";
```

这里使用了BCrypt.java来进行密码明文密文的对比及加密,可到官网下载 [BCrypt](http://www.mindrot.org/projects/jBCrypt/)

### Config

#### 服务端依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

#### 服务端配置

比如微服务A的配置文件 a.yml

需要将该文件重命名为 a-dev.yml,上传至git仓库(dev/tst/prod)

```yaml
spring:
  application:
    name: config
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/raynorzong/spring-cloud-config.git #git仓库地址
          username: #账号
          password: #密码
          search-paths: /blob/master	#路径
```

#### 服务端启动

启动类添加注解@EnableConfigServer即可.

#### 客户端依赖

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
```

#### 客户端配置

删除客户端原配置文件,新增bootstrap.yml引导文件

```yaml
spring:
  cloud:
    config:
      uri: http://127.0.0.1:6001
      name: goods #前缀
      profile: dev #后缀
      label: master #分支
```

正常启动即可.

#### 多服务端配置

- 服务端添加Eureka Client依赖并在启动类添加注解[@EnableEurekaClient ](/EnableEurekaClient)

```yaml
server:
  port: 6001
eureka:
  instance:
    hostname: 127.0.0.1
  client:
    register-with-eureka: false #是否将自己注册到服务中心
    fetch-registry: false #是否从Eureka中获取信息
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}
```

- 修改配置文件,删除uri,添加discovery,同样的,客户端的引导文件也需要添加EurekaClient配置

```yaml
eureka:
  instance:
    prefer-ip-adress: true
  client:
    service-url:
      defaultZone: http://127.0.0.1:7001/eureka
spring:
  cloud:
    config:
      name: goods #前缀
      profile: dev #后缀
      label: master #分支
      discovery:
        enabled: true
        service-id: config
```

### Bus

#### 简介

SpringCloud Config怎么实现配置更新,首先需要更改git上的配置文件,然后客户端.

而SpringCloud Bus就是为了能够实时更新配置文件,来解决上面的缺陷,该服务依赖RabbitMQ,且该服务一般与Config放在一个服务中.

#### 服务端依赖

```xml
		<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-bus</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-stream-binder-rabbit</artifactId>
        </dependency>
```

#### 服务端配置

```yaml
server:
  port: 6001
eureka:
  instance:
    prefer-ip-adress: true
  client:
    service-url:
      defaultZone: http://127.0.0.1:7001/eureka

spring:
  application:
    name: config
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/raynorzong/spring-cloud-config.git
          username: #
          password: #
          search-paths: /blob/master
  rabbitmq: #RabbitMQ的配置
    virtual-host: /
    username: username
    password: password
    port: 5672
    addresses: 39.97.243.43

management: #暴露触发消息总线的地址
  endpoints:
    web:
      exposure:
        include: bus-refresh
```

#### 客户端依赖

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-bus</artifactId>
            <version>2.2.1.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-stream-binder-rabbit</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

#### 客户端配置

```yaml
spring:
  cloud:
    config:
#      uri: http://127.0.0.1:6001
      name: goods #前缀
      profile: dev #后缀
      label: master #分支
      discovery:
        enabled: true
        service-id: config
  rabbitmq: #RabbitMQ的配置
    virtual-host: /
    username: username
    password: password
    port: 5672
    addresses: 39.97.243.43
```

#### 测试

启动EurekaServer和Config以及微服务A,此时若git中A的配置文件发生改变需要使其服务重新加载配置需要利用消息队列RabbitMQ告诉A服务:

浏览器发送POST请求(针对Config服务的请求)如下:

> [http://127.0.0.1:6001/actuator/bus-refresh](http://127.0.0.1:6001/actuator/bus-refresh)


返回结果204即可完成配置的动态加载.

### Sleuth

微服务请求调用链,实现日志追踪,易于整合logback/slf4j等

## SpringCloud Alibaba

### Nacos

#### 简介

Nacos可作为注册中心(Eureka/Zookeeper),配置中心(Config)

官网简介:

- 服务发现和服务健康监测
- 动态配置服务，带管理界面，支持丰富的配置维度。
- 动态 DNS 服务
- 服务及其元数据管理

#### 服务端下载部署

可以从`https://github.com/alibaba/nacos/releases`下载`nacos-server-$version.zip`包。

Windows下载解压后（.zip），直接点击`bin/startup.cmd -m standalone`就可以了。

Nacos默认是`集群模式cluster`，可以`startup.cmd`属性`MODE`为`单机模式standalone`

#### 服务端访问

[http://localhost:8848/nacos (opens new window)](http://localhost:8848/nacos),默认用户密码nacos/nacos

#### 注册中心功能

##### 客户端依赖

```xml
<properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
        <spring-cloud-alibaba.version>2.2.2.RELEASE</spring-cloud-alibaba.version>
</properties>
<dependencies>

    

    <!--引入注册中心阿里巴巴-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>

</dependencies>

<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${spring-cloud-alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

##### 客户端配置

```yaml
# Spring
spring:
  application:
    # 应用名称
    name: provider
  cloud:
    nacos:
      discovery:
        # 服务注册地址
        server-addr: 127.0.0.1:8848
server:
  port: 8081
```

##### 客户端启动

- 启动类添加注解@EnableDiscoveryClient

### 配置中心

#### 客户端依赖

```xml
<!--引入配置中心阿里巴巴-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    </dependency>
```

#### 客户端配置

1. 删除旧的application.yml,新增bootstrap.yml
2. 添加配置

```yaml
spring:
  application:
    name: provider
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml
        prefix: provider
      discovery:
        # 服务注册地址
        server-addr: 127.0.0.1:8848
  profiles:
    active: dev
```

在上面的配置中，配置了nacos config server的地址，配置的扩展名是ymal（目前仅支持ymal和properties）。注意是没有配置server.port的，sever.port的属性在nacos中配置。上面的配置是和Nacos中的`dataId` 的格式是对应的，nacos的完整格式如下：

> ![](https://g.yuque.com/gr/latex?-#card=math&code=-#crop=0&crop=0&crop=1&crop=1&id=e7J4B&originHeight=20&originWidth=16&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=).$


1. 启动nacos，登陆localhost:8848/nacos，创建一个data id:provider-dev.yaml,发布后启动客户端.

```yaml
server:
  port: 8081
```

1. 动态刷新(与Cloud Bus不同)

需要@RefreshScope注解,修改nacos中的provider-dev.yaml后重新访问下接口,即可实现

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
@RefreshScope
public class ConfigController {

    @Value("${useLocalCache:false}")
    private boolean useLocalCache;

    @RequestMapping("/get")
    public boolean get() {
        return useLocalCache;
    }
}
```

#### 服务端配置持久化

在单机模式时`nacos`使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。我们可以配置`mysql`数据库，可视化的查看数据的存储。

-  在nacos的 '\nacos\conf' 目录下,存在nacos-mysql.sql文件,导入数据库后 
-  进入 config文件夹下的 application.properties文件，增加 

```properties
# db mysql
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos-config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=123123
```

- 单机启动nacos添加配置后即可看到nacos的配置.

### 客户端整合Ribbon/OpenFeign

#### Ribbon

依赖和配置

不需要额外的依赖,只需要注册一个bean

```java
// 新增restTemplate对象注入方法，注意，此处LoadBalanced注解一定要加上，否则无法远程调用
@Bean
@LoadBalanced//org.springframework.cloud.client.loadbalancer.LoadBalanced;
public RestTemplate restTemplate() {
    return new RestTemplate();
}
```

#### Controller

```java
@Autowired
private RestTemplate restTemplate;

@GetMapping("/test")
public String get() {
    return restTemplate.getForObject("http://provider/test", String.class);
}
```

#### OpenFeign

##### 依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
    <version>2.2.7.RELEASE</version>
</dependency>
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
    <version>10.10.1</version>
</dependency>
```

##### 配置

开启Feign中Hystrix,开启httpclient(默认用java.net.HttpURLConnection)

```yaml
feign:
  httpclient:
    enabled: true # 开启httpclient
  hystrix:
    enabled: true # 开启hystrix
```

启动类添加Feign客户端注解:[@EnableFeignClients ](/EnableFeignClients)

##### 测试

```java
import com.zong.service.impl.TestServiceImpl;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "provider",fallbackFactory  = TestServiceImpl.class)
public interface TestService {

    @GetMapping("/feign")
    String hi(@RequestParam(value = "name",required = false) String name);
}
@Component
public class TestServiceImpl implements FallbackFactory<TestService> {
    @Override
    public TestService create(Throwable throwable) {
        return new TestService() {
            @Override
            public String hi(String name) {
                return "Fall_Back";
            }
        };
    }
}
    @Autowired
    private TestService testService;

    @GetMapping("/feign")
    public String hiFeign(String name){
        return testService.hi(name);
    }
```

##### 请求拦截器

在微服务应用中，通过`feign`的方式实现`http`的调用，可以通过实现`feign.RequestInterceptor`接口在`feign`执行后进行拦截，对请求头等信息进行修改。

```java
package com.zong.config;

import com.zong.utils.CacheConstants;
import com.zong.utils.ServletUtils;
import com.zong.utils.StringUtils;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component

public class FeignConfig implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest httpServletRequest = attributes.getRequest();
        if (httpServletRequest != null) {
            Map<String, String> headers = ServletUtils.getHeaders(httpServletRequest);
            // 传递用户信息请求头，防止丢失
            String userId = headers.get(CacheConstants.DETAILS_USER_ID);
            if (StringUtils.isNotEmpty(userId)) {
                requestTemplate.header(CacheConstants.DETAILS_USER_ID, userId);
            }
        }

    }
}
```
