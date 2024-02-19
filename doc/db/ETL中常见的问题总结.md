## 1. Mysql TimeStamp 0 的问题
mysqlToGreenPlum的时候遇到了 timestamp 最小值不兼容的问题,可以修改jdbc url中的属性来解决
>  failure to convert datetime '0000-00-00 00:00:00' to TIMESTAMP  

[https://bugs.mysql.com/bug.php?id=19274](https://bugs.mysql.com/bug.php?id=19274)
**JDBC**连接有一项属性：**zeroDateTimeBehavior **可以用来配置出现这种情况时的处理策略，该属性有下列三个属性值：

- exception（不指定，则默认）---->默认抛出异常
- convertToNull------->转化为null
- round------->替换成最近的日期即XXXX-01-01

## 2. Mysql TinyInt true/false的问题
由于MySql中没有boolean类型，所以会用到tinyint[1]类型来表示,在mysql中boolean=tinyint[1]
 jdbc 连接上加 `&tinyInt1isBit=false&transformedBitIsBoolean=false`

## 3. 增量同步ts/主键 的问题
如果源表没有 edit_time/ts等 修改标记,假如只根据自增主键来进行max操作去增量将无法取到修改数据
所以在源表仅包含自增主键无edit_time的情况下,需要针对性处理,比如利用插入修改或者直接使用全量

