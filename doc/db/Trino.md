## 最小安装

```yaml
version: '3'
# cd opt/trino/
# docker run -d -p 28443:8443 -p 28081:8080 -v .:/etc/trino --restart always --name trino trinodb/trino:435
services:
  trino:
    image: trinodb/trino:435
    ports:
      - 28443:8443
      - 28081:8080
    volumes:
      - .:/etc/trino
```

## 详细安装

- 配置 mysql `vim /opt/trino/catalog/mysql.properties`

    ``` properties
    connector.name=mysql
    connection-url=jdbc:mysql://127.0.0.1:3306
    connection-user=root
    connection-password=123456                          
    ```
- 配置 memory`vim /opt/trino/catalog/memory.properties`

    ``` properties
    connector.name=memory
    #内存库大小
    memory.max-data-per-node=1024MB                       
    ```
- 配置config.properties `vim /opt/trino/config.properties`

    ```properties
    coordinator=true
    node-scheduler.include-coordinator=true
    http-server.http.port=8080
    discovery.uri=http://localhost:8080
    # 认证类型 密码
    http-server.authentication.type=PASSWORD
    # 密码认证文件位置
    password-authenticator.config-files=/etc/trino/password-authenticator.properties
    http-server.authentication.allow-insecure-over-http=true
    http-server.https.enabled=true
    http-server.https.port=8443
    # openssl生成的jks文件
    http-server.https.keystore.path=/etc/trino/jwt2.jks 
    # 生成jks的密令
    http-server.https.keystore.key=123456 
    ```
- 生成jks文件(密码同上 123456)
    ```cmd
    keytool -genkey -dname "CN=HOSTNAME.ZKX.BIZ,OU=SD DC,O=OP Compliance,L=LO,S=TO,C=VO,EMAILADDRESS=zongkuoxiong@qq.com" -alias trino -keyalg RSA -keysize 2048 -keystore jwt2.jks -validity 730 -ext SAN=dns:Hostname.myazure.biz,ip:127.0.0.1
    ```
- openssl生成 password.db `vim /etc/trino/password.db`
    ```db
        test:$2y$10$l5OEaMFo.EW8weOCkG7Mx.gvLeCdoUDGny2qo/Qri6zwKTbej.6CC
    ```
- 配置密码文件路径`vim /etc/trino/password-authenticator.properties`
    ```properties
       password-authenticator.name=file
       file.password-file=/etc/trino/password.db
    ```

- 配置jvm.config `vim /etc/trino/jvm.config`
    ```config
    -server
    -Xmx4G
    -XX:InitialRAMPercentage=80
    -XX:MaxRAMPercentage=80
    -XX:G1HeapRegionSize=32M
    -XX:+ExplicitGCInvokesConcurrent
    -XX:+ExitOnOutOfMemoryError
    -XX:+HeapDumpOnOutOfMemoryError
    -XX:-OmitStackTraceInFastThrow
    -XX:ReservedCodeCacheSize=512M
    -XX:PerMethodRecompilationCutoff=10000
    -XX:PerBytecodeRecompilationCutoff=10000
    -Djdk.attach.allowAttachSelf=true
    -Djdk.nio.maxCachedBufferSize=2000000
    -Dfile.encoding=UTF-8
    -XX:+UnlockDiagnosticVMOptions
    -XX:GCLockerRetryAllocationCount=32
  ```

- 配置 node.properties `vim /etc/trino/node.properties`
    ```properties
    node.environment=docker
    node.data-dir=/data/trino
    ```

## 函数

```sql
-- 计算日期差
    select date_diff('day',begintime,endtime) from table;

-- 计算百分比
    format('%.2f', (CAST(count(if(gender =1 ,1,null)) AS double) / CAST(count(*) AS double)) * 100  )
  
-- sum null-->0
   SUM(COALESCE(num, 0))

```

## JSON解析

```sql
select aaa0, t.aaa1, t.aaa2 from 
(select  aaa0, 
	 cast(json_parse(aaa1) as array(varchar)) as aaa1 , 
	 cast(json_parse(aaa2) as array(varchar)) as aaa2  
 from ( 
	  select  
	 	json_query(jsons, 'lax $.uid')  aaa0 ,  
	 	json_query(jsons, 'lax $.did[*].a[*]' with array wrapper)  aaa1 , 
	 	json_query(jsons, 'lax $.cid[*]' with array wrapper)  aaa2  
	  from 
	 	( select json_format(t.jsons) jsons from (
				 select cast(json_parse(jsons) as array(json) ) jsons
				    from ( select '[{"uid":2,"did":[{"a":[1,2,3]}],"cid": [1,2,3,5]}]' as jsons, 1 as id where  1=1 )
			)cross join unnest(jsons) as t(jsons)
		)
	 )
) CROSS JOIN UNNEST(aaa1, aaa2) AS t(aaa1, aaa2)
```

## LOGS

```sql
 show columns from system.runtime.queries;

select * from system.runtime.queries;
```

## 构建日期表

```sql
  select t.seq as id ,
  date_format(date '2019-01-01' + INTERVAL '1' MONTH * t.seq, '%Y-%m') AS year_month 
  from ( SELECT sequence(0, 120) AS seq) a 
  cross join unnest(seq) as t(seq)
  where 
   date '2019-01-01' + INTERVAL '1' MONTH * t.seq 
   < date_trunc('month', current_date + INTERVAL '1' YEAR)

```