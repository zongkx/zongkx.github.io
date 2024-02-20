## 免费的云数据库

* [https://www.elephantsql.com/](https://www.elephantsql.com/)
* [https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)
* [https://app.planetscale.com](https://app.planetscale.com)
* [https://console.leancloud.cn](https://console.leancloud.cn)

## 大数据概述

### 1. 数据采集

一般包括各个业务系统的业务数据及日志等,数据采集包括但不限于消息中心/日志查询分析平台等.

### 2. 数据存储

各类关系型数据/文档数据库等,用于各个业务系统的数据存储,为了解决海量半结构化和非结构化数据的存储,演进到分布式文件系统,
如Hadoop(HDFS),不过后者的缺点在于访问能力较弱,也有两者相结合的存储引擎,如HBase/MongoDB

### 3. 数据分析

- 流处理(实时型): 对运动中的数据进行处理，即在接收数据的同时就对其进行处理， 对应的处理框架有 Storm、Spark Streaming、Flink
  Streaming 等。
- 批处理(离线型): 对一段时间内海量的离线数据进行统一的处理，对应的处理框架有 Hadoop MapReduce、Spark、Flink 等；

对于目前的大数据生态而言,为了能够让熟悉 SQL 的人员也能够进行数据的分析，查询分析框架应运而生:
Hive 、Spark SQL 、Flink SQL、 Pig、Phoenix

### 4. 数据应用

可视化/人工智能/算法优化等

## 数仓概述

### 数据库/数据仓库

数据库核心在于联机事务处理OLTP,简单来说就是增删改查 数据仓库一般用于联机分析处理OLAP,目的在于数据更多维度的分析.

数仓的构建一般需要ETL工具和调度工具.

目前主流的数仓模型,对数仓进行了分层设计:
`ODS（临时存储层）`、`PDW（数据仓库层）`、`DM（数据集市层）`、`APP（应用层）`
目的在于针对ETL优化/分析优化.

## 数据湖概念

### 数据湖和数仓

数据湖也可以用于OLAP,但它并不是数仓的对立面,数据湖目的在于链接不同的数据存储引擎用于分析查询,数据湖的数据源也可以来自数据仓库
事实上,数据湖可以通过虚拟层的概念模拟数据仓库的实现,相较于数仓,它提供了更强大的实时分析能力.

目前我接触到的数据湖引擎`dremio`,能够接入各类关系型数据库/HDFS/S3/Hive...,对于下游应用则支持PowerBI/tableau

[https://www.modb.pro/db/241289](https://www.modb.pro/db/241289)

[https://blog.csdn.net/weixin_45532984/article/details/124731837](https://blog.csdn.net/weixin_45532984/article/details/124731837)

## 维度的三种模型

### 星型模型

事实表被多个维表或一个或多个层次所包围
多维数据集的每一个维度都直接与事实表相连接，不存在渐变维度，所以数据有一定的冗余

### 雪花模型

在星型模型中，维度表包括了该维度的所有信息，因为没有分层，所以维度表里面可能会有冗余出现。
为了减少维度表的冗余，这时我们可以使用雪花模型。雪花模型在星型模型的基础上，把维度表中的一些字段进行进一步的拆分，减少冗余，使其更有层次。

## 我所实践的案例

![img.png](/images/img.png)

- 数仓: GreemPlum

使用一个库,不同的业务领域直接使用 schema 隔离,这样方便 比如 DM层的数据表的构建,避免数据跨库移动,提高建仓效率

- 分层

DCM: 缓冲层(可以简单理解为业务系统的短期快照,dcm的意义在于避免系统故障导致对业务系统反复取数的问题)
ODS: 贴源层(主流方案,表结构与业务系统保持一致,大表可以使用拉链表提供存储效率)
FDM: 基础整合层
GDM:公告汇总层
DM:  集市层

## 数据同步方案

目前已经接触到了包括 CDC/ts/snapshot 等方案实现的增量同步的功能

### CDC

![](https://raw.githubusercontent.com/zongkx/pic-go/main/image(4).png)

拿`flink-cdc`来说,其核心在于 数据库产生的 操作log,比如`mysql`的 `binlog`,flink-cdc可以采用 `stream`模式进行持续的数据采集,
根据`log`进行区分,实现几乎无延迟的数据变更捕获. 缺点是需要相关数据库的配合.

下图是基于`canal`的常见的数据采集方案(我认为`flink-cdc`更简洁)
![](https://raw.githubusercontent.com/zongkx/pic-go/main/image(5).png)

### ts

ts方案可以做到和数据库无关,需要在表中添加 ts字段,新增/修改(逻辑删除)数据时根据ts的改变进行数据捕获, 该方案更适合批处理,t+1
缺点: 流处理的成本过高,数据库压力过大

### snapshot

快照存储实际上并不局限于db, 假如我们需要对一个第三方接口进行数据变更捕获的时候,显然快照是一个不错的方案.
snapshot的方案更加灵活多变,需要根据不同的`source`进行处理优化.

拿 `pg`做 snapshot来讲,我们可以利用 `except`实现快照diff,进行数据变更捕获.
当然也可以考虑使用 时序数据库存储快照

## ETL常见问题

### 1. Mysql TimeStamp 0 的问题

mysqlToGreenPlum的时候遇到了 timestamp 最小值不兼容的问题,可以修改jdbc url中的属性来解决
> failure to convert datetime '0000-00-00 00:00:00' to TIMESTAMP

[https://bugs.mysql.com/bug.php?id=19274](https://bugs.mysql.com/bug.php?id=19274)
**JDBC**连接有一项属性：**zeroDateTimeBehavior **可以用来配置出现这种情况时的处理策略，该属性有下列三个属性值：

- exception（不指定，则默认）---->默认抛出异常
- convertToNull------->转化为null
- round------->替换成最近的日期即XXXX-01-01

### 2. Mysql TinyInt true/false的问题

由于MySql中没有boolean类型，所以会用到tinyint[1]类型来表示,在mysql中boolean=tinyint[1]
jdbc 连接上加 `&tinyInt1isBit=false&transformedBitIsBoolean=false`

### 3. 增量同步ts/主键 的问题

如果源表没有 edit_time/ts等 修改标记,假如只根据自增主键来进行max操作去增量将无法取到修改数据
所以在源表仅包含自增主键无edit_time的情况下,需要针对性处理,比如利用插入修改或者直接使用全量