## 简介

(*)[http://duckdb.org/]

(doc)[https://sekuel.com/sql-courses/duckdb-cookbook/]

(demo)[https://taki-mekhalfa.github.io/misc/2024/04/14/beauty_of_olap_sql.html]

## dialect

由于`duckdb` 元数据表中物理表的`table type`是 `BASE TABLE`, `jpa dialect` 默认只用了 `TABLE`,所以需要扩展

参见`org.hibernate.tool.schema.extract.internal.InformationExtractorJdbcDatabaseMetaDataImpl#processSchemaResultSet`

`org.hibernate.tool.schema.extract.internal.AbstractInformationExtractorImpl#AbstractInformationExtractorImpl`

```java
public class DuckDBDialect extends PostgreSQL10Dialect {
    @Override
    public String getQuerySequencesString() {
        return "select * from pg_catalog.pg_sequences";
    }

    /**
     * duckdb 元数据 物理表标识为 BASE TABLE
     *
     * @param tableTypesList 元数据表类型
     */
    @Override
    public void augmentPhysicalTableTypes(List<String> tableTypesList) {
        tableTypesList.add("BASE TABLE");
    }
}

```

```java

@Test
@SneakyThrows
void aaaa() {
    DuckDBConnection conn = (DuckDBConnection) DriverManager.getConnection("jdbc:duckdb:1.duckdb");
    DatabaseMetaData metaData = conn.getMetaData();
    ResultSet resultSet = metaData
            .getTables(null,
                    "main",
                    "%", new String[]{"TABLE", "VIEW", "BASE TABLE"});
    while (resultSet.next()) {
        System.out.println(resultSet.getString(1));
        System.out.println(resultSet.getString(2));
        System.out.println(resultSet.getString(3));
    }
}
```

## 常用函数

```sql
  SELECT round(5/3,4)*100

  SELECT ((JSON '{"field": "42"}')->'field')  ;
  
  SELECT '2020-01-01 20:01:01' ::timestamptz

  SELECT json_extract_string(json '{"detail":"","title":""}', '$.title') 

   SELECT strftime( '2024-02-02 00:00:00'::timestamp,'%Y-%m') 
```

## 如何把重复的参数给变量化

```sql
-- 只需要把 '2024-03-01'和'2024-12-31'使用占位符替换,即可实现注入两个参数满足多个地方使用的需要
WITH date_range AS (
    SELECT 
        CAST('2024-03-01' AS DATE) AS t1, 
        CAST('2024-12-31' AS DATE) AS t2
),aaa as (select 1)
SELECT *
FROM a
LEFT JOIN  b  on a.bid =b.id
JOIN date_range ON TRUE
WHERE a.createdtime >= date_range.t1
    AND a.createdtime < date_range.t2
    AND b.entrytime <= date_range.t2
    AND (b.leavetime is null or b.leavetime >= date_range.t1)

```

## 元数据

> SELECT CATALOG_NAME,SCHEMA_NAME from information_schema.schemata

## CSV

```sql
-- 输出csv
COPY  demo TO 'output.csv' (HEADER, DELIMITER ',');

```

## MINIO

```sql
INSTALL httpfs; -- 安装httpfs模块
LOAD httpfs; -- 加载

INSTALL json;
LOAD json;

SET s3_use_ssl = false;
SET s3_endpoint = '127.0.0.1:9000';
SET s3_region='us-east-1';
SET s3_url_style='path';
SET s3_access_key_id='ZWbwJLKfMvUD3amROPry' ;
SET s3_secret_access_key='u3G4QYOjTAy44ySbCU3dWXoKJPODSNX9aTVFSCH0';


-- 上传mock json文件到minio的桶demo中
create table demo as
SELECT * FROM read_json_auto
    ('s3://demoi/mock_2.json',
    maximum_object_size=104857600);
    
```

## JSON

```sql
 select id,  unnest(deptid), userid from (
 		select id,  (json_extract(value, '$.deptId[*]' ))  deptid ,  
 		 json_extract(value, '$.uid')  userid 
 		 from (select id, unnest( from_json (value, '["JSON"]' )) as value from
 			(select '[{"deptId":[ 1,2],"uid":1}]' as value, 1 as id )
		    ))
```

## mysql_scanner

- install mysql_scanner
- load mysql_scanner
- 手动下载改压缩文件到 {用户}\.duckdb\extensions\v0.9.2\windows_amd64\
    - http://extensions.duckdb.org/v0.9.2/windows_amd64/mysql_scanner.duckdb_extension.gz
    - http://extensions.duckdb.org/v0.9.2/linux_amd64_gcc4/mysql_scanner.duckdb_extension.gz
    - http://extensions.duckdb.org/v0.9.2/linux_amd64/mysql_scanner.duckdb_extension.gz

```sql
 ATTACH 'host=localhost password=password user=root port=3306 database=demo' AS mysqldb (TYPE mysql) 

```

## 日志文件分析

```sql
 SELECT * from (
SELECT row_number() over() as index,
 content,
FROM ( 
  SELECT  * FROM read_csv('C:\logs\temp.log', delim = '' ,columns = {'content': 'VARCHAR'})
    )
  as t
 ) where content ilike concat('%', '' ,'%') order by index desc limit 100 offset 10

```

## 计算数据平均更新时间

```sql
CREATE TABLE memory.main.aaa (
	id INTEGER,
	ts TIMESTAMP
);

 SELECT AVG(delta) * 24 * 60  as average_interval
FROM (
    SELECT ts, LAG(ts) OVER (ORDER BY ts) as prev_ts,
    JULIAN(ts) - JULIAN(LAG(ts) OVER (ORDER BY ts)) as delta
    FROM memory.main.aaa
)
WHERE delta IS NOT NULL

```

## 全球区域处理

(source)[https://github.com/dr5hn/countries-states-cities-database]

利用`duckdb`进行json解析,并把解析后的结果插入到mysql的 sys_area表中,作为初始化数据

```sql
-- json文件读取
create table main.city as
SELECT * FROM read_json_auto('C:\Users\zongkuoxiong\Downloads\download.json',maximum_object_size=104857600);
-- 解析json值
 create table main.cpc  as   select id,name, json_extract_string(UNNEST (city),'$.id') as cityid,
     json_extract_string(UNNEST (city),'$.name') as city1 ,
 	json_extract_string(states,'$.name') states1 ,
 	json_extract_string(states,'$.id') statesid 
 	from (
 		SELECT 
		 from_json (unnest(states)-> 'cities', '["JSON"]' )  as city,
		 unnest(states) states,iso2,name,id from main.city  -- where iso2 = 'CN'  
   	) 
-- 写入相关数据
   insert into mysql.demo.sys_area (id,name,code,chain,i18n)  
   select DISTINCT (id),name, name as code ,id as chain,id as i18n from main.cpc

   insert into mysql.demo.sys_area (id,name,code,chain,i18n)  
   select DISTINCT (id||statesid)as id,states1, states1 as code ,
   id||','||statesid as chain,id||','||statesid as i18n from main.cpc

   
  insert into mysql.demo.sys_area (id,name,code,chain,i18n)  
  select DISTINCT (id||statesid||cityid)as id,city1, city1 as code ,
  id||','||statesid||','||cityid as chain,id||','||statesid||','||cityid as i18n from main.cpc
```

