import{_ as a,o as n,c as i,a2 as p}from"./chunks/framework.CZW044RH.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/java/SpringCloud.md","filePath":"doc/java/SpringCloud.md"}'),e={name:"doc/java/SpringCloud.md"};function l(t,s,h,r,k,c){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><h3 id="什么是微服务" tabindex="-1">什么是微服务 <a class="header-anchor" href="#什么是微服务" aria-label="Permalink to &quot;什么是微服务&quot;">​</a></h3><p>从项目发展的历程来说，从最开始的All in one到垂直应用架构，伴随着项目的复杂度的提升，为了解决可靠性、拓展性，慢慢发展出了微服务架构的模式。 垂直应用架构虽然已经对各个模块做了拆分，但是并仍然存在代码复用性差、靠可行低的问题，而微服务架构的核心便是通过业务拆分单个服务，通过网络传输进行通信，通过统一的服务治理、负载均衡等实现易于拓展、高可用低耦合的目的。对于JavaWeb开发而言，微服务就是针对某个具体单一的业务需求而实现的程序，微服务架构提倡系统拆分为各个微服务，通过各个服务的协调配合来实现业务系统。</p><h3 id="微服务的四个核心问题" tabindex="-1">微服务的四个核心问题 <a class="header-anchor" href="#微服务的四个核心问题" aria-label="Permalink to &quot;微服务的四个核心问题&quot;">​</a></h3><ol><li>服务很多，客户端该怎么访问？</li></ol><p>通过路由网关来实现：代理、路由、过滤的功能 ;实现外部访问统一入口的基础而过滤器功能则负责对请求的处理过程进行干预,是实现请求校验、服务聚合等功能的基础.</p><ol start="2"><li>服务之间通信问题？</li></ol><p>服务之间通信问题可以通过HTTP协议或者RPC协议来实现</p><ol start="3"><li>服务很多，怎么治理？</li></ol><p>其核心就是需要一个服务注册、发现的机制。</p><ol start="4"><li>服务很多，挂了怎么办？</li></ol><p>微服务的核心问题就是服务事故的解决，其解决依赖于系统的容灾机制。</p><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><h4 id="dubbo-zookeeper" tabindex="-1">Dubbo+Zookeeper <a class="header-anchor" href="#dubbo-zookeeper" aria-label="Permalink to &quot;Dubbo+Zookeeper&quot;">​</a></h4><p>相较于SpringCloud，Dubbo更像一个纯粹的实现RPC通信的架构，它往往配合Zookeeper提供的服务注册发现中心的功能，来实现半自动的微服务系统架构的搭建。 该方案缺少API网关、熔断机制，需要第三方组件或者手动实现。</p><blockquote><p>RPC和HTTP协议</p></blockquote><h4 id="springcloud-netflix" tabindex="-1">SpringCloud Netflix <a class="header-anchor" href="#springcloud-netflix" aria-label="Permalink to &quot;SpringCloud Netflix&quot;">​</a></h4><p>API网关：Zuul 通信：Feign（基于HttpClient通信，同步阻塞） 服务注册发现：Eureka 熔断机制：Hystrix</p><h4 id="springcloud-alibaba" tabindex="-1">SpringCloud Alibaba <a class="header-anchor" href="#springcloud-alibaba" aria-label="Permalink to &quot;SpringCloud Alibaba&quot;">​</a></h4><p>由于Netflix中部分组件已经停更的问题，去年秋季Alibaba成功孵化，其核心还是一站式微服务解决方案。未来可能会得到更多应用。</p><h3 id="微服务带来的负面问题" tabindex="-1">微服务带来的负面问题 <a class="header-anchor" href="#微服务带来的负面问题" aria-label="Permalink to &quot;微服务带来的负面问题&quot;">​</a></h3><p>运维压力增大；系统部署依赖；通信成本；数据一致性问题；</p><h3 id="微服务的各种组件" tabindex="-1">微服务的各种组件 <a class="header-anchor" href="#微服务的各种组件" aria-label="Permalink to &quot;微服务的各种组件&quot;">​</a></h3><ol><li>服务配置管理：Archaius、Diamond</li><li>服务注册发现：Eureka、Zookeeper、Consul</li><li>服务调用：Rest、RPC、gRPC</li><li>服务熔断器：Hystrix 、 Envoy</li><li>负载均衡：Ribbon、Nginx</li><li>服务接口调用（客户端调用服务简化工具）：Feign</li><li>消息队列：Kafka、RabbtiMQ、ActiveMQ</li><li>服务配置中心管理：SpringCloudConfig、Chef</li><li>服务路由（API网关）：Zuul</li><li>服务监控：Zabbix、Nagios、Metrics、Specataor</li><li>全链路追踪：Zipkin、Brave、Dapper</li><li>服务部署：Docker、OpenStack、Kubernetes</li><li>数据流操作开发包：SpringCloudStream</li><li>事件消息总线：SpringCloudBus</li></ol><h3 id="微服务的下一代发展" tabindex="-1">微服务的下一代发展 <a class="header-anchor" href="#微服务的下一代发展" aria-label="Permalink to &quot;微服务的下一代发展&quot;">​</a></h3><p>服务网格ServiceMesh，产品比如Istio</p><h2 id="dubbo" tabindex="-1">Dubbo <a class="header-anchor" href="#dubbo" aria-label="Permalink to &quot;Dubbo&quot;">​</a></h2><p>之前已经学习使用了Dubbo+Zookeeper，其版本相较于目前更低， <a href="https://blog.csdn.net/ZzzPaul/article/details/82343603" target="_blank" rel="noreferrer">Dubbo2.6</a> 不过最新版的2.7.5在具体的使用上区别不大，下面只对有变化的地方：</p><h3 id="依赖和配置" tabindex="-1">依赖和配置 <a class="header-anchor" href="#依赖和配置" aria-label="Permalink to &quot;依赖和配置&quot;">​</a></h3><p>新增了curator-recipes依赖，同时需要排除log4j解决依赖冲突。其余除了@Service和@Reference包路径变化之外，仍然可以使用。下面例子使用了Zookeeper，其相关配置安装参考如下：<a href="https://blog.csdn.net/ZzzPaul/article/details/82315287" target="_blank" rel="noreferrer">ZK和Dubbo Admin</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> 	&lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.apache.dubbo&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;dubbo-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;2.7.5&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.apache.curator&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;curator-recipes&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;2.8.0&lt;/version&gt;</span></span>
<span class="line"><span>            &lt;exclusions&gt;</span></span>
<span class="line"><span>                &lt;exclusion&gt;</span></span>
<span class="line"><span>                        &lt;groupId&gt;log4j&lt;/groupId&gt;</span></span>
<span class="line"><span>                        &lt;artifactId&gt;log4j&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;/exclusion&gt;</span></span>
<span class="line"><span>            &lt;/exclusions&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;com.101tec&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;zkclient&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;0.11&lt;/version&gt;</span></span>
<span class="line"><span>            &lt;exclusions&gt;</span></span>
<span class="line"><span>                &lt;exclusion&gt;</span></span>
<span class="line"><span>                    &lt;groupId&gt;log4j&lt;/groupId&gt;</span></span>
<span class="line"><span>                    &lt;artifactId&gt;log4j&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;/exclusion&gt;</span></span>
<span class="line"><span>            &lt;/exclusions&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><h4 id="provider" tabindex="-1">provider <a class="header-anchor" href="#provider" aria-label="Permalink to &quot;provider&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Service version</span></span>
<span class="line"><span>demo.service.version = 1.0.0</span></span>
<span class="line"><span># Base packages to scan Dubbo Components (e.g @Service , @Reference)</span></span>
<span class="line"><span>dubbo.scan.basePackages  = com.demo.provider.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Dubbo Config properties</span></span>
<span class="line"><span>## ApplicationConfig Bean</span></span>
<span class="line"><span>#提供发应用名称,用于计算依赖关系</span></span>
<span class="line"><span>dubbo.application.id = my-dubbo-provider</span></span>
<span class="line"><span>dubbo.application.name = my-dubbo-provider</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## ProtocolConfig Bean</span></span>
<span class="line"><span>#使用dubbo协议,在12345端口暴露服务</span></span>
<span class="line"><span>dubbo.protocol.id = dubbo</span></span>
<span class="line"><span>dubbo.protocol.name = dubbo</span></span>
<span class="line"><span>dubbo.protocol.port = 12345</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## RegistryConfig Bean</span></span>
<span class="line"><span>#使用zookeeper注册中心暴露服务地址</span></span>
<span class="line"><span>dubbo.registry.id = my-registry</span></span>
<span class="line"><span>dubbo.registry.address = zookeeper://127.0.0.1:2181</span></span>
<span class="line"><span>#dubbo.registry.address = N/A</span></span>
<span class="line"><span>@org.apache.dubbo.config.annotation.Service(</span></span>
<span class="line"><span>        version = &quot;\${demo.service.version}&quot;,</span></span>
<span class="line"><span>        application = &quot;\${dubbo.application.id}&quot;,</span></span>
<span class="line"><span>        protocol = &quot;\${dubbo.protocol.id}&quot;,</span></span>
<span class="line"><span>        registry = &quot;\${dubbo.registry.id}&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private UserMapper userMapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public List&lt;User&gt; userList() {</span></span>
<span class="line"><span>        QueryWrapper&lt;User&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>        return userMapper.selectList(queryWrapper);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="consumer" tabindex="-1">consumer <a class="header-anchor" href="#consumer" aria-label="Permalink to &quot;consumer&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Dubbo Config properties</span></span>
<span class="line"><span>## ApplicationConfig Bean消费方应用名称,用于计算依赖关系,不是匹配条件,不能和提供方名称一样</span></span>
<span class="line"><span>dubbo.application.id = my-dubbo-consumer</span></span>
<span class="line"><span>dubbo.application.name = my-dubbo-consumer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dubbo.service.version = 1.0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dubbo.registry.id = my-registry</span></span>
<span class="line"><span>dubbo.registry.address = zookeeper://127.0.0.1:2181</span></span>
<span class="line"><span>dubbo.registry.check=false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## ProtocolConfig Bean</span></span>
<span class="line"><span>dubbo.protocol.id = dubbo</span></span>
<span class="line"><span>dubbo.protocol.name = dubbo</span></span>
<span class="line"><span>dubbo.protocol.port = 12345</span></span>
<span class="line"><span>@RestController</span></span>
<span class="line"><span>public class IndexController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Reference(version = &quot;1.0.0&quot;)</span></span>
<span class="line"><span>    private UserService userService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @GetMapping(&quot;/users&quot;)</span></span>
<span class="line"><span>    public List&lt;User&gt; get(){</span></span>
<span class="line"><span>        return userService.userList();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="springcloud" tabindex="-1">SpringCloud <a class="header-anchor" href="#springcloud" aria-label="Permalink to &quot;SpringCloud&quot;">​</a></h2><p>之后的SpringCloud将会以Netflix为主，版本为Hoxton.SR3，SpringBoot版本为2.2.4.RELEASE，这两者的版本需要相互配合： <code>Hoxton 2.2.x Greenwich 2.1.x Finchley 2.0.x Edgware 1.5.x Dalston 1.5.x</code> Spring Cloud的子项目，大致可分成两类，一类是对现有成熟框架&quot;Spring Boot化&quot;的封装和抽象，也是数量最多的项目； 第二类是开发了一部分分布式系统的基础设施的实现，如Spring Cloud Stream扮演的就是kafka, ActiveMQ这样的角色。</p><h3 id="eureka" tabindex="-1">Eureka <a class="header-anchor" href="#eureka" aria-label="Permalink to &quot;Eureka&quot;">​</a></h3><p>在微服务架构中往往会有一个注册中心，每个微服务都会向注册中心去注册自己的地址及端口信息， 注册中心维护着服务名称与服务实例的对应关系。每个微服务都会定时从注册中心获取服务列表，同时汇报自己的运行情况，这样当有的服务需要调用其他服务时， 就可以从自己获取到的服务列表中获取实例地址进行调用，Eureka实现了这套服务注册与发现机制。</p><h3 id="eureka和zookeeper" tabindex="-1">Eureka和Zookeeper <a class="header-anchor" href="#eureka和zookeeper" aria-label="Permalink to &quot;Eureka和Zookeeper&quot;">​</a></h3><p>分布式结构的CAP定理：指的是在一个分布式系统中，Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），最多只能同时三个特性中的两个，三者不可兼得。</p><blockquote><p>RDBMS==&gt;（MySql,Oracle,SqlServer等关系型数据库）遵循的原则是：ACID原则（A：原子性。C：一致性。I：独立性。D：持久性。）。 NoSql==&gt; （redis,Mogodb等非关系型数据库）遵循的原则是：CAP原则</p></blockquote><blockquote></blockquote><p>Zookeeper是CP放弃A，zookeeper分布式集群是使用主从模型实现的，在一个时间点上，只有一个leader真正的对外提供服务。 其他的slave都会实时备份leader中的数据，当leader宕机，则slave选举出新的leader对外提供服务。 eureka是AP放弃C，eureka分布集群是平等模型（无主模型），所有的节点都是平等的，客户端访问任意节点都可以提供实时的服务响应。 如果某节点发生宕机等故障，接收到的请求会转交给其他的节点。无主模型，每个节点的数据可能不实时一致， 节点需要通过网络通讯从其他节点获取数据，并实现数据的一致，可能有网络延迟或者网络故障或者通讯频率问题。</p><p>Eureka Server和Client</p><p>Eureka是BS架构，相比于Zookeeper本地运行客户端，需要手动实现Eureka注册中心。 Eureka Cilent是一个Java客户端，类似于Zookeeper的zk-client，都是用于简化和注册中心的交互，它内置了使用轮询算法的负载均衡器，在应用启动后将会向Eureka Server发送心跳（默认30秒）。如果Server在多个心跳周期内没有接收到某个客户端的心跳（90秒），将会移除该节点</p><h4 id="依赖和配置-1" tabindex="-1">依赖和配置 <a class="header-anchor" href="#依赖和配置-1" aria-label="Permalink to &quot;依赖和配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-server&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span> 	&lt;dependencyManagement&gt;</span></span>
<span class="line"><span>        &lt;dependencies&gt;</span></span>
<span class="line"><span>            &lt;dependency&gt;</span></span>
<span class="line"><span>                &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>                &lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;version&gt;\${spring-cloud.version}&lt;/version&gt;</span></span>
<span class="line"><span>                &lt;type&gt;pom&lt;/type&gt;</span></span>
<span class="line"><span>                &lt;scope&gt;import&lt;/scope&gt;</span></span>
<span class="line"><span>            &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;/dependencies&gt;</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8001</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: eureka-server</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  instance:</span></span>
<span class="line"><span>    hostname: localhost #server的实例名称</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    fetch-registry: false #是否向注册中心注册自己</span></span>
<span class="line"><span>    register-with-eureka: false #false表示自己是注册中心</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://\${eureka.instance.hostname}:\${server.port}/eureka/ # 监控页面</span></span></code></pre></div><p>在启动类上添加注解：@EnableEurekaServer，启动后访问<a href="http://localhost:8001/%E5%8D%B3%E5%8F%AF%E3%80%82" target="_blank" rel="noreferrer">http://localhost:8001/即可。</a></p><h4 id="添加客户端" tabindex="-1">添加客户端 <a class="header-anchor" href="#添加客户端" aria-label="Permalink to &quot;添加客户端&quot;">​</a></h4><p>新建模块 client-eureka</p><h4 id="依赖和配置-2" tabindex="-1">依赖和配置 <a class="header-anchor" href="#依赖和配置-2" aria-label="Permalink to &quot;依赖和配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>&lt;dependencyManagement&gt;</span></span>
<span class="line"><span>        &lt;dependencies&gt;</span></span>
<span class="line"><span>            &lt;dependency&gt;</span></span>
<span class="line"><span>                &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>                &lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;version&gt;\${spring-cloud.version}&lt;/version&gt;</span></span>
<span class="line"><span>                &lt;type&gt;pom&lt;/type&gt;</span></span>
<span class="line"><span>                &lt;scope&gt;import&lt;/scope&gt;</span></span>
<span class="line"><span>            &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;/dependencies&gt;</span></span>
<span class="line"><span>    &lt;/dependencyManagement&gt;</span></span>
<span class="line"><span># 指定运行端口</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8002</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 指定服务名称</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: eureka-client</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    # 注册到Eureka的注册中心</span></span>
<span class="line"><span>    register-with-eureka: true</span></span>
<span class="line"><span>    # 获取注册实例列表</span></span>
<span class="line"><span>    fetch-registry: true</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      # 配置注册中心地址</span></span>
<span class="line"><span>      defaultZone: http://localhost:8001/eureka</span></span></code></pre></div><p>启动类添加注解@EnableEurekaClient即可，</p><blockquote><p>@EnableDiscoveryClient和@EnableEurekaClient共同点就是：都是能够让注册中心能够发现，扫描到改服务。</p></blockquote><blockquote><p>不同点：@EnableEurekaClient只适用于Eureka作为注册中心，@EnableDiscoveryClient 可以是其他注册中心。</p></blockquote><p>再次访问</p><blockquote><p>Application AMIs Availability Zones Status EUREKA-CLIENT n/a (1) (1) UP (1) - NoteBook:eureka-client:8002</p></blockquote><h4 id="搭建eureka注册中心集群" tabindex="-1">搭建Eureka注册中心集群 <a class="header-anchor" href="#搭建eureka注册中心集群" aria-label="Permalink to &quot;搭建Eureka注册中心集群&quot;">​</a></h4><blockquote><p>由于所有服务都会注册到注册中心去，服务之间的调用都是通过从注册中心获取的服务列表来调用，注册中心一旦宕机，所有服务调用都会出现问题。所以我们需要多个注册中心组成集群来提供服务，下面将搭建一个双节点的注册中心集群。</p></blockquote><h5 id="搭建两个注册中心" tabindex="-1">搭建两个注册中心 <a class="header-anchor" href="#搭建两个注册中心" aria-label="Permalink to &quot;搭建两个注册中心&quot;">​</a></h5><p>首先给server-eureka添加两个配置文件 application-replica1.yml和application-replica2.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8002</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: eureka-server1</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  instance:</span></span>
<span class="line"><span>    hostname: replica1 #server的实例名称</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    fetch-registry: true #是否向注册中心注册自己</span></span>
<span class="line"><span>    register-with-eureka: true #false表示自己是注册中心</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://\${eureka.instance.hostname}:8003/eureka/ # 监控页面</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8003</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: eureka-server2</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  instance:</span></span>
<span class="line"><span>    hostname: replica2 #server的实例名称</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    fetch-registry: true #是否向注册中心注册自己</span></span>
<span class="line"><span>    register-with-eureka: true #false表示自己是注册中心</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://\${eureka.instance.hostname}:8002/eureka/ # 监控页面</span></span></code></pre></div><p>通过两个server相互注册，搭建了注册中心的双节点集群，由于defaultZone使用了域名，所以还需在本机的host文件中配置一下。 127.0.0.1 replica1 127.0.0.1 replica2</p><h5 id="分别运行两个注册中心" tabindex="-1">分别运行两个注册中心 <a class="header-anchor" href="#分别运行两个注册中心" aria-label="Permalink to &quot;分别运行两个注册中心&quot;">​</a></h5><p>在idea的运行配置中，将Active profiles 分别修改为replica2和replica1，然后两次启动该组件。访问任一<a href="http://localhost" target="_blank" rel="noreferrer">http://localhost</a>: 8002/均可以看到</p><p>EUREKA-SERVER1 n/a (1) (1) UP (1) - NoteBook:eureka-server1:8002 EUREKA-SERVER2 n/a (1) (1) UP (1) - NoteBook: eureka-server2:8003</p><h5 id="client注册到两个服务中心" tabindex="-1">Client注册到两个服务中心 <a class="header-anchor" href="#client注册到两个服务中心" aria-label="Permalink to &quot;Client注册到两个服务中心&quot;">​</a></h5><blockquote></blockquote><p>defaultZone: <a href="http://replica1:8002/eureka/,http://replica2:8003/eureka/" target="_blank" rel="noreferrer">http://replica1:8002/eureka/,http://replica2:8003/eureka/</a></p><h4 id="其它常用配置" tabindex="-1">其它常用配置 <a class="header-anchor" href="#其它常用配置" aria-label="Permalink to &quot;其它常用配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>eureka:</span></span>
<span class="line"><span>  client: #eureka客户端配置</span></span>
<span class="line"><span>    register-with-eureka: true #是否将自己注册到eureka服务端上去</span></span>
<span class="line"><span>    fetch-registry: true #是否获取eureka服务端上注册的服务列表</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://localhost:8001/eureka/ # 指定注册中心地址</span></span>
<span class="line"><span>    enabled: true # 启用eureka客户端</span></span>
<span class="line"><span>    registry-fetch-interval-seconds: 30 #定义去eureka服务端获取服务列表的时间间隔</span></span>
<span class="line"><span>  instance: #eureka客户端实例配置</span></span>
<span class="line"><span>    lease-renewal-interval-in-seconds: 30 #定义服务多久去注册中心续约</span></span>
<span class="line"><span>    lease-expiration-duration-in-seconds: 90 #定义服务多久不去续约认为服务失效</span></span>
<span class="line"><span>    metadata-map:</span></span>
<span class="line"><span>      zone: guangdong #所在区域</span></span>
<span class="line"><span>    hostname: localhost #服务主机名称</span></span>
<span class="line"><span>    prefer-ip-address: false #是否优先使用ip来作为主机名</span></span>
<span class="line"><span>  server: #eureka服务端配置</span></span>
<span class="line"><span>    enable-self-preservation: false #关闭eureka服务端的保护机制</span></span></code></pre></div><h4 id="添加认证" tabindex="-1">添加认证 <a class="header-anchor" href="#添加认证" aria-label="Permalink to &quot;添加认证&quot;">​</a></h4><p>需要spring security</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: server-security-eureka</span></span>
<span class="line"><span>  security:</span></span>
<span class="line"><span>    user:</span></span>
<span class="line"><span>      # 配置spring security登录用户名和密码</span></span>
<span class="line"><span>      name: root</span></span>
<span class="line"><span>      password: 123456</span></span></code></pre></div><p>WebConfig</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@EnableWebSecurity</span></span>
<span class="line"><span>public class WebConfig extends WebSecurityConfigurerAdapter {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void configure(HttpSecurity http) throws Exception {</span></span>
<span class="line"><span>        http.csrf().ignoringAntMatchers(&quot;/eureka/**&quot;);</span></span>
<span class="line"><span>        super.configure(http);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对Client而言需要配置中添加用户名密码信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> http://\${username}:\${password}@\${hostname}:\${port}/eureka/</span></span></code></pre></div><h3 id="ribbon" tabindex="-1">Ribbon <a class="header-anchor" href="#ribbon" aria-label="Permalink to &quot;Ribbon&quot;">​</a></h3><p>在微服务架构中，很多服务都会部署多个，其他服务去调用该服务的时候，如何保证负载均衡是个不得不去考虑的问题。负载均衡可以增加系统的可用性和扩展性，当我们使用RestTemplate来调用其他服务时，Ribbon可以很方便的实现负载均衡功能。</p><h4 id="resttemplate" tabindex="-1">RestTemplate <a class="header-anchor" href="#resttemplate" aria-label="Permalink to &quot;RestTemplate&quot;">​</a></h4><blockquote><p>RestTemplate是一个HTTP客户端，使用它我们可以方便的调用HTTP接口，支持GET、POST、PUT、DELETE等方法。</p></blockquote><p>在前面的文章中也有RestTemplate的介绍，注入该实例就可以通过HTTP协议完成远程Restful接口调用。</p><h4 id="user-service" tabindex="-1">User-Service <a class="header-anchor" href="#user-service" aria-label="Permalink to &quot;User-Service&quot;">​</a></h4><p>已有接口如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Resource</span></span>
<span class="line"><span>    private IUserService userService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @GetMapping(&quot;/&quot;)</span></span>
<span class="line"><span>    public List&lt;User&gt; userList(){</span></span>
<span class="line"><span>        return userService.list();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @GetMapping(&quot;/{id}&quot;)</span></span>
<span class="line"><span>    public User userOne(@PathVariable Long id ){</span></span>
<span class="line"><span>        return userService.getById(id);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>在没有引入ribbon的时候只需要注入RestTemplate便可以完成远程接口调用。 并且注册服务到Eureka-Server中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    url: jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=utf8&amp;serverTimezone=UTC</span></span>
<span class="line"><span>    username: root</span></span>
<span class="line"><span>    password: 123456</span></span>
<span class="line"><span>    driver-class-name: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: user-service</span></span>
<span class="line"><span>mybatis-plus:</span></span>
<span class="line"><span>  mapper-locations: classpath:mapper/*.xml</span></span>
<span class="line"><span>  type-aliases-package: com.cloud.demo.entity</span></span>
<span class="line"><span>mybatis:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 指定运行端口</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8010</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    # 注册到Eureka的注册中心</span></span>
<span class="line"><span>    register-with-eureka: true</span></span>
<span class="line"><span>    # 获取注册实例列表</span></span>
<span class="line"><span>    fetch-registry: true</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      # 配置注册中心地址</span></span>
<span class="line"><span>      defaultZone: http://root:123456@localhost:8005/eureka</span></span></code></pre></div><h4 id="user-ribbon-service" tabindex="-1">User-Ribbon-Service <a class="header-anchor" href="#user-ribbon-service" aria-label="Permalink to &quot;User-Ribbon-Service&quot;">​</a></h4><h4 id="依赖和配置-3" tabindex="-1">依赖和配置 <a class="header-anchor" href="#依赖和配置-3" aria-label="Permalink to &quot;依赖和配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-ribbon&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8011</span></span>
<span class="line"><span># 指定服务名称</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: user-service-ribbon-client</span></span>
<span class="line"><span></span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    # 注册到Eureka的注册中心</span></span>
<span class="line"><span>    register-with-eureka: true</span></span>
<span class="line"><span>    # 获取注册实例列表</span></span>
<span class="line"><span>    fetch-registry: true</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      # 配置注册中心地址</span></span>
<span class="line"><span>      defaultZone: http://root:123456@localhost:8005/eureka</span></span></code></pre></div><p>对RestTemplate配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Bean</span></span>
<span class="line"><span>    @LoadBalanced//负载均衡</span></span>
<span class="line"><span>    public RestTemplate restTemplate() {</span></span>
<span class="line"><span>        return new RestTemplate();</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>测试</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private RestTemplate restTemplate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @GetMapping(&quot;/user/{id}&quot;)</span></span>
<span class="line"><span>    public User userList(@PathVariable Long id ){</span></span>
<span class="line"><span>       User user = restTemplate.getForObject(&quot;http://user-service/user/&quot;+id,User.class);</span></span>
<span class="line"><span>       return user;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h4 id="ribbon常用配置" tabindex="-1">Ribbon常用配置 <a class="header-anchor" href="#ribbon常用配置" aria-label="Permalink to &quot;Ribbon常用配置&quot;">​</a></h4><h5 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ribbon:</span></span>
<span class="line"><span>  ConnectTimeout: 1000 #服务请求连接超时时间（毫秒）</span></span>
<span class="line"><span>  ReadTimeout: 3000 #服务请求处理超时时间（毫秒）</span></span>
<span class="line"><span>  OkToRetryOnAllOperations: true #对超时请求启用重试机制</span></span>
<span class="line"><span>  MaxAutoRetriesNextServer: 1 #切换重试实例的最大个数</span></span>
<span class="line"><span>  MaxAutoRetries: 1 # 切换实例后重试最大次数</span></span>
<span class="line"><span>  NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #修改负载均衡算法</span></span></code></pre></div><h5 id="指定服务进行配置" tabindex="-1">指定服务进行配置 <a class="header-anchor" href="#指定服务进行配置" aria-label="Permalink to &quot;指定服务进行配置&quot;">​</a></h5><blockquote><p>调用user-service的单独配置,至于这个怎么使用,会在后面.</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>user-service:</span></span>
<span class="line"><span>  ribbon:</span></span>
<span class="line"><span>    ConnectTimeout: 1000 #服务请求连接超时时间（毫秒）</span></span>
<span class="line"><span>    ReadTimeout: 3000 #服务请求处理超时时间（毫秒）</span></span>
<span class="line"><span>    OkToRetryOnAllOperations: true #对超时请求启用重试机制</span></span>
<span class="line"><span>    MaxAutoRetriesNextServer: 1 #切换重试实例的最大个数</span></span>
<span class="line"><span>    MaxAutoRetries: 1 # 切换实例后重试最大次数</span></span>
<span class="line"><span>    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #修改负载均衡算法</span></span></code></pre></div><h3 id="feign" tabindex="-1">Feign <a class="header-anchor" href="#feign" aria-label="Permalink to &quot;Feign&quot;">​</a></h3><p>Feign可以理解为社区版的Ribbon和Hystrix的集合，它简化了使用Ribbon所需要的RestTemplate的操作， 更符合基于接口的开发模式，通过内部进一步的封装，可以通过注解的方式完成Rest接口调用和负载均衡的功能， 同时它也提供了基于Hystrix的服务容错保护功能</p><h4 id="依赖和配置-4" tabindex="-1">依赖和配置 <a class="header-anchor" href="#依赖和配置-4" aria-label="Permalink to &quot;依赖和配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-openfeign&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><p>配置基本不变，核心还是注册EurekaCilent</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8014</span></span>
<span class="line"><span></span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: feign-client</span></span>
<span class="line"><span></span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    register-with-eureka: true</span></span>
<span class="line"><span>    fetch-registry: true</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://root:123456@localhost:8005/eureka</span></span></code></pre></div><h4 id="feignclient" tabindex="-1">FeignClient <a class="header-anchor" href="#feignclient" aria-label="Permalink to &quot;FeignClient&quot;">​</a></h4><p>需要声明一个接口FeignClientService</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@FeignClient(value = &quot;USER-SERVICE&quot;)</span></span>
<span class="line"><span>public interface UserFeignService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @GetMapping(&quot;/user/&quot;)//路径要为user-service中的全路径,否则feign.FeignException$NotFound</span></span>
<span class="line"><span>    public List&lt;User&gt; userList();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>除了value属性以外,也包含fallback = UserFallbackService.class等, 该属性等同于Hystrix的服务降级实现类.</p><h4 id="hystrix" tabindex="-1">Hystrix <a class="header-anchor" href="#hystrix" aria-label="Permalink to &quot;Hystrix&quot;">​</a></h4><ol><li></li></ol><p>声明新类实现UserFeignService,实现接口中的方法,并且为该类添加[[@Component注解,修改FeignClientService接口的@FeignClient(value ]( /Component注解,修改FeignClientService接口的@FeignClient(value ) ]( /Component注解,修改FeignClientService接口的[@FeignClient(value ](/FeignClient(value ) ) = &quot;USER-SERVICE&quot;) 为[[@FeignClient(value ](/FeignClient(value ) ](/FeignClient(value ) = &quot;USER-SERVICE&quot;,fallback = UserFallbackService.class) 即可完成服务熔断的调用,不过该方法无法处理异常</p><ol start="2"><li>可以使用另一种方式: 实现类implements FallbackFactory,[[@FeignClient(value ](/FeignClient(value ) ](/FeignClient( value ) = &quot;USER-SERVICE&quot;,fallbackFactory = UserFallbackService.class)</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>public class TestServiceHystrix implements FallbackFactory&lt;TestService&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public TestService create(Throwable throwable) {</span></span>
<span class="line"><span>        return new TestService() {</span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public List&lt;User&gt; userList(){</span></span>
<span class="line"><span>	    //...</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="常见配置" tabindex="-1">常见配置 <a class="header-anchor" href="#常见配置" aria-label="Permalink to &quot;常见配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#feign接口开启hystrix</span></span>
<span class="line"><span>feign.hystrix.enabled=true</span></span>
<span class="line"><span>#是否允许超时，默认、建议true</span></span>
<span class="line"><span>hystrix.command.default.execution.timeout.enabled=true</span></span>
<span class="line"><span>#超时时间，“hystrix.command.default.execution.timeout.enabled=true”时会生效</span></span>
<span class="line"><span>hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds=5000</span></span>
<span class="line"><span>#超时是否中断，默认、建议为true</span></span>
<span class="line"><span>hystrix.command.default.execution.isolation.thread.interruptOnTimeout=true</span></span>
<span class="line"><span>#取消是否中断，默认、建议为false</span></span>
<span class="line"><span>hystrix.command.default.execution.isolation.thread.interruptOnCancel=false</span></span>
<span class="line"><span>#最大并发请求，默认10，建议根据实际情况设定此值</span></span>
<span class="line"><span>hystrix.command.default.execution.isolation.semaphore.maxConcurrentRequests=100</span></span>
<span class="line"><span>#最大并发降级请求处理上线，默认10，建议根据实际情况设此值，降级请求并发量高于此值时，抛出异常</span></span>
<span class="line"><span>hystrix.command.default.fallback.isolation.semaphore.maxConcurrentRequests=20</span></span>
<span class="line"><span>#此属性确定断路器是否用于跟踪健康状况，以及当断路器打开的时候是否用于短路请求(使请求快速失败进入降级逻辑)。</span></span>
<span class="line"><span>#默认、建议true</span></span>
<span class="line"><span>hystrix.command.default.circuitBreaker.enabled=true</span></span>
<span class="line"><span>#断路器请求量阈值，默认20，建议默认，部分接口如果不能容忍此值可单独配置</span></span>
<span class="line"><span>#例如，如果值是20，那么如果在滑动窗口中只接收到19个请求(比如一个10秒的窗口)，</span></span>
<span class="line"><span># 即使所有19个请求都失败了，断路器也不会打开</span></span>
<span class="line"><span>hystrix.command.default.circuitBreaker.requestVolumeThreshold=10</span></span>
<span class="line"><span>#隔离策略，默认、建议THREAD</span></span>
<span class="line"><span>hystrix.command.default.execution.isolation.strategy=THREAD</span></span>
<span class="line"><span>#断路器等待窗口时间，此属性设置断路器打开后拒绝请求的时间量，</span></span>
<span class="line"><span># 每隔一段时间( sleepWindowInMilliseconds ，单位是毫秒)允许再次尝试(也就是放行一个请求)确定是否应该关闭断路器。</span></span>
<span class="line"><span>#默认5000，建议保持默认</span></span>
<span class="line"><span>hystrix.command.default.circuitBreaker.sleepWindowInMilliseconds=5000</span></span>
<span class="line"><span>#断路器错误百分比阈值，设置一个错误百分比，当请求错误率超过设定值，断路器就会打开。</span></span>
<span class="line"><span>#默认50，建议保持默认</span></span>
<span class="line"><span>hystrix.command.default.circuitBreaker.errorThresholdPercentage=50</span></span></code></pre></div><h3 id="hystrix-1" tabindex="-1">Hystrix <a class="header-anchor" href="#hystrix-1" aria-label="Permalink to &quot;Hystrix&quot;">​</a></h3><blockquote></blockquote><p>在微服务架构中，服务与服务之间通过远程调用的方式进行通信，一旦某个被调用的服务发生了故障，其依赖服务也会发生故障，此时就会发生故障的蔓延，最终导致系统瘫痪。Hystrix实现了断路器模式，当某个服务发生故障时，通过断路器的监控，给调用方返回一个错误响应，而不是长时间的等待，这样就不会使得调用方由于长时间得不到响应而占用线程，从而防止故障的蔓延。Hystrix具备服务降级、服务熔断、线程隔离、请求缓存、请求合并及服务监控等强大功能。</p><h4 id="执行顺序" tabindex="-1">执行顺序 <a class="header-anchor" href="#执行顺序" aria-label="Permalink to &quot;执行顺序&quot;">​</a></h4><h4 id="服务熔断" tabindex="-1">服务熔断 <a class="header-anchor" href="#服务熔断" aria-label="Permalink to &quot;服务熔断&quot;">​</a></h4><h5 id="依赖和配置-5" tabindex="-1">依赖和配置 <a class="header-anchor" href="#依赖和配置-5" aria-label="Permalink to &quot;依赖和配置&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-hystrix&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8012</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: hystrix-service</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    register-with-eureka: true</span></span>
<span class="line"><span>    fetch-registry: true</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://root:123456@localhost:8005/eureka</span></span></code></pre></div><p>开启8005端口的Eureka Server和8010端口的服务提供者User-Service, 后者提供Restful接口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @GetMapping(&quot;/{id}&quot;)</span></span>
<span class="line"><span>    public User userOne(@PathVariable Long id ){</span></span>
<span class="line"><span>        return userService.getById(id);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>在hystrix-service启动类上添加注解: @EnableCircuitBreaker用来表示开启熔断器</p><h5 id="hystrixcommand" tabindex="-1">HystrixCommand <a class="header-anchor" href="#hystrixcommand" aria-label="Permalink to &quot;HystrixCommand&quot;">​</a></h5><p>在注册完RestTemplate的基础上,添加接口:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @GetMapping(&quot;/hystrix/user/{id}&quot;)</span></span>
<span class="line"><span>    @HystrixCommand(fallbackMethod = &quot;fallbackMethod1&quot;)//服务降级后调用下面的方法,其返回值应当一致</span></span>
<span class="line"><span>    public User getUser(@PathVariable Long id){</span></span>
<span class="line"><span>        return restTemplate.getForObject(&quot;http://localhost:8010/user/&quot;+id,User.class);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User fallbackMethod1(@PathVariable Long id){</span></span>
<span class="line"><span>        System.out.println(&quot;服务调用失败&quot;);</span></span>
<span class="line"><span>        return new User();</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>在没有getUser出现异常的情况下,Hystrix会根据指定服务降级处理方法完成调用,避免出现长时间等待等问题.</p><p>@HystrixCommand的属性</p><blockquote><p>fallbackMethod：指定服务降级处理方法； ignoreExceptions：忽略某些异常，不发生服务降级； commandKey：命令名称，用于区分不同的命令； groupKey：分组名称，Hystrix会根据不同的分组来统计命令的告警及仪表盘信息； threadPoolKey：线程池名称，用于划分线程池。</p></blockquote><h5 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h5><ol><li>停掉User-Service或者更改为错误的请求路径</li></ol><p>GET: <code>http://localhost:8012/hystrix/user/{1}</code></p><blockquote><p>服务调用失败</p></blockquote><ol><li>添加属性 ignoreExceptions = NullPointerException.class</li></ol><p>在其接口中throw new NullPointerException(); 再测试后服务未降级</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> @GetMapping(&quot;/hystrix/exception/{id}&quot;)</span></span>
<span class="line"><span>    @HystrixCommand(fallbackMethod = &quot;fallbackMethod1&quot;,</span></span>
<span class="line"><span>            ignoreExceptions = NullPointerException.class,</span></span>
<span class="line"><span>            commandKey = &quot;getUserCommand&quot;,</span></span>
<span class="line"><span>            groupKey = &quot;getUserGroup&quot;,</span></span>
<span class="line"><span>            threadPoolKey = &quot;getUserThreadPool&quot;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    public User exceptionTest1(@PathVariable Long id){</span></span>
<span class="line"><span>        if (id == 1) {</span></span>
<span class="line"><span>            throw new IndexOutOfBoundsException();</span></span>
<span class="line"><span>        } else if (id == 2) {</span></span>
<span class="line"><span>            throw new NullPointerException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return new User();</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h5 id="请求缓存" tabindex="-1">请求缓存 <a class="header-anchor" href="#请求缓存" aria-label="Permalink to &quot;请求缓存&quot;">​</a></h5><p>Hystrix有两种方式来应对高并发场景，分别是请求缓存与请求合并 前者鉴于其缺点:</p><ul><li>是一个本地缓存。在集群情况下缓存是不能同步的。</li><li>不支持第三方缓存容器。Redis，memcache 不支持的。 所以往往使用SpringCache来替代.</li></ul><blockquote><p>@CacheResult：开启缓存，默认所有参数作为缓存的key，cacheKeyMethod可以通过返回String类型的方法指定key； @CacheKey：指定缓存的key，可以指定参数或指定参数中的属性值为缓存key，cacheKeyMethod还可以通过返回String类型的方法指定； @CacheRemove：移除缓存，需要指定commandKey。</p></blockquote><p>在缓存使用过程中，我们需要在每次使用缓存的请求前后对HystrixRequestContext进行初始化和关闭,否则会报异常:</p><blockquote><p>Request caching is not available. Maybe you need to initialize the HystrixRequestContext?</p></blockquote><p>所以需要声明一个Filter,在doFilter中开启和关闭HystrixRequestContext</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@WebFilter(urlPatterns = &quot;/*&quot;,asyncSupported = true)</span></span>
<span class="line"><span>public class HystrixRequestContextFilter implements Filter {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {</span></span>
<span class="line"><span>        HystrixRequestContext context = HystrixRequestContext.initializeContext();</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            filterChain.doFilter(servletRequest,servletResponse);</span></span>
<span class="line"><span>        }finally {</span></span>
<span class="line"><span>            context.close();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="使用缓存" tabindex="-1">使用缓存 <a class="header-anchor" href="#使用缓存" aria-label="Permalink to &quot;使用缓存&quot;">​</a></h5><p>通过 CacheResult(cacheKeyMethod ) ](/CacheResult(cacheKeyMethod ) = &quot;getCacheKey&quot;) ( 其属性cacheKeyMethod需要手动实现一个方法:getCacheKey作为缓存的key,比如下面可以用查询主键作为cacheKey)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @GetMapping(&quot;/hystrix/user/{id}&quot;)</span></span>
<span class="line"><span>    @CacheResult(cacheKeyMethod = &quot;getCacheKey&quot;)</span></span>
<span class="line"><span>    @HystrixCommand(fallbackMethod = &quot;fallbackMethod1&quot;)</span></span>
<span class="line"><span>    public User getUser(@PathVariable Long id){</span></span>
<span class="line"><span>        return restTemplate.getForObject(&quot;http://localhost:8010/user/&quot;+id,User.class);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getCacheKey(Long id) {//生成缓存key的方法</span></span>
<span class="line"><span>        return String.valueOf(id);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>连续两次使用相同的id请求该接口,可以发现user-service中只打印了一次请求日志.</p><h5 id="缓存删除" tabindex="-1">缓存删除 <a class="header-anchor" href="#缓存删除" aria-label="Permalink to &quot;缓存删除&quot;">​</a></h5><p>cacheKeyMethod获取cache的key,该方法的参数必须和当前接口的参数一致,且commandKey要和该缓存的@CacheResult的接口一致.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @PutMapping(&quot;/hystrix/putUser&quot;)</span></span>
<span class="line"><span>    @HystrixCommand</span></span>
<span class="line"><span>    @CacheRemove(cacheKeyMethod = &quot;getCacheKey1&quot;,commandKey = &quot;getUser&quot;)</span></span>
<span class="line"><span>    public User user(@RequestBody User user){</span></span>
<span class="line"><span>        restTemplate.put(&quot;http://localhost:8010/user/&quot;,user,user.getId());</span></span>
<span class="line"><span>        return user;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public String getCacheKey1(User user) {</span></span>
<span class="line"><span>        return String.valueOf(user.getId());</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>测试该接口再去请求get接口,缓存消失.</p><p>问题:怎么能再次设置缓存?</p><h5 id="请求合并" tabindex="-1">请求合并 <a class="header-anchor" href="#请求合并" aria-label="Permalink to &quot;请求合并&quot;">​</a></h5><blockquote><p>微服务系统中的服务间通信，需要通过远程调用来实现，随着调用次数越来越多，占用线程资源也会越来越多。Hystrix中提供了@HystrixCollapser用于合并请求，从而达到减少通信消耗及线程数量的效果。</p></blockquote><p>在一次HTTP请求的过程中，收集一段时间内的相同请求，放到一个批处理命令中执行。实现合并请求，同样需要先初始化请求上下文.</p><p>注解@HystrixCollapser的常用属性</p><ol><li>batchMethod：用于设置请求合并的方法；</li><li>collapserProperties：请求合并属性，用于控制实例属性，有很多；</li><li>timerDelayInMilliseconds：collapserProperties中的属性，用于控制每隔多少时间合并一次请求；</li></ol><h3 id="dashboard" tabindex="-1">DashBoard <a class="header-anchor" href="#dashboard" aria-label="Permalink to &quot;DashBoard&quot;">​</a></h3><p>用来监控hystrix实例的执行情况。</p><h4 id="dashboard模块" tabindex="-1">DashBoard模块 <a class="header-anchor" href="#dashboard模块" aria-label="Permalink to &quot;DashBoard模块&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-hystrix&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-hystrix-dashboard&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8013</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: hystrix-dashboard-service</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    register-with-eureka: true</span></span>
<span class="line"><span>    fetch-registry: true</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://root:123456@localhost:8005/eureka</span></span></code></pre></div><p>启动类添加注解: @EnableHystrixDashboard <a href="/EnableEurekaClient.html">@EnableEurekaClient </a> 启动后访问: <a href="http://localhost:8013/hystrix" target="_blank" rel="noreferrer">http://localhost:8013/hystrix</a></p><h4 id="被监控方" tabindex="-1">被监控方 <a class="header-anchor" href="#被监控方" aria-label="Permalink to &quot;被监控方&quot;">​</a></h4><p>首先需要开启Actuator</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-netflix-hystrix&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>management:</span></span>
<span class="line"><span>  endpoints:</span></span>
<span class="line"><span>    web:</span></span>
<span class="line"><span>      exposure:</span></span>
<span class="line"><span>        #暴露hystrix监控端点</span></span>
<span class="line"><span>        include: &#39;hystrix.stream&#39;</span></span></code></pre></div><p>被检控方需要注册一个servlet bean</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public ServletRegistrationBean getServlet(){</span></span>
<span class="line"><span>        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();</span></span>
<span class="line"><span>        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);</span></span>
<span class="line"><span>        registrationBean.setLoadOnStartup(1);</span></span>
<span class="line"><span>        registrationBean.addUrlMappings(&quot;/actuator/hystrix.stream&quot;);</span></span>
<span class="line"><span>        registrationBean.setName(&quot;HystrixMetricsStreamServlet&quot;);</span></span>
<span class="line"><span>        return registrationBean;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>分别启动Eureka-Server,Hystrix-Service,User-Service,Dashboard-Service 服务注册完成后先测试Hystrix-Service接口, 在dashboard页面 添加URL <a href="http://localhost:8012/actuator/hystrix.stream" target="_blank" rel="noreferrer">http://localhost:8012/actuator/hystrix.stream</a> Delay:2000 Title:随意 点击MonitorStream即可监控Hystrix-Service该实例.</p><h4 id="dashboard图表" tabindex="-1">DashBoard图表 <a class="header-anchor" href="#dashboard图表" aria-label="Permalink to &quot;DashBoard图表&quot;">​</a></h4><p><img src="https://img-blog.csdnimg.cn/20191227163602699.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly90aGlua3dvbi5ibG9nLmNzZG4ubmV0,size_16,color_FFFFFF,t_70#alt=img#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=t3NQl&amp;originHeight=617&amp;originWidth=1265&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><hr><h3 id="gateway" tabindex="-1">Gateway <a class="header-anchor" href="#gateway" aria-label="Permalink to &quot;Gateway&quot;">​</a></h3><h4 id="nginx和gateway" tabindex="-1">Nginx和Gateway <a class="header-anchor" href="#nginx和gateway" aria-label="Permalink to &quot;Nginx和Gateway&quot;">​</a></h4><blockquote><p>Nginx 负载均衡/反向代理 Gateway 路由网关/过滤器/统一鉴权</p></blockquote><h4 id="为什么要有服务网关" tabindex="-1">为什么要有服务网关? <a class="header-anchor" href="#为什么要有服务网关" aria-label="Permalink to &quot;为什么要有服务网关?&quot;">​</a></h4><blockquote></blockquote><p>Nginx作为网站请求的第一道,稳定性能强,能够独立完成反向代理和跨域的问题,但是使用Gateway,能够提供更丰富的功能,比如动态路由/过滤器( 统一鉴权/限流)等,而且Gateway作为Cloud体系中的一环,集成功能更加简单.</p><h4 id="gateway和zuul" tabindex="-1">Gateway和Zuul <a class="header-anchor" href="#gateway和zuul" aria-label="Permalink to &quot;Gateway和Zuul&quot;">​</a></h4><blockquote><p>Gateway内置了限流过滤器 Gateway非阻塞式的API,并发更强 Zuul1编程模型简单，易于扩展； Gateway编程模型稍难，代码阅读难度要比Zuul高不少，扩展也稍复杂一些。</p></blockquote><h4 id="依赖" tabindex="-1">依赖 <a class="header-anchor" href="#依赖" aria-label="Permalink to &quot;依赖&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-starter-gateway&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><h4 id="yml" tabindex="-1">yml <a class="header-anchor" href="#yml" aria-label="Permalink to &quot;yml&quot;">​</a></h4><p>Gateway的基本功能仅用配置即可完成</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: gateway-web</span></span>
<span class="line"><span>  cloud:</span></span>
<span class="line"><span>    gateway:</span></span>
<span class="line"><span>      globalcors:</span></span>
<span class="line"><span>        cors-configurations:</span></span>
<span class="line"><span>          &#39;[/**]&#39;: #匹配所有的请求</span></span>
<span class="line"><span>            allowedOrigins: &quot;*&quot; # 跨域处理</span></span>
<span class="line"><span>            allowedMethods: #</span></span>
<span class="line"><span>              - GET</span></span>
<span class="line"><span>              - POST</span></span>
<span class="line"><span>              - PUT</span></span>
<span class="line"><span>              - DELETE</span></span>
<span class="line"><span>      routes:</span></span>
<span class="line"><span>        - id: shop-web-goods-route</span></span>
<span class="line"><span>#          uri: http://localhost:18081 #指定要路由的服务 http://localhost:18081</span></span>
<span class="line"><span>          uri: lb://GOODS #lb负载均衡,后面是微服务名称</span></span>
<span class="line"><span>          predicates: #路由断言,配置路由规则</span></span>
<span class="line"><span>            #- Host=zong.com** #所有的zong.com的请求都被路由到上面的uri,这里测试可以先修改windows的host文件如下,127.0.0.1 zong.com,</span></span>
<span class="line"><span>            # 访问http://zong.com:8001/brand/all,可看到正确路由</span></span>
<span class="line"><span>          - Path=/api/goods/** #所有以/brand开头的请求,都路由到http://localhost:18081微服务</span></span>
<span class="line"><span>          filters:</span></span>
<span class="line"><span>          - StripPrefix=1 # 所有以/api/brand开头的请求,都路由到  http://localhost:18081微服务,且/api由gateway自动去除</span></span>
<span class="line"><span>#          - name: RequestRateLimiter</span></span>
<span class="line"><span>#            args:</span></span>
<span class="line"><span>#              key-resolver: &quot;#{@ipKeyResolver}&quot;</span></span>
<span class="line"><span>#              redis-rate-limiter.replenishRate: 1</span></span>
<span class="line"><span>#              redis-rate-limiter.burstCapacity: 1</span></span>
<span class="line"><span>        - id: shop-web-user-route</span></span>
<span class="line"><span>          uri: lb://USER #lb负载均衡,后面是微服务名称</span></span>
<span class="line"><span>          predicates: #路由断言,配置路由规则</span></span>
<span class="line"><span>          - Path=/api/user/**</span></span>
<span class="line"><span>          filters:</span></span>
<span class="line"><span>          - StripPrefix=1 # 所有以/api/brand开头的请求,都路由到  http://localhost:18081微服务,且/api由gateway自动去除</span></span>
<span class="line"><span>#          - name: RequestRateLimiter #请求限流数,名字不能乱写,使用默认的factory</span></span>
<span class="line"><span>#            args:</span></span>
<span class="line"><span>#              key-resolver: &quot;#{@ipKeyResolver}&quot;</span></span>
<span class="line"><span>#              redis-rate-limiter.replenishRate: 1</span></span>
<span class="line"><span>#              redis-rate-limiter.burstCapacity: 1</span></span>
<span class="line"><span>management:</span></span>
<span class="line"><span>  endpoint:</span></span>
<span class="line"><span>    gateway:</span></span>
<span class="line"><span>      enabled: true</span></span></code></pre></div><h4 id="配合jwt实现鉴权的demo" tabindex="-1">配合JWT实现鉴权的demo <a class="header-anchor" href="#配合jwt实现鉴权的demo" aria-label="Permalink to &quot;配合JWT实现鉴权的demo&quot;">​</a></h4><p>配置全局过滤器,对请求进行过滤,检测token是否有效.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.zong.filter;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import com.zong.util.JwtUtil;</span></span>
<span class="line"><span>import org.apache.commons.lang.StringUtils;</span></span>
<span class="line"><span>import org.springframework.cloud.gateway.filter.GatewayFilterChain;</span></span>
<span class="line"><span>import org.springframework.cloud.gateway.filter.GlobalFilter;</span></span>
<span class="line"><span>import org.springframework.core.Ordered;</span></span>
<span class="line"><span>import org.springframework.http.HttpCookie;</span></span>
<span class="line"><span>import org.springframework.http.HttpStatus;</span></span>
<span class="line"><span>import org.springframework.http.server.reactive.ServerHttpRequest;</span></span>
<span class="line"><span>import org.springframework.http.server.reactive.ServerHttpResponse;</span></span>
<span class="line"><span>import org.springframework.stereotype.Component;</span></span>
<span class="line"><span>import org.springframework.web.server.ServerWebExchange;</span></span>
<span class="line"><span>import reactor.core.publisher.Mono;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 全局过滤器,用户校验</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class AuthFilter implements GlobalFilter, Ordered {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static final String AUTH_TOKEN = &quot;Auth&quot;;</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {</span></span>
<span class="line"><span>        //获取用户令牌</span></span>
<span class="line"><span>        ServerHttpRequest request = exchange.getRequest();</span></span>
<span class="line"><span>        ServerHttpResponse response = exchange.getResponse();</span></span>
<span class="line"><span>        //</span></span>
<span class="line"><span>        String token = request.getHeaders().getFirst(AUTH_TOKEN);</span></span>
<span class="line"><span>        boolean hasToken = true;</span></span>
<span class="line"><span>        if(StringUtils.isEmpty(token)){</span></span>
<span class="line"><span>            token = request.getQueryParams().getFirst(AUTH_TOKEN);</span></span>
<span class="line"><span>            hasToken = false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if(StringUtils.isEmpty(token)){</span></span>
<span class="line"><span>            HttpCookie cookie = request.getCookies().getFirst(AUTH_TOKEN);</span></span>
<span class="line"><span>            if (cookie != null) {</span></span>
<span class="line"><span>                token = cookie.getValue();</span></span>
<span class="line"><span>                hasToken = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if(StringUtils.isEmpty(token)){</span></span>
<span class="line"><span>            response.setStatusCode(HttpStatus.UNAUTHORIZED);</span></span>
<span class="line"><span>            return response.setComplete();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            //有效</span></span>
<span class="line"><span>            JwtUtil.parseJWT(token);</span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            //无效拦截</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>            response.setStatusCode(HttpStatus.UNAUTHORIZED);</span></span>
<span class="line"><span>            return response.setComplete();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        //放行</span></span>
<span class="line"><span>        //将令牌放入header</span></span>
<span class="line"><span>        if(!hasToken){</span></span>
<span class="line"><span>            request.mutate().header(AUTH_TOKEN,token);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return chain.filter(exchange);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override//排序,越小越先执行</span></span>
<span class="line"><span>    public int getOrder() {</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="jwt定义" tabindex="-1">JWT定义 <a class="header-anchor" href="#jwt定义" aria-label="Permalink to &quot;JWT定义&quot;">​</a></h4><p>头部:{type:&#39;JWT&#39;,alg:&#39;HS256&#39;},对头部进行base64加密,得到编码后的字符串</p><p>载荷:</p><ol><li>标准声明</li><li>私有声明(不参与令牌校验)</li><li>公共声明(不参与令牌校验)</li></ol><p>比如: {&#39;sub&#39;:&quot;123456&quot;,&quot;name&quot;:&quot;Paul&quot;,&quot;admin&quot;:true},将其base64加密,得到编码后的字符串</p><p>签名: 头部(加密后的)+载荷(加密后的)+密钥-&gt; HS256加密(头中指定的加密算法) -&gt;密文-&gt;签名</p><p>jwt:将三部分密文用.隔开拼在一起就是最终的jwt</p><p>校验:服务中存有密钥,对比头部+载荷+密钥 加密后的密文与调用方对比.</p><p>eg.</p><blockquote><ol><li>在gateway中设置全局拦截器,依次尝试从header/参数/cookies中获取token</li><li>利用密钥校验,失败或token为空,则返回401,跳到登录页面,成功则放行</li><li>登录接口生成token,放入cookie,并返回token参数给前台 JWT生成和校验</li></ol></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;jjwt&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;0.9.0&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Map&lt;String, Object&gt; map = new HashMap&lt;&gt;();</span></span>
<span class="line"><span>        map.put(&quot;self&quot;,&quot;aaa&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        JwtBuilder builder = Jwts.builder()</span></span>
<span class="line"><span>                .setId(&quot;Paul&quot;)</span></span>
<span class="line"><span>                .setSubject(&quot;AAA&quot;)</span></span>
<span class="line"><span>                .setIssuedAt(new Date())//颁发时间</span></span>
<span class="line"><span>                .addClaims(map)//载荷中自定义的部分</span></span>
<span class="line"><span>                .setExpiration(new Date(System.currentTimeMillis()+2000))//过期时间 20秒</span></span>
<span class="line"><span>                .signWith(SignatureAlgorithm.HS256,&quot;itcast&quot;);//加密算法和密钥</span></span>
<span class="line"><span>//        System.out.println(builder.compact());</span></span>
<span class="line"><span>        String token = builder.compact();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        String t =  token;</span></span>
<span class="line"><span>        Claims claims = Jwts.parser().setSigningKey(&quot;itcast&quot;)</span></span>
<span class="line"><span>                .parseClaimsJws(t)</span></span>
<span class="line"><span>                .getBody();</span></span>
<span class="line"><span>        System.out.println(claims.toString());</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>在用户微服务login接口中生成jwt token</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> User user = userService.findById(name);</span></span>
<span class="line"><span>        if(BCrypt.checkpw(password,user.getPassword())){</span></span>
<span class="line"><span>            //创建用户令牌信息</span></span>
<span class="line"><span>            Map&lt;String, Object&gt; map = new HashMap&lt;&gt;();</span></span>
<span class="line"><span>            map.put(&quot;role&quot;,&quot;USER&quot;);</span></span>
<span class="line"><span>            map.put(&quot;success&quot;,&quot;SUCCESS&quot;);</span></span>
<span class="line"><span>            map.put(&quot;name&quot;,name);</span></span>
<span class="line"><span>            String token = JwtUtil.createJWT(UUID.randomUUID().toString(), JSON.toJSONString(map),null);</span></span>
<span class="line"><span>            //存入cookie</span></span>
<span class="line"><span>            Cookie cookie = new Cookie(&quot;Auth&quot;, token);</span></span>
<span class="line"><span>            cookie.setDomain(&quot;localhost&quot;);</span></span>
<span class="line"><span>            cookie.setPath(&quot;/&quot;);</span></span>
<span class="line"><span>            response.addCookie(cookie);</span></span>
<span class="line"><span>            //令牌作为参数给用户</span></span>
<span class="line"><span>            return token;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return &quot;error&quot;;</span></span></code></pre></div><p>这里使用了BCrypt.java来进行密码明文密文的对比及加密,可到官网下载 <a href="http://www.mindrot.org/projects/jBCrypt/" target="_blank" rel="noreferrer">BCrypt</a></p><h3 id="config" tabindex="-1">Config <a class="header-anchor" href="#config" aria-label="Permalink to &quot;Config&quot;">​</a></h3><h4 id="服务端依赖" tabindex="-1">服务端依赖 <a class="header-anchor" href="#服务端依赖" aria-label="Permalink to &quot;服务端依赖&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-config-server&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h4 id="服务端配置" tabindex="-1">服务端配置 <a class="header-anchor" href="#服务端配置" aria-label="Permalink to &quot;服务端配置&quot;">​</a></h4><p>比如微服务A的配置文件 a.yml</p><p>需要将该文件重命名为 a-dev.yml,上传至git仓库(dev/tst/prod)</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  application</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">config</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        git</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          uri</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://gitee.com/raynorzong/spring-cloud-config.git</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #git仓库地址</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#账号</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#密码</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          search-paths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/blob/master</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #路径</span></span></code></pre></div><h4 id="服务端启动" tabindex="-1">服务端启动 <a class="header-anchor" href="#服务端启动" aria-label="Permalink to &quot;服务端启动&quot;">​</a></h4><p>启动类添加注解@EnableConfigServer即可.</p><h4 id="客户端依赖" tabindex="-1">客户端依赖 <a class="header-anchor" href="#客户端依赖" aria-label="Permalink to &quot;客户端依赖&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-starter-config&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h4 id="客户端配置" tabindex="-1">客户端配置 <a class="header-anchor" href="#客户端配置" aria-label="Permalink to &quot;客户端配置&quot;">​</a></h4><p>删除客户端原配置文件,新增bootstrap.yml引导文件</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      uri</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http://127.0.0.1:6001</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">goods</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #前缀</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dev</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #后缀</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">master</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #分支</span></span></code></pre></div><p>正常启动即可.</p><h4 id="多服务端配置" tabindex="-1">多服务端配置 <a class="header-anchor" href="#多服务端配置" aria-label="Permalink to &quot;多服务端配置&quot;">​</a></h4><ul><li>服务端添加Eureka Client依赖并在启动类添加注解<a href="/EnableEurekaClient.html">@EnableEurekaClient </a></li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6001</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">eureka</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  instance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    hostname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  client</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    register-with-eureka</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #是否将自己注册到服务中心</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    fetch-registry</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #是否从Eureka中获取信息</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    service-url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      defaultZone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http://\${eureka.instance.hostname}:\${server.port}</span></span></code></pre></div><ul><li>修改配置文件,删除uri,添加discovery,同样的,客户端的引导文件也需要添加EurekaClient配置</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">eureka</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  instance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    prefer-ip-adress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  client</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    service-url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      defaultZone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http://127.0.0.1:7001/eureka</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">goods</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #前缀</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dev</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #后缀</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">master</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #分支</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      discovery</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        service-id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">config</span></span></code></pre></div><h3 id="bus" tabindex="-1">Bus <a class="header-anchor" href="#bus" aria-label="Permalink to &quot;Bus&quot;">​</a></h3><h4 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h4><p>SpringCloud Config怎么实现配置更新,首先需要更改git上的配置文件,然后客户端.</p><p>而SpringCloud Bus就是为了能够实时更新配置文件,来解决上面的缺陷,该服务依赖RabbitMQ,且该服务一般与Config放在一个服务中.</p><h4 id="服务端依赖-1" tabindex="-1">服务端依赖 <a class="header-anchor" href="#服务端依赖-1" aria-label="Permalink to &quot;服务端依赖&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-bus&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-stream-binder-rabbit&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h4 id="服务端配置-1" tabindex="-1">服务端配置 <a class="header-anchor" href="#服务端配置-1" aria-label="Permalink to &quot;服务端配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6001</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">eureka</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  instance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    prefer-ip-adress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  client</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    service-url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      defaultZone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http://127.0.0.1:7001/eureka</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  application</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">config</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        git</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          uri</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://gitee.com/raynorzong/spring-cloud-config.git</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          search-paths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/blob/master</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  rabbitmq</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#RabbitMQ的配置</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    virtual-host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">username</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">password</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5672</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    addresses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">39.97.243.43</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">management</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#暴露触发消息总线的地址</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  endpoints</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    web</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      exposure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        include</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bus-refresh</span></span></code></pre></div><h4 id="客户端依赖-1" tabindex="-1">客户端依赖 <a class="header-anchor" href="#客户端依赖-1" aria-label="Permalink to &quot;客户端依赖&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-bus&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2.2.1.RELEASE&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-stream-binder-rabbit&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-boot-starter-actuator&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h4 id="客户端配置-1" tabindex="-1">客户端配置 <a class="header-anchor" href="#客户端配置-1" aria-label="Permalink to &quot;客户端配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #      uri: http://127.0.0.1:6001</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">goods</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #前缀</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dev</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #后缀</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">master</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #分支</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      discovery</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        service-id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">config</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  rabbitmq</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#RabbitMQ的配置</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    virtual-host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">username</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">password</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5672</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    addresses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">39.97.243.43</span></span></code></pre></div><h4 id="测试-1" tabindex="-1">测试 <a class="header-anchor" href="#测试-1" aria-label="Permalink to &quot;测试&quot;">​</a></h4><p>启动EurekaServer和Config以及微服务A,此时若git中A的配置文件发生改变需要使其服务重新加载配置需要利用消息队列RabbitMQ告诉A服务:</p><p>浏览器发送POST请求(针对Config服务的请求)如下:</p><blockquote><p><a href="http://127.0.0.1:6001/actuator/bus-refresh" target="_blank" rel="noreferrer">http://127.0.0.1:6001/actuator/bus-refresh</a></p></blockquote><p>返回结果204即可完成配置的动态加载.</p><h3 id="sleuth" tabindex="-1">Sleuth <a class="header-anchor" href="#sleuth" aria-label="Permalink to &quot;Sleuth&quot;">​</a></h3><p>微服务请求调用链,实现日志追踪,易于整合logback/slf4j等</p><h2 id="springcloud-alibaba-1" tabindex="-1">SpringCloud Alibaba <a class="header-anchor" href="#springcloud-alibaba-1" aria-label="Permalink to &quot;SpringCloud Alibaba&quot;">​</a></h2><h3 id="nacos" tabindex="-1">Nacos <a class="header-anchor" href="#nacos" aria-label="Permalink to &quot;Nacos&quot;">​</a></h3><h4 id="简介-1" tabindex="-1">简介 <a class="header-anchor" href="#简介-1" aria-label="Permalink to &quot;简介&quot;">​</a></h4><p>Nacos可作为注册中心(Eureka/Zookeeper),配置中心(Config)</p><p>官网简介:</p><ul><li>服务发现和服务健康监测</li><li>动态配置服务，带管理界面，支持丰富的配置维度。</li><li>动态 DNS 服务</li><li>服务及其元数据管理</li></ul><h4 id="服务端下载部署" tabindex="-1">服务端下载部署 <a class="header-anchor" href="#服务端下载部署" aria-label="Permalink to &quot;服务端下载部署&quot;">​</a></h4><p>可以从<code>https://github.com/alibaba/nacos/releases</code>下载<code>nacos-server-$version.zip</code>包。</p><p>Windows下载解压后（.zip），直接点击<code>bin/startup.cmd -m standalone</code>就可以了。</p><p>Nacos默认是<code>集群模式cluster</code>，可以<code>startup.cmd</code>属性<code>MODE</code>为<code>单机模式standalone</code></p><h4 id="服务端访问" tabindex="-1">服务端访问 <a class="header-anchor" href="#服务端访问" aria-label="Permalink to &quot;服务端访问&quot;">​</a></h4><p><a href="http://localhost:8848/nacos" target="_blank" rel="noreferrer">http://localhost:8848/nacos (opens new window)</a>,默认用户密码nacos/nacos</p><h4 id="注册中心功能" tabindex="-1">注册中心功能 <a class="header-anchor" href="#注册中心功能" aria-label="Permalink to &quot;注册中心功能&quot;">​</a></h4><h5 id="客户端依赖-2" tabindex="-1">客户端依赖 <a class="header-anchor" href="#客户端依赖-2" aria-label="Permalink to &quot;客户端依赖&quot;">​</a></h5><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">java.version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">java.version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project.build.sourceEncoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;UTF-8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project.build.sourceEncoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project.reporting.outputEncoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;UTF-8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project.reporting.outputEncoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring-boot.version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2.3.7.RELEASE&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring-boot.version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring-cloud-alibaba.version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2.2.2.RELEASE&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring-cloud-alibaba.version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        &lt;!--引入注册中心阿里巴巴--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.alibaba.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencyManagement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.alibaba.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-alibaba-dependencies&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;\${spring-cloud-alibaba.version}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;pom&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">scope</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;import&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">scope</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-boot-dependencies&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;\${spring-boot.version}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;pom&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">scope</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;import&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">scope</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencyManagement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h5 id="客户端配置-2" tabindex="-1">客户端配置 <a class="header-anchor" href="#客户端配置-2" aria-label="Permalink to &quot;客户端配置&quot;">​</a></h5><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Spring</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  application</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 应用名称</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">provider</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    nacos</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      discovery</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 服务注册地址</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        server-addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">127.0.0.1:8848</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8081</span></span></code></pre></div><h5 id="客户端启动" tabindex="-1">客户端启动 <a class="header-anchor" href="#客户端启动" aria-label="Permalink to &quot;客户端启动&quot;">​</a></h5><ul><li>启动类添加注解@EnableDiscoveryClient</li></ul><h3 id="配置中心" tabindex="-1">配置中心 <a class="header-anchor" href="#配置中心" aria-label="Permalink to &quot;配置中心&quot;">​</a></h3><h4 id="客户端依赖-3" tabindex="-1">客户端依赖 <a class="header-anchor" href="#客户端依赖-3" aria-label="Permalink to &quot;客户端依赖&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!--引入配置中心阿里巴巴--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.alibaba.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-starter-alibaba-nacos-config&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h4 id="客户端配置-3" tabindex="-1">客户端配置 <a class="header-anchor" href="#客户端配置-3" aria-label="Permalink to &quot;客户端配置&quot;">​</a></h4><ol><li>删除旧的application.yml,新增bootstrap.yml</li><li>添加配置</li></ol><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  application</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">provider</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cloud</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    nacos</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        server-addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">127.0.0.1:8848</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        file-extension</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">provider</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      discovery</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 服务注册地址</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        server-addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">127.0.0.1:8848</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  profiles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    active</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dev</span></span></code></pre></div><p>在上面的配置中，配置了nacos config server的地址，配置的扩展名是ymal（目前仅支持ymal和properties）。注意是没有配置server.port的，sever.port的属性在nacos中配置。上面的配置是和Nacos中的<code>dataId</code> 的格式是对应的，nacos的完整格式如下：</p><blockquote><p><img src="https://g.yuque.com/gr/latex?-#card=math&amp;code=-#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=e7J4B&amp;originHeight=20&amp;originWidth=16&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="">.$</p></blockquote><ol><li>启动nacos，登陆localhost:8848/nacos，创建一个data id:provider-dev.yaml,发布后启动客户端.</li></ol><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8081</span></span></code></pre></div><ol><li>动态刷新(与Cloud Bus不同)</li></ol><p>需要@RefreshScope注解,修改nacos中的provider-dev.yaml后重新访问下接口,即可实现</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.beans.factory.annotation.Value;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.cloud.context.config.annotation.RefreshScope;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RestController</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/config&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RefreshScope</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ConfigController</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;\${useLocalCache:false}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> useLocalCache;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/get&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> useLocalCache;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="服务端配置持久化" tabindex="-1">服务端配置持久化 <a class="header-anchor" href="#服务端配置持久化" aria-label="Permalink to &quot;服务端配置持久化&quot;">​</a></h4><p>在单机模式时<code>nacos</code>使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。我们可以配置<code>mysql</code>数据库，可视化的查看数据的存储。</p><ul><li>在nacos的 &#39;\\nacos\\conf&#39; 目录下,存在nacos-mysql.sql文件,导入数据库后</li><li>进入 config文件夹下的 application.properties文件，增加</li></ul><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># db mysql</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">spring.datasource.platform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=mysql</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">db.num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">db.url.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=jdbc:mysql://localhost:3306/nacos-config?</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">characterEncoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=utf8&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">connectTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=1000&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">socketTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=3000&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">autoReconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">useUnicode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">useSSL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false&amp;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">serverTimezone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=UTC</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">db.user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=root</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">db.password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=123123</span></span></code></pre></div><ul><li>单机启动nacos添加配置后即可看到nacos的配置.</li></ul><h3 id="客户端整合ribbon-openfeign" tabindex="-1">客户端整合Ribbon/OpenFeign <a class="header-anchor" href="#客户端整合ribbon-openfeign" aria-label="Permalink to &quot;客户端整合Ribbon/OpenFeign&quot;">​</a></h3><h4 id="ribbon-1" tabindex="-1">Ribbon <a class="header-anchor" href="#ribbon-1" aria-label="Permalink to &quot;Ribbon&quot;">​</a></h4><p>依赖和配置</p><p>不需要额外的依赖,只需要注册一个bean</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 新增restTemplate对象注入方法，注意，此处LoadBalanced注解一定要加上，否则无法远程调用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Bean</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LoadBalanced</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//org.springframework.cloud.client.loadbalancer.LoadBalanced;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RestTemplate </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">restTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RestTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="controller" tabindex="-1">Controller <a class="header-anchor" href="#controller" aria-label="Permalink to &quot;Controller&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Autowired</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RestTemplate restTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> restTemplate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getForObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://provider/test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, String.class);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="openfeign" tabindex="-1">OpenFeign <a class="header-anchor" href="#openfeign" aria-label="Permalink to &quot;OpenFeign&quot;">​</a></h4><h5 id="依赖-1" tabindex="-1">依赖 <a class="header-anchor" href="#依赖-1" aria-label="Permalink to &quot;依赖&quot;">​</a></h5><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-starter-openfeign&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2.2.7.RELEASE&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;io.github.openfeign&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;feign-httpclient&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;10.10.1&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h5 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h5><p>开启Feign中Hystrix,开启httpclient(默认用java.net.HttpURLConnection)</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">feign</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  httpclient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 开启httpclient</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  hystrix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 开启hystrix</span></span></code></pre></div><p>启动类添加Feign客户端注解:<a href="/EnableFeignClients.html">@EnableFeignClients </a></p><h5 id="测试-2" tabindex="-1">测试 <a class="header-anchor" href="#测试-2" aria-label="Permalink to &quot;测试&quot;">​</a></h5><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.zong.service.impl.TestServiceImpl;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.cloud.openfeign.FeignClient;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.web.bind.annotation.RequestParam;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FeignClient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fallbackFactory</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TestServiceImpl.class)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TestService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/feign&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RequestParam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">required</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Component</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TestServiceImpl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FallbackFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TestService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TestService </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Throwable </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">throwable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TestService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Fall_Back&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Autowired</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TestService testService;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GetMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/feign&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hiFeign</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String name) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> testService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h5 id="请求拦截器" tabindex="-1">请求拦截器 <a class="header-anchor" href="#请求拦截器" aria-label="Permalink to &quot;请求拦截器&quot;">​</a></h5><p>在微服务应用中，通过<code>feign</code>的方式实现<code>http</code>的调用，可以通过实现<code>feign.RequestInterceptor</code>接口在<code>feign</code>执行后进行拦截，对请求头等信息进行修改。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.zong.config;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.zong.utils.CacheConstants;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.zong.utils.ServletUtils;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.zong.utils.StringUtils;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> feign.RequestInterceptor;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> feign.RequestTemplate;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.stereotype.Component;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.web.context.request.RequestContextHolder;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.springframework.web.context.request.ServletRequestAttributes;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> javax.servlet.http.HttpServletRequest;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> java.util.Map;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Component</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FeignConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RequestInterceptor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> apply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RequestTemplate </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">requestTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ServletRequestAttributes attributes </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (ServletRequestAttributes) RequestContextHolder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getRequestAttributes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        HttpServletRequest httpServletRequest </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> attributes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (httpServletRequest </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; headers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ServletUtils.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getHeaders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(httpServletRequest);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 传递用户信息请求头，防止丢失</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            String userId </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> headers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(CacheConstants.DETAILS_USER_ID);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (StringUtils.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isNotEmpty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(userId)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                requestTemplate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(CacheConstants.DETAILS_USER_ID, userId);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,304)])])}const g=a(e,[["render",l]]);export{d as __pageData,g as default};
