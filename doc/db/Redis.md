# Redis

优点： 

1. 读写性能优秀（基于内存、采用单线程避免了不必要的上下文切换和竞争条件、使用多路IO复用模型，非阻塞IO、数据结构简单且丰富）
2. 支持数据持久化（AOF、RDB）
3. 支持事务，Redis的所有操作都是原子性的，同时还支持几个操作合并后的原子性执行
4. 支持主从复制，主机会自动将数据同步到从机，可以进行读写分离

缺点：

1. 受限于物理内存，不适合大量数据高性能读写，适合作为缓存，
2. 不具备自动容错和恢复功能，存在数据不一致性的问题（主机宕机，数据未及时同步）

## 数据类型

### 字符串String

可存储：字符串、整数或者浮点数； 操作：对整个字符串或其中一部分执行操作；对整数或浮点数自增或自减 应用：适用于简单的键值对缓存

> 适合最简单的k-v存储，类似于memcached的存储结构，短信验证码，配置信息等，就用这种类型来存储。


### 哈希 hash

可存储：包含键值对的无序散列表 操作：添加获取移除单个键值对；获取所有键值对；检查某个键是否存在 应用：结构化的数据，比如一个对象

> 一般key为ID或者唯一标示，value对应的就是详情了。如商品详情，个人信息详情，新闻详情等。


### 列表

可存储：列表 list 操作：从两边压入或弹出元素；对单个多个元素修剪；只保留一个范围内的元素 应用：存储一些列表型的数据，类似**列表

> 因为list是有序的，比较适合存储一些有序且数据相对固定的数据。如省市区表、字典表等。因为list是有序的，适合根据写入的时间来排序，如：最新的***，消息队列等。


### 集合 set

可存储：无需集合 操作：添加获取移除单个元素；查找某个元素；计算交集、并集、差集；获取某个元素 应用：交集、差集、并集操作

> 可以简单的理解为ID-List的模式，如微博中一个人有哪些好友，set最牛的地方在于，可以对两个set提供交集、并集、差集操作。例如：查找两个人共同的好友等。


### 有序集合Zset

可存储：有序集合 操作：添加获取删除元素；根据范围获取元素排名； 应用：去重且排序

> 排序


## 应用场景

- 计数器：可以对String自增自减实现计数器功能。
- 缓存：将热点数据放到内存中，设置内存的最大使用量以及淘汰机制保证缓存命中率
- 会话缓存：可以使用 Redis 来统一存储多台应用服务器的会话信息。当应用服务器不再存储用户的会话信息，也就不再具有状态，一个用户可以请求任意一个应用服务器，从而更容易实现高可用性以及可伸缩性
- 查找表：用于获取不可靠数据的快速查询
- 消息队列：利用list双向链表的特性，可以通过lpush和lpop写入和读取消息，更主流的是RabbitMQ等消息中间件。
- SET和ZSET：取交集、差集等操作；排序

## 持久化

将内存中的数据写入到磁盘，防止数据丢失

### RDB（默认）

Redis DataBase：按照一定的时间将内存的数据以快照的形式保存到硬盘中，对应产生的数据文件为dump.rdb。通过配置文件中的save参数来定义快照的周期。 其缺点是：数据安全性低，RDB是间隔一段时间进行持久化，期间出现宕机导致数据丢失。

### AOF

Append Only File：Redis执行的每次写命令记录到单独的日志文件中，当重启Redis会重新将持久化的日志中文件恢复数据。 优点：

1. 数据安全，aof 持久化可以配置 appendfsync 属性，有 always，每进行一次 命令操作就记录到 aof 文件中一次。
2. 通过 append 模式写文件，即使中途服务器宕机，可以通过 redis-check-aof 工具解决数据一致性问题。
3. AOF 机制的 rewrite 模式。AOF 文件没被 rewrite 之前（文件过大时会对命令 进行合并重写），可以删除其中的某些命令（比如误操作的 flushall）)

缺点:

