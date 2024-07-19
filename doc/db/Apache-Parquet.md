## java写入parquet文件

```
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-core</artifactId>
            <version>1.2.1</version>
            <exclusions>
                <exclusion>
                    <groupId>*</groupId>
                    <artifactId>*</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.parquet</groupId>
            <artifactId>parquet-avro</artifactId>
            <version>1.14.1</version>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-api</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

```

```java

@Test
@SneakyThrows
void a1() {
    long l = 1719792000;
    Path dataFile = new Path("/data/output.parquet");
    LocalOutputFile localOutputFile = new LocalOutputFile(dataFile);
    try (ParquetWriter<T> writer = AvroParquetWriter.<T>builder(localOutputFile)
            .withSchema(ReflectData.AllowNull.get().getSchema(Pat.class))
            .withDataModel(ReflectData.get())
            .withConf(entries)
            .withCompressionCodec(SNAPPY)
            .withWriteMode(OVERWRITE)
            .withWriterVersion(ParquetProperties.WriterVersion.PARQUET_2_0)
            .withValidation(false)
            .enableValidation()
            .build()) {
        for (T t : data) {
            writer.write(t);
        }
    }
}

```