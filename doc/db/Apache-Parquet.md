## java写入parquet文件

```
        <dependency>
            <groupId>org.apache.avro</groupId>
            <artifactId>avro</artifactId>
            <version>1.11.3</version>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-core</artifactId>
            <version>1.2.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.parquet</groupId>
            <artifactId>parquet-hadoop</artifactId>
            <version>1.14.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.parquet</groupId>
            <artifactId>parquet-avro</artifactId>
            <version>1.14.1</version>
        </dependency>

```

```java

@Test
@SneakyThrows
void a1() {
    long l = 1719792000;
    Path dataFile = new Path("/data/output.parquet");
    ParquetWriter<Pat> writer = AvroParquetWriter.<Pat>builder(dataFile)
            .withSchema(ReflectData.AllowNull.get().getSchema(Pat.class))
            .withDataModel(ReflectData.get())
            .withConf(new Configuration())
            .withCompressionCodec(SNAPPY)
            .withWriteMode(OVERWRITE)
            .build();
    for (int i = 0; i < 4000; i++) {
        Pat pat = new Pat(1L, l + i, "aaa", "bbb");
        writer.write(pat);
    }
    writer.close();
}

```