1. AOF 文件比 RDB 文件大，且恢复速度慢。
2. 数据集大的时候，比 rdb 启动效率低。

## 事务

原子性:事务中的操作要么都发生，要么都不发生 一致性：事务执行前后数据完整性一致 隔离性：并发执行的互不影响 持久性：事务一旦提交，数据就永久被修改 Redis事务总是保证一致性和隔离性。当服务器运行在AOF持久化模式下，并且appendfsync选项的值为always时，事务也具有持久性。

## 集群

### 哨兵模式

哨兵是redis集群中非常重要的一个组件，负责

- 集群监控：负责监控redis master和slvae进程
- 消息通知：如果某个redis实例有故障，通知管理员
- 故障转移：如果master node宕机，会自动转移到slave node
- 配置中心：如果故障转移了，通知client客户端新的master地址 （至少需要3个哨兵；不保证数据零丢失，保证高可用）

### 主从架构

maternode负责数据写入，写入之后复制到若干个slavenode，读操作都从从节点取数据。（读写分离）

## SpringBoot Demo

### 依赖和配置

SpringBoot常用的Redis客户端如Jedis\Lettuce，SpringBoot2.0之后已经默认使用Lettuce，

> Lettuce的连接是基于Netty的，连接实例可以在多个线程间共享，如果你不知道Netty也没事，大致意思就是一个多线程的应用可以使用同一个连接实例，而不用担心并发线程的数量。通过异步的方式可以让我们更好地利用系统资源。 Jedis 是直连模式，在多个线程间共享一个 Jedis 实例时是线程不安全的，每个线程都去拿自己的 Jedis 实例，当连接数量增多时，物理连接成本就较高了。


```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
```

配置:

```
spring.cache.type=Redis
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.lettuce.pool.max-active=8
spring.redis.lettuce.pool.max-idle=8
spring.redis.lettuce.pool.min-idle=0
# 如果配置了pool,那么必须加入commons-pool2的依赖
        <!-- redis依赖commons-pool -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>
```

### RedisTemplate

在配置完之后就可以通过注入RedisTemplate来使用了,不过RedisTemplate默认只支持<String,String>形式的，为了能够扩展，可以手动添加bean来实现。（Spring-Cache也可以使用Redis，在某种情况下，如果可以手动读写缓存也可以不使用@Cache等注解） 下面是自定义bean

```
    @Bean
    public RedisSerializer<Object> redisSerializer() {

        ObjectMapper objectMapper = new ObjectMapper();
        //反序列化时候遇到不匹配的属性并不抛出异常
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        //序列化时候遇到空对象不抛出异常
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //反序列化的时候如果是无效子类型,不抛出异常
        objectMapper.configure(DeserializationFeature.FAIL_ON_INVALID_SUBTYPE, false);
        //不使用默认的dateTime进行序列化,
        objectMapper.configure(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS, false);
        //使用JSR310提供的序列化类,里面包含了大量的JDK8时间序列化类
        objectMapper.registerModule(new JavaTimeModule());
        //启用反序列化所需的类型信息,在属性中添加@class
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        //配置null值的序列化器
        GenericJackson2JsonRedisSerializer.registerNullValueSerializer(objectMapper, null);
        return new GenericJackson2JsonRedisSerializer(objectMapper);

    }


    @Bean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory, RedisSerializer<Object> redisSerializer) {

        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setDefaultSerializer(redisSerializer);
        template.setValueSerializer(redisSerializer);
        template.setHashValueSerializer(redisSerializer);
        template.setKeySerializer(StringRedisSerializer.UTF_8);
        template.setHashKeySerializer(StringRedisSerializer.UTF_8);
        template.afterPropertiesSet();
        return template;
    }
 /**
     * 对hash类型的数据操作
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public HashOperations<String, String, Object> hashOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForHash();
    }

    /**
     * 对redis字符串类型数据操作
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public ValueOperations<String, Object> valueOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForValue();
    }

    /**
     * 对链表类型的数据操作
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public ListOperations<String, Object> listOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForList();
    }

    /**
     * 对无序集合类型的数据操作
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public SetOperations<String, Object> setOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForSet();
    }

    /**
     * 对有序集合类型的数据操作
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public ZSetOperations<String, Object> zSetOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForZSet();
    }
```

