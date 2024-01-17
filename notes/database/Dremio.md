# Dremio

> [https://docs.dremio.com/](https://docs.dremio.com/)


## 简介

数据湖:不同存储类型种类的数据汇聚在一起,实现类似Hub的功能

基于Arrow的数据加速 

# Dremio安装

1.  docker  
> docker pull dremio/dremio-oss

2.  docker run  
> docker run -d -p 9047:9047 -p 31010:31010 -p 45678:45678 dremio/dremio-oss

3.  docker log  
> docker logs --tail 300 -f bold_fermat

4.  docker启动后,访问 localhost:9047 

初次启动需要注册用户,注册完成后进入.

# Dremio功能

1. Spaces

虚拟表,在这里创建space中的虚拟表(类似视图),+New Query 保存后可存储到指定位置.

2. Data Lakes

数据湖,可添加Table Stores/File Stores,可理解为表/文件管理器,比如添加一个NAS作为文件管理实例,其中的json/excle/csv等文件可直接作为查询的'表'进行查询

3. External Sources

外部源,这里添加多种db源,作为虚拟表的数据来源.如Mysql/PostgreSQL/Oracle等

# Dremio JDBC

可参考

> [https://www.cnblogs.com/charlypage/p/13335145.html](https://www.cnblogs.com/charlypage/p/13335145.html)


注意

-  jar在maven中央仓库没有,所以需要单独下载.  
> [https://www.dremio.com/drivers/](https://www.dremio.com/drivers/)

-  仅支持select 
-  集成Mybatis不支持#{} 

# Dremio RestAPI

## Token API

> POST  [http://![](https://g.yuque.com/gr/latex?%5D(http%3A%2F%2F#card=math&code=%5D%28http%3A%2F%2F&id=U9Aba)){ip}:9047/apiv2/login
>  
> BODY : {
"userName": "name",
"password": "pwd"
}


比如取到响应中的token:AAAAA

之后的请求需要在Header中添加

Authorization:_dremioAAAAA

## SQL API

> POST [http://![](https://g.yuque.com/gr/latex?%5D(http%3A%2F%2F#card=math&code=%5D%28http%3A%2F%2F&id=vBgAY)){ip}:9047/apiv2/sql
>  
> BODY : {
"sql": "SELECT * FROM cmpsync."user-mapper""
}


# Python CURL Demo

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
# Dremio ARP 开发

[doc](https://www.dremio.com/resources/tutorials/how-to-create-an-arp-connector/#toc_item_Maven%20Build%20Failures)

dremio 基于pf4j实现了插件化开发的功能,dremio-hub官方也提供了比如sqlite的连接器.

## 1. 安装rpm版单机dremio方便测试

-  下载rpm包到 `/opt/dremio`
`https://download.dremio.com/community-server/20.1.0-202202061055110045-36733c65/` 
-  安装
`sudo yum install dremio-community-20.1.0-202202061055110045_36733c65_1.noarch.rpm` 
-  启动
`sudo service dremio start` 
-  查看日志
`tail -f /var/log/dremio/server.log` 
-  卸载*
`rpm -qa|grep dremio`
`rpm -e dremio-community-20.1.0-202202061055110045_36733c65_1.noarch` 
-  清空卸载残留
`find / -name dremio`
`rm -rf /var/lib/dremio`等 

## 2. windows测试基类调整

官方提供的`BaseTestQuery`需要本地包含`Hadoop`环境,windows目前测试不通,故对其进行了调整,移除了`hadoop`的内容

`com.dremio.BaseTestQuery`
下文中移除第3/10行代码 
```java
    protected static void openClient() throws Exception {
        clusterCoordinator = LocalClusterCoordinator.newRunningCoordinator();
       // dfsTestTmpSchemaLocation = TestUtilities.createTempDir();
        nodes = new SabotNode[nodeCount];

        for(int i = 0; i < nodeCount; ++i) {
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


## 
## 3. questDB 开发

questDB实现了部分pg协议,除了部分数据库方言需要调整以外,重点在于和pg的差别:没有information_tables表,且无实际的schema概念
### QuestDBConf.java
该类的核心在于`QuestDBDialect`/`QuestDBSchemaFetcher`

```
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
        String jdbcURL = "jdbc:postgresql://"+this.host+":"+this.port+"/admin?sslmode=disable";
        CloseableDataSource dataSource = DataSources.newGenericConnectionPoolDataSource(DRIVER, jdbcURL, this.username, this.password, properties, DataSources.CommitMode.DRIVER_SPECIFIED_COMMIT_MODE, this.maxIdleConns, this.idleTimeSec);
        return dataSource;
    }

    @Override
    public ArpDialect getDialect() {
        return AbstractArpConf.loadArpFile(ARP_FILENAME, t->new QuestDBDialect(t));
    }
}
```
### questdb-arp.yaml
```yaml
#
# Copyright (C) 2017-2019 Dremio Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

metadata:
  # Manually Configured Metadata Section.
  name: QUESTDB
  apiname: questdb
  spec_version: '2'

syntax:
  identifier_quote: '"'
  identifier_length_limit: 256
  allows_boolean_literal: false
  map_boolean_literal_to_bit: false
  supports_catalogs: false
  supports_schemas: false


data_types:
  mappings:
    #------------Boolean types--------------#
    - source:
        name: "boolean"
      dremio:
        name: "boolean"

    #------------Numeric types--------------#
    - source:
        name: "int"
      dremio:
        name: "integer"
    - source:
        name: "float"
      dremio:
        name: "double"
    - source:
        name: "double"
      dremio:
        name: "double"
    - source:
        name: "long"
      dremio:
        name: "integer"
    - source:
        name: "long256"
      dremio:
        name: "bigint"
    - source:
        name: "byte"
      dremio:
        name: "integer"

    #------------String types--------------#
    - source:
        name: "string"
      dremio:
        name: "varchar"
    - source:
        name: "char"
      dremio:
        name: "varchar"

    #------------Binary--------------#
    - source:
        name: "binary"
      dremio:
        name: "varbinary"

    #------------Date types--------------#
    - source:
        name: "date"
      dremio:
        name: "date"
    - source:
        name: "timestamp"
      dremio:
        name: "timestamp"

relational_algebra:
  aggregation:
    enable: true
    group_by_ordinal: true
    distinct: true
    count_functions:
      count_star:
        enable: true
      count:
        enable: true
      count_distinct:
        enable: true

    functions:
    - names:
        - "avg"
      signatures:
        - args:
            - "double"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "max"
        - "min"
        - "sum"
      signatures:
        - args:
            - "integer"
          return: "integer"
        - args:
            - "double"
          return: "double"
  except:
    enable: false
  project:
    enable: true
  join:
    enable: true
    cross:
      enable: true
      rewrite: "{0}, {1}"
    inner:
      enable: true
      inequality: true
    left:
      enable: true
      inequality: true
    right:
      enable: true
      inequality: true
    full:
      enable: true
      inequality: true
  sort:
    enable: true
    order_by:
      enable: true
      default_nulls_ordering: high
    fetch_offset:
      offset_fetch:
        enable: false
        format: 'LIMIT {1} OFFSET {0}'
      offset_only:
        enable: false
      fetch_only:
        enable: true
        format: 'LIMIT {0}'
  union:
    enable: true
  union_all:
    enable: true
  values:
    enable: true
    method: values

expressions:
  subqueries:
    enable: true
    correlated: true
    scalar: true
    in_clause: true
    exists_clause: true
  supports_case: true
  supports_over: true
  datetime_formats:
    era:
      enable: true
      format: "AD"
    meridian:
      enable: true
      format: "AM"
    century:
      enable: true
      format: "CC"
    week_of_year:
      enable: true
      format: "WW"
    day_of_week:
      enable: true
      format: "D"
    day_name_abbreviated:
      enable: true
      format: "Dy"
    day_name:
      enable: true
      format: "Day"
    year_4:
      enable: true
      format: "YYYY"
    year_2:
      enable: true
      format: "YY"
    day_of_year:
      enable: true
      format: "DDD"
    month:
      enable: true
      format: "MM"
    month_name_abbreviated:
      enable: true
      format: "Mon"
    month_name:
      enable: true
      format: "Month"
    day_of_month:
      enable: true
      format: "DD"
    hour_12:
      enable: true
      format: "HH"
    hour_24:
      enable: true
      format: "HH24"
    minute:
      enable: true
      format: "MI"
    second:
      enable: true
      format: "SS"
    millisecond:
      enable: true
      format: "MS"
    timezone_abbreviation:
      enable: true
      format: "TZ"
    timezone_offset:
      enable: true
      format: "OF"
  operators:
    # Custom Expressions
    - names:
        - "cast"
      signatures:
        - args:
            - "varchar"
          return: "integer"
          rewrite: "CAST(TRUNC(CAST({0} AS DECIMAL), 0) AS INTEGER)"
        - args:
            - "varchar"
          return: "bigint"
          rewrite: "CAST(TRUNC(CAST({0} AS DECIMAL), 0) AS BIGINT)"
    - names:
        - "to_char"
      signatures:
        # Numeric TO_CHAR variations are not added as Dremio format strings don't match Postgres.
        - args:
            - "date"
            - "varchar"
          return: "varchar"
        - args:
            - "time"
            - "varchar"
          return: "varchar"
        - args:
            - "timestamp"
            - "varchar"
          return: "varchar"
    - names:
        - "trim"
      signatures:
        - args:
            - "varchar"
          return: "varchar"
    - names:
        - "left"
      signatures:
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
    - names:
        - "right"
      signatures:
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
    - names:
        - "ltrim"
      signatures:
        - args:
            - "varchar"
          return: "varchar"
    - names:
        - "rtrim"
      signatures:
        - args:
            - "varchar"
          return: "varchar"
    - names:
        - "sign"
      signatures:
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "float"
        - args:
            - "integer"
          return: "integer"
    - names:
        - "floor"
      signatures:
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "float"
        - args:
            - "integer"
          return: "integer"
    - names:
        - "position"
        - "locate"
      signatures:
        - args:
            - "varchar"
            - "varchar"
          return: "integer"
          rewrite: "STRPOS({1}, {0})"
        - args:
            - "varchar"
            - "varchar"
            - "integer"
          return: "integer"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL OR {2} IS NULL THEN NULL WHEN STRPOS(SUBSTRING({1}, {2}), {0}) > 0 THEN CASE WHEN {2} >= 1 THEN STRPOS(SUBSTRING({1}, {2}), {0}) + {2} - 1 ELSE STRPOS({1}, {0}) END ELSE 0 END "
        - args:
            - "varchar"
            - "varchar"
            - "bigint"
          return: "integer"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL OR {2} IS NULL THEN NULL WHEN STRPOS(SUBSTRING({1}, {2}), {0}) > 0 THEN CASE WHEN {2} >= 1 THEN STRPOS(SUBSTRING({1}, {2}), {0}) + {2} - 1 ELSE STRPOS({1}, {0}) END ELSE 0 END "
    - names:
        - "pi"
      signatures:
        - args: []
          return: "decimal"
    - names:
        - "truncate"
        - "trunc"
      signatures:
        - args:
            - "decimal"
            - "integer"
          return: "decimal"
          rewrite: "TRUNC({0}, {1})"
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "TRUNC(CAST({0} as decimal), {1})"
        - args:
            - "float"
            - "integer"
          return: "float"
          rewrite: "TRUNC(CAST({0} as decimal), {1})"
        - args:
            - "bigint"
            - "integer"
          return: "bigint"
          rewrite: "CAST(TRUNC({0}, {1}) AS BIGINT)"
        - args:
            - "integer"
            - "integer"
          return: "integer"
          rewrite: "CAST(TRUNC({0}, {1}) AS INTEGER)"
        - args:
            - "decimal"
          return: "decimal"
          rewrite: "TRUNC({0})"
        - args:
            - "double"
          return: "double"
          rewrite: "TRUNC(CAST({0} as decimal))"
        - args:
            - "float"
          return: "float"
          rewrite: "TRUNC(CAST({0} as decimal))"
        - args:
            - "integer"
          return: "integer"
          rewrite: "CAST(TRUNC({0}) AS INTEGER)"
        - args:
            - "bigint"
          return: "bigint"
          rewrite: "CAST(TRUNC({0}) AS BIGINT)"
    - names:
        - "reverse"
      signatures:
        - args:
            - "varchar"
          return: "varchar"
    - names:
        - "rpad"
      signatures:
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
          rewrite: "RPAD({0}, {1}, '' '')"
        - args:
            - "varchar"
            - "bigint"
          return: "varchar"
          rewrite: "RPAD({0}, {1}, '' '')"
        - args:
            - "varchar"
            - "integer"
            - "varchar"
          return: "varchar"
        - args:
            - "varchar"
            - "bigint"
            - "varchar"
          return: "varchar"
    - names:
        - "lpad"
      signatures:
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
          rewrite: "LPAD({0}, {1}, '' '')"
        - args:
            - "varchar"
            - "bigint"
          return: "varchar"
          rewrite: "LPAD({0}, {1}, '' '')"
        - args:
            - "varchar"
            - "integer"
            - "varchar"
          return: "varchar"
        - args:
            - "varchar"
            - "bigint"
            - "varchar"
          return: "varchar"
    - names:
        - extract_year
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(YEAR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(YEAR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(YEAR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(YEAR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(YEAR FROM {0}) AS INT8)"
    - names:
        - extract_month
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(MONTH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(MONTH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(MONTH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(MONTH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(MONTH FROM {0}) AS INT8)"
    - names:
        - extract_day
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(DAY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(DAY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(DAY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(DAY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(DAY FROM {0}) AS INT8)"
    - names:
        - extract_hour
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(HOUR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(HOUR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(HOUR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(HOUR FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(HOUR FROM {0}) AS INT8)"
    - names:
        - extract_minute
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(MINUTE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(MINUTE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(MINUTE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(MINUTE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(MINUTE FROM {0}) AS INT8)"
    - names:
        - extract_second
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(SECOND FROM DATE_TRUNC(''SECOND'', {0})) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(SECOND FROM DATE_TRUNC(''SECOND'', {0})) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(SECOND FROM DATE_TRUNC(''SECOND'', {0})) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(SECOND FROM DATE_TRUNC(''SECOND'', {0})) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(SECOND FROM DATE_TRUNC(''SECOND'', {0})) AS INT8)"
    - names:
        - extract_century
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(CENTURY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(CENTURY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(CENTURY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(CENTURY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(CENTURY FROM {0}) AS INT8)"
    - names:
        - extract_decade
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(DECADE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(DECADE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(DECADE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(DECADE FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(DECADE FROM {0}) AS INT8)"
    - names:
        - extract_dow
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(DOW FROM {0}) + 1 AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(DOW FROM {0}) + 1 AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(DOW FROM {0}) + 1 AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(DOW FROM {0}) + 1 AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(DOW FROM {0}) + 1 AS INT8)"
    - names:
        - extract_doy
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(DOY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(DOY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(DOY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(DOY FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(DOY FROM {0}) AS INT8)"
    - names:
        - extract_epoch
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(EPOCH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(EPOCH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(EPOCH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(EPOCH FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(EPOCH FROM {0}) AS INT8)"
    - names:
        - extract_millennium
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(MILLENIUM FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(MILLENIUM FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(MILLENIUM FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(MILLENIUM FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(MILLENIUM FROM {0}) AS INT8)"
    - names:
        - extract_quarter
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(QUARTER FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(QUARTER FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(QUARTER FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(QUARTER FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(QUARTER FROM {0}) AS INT8)"
    - names:
        - extract_week
      signatures:
        - return: bigint
          args:
            - date
          rewrite: "CAST(EXTRACT(WEEK FROM {0}) AS INT8)"
        - return: bigint
          args:
            - timestamp
          rewrite: "CAST(EXTRACT(WEEK FROM {0}) AS INT8)"
        - return: bigint
          args:
            - time
          rewrite: "CAST(EXTRACT(WEEK FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_year_month
          rewrite: "CAST(EXTRACT(WEEK FROM {0}) AS INT8)"
        - return: bigint
          args:
            - interval_day_second
          rewrite: "CAST(EXTRACT(WEEK FROM {0}) AS INT8)"
    - names:
        - "to_date"
      signatures:
        - return: "timestamp"
          args:
            - "varchar"
            - "varchar"
        - return: "date"
          args:
            - "varchar"
            - "varchar"
        - return: "date"
          args:
            - "integer"
            - "varchar"
          rewrite: "TO_DATE(CAST({0} AS VARCHAR), {1})"
    - names:
        - "date_trunc_year"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''year'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''year'', {0})"
    - names:
        - "date_trunc_quarter"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''quarter'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''quarter'', {0})"
    - names:
        - "date_trunc_month"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''month'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''month'', {0})"
    - names:
        - "date_trunc_week"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''week'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''week'', {0})"
    - names:
        - "date_trunc_day"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''day'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''day'', {0})"
    - names:
        - "date_trunc_hour"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''hour'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''hour'', {0})"
    - names:
        - "date_trunc_minute"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''minute'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''minute'', {0})"
    - names:
        - "date_trunc_second"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''second'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''second'', {0})"
    - names:
        - "date_trunc_decade"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''decade'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''decade'', {0})"
    - names:
        - "date_trunc_century"
      signatures:
        - return: "timestamp"
          args:
            - "timestamp"
          rewrite: "DATE_TRUNC(''century'', {0})"
        - return: "date"
          args:
            - "date"
          rewrite: "DATE_TRUNC(''century'', {0})"
    - names:
        - "-"
      signatures:
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "double"
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "integer"
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "bigint"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "double"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "integer"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "bigint"
        - args:
            - "timestamp"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "timestamp"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "date"
            - "interval_day_second"
          return: "date"
        - args:
            - "date"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "date"
            - "interval_year_month"
          return: "date"
        - args:
            - "date"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "time"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "time"
            - "interval_year_month"
          return: "timestamp"
    - names:
        - "+"
      signatures:
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "double"
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "integer"
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "bigint"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "double"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "integer"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "bigint"
        - args:
            - "timestamp"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "timestamp"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "date"
            - "interval_day_second"
          return: "date"
        - args:
            - "date"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "date"
            - "interval_year_month"
          return: "date"
        - args:
            - "date"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "time"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "time"
            - "interval_year_month"
          return: "timestamp"
    - names:
        - "/"
      signatures:
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "double"
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "integer"
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "bigint"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "double"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "integer"
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "bigint"
        - args:
            - "timestamp"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "timestamp"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "date"
            - "interval_day_second"
          return: "date"
        - args:
            - "date"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "date"
            - "interval_year_month"
          return: "date"
        - args:
            - "date"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "time"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "time"
            - "interval_year_month"
          return: "timestamp"
    - names:
        - "*"
      signatures:
        - args:
            - "interval_day_second"
            - "integer"
          return: "interval_day_second"
        - args:
            - "interval_day_second"
            - "bigint"
          return: "interval_day_second"
        - args:
            - "interval_day_second"
            - "double"
          return: "interval_day_second"
        - args:
            - "interval_day_second"
            - "float"
          return: "interval_day_second"
        - args:
            - "interval_year_month"
            - "integer"
          return: "interval_year_month"
        - args:
            - "interval_year_month"
            - "bigint"
          return: "interval_year_month"
        - args:
            - "interval_year_month"
            - "double"
          return: "interval_year_month"
        - args:
            - "interval_year_month"
            - "float"
          return: "interval_year_month"
        - args:
            - "timestamp"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "timestamp"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "date"
            - "interval_day_second"
          return: "date"
        - args:
            - "date"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "date"
            - "interval_year_month"
          return: "date"
        - args:
            - "date"
            - "interval_year_month"
          return: "timestamp"
        - args:
            - "time"
            - "interval_day_second"
          return: "timestamp"
        - args:
            - "time"
            - "interval_year_month"
          return: "timestamp"
    - names:
        - "%"
      signatures:
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "integer"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "interval_day_second"
            - "interval_day_second"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "integer"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "interval_year_month"
            - "interval_year_month"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "timestamp"
            - "interval_day_second"
          return: "timestamp"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "timestamp"
            - "interval_year_month"
          return: "timestamp"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "date"
            - "interval_day_second"
          return: "date"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "date"
            - "interval_day_second"
          return: "timestamp"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "date"
            - "interval_year_month"
          return: "date"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "date"
            - "interval_year_month"
          return: "timestamp"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "time"
            - "interval_day_second"
          return: "timestamp"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "time"
            - "interval_year_month"
          return: "timestamp"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "double"
            - "bigint"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "double"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "integer"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "bigint"
            - "bigint"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "integer"
            - "integer"
          return: "integer"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "bigint"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "bigint"
            - "integer"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
        - args:
            - "integer"
            - "bigint"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE ({0} % {1}) END "
    - names:
        - "-"
      signatures:
        - args:
            - "integer"
          return: "integer"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "float"
          return: "float"
        - args:
            - "double"
          return: "double"
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "interval_day_second"
          return: "interval_day_second"
        - args:
            - "interval_year_month"
          return: "interval_year_month"
    - names:
        - "+"
      signatures:
        - args:
            - "integer"
          return: "integer"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "float"
          return: "float"
        - args:
            - "double"
          return: "double"
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "interval_day_second"
          return: "interval_day_second"
        - args:
            - "interval_year_month"
          return: "interval_year_month"
    - names:
        - "log"
      signatures:
        - args:
            - "decimal"
          return: "double"
          rewrite: "LN(CAST({0} AS DOUBLE PRECISION))"
        - args:
            - "double"
          return: "double"
          rewrite: "LN({0})"
        - args:
            - "float"
          return: "double"
          rewrite: "LN({0})"
        - args:
            - "bigint"
          return: "double"
          rewrite: "LN({0})"
        - args:
            - "integer"
          return: "double"
          rewrite: "LN({0})"
        # Note: Postgres doesn't have a log function which takes an approx numeric as the second argument.
        - args:
            - "decimal"
            - "decimal"
          return: "double"
          rewrite: "CAST(LOG({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "decimal"
            - "bigint"
          return: "double"
          rewrite: "CAST(LOG({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "decimal"
            - "integer"
          return: "double"
          rewrite: "CAST(LOG({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "double"
            - "decimal"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "double"
            - "bigint"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "float"
            - "decimal"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "float"
            - "bigint"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "float"
            - "integer"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "bigint"
            - "decimal"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "bigint"
            - "bigint"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "bigint"
            - "integer"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "integer"
            - "decimal"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "integer"
            - "bigint"
          return: "double"
          rewrite: "LOG({0}, {1})"
        - args:
            - "integer"
            - "integer"
          return: "double"
          rewrite: "LOG({0}, {1})"
    - names:
        - "log10"
      signatures:
        - args:
            - "decimal"
          return: "double"
          rewrite: "CAST(LOG({0}) AS DOUBLE PRECISION)"
        - args:
            - "double"
          return: "double"
          rewrite: "LOG({0})"
        - args:
            - "float"
          return: "double"
          rewrite: "LOG({0})"
        - args:
            - "bigint"
          return: "double"
          rewrite: "LOG({0})"
        - args:
            - "integer"
          return: "double"
          rewrite: "LOG({0})"
    - names:
        - "round"
      signatures:
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "integer"
          return: "integer"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "float"
        - args:
            - "decimal"
            - "decimal"
          return: "decimal"
        - args:
            - "decimal"
            - "double"
          return: "decimal"
        - args:
            - "decimal"
            - "float"
          return: "decimal"
        - args:
            - "decimal"
            - "bigint"
          return: "decimal"
        - args:
            - "decimal"
            - "integer"
          return: "decimal"
        - args:
            - "double"
            - "decimal"
          return: "double"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "double"
            - "double"
          return: "double"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "double"
            - "float"
          return: "double"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "double"
            - "bigint"
          return: "double"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "float"
            - "decimal"
          return: "float"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "float"
            - "double"
          return: "float"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "float"
            - "float"
          return: "float"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "float"
            - "bigint"
          return: "float"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "float"
            - "integer"
          return: "float"
          rewrite: "ROUND(CAST({0} as decimal), {1})"
        - args:
            - "bigint"
            - "decimal"
          return: "bigint"
        - args:
            - "bigint"
            - "double"
          return: "bigint"
        - args:
            - "bigint"
            - "float"
          return: "bigint"
        - args:
            - "bigint"
            - "bigint"
          return: "bigint"
        - args:
            - "bigint"
            - "integer"
          return: "bigint"
        - args:
            - "integer"
            - "decimal"
          return: "integer"
        - args:
            - "integer"
            - "double"
          return: "integer"
        - args:
            - "integer"
            - "float"
          return: "integer"
        - args:
            - "integer"
            - "bigint"
          return: "integer"
        - args:
            - "integer"
            - "integer"
          return: "integer"
    # Modified Expressions

    # Generated expressions

    - names:
        - "+"
        - "-"
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "decimal"
        - args:
            - "decimal"
            - "double"
          return: "double"
        - args:
            - "decimal"
            - "float"
          return: "double"
        - args:
            - "decimal"
            - "bigint"
          return: "decimal"
        - args:
            - "decimal"
            - "integer"
          return: "decimal"
        - args:
            - "decimal"
            - "boolean"
          return: "decimal"
        - args:
            - "decimal"
            - "varchar"
          return: "decimal"
        - args:
            - "double"
            - "double"
          return: "double"
        - args:
            - "double"
            - "decimal"
          return: "double"
        - args:
            - "double"
            - "float"
          return: "double"
        - args:
            - "double"
            - "bigint"
          return: "double"
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "({0} + CAST({1} AS DOUBLE PRECISION))"
        - args:
            - "double"
            - "boolean"
          return: "double"
        - args:
            - "double"
            - "varchar"
          return: "double"
        - args:
            - "float"
            - "double"
          return: "double"
        - args:
            - "float"
            - "decimal"
          return: "double"
        - args:
            - "float"
            - "float"
          return: "float"
        - args:
            - "float"
            - "bigint"
          return: "float"
        - args:
            - "float"
            - "integer"
          return: "float"
          rewrite: "({0} + CAST({1} AS FLOAT))"
        - args:
            - "float"
            - "boolean"
          return: "float"
        - args:
            - "float"
            - "varchar"
          return: "float"
        - args:
            - "bigint"
            - "bigint"
          return: "bigint"
        - args:
            - "bigint"
            - "decimal"
          return: "decimal"
        - args:
            - "bigint"
            - "double"
          return: "double"
        - args:
            - "bigint"
            - "float"
          return: "float"
        - args:
            - "bigint"
            - "integer"
          return: "bigint"
        - args:
            - "bigint"
            - "boolean"
          return: "bigint"
        - args:
            - "bigint"
            - "varchar"
          return: "bigint"
        - args:
            - "integer"
            - "integer"
          return: "integer"
        - args:
            - "integer"
            - "decimal"
          return: "decimal"
        - args:
            - "integer"
            - "double"
          return: "double"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) + {1})"
        - args:
            - "integer"
            - "float"
          return: "float"
          rewrite: "(CAST({0} AS FLOAT) + {1})"
        - args:
            - "integer"
            - "bigint"
          return: "bigint"
        - args:
            - "integer"
            - "boolean"
          return: "integer"
        - args:
            - "integer"
            - "varchar"
          return: "integer"
        - args:
            - "varchar"
            - "varchar"
          return: "varchar"
        - args:
            - "varchar"
            - "decimal"
          return: "decimal"
        - args:
            - "varchar"
            - "double"
          return: "double"
        - args:
            - "varchar"
            - "bigint"
          return: "bigint"
        - args:
            - "varchar"
            - "integer"
          return: "integer"
        - args:
            - "boolean"
            - "decimal"
          return: "decimal"
        - args:
            - "boolean"
            - "double"
          return: "double"
        - args:
            - "boolean"
            - "bigint"
          return: "bigint"
        - args:
            - "boolean"
            - "integer"
          return: "integer"
        - args:
            - "timestamp"
            - "timestamp"
          return: "timestamp"
    - names:
        - "/"
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "decimal"
        - args:
            - "decimal"
            - "double"
          return: "double"
        - args:
            - "decimal"
            - "float"
          return: "double"
        - args:
            - "decimal"
            - "bigint"
          return: "decimal"
        - args:
            - "decimal"
            - "integer"
          return: "decimal"
        - args:
            - "decimal"
            - "boolean"
          return: "decimal"
        - args:
            - "decimal"
            - "varchar"
          return: "decimal"
        - args:
            - "double"
            - "double"
          return: "double"
        - args:
            - "double"
            - "decimal"
          return: "double"
        - args:
            - "double"
            - "float"
          return: "double"
        - args:
            - "double"
            - "bigint"
          return: "double"
        - args:
            - "double"
            - "integer"
          return: "double"
        - args:
            - "double"
            - "boolean"
          return: "double"
        - args:
            - "double"
            - "varchar"
          return: "double"
        - args:
            - "float"
            - "double"
          return: "double"
        - args:
            - "float"
            - "decimal"
          return: "double"
        - args:
            - "float"
            - "float"
          return: "float"
        - args:
            - "float"
            - "bigint"
          return: "double"
        - args:
            - "float"
            - "integer"
          return: "float"
        - args:
            - "float"
            - "boolean"
          return: "float"
        - args:
            - "float"
            - "varchar"
          return: "float"
        - args:
            - "bigint"
            - "bigint"
          return: "bigint"
        - args:
            - "bigint"
            - "decimal"
          return: "decimal"
        - args:
            - "bigint"
            - "double"
          return: "double"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) / {1})"
        - args:
            - "bigint"
            - "float"
          return: "double"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) / {1})"
        - args:
            - "bigint"
            - "integer"
          return: "bigint"
        - args:
            - "bigint"
            - "boolean"
          return: "bigint"
        - args:
            - "bigint"
            - "varchar"
          return: "bigint"
        - args:
            - "integer"
            - "integer"
          return: "integer"
        - args:
            - "integer"
            - "decimal"
          return: "decimal"
        - args:
            - "integer"
            - "double"
          return: "double"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) / {1})"
        - args:
            - "integer"
            - "float"
          return: "float"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) / {1})"
        - args:
            - "integer"
            - "bigint"
          return: "bigint"
        - args:
            - "integer"
            - "boolean"
          return: "integer"
        - args:
            - "integer"
            - "varchar"
          return: "integer"
        - args:
            - "varchar"
            - "decimal"
          return: "decimal"
        - args:
            - "varchar"
            - "double"
          return: "double"
        - args:
            - "varchar"
            - "float"
          return: "float"
        - args:
            - "varchar"
            - "bigint"
          return: "bigint"
        - args:
            - "varchar"
            - "integer"
          return: "integer"
        - args:
            - "boolean"
            - "double"
          return: "double"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) / {1})"
        - args:
            - "boolean"
            - "float"
          return: "float"
          rewrite: "(CAST({0} AS DOUBLE PRECISION) / {1})"
        - args:
            - "boolean"
            - "bigint"
          return: "bigint"
        - args:
            - "boolean"
            - "integer"
          return: "integer"
    - names:
        - "*"
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "decimal"
        - args:
            - "decimal"
            - "double"
          return: "double"
        - args:
            - "decimal"
            - "float"
          return: "double"
        - args:
            - "decimal"
            - "bigint"
          return: "decimal"
        - args:
            - "decimal"
            - "integer"
          return: "decimal"
        - args:
            - "decimal"
            - "boolean"
          return: "decimal"
        - args:
            - "decimal"
            - "varchar"
          return: "decimal"
        - args:
            - "double"
            - "double"
          return: "double"
        - args:
            - "double"
            - "decimal"
          return: "double"
        - args:
            - "double"
            - "float"
          return: "double"
        - args:
            - "double"
            - "bigint"
          return: "double"
        - args:
            - "double"
            - "integer"
          return: "double"
        - args:
            - "double"
            - "boolean"
          return: "double"
        - args:
            - "double"
            - "varchar"
          return: "double"
        - args:
            - "float"
            - "double"
          return: "double"
        - args:
            - "float"
            - "decimal"
          return: "float"
        - args:
            - "float"
            - "float"
          return: "float"
        - args:
            - "float"
            - "bigint"
          return: "double"
        - args:
            - "float"
            - "integer"
          return: "float"
        - args:
            - "float"
            - "boolean"
          return: "float"
        - args:
            - "float"
            - "varchar"
          return: "float"
        - args:
            - "bigint"
            - "bigint"
          return: "bigint"
        - args:
            - "bigint"
            - "decimal"
          return: "decimal"
        - args:
            - "bigint"
            - "double"
          return: "double"
        - args:
            - "bigint"
            - "float"
          return: "double"
        - args:
            - "bigint"
            - "integer"
          return: "bigint"
        - args:
            - "bigint"
            - "boolean"
          return: "bigint"
        - args:
            - "bigint"
            - "varchar"
          return: "bigint"
        - args:
            - "integer"
            - "integer"
          return: "integer"
        - args:
            - "integer"
            - "decimal"
          return: "decimal"
        - args:
            - "integer"
            - "double"
          return: "double"
        - args:
            - "integer"
            - "float"
          return: "float"
        - args:
            - "integer"
            - "bigint"
          return: "bigint"
        - args:
            - "integer"
            - "boolean"
          return: "integer"
        - args:
            - "integer"
            - "varchar"
          return: "integer"
        - args:
            - "varchar"
            - "decimal"
          return: "decimal"
        - args:
            - "varchar"
            - "double"
          return: "double"
        - args:
            - "varchar"
            - "float"
          return: "float"
        - args:
            - "varchar"
            - "bigint"
          return: "bigint"
        - args:
            - "varchar"
            - "integer"
          return: "integer"
        - args:
            - "boolean"
            - "double"
          return: "double"
        - args:
            - "boolean"
            - "float"
          return: "float"
        - args:
            - "boolean"
            - "bigint"
          return: "bigint"
        - args:
            - "boolean"
            - "integer"
          return: "integer"
    - names:
        - "is null"
      signatures:
        - args:
            - "float"
          return: "boolean"
        - args:
            - "integer"
          return: "boolean"
        - args:
            - "time"
          return: "boolean"
        - args:
            - "varbinary"
          return: "boolean"
        - args:
            - "timestamp"
          return: "boolean"
        - args:
            - "boolean"
          return: "boolean"
        - args:
            - "date"
          return: "boolean"
        - args:
            - "double"
          return: "boolean"
        - args:
            - "decimal"
          return: "boolean"
        - args:
            - "varchar"
          return: "boolean"
        - args:
            - "bigint"
          return: "boolean"
    - names:
        - "is not null"
      signatures:
        - args:
            - "float"
          return: "boolean"
        - args:
            - "integer"
          return: "boolean"
        - args:
            - "time"
          return: "boolean"
        - args:
            - "varbinary"
          return: "boolean"
        - args:
            - "timestamp"
          return: "boolean"
        - args:
            - "boolean"
          return: "boolean"
        - args:
            - "date"
          return: "boolean"
        - args:
            - "double"
          return: "boolean"
        - args:
            - "decimal"
          return: "boolean"
        - args:
            - "varchar"
          return: "boolean"
        - args:
            - "bigint"
          return: "boolean"
    - names:
        - "is distinct from"
      signatures:
        - args:
            - "boolean"
            - "boolean"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varbinary"
            - "varbinary"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "date"
            - "date"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "integer"
            - "integer"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "bigint"
            - "bigint"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "integer"
            - "bigint"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "bigint"
            - "integer"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "double"
            - "double"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "double"
            - "integer"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "integer"
            - "double"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "bigint"
            - "double"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "double"
            - "bigint"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "time"
            - "time"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "timestamp"
            - "timestamp"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "integer"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^-?[0-9]+$'' AND CAST({0} AS INT8) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "integer"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^-?[0-9]+$'' AND {0} = CAST({1} AS INT8)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "bigint"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^-?[0-9]+$'' AND CAST({0} AS INT8) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "bigint"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^-?[0-9]+$'' AND {0} = CAST({1} AS INT8)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "double"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND CAST({0} AS FLOAT8) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "double"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND {0} = CAST({1} AS FLOAT8)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( [0-9]+:[0-9][0-9]:[0-9][0-9](\\.[0-9]+)?)?$'' AND CAST({0} AS TIMESTAMP) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( [0-9]+:[0-9][0-9]:[0-9][0-9](\\.[0-9]+)?)?$'' AND {0} = CAST({1} AS TIMESTAMP)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[0-9]+:[0-9][0-9](:[0-9][0-9](\\.[0-9]+))?$'' AND CAST({0} AS TIME) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[0-9]+:[0-9][0-9](:[0-9][0-9](\\.[0-9]+))?$'' AND {0} = CAST({1} AS TIME)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( 00:00:00(.0+)?)?$'' AND CAST({0} AS DATE) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( 00:00:00(.0+)?)?$'' AND {0} = CAST({1} AS DATE)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "boolean"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR (LOWER({1}) ~ ''^([tf01yn]|yes|no|true|false|on|off)$'' AND {0} = CAST({1} AS BOOLEAN)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "boolean"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR (LOWER({0}) ~ ''^([tf01yn]|yes|no|true|false|on|off)$'' AND CAST({0} AS BOOLEAN) = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "float"
            - "float"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "float"
            - "integer"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "integer"
            - "float"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "float"
            - "bigint"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "bigint"
            - "float"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "float"
            - "double"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "double"
            - "float"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} = {1}) THEN 0 ELSE 1 END = 1 "
        - args:
            - "float"
            - "varchar"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND {0} = CAST({1} AS FLOAT4)) THEN 0 ELSE 1 END = 1 "
        - args:
            - "varchar"
            - "float"
          return: "boolean"
          rewrite: "CASE WHEN ({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND CAST({1} AS FLOAT4) = {1}) THEN 0 ELSE 1 END = 1 "
    - names:
        - "is not distinct from"
      signatures:
        - args:
            - "boolean"
            - "boolean"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "varbinary"
            - "varbinary"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "date"
            - "date"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "integer"
            - "integer"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "bigint"
            - "bigint"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "integer"
            - "bigint"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "bigint"
            - "integer"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "double"
            - "double"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "double"
            - "integer"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "integer"
            - "double"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "bigint"
            - "double"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "double"
            - "bigint"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "time"
            - "time"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "timestamp"
            - "timestamp"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "varchar"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "varchar"
            - "integer"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^-?[0-9]+$'' AND CAST({0} AS INT8) = {1}))"
        - args:
            - "integer"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^-?[0-9]+$'' AND {0} = CAST({1} AS INT8)))"
        - args:
            - "varchar"
            - "bigint"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^-?[0-9]+$'' AND CAST({0} AS INT8) = {1}))"
        - args:
            - "bigint"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^-?[0-9]+$'' AND {0} = CAST({1} AS INT8)))"
        - args:
            - "varchar"
            - "double"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND CAST({0} AS FLOAT8) = {1}))"
        - args:
            - "double"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND {0} = CAST({1} AS FLOAT8)))"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( [0-9]+:[0-9][0-9]:[0-9][0-9](\\.[0-9]+)?)?$'' AND CAST({0} AS TIMESTAMP) = {1}))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( [0-9]+:[0-9][0-9]:[0-9][0-9](\\.[0-9]+)?)?$'' AND {0} = CAST({1} AS TIMESTAMP)))"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[0-9]+:[0-9][0-9](:[0-9][0-9](\\.[0-9]+))?$'' AND CAST({0} AS TIME) = {1}))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[0-9]+:[0-9][0-9](:[0-9][0-9](\\.[0-9]+))?$'' AND {0} = CAST({1} AS TIME)))"
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( 00:00:00(.0+)?)?$'' AND CAST({0} AS DATE) = {1}))"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[0-9]+\\-[0-9][0-9]\\-[0-9][0-9]( 00:00:00(.0+)?)?$'' AND {0} = CAST({1} AS DATE)))"
        - args:
            - "boolean"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR (LOWER({1}) ~ ''^([tf01yn]|yes|no|true|false|on|off)$'' AND {0} = CAST({1} AS BOOLEAN)))"
        - args:
            - "varchar"
            - "boolean"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR (LOWER({0}) ~ ''^([tf01yn]|yes|no|true|false|on|off)$'' AND CAST({0} AS BOOLEAN) = {1}))"
        - args:
            - "float"
            - "float"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "float"
            - "integer"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "integer"
            - "float"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "float"
            - "bigint"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "bigint"
            - "float"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "float"
            - "double"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "double"
            - "float"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} = {1}))"
        - args:
            - "float"
            - "varchar"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({1} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND {0} = CAST({1} AS FLOAT4)))"
        - args:
            - "varchar"
            - "float"
          return: "boolean"
          rewrite: "(({0} IS NULL AND {1} IS NULL) OR ({0} ~ ''^[+\\-]?[0-9]+\\.?[0-9]*$'' AND CAST({1} AS FLOAT4) = {1}))"
    - names:
        - "="
        - "!="
        - "<>"
        - ">"
        - ">="
        - "<"
        - "<="
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "boolean"
        - args:
            - "decimal"
            - "double"
          return: "boolean"
        - args:
            - "decimal"
            - "float"
          return: "boolean"
        - args:
            - "decimal"
            - "bigint"
          return: "boolean"
        - args:
            - "decimal"
            - "integer"
          return: "boolean"
        - args:
            - "decimal"
            - "varchar"
          return: "boolean"
        - args:
            - "double"
            - "double"
          return: "boolean"
        - args:
            - "double"
            - "decimal"
          return: "boolean"
        - args:
            - "double"
            - "float"
          return: "boolean"
        - args:
            - "double"
            - "bigint"
          return: "boolean"
        - args:
            - "double"
            - "integer"
          return: "boolean"
        - args:
            - "double"
            - "varchar"
          return: "boolean"
        - args:
            - "float"
            - "float"
          return: "boolean"
        - args:
            - "float"
            - "decimal"
          return: "boolean"
        - args:
            - "float"
            - "double"
          return: "boolean"
        - args:
            - "float"
            - "bigint"
          return: "boolean"
        - args:
            - "float"
            - "integer"
          return: "boolean"
        - args:
            - "float"
            - "varchar"
          return: "boolean"
        - args:
            - "bigint"
            - "bigint"
          return: "boolean"
        - args:
            - "bigint"
            - "decimal"
          return: "boolean"
        - args:
            - "bigint"
            - "double"
          return: "boolean"
        - args:
            - "bigint"
            - "float"
          return: "boolean"
        - args:
            - "bigint"
            - "integer"
          return: "boolean"
        - args:
            - "bigint"
            - "varchar"
          return: "boolean"
        - args:
            - "integer"
            - "integer"
          return: "boolean"
        - args:
            - "integer"
            - "decimal"
          return: "boolean"
        - args:
            - "integer"
            - "double"
          return: "boolean"
        - args:
            - "integer"
            - "float"
          return: "boolean"
        - args:
            - "integer"
            - "bigint"
          return: "boolean"
        - args:
            - "integer"
            - "varchar"
          return: "boolean"
        - args:
            - "varchar"
            - "varchar"
          return: "boolean"
        - args:
            - "varchar"
            - "decimal"
          return: "boolean"
        - args:
            - "varchar"
            - "double"
          return: "boolean"
        - args:
            - "varchar"
            - "float"
          return: "boolean"
        - args:
            - "varchar"
            - "bigint"
          return: "boolean"
        - args:
            - "varchar"
            - "integer"
          return: "boolean"
        - args:
            - "date"
            - "date"
          return: "boolean"
        - args:
            - "date"
            - "timestamp"
          return: "boolean"
        - args:
            - "timestamp"
            - "date"
          return: "boolean"
        - args:
            - "timestamp"
            - "timestamp"
          return: "boolean"
        - args:
            - "time"
            - "time"
          return: "boolean"
        - args:
            - "time"
            - "timestamp"
          return: "boolean"
        - args:
            - "varbinary"
            - "varbinary"
          return: "boolean"
        - args:
            - "boolean"
            - "boolean"
          return: "boolean"
    - names:
        - "="
      signatures:
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(CAST({0} AS DATE) = {1})"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(CAST({0} AS TIME) = {1})"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(CAST({0} AS TIMESTAMP) = {1})"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "({0} = CAST({1} AS DATE))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "({0} = CAST({1} AS TIMESTAMP))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "({0} = CAST({1} AS TIME))"
    - names:
        - ">"
      signatures:
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(CAST({0} AS DATE) > {1})"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(CAST({0} AS TIME) > {1})"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(CAST({0} AS TIMESTAMP) > {1})"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "({0} < CAST({1} AS DATE))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "({0} < CAST({1} AS TIMESTAMP))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "({0} < CAST({1} AS TIME))"
    - names:
        - ">="
      signatures:
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(CAST({0} AS DATE) >= {1})"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(CAST({0} AS TIME) >= {1})"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(CAST({0} AS TIMESTAMP) >= {1})"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "({0} <= CAST({1} AS DATE))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "({0} <= CAST({1} AS TIMESTAMP))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "({0} <= CAST({1} AS TIME))"
    - names:
        - "<"
      signatures:
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(CAST({0} AS DATE) < {1})"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(CAST({0} AS TIME) < {1})"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(CAST({0} AS TIMESTAMP) < {1})"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "({0} > CAST({1} AS DATE))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "({0} > CAST({1} AS TIMESTAMP))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "({0} > CAST({1} AS TIME))"
    - names:
        - "<="
      signatures:
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(CAST({0} AS DATE) <= {1})"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(CAST({0} AS TIME) <= {1})"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(CAST({0} AS TIMESTAMP) <= {1})"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "({0} >= CAST({1} AS DATE))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "({0} >= CAST({1} AS TIMESTAMP))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "({0} >= CAST({1} AS TIME))"
    - names:
        - "!="
        - "<>"
      signatures:
        - args:
            - "varchar"
            - "date"
          return: "boolean"
          rewrite: "(CAST({0} AS DATE) != {1})"
        - args:
            - "varchar"
            - "time"
          return: "boolean"
          rewrite: "(CAST({0} AS TIME) != {1})"
        - args:
            - "varchar"
            - "timestamp"
          return: "boolean"
          rewrite: "(CAST({0} AS TIMESTAMP) != {1})"
        - args:
            - "date"
            - "varchar"
          return: "boolean"
          rewrite: "({0} != CAST({1} AS DATE))"
        - args:
            - "timestamp"
            - "varchar"
          return: "boolean"
          rewrite: "({0} != CAST({1} AS TIMESTAMP))"
        - args:
            - "time"
            - "varchar"
          return: "boolean"
          rewrite: "({0} != CAST({1} AS TIME))"
    - names:
        - "regexp_like"
      signatures:
        - args:
            - "varchar"
            - "varchar"
          return: "boolean"
          rewrite: "({0} ~ {1})"
    - names:
        - "like"
      signatures:
        - args:
            - "varchar"
            - "varchar"
          return: "boolean"
        - args:
            - "varbinary"
            - "varbinary"
          return: "boolean"
    - names:
        - "not"
      signatures:
        - args:
            - "boolean"
          return: "boolean"
    - names:
        - "||"
      signatures:
        - args:
            - "time"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "date"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "float"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "timestamp"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "boolean"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "varbinary"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "time"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "boolean"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "double"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "float"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "bigint"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varbinary"
            - "varbinary"
          return: "varbinary"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varbinary"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "timestamp"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "double"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "date"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "varchar"
            - "bigint"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
        - args:
            - "integer"
            - "varchar"
          return: "varchar"
          rewrite: "CASE WHEN {0} IS NULL OR {1} IS NULL THEN NULL ELSE CONCAT({0}, {1}) END "
    - names:
        - "or"
      signatures:
        - args:
            - "boolean"
            - "boolean"
          return: "boolean"
    - names:
        - "abs"
      signatures:
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "integer"
          return: "integer"
        - args:
            - "double"
          return: "double"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "float"
          return: "double"
    - names:
        - "acos"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "asin"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "atan"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "atan2"
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "double"
        - args:
            - "decimal"
            - "double"
          return: "double"
        - args:
            - "decimal"
            - "float"
          return: "double"
        - args:
            - "decimal"
            - "bigint"
          return: "double"
        - args:
            - "decimal"
            - "integer"
          return: "double"
        - args:
            - "double"
            - "decimal"
          return: "double"
        - args:
            - "double"
            - "double"
          return: "double"
        - args:
            - "double"
            - "float"
          return: "double"
        - args:
            - "double"
            - "bigint"
          return: "double"
        - args:
            - "double"
            - "integer"
          return: "double"
        - args:
            - "float"
            - "decimal"
          return: "double"
        - args:
            - "float"
            - "double"
          return: "double"
        - args:
            - "float"
            - "float"
          return: "double"
        - args:
            - "float"
            - "bigint"
          return: "double"
        - args:
            - "float"
            - "integer"
          return: "double"
        - args:
            - "bigint"
            - "decimal"
          return: "double"
        - args:
            - "bigint"
            - "double"
          return: "double"
        - args:
            - "bigint"
            - "float"
          return: "double"
        - args:
            - "bigint"
            - "bigint"
          return: "double"
        - args:
            - "bigint"
            - "integer"
          return: "double"
        - args:
            - "integer"
            - "decimal"
          return: "double"
        - args:
            - "integer"
            - "double"
          return: "double"
        - args:
            - "integer"
            - "float"
          return: "double"
        - args:
            - "integer"
            - "bigint"
          return: "double"
        - args:
            - "integer"
            - "integer"
          return: "double"
    - names:
        - "cbrt"
      signatures:
        - args:
            - "bigint"
          return: "double"
        - args:
            - "decimal"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "ceil"
        - "ceiling"
      signatures:
        - args:
            - "decimal"
          return: "decimal"
        - args:
            - "bigint"
          return: "bigint"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "float"
        - args:
            - "integer"
          return: "integer"
    - names:
        - "cos"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "cot"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "degrees"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "e"
      signatures:
        - args: []
          return: "double"
    - names:
        - "exp"
      signatures:
        - args:
            - "decimal"
          return: "double"
          rewrite: "CAST(EXP({0}) AS DOUBLE PRECISION)"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "ln"
      signatures:
        - args:
            - "decimal"
          return: "double"
          rewrite: "CAST(LN({0}) AS DOUBLE PRECISION)"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "mod"
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "decimal"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "decimal"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "decimal"
            - "float"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "decimal"
            - "bigint"
          return: "decimal"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "decimal"
            - "integer"
          return: "decimal"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "double"
            - "decimal"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "double"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "double"
            - "float"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "double"
            - "bigint"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "float"
            - "decimal"
          return: "float"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "float"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "float"
            - "float"
          return: "float"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "float"
            - "bigint"
          return: "float"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "float"
            - "integer"
          return: "float"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "bigint"
            - "decimal"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "bigint"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "bigint"
            - "float"
          return: "float"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "bigint"
            - "bigint"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "bigint"
            - "integer"
          return: "integer"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "integer"
            - "decimal"
          return: "decimal"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "integer"
            - "double"
          return: "double"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "integer"
            - "float"
          return: "float"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "integer"
            - "bigint"
          return: "bigint"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
        - args:
            - "integer"
            - "integer"
          return: "integer"
          rewrite: "CASE WHEN {1} = 0 THEN NULL ELSE MOD({0}, {1}) END "
    - names:
        - "power"
        - "pow"
      signatures:
        - args:
            - "decimal"
            - "decimal"
          return: "double"
          rewrite: "CAST(POWER({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "decimal"
            - "double"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "decimal"
            - "float"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "decimal"
            - "bigint"
          return: "double"
          rewrite: "CAST(POWER({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "decimal"
            - "integer"
          return: "double"
          rewrite: "CAST(POWER({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "double"
            - "decimal"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "double"
            - "double"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "double"
            - "float"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "double"
            - "bigint"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "double"
            - "integer"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "float"
            - "decimal"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "float"
            - "double"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "float"
            - "float"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "float"
            - "bigint"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "float"
            - "integer"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "bigint"
            - "decimal"
          return: "double"
          rewrite: "CAST(POWER({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "bigint"
            - "double"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "bigint"
            - "float"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "bigint"
            - "bigint"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "bigint"
            - "integer"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "integer"
            - "decimal"
          return: "double"
          rewrite: "CAST(POWER({0}, {1}) AS DOUBLE PRECISION)"
        - args:
            - "integer"
            - "double"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "integer"
            - "float"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "integer"
            - "bigint"
          return: "double"
          rewrite: "POWER({0}, {1})"
        - args:
            - "integer"
            - "integer"
          return: "double"
          rewrite: "POWER({0}, {1})"
    - names:
        - "radians"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "sin"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "sqrt"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "tan"
      signatures:
        - args:
            - "decimal"
          return: "double"
        - args:
            - "bigint"
          return: "double"
        - args:
            - "double"
          return: "double"
        - args:
            - "float"
          return: "double"
        - args:
            - "integer"
          return: "double"
    - names:
        - "char_length"
      signatures:
        - args:
            - "varchar"
          return: "integer"
    - names:
        - "character_length"
      signatures:
        - args:
            - "varchar"
          return: "integer"
    - names:
        - "lower"
      signatures:
        - args:
            - "varchar"
          return: "varchar"
    - names:
        - "replace"
      signatures:
        - args:
            - "varchar"
            - "varchar"
            - "varchar"
          return: "varchar"
    - names:
        - "substring"
      signatures:
        - args:
            - "varchar"
            - "integer"
            - "integer"
          return: "varchar"
    - names:
        - "substr"
      signatures:
        - args:
            - "varchar"
            - "integer"
            - "integer"
          return: "varchar"
    - names:
        - "substring"
      signatures:
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
    - names:
        - "substr"
      signatures:
        - args:
            - "varchar"
            - "integer"
          return: "varchar"
    - names:
        - "upper"
      signatures:
        - args:
            - "varchar"
          return: "varchar"
  variable_length_operators:
    - names:
        - concat
      variable_signatures:
        - return: varchar
          arg_type: varchar
          variable_rewrite:
            separator_sequence:
              - ', '
            rewrite_format: 'CONCAT({separator[0]})'
    - names:
        - and
      variable_signatures:
        - return: boolean
          arg_type: boolean
    - names:
        - or
      variable_signatures:
        - return: boolean
          arg_type: boolean
  window_functions: []

