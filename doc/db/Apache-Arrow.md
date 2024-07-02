## 简介

## 对象写入parquet

### 依赖

``` 
        <dependency>
            <groupId>org.duckdb</groupId>
            <artifactId>duckdb_jdbc</artifactId>
            <version>1.0.0</version>
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
```

###

```java

@Test
@SneakyThrows
void asdf() {
    DuckDBConnection conn = (DuckDBConnection) DriverManager.getConnection("jdbc:duckdb:");
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    BufferAllocator rootAllocator = new RootAllocator();
    for (int i = 0; i < 60 * 60 * 24; i++) {
        VectorSchemaRoot vectorSchemaRoot = VectorSchemaRoot.create(schema(), rootAllocator);
        BigIntVector idVector = (BigIntVector) vectorSchemaRoot.getVector("id");
        BigIntVector tmsVector = (BigIntVector) vectorSchemaRoot.getVector("tms");
        VarCharVector waveVector = (VarCharVector) vectorSchemaRoot.getVector("wave");
        VarCharVector argVector = (VarCharVector) vectorSchemaRoot.getVector("arg");
        waveVector.allocateNew(4000);
        idVector.allocateNew(4000);
        argVector.allocateNew(4000);
        tmsVector.allocateNew(4000);
        Long tms = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC);
        for (int j = 0; j < 4000; j++) {
            idVector.set(i, i);
            tmsVector.set(i, Math.toIntExact(tms));
            waveVector.setSafe(i, "demo".getBytes());
            argVector.setSafe(i, "demo".getBytes());
            vectorSchemaRoot.setRowCount(4000);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ArrowStreamWriter writer = new ArrowStreamWriter(vectorSchemaRoot, null, Channels.newChannel(out));
            writer.start();
            writer.writeBatch();
            ArrowArrayStream stream = ArrowArrayStream.allocateNew(rootAllocator);
            ArrowStreamReader reader = new ArrowStreamReader(new ByteArrayInputStream(out.toByteArray()), rootAllocator);
            Data.exportArrayStream(rootAllocator, reader, stream);
            conn.registerArrowStream("testStream", stream);
            conn.createStatement().execute(" COPY  ( select id,tms,wave,arg from testStream) to " +
                    "'C://data//1//2024-06//pat_" + tms + ".parquet' ( FORMAT 'parquet', CODEC 'snappy')  ");
            tms = tms + 1;
        }

    }
    stopWatch.stop();
    System.out.println(stopWatch.getLastTaskInfo().getTimeSeconds());
}

private Schema schema() {
    Field wave = new Field("wave", FieldType.nullable(new ArrowType.Utf8()), null);
    Field arg = new Field("arg", FieldType.nullable(new ArrowType.Utf8()), null);
    Field id = new Field("id", FieldType.nullable(new ArrowType.Int(64, true)), null);
    Field tms = new Field("tms", FieldType.nullable(new ArrowType.Int(64, true)), null);
    return new Schema(asList(id, tms, wave, arg));
}
```