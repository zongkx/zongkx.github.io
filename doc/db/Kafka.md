## 简介

消息队列/消息流存储/大数据场景 

## 试用
> [https://www.cnblogs.com/-wenli/p/13793157.html](https://www.cnblogs.com/-wenli/p/13793157.html)

> 参考[https://github.com/wurstmeister/kafka-docker](https://yq.aliyun.com/go/articleRenderRedirect?url=https%3A%2F%2Fgithub.com%2Fwurstmeister%2Fkafka-docker)


```yml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    volumes:
      - ./data:/data
    ports:
      - "2181:2181"

  kafka:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 192.168.203.128
      KAFKA_MESSAGE_MAX_BYTES: 2000000
      KAFKA_CREATE_TOPICS: "Topic1:1:3,Topic2:1:1:compact"
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - ./kafka-logs:/kafka
      - /var/run/docker.sock:/var/run/docker.sock

  kafka-manager:
    image: sheepkiller/kafka-manager
    ports:
      - 9020:9000
    environment:
      ZK_HOSTS: zookeeper:2181
```

参数说明：

- KAFKA_ADVERTISED_HOST_NAME：Docker宿主机IP（如果你要配置多个brokers，就不能设置为 localhost 或 127.0.0.1）
- KAFKA_MESSAGE_MAX_BYTES：kafka(message.max.bytes) 会接收单个消息size的最大限制，默认值为1000000 , ≈1M
- KAFKA_CREATE_TOPICS：初始创建的topics，可以不设置
- 环境变量./kafka-logs为防止容器销毁时消息数据丢失。
- 容器kafka-manager为yahoo出可视化kafka WEB管理平台。

启动

```
# 启动：
$ docker-compose up -d

# 增加更多Broker：
$ docker-compose scale kafka=3

# 合并：
$ docker-compose up --scale kafka=3
```

使用

> [http://192.168.203.128:9020/](http://192.168.203.128:9020/)


## Springboot

> [https://gitee.com/zongkx/demo-springboot/tree/master/demo-springboot-kafka](https://gitee.com/zongkx/demo-springboot/tree/master/demo-springboot-kafka)


```xml
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>
```

```yml
spring:
  kafka:
    #这里改为你的kafka服务器ip和端口号
    bootstrap-servers: 192.168.203.128:9092
    #=============== producer  =======================
    producer:
      #如果该值大于零时，表示启用重试失败的发送次数
      retries: 0
      #每当多个记录被发送到同一分区时，生产者将尝试将记录一起批量处理为更少的请求，默认值为16384(单位字节)
      batch-size: 16384
      #生产者可用于缓冲等待发送到服务器的记录的内存总字节数，默认值为3355443
      buffer-memory: 33554432
      #key的Serializer类，实现类实现了接口org.apache.kafka.common.serialization.Serializer
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      #value的Serializer类，实现类实现了接口org.apache.kafka.common.serialization.Serializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    #=============== consumer  =======================
    consumer:
      #用于标识此使用者所属的使用者组的唯一字符串
      group-id: test-consumer-group
      #当Kafka中没有初始偏移量或者服务器上不再存在当前偏移量时该怎么办，默认值为latest，表示自动将偏移重置为最新的偏移量
      #可选的值为latest, earliest, none
      auto-offset-reset: earliest
      #消费者的偏移量将在后台定期提交，默认值为true
      enable-auto-commit: true
      #如果'enable-auto-commit'为true，则消费者偏移自动提交给Kafka的频率（以毫秒为单位），默认值为5000。
      auto-commit-interval: 100
      #密钥的反序列化器类，实现类实现了接口org.apache.kafka.common.serialization.Deserializer
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      #值的反序列化器类，实现类实现了接口org.apache.kafka.common.serialization.Deserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
```

```java
package com.zong.util;

import com.zong.conf.KafkaConf;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.admin.TopicListing;
import org.apache.kafka.common.TopicPartitionInfo;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

/**
 * @author zongkxc
 */
@Component
public class KafkaUtil {
    private static AdminClient adminClient;
    private static KafkaTemplate<String,Object> kafkaTemplate;
    public KafkaUtil(KafkaTemplate<String,Object> kafkaTemplate1, KafkaConf kafkaConf) {
        kafkaTemplate = kafkaTemplate1;
        adminClient = AdminClient.create(Map.of(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaConf.getSpringKafkaBootstrapServers()));
    }
    /**
     * 新增topic，支持批量
     */
    public static void createTopic(Collection<NewTopic> newTopics) {
        adminClient.createTopics(newTopics);
    }

    /**
     * 删除topic，支持批量
     */
    public static void deleteTopic(Collection<String> topics) {
        adminClient.deleteTopics(topics);
    }


    /**
     * 获取指定topic的信息
     */
    public static String getTopicInfo(Collection<String> topics) {
        AtomicReference<String> info = new AtomicReference<>("");
        try {
            adminClient.describeTopics(topics).all().get().forEach((topic, description) -> {
                for (TopicPartitionInfo partition : description.partitions()) {
                    info.set(info + partition.toString() + "\n");
                }
            });
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return info.get();
    }

    /**
     * 获取全部topic
     */
    public static List<String> getAllTopic() {
        try {
            return adminClient.listTopics().listings().get().stream().map(TopicListing::name).collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    /**
     * 往topic中发送消息
     */
    public static void sendMessage(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }

}
```

```java
package com.zong.web;

import com.google.common.collect.Lists;
import com.zong.util.KafkaUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * kafka控制器
 *
 * @author 154594742@qq.com
 * @date 2021/3/2 15:01
 */

@RestController
@Api(tags = "Kafka控制器")
@Slf4j
public class KafkaController {


    /**
     * 新增topic (支持批量，这里就单个作为演示)
     *
     * @param topic topic
     * @return ResponseVo
     */
    @ApiOperation("新增topic")
    @PostMapping("kafka")
    public ResponseEntity<String> add(String topic) {
        NewTopic newTopic = new NewTopic(topic, 3, (short) 1);
        KafkaUtil.createTopic(Lists.newArrayList(newTopic));
        return new ResponseEntity<>("ok", HttpStatus.ACCEPTED);
    }

    /**
     * 查询topic信息 (支持批量，这里就单个作为演示)
     *
     * @param topic 自增主键
     * @return ResponseVo
     */
    @ApiOperation("查询topic信息")
    @GetMapping("kafka/{topic}")
    public ResponseEntity<String> getBytTopic(@PathVariable String topic) {
        return new ResponseEntity<>(KafkaUtil.getTopicInfo(Lists.newArrayList(topic)),HttpStatus.ACCEPTED);
    }

    /**
     * 删除topic (支持批量，这里就单个作为演示)
     * (注意：如果topic正在被监听会给人感觉删除不掉（但其实是删除掉后又会被创建）)
     *
     * @param topic topic
     * @return ResponseVo
     */
    @ApiOperation("删除topic")
    @DeleteMapping("kafka/{topic}")
    public ResponseEntity<?> delete(@PathVariable String topic) {
        KafkaUtil.deleteTopic(Lists.newArrayList(topic));
        return new ResponseEntity<>("ok", HttpStatus.ACCEPTED);
    }

    /**
     * 查询所有topic
     *
     * @return ResponseVo
     */
    @ApiOperation("查询所有topic")
    @GetMapping("kafka/allTopic")
    public ResponseEntity<List<String>> getAllTopic() {
        return new ResponseEntity<>(KafkaUtil.getAllTopic(), HttpStatus.ACCEPTED);
    }

    /**
     * 生产者往topic中发送消息demo
     *
     * @param topic
     * @param message
     * @return
     */
    @ApiOperation("往topic发送消息")
    @PostMapping("kafka/message")
    public ResponseEntity<?> sendMessage(String topic, String message) {
        KafkaUtil.sendMessage(topic, message);
        return new ResponseEntity<>("ok", HttpStatus.ACCEPTED);
    }

    /**
     * 消费者示例demo
     * <p>
     * 基于注解监听多个topic，消费topic中消息
     * （注意：如果监听的topic不存在则会自动创建）
     */
    @KafkaListener(topics = {"topic1", "topic2", "topic3"})
    public void consume(String message) {
        log.info("receive msg: " + message);
    }
}
```
