## 初始化express项目,并安装cubejs

> npm install @cubejs-backend/server-core @cubejs-backend/mysql-driver

```js
const express = require('express');
const router = express.Router();
// npm install @cubejs-backend/server-core @cubejs-backend/mysql-driver
const {CubejsServerCore, FileRepository} = require('@cubejs-backend/server-core');

router.get('/', async function (req, res, next) {
    try {
        let dCubeSchema = '\\routes\\schema\\';
        const coreInstance = new CubejsServerCore({
            dbType: 'mysql', // Replace if using another DB
            schemaPath: dCubeSchema, // Correct the path to your schemas
        });
        const repository = new FileRepository(dCubeSchema);
        const files = await repository.dataSchemaFiles();
        console.log('Schema files:', files);
        const compilerApi = await coreInstance.getCompilerApi({authInfo: {}, securityContext: {}, requestId: 'demo',});
        const query = {
            // measures: ['Orders.total'],
            dimensions: ['demo.id'],
            // filters: [{sql: `${CUBE}.status = 'processed'`}]
        };
        const {sql} = await compilerApi.getSql(query, {repository});
        console.log(sql);
        res.send(sql);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({error: 'An error occurred while processing your request.'});
    }
});
module.exports = router;
```

在 项目的 `route\schema` 添加 yml文件

```yaml
cubes:
  - name: demo
    sql_alias: demo
    sql_table: select 1 as id
    title: 测试
    data_source: default

    dimensions:
      - name: id
        sql: "id"
        type: number
        primary_key: true
```