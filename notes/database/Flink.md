## 文档

[doc](http://flink.apache.org/zh/usecases.html) 

## docker 安装

- `docker pull flink`
- `docker-compose.yml`

```yaml
version: "2.1"
services:
  jobmanager:
    image: flink
    expose:
      - "6123"
    ports:
      - "8081:8081"
    command: jobmanager
    environment:
      - JOB_MANAGER_RPC_ADDRESS=jobmanager
  taskmanager:
    image: flink
    expose:
      - "6121"
      - "6122"
    depends_on:
      - jobmanager
    command: taskmanager
    links:
      - "jobmanager:jobmanager"
    environment:
      - JOB_MANAGER_RPC_ADDRESS=jobmanager
```

-  `docker-compose build` 
-  `docker-compose up -d --force-recreate` 
-  `http://192.168.203.128:8081` 

## java demo

```xml

        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-clients_2.12</artifactId>
            <version>1.13.6</version>
        </dependency>

        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-java</artifactId>
            <version>1.13.6</version>
        </dependency>

        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-streaming-java_2.12</artifactId>
            <version>1.13.6</version>
        </dependency>
```

### 批处理

```java
package com.zongkx.batch;

import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.java.operators.AggregateOperator;
import org.apache.flink.api.java.operators.DataSource;
import org.apache.flink.api.java.operators.FlatMapOperator;
import org.apache.flink.api.java.tuple.Tuple2;

import java.util.Arrays;

/**
 *  * 批处理
 */
@Slf4j
public class Batch  {
    public static void main(String[] args) throws Exception {
        ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
        //读取文件
        DataSource<String> dataSource = env.readTextFile("src/main/resources/hello.txt");
        // 分隔，扁平化(s, 1)
        FlatMapOperator<String, Tuple2<String, Integer>> flatMap = dataSource.flatMap((FlatMapFunction<String, Tuple2<String, Integer>>) (lines, out) -> {
            // 切割 遍历 收集
            Arrays.stream(lines.split(" ")).forEach(s -> out.collect(Tuple2.of(s, 1)));
            // 当Lambda表达式使用 java 泛型的时候, 由于泛型擦除的存在, 需要显示的声明类型信息
        }).returns(Types.TUPLE(Types.STRING,Types.INT));
        // 按照单词分组并求算结果
        AggregateOperator<Tuple2<String, Integer>> sum = flatMap.groupBy(0).sum(1);
        sum.print();
    }
}
```

### 有界流

```java
package com.zongkx.stream;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.util.Arrays;

/**
 * 有界流 :有界数据流有明确定义的开始和结束，可以在执行任何计算之前通过获取所有数据来处理有界流，处理有界流不需要有序获取，因为可以始终对有界数据集进行排序，有界流的处理也称为批处理。
 * @author zongkxc
 */


public class BoundedStream {
    public static void main(String[] args) throws Exception {
        // 创建有界流环境
        StreamExecutionEnvironment boundedStream = StreamExecutionEnvironment.getExecutionEnvironment();

        // 读取资源
        DataStreamSource<String> streamSource = boundedStream.readTextFile("src/main/resources/hello.txt");

        // 数据扁平化
        SingleOutputStreamOperator<Tuple2<String, Integer>> flatMap = streamSource.flatMap((FlatMapFunction<String, Tuple2<String, Integer>>) (lines, out) -> {
            // 切分，遍历 收集
            Arrays.stream(lines.split(" ")).forEach(s -> out.collect(Tuple2.of(s, 1)));
        }).returns(Types.TUPLE(Types.STRING, Types.INT));

        // 按key 收集，聚合求出总数
        SingleOutputStreamOperator<Tuple2<String, Integer>> sum = flatMap.keyBy(0).sum(1);

        //输出
        sum.print("test");

        // 开启
        boundedStream.execute();
    }
}
```

### 无界流

```java
package com.zongkx.stream;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.util.Arrays;

/**
 *
 * 无界流 无界数据流有一个开始但是没有结束，它们不会在生成时终止并提供数据，必须连续处理无界流，也就是说必须在获取后立即处理event。对于无界数据流我们无法等待所有数据都到达，因为输入是无界的，并且在任何时间点都不会完成。处理无界数据通常要求以特定顺序（例如事件发生的顺序）获取event，以便能够推断结果完整性。
 * 比如 kafka
 */
public class UnboundedStream {

    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();


        // 下载  https://eternallybored.org/misc/netcat/netcat-win32-1.11.zip  cmd进入该目录， nc -L -p 9000 -v 即可创建该端口

        // 监听端口
        DataStreamSource<String> source = env.socketTextStream("localhost", 9000);

        SingleOutputStreamOperator<Tuple2<String, Integer>> sum = source.flatMap((FlatMapFunction<String, Tuple2<String, Integer>>) (lines, out) -> {
            // 切割每行数据,并收集到 Collector中
            Arrays.stream(lines.split(" ")).forEach(s -> out.collect(Tuple2.of(s, 1)));
        }).returns(Types.TUPLE(Types.STRING, Types.INT)).keyBy(0).sum(1);

        sum.print("test");

        env.execute();

    }
}
```