在网上搜到的大部分RedisTemplate中用的都是Jackson2JsonRedisSerializer,其中的enableDefaultTyping还是一个过期的方法,找到了使用GenericJackson2JsonRedisSerializer的原因:

> 1. 无参构造调用一个参数的构造
> 2. 构造中创建ObjectMapper,并且设置了一个NullValueSerializer
> 3. ObjectMapper设置包含类信息 上面的RedisTemplate redisTemplate作为参数,如果直接用RedisTemplate<String,Object> redisTemplate 在IDEA中会报不能注入bean的错误,只需要把k,v


对于JDK1.8中的LocalDate和LocalDateTime，可能会出现

> Caused by: com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Cannot construct instance of `java.time.LocalDateTime` (no Creators, like default construct, exist): cannot deserialize from Object value (no delegate- or property-based Creator)


这是由于LocalDateTime没空构造,无法反射进行构造,所以会抛出异常.(如果自定义的对象没有提供默认构造,也会抛出这个异常) 可以在该属性上添加注解

```
@JsonDeserialize(using = LocalDateTimeDeserializer.class)
@JsonSerialize(using = LocalDateTimeSerializer.class)
private LocalDateTime createTime;
```

### RedisUtil

```
package com.demo.Util;

import org.springframework.data.redis.core.BoundListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * redisTemplate封装
 *
 */
@Component
public class RedisUtils {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;


    /**
     * 指定缓存失效时间
     * @param key 键
     * @param time 时间(秒)
     * @return
     */
    public boolean expire(String key,long time){
        try {
            if(time>0){
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 根据key 获取过期时间
     * @param key 键 不能为null
     * @return 时间(秒) 返回0代表为永久有效
     */
    public long getExpire(String key){
        return redisTemplate.getExpire(key,TimeUnit.SECONDS);
    }

    /**
     * 判断key是否存在
     * @param key 键
     * @return true 存在 false不存在
     */
    public boolean hasKey(String key){
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 删除缓存
     * @param key 可以传一个值 或多个
     */
    @SuppressWarnings("unchecked")
    public void del(String ... key){
        if(key!=null&&key.length>0){
            if(key.length==1){
                redisTemplate.delete(key[0]);
            }else{
                redisTemplate.delete(CollectionUtils.arrayToList(key));
            }
        }
    }

    //============================String=============================
    /**
     * 普通缓存获取
     * @param key 键
     * @return 值
     */
    public Object get(String key){
        return key==null?null:redisTemplate.opsForValue().get(key);
    }

    /**
     * 普通缓存放入
     * @param key 键
     * @param value 值
     * @return true成功 false失败
     */
    public boolean set(String key,Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 普通缓存放入并设置时间
     * @param key 键
     * @param value 值
     * @param time 时间(秒) time要大于0 如果time小于等于0 将设置无限期
     * @return true成功 false 失败
     */
    public boolean set(String key,Object value,long time){
        try {
            if(time>0){
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            }else{
                set(key, value);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 递增
     * @param key 键
     * @param delta 要增加几(大于0)
     * @return
     */
    public long incr(String key, long delta){
        if(delta<0){
            throw new RuntimeException("递增因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }

    /**
     * 递减
     * @param key 键
     * @param delta 要减少几(小于0)
     * @return
     */
    public long decr(String key, long delta){
        if(delta<0){
            throw new RuntimeException("递减因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, -delta);
    }

    //================================Map=================================
    /**
     * HashGet
     * @param key 键 不能为null
     * @param item 项 不能为null
     * @return 值
     */
    public Object hget(String key,String item){
        return redisTemplate.opsForHash().get(key, item);
    }

    /**
     * 获取hashKey对应的所有键值
     * @param key 键
     * @return 对应的多个键值
     */
    public Map<Object,Object> hmget(String key){
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * HashSet
     * @param key 键
     * @param map 对应多个键值
     * @return true 成功 false 失败
     */
    public boolean hmset(String key, Map<String,Object> map){
        try {
            redisTemplate.opsForHash().putAll(key, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * HashSet 并设置时间
     * @param key 键
     * @param map 对应多个键值
     * @param time 时间(秒)
     * @return true成功 false失败
     */
    public boolean hmset(String key, Map<String,Object> map, long time){
        try {
            redisTemplate.opsForHash().putAll(key, map);
            if(time>0){
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 向一张hash表中放入数据,如果不存在将创建
     * @param key 键
     * @param item 项
     * @param value 值
     * @return true 成功 false失败
     */
    public boolean hset(String key,String item,Object value) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 向一张hash表中放入数据,如果不存在将创建
     * @param key 键
     * @param item 项
     * @param value 值
     * @param time 时间(秒)  注意:如果已存在的hash表有时间,这里将会替换原有的时间
     * @return true 成功 false失败
     */
    public boolean hset(String key,String item,Object value,long time) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            if(time>0){
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 删除hash表中的值
     * @param key 键 不能为null
     * @param item 项 可以使多个 不能为null
     */
    public void hdel(String key, Object... item){
        redisTemplate.opsForHash().delete(key,item);
    }

    /**
     * 判断hash表中是否有该项的值
     * @param key 键 不能为null
     * @param item 项 不能为null
     * @return true 存在 false不存在
     */
    public boolean hHasKey(String key, String item){
        return redisTemplate.opsForHash().hasKey(key, item);
    }

    /**
     * hash递增 如果不存在,就会创建一个 并把新增后的值返回
     * @param key 键
     * @param item 项
     * @param by 要增加几(大于0)
     * @return
     */
    public double hincr(String key, String item,double by){
        return redisTemplate.opsForHash().increment(key, item, by);
    }

    /**
     * hash递减
     * @param key 键
     * @param item 项
     * @param by 要减少记(小于0)
     * @return
     */
    public double hdecr(String key, String item,double by){
        return redisTemplate.opsForHash().increment(key, item,-by);
    }

    //============================set=============================
    /**
     * 根据key获取Set中的所有值
     * @param key 键
     * @return
     */
    public Set<Object> sGet(String key){
        try {
            return redisTemplate.opsForSet().members(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 根据value从一个set中查询,是否存在
     * @param key 键
     * @param value 值
     * @return true 存在 false不存在
     */
    public boolean sHasKey(String key,Object value){
        try {
            return redisTemplate.opsForSet().isMember(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 将数据放入set缓存
     * @param key 键
     * @param values 值 可以是多个
     * @return 成功个数
     */
    public long sSet(String key, Object...values) {
        try {
            return redisTemplate.opsForSet().add(key, values);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 将set数据放入缓存
     * @param key 键
     * @param time 时间(秒)
     * @param values 值 可以是多个
     * @return 成功个数
     */
    public long sSetAndTime(String key,long time,Object...values) {
        try {
            Long count = redisTemplate.opsForSet().add(key, values);
            if(time>0) {
                expire(key, time);
            }
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取set缓存的长度
     * @param key 键
     * @return
     */
    public long sGetSetSize(String key){
        try {
            return redisTemplate.opsForSet().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 移除值为value的
     * @param key 键
     * @param values 值 可以是多个
     * @return 移除的个数
     */
    public long setRemove(String key, Object ...values) {
        try {
            Long count = redisTemplate.opsForSet().remove(key, values);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    //===============================list=================================

    /**
     * 获取list缓存的内容
     * @param key 键
     * @param start 开始
     * @param end 结束  0 到 -1代表所有值
     * @return
     */
    public List<Object> lGet(String key, long start, long end){
        try {
            return redisTemplate.opsForList().range(key, start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取list缓存的长度
     * @param key 键
     * @return
     */
    public long lGetListSize(String key){
        try {
            return redisTemplate.opsForList().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 通过索引 获取list中的值
     * @param key 键
     * @param index 索引  index>=0时， 0 表头，1 第二个元素，依次类推；index<0时，-1，表尾，-2倒数第二个元素，依次类推
     * @return
     */
    public Object lGetIndex(String key,long index){
        try {
            return redisTemplate.opsForList().index(key, index);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 将list放入缓存
     * @param key 键
     * @param value 值
     * @return
     */
    public boolean lSet(String key, Object value) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 将list放入缓存
     * @param key 键
     * @param value 值
     * @param time 时间(秒)
     * @return
     */
    public boolean lSet(String key, Object value, long time) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 将list放入缓存
     * @param key 键
     * @param value 值
     * @return
     */
    public boolean lSet(String key, List<Object> value) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 将list放入缓存
     * @param key 键
     * @param value 值
     * @param time 时间(秒)
     * @return
     */
    public boolean lSet(String key, List<Object> value, long time) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 根据索引修改list中的某条数据
     * @param key 键
     * @param index 索引
     * @param value 值
     * @return
     */
    public boolean lUpdateIndex(String key, long index,Object value) {
        try {
            redisTemplate.opsForList().set(key, index, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 移除N个值为value
     * @param key 键
     * @param count 移除多少个
     * @param value 值
     * @return 移除的个数
     */
    public long lRemove(String key,long count,Object value) {
        try {
            Long remove = redisTemplate.opsForList().remove(key, count, value);
            return remove;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 模糊查询获取key值
     * @param pattern
     * @return
     */
    public Set keys(String pattern){
        return redisTemplate.keys(pattern);
    }

    /**
     * 使用Redis的消息队列
     * @param channel
     * @param message 消息内容
     */
    public void convertAndSend(String channel, Object message){
        redisTemplate.convertAndSend(channel,message);
    }


     /**
     * 根据起始结束序号遍历Redis中的list
     * @param listKey
     * @param start  起始序号
     * @param end  结束序号
     * @return
     */
    public List<Object> rangeList(String listKey, long start, long end) {
        //绑定操作
        BoundListOperations<String, Object> boundValueOperations = redisTemplate.boundListOps(listKey);
        //查询数据
        return boundValueOperations.range(start, end);
    }
    /**
     * 弹出右边的值 --- 并且移除这个值
     * @param listKey
     */
    public Object rifhtPop(String listKey){
        //绑定操作
        BoundListOperations<String, Object> boundValueOperations = redisTemplate.boundListOps(listKey);
        return boundValueOperations.rightPop();
    }

    //=========BoundListOperations 用法 End============

}
```

