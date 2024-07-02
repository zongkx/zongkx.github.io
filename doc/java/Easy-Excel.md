## 依赖

```
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>easyexcel</artifactId>
            <version>3.3.4</version>
        </dependency>
```

## list<map> 导出并压缩

```java
   private List<List<Object>> dataList() {
    List<List<Object>> list = ListUtils.newArrayList();
    for (int i = 0; i < 90000; i++) {
        List<Object> data = ListUtils.newArrayList();
        data.add("字符串" + i);
        data.add(0.56);
        data.add((new Date()));
        list.add(data);
    }
    return list;
}
```

```java

@Test
@SneakyThrows
void a1() {
    FileOutputStream fos = new FileOutputStream("aaa.zip");
    ZipOutputStream zipOut = new ZipOutputStream(fos);
    for (int i = 0; i < 2; i++) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ExcelWriter excelWriter = null;
        try {
            ExcelWriterBuilder builder = EasyExcel.write(byteArrayOutputStream).autoCloseStream(false)
                    .registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
                    .excelType(ExcelTypeEnum.XLSX)
                    .charset(StandardCharsets.UTF_8);
            excelWriter = builder.build();
            zipOut.putNextEntry(new ZipEntry("aaa" + i + ".xlsx"));
            WriteSheet writeSheet = EasyExcel.writerSheet("aaa" + i).head(head()).build();
            excelWriter.write(dataList(), writeSheet);
        } catch (Exception e) {
            throw new RuntimeException("导出Excel异常", e);
        } finally {
            if (excelWriter != null) {
                excelWriter.finish();
            }
        }
        byteArrayOutputStream.writeTo(zipOut);
        zipOut.closeEntry();
    }
    fos.flush();
}
```

over