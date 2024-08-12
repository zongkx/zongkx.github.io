## 简介

## 零拷贝

arrow 中最核心的能力: 零拷贝是什么

- 内存对齐和缓存友好的数据格式：Arrow的列式存储格式设计成缓存友好，数据在内存中以对齐的方式存储，这使得在不同的数据处理组件之间传递数据时无需进行额外的内存复制。
- 与内存映射文件（mmap）结合：Arrow可以将数据通过mmap映射到内存，使得多个进程可以直接访问磁盘上的数据文件，而无需将数据完全加载到内存中。

mmap（内存映射）和sendfile是两种用于优化I/O操作的技术，它们在不同场景下各有优劣。

## mmap和 sendfile

1. mmap（内存映射）
    - 优点:
        - 零拷贝：mmap将文件直接映射到进程的地址空间，从而实现了文件内容与内存之间的零拷贝。数据不需要通过用户空间，减少了数据复制和上下文切换的开销。
        - 随机访问：mmap适合处理需要随机访问大文件的场景，因为它允许对文件的任意部分进行直接访问。
        - 节省内存：对于只读文件，多个进程可以共享同一块物理内存，避免了不必要的内存开销。
    - 缺点:

        - 潜在的页面故障：如果访问的文件部分不在内存中，会导致页面故障（Page Fault），需要从磁盘读取数据，可能会影响性能。
        - 复杂的管理：mmap的使用需要小心管理映射的生命周期和内存同步问题，尤其是在多线程或多进程环境中。
        - 不适合小文件或短生命周期数据：mmap的初始化开销相对较高，不适合处理大量的小文件或短期数据。
2. sendfile
    - 优点:

        - 高效传输：sendfile在内核空间直接将数据从文件描述符传输到网络套接字，无需在用户空间进行数据拷贝，减少了上下文切换和内存拷贝的开销。
        - 减少内存开销：数据不经过用户空间，减少了内存占用和数据复制的开销，适合处理大文件的网络传输。
    - 缺点:

        - 局限性：sendfile主要用于将文件数据直接传输到网络连接，不能用于内存到文件或文件到文件的复制操作。
        - 不可修改数据：sendfile的传输是不可变的，无法在传输过程中修改数据内容。

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