### 测试

```
    @Resource
    private RedisUtils redisUtils;

    @Test
    void contextLoads() {
        User user = new User();
        user.setId(1l);
        user.setTime(LocalDateTime.now());
        user.setPassword("xxx");
        redisUtils.lSet("test",user);
        redisUtils.set("user",user);
        log.info(redisUtils.get("user").toString());
        List<Object> list = redisUtils.lGet("test",0L,-1L);
        list.forEach(System.out::print);
    }
```

## SpringBoot 应用

### Token鉴权

1. 用户登录请求登录接口时，验证用户名密码等，验证成功会返回给前端一个token，这个token就是之后鉴权的唯一凭证。
2. 后台可能将token存储在redis或者数据库中。
3. 之后前端的请求，需要在header中携带token，后端取出token去redis或者数据库中进行验证，如果验证通过则放行，如果不通过则拒绝操作。

下面用Redis作为缓存保存token，通过mvc拦截器来实现对登录的验证。

### RedisService/LoginService

```
    @Resource
    private RedisUtils redisUtils;
    @Override
    public void setToken(String key, Object value) {
        redisUtils.set(key,value);
    }
    @Override
    public Object getToken(String key) {
        return redisUtils.get(key);
    }
    @Override
    public boolean deleteToken(String key) {
        redisUtils.del(key);
        return true;
    }
    @Resource
    private RedisService redisService;
    @Override
    public String login(String username, String password) {
        if (Objects.equals("test", username) && Objects.equals("123", password)) {//测试
            String token = UUID.randomUUID().toString();
            redisService.setToken(token, username);
            return "用户：" + username + "登录成功，token是：" + token;
        } else {
            return "用户名或密码错误，登录失败！";
        }

    }
    @Override
    public String logout(HttpServletRequest request) {
        String token = request.getHeader("token");
        Boolean delete = redisService.deleteToken(token);
        if (!delete) {
            return "注销失败，请检查是否登录！";
        }
        return "注销成功！";
    }
```

