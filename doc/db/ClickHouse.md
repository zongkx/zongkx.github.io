## doc

- [官方](https://clickhouse.com/docs/zh/sql-reference/syntax/)

## Docker

```shell
docker pull yandex/clickhouse-server
docker run -d -p 8123:8123 -p 9000:9000 --name clickhouse yandex/clickhouse-server
```

## 连接MySQL

- 可以查询
- 可以插入(远程插入)
- 不可以删除和更新
- where条件以外都会在clickhouse server中计算

1. 设置 mysql日志
   > SET GLOBAL general_log=ON;
   > SET GLOBAL log_output='TABLE';
   > select * from mysql.general_log gl
2. clickhouse执行
   > select * from test1 where id in( '1','2') order by id desc limit 2
3. 查看query记录

>
select * from mysql.general_log gl
> 记录如下   
> SELECT `id` FROM `test`.`demo` WHERE `id` IN ('1', '2')

```sql
-- create table
CREATE table test1(
  `id` String  
)ENGINE = MySQL('39.97.243.43:3306','test','demo','root','123456a')

select * from test1
insert into test1 values('12')

-- cras
create table test2 
ENGINE = Log
AS
select * from  mysql('39.97.243.43:3306','test','demo','root','123456a')
```

## JDBC

```xml

<dependency>
    <groupId>ru.yandex.clickhouse</groupId>
    <artifactId>clickhouse-jdbc</artifactId>
    <version>0.3.2</version>
</dependency>
```

```java

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ClickHouse {
    @Test
    @SneakyThrows
    public void a1() {
        Class.forName("ru.yandex.clickhouse.ClickHouseDriver");
        Connection connection = DriverManager.getConnection("jdbc:clickhouse://192.168.203.128:8123");
        Statement statement = connection.createStatement();
        String sql = "select * from default.test1";
        ResultSet rs = statement.executeQuery(sql);
        while (rs.next()) {
            System.out.println(rs.getString(1));
        }
    }

    @Test
    @SneakyThrows
    public void a2() {

        String url = "jdbc:clickhouse://192.168.203.128:8123";
        Properties properties = new Properties();
        ClickHouseDataSource dataSource = new ClickHouseDataSource(url, properties);
        try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery("select * from default.test1")) {
            while (rs.next()) {
                System.out.println(rs.getString(1));
            }
        }
    }
}


```
