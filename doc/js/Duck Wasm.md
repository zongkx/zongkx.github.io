## pyodide

[参考](https://github.com/duckdb/duckdb-pyodide/blob/main/console.html)

python wasm可以通关 引入duckdb模块 实现 duck wasm

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>DuckDB 示例</title>
    <script src="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js"></script>
    <script>
        async function main() {
            // 加载 Pyodide，提供 indexURL 参数
            let pyodide = await loadPyodide({indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"});
            // 安装 DuckDB 模块
            await pyodide.loadPackage("duckdb");
            pyodide.setDebug(true);
            // 执行 DuckDB 代码
            const pythonCode = `
                import duckdb
                # 执行 SQL 查询
                result = duckdb.sql("SELECT '42 in an editor' AS s").fetchall()
                result
            `;
            // 执行 Python 代码
            let result = await pyodide.runPythonAsync(pythonCode);
            console.log("DuckDB 查询结果:", result);
            // 显示结果
            document.getElementById('output').innerText = 'DuckDB 查询结果: ' + result[0][0]; // 直接访问第一个元素
        }

        // 页面加载时执行 main 函数
        window.onload = main;
    </script>
</head>
<body>
<h1>DuckDB 示例</h1>
<pre id="output"></pre>
</body>
</html>


```

## duck-wasm

[huey](https://github.com/rpbouman/huey)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Document</title>
</head>
<body>

<input id="fileInput" type="file"/>

<script>
    let mydb;
    document.getElementById('fileInput').addEventListener('change', async function (event) {
        const file = event.target.files[0]; // 获取选中的文件
        if (file) {
            await mydb.registerFileBuffer('buffer.parquet', new Uint8Array(await file.arrayBuffer()));
            const conn = await mydb.connect();
            conn.query("SELECT * from 'buffer.parquet'").then(function (resultset) {
                const row = duckDbRowToJSON(resultset.get(0));
                console.log(row)
            });
        } else {
            document.getElementById('fileContent').innerText = '未选择文件';
        }
    });

    function duckDbRowToJSON(object) {
        var pojo;
        if (typeof object.toJSON === 'function') {
            pojo = object.toJSON();
        } else {
            pojo = object;
        }
        return JSON.stringify(pojo, function (key, value) {
            if (value && value.constructor === BigInt) {
                return parseFloat(value.toString());
            } else {
                return value;
            }
        }, 2);
    }

    const getDb = async () => {
        const duckdb = window.duckdbduckdbWasm;
        // @ts-ignore
        if (window._db) return window._db;
        const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

        // Select a bundle based on browser checks
        const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

        const worker_url = URL.createObjectURL(
                new Blob([`importScripts("${bundle.mainWorker}");`], {
                    type: "text/javascript",
                })
        );

        // Instantiate the asynchronus version of DuckDB-wasm
        console.log(worker_url)
        const worker = new Worker(worker_url);
        // const logger = null //new duckdb.ConsoleLogger();
        const logger = new duckdb.ConsoleLogger();
        const db = new duckdb.AsyncDuckDB(logger, worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        URL.revokeObjectURL(worker_url);
        window._db = db;
        return db;
    };
</script>


<script type="module">
    import * as duckdbduckdbWasm from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.1-dev106.0/+esm";

    window.duckdbduckdbWasm = duckdbduckdbWasm;
    getDb().then(async (db) => {
        // Create a new connection
        const conn = await db.connect();
        // Prepare query
        const stmt = await conn.prepare(
                `SELECT v + ?
                 FROM generate_series(0, 10000) AS t(v);`
        );
        // ... and run the query with materialized results
        console.log((await stmt.query(234)).toArray());
        mydb = db;
    });
</script>
</body>
</html>

```
