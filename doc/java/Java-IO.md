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