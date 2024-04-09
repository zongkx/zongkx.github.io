## 多个workbook zip

`easypoi`

```java
public void export(@RequestBody @Valid List<DataLoadVo> dtos, HttpServletRequest request, HttpServletResponse response) {
    log.debug("args:{}", JSON.toJSONString(dtos));
    Long userId = Long.valueOf(request.getHeader(Constants.X_HEADER_AGENT_USER_ID));
    response.setCharacterEncoding("UTF-8");
    response.setContentType("application/octet-stream");
    List<Workbook> list = new ArrayList<>();//生成
    for (DataLoadVo dto : dtos) {
        List<TopicRespVo> topicRespVos = dataLoadService.simpleLoad(dto, userId);//数据查询
        Workbook workbook = new XSSFWorkbook();
        for (TopicRespVo topicRespVo : topicRespVos) {
            final String sheetName = "sheetName";
            ExportParams exportParams = new ExportParams();
            exportParams.setSheetName(sheetName);
            exportParams.setAutoSize(true);
            List<ExcelExportEntity> entityList = new ArrayList<>();
            for (MeasureDimension key : topicRespVo.getKeys()) {
                entityList.add(new ExcelExportEntity(key.getTitle(), key.key()));
            }
            ExcelExportService service = new ExcelExportService();
            List<Map<String, Object>> data = topicRespVo.getData();
            service.createSheetForMap(workbook, exportParams, entityList,
                    CollectionUtil.isEmpty(data) ? Lists.newArrayList(new HashMap<>()) : data);
        }
        list.add(workbook);
    }
    if (list.size() == 1) {//如果只有一个excel ,则不需要压缩
        response.setHeader("Content-Disposition", "attachment;filename="
                + URLEncoder.encode("report.xls", "UTF-8"));
        list.get(0).write(response.getOutputStream());
    } else {//
        String zipName = "report.zip";
        response.setHeader("Content-disposition", "attachment;filename=" + zipName + ";");
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream);
        OutputStream outputStream = response.getOutputStream();
        int i = 0;
        for (Workbook workbook : list) {
            zipOutputStream.putNextEntry(new ZipEntry(i + ".xlsx"));
            workbook.write(zipOutputStream);
            zipOutputStream.closeEntry();
            i++;
        }
        zipOutputStream.finish();
        IOUtils.write(byteArrayOutputStream.toByteArray(), outputStream);
        outputStream.flush();
        byteArrayOutputStream.close();
        outputStream.close();
    }
}

```

## POI导出到模板

### 需求

最近连续两个需求都是:导出的Excel能直接再导入到系统中,而导入功能依赖于导入模板，今天写了一个通用的方法，可以先读取系统本地的导入模板，再写入数据生成一个文件供用户下载。

> 首先添加一条导入导出任务，保存导出生成的文件的服务器地址和该任务的其它信息，在文件生成完成后，将该任务记录设置为已完成，用户根据该任务记录的文件信息下载即可，这样可以优化文件生成过慢的弊端

### 思路

导入模板的第一行作为数据标识，可以通过反射来到对应的位置填写数据。不同的sheet页写入的数据可能不一样，所以考虑用Map作为数据容器，

> Map<Integer, List> map


其中Integer不仅作为key，而且直接就能用来表示这个list需要填入的sheet[index]

### 代码

下面用的是POI的XSSFWorkbook用来读取生成xlsx文件。

```xml

<dependencies>
    <!-- https://mvnrepository.com/artifact/org.apache.poi/poi -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>4.0.0</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.apache.poi/poi-ooxml -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>4.0.0</version>
    </dependency>
</dependencies>
```

```java
package com.demo.utils;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ExportExcelUseTemplate<T> implements Serializable {

    private String tempPath;

    private String tempName;

    private String fileName;

    private String filePath;

    private Map<Integer, List<T>> map;

    private XSSFWorkbook wb;

    private ExportExcelUseTemplate() {
    }

    public ExportExcelUseTemplate(String tempPath, String tempName,
                                  String filePath, String fileName, Map<Integer, List<T>> map) {
        this.tempPath = tempPath;
        this.tempName = tempName;
        this.filePath = filePath;
        this.fileName = fileName;
        this.map = map;
    }

    protected void export() {
        readTemplate();
        writeData();
        createFile();
    }

    protected void readTemplate() {
        try {
            FileInputStream fileInputStream = new FileInputStream(this.tempPath + this.tempName);
            this.wb = new XSSFWorkbook(fileInputStream);
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void writeData() {
        for (Integer index : map.keySet()) {
            if (map.get(index).isEmpty()) {
                continue;
            }
            XSSFSheet sheet = wb.getSheetAt(index - 1);//第index-1个sheet
            XSSFRow row = sheet.getRow(0);
            List<T> list = map.get(index);
            sheet.shiftRows(3, 3 + list.size(), list.size());//从第三行开始,结束与size+3,动态添加size行
            for (int i = 0; i < list.size(); i++) {//遍历数据
                XSSFRow createRow = sheet.createRow(3 + i);
                for (int j = 0; j < row.getLastCellNum(); j++) {//遍历key再通过反射写入数据(导入模板的第一行作为数据标识)
                    try {
                        String key = row.getCell(j).getStringCellValue();
                        String value = getMethod(list.get(i), key);//根据key找到对象中对应的值
                        createRow.createCell(j).setCellValue(value);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private void createFile() {
        try {
            File dir = new File(this.filePath);
            if (!dir.exists()) {
                dir.mkdir();
            }
            FileOutputStream fileOutputStream = new FileOutputStream(this.filePath + this.fileName);
            this.wb.write(fileOutputStream);
            fileOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getMethod(T t, String key) throws Exception {
        Class<?> clazz = t.getClass();
        PropertyDescriptor pd = new PropertyDescriptor(key, clazz);
        Method getMethod = pd.getReadMethod();
        Object o = getMethod.invoke(t);
        if (o instanceof Date) {
            SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
            return o == null ? "" : sd.format(o);
        }
        return o == null ? "" : o.toString();
    }

}
```
