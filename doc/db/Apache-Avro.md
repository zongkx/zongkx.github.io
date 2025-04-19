## 读写

```xml

<dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro</artifactId>
    <version>1.12.0</version>
</dependency>
```

```xml

<dependency>
    <groupId>org.duckdb</groupId>
    <artifactId>duckdb_jdbc</artifactId>
    <version>1.2.1</version>
</dependency>
```

```java

@Data
public class Employee {
    private String name;
    private int employeeId;
    private String department;

    // 必须有无参构造函数
    public Employee() {
    }

    // getters和setters
    // 省略...
}
```

```java
package a;

import org.apache.avro.Schema;
import org.apache.avro.file.CodecFactory;
import org.apache.avro.file.DataFileReader;
import org.apache.avro.file.DataFileWriter;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericDatumWriter;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.io.Encoder;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.io.JsonEncoder;
import org.apache.avro.reflect.ReflectData;
import org.apache.avro.reflect.ReflectDatumWriter;
import org.duckdb.DuckDBConnection;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.*;

public class ReflectAvroWriter2 {
    public static void main(String[] args) throws Exception {
        // Define the ReflectDatumWriter with the Employee class
        DatumWriter<Employee> writer = new ReflectDatumWriter<>(Employee.class);

        // Get the Avro schema for the Employee class
        Schema schema = ReflectData.get().getSchema(Employee.class);

        // Create an Employee instance and set its properties


        // Create a file to write the Avro data
        File file = new File("employee.avro");

        // Create a DataFileWriter to write the Employee data to the file
        try (DataFileWriter<Employee> dataFileWriter = new DataFileWriter<>(writer)) {
            // Check if the file already exists
            if (file.exists()) {
                // Append to the existing file
                dataFileWriter.appendTo(file);
            } else {
                // Create a new file with the schema
                dataFileWriter.create(schema, file);
            }
            for (int i = 0; i < 100000; i++) {
                Employee emp1 = new Employee();
                emp1.setName("王五");
                emp1.setEmployeeId(i);
                emp1.setDepartment("研发部");
                dataFileWriter.append(emp1);
            }
        }
        System.out.println("Employee data successfully written to employee.avro");

        Properties props = new Properties();
        props.setProperty("memory_limit", "200MB");
        DuckDBConnection duckConnection = (DuckDBConnection) DriverManager.getConnection("jdbc:duckdb:", props);
        try (Statement statement = duckConnection.createStatement()) {
            statement.execute("INSTALL avro FROM community");
        }
        try (Statement statement = duckConnection.createStatement()) {
            statement.execute("LOAD avro");
        }
        try (Statement statement = duckConnection.createStatement();
             ResultSet resultSet = statement.executeQuery("select * from  " +
                     " read_avro('C:\\dev\\code\\duckdb_mem\\employee.avro'); ")) {
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columns = metaData.getColumnCount();
            List<Map<String, Object>> result = new ArrayList<>();
            while (resultSet.next()) {
                Map<String, Object> rowMap = new HashMap<>(columns);
                for (int j = 1; j <= columns; ++j) {
                    rowMap.put(metaData.getColumnName(j), resultSet.getObject(j));
                }
                result.add(rowMap);
            }
            System.out.println(result);
        }
    }
}
```
