## 元数据信息

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