### 拦截器和配置

```
    @Resource
    MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns("/**")
                .excludePathPatterns("/toLogin","/login","/js/**","/css/**","/images/**");
    }
@Component
@Slf4j
public class MyInterceptor implements HandlerInterceptor {
    @Resource
    private RedisService redisService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        log.info("请求路径：{}", request.getRequestURI());
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        String token = request.getHeader("token");
        if (StringUtils.isEmpty(token)) {
            response.getWriter().print("用户未登录，请登录后操作！");
            return false;
        }
        Object loginStatus = redisService.getToken(token);
        if( Objects.isNull(loginStatus)){
            response.getWriter().print("token错误，请查看！");
            return false;
        }
        return true;
    }
}
```

### 接口和测试

```
    @Resource
    private UserService userService;
    @GetMapping("/login")
    public String login(String username,String password){
        return userService.login(username,password);
    }
    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        return userService.logout(request);
    }
    @GetMapping("/test")
    public String test(HttpServletRequest request){
        return "ok";
    }
```

> [http://localhost:8080/login?username=test&password=123](http://localhost:8080/login?username=test&password=123) 用户：test登录成功，token是：564aa232-a015-481e-94f3-8a0174b11932


> GET /test HTTP/1.1 token: 564aa232-a015-481e-94f3-8a0174b11932 Host: localhost:8080 ok


> GET /logout HTTP/1.1 token: 564aa232-a015-481e-94f3-8a0174b11932 Host: localhost:8080 注销成功


### 拓展

- 基于Token可以实现简单的单点登录,将token放到cookie中
- redis的value可以适当存储用户的信息
- token的生成规则可以适当复杂
- 拦截器可以自定义拦截特定的token
- jwt扩展,后续会用.

# Redission

## 分布式存在的并发问题

## 问题模拟

商品购买,在单机时并发问题可以通过synchronized, 但是在分布式情况下,JVM级别的锁不会生效.

假设: redis存了个string [stock:200]

```
@GetMapping("/buy")
public String buy(){
    synchronized (this){
        String s = redisUtils.get("stock").toString();
        Integer i = Integer.parseInt(s);
        if(i>0){
            int real = i-1;
            redisUtils.set("stock",real+"");
            logger.info("购买成功,剩余:"+real);
        }else{
            logger.info("购买失败");
        }
    }
    return "buy end";
}
```

1. 启动两个服务product 8081/8082,并使用Nginx做负载均衡

```
 # 待选服务器列表
   worker_processes  1;

   events {
   worker_connections  1024;
}


   http {
   upstream  my-server {
   server    localhost:8081 weight=1;
   server    localhost:8082 weight=1;
   }

   server {
   listen       80;
   server_name  localhost;

   location / {
   proxy_pass http://my-server;
   proxy_redirect default;
   }

}

}
```

1. 使用jmeter进行压力测试

> [http://127.0.0.1/buy](http://127.0.0.1/buy)


可以看到后台打印的剩余库存出现了同样的数字.

## 解决

### 入门级 setnx (set if not exists)

setnx key value 将key的值设为value,当且仅当key不存在

利用redis单线程模型,若干线程同时执行setnx,会进入队列.

```
    @GetMapping("/buy2")
    public String buy2() {
        String lockKey = "product_01";
        // setIfAbsent原子命令
        Boolean result = redisTemplate.opsForValue().setIfAbsent(lockKey, "zong",10,TimeUnit.SECONDS);//同时设置过期时间
        if (!result) {
            return "error";
        }
        try {
            Integer i = Integer.parseInt(redisUtils.get("stock").toString());

            if (i > 0) {
                int real = i - 1;
                redisUtils.set("stock", real + "");
                logger.info("购买成功,剩余:" + real);
            } else {
                logger.info("购买失败");
            }
        } finally {
            redisTemplate.delete(lockKey);
        }
        return "buy end";
    }
```

高并发仍然存在的问题: 锁永久失效:假设线程1try后面的代码执行时间超过了锁的过期时间,此时线程2进入并加锁,但线程1会执行到释放锁的地方, 导致线程1删除了线程2的锁.

### 优化:(添加锁需要原子操作)每个线程加的锁的value都设为UUID,释放锁的时候进行判断

```
    String id  = UUID.randomUUID().toString();
    // setIfAbsent原子命令
    Boolean result = redisTemplate.opsForValue().setIfAbsent(lockKey, id,10,TimeUnit.SECONDS);//同时设置过期时间
    //...
    if (id.equals(redisTemplate.opsForValue().get(lockKey))){
        redisTemplate.delete(lockKey);
    }
```

仍然存在的问题:线程1在判断成功进入的那一瞬间(还没有执行锁的释放), 锁过期了,线程2又刚加了锁,仍然导致线程1释放了线程2的锁

### 解决:锁续命(删除锁也需要原子操作)

再开一个定时任务,判断主线程的锁是否还持有该锁,若锁过期且主线程还没结束,就刷新锁的过期时间. 使用分布式锁框架解决该问题.

### Redission

#### 依赖

```
    <dependency>
        <groupId>org.redisson</groupId>
        <artifactId>redisson</artifactId>
        <version>3.6.5</version>
    </dependency>
```

#### 配置

```
    @Bean
    public Redisson redisson(){
        //单机模式
        Config config = new Config();
        config.useSingleServer().setAddress("redis://localhost:6379").setDatabase(0);
        return (Redisson) Redisson.create(config);

    }
```

#### 加锁和释放

```
    @Autowired
    Redisson redisson;

    @GetMapping("/buy3")
    public String buy3() {
        String lockKey = "product_01";
        RLock lock = redisson.getLock(lockKey);
        try {
            lock.lock();//真正的加锁 setIfAbsent 30s
            Integer i = Integer.parseInt(redisUtils.get("stock").toString());
            if (i > 0) {
                int real = i - 1;
                redisUtils.set("stock", real + "");
                logger.info("购买成功,剩余:" + real);
            } else {
                logger.info("购买失败");
            }
        } finally {
            lock.unlock();//
        }
        return "buy end";
    }
```

redisson大致逻辑(lua脚本实现):

1. 线程1加锁成功(30s), 开启后台线程(每个10s检测线程1是否还持有锁,如果有则延长10s)
2. 线程2判断是否能加锁,不能则自旋等待,知道能为止
3. 线程1释放锁,线程2加锁

### Redis主从架构导致的分布式锁失效问题

客户端加锁拿到主节点的返回后,主节点还未同步给从节点就宕机了,导致从节点没有拿到客户端的锁.

> CAP原则:一致性/可用性/分区容错性,三者不可能同时存在.


- Redis满足AP:一致性/分区容错性,Redis强调可用性,会立即返回结果.
- Zookeeper满足CP:一致性/分区容错性,同样的,Zookeeper在客户端加锁后不会立即返回结果, 只有Zookeeper集群半数以上都获得同步后,才会返回客户端成功(过半写)

#### Redlock

Redis对于此问题,也可以使用Redlock来解决. Redlock针对的是客户端,客户端加锁后,超过半数以上的节点加锁成功才算成功.(牺牲可用性,不如直接用zookeeper)
