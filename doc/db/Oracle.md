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

## 分组后按某个字段取出其中一行数据

```sql
SELECT * FROM (
 	SELECT TYPE,CREATE_TIME,ROW_NUMBER() OVER (PARTITION BY TYPE ORDER BY CREATE_TIME DESC) rn
 	FROM TABLE1 ) t WHERE t.rn = 1 -- 根据type分组然后取出每组create_time最晚的那条数据
```


