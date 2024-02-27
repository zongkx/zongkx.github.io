# RabbitMQ

## 基础概念 

MQ即为Message Queue,消息队列.它是一种典型的消费生产者模型,一端往消息队列中不断写入消息,另一端则读取消息.

1. 队列、生产者、消费者 队列是RabbitMQ的内部对象,用于存储消息.生产者生产消息,投递到队列中,消费者可以从队列中获取消息.多个消费者可以订阅同一个队列,这时消息会被平摊给多个消费者,而不是每个消费者都收到所有的消息.
2. Exchange、Binding 实际上生产者将消息发送到Exchange（交换器），再通过Binding将Exchange与Queue关联起来。在绑定（Binding）Exchange与Queue的同时，一般会指定一个binding key。在绑定多个Queue到同一个Exchange的时候，这些Binding允许使用相同的binding key。生产者在将消息发送给Exchange的时候，一般会指定一个routing key，来指定这个消息的路由规则，生产者就可以在发送消息给Exchange时，通过指定routing key来决定消息流向哪里。

![](http://spring.hhui.top/spring-blog/imgs/200212/00.jpg#alt=img#crop=0&crop=0&crop=1&crop=1&id=w1LRi&originHeight=265&originWidth=927&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

> a. Message 具体的消息，包含消息头（即附属的配置信息）和消息体（即消息的实体内容）由发布者，将消息推送到Exchange，由消费者从Queue中获取


> b. Publisher 消息生产者，负责将消息发布到交换器(Exchange)


> c. Exchange 交换器，用来接收生产者发送的消息并将这些消息路由给服务器中的队列


> d. Binding 绑定，用于给Exchange和Queue建立关系，从而决定将这个交换器中的哪些消息，发送到对应的Queue


> e. Queue 消息队列，用来保存消息直到发送给消费者 ;它是消息的容器，也是消息的终点;一个消息可投入一个或多个队列;消息一直在队列里面，等待消费者连接到这个队列将其取走


> f. Connection 连接，内部持有一些channel，用于和queue打交道


> g. Channel 信道（通道），MQ与外部打交道都是通过Channel来的，发布消息、订阅队列还是接收消息，这些动作都是通过Channel完成；简单来说就是消息通过Channel塞进队列或者流出队列


> h. Consumer 消费者，从消息队列中获取消息的主体


> i. Virtual Host 虚拟主机，表示一批交换器、消息队列和相关对象。;虚拟主机是共享相同的身份认证和加密环境的独立服务器域。每个 vhost 本质上就是一个 mini 版的 RabbitMQ 服务器，拥有自己的队列、交换器、绑定和权限机制。vhost 是 AMQP 概念的基础，必须在连接时指定，RabbitMQ 默认的 vhost 是 /可以理解为db中的数据库的概念，用于逻辑拆分 j. Broker 消息队列服务器实体


## Exchange策略

-  Direct<直接>：1对1-----一个消息只能被一个消费者消费 
-  Topic<主题>：1对多-----一个消息可以被多个消费者消费 
-  Fanout<分列>：广播 

## 应用场景

### 异步处理

比如用户注册完后,需要发送注册邮件

1. 串行方式 将注册信息写入数据库,发送注册邮件 任务完成后告诉客户端,但实际上发送注册邮件是非必须的,用户没有必要等待.
2. 并行方式 将注册信息写入数据库,同时发送注册邮件,完成后返回客户端消息,提高了处理时间
3. 消息队列 引入消息队列后,注册信息入库后便可以响应客户端,其余非必要的任务可以延迟处理

### 应用解耦

比如订单\库存系统

1. 订单系统调用库存系统接口 缺点:耦合度高,当库存系统出现问题,订单就会失败.
2. 消息队列 订单创建后,将消息写入队列,消息队列能保证消息的可靠投递,不会导致数据异常.

### 流量削峰

可以缓解短时间的高流量压垮应用,用户的请求首先写入到消息队列,消息队列长度设置最大值,如果超过,则直接放弃用户请求或者进行其它处理.消费端再根据规则处理队列中的请求消息.

## 阿里CentOS 安装

[可参考](https://www.cnblogs.com/yw0219/p/8933917.html) 在启动后需要到阿里控制台安全策略里面手动添加一个15672端口的配置 http://39.97.243.43:15672/访问即可,我的默认的管理员账户密码username/password

## SpringBoot Demo

### 依赖和配置

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

```yml
spring:
  rabbitmq:
    virtual-host: /
    username: username
    password: password
    port: 5672
    addresses: 39.97.243.43
```

```java

// 需要阿里安全策略中添加5672的安全访问权限
public class Content {
    public final static String exchange = "topic.e";
    public final static String routing = "r";
    public final static String queue = "topic.a";
}
```

- provider

```java
    @Autowired
    private AmqpTemplate amqpTemplate;

    public String publish2mq(String ans){
        String msg = "hello world";
        amqpTemplate.convertAndSend(Content.exchange,Content.routing,msg);
        return msg;
    }
```

- consumer

```java
@Service
public class ConsumerDemo {
    @RabbitListener(bindings = @QueueBinding(value = @Queue(value = Content.queue, durable = "false",autoDelete = "true"),
            exchange = @Exchange(value = Content.exchange, ignoreDeclarationExceptions = "true",
                    type = ExchangeTypes.TOPIC), key = Content.routing))
    public void consumer(String msg) {
        System.out.println("consumer msg: " + msg);
    }
}
```

- 测试

```java
    @Test
    void contextLoads() {
        System.out.println(publishDemo.publish2mq("Raynor"));
    }
```

## Springboot 应用

### MQ配置

对发送端而言,主要是将消息发送给exchange,然后根据不同的策略分发给不同的queue 下面例子将定义一个topic模式的exchange,并绑定一个queue（对发送端而言，不同的exchange类型，对发送端的使用姿势影响并不大，有影响的是消费者）

```java
public class MqConstants {
    public static final String exchange = "topic.e";
    public static final String routing = "r";
    public final static String queue = "topic.a";
}

@Configuration
public class MqConfig {

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(MqConstants.exchange,true,false);
    }

    @Bean
    public Queue queue() {
        // 创建一个持久化的队列
        return new Queue(MqConstants.queue,true);
    }

    @Bean
    public Binding binding(TopicExchange topicExchange, Queue queue) {
        return BindingBuilder.bind(queue).to(topicExchange).with(MqConstants.routing);
    }


}
```

### 发送

```java

@Component
public class PublishDemo {

    @Autowired
    private AmqpTemplate amqpTemplate;

    @Autowired
    private RabbitTemplate rabbitTemplate;//实现自amqpTemplate,使用起来并无区别

    public String publish2mq(String ans) {
        String msg = "hello world";
        //将msg发送给指定的exchange，并设置消息的路由键
        //发送的消息默认是持久化的
        amqpTemplate.convertAndSend(MqConstants.exchange, MqConstants.routing, msg);
        return msg;
    }

    //非持久化的消息发送
    private String publish2mq3(String ans) {
        String msg = "Define msg = " + ans;
        rabbitTemplate.convertAndSend(MqConstants.exchange, MqConstants.routing, msg, new MessagePostProcessor() {
            @Override
            public Message postProcessMessage(Message message) throws AmqpException {
                message.getMessageProperties().setHeader("test", "测试");
                message.getMessageProperties().setDeliveryMode(MessageDeliveryMode.NON_PERSISTENT);
                return message;
            }
        });

        return msg;
    }
}
```

### 序列化

RabbitTemplate默认是利用SimpleMessageConverter来实现封装Message逻辑的,它只接受byte数组，string字符串，可序列化对象（这里使用的是jdk的序列化方式来实现对象和byte数组之间的互转） 可以通过自定义MessageConverter来解决上述问题或者用Jackson2JsonMessageConverter来解决

```

public class SelfConverter extends AbstractMessageConverter {
    @Override
    protected Message createMessage(Object o, MessageProperties messageProperties) {
        messageProperties.setContentType("application/json");
        return new Message(JSON.toJSONBytes(o), messageProperties);
    }
    @Override
    public Object fromMessage(Message message) throws MessageConversionException {
        return JSON.parse(message.getBody());
    }
}
    @Bean
    public RabbitTemplate jacksonRabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
   //或者
   // @Bean
    public RabbitTemplate jsonRabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(new SelfConverter());
        return rabbitTemplate;
    }
```

测试

```
    @Autowired
    private PublishDemo publishDemo;

    @GetMapping("/publish")
    public String publish(){
        publishDemo.publish2mq("Raynor");
        return "ok";
    }

    @GetMapping("/publish2")
    public String publish2(){
        User user = new User();
        user.setName("Paul");
        user.setPassword("123");
        publishDemo.publish2mq(JSON.toJSONString(user));
        return "ok";
    }
```

结果:

```
The server reported 0 messages remaining.
Exchange	topic.e
Routing Key	r
Redelivered	○
Properties	
priority:	0
delivery_mode:	2
headers:	
__TypeId__:	com.demo.entity.User
content_encoding:	UTF-8
content_type:	application/json
Payload
32 bytes
Encoding: string
{"name":"Paul","password":"123"}

The server reported 1 messages remaining.
Exchange	topic.e
Routing Key	r
Redelivered	○
Properties	
priority:	0
delivery_mode:	2
headers:	
__TypeId__:	java.lang.String
content_encoding:	UTF-8
content_type:	application/json
Payload
8 bytes
Encoding: string
"Raynor"
```

### 消费

#### queue\exchange已存在

对于消费者而言,不需要管理exchange的创建/销毁的;它是由发送者定义的

```
@Component
public class MyListener {
    @RabbitListener(queues = "topic.a")
    public void consumerExistsQueue(String data) {
        System.out.println("consumerExistsQueue: " + data);
    }
}
```

#### queue不存在

当queue的autoDelete属性为false时,上面的场景比较合适,但是当其为true的时候,没有消费者队列就会自动删除了,所以直接 [[@RabbitListener(queues ](/RabbitListener(queues ) ](/RabbitListener(queues ) = "topic.a")或出现找不到queue的问题 

```
// durable和autoDelete属性一定要和创建queue的时候的属性保持一致
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "topic.n1", durable = "false", autoDelete = "true"),
        exchange = @Exchange(value = "topic.e", type = ExchangeTypes.TOPIC), 
        key = "r"))
public void consumerNoQueue(String data) {
    System.out.println("consumerNoQueue: " + data);
}
```

> value: @Queue注解，用于声明队列，value为queueName, durable表示队列是否持久化, autoDelete表示没有消费者之后队列是否自动删除 exchange: @Exchange注解，用于声明exchange， type指定消息投递策略， key: 在topic方式下，这个就是我们熟知的 routingKey


#### ack

为了保证数据的一致性,有一个消费确认机制

> RabbitMq消费者可以选择手动和自动确认两种模式，如果是自动，消息已到达队列，RabbitMq对无脑的将消息抛给消费者，一旦发送成功，他会认为消费者已经成功接收，在RabbitMq内部就把消息给删除了。另外一种就是手动模式，手动模式需要消费者对每条消息进行确认(也可以批量确认)，RabbitMq发送完消息之后，会进入到一个待确认(unacked)的队列


```
/**
 * 需要手动ack，但是不ack时
 *
 * @param data
 */
@RabbitListener(bindings = @QueueBinding(value = @Queue(value = "topic.n2", durable = "false", autoDelete = "true"),
        exchange = @Exchange(value = "topic.e", type = ExchangeTypes.TOPIC), key = "r"), ackMode = "MANUAL")
public void consumerNoAck(String data) {
    // 要求手动ack，这里不ack，会怎样?
    System.out.println("consumerNoAck: " + data);
}
```

这个时候没有手动ack的逻辑的话,数据一直在unacked.

#### manual ack

```
    @RabbitListener(bindings = @QueueBinding(value = @Queue(value = "topic.n3", durable = "false", autoDelete = "true"),
            exchange = @Exchange(value = "topic.e", type = ExchangeTypes.TOPIC), key = "r"), ackMode = "MANUAL")
    public void consumerDoAck(String data, @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag, Channel channel)
            throws IOException {
        System.out.println("consumerDoAck: " + data);

        if (data.contains("Paul")) {
            // RabbitMQ的ack机制中，第二个参数返回true，表示需要将这条消息投递给其他的消费者重新消费
            channel.basicAck(deliveryTag, false);
        } else {
            // 第三个参数true，表示这个消息会重新进入队列
            channel.basicNack(deliveryTag, false, true);
        }
    }
```

> deliveryTag: 相当于消息的唯一标识，用于mq辨别是哪个消息被ack/nak了 channel: mq和consumer之间的管道，通过它来ack/nak


#### 并发消费

concurrency = "2"来实现并发消费

```
@RabbitListener(bindings = @QueueBinding(value = @Queue(value = "topic.n4", durable = "false", autoDelete = "true"),
        exchange = @Exchange(value = "topic.e", type = ExchangeTypes.TOPIC), key = "r"), concurrency = "4")
public void multiConsumer(String data) {
    System.out.println("multiConsumer: " + data);
}
```

可以看到queue topic.n4 里面中由4个channel

### 消息确认机制

其业务逻辑大致如下:

> 生产者将信道设置成Confirm模式，一旦信道进入Confirm模式，所有在该信道上面发布的消息都会被指派一个唯一的ID(以confirm.select为基础从1开始计数) 一旦消息被投递到所有匹配的队列之后，Broker就会发送一个确认给生产者（包含消息的唯一ID）,这就使得生产者知道消息已经正确到达目的队列了 如果消息和队列是可持久化的，那么确认消息会将消息写入磁盘之后发出 Broker回传给生产者的确认消息中deliver-tag域包含了确认消息的序列号（此外Broker也可以设置basic.ack的multiple域，表示到这个序列号之前的所有消息都已经得到了处理）


对生产者而言,生产者通常需要知道消息知否正确存到queue中 Confirm模式:信道开器Confirm模式后

```yml
  #confirm模式
    publisher-confirm-type: correlated
    #接收mq返回的确认消息
    publisher-returns: true
```

```java
  
@Service
public class AckPublisher implements RabbitTemplate.ConfirmCallback,RabbitTemplate.ReturnCallback {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init() {
        rabbitTemplate.setReturnCallback(this);
        rabbitTemplate.setConfirmCallback(this);
    }
    @Override
    //接收发送后确认信息
    public void confirm(CorrelationData correlationData, boolean b, String s) {
        if (b) {
            System.out.println("ack send succeed: " + correlationData);
        } else {
            System.out.println("ack send failed: " + correlationData + "|" + s);
        }
    }

    @Override
    //发送失败的回调
    public void returnedMessage(Message message, int i, String s, String s1, String s2) {
        System.out.println("ack " + message + " 发送失败");
    }

    //一般的用法，推送消息
    public String publish(String ans) {
        String msg = "ack msg = " + ans;
        System.out.println("publish: " + msg);
        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
        rabbitTemplate.convertAndSend(MqConstants.exchange, MqConstants.routing, msg, correlationData);
        return msg;
    }
}
```

通过回调可以处理确认逻辑.

1. 消息的确认是异步的,所以存在对于publisher先发送的message后进入队列的情况,所以此处引入了事务的概念
2. 如果队列是可持久化的,消息确认回调将在持久化之后执行
