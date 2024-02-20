## 简介

http://duckdb.org/

## 元数据

> SELECT CATALOG_NAME,SCHEMA_NAME from information_schema.schemata

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

直接安装
> install mysql_scanner
> load mysql_scanner
> 或者手动下载改压缩文件到 {用户}\.duckdb\extensions\v0.9.2\windows_amd64\
> http://extensions.duckdb.org/v0.9.2/windows_amd64/mysql_scanner.duckdb_extension.gz
> http://extensions.duckdb.org/v0.9.2/linux_amd64_gcc4/mysql_scanner.duckdb_extension.gz

```sql
 ATTACH 'host=localhost password=password user=root port=3306 database=demo' AS mysqldb (TYPE mysql) 

```