```
## 4. 测试
```java
public class QuestTest extends BaseTestQuery2 {
    private QuestDBConf questDBConf;
    @Before
    public  void initSource(){
        SabotContext sabotContext = getSabotContext();
        sabotContext.getOptionManager().setOption(OptionValue.createBoolean(OptionValue.OptionType.SYSTEM,
                "hadoop_block_affinity_cache.enabled",
                false));
        SourceConfig sc = new SourceConfig();
        sc.setName("questdb");
        questDBConf = new QuestDBConf();
        questDBConf.host = "192.168.203.128";
        questDBConf.port = "8812";
        questDBConf.username="admin";
        questDBConf.password="quest";
        sc.setConnectionConf(questDBConf);
        sc.setMetadataPolicy(CatalogService.REFRESH_EVERYTHING_NOW);
        sabotContext.getCatalogService().createSourceIfMissingWithThrow(sc);
    }

    @Test
    public  void test() throws Exception {
        String query  = "select id,name from questdb.qdb.test limit 1";
        TestResult testResult=  testBuilder()
                .sqlQuery(query)
                .unOrdered()
                .baselineColumns("id","name")
                .baselineValues("1","aaa")
                .go();
    }


}
```
## 5. 打包
` mvn clean package -DskipTests`
jar上传至 `/opt/dremio/jars/3rdparty`中,重启dremio 服务即可.
`service dremio start`
`service dremio stop`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1646791598887-4f58e531-28a5-4510-8aba-d7849e340f3b.png#clientId=u40010713-cff7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=295&id=u147c65a8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=484&originWidth=958&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29586&status=done&style=none&taskId=u7f5f2198-a4bb-4c47-b0e0-17165e52f51&title=&width=584)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1646791638602-58803202-75f1-495c-b8ee-3bf086ed6d1a.png#clientId=u40010713-cff7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=135&id=ud79cf6bb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=254&originWidth=1109&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16148&status=done&style=none&taskId=u8773e75f-d376-4cb0-9f77-e3cad5afbc7&title=&width=588)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1646791622058-c55898ed-d810-4bc6-910b-4f8a488d02d6.png#clientId=u40010713-cff7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=297&id=u1de14f66&margin=%5Bobject%20Object%5D&name=image.png&originHeight=640&originWidth=1220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36473&status=done&style=none&taskId=u159c12d4-cecc-4d0b-bdbf-9d08017b95b&title=&width=566)


# Dremio 常用sql

1. 元数据
>   SELECT * FROM table("mysql-demo"
> .external_query('select table_name,column_name,data_type from all_tab_cols WHERE table_name 
> in(''table1'') 
> AND HIDDEN_COLUMN=''NO'''))

2. 表
> select * from  table("mysql-demo".external_query('select  * from  table1'))

