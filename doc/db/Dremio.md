## Dremio

> [https://docs.dremio.com/](https://docs.dremio.com/)

## 简介

数据湖:不同存储类型种类的数据汇聚在一起,实现类似Hub的功能

基于Arrow的数据加速

## Dremio安装

1. docker

> docker pull dremio/dremio-oss

2. docker run

> docker run -d -p 9047:9047 -p 31010:31010 -p 45678:45678 dremio/dremio-oss

3. docker log

> docker logs --tail 300 -f bold_fermat

4. docker启动后,访问 localhost:9047

初次启动需要注册用户,注册完成后进入.

## Dremio功能

1. Spaces

虚拟表,在这里创建space中的虚拟表(类似视图),+New Query 保存后可存储到指定位置.

2. Data Lakes

数据湖,可添加Table Stores/File
Stores,可理解为表/文件管理器,比如添加一个NAS作为文件管理实例,其中的json/excle/csv等文件可直接作为查询的'表'进行查询

3. External Sources

外部源,这里添加多种db源,作为虚拟表的数据来源.如Mysql/PostgreSQL/Oracle等

## Dremio JDBC

可参考

> [https://www.cnblogs.com/charlypage/p/13335145.html](https://www.cnblogs.com/charlypage/p/13335145.html)


注意

- jar在maven中央仓库没有,所以需要单独下载.

> [https://www.dremio.com/drivers/](https://www.dremio.com/drivers/)

- 仅支持select
- 集成Mybatis不支持#{}

## Token API

> POST[http://![](https://g.yuque.com/gr/latex?%5D(http%3A%2F%2F#card=math&code=%5D%28http%3A%2F%2F&id=U9Aba)){ip}:
> 9047/apiv2/login
>
> BODY : {
"userName": "name",
"password": "pwd"
> }


比如取到响应中的token:AAAAA

之后的请求需要在Header中添加

Authorization:_dremioAAAAA

## SQL API

> POST [http://![](https://g.yuque.com/gr/latex?%5D(http%3A%2F%2F#card=math&code=%5D%28http%3A%2F%2F&id=vBgAY)){ip}:
> 9047/apiv2/sql
>
> BODY : {
"sql": "SELECT * FROM cmpsync."user-mapper""
> }

## Python CURL Demo

```python
import requests
import json


def getToken():
    headers = {'content-type': "application/json"}
    url = "http://${ip}:9047/apiv2/login"
    data = {"userName": "test", "password": "123456"}
    res = requests.post(url, data=json.dumps(data), headers=headers)
    token = json.loads(res.text)
    return token['token']


def getResult():
    token = getToken()
    headers = {'content-type': "application/json", "Authorization": "_dremio" + token}
    url = "http://${ip}:9047/apiv2/sql"
    data = {"sql": "SELECT * FROM cmpsync.\"user-mapper\" limit 2 "}
    res = requests.post(url, data=json.dumps(data), headers=headers)
    result = json.loads(res.text)
    print(result)


if __name__ == '__main__':
    getResult()
```

## Dremio ARP 开发

[doc](https://www.dremio.com/resources/tutorials/how-to-create-an-arp-connector/#toc_item_Maven%20Build%20Failures)

dremio 基于pf4j实现了插件化开发的功能,dremio-hub官方也提供了比如sqlite的连接器.

## 1. 安装rpm版单机dremio方便测试

- 下载rpm包到 `/opt/dremio`
  `https://download.dremio.com/community-server/20.1.0-202202061055110045-36733c65/`
- 安装
  `sudo yum install dremio-community-20.1.0-202202061055110045_36733c65_1.noarch.rpm`
- 启动
  `sudo service dremio start`
- 查看日志
  `tail -f /var/log/dremio/server.log`
- 卸载*
  `rpm -qa|grep dremio`
  `rpm -e dremio-community-20.1.0-202202061055110045_36733c65_1.noarch`
- 清空卸载残留
  `find / -name dremio`
  `rm -rf /var/lib/dremio`等

## 2. windows测试基类调整

官方提供的`BaseTestQuery`需要本地包含`Hadoop`环境,windows目前测试不通,故对其进行了调整,移除了`hadoop`的内容

`com.dremio.BaseTestQuery`
下文中移除第3/10行代码

```java
    private static void openClient() throws Exception {
    clusterCoordinator = LocalClusterCoordinator.newRunningCoordinator();
    // dfsTestTmpSchemaLocation = TestUtilities.createTempDir();
    nodes = new SabotNode[nodeCount];

    for (int i = 0; i < nodeCount; ++i) {
        nodes[i] = SABOT_NODE_RULE.newSabotNode(new BaseTestQuery.SabotProviderConfig(i == 0));
        nodes[i].run();
        if (i == 0) {
            //TestUtilities.addDefaultTestPlugins(nodes[i].getContext().getCatalogService(), dfsTestTmpSchemaLocation, true);
        }
    }

    client = QueryTestUtil.createClient(config, clusterCoordinator, 2, defaultProperties);
    setEnableReAttempts(false);
}
```

移除第五行代码

```java

@BeforeClass
public static void setupDefaultTestCluster() throws Exception {
    config = SabotConfig.create(TEST_CONFIGURATIONS);
    openClient();
    //localFs = HadoopFileSystem.getLocal(new Configuration());
    setSessionOption("exec.errors.verbose", "true");
}
```

## 3. questDB 开发

questDB实现了部分pg协议,除了部分数据库方言需要调整以外,重点在于和pg的差别:没有information_tables表,且无实际的schema概念

### QuestDBConf.java

该类的核心在于`QuestDBDialect`/`QuestDBSchemaFetcher`

```java
package com.dremio.exec.store.jdbc.conf;

import com.dremio.exec.catalog.conf.DisplayMetadata;
import com.dremio.exec.catalog.conf.NotMetadataImpacting;
import com.dremio.exec.catalog.conf.Secret;
import com.dremio.exec.catalog.conf.SourceType;
import com.dremio.exec.store.jdbc.CloseableDataSource;
import com.dremio.exec.store.jdbc.DataSources;
import com.dremio.exec.store.jdbc.JdbcFetcherProto;
import com.dremio.exec.store.jdbc.JdbcPluginConfig;
import com.dremio.exec.store.jdbc.dialect.arp.ArpDialect;
import com.dremio.exec.store.jdbc.dialect.arp.ArpYaml;
import com.dremio.options.OptionManager;
import com.dremio.security.CredentialsService;
import com.google.common.annotations.VisibleForTesting;
import io.protostuff.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

@SourceType(value = "QUESTDB", label = "questDB", uiConfig = "questdb-layout.json")
public class QuestDBConf extends AbstractArpConf<QuestDBConf> {
    private static final String ARP_FILENAME = "arp/implementation/questdb-arp.yaml";
    private static final String DRIVER = "org.postgresql.Driver";

    static class QuestDBSchemaFetcherV2 extends ArpDialect.ArpSchemaFetcher {
        private static final Logger logger = LoggerFactory.getLogger(QuestDBConf.QuestDBSchemaFetcherV2.class);
        private final JdbcPluginConfig config;

        @Override
        protected long getRowCount(List<String> tablePath) {
            Optional<Long> estimate = this.executeQueryAndGetFirstLong("select count(*) from TABLES ");
            if (estimate.isPresent() && estimate.get() != 0L) {
                return estimate.get();
            } else {
                return super.getRowCount(tablePath);
            }
        }

        public QuestDBSchemaFetcherV2(String query, JdbcPluginConfig config) {
            super(query, config);
            this.config = config;
            logger.info("query schema:{}", query);
        }

        @Override
        protected JdbcFetcherProto.CanonicalizeTablePathResponse getDatasetHandleViaGetTables(JdbcFetcherProto.CanonicalizeTablePathRequest request, Connection connection) throws SQLException {
            JdbcFetcherProto.CanonicalizeTablePathResponse.Builder responseBuilder = JdbcFetcherProto.CanonicalizeTablePathResponse.newBuilder();
            responseBuilder.setTable(request.getTable());
            responseBuilder.setSchema("");
            responseBuilder.setCatalog("");
            return responseBuilder.build();
        }

        private static void closeResource(Throwable throwable, AutoCloseable autoCloseable) throws Exception {
            if (throwable != null) {
                try {
                    autoCloseable.close();
                } catch (Throwable throwable1) {
                    throwable.addSuppressed(throwable1);
                }
            } else {
                autoCloseable.close();
            }

        }

    }

    static class QuestDBDialect extends ArpDialect {
        public QuestDBDialect(ArpYaml yaml) {
            super(yaml);
        }

        @Override
        public ArpSchemaFetcher newSchemaFetcher(JdbcPluginConfig config) {
            return new QuestDBSchemaFetcherV2("select null,null  , name AS NME from TABLES", config);
        }

        @Override
        public ContainerSupport supportsCatalogs() {
            return ContainerSupport.UNSUPPORTED;
        }

        @Override
        public boolean supportsNestedAggregations() {
            return false;
        }
    }


    @Tag(1)
    @DisplayMetadata(label = "host (Ex: 127.0.0.1)")
    public String host;
    @Tag(2)
    @DisplayMetadata(label = "port (Ex : 8812)")
    public String port;


    @Tag(3)
    @DisplayMetadata(label = "username")
    @NotMetadataImpacting
    public String username = "admin";
    @Tag(4)
    @Secret
    @DisplayMetadata(label = "password")
    @NotMetadataImpacting
    public String password = "quest";
    @Tag(5)
    @DisplayMetadata(label = "Record fetch size")
    @NotMetadataImpacting
    public int fetchSize = 200;
    @Tag(6)
    @DisplayMetadata(
            label = "Maximum idle connections"
    )
    @NotMetadataImpacting
    public int maxIdleConns = 8;

    @Tag(7)
    @DisplayMetadata(
            label = "Connection idle time (s)"
    )
    @NotMetadataImpacting
    public int idleTimeSec = 60;


    @Override
    @VisibleForTesting
    public JdbcPluginConfig buildPluginConfig(JdbcPluginConfig.Builder configBuilder, CredentialsService credentialsService, OptionManager optionManager) {
        return configBuilder.withDialect(getDialect())
                .withFetchSize(fetchSize)
                .clearHiddenSchemas()
                .addHiddenSchema("sys")
                .withDatasourceFactory(this::newDataSource)
                .build();
    }

    //jdbc:postgresql://192.168.203.128:8812/admin?sslmode=disable
    private CloseableDataSource newDataSource() {
        Properties properties = new Properties();
        String jdbcURL = "jdbc:postgresql://" + this.host + ":" + this.port + "/admin?sslmode=disable";
        CloseableDataSource dataSource = DataSources.newGenericConnectionPoolDataSource(DRIVER, jdbcURL, this.username, this.password, properties, DataSources.CommitMode.DRIVER_SPECIFIED_COMMIT_MODE, this.maxIdleConns, this.idleTimeSec);
        return dataSource;
    }

    @Override
    public ArpDialect getDialect() {
        return AbstractArpConf.loadArpFile(ARP_FILENAME, t -> new QuestDBDialect(t));
    }
}
```

### questdb-arp.yaml

https://github.com/3fong/questdb-dremio-connector

## 4. 测试

```java
public class QuestTest extends BaseTestQuery2 {
    private QuestDBConf questDBConf;

    @Before
    public void initSource() {
        SabotContext sabotContext = getSabotContext();
        sabotContext.getOptionManager().setOption(OptionValue.createBoolean(OptionValue.OptionType.SYSTEM,
                "hadoop_block_affinity_cache.enabled",
                false));
        SourceConfig sc = new SourceConfig();
        sc.setName("questdb");
        questDBConf = new QuestDBConf();
        questDBConf.host = "192.168.203.128";
        questDBConf.port = "8812";
        questDBConf.username = "admin";
        questDBConf.password = "quest";
        sc.setConnectionConf(questDBConf);
        sc.setMetadataPolicy(CatalogService.REFRESH_EVERYTHING_NOW);
        sabotContext.getCatalogService().createSourceIfMissingWithThrow(sc);
    }

    @Test
    public void test() throws Exception {
        String query = "select id,name from questdb.qdb.test limit 1";
        TestResult testResult = testBuilder()
                .sqlQuery(query)
                .unOrdered()
                .baselineColumns("id", "name")
                .baselineValues("1", "aaa")
                .go();
    }


}
```

## 5. 打包

` mvn clean package -DskipTests`
jar上传至 `/opt/dremio/jars/3rdparty`中,重启dremio 服务即可.
`service dremio start`
`service dremio stop`

[1](/doc/db/.Dremio_images/dremio_1.png)

[2](/doc/db/.Dremio_images/dremio_2.png)

[3](/doc/db/.Dremio_images/dremio_3.png)

## Dremio 常用sql

1. 元数据

> SELECT * FROM table("mysql-demo"
> .external_query('select table_name,column_name,data_type from all_tab_cols WHERE table_name
> in(''table1'')
> AND HIDDEN_COLUMN=''NO'''))

2. 表

> select * from table("mysql-demo".external_query('select * from table1'))

## 表元数据信息 (表面/字段名/字段类型等)

```sql
 SELECT * FROM 
 table("oracle-dw"
.external_query('select table_name,column_name,data_type,data_precision,data_scale 
from all_tab_cols WHERE table_name 
in(''TB_MK_TRADE_PM_MCONTR_WORKS'') 
AND HIDDEN_COLUMN=''NO'''))
where data_type = 'NUMBER'
```

## 虚拟表的元数据信息(表名/字段名/表定义等)

```sql
 select v.TABLE_SCHEMA,v.TABLE_NAME,c.COLUMN_NAME,c.DATA_TYPE,v.VIEW_DEFINITION from INFORMATION_SCHEMA.VIEWS v
 join INFORMATION_SCHEMA.COLUMNS c  on v.TABLE_SCHEMA=c.TABLE_SCHEMA AND 
 v.TABLE_NAME =c.TABLE_NAME where  V.table_schema like  'test%' AND v.TABLE_NAME in ('excelapp')
```

## 所有的虚拟表

```sql
 select * from INFORMATION_SCHEMA.VIEWS

```

## 日期/字符串相关

```sql
-- 十四天前
SELECT TO_CHAR(DATE_DIFF(current_date, 14),'yyyy-MM-dd') || ' 00:00:00' as startDate
```
