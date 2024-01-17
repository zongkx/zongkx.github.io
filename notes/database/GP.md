[https://greenplum.docs.pivotal.io/6-0/main/index.html](https://greenplum.docs.pivotal.io/6-0/main/index.html)
[https://www.bookstack.cn/read/greenplum-admin_guide-6.0-zh/9ccd913ea8be24b9.md](https://www.bookstack.cn/read/greenplum-admin_guide-6.0-zh/9ccd913ea8be24b9.md)
## PXF访问外部数据
[https://greenplum.docs.pivotal.io/6-0/admin_guide/external/pxf-overview.html](https://greenplum.docs.pivotal.io/6-0/admin_guide/external/pxf-overview.html)
## 分布 DISTRIBUTED  
 - 数据分布是在物理上拆分表数据，将数据打散到各个节点，使数据可以并行计算，这在Greenplum中是必须的。  
- 表分区是在逻辑上拆分大表的数据提高查询性能，也有利于数据生命周期的管理，这在Greenplum中是可选的。  

> 查询各个分区数据量
> select gp_segment_id,count(*) from tab_name  group by gp_segment_id order by count(*) desc

> 调整分区字段
> alter table tab_name set distributed by (字段，字段);


> create table 选择随机分区字段
> CREATE TABLE zkx  (
> 	id varchar(200),
> 	name varchar(200)
> )
> DISTRIBUTED RANDOMLY;



## 分区 partition
### 什么时候使用分区表
是否使用分区表，可以通过以下几个方面进行考虑：

- **表数据量是否足够大**：通常对于大的事实表，比如数据量有几千万或者过亿，我们可以考虑使用分区表，但数据量大小并没有一个绝对的标准可以使用，一般是根据经验，以及对目前性能是否满意。
- **表是否有合适的分区字段**：如果数据量足够大了，这个时候我们就需要看下是否有合适的字段能够用来分区，通常如果数据有时间维度，比如按天，按月等，是比较理想的分区字段。
- **表内数据是否具有生命周期**：通常数仓中的数据不可能一直存放，一般都会有一定的生命周期，比如最近一年等，这里就涉及到对旧数据的管理，如果有分区表，就很容易删除旧的数据，或者将旧的数据归档到[对象存储](https://cloud.tencent.com/product/cos?from=10680)等更为廉价的存储介质上。
- **查询语句中是否含有分区字段**：如果你对一个表做了分区，但是所有的查询都不带分区字段，这不仅无法提高性能反而会使性能下降，因为所有的查询都会扫描所有的分区表。
```java
CREATE TABLE test_range_partition_every_1 
(
    uid int, 
    fdate date
) 
partition by range (fdate) 
(
    PARTITION pn START ('2018-11-01'::date) END ('2018-12-01'::date) EVERY ('1 day'::interval), 
    DEFAULT PARTITION pdefault
);
```

## Heap / AO

- Heap 表：这种存储格式是从 PostgreSQL 继承而来的，目前是 GP 默认的表存储格式，只支持行存储。
- AO 表：  AO 表最初设计是只支持 append 的（就是只能 insert ），因此全称是Append-Only，在4.3之后进行了优化，目前已经可以 update 和 delete 了，全称也改为 Append-Optimized。AO 支持行存储（AORO）和列存储（AOCO）。
### heap
Heap 表是从 PostgreSQL 继承而来，使用 MVCC 来实现一致性。如果你在创建表的时候没有指定任何存储格式，那么 GP 就会使用 Heap 表。
Heap 表支持分区表，只支持行存，不支持列存和压缩。需要注意的是在处理 update 和 delete 的时候，Heap 表并没有真正删除数据，而只是依靠 version 信息屏蔽老的数据，因此如果你的表有大量的 update 或者 delete，表占用的物理空间会不断增大，这个时候需要依靠 vacuum 来清理老数据。
Heap 表不支持逻辑增量备份，因此如果要对 Heap 表做快照，每次都需要导出全量数据。

- _如果该表是一张小表，比如数仓中的维度表，或者数据量在百万以下，推荐使用 Heap 表。_
- _如果该表的使用场景是 OLTP 的，比如有较多的 update 和 delete，查询多是带索引的点查询等，推荐使用 Heap 表。_
### AO
 对于有大量 update 和 delete 的 AO 表，同样需要 vacuum 进行维护，不过在 AO 表中， vacuum 需要对 bitmap 进行重置并压缩物理文件，因此通常比 Heap 的 vacuum 要慢。  

![](https://gitee.com/zongkx/pic-go/raw/master/202211111558123.png)
```sql
CREATE TABLE zkx (
  id varchar(200),
  name varchar(200),
  dt varchar(200)
)
with (
  appendonly = true,
  ORIENTATION  = column,
  COMPRESSTYPE =  RLE_TYPE,
  COMPRESSLEVEL = 2
)
DISTRIBUTED BY (dt);
```
### 修改表的存储模型
表存储、压缩和行列类型只能在创建时声明。 要改变存储模型，用户必须用正确的存储选项创建一个表，再把原始表的数据载入到新表中，接着删除原始表并且把新表重命名为原始表的名称。 用户还必须重新授权原始表上有的权限。例如：
```sql
CREATE TABLE sales2 (LIKE sales) WITH (appendoptimized=true, compresstype=quicklz,   
                                       compresslevel=1, orientation=column);
INSERT INTO sales2 SELECT * FROM sales;
DROP TABLE sales;ALTER TABLE sales2 RENAME TO sales;
GRANT ALL PRIVILEGES ON sales TO admin;
GRANT SELECT ON sales TO guest;
```

###  
## 常用的sql
### 表结构化信息
```sql
select 
 a.attrelid as attrelid
 ,t.table_name as table_name
 ,a.attname AS column_name
 ,format_type(a.atttypid, a.atttypmod) AS data_type
 ,d.description AS description
 ,a.attnum
 ,a.attnotnull AS notnull
 ,coalesce(p.indisprimary, FALSE) AS primary_key
 ,f.adsrc AS default_val
FROM pg_attribute a
LEFT JOIN pg_index p                  ON p.indrelid = a.attrelid 
AND a.attnum = ANY(p.indkey)
LEFT JOIN pg_description d            ON d.objoid = a.attrelid 
AND d.objsubid = a.attnum
LEFT JOIN pg_attrdef f                ON f.adrelid = a.attrelid 
AND f.adnum = a.attnum
LEFT JOIN information_schema.TABLES t ON t.TABLE_SCHEMA='dcm_crm'
AND a.attrelid = t.table_name::regclass --表名转为oid
WHERE a.attnum > 0
AND NOT a.attisdropped
AND t.table_name != 'null'
and t.table_name not like '%prt%'  
ORDER BY a.attrelid
;
```

### kill query
```sql
select * from pg_locks where relation = 
'dcm_ysm."AllOrderBill"'::regclass::oid;

SELECT * FROM pg_stat_activity WHERE state = 'active';

-- 39249 63412
SELECT pg_cancel_backend(39249)

SELECT pg_terminate_backend(39249)


SELECT pid , query, * FROM pg_stat_activity
  WHERE state != 'idle' ORDER BY xact_start;
```












