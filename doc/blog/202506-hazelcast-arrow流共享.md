## 使用hazelcast 实现 arrow 流高效共享

### 依赖

```xml

<dependencies>
    <dependency>
        <groupId>com.hazelcast</groupId>
        <artifactId>hazelcast-spring</artifactId>
    </dependency>
    <dependency>
        <groupId>org.duckdb</groupId>
        <artifactId>duckdb_jdbc</artifactId>
        <version>1.3.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.arrow</groupId>
        <artifactId>arrow-c-data</artifactId>
        <version>16.0.0</version>
    </dependency>

    <dependency>
        <groupId>org.apache.arrow</groupId>
        <artifactId>arrow-vector</artifactId>
        <version>16.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.arrow</groupId>
        <artifactId>arrow-memory-netty</artifactId>
        <version>16.0.0</version>
    </dependency>
</dependencies>
```

### code

JDK11 以上需要在启动参数中开启  `--add-opens=java.base/java.nio=org.apache.arrow.memory.core,ALL-UNNAMED`

1. 运行`testLocalCache5` 作为 `arrow` 流的生产者, 对应的 byte[] 放到 hazelcast即可
2. 运行`testLocalCache6` 作为 `arrow` 流的消费者, 根据 hazelcast 的 byte[] 初始化 `ArrowStreamReader`

```java

@Test
@SneakyThrows
void testLocalCache5() {
    Config config = new Config();
    config.addCacheConfig(new CacheSimpleConfig().setName("A"));
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
    BufferAllocator rootAllocator = new RootAllocator();
    VectorSchemaRoot vectorSchemaRoot = VectorSchemaRoot.create(schema(), rootAllocator);
    BigIntVector idVector = (BigIntVector) vectorSchemaRoot.getVector("id");
    BigIntVector tmsVector = (BigIntVector) vectorSchemaRoot.getVector("tms");
    VarCharVector waveVector = (VarCharVector) vectorSchemaRoot.getVector("wave");
    VarCharVector argVector = (VarCharVector) vectorSchemaRoot.getVector("arg");
    waveVector.allocateNew(1);
    idVector.allocateNew(1);
    argVector.allocateNew(1);
    tmsVector.allocateNew(1);
    idVector.set(0, 0);
    tmsVector.set(0, 1);
    waveVector.setSafe(0, "demo".getBytes());
    argVector.setSafe(0, "demo".getBytes());
    vectorSchemaRoot.setRowCount(4000);
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    ArrowStreamWriter writer = new ArrowStreamWriter(vectorSchemaRoot, null, Channels.newChannel(out));
    writer.start();
    writer.writeBatch();
    ArrowArrayStream stream = ArrowArrayStream.allocateNew(rootAllocator);
    ArrowStreamReader reader = new ArrowStreamReader(new ByteArrayInputStream(out.toByteArray()), rootAllocator);
    Data.exportArrayStream(rootAllocator, reader, stream);
    hazelcastInstance.getMap("A").set("key", out.toByteArray());
    Thread.sleep(1000000000);
}

@Test
@SneakyThrows
void testLocalCache6() {
    Config config = new Config();
    config.addCacheConfig(new CacheSimpleConfig().setName("A"));
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
    DuckDBConnection conn = (DuckDBConnection) DriverManager.getConnection("jdbc:duckdb:");
    BufferAllocator rootAllocator = new RootAllocator();
    Object o = hazelcastInstance.getMap("A").get("key");
    ArrowStreamReader reader = new ArrowStreamReader(new ByteArrayInputStream((byte[]) o), rootAllocator);
    ArrowArrayStream stream = ArrowArrayStream.allocateNew(rootAllocator);
    Data.exportArrayStream(rootAllocator, reader, stream);
    conn.registerArrowStream("testStream", stream);
    conn.createStatement().execute(" COPY  ( select id,tms,wave,arg from testStream) to " +
            "'D:\\1\\aaa.parquet' ( FORMAT 'parquet', CODEC 'snappy')  ");

}

private Schema schema() {
    Field wave = new Field("wave", FieldType.nullable(new ArrowType.Utf8()), null);
    Field arg = new Field("arg", FieldType.nullable(new ArrowType.Utf8()), null);
    Field id = new Field("id", FieldType.nullable(new ArrowType.Int(64, true)), null);
    Field tms = new Field("tms", FieldType.nullable(new ArrowType.Int(64, true)), null);
    return new Schema(asList(id, tms, wave, arg));
}

```