import{_ as a,c as n,o as i,a2 as p}from"./chunks/framework.ChA9Up81.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/js/Cube.js.md","filePath":"doc/js/Cube.js.md"}'),e={name:"doc/js/Cube.js.md"};function l(t,s,h,k,r,c){return i(),n("div",null,[...s[0]||(s[0]=[p(`<h2 id="cube-js-简介" tabindex="-1">Cube.js 简介 <a class="header-anchor" href="#cube-js-简介" aria-label="Permalink to &quot;Cube.js 简介&quot;">​</a></h2><blockquote><p><a href="https://cube.dev/docs/" target="_blank" rel="noreferrer">https://cube.dev/docs/</a></p></blockquote><p>根据schema动态生成SQL以及对应的图表统计信息</p><h3 id="多数据源" tabindex="-1">多数据源 <a class="header-anchor" href="#多数据源" aria-label="Permalink to &quot;多数据源&quot;">​</a></h3><p>支持开箱即用</p><p>连接Dremio提供的数据湖功能实现多数据源.</p><h3 id="多租户" tabindex="-1">多租户 <a class="header-anchor" href="#多租户" aria-label="Permalink to &quot;多租户&quot;">​</a></h3><p>不同的用户拥有不同的数据,比如每个用户都拥有某个库下自己的schema 简介</p><h2 id="cube-js-demo" tabindex="-1">Cube.js Demo <a class="header-anchor" href="#cube-js-demo" aria-label="Permalink to &quot;Cube.js Demo&quot;">​</a></h2><p>node环境</p><blockquote><p>$ npx cubejs-cli create hello-world -d mysql</p></blockquote><p>修改.env文件</p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_DB_HOST</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_DB_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=zong</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_DB_USER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=root</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_DB_PASS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=123456</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_WEB_SOCKETS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_DEV_MODE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#开发者模式可以停用安全认证和缓存</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_DB_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=mysql</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CUBEJS_API_SECRET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=7231de6ada597c0aa66bbac5dcee0f2c75e3ccde30395c5001efbb8b0f2ceed41b242bdc0024fc56cb30861fe8ffdd45373387f667ec2a084e24341001f4bca9</span></span></code></pre></div><p>启动</p><blockquote><p>npm run dev</p></blockquote><h2 id="cube-schema" tabindex="-1">Cube Schema <a class="header-anchor" href="#cube-schema" aria-label="Permalink to &quot;Cube Schema&quot;">​</a></h2><h3 id="_1-cube" tabindex="-1">1. cube <a class="header-anchor" href="#_1-cube" aria-label="Permalink to &quot;1. cube&quot;">​</a></h3><p>对某个表/实体进行管理</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cube</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`User\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sql: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`SELECT * FROM zong.user\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    measures: {},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dimensions: {},</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//维度</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    segments: {},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    preAggregations: {},</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//预聚集</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dataSource: {},</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//数据源</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="_2-measures" tabindex="-1">2. measures <a class="header-anchor" href="#_2-measures" aria-label="Permalink to &quot;2. measures&quot;">​</a></h3><p>某种聚合操作,比如count/max</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> measures: {</span></span>
<span class="line"><span>    count: {</span></span>
<span class="line"><span>        type: \`count\`,</span></span>
<span class="line"><span>            drillMembers</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        [id, name]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>,</span></span>
<span class="line"><span>    doubleCount: {</span></span>
<span class="line"><span>        type: \`number\`,</span></span>
<span class="line"><span>            sql</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        \`\${count} * 2\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>,</span></span>
<span class="line"><span>    max : {</span></span>
<span class="line"><span>        type: \`number\`,</span></span>
<span class="line"><span>            sql</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        \`max(id)\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Measures Types</p><blockquote><p>number/count/countDistinct/countDistinctApprox/sum/avg/mix/max/runningTotal</p></blockquote><p>Measures Formats</p><blockquote><p>percent/curreny(货币)/</p></blockquote><h3 id="_3-dimensions" tabindex="-1">3. dimensions <a class="header-anchor" href="#_3-dimensions" aria-label="Permalink to &quot;3. dimensions&quot;">​</a></h3><p>数据列</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dimensions: {</span></span>
<span class="line"><span>    id: {</span></span>
<span class="line"><span>        sql: \`id\`,</span></span>
<span class="line"><span>            type</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        \`number\`,</span></span>
<span class="line"><span>            primaryKey</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    createTime: {</span></span>
<span class="line"><span>        sql: \`create_time\`,</span></span>
<span class="line"><span>            type</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        \`time\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    updateTime: {</span></span>
<span class="line"><span>        sql: \`update_time\`,</span></span>
<span class="line"><span>            type</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        \`time\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><p>Dimensions Types</p><p>time/string/number/boolean/geo(经纬度)</p></li><li><p>Dimensions Formats</p><p>imageUrl/id/link/currencypercent</p></li></ul><h3 id="_4-joins" tabindex="-1">4. joins <a class="header-anchor" href="#_4-joins" aria-label="Permalink to &quot;4. joins&quot;">​</a></h3><p>连接, relationship: <code>belongsTo</code> || <code>hasMany</code> || <code>hasOne</code></p><blockquote><p><code>user</code> ---- <code>hasMany</code>----&gt; <code>role</code></p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  User:</span></span>
<span class="line"><span>    joins: {</span></span>
<span class="line"><span>        Role: {</span></span>
<span class="line"><span>            relationship: \`hasMany\`,</span></span>
<span class="line"><span>                sql</span></span>
<span class="line"><span>        :</span></span>
<span class="line"><span>            \`\${User}.id = \${Role}.uid\`</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>在playground中使用,比如勾选</p><blockquote><p>MEASURES :User Count DIMENSIONS: Role Name</p></blockquote><p>生成的SQL:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT \` role \`.name               \` role__name \`,</span></span>
<span class="line"><span>       count(distinct \` user \`.id) \` user__count \`</span></span>
<span class="line"><span>FROM zong.user AS \` user \`</span></span>
<span class="line"><span>         LEFT JOIN zong.role AS \` role \` ON \` user \`.id = \` role \`.uid</span></span>
<span class="line"><span>GROUP BY 1</span></span>
<span class="line"><span>ORDER BY 2 DESC LIMIT</span></span>
<span class="line"><span>  10000</span></span></code></pre></div><h3 id="_5-segments" tabindex="-1">5. segments <a class="header-anchor" href="#_5-segments" aria-label="Permalink to &quot;5. segments&quot;">​</a></h3><p>它是预定义的过滤器,功能和Filter类似,在生成的SQL中可见 where语句 添加的条件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  segments:{</span></span>
<span class="line"><span>    sfUsers: {</span></span>
<span class="line"><span>        sql: \`\${CUBE}.id = &#39;2&#39;\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>,</span></span></code></pre></div><p>Filter在页面中勾选对应的DIMENSIONS或MEASURES设置 比较,其结果可以与segments实现同样的结果.</p><p>由于segments是预定义的过滤器,适合用在复杂查询中,为所有用户预置复杂的查询条件</p><h3 id="_6-preaggregations" tabindex="-1">6. preAggregations <a class="header-anchor" href="#_6-preaggregations" aria-label="Permalink to &quot;6. preAggregations&quot;">​</a></h3><p>预聚集:</p><p>要求cube拥有对数据源的写入权限,Cube.js首先在源数据库中将预聚合构建为表，然后将其导出到预聚合存储中.</p><p>比如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  preAggregations: {</span></span>
<span class="line"><span>    main: {</span></span>
<span class="line"><span>        sqlAlias: \`original\`,</span></span>
<span class="line"><span>            type</span></span>
<span class="line"><span>    :</span></span>
<span class="line"><span>        \`originalSql\`,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>,</span></span></code></pre></div><p>构建成功后,可见数据库多了一个库dev_pre_aggregations,里面有cube生成的表,通过预聚集的特点,实现快速查询的目的.</p><p>使用外部预聚合需要安装driver:</p><p>yarn add @cubejs-backend/cubestore-driver --dev</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  preAggregations: {</span></span>
<span class="line"><span>    categoryAndDate: {</span></span>
<span class="line"><span>      type: \`rollup\`,</span></span>
<span class="line"><span>      external: true,</span></span>
<span class="line"><span>      measureReferences: [Orders.count, revenue],</span></span>
<span class="line"><span>      dimensionReferences: [category],</span></span>
<span class="line"><span>      timeDimensionReference: createdAt,</span></span>
<span class="line"><span>      granularity: \`day\`,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span></code></pre></div><h3 id="_7-contexts" tabindex="-1">7. contexts <a class="header-anchor" href="#_7-contexts" aria-label="Permalink to &quot;7. contexts&quot;">​</a></h3><p>cube集合</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>context(\`Sales\`, {</span></span>
<span class="line"><span>  contextMembers: [Users, Deals, Meetings]</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="_8-execution-environment" tabindex="-1">8. Execution Environment <a class="header-anchor" href="#_8-execution-environment" aria-label="Permalink to &quot;8. Execution Environment&quot;">​</a></h3><ul><li></li></ul><p>\${CUBE} 可作为当前cube的指向,类似this</p><ul><li></li></ul><p>ratio 可作为数据集的外部定义</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const measureRatioDefinition = {</span></span>
<span class="line"><span>  sql: (CUBE, count) =&gt; \`sum(\${CUBE}.amount) / \${count}\`,</span></span>
<span class="line"><span>  type: \`number\`,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cube(\`Users\`, {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  measures: {</span></span>
<span class="line"><span>    count: {</span></span>
<span class="line"><span>      type: \`count\`,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ratio: measureRatioDefinition,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="cubejs-sql-模块" tabindex="-1">CubeJS SQL 模块 <a class="header-anchor" href="#cubejs-sql-模块" aria-label="Permalink to &quot;CubeJS SQL 模块&quot;">​</a></h2><h3 id="初始化express项目-并安装cubejs" tabindex="-1">初始化express项目,并安装cubejs <a class="header-anchor" href="#初始化express项目-并安装cubejs" aria-label="Permalink to &quot;初始化express项目,并安装cubejs&quot;">​</a></h3><blockquote><p>npm install @cubejs-backend/server-core @cubejs-backend/mysql-driver</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> express</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;express&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> router</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> express.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Router</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// npm install @cubejs-backend/server-core @cubejs-backend/mysql-driver</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CubejsServerCore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">FileRepository</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@cubejs-backend/server-core&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dCubeSchema </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">routes</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">schema</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> coreInstance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CubejsServerCore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            dbType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mysql&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Replace if using another DB</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            schemaPath: dCubeSchema, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Correct the path to your schemas</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> repository</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FileRepository</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dCubeSchema);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> files</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> repository.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dataSchemaFiles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Schema files:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, files);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> compilerApi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> coreInstance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getCompilerApi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({authInfo: {}, securityContext: {}, requestId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;demo&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // measures: [&#39;Orders.total&#39;],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            dimensions: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;demo.id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // filters: [{sql: \`\${CUBE}.status = &#39;processed&#39;\`}]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        };</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> compilerApi.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getSql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(query, {repository});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sql);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sql);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (error) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Error occurred:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, error);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({error: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;An error occurred while processing your request.&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> router;</span></span></code></pre></div><p>在 项目的 <code>route\\schema</code> 添加 yml文件</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cubes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">demo</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    sql_alias</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">demo</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    sql_table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">select 1 as id</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">测试</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    data_source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">default</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    dimensions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        sql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;id&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">number</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        primary_key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div>`,67)])])}const o=a(e,[["render",l]]);export{E as __pageData,o as default};
