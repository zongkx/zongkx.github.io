## 表元数据信息 (表面/字段名/字段类型等)
```java
 SELECT * FROM 
 table("oracle-dw"
.external_query('select table_name,column_name,data_type,data_precision,data_scale 
from all_tab_cols WHERE table_name 
in(''TB_MK_TRADE_PM_MCONTR_WORKS'') 
AND HIDDEN_COLUMN=''NO'''))
where data_type = 'NUMBER'
```

## 虚拟表的元数据信息(表名/字段名/表定义等)
```java
 select v.TABLE_SCHEMA,v.TABLE_NAME,c.COLUMN_NAME,c.DATA_TYPE,v.VIEW_DEFINITION from INFORMATION_SCHEMA.VIEWS v
 join INFORMATION_SCHEMA.COLUMNS c  on v.TABLE_SCHEMA=c.TABLE_SCHEMA AND 
 v.TABLE_NAME =c.TABLE_NAME where  V.table_schema like  'test%' AND v.TABLE_NAME in ('excelapp')
```
## 所有的虚拟表
```java
 select * from INFORMATION_SCHEMA.VIEWS

```
## 日期/字符串相关
```java
-- 十四天前
SELECT TO_CHAR(DATE_DIFF(current_date, 14),'yyyy-MM-dd') || ' 00:00:00' as startDate
```
