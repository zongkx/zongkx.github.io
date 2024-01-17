```xml
<!--flink core  1.14.3 -->
<!-- 如果将程序作为 Maven 项目开发，则必须添加 flink-clients 模块的依赖 必须要有 -->
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-clients_2.12</artifactId>
  <version>${flink-version}</version>
</dependency>

<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-java</artifactId>
  <version>${flink-version}</version>
</dependency>

<!--flink stream java-->
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-streaming-java_2.12</artifactId>
  <version>${flink-version}</version>
</dependency>
<!--kafka-->
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-connector-kafka_2.12</artifactId>
  <version>${flink-version}</version>
</dependency>

<!-- 写入数据到clickhouse -->
<dependency>
  <groupId>ru.yandex.clickhouse</groupId>
  <artifactId>clickhouse-jdbc</artifactId>
  <version>0.1.54</version>
        </dependency>
```
```java
@SneakyThrows
public static void main(String[] args) {
    
    // StreamExecutionEnvironment用于设置你的执行环境。任务执行环境用于定义任务的属性，创建数据源以及最终启动任务的执行。
    StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
    
    
    // 配置kafka信息
    Properties properties = new Properties();
    properties.setProperty("bootstrap.servers", "192.168.203.128:9092");
    properties.setProperty("group.id", "test");
    
    
    // 得到 kafka 实例
    FlinkKafkaConsumer<String> myConsumer = new FlinkKafkaConsumer<String>("111", new SimpleStringSchema(), properties);
    // 尽可能从最早的记录开始
    //        myConsumer.setStartFromEarliest();
    // 从最新的记录开始
    myConsumer.setStartFromLatest();
    // 从指定的时间开始（毫秒）
    // myConsumer.setStartFromTimestamp();
    // myConsumer.setStartFromGroupOffsets(); // 默认的方法
    
    // 添加数据源
    DataStream<String> stream = env.addSource(myConsumer).setParallelism(1);
    
    SingleOutputStreamOperator<User> dataStream = stream.map(new MapFunction<String, User>() {
        @Override
        public User map(String data) throws Exception {
            String[] split = data.split(",");
            return User.of((split[0]), split[1], (split[2]));
        }
    });
    // sink
    J_MyClickHouseUtil jdbcSink = new J_MyClickHouseUtil("INSERT INTO default.my3  VALUES (?,?,?)");
    dataStream.addSink(jdbcSink);
    dataStream.print();
    env.execute("clickhouse sink test");
    env.execute("print-kafka-info");
    
}

```
```java
public class J_MyClickHouseUtil extends RichSinkFunction<User> {
    Connection connection = null;
    
    String sql;
    
    public J_MyClickHouseUtil(String sql) {
        this.sql = sql;
    }
    
    @Override
    public void open(Configuration parameters) throws Exception {
        super.open(parameters);
        connection = ClickHouseUtil.getConn("192.168.203.128", 8123, "default");
    }
    
    @Override
    public void close() throws Exception {
        super.close();
        if (connection != null) {
            connection.close();
        }
    }
    
    @Override
    public void invoke(User user, Context context) throws Exception {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, user.id);
        preparedStatement.setString(2, user.name);
        preparedStatement.setString(3, user.age);
        preparedStatement.addBatch();
        
        long startTime = System.currentTimeMillis();
        int[] ints = preparedStatement.executeBatch();
        connection.commit();
        long endTime = System.currentTimeMillis();
        System.out.println("批量插入完毕用时：" + (endTime - startTime) + " -- 插入数据 = " + ints.length);
    }
}
```
```java

public class ClickHouseUtil {
    private static Connection connection;
    
    public static Connection getConn(String host, int port, String database) throws SQLException, ClassNotFoundException {
        Class.forName("ru.yandex.clickhouse.ClickHouseDriver");
        String  address = "jdbc:clickhouse://" + host + ":" + port + "/" + database;
        connection = DriverManager.getConnection(address);
        return connection;
    }
    
    public static Connection getConn(String host, int port) throws SQLException, ClassNotFoundException {
        return getConn(host,port,"default");
    }
    public static Connection getConn() throws SQLException, ClassNotFoundException {
        return getConn("192.168.203.128",8123);
    }
    public void close() throws SQLException {
        connection.close();
    }
}
```
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    public String id;
    public String name;
    public String age;
    public static User of(String id, String name, String age) {
        return new User(id, name, age);
    }
}

```
> topic=111&message=1%2C2222%2C1

>  create table my3(
>  	`id` String,
>  	`name` String,
>  	`age` Int
>  )ENGINE = MergeTree
>  PARTITION BY id
> PRIMARY KEY id

