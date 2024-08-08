## 递归删除

```java
        try (Stream<Path> walk = Files.walk(Paths.get(deleteFile))) {
            walk.sorted(Comparator.reverseOrder()).forEach(this::deleteDirectoryStream);
        } catch (IOException e) {
            log.error(" delete error ", e);
        }
```

## 序列化并压缩

```java
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.zip.GZIPOutputStream;
import java.util.Base64;
import java.util.Arrays;

public class StreamSerializationUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final JsonFactory jsonFactory = new JsonFactory(objectMapper);

    // 流式序列化对象集合为JSON字符串并进行GZIP压缩
    public static String serializeAndCompress(List<Object> objectList) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (GZIPOutputStream gzipOutputStream = new GZIPOutputStream(byteArrayOutputStream);
             JsonGenerator jsonGenerator = jsonFactory.createGenerator(gzipOutputStream)) {

            // 开始数组
            jsonGenerator.writeStartArray();

            // 写入对象
            for (Object obj : objectList) {
                objectMapper.writeValue(jsonGenerator, obj);
            }

            // 结束数组
            jsonGenerator.writeEndArray();
        }

        // 将压缩后的字节数组转换为Base64编码的字符串
        return Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray());
    }

    // 解压缩并反序列化为对象集合
    public static List<Object> decompressAndDeserialize(String compressedString, Class<Object[]> clazz) throws IOException {
        byte[] compressedBytes = Base64.getDecoder().decode(compressedString);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (GZIPInputStream gzipInputStream = new GZIPInputStream(new ByteArrayInputStream(compressedBytes))) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = gzipInputStream.read(buffer)) > 0) {
                byteArrayOutputStream.write(buffer, 0, len);
            }
        }

        String jsonString = byteArrayOutputStream.toString();
        Object[] objectArray = objectMapper.readValue(jsonString, clazz);
        return Arrays.asList(objectArray);
    }

    public static void main(String[] args) throws IOException {
        // 示例对象集合
        List<Object> objectList = List.of("item1", "item2", "item3");

        // 序列化并压缩
        String compressedString = serializeAndCompress(objectList);
        System.out.println("Compressed String: " + compressedString);

        // 解压缩并反序列化
        List<Object> deserializedList = decompressAndDeserialize(compressedString, Object[].class);
        System.out.println("Deserialized List: " + deserializedList);
    }
}


```

## ZIP

```java
    //将list中的数据一行一行写到指定文件中,并分割文件压缩为zip
public static <T> String fileWriterList0(String path, String fileName, int pageSize, List<T> list) {
    int size = list.size();
    int total = size / pageSize == 0 ? 1 : size / pageSize + 1;
    String zipName = fileName + ".zip";
    String txtName = fileName + ".txt";
    try {
        ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(path + zipName));
        File[] files = new File[total];
        byte[] bytes = new byte[1024];
        for (int i = 0; i < total; i++) {
            String temp = path + "_" + i + "_" + txtName;
            files[i] = new File(temp);
            FileOutputStream fileOutputStream = new FileOutputStream(temp);
            FileInputStream fileInputStream = new FileInputStream(files[i]);
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(fileOutputStream, StandardCharsets.UTF_8));
            int z = (i + 1) * pageSize - 1;
            for (int k = i * pageSize; z >= size ? k < size : k < z; k++) {
                bufferedWriter.write(list.get(k).toString());
                bufferedWriter.newLine();
                bufferedWriter.flush();
            }
            bufferedWriter.close();
            zipOutputStream.putNextEntry(new ZipEntry(files[i].getName()));
            int len;
            while ((len = fileInputStream.read(bytes)) > 0) {
                zipOutputStream.write(bytes, 0, len);
            }
            fileInputStream.close();
            fileOutputStream.close();
            zipOutputStream.closeEntry();
            if (files[i].exists()) {
                files[i].delete();
            }
        }
        zipOutputStream.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
    return path + zipName;
}
```

## CSV

### 依赖

```xml

<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-csv</artifactId>
    <version>1.7</version>
</dependency>
```

### 代码

```java
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;

public class CsvFileWriter {

    private final long maxRecords;
    private final Path fileDirectory;
    private final Supplier<String> fileNameSupplier;
    private final List<String> headerFields;
    private volatile CSVPrinter csvPrinter;
    private long recordCount = 0;


    public CsvFileWriter(long maxRecords, Path fileDirectory, Supplier<String> fileNameSupplier,
                         List<String> headerFields) throws IOException {
        this.maxRecords = maxRecords;
        this.fileDirectory = fileDirectory;
        this.fileNameSupplier = fileNameSupplier;
        this.headerFields = headerFields;
        if (!Files.exists(fileDirectory)) {
            Files.createDirectories(fileDirectory);
        }
    }

    public void writeRecord(List<Object> fieldValues) throws IOException {
        if (csvPrinter == null) {
            String fileName = Optional.ofNullable(fileNameSupplier).map(Supplier::get).orElse(UUID.randomUUID().toString());
            this.csvPrinter = new CSVPrinter(new BufferedWriter(new FileWriter(fileDirectory.resolve(fileName).toFile())), CSVFormat.DEFAULT
                    .withHeader(headerFields.toArray(new String[0])).withQuoteMode(QuoteMode.ALL));
        }
        this.csvPrinter.printRecord(fieldValues);
        recordCount++;
        if (recordCount > maxRecords) {
            close();
        }
    }

    public void close() throws IOException {
        if (this.csvPrinter != null) {
            this.csvPrinter.flush();
            this.csvPrinter.close();
            this.csvPrinter = null;
        }
        recordCount = 0;
    }
}
```

```java

@Test
@SneakyThrows
public void aaaaa() {

    CsvFileWriter name = new CsvFileWriter(100, Paths.get("D:\\"), () -> "aaa.csv", Arrays.asList("name", "name2"));

    name.writeRecord(Arrays.asList(Arrays.asList("1", "2"), Arrays.asList("2", "2")));
    name.writeRecord(Arrays.asList(Arrays.asList("3", "2"), Arrays.asList("4", "2")));

    name.close();
}
```