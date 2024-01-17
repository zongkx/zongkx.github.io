## docker
```java
docker pull yandex/clickhouse-server


docker run -d -p 8123:8123 -p 9000:9000 --name clickhouse yandex/clickhouse-server
```
## dbeaver
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1650447408983-706a211e-f703-462f-a831-82cbd3d1d878.png#clientId=ufe60f537-602f-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=539&id=ue7e3c4b4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=539&originWidth=681&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39006&status=done&style=none&taskId=u3b23c0cf-45db-4f4c-8c96-e38eb879461&title=&width=681)

## 连接MySQL

- 可以查询
- 可以插入(远程插入)
- 不可以删除和更新
- where条件以外都会在clickhouse server中计算

> 1. 设置 mysql日志
> 
SET GLOBAL general_log=ON;
> SET GLOBAL log_output='TABLE';
> select * from mysql.general_log gl 
> 2. clickhouse执行 
> 
select * from test1 where id  in( '1','2') order by id desc  limit 2
> 3. 查看query记录
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
```java
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
    public void a1 (){
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
