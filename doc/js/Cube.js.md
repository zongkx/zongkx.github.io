# Cube.js

> [https://cube.dev/docs/](https://cube.dev/docs/)


根据schema动态生成SQL以及对应的图表统计信息

## 多数据源

支持开箱即用

连接Dremio提供的数据湖功能实现多数据源.

## 多租户

不同的用户拥有不同的数据,比如每个用户都拥有某个库下自己的schema

# Cube.js Demo

node环境

> $ npx cubejs-cli create hello-world -d mysql


修改.env文件

```properties
CUBEJS_DB_HOST=127.0.0.1
CUBEJS_DB_NAME=zong
CUBEJS_DB_USER=root
CUBEJS_DB_PASS=123456
CUBEJS_WEB_SOCKETS=true
CUBEJS_DEV_MODE=true#开发者模式可以停用安全认证和缓存
CUBEJS_DB_TYPE=mysql
CUBEJS_API_SECRET=7231de6ada597c0aa66bbac5dcee0f2c75e3ccde30395c5001efbb8b0f2ceed41b242bdc0024fc56cb30861fe8ffdd45373387f667ec2a084e24341001f4bca9
```

启动

> npm run dev


# Cube Schema

## 1. cube

对某个表/实体进行管理

```javascript
cube(`User`, {
  sql: `SELECT * FROM zong.user`,
  measures:{},
  dimensions:{},//维度
  segments:{},
  preAggregations:{},//预聚集
  dataSource:{},//数据源
 }
```

## 2. measures

某种聚合操作,比如count/max

```javascript
 measures: {
    count: {
      type: `count`,
      drillMembers: [id, name]
    },
    doubleCount: {
      type: `number`,
      sql: `${count} * 2`
    },
    max : {
      type: `number`,
      sql: `max(id)`
    }
  }
```

### Measures Types

number/count/countDistinct/countDistinctApprox/sum/avg/mix/max/runningTotal

### Measures Formats

percent/curreny(货币)/

## 3. dimensions

数据列

```javascript
dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    createTime: {
      sql: `create_time`,
      type: `time`
    },
    
    updateTime: {
      sql: `update_time`,
      type: `time`
    }
  }
```

### Dimensions Types

time/string/number/boolean/geo(经纬度)

### Dimensions Formats

imageUrl/id/link/currencypercent

## 4. joins

连接,  relationship: `belongsTo` || `hasMany` || `hasOne`

> `user` ---- `hasMany`----> `role`


```javascript
  User:
  joins: {
      Role: {
        relationship: `hasMany`,
        sql: `${User}.id = ${Role}.uid`
      }
  }
```

在playground中使用,比如勾选

> MEASURES :User Count 						DIMENSIONS: Role Name


生成的SQL:

```sql
SELECT
  ` role `.name ` role__name `,
  count(distinct ` user `.id) ` user__count `
FROM
  zong.user AS ` user `
  LEFT JOIN zong.role AS ` role ` ON ` user `.id = ` role `.uid
GROUP BY
  1
ORDER BY
  2 DESC
LIMIT
  10000
```

## 5. segments

它是预定义的过滤器,功能和Filter类似,在生成的SQL中可见 where语句 添加的条件

```javascript
  segments:{
    sfUsers: {
      sql: `${CUBE}.id = '2'`
    }
  },
```

Filter在页面中勾选对应的DIMENSIONS或MEASURES设置 比较,其结果可以与segments实现同样的结果.

由于segments是预定义的过滤器,适合用在复杂查询中,为所有用户预置复杂的查询条件

## 6. preAggregations

预聚集:

要求cube拥有对数据源的写入权限,Cube.js首先在源数据库中将预聚合构建为表，然后将其导出到预聚合存储中.

比如

```javascript
  preAggregations: {
    main: {
      sqlAlias: `original`,
      type: `originalSql`,
    },
  },
```

构建成功后,可见数据库多了一个库dev_pre_aggregations,里面有cube生成的表,通过预聚集的特点,实现快速查询的目的.

使用外部预聚合需要安装driver:


yarn add @cubejs-backend/cubestore-driver --dev

```



```javascript
  preAggregations: {
    categoryAndDate: {
      type: `rollup`,
      external: true,
      measureReferences: [Orders.count, revenue],
      dimensionReferences: [category],
      timeDimensionReference: createdAt,
      granularity: `day`,
    },
  },
```

## 7. contexts

cube集合

```
context(`Sales`, {
  contextMembers: [Users, Deals, Meetings]
});
```

## 8. Execution Environment

- 


${CUBE} 可作为当前cube的指向,类似this

- 


ratio 可作为数据集的外部定义

```
const measureRatioDefinition = {
  sql: (CUBE, count) => `sum(${CUBE}.amount) / ${count}`,
  type: `number`,
};

cube(`Users`, {
  // ...

  measures: {
    count: {
      type: `count`,
    },

    ratio: measureRatioDefinition,
  },
});
```
