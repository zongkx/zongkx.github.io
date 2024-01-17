### 简介 

QuestDB 是一个面向关系列的数据库，专为时间序列和事件数据而设计.

特点: 快/兼容PostgreSQL 的 wire 协议，也兼容 InfluxDB Line 协议

用途: 基于ts的快照存储,高性能查询检索.

### 安装

```
docker pull questdb/questdb
```

```
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 questdb/questdb
```

### 客户端

web console: `http://192.168.203.128:9000/`

不支持dbeaver: 关键字`is`不支持

### Java

```java
    @Test
    public void ag2 () throws SQLException, ClassNotFoundException {
        Class.forName("org.postgresql.Driver");
        Connection connection = DriverManager.getConnection("jdbc:postgresql://192.168.203.128:8812/qdb?sslmode=disable", "admin", "quest");
        Statement stmt = connection.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT count(*) from TABLES");
        while(rs.next()){
            System.out.println(rs.getString("count"));
        }
    }
```

### 其它

1. 没有类似pg的information_schema存储表信息

`TABLES`替代:`select * from TABLES`

2.  表的元数据信息

`SELECT * from table_columns('telemetry')` 

### 文档

[doc](https://questdb.io/docs/introduction)
