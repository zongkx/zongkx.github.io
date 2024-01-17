# 常用内置函数
 
## Oracle

```sql
-- greatest :两列中取更晚的时间
select greatest(time1,time2) as time from Test; 

-- concat :字符串拼接,只支持两个参数,Mysql为三个
select * from Test where name like concat('%','3');--可用 || 代替

-- replace :字符串替换,三个参数
select replace(id,'1','2') from Test;--id中的1替换为2

-- ifnull :若为空,替换为
select ifnull(id,'unknown') from Test;--id中的null替换为unknown

-- instr :根据in排序
SELECT * FROM Test  where id in  ('1','2') ORDER BY instr('1,2',id );

-- start with * onnect by * :树结构遍历
select * from TestA start with id='1' connect by pid = prior id ;
```
## SqlServer
###  元数据信息

```sql
select t.name column_name,COLUMNPROPERTY( t.id, t.name, 'PRECISION' )  data_length,
 isnull( COLUMNPROPERTY( t.id, t.name, 'Scale' ), 0 ) numeric_scale, b.name data_type,
pk = CASE WHEN EXISTS ( SELECT 1 FROM sysobjects WHERE xtype = 'PK' AND parent_obj = t.id
AND name IN ( SELECT name FROM sysindexes
WHERE indid IN ( SELECT indid FROM sysindexkeys WHERE id = t.id AND colid = t.colid ) ) )
THEN'1' ELSE '0' END,
t.isnullable nullable,CONVERT(nvarchar(200),ISNULL(g.[value], '')) 
as comments from syscolumns t 
inner join sys.objects f on t.id = f.object_id 
left join sys.schemas s on s.schema_id = f.schema_id 
left join systypes b on t.xusertype=b.xusertype 
left join sys.extended_properties g on  g.name = 'MS_Description' and t.id=g.major_id and t.colid=g.minor_id 
where s.name = 'dbo'
```

## MySQL

```sql
-- Mysql版层级查询(根据id查所有子节点的信息)(id,pid)
create  function getChildren(val varchar(64))
returns varchar(4000)
begin
	declare oTemp varchar(4000);
	declare oTempChild varchar(4000);
set oTemp = "";
set oTempChild = val;
while oTempChild is not null 
do
	set oTemp = concat(oTemp,',',otempchild);
    select group_concat(id) into oTempChild from TestA where 		  find_in_set(pid,oTempChild)>0;
end while ;
return oTemp;
END;
-- 
select * from TestA where find_in_set(xlh,getChildren('4'));
```
### 性能
```java
-- 锁时间TOP10
SELECT DIGEST_TEXT, SUM_LOCK_TIME FROM 
performance_schema.events_statements_summary_by_digest ORDER BY SUM_LOCK_TIME DESC LIMIT 10
-- 平均响应时间TOP10
SELECT DIGEST_TEXT,AVG_TIMER_WAIT FROM 
performance_schema.events_statements_summary_by_digest ORDER BY AVG_TIMER_WAIT DESC LIMIT 10;
-- 排序记录数TOP10
SELECT DIGEST_TEXT,SUM_SORT_ROWS FROM 
performance_schema.events_statements_summary_by_digest ORDER BY SUM_SORT_ROWS DESC LIMIT 10;

-- 扫描记录数TOP10
SELECT DIGEST_TEXT,SUM_ROWS_EXAMINED FROM 
performance_schema.events_statements_summary_by_digest ORDER BY SUM_ROWS_EXAMINED DESC 
LIMIT 10;
-- 创建临时表TOP10
SELECT DIGEST_TEXT,SUM_CREATED_TMP_TABLES,SUM_CREATED_TMP_DISK_TABLES FROM 
performance_schema.events_statements_summary_by_digest ORDER BY SUM_CREATED_TMP_TABLES DESC 
LIMIT 10
```
### 查看执行记录

```java
   set GLOBAL  general_log = 'ON'

SELECT * from mysql.general_log ORDER BY event_time DESC;

```
### kill
```java

SELECT * FROM information_schema.PROCESSLIST where length(info) >0 ;

kill 742862

```
### 连接查询和子查询

```sql
-- 子查询(可以用于echarts的柱状图统计中),这样的查询效率更低,最好使用join
select a.name,
	(select b.b from TestB b where b.id = a.id)
from TestA a

-- left join + group by
SELECT COUNT(A.ID) AS NUM ,B.NAME AS NAME from  A
LEFT JOIN B ON A.ID = B.ID
GROUP BY B.NAME
```

### 避免使用Not IN 和 IN

```sql
-- A是B的子表,查出所有无效的子表数据
SELECT * FROM  A WHERE A.TID NOT IN (SELECT ID FROM B) -- in是一种相关子查询,子查询会被循环执行
-- 使用 NOT EXISTS 替代
SELECT * FROM A WHERE  NOT EXISTS (SELECT B.ID FROM  B WHERE A.TID =B.ID )-- exists是非相关子查询,子查询先执行且只执行一次
```

### 分组后按某个字段取出其中一行数据

#### Oracle

```sql
SELECT * FROM (
 	SELECT TYPE,CREATE_TIME,ROW_NUMBER() OVER (PARTITION BY TYPE ORDER BY CREATE_TIME DESC) rn
 	FROM TABLE1 ) t WHERE t.rn = 1 -- 根据type分组然后取出每组create_time最晚的那条数据
```

#### MySQL

```sql
  SELECT A.CREATE_TIME,A.TYPE from
  (SELECT * FROM TABLE1 ORDER BY CREATE_TIME DESC limit 10000 ) A GROUP BY A.TYPE
  -- 根据type分组然后取出每组create_time最晚的那条数据
  -- 为什么要加limit:Mysql在5.5.28以上子查询中使用order by其结果不会显示排序后的结果,而是被自动优化排序,所以需要加limit,但是limit的上限为10000
```
# 一个审批流程问题记录
## 问题

现有任务表和任务详情表,用来保存审批流程 其数据结构简写如下: TASK { id,desc} TASK_DETAIL { id,tid,name,seq,state } 后者的seq是审批顺序,从1开始,tid关联task.id,state保存审批状态:1 已审批,0未审批. name为审批人的姓名 现在需要根据name 来查找出所有自己待审批的任务desc.

## 思路

待审批的任务:流程前的人都已经审批通过或者流程第一个人待审批的合计. 所以隐藏条件就是,seq-1的那条数据的状态是已通过.

```
select a.tid from  task_detail a inner join
(select tid,(seq-1)as seq from task_detail where state = 0 and name = 'NameTest') b
on a.tid = b.tid and a.seq = b.seq
where a.state = 1 
union all 
select tid from task_detail where seq = 1 and state = 0 and name = 'NameTest'
```
