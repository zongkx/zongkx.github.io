import{_ as a,c as t,a2 as r,o}from"./chunks/framework.DPuwY6B9.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/db/index.md","filePath":"doc/db/index.md"}'),l={name:"doc/db/index.md"};function i(n,e,s,h,c,d){return o(),t("div",null,e[0]||(e[0]=[r('<h2 id="resource" tabindex="-1">resource <a class="header-anchor" href="#resource" aria-label="Permalink to &quot;resource&quot;">​</a></h2><ul><li><a href="https://dbeaver.io/download/" target="_blank" rel="noreferrer">https://dbeaver.io/download/</a></li><li><a href="https://github.com/beekeeper-studio/beekeeper-studio" target="_blank" rel="noreferrer">https://github.com/beekeeper-studio/beekeeper-studio</a></li><li><a href="https://www.navicat.com.cn/products/navicat-premium-lite" target="_blank" rel="noreferrer">https://www.navicat.com.cn/products/navicat-premium-lite</a></li></ul><h2 id="免费的云数据库" tabindex="-1">免费的云数据库 <a class="header-anchor" href="#免费的云数据库" aria-label="Permalink to &quot;免费的云数据库&quot;">​</a></h2><ul><li><a href="https://supabase.com/" target="_blank" rel="noreferrer">https://supabase.com/</a></li><li><a href="https://neon.tech/" target="_blank" rel="noreferrer">https://neon.tech/</a></li><li><a href="https://www.elephantsql.com/" target="_blank" rel="noreferrer">https://www.elephantsql.com/</a></li><li><a href="https://account.mongodb.com/account/login" target="_blank" rel="noreferrer">https://account.mongodb.com/account/login</a></li><li><a href="https://app.planetscale.com" target="_blank" rel="noreferrer">https://app.planetscale.com</a></li><li><a href="https://console.leancloud.cn" target="_blank" rel="noreferrer">https://console.leancloud.cn</a></li></ul><h2 id="大数据概述" tabindex="-1">大数据概述 <a class="header-anchor" href="#大数据概述" aria-label="Permalink to &quot;大数据概述&quot;">​</a></h2><h3 id="_1-数据采集" tabindex="-1">1. 数据采集 <a class="header-anchor" href="#_1-数据采集" aria-label="Permalink to &quot;1. 数据采集&quot;">​</a></h3><p>一般包括各个业务系统的业务数据及日志等,数据采集包括但不限于消息中心/日志查询分析平台等.</p><h3 id="_2-数据存储" tabindex="-1">2. 数据存储 <a class="header-anchor" href="#_2-数据存储" aria-label="Permalink to &quot;2. 数据存储&quot;">​</a></h3><p>各类关系型数据/文档数据库等,用于各个业务系统的数据存储,为了解决海量半结构化和非结构化数据的存储,演进到分布式文件系统, 如Hadoop(HDFS),不过后者的缺点在于访问能力较弱,也有两者相结合的存储引擎,如HBase/MongoDB</p><h3 id="_3-数据分析" tabindex="-1">3. 数据分析 <a class="header-anchor" href="#_3-数据分析" aria-label="Permalink to &quot;3. 数据分析&quot;">​</a></h3><ul><li>流处理(实时型): 对运动中的数据进行处理，即在接收数据的同时就对其进行处理， 对应的处理框架有 Storm、Spark Streaming、Flink Streaming 等。</li><li>批处理(离线型): 对一段时间内海量的离线数据进行统一的处理，对应的处理框架有 Hadoop MapReduce、Spark、Flink 等；</li></ul><p>对于目前的大数据生态而言,为了能够让熟悉 SQL 的人员也能够进行数据的分析，查询分析框架应运而生: Hive 、Spark SQL 、Flink SQL、 Pig、Phoenix</p><h3 id="_4-数据应用" tabindex="-1">4. 数据应用 <a class="header-anchor" href="#_4-数据应用" aria-label="Permalink to &quot;4. 数据应用&quot;">​</a></h3><p>可视化/人工智能/算法优化等</p><h2 id="数仓概述" tabindex="-1">数仓概述 <a class="header-anchor" href="#数仓概述" aria-label="Permalink to &quot;数仓概述&quot;">​</a></h2><h3 id="数据库-数据仓库" tabindex="-1">数据库/数据仓库 <a class="header-anchor" href="#数据库-数据仓库" aria-label="Permalink to &quot;数据库/数据仓库&quot;">​</a></h3><p>数据库核心在于联机事务处理OLTP,简单来说就是增删改查 数据仓库一般用于联机分析处理OLAP,目的在于数据更多维度的分析.</p><p>数仓的构建一般需要ETL工具和调度工具.</p><p>目前主流的数仓模型,对数仓进行了分层设计: <code>ODS（临时存储层）</code>、<code>PDW（数据仓库层）</code>、<code>DM（数据集市层）</code>、<code>APP（应用层）</code> 目的在于针对ETL优化/分析优化.</p><h2 id="数据湖概念" tabindex="-1">数据湖概念 <a class="header-anchor" href="#数据湖概念" aria-label="Permalink to &quot;数据湖概念&quot;">​</a></h2><h3 id="数据湖和数仓" tabindex="-1">数据湖和数仓 <a class="header-anchor" href="#数据湖和数仓" aria-label="Permalink to &quot;数据湖和数仓&quot;">​</a></h3><p>数据湖也可以用于OLAP,但它并不是数仓的对立面,数据湖目的在于链接不同的数据存储引擎用于分析查询,数据湖的数据源也可以来自数据仓库 事实上,数据湖可以通过虚拟层的概念模拟数据仓库的实现,相较于数仓,它提供了更强大的实时分析能力.</p><p>目前我接触到的数据湖引擎<code>dremio</code>,能够接入各类关系型数据库/HDFS/S3/Hive...,对于下游应用则支持PowerBI/tableau</p><p><a href="https://www.modb.pro/db/241289" target="_blank" rel="noreferrer">https://www.modb.pro/db/241289</a></p><p><a href="https://blog.csdn.net/weixin_45532984/article/details/124731837" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_45532984/article/details/124731837</a></p><h2 id="维度的三种模型" tabindex="-1">维度的三种模型 <a class="header-anchor" href="#维度的三种模型" aria-label="Permalink to &quot;维度的三种模型&quot;">​</a></h2><h3 id="星型模型" tabindex="-1">星型模型 <a class="header-anchor" href="#星型模型" aria-label="Permalink to &quot;星型模型&quot;">​</a></h3><p>事实表被多个维表或一个或多个层次所包围 多维数据集的每一个维度都直接与事实表相连接，不存在渐变维度，所以数据有一定的冗余</p><h3 id="雪花模型" tabindex="-1">雪花模型 <a class="header-anchor" href="#雪花模型" aria-label="Permalink to &quot;雪花模型&quot;">​</a></h3><p>在星型模型中，维度表包括了该维度的所有信息，因为没有分层，所以维度表里面可能会有冗余出现。 为了减少维度表的冗余，这时我们可以使用雪花模型。雪花模型在星型模型的基础上，把维度表中的一些字段进行进一步的拆分，减少冗余，使其更有层次。</p><h2 id="我所实践的案例" tabindex="-1">我所实践的案例 <a class="header-anchor" href="#我所实践的案例" aria-label="Permalink to &quot;我所实践的案例&quot;">​</a></h2><ul><li>数仓: GreemPlum</li></ul><p>使用一个库,不同的业务领域直接使用 schema 隔离,这样方便 比如 DM层的数据表的构建,避免数据跨库移动,提高建仓效率</p><ul><li>分层</li></ul><p>DCM: 缓冲层(可以简单理解为业务系统的短期快照,dcm的意义在于避免系统故障导致对业务系统反复取数的问题) ODS: 贴源层(主流方案,表结构与业务系统保持一致,大表可以使用拉链表提供存储效率) FDM: 基础整合层 GDM:公告汇总层 DM: 集市层</p><h2 id="数据同步方案" tabindex="-1">数据同步方案 <a class="header-anchor" href="#数据同步方案" aria-label="Permalink to &quot;数据同步方案&quot;">​</a></h2><p>目前已经接触到了包括 CDC/ts/snapshot 等方案实现的增量同步的功能</p><h3 id="cdc" tabindex="-1">CDC <a class="header-anchor" href="#cdc" aria-label="Permalink to &quot;CDC&quot;">​</a></h3><p><img src="https://raw.githubusercontent.com/zongkx/pic-go/main/image(4).png" alt=""></p><p>拿<code>flink-cdc</code>来说,其核心在于 数据库产生的 操作log,比如<code>mysql</code>的 <code>binlog</code>,flink-cdc可以采用 <code>stream</code>模式进行持续的数据采集, 根据<code>log</code>进行区分,实现几乎无延迟的数据变更捕获. 缺点是需要相关数据库的配合.</p><p>下图是基于<code>canal</code>的常见的数据采集方案(我认为<code>flink-cdc</code>更简洁) <img src="https://raw.githubusercontent.com/zongkx/pic-go/main/image(5).png" alt=""></p><h3 id="ts" tabindex="-1">ts <a class="header-anchor" href="#ts" aria-label="Permalink to &quot;ts&quot;">​</a></h3><p>ts方案可以做到和数据库无关,需要在表中添加 ts字段,新增/修改(逻辑删除)数据时根据ts的改变进行数据捕获, 该方案更适合批处理,t+1 缺点: 流处理的成本过高,数据库压力过大</p><h3 id="snapshot" tabindex="-1">snapshot <a class="header-anchor" href="#snapshot" aria-label="Permalink to &quot;snapshot&quot;">​</a></h3><p>快照存储实际上并不局限于db, 假如我们需要对一个第三方接口进行数据变更捕获的时候,显然快照是一个不错的方案. snapshot的方案更加灵活多变,需要根据不同的<code>source</code>进行处理优化.</p><p>拿 <code>pg</code>做 snapshot来讲,我们可以利用 <code>except</code>实现快照diff,进行数据变更捕获. 当然也可以考虑使用 时序数据库存储快照</p><h2 id="etl常见问题" tabindex="-1">ETL常见问题 <a class="header-anchor" href="#etl常见问题" aria-label="Permalink to &quot;ETL常见问题&quot;">​</a></h2><h3 id="_1-mysql-timestamp-0-的问题" tabindex="-1">1. Mysql TimeStamp 0 的问题 <a class="header-anchor" href="#_1-mysql-timestamp-0-的问题" aria-label="Permalink to &quot;1. Mysql TimeStamp 0 的问题&quot;">​</a></h3><p>mysqlToGreenPlum的时候遇到了 timestamp 最小值不兼容的问题,可以修改jdbc url中的属性来解决</p><blockquote><p>failure to convert datetime &#39;0000-00-00 00:00:00&#39; to TIMESTAMP</p></blockquote><p><a href="https://bugs.mysql.com/bug.php?id=19274" target="_blank" rel="noreferrer">https://bugs.mysql.com/bug.php?id=19274</a><strong>JDBC</strong>连接有一项属性：**zeroDateTimeBehavior **可以用来配置出现这种情况时的处理策略，该属性有下列三个属性值：</p><ul><li>exception（不指定，则默认）----&gt;默认抛出异常</li><li>convertToNull-------&gt;转化为null</li><li>round-------&gt;替换成最近的日期即XXXX-01-01</li></ul><h3 id="_2-mysql-tinyint-true-false的问题" tabindex="-1">2. Mysql TinyInt true/false的问题 <a class="header-anchor" href="#_2-mysql-tinyint-true-false的问题" aria-label="Permalink to &quot;2. Mysql TinyInt true/false的问题&quot;">​</a></h3><p>由于MySql中没有boolean类型，所以会用到tinyint[1]类型来表示,在mysql中boolean=tinyint[1] jdbc 连接上加 <code>&amp;tinyInt1isBit=false&amp;transformedBitIsBoolean=false</code></p><h3 id="_3-增量同步ts-主键-的问题" tabindex="-1">3. 增量同步ts/主键 的问题 <a class="header-anchor" href="#_3-增量同步ts-主键-的问题" aria-label="Permalink to &quot;3. 增量同步ts/主键 的问题&quot;">​</a></h3><p>如果源表没有 edit_time/ts等 修改标记,假如只根据自增主键来进行max操作去增量将无法取到修改数据 所以在源表仅包含自增主键无edit_time的情况下,需要针对性处理,比如利用插入修改或者直接使用全量</p>',56)]))}const m=a(l,[["render",i]]);export{u as __pageData,m as default};
