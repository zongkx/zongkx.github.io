import{_ as e,c as r,a2 as t,o as d}from"./chunks/framework.DPuwY6B9.js";const l="/assets/img.BqOwYfdO.png",b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202407-Parquet文件存储.md","filePath":"doc/blog/202407-Parquet文件存储.md"}'),o={name:"doc/blog/202407-Parquet文件存储.md"};function i(c,a,u,h,s,n){return d(),r("div",null,a[0]||(a[0]=[t('<h2 id="code" tabindex="-1">code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;code&quot;">​</a></h2><p><a href="https://github.com/zongkx/csv-parquet-demo" target="_blank" rel="noreferrer">https://github.com/zongkx/csv-parquet-demo</a></p><h2 id="需求" tabindex="-1">需求 <a class="header-anchor" href="#需求" aria-label="Permalink to &quot;需求&quot;">​</a></h2><ul><li>每秒大量的mq设备数据需要入库,单条数据20KB</li><li>存储空间优化</li><li>近实时查询,简单查询(绘制波形,回显参数,统计相对较少)</li><li>轻量级 embedded服务</li></ul><h2 id="原方案" tabindex="-1">原方案 <a class="header-anchor" href="#原方案" aria-label="Permalink to &quot;原方案&quot;">​</a></h2><p>Cassandra: 强大的写入能力,cql满足基本的查询 缺点: 硬件资源消耗;编码中包含大量的多线程查询逻辑;写入补偿等</p><h2 id="理想方案" tabindex="-1">理想方案 <a class="header-anchor" href="#理想方案" aria-label="Permalink to &quot;理想方案&quot;">​</a></h2><p>如果不考虑embedded服务,hadoop体系是非常适合此需求的, 比如 flink/spark mq-&gt;hudi/iceberg等, 比如hudi提供的 <code>copy on write</code>/<code>merge on read</code>表提供了方便写入策略,另外也满足对查询性能的需求, 同时可直接使用sql完成查询需要</p><p><a href="https://wenku.baidu.com/view/7575f4e56c1aff00bed5b9f3f90f76c661374cf4.html?_wkts_=1721615274732&amp;bdQuery=Copy+On+Write%E8%A1%A8" target="_blank" rel="noreferrer">copy on write/merge on read</a></p><p><a href="https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-vs-apache-iceberg-lakehouse-feature-comparison" target="_blank" rel="noreferrer">Apache Hudi vs Delta Lake vs Apache Iceberg</a></p><h2 id="duckdb" tabindex="-1">DuckDB <a class="header-anchor" href="#duckdb" aria-label="Permalink to &quot;DuckDB&quot;">​</a></h2><p>需求要求embedded服务,直接考虑使用duckdb作为查询引擎,duckdb对 csv/json/parquet等查询都提供了完整的支持,通过sql可以简化代码的同时保证查询性能</p><h2 id="方案一-csv写入-duckdb查询" tabindex="-1">方案一: csv写入/duckdb查询 <a class="header-anchor" href="#方案一-csv写入-duckdb查询" aria-label="Permalink to &quot;方案一: csv写入/duckdb查询&quot;">​</a></h2><ul><li>优点: 支持append写入,文件数量简单可控</li><li>缺点: 查询劣势(速度较慢),存储劣势(没有压缩)</li></ul><h2 id="方案二-parquet写入-duckdb查询" tabindex="-1">方案二: parquet写入/duckdb查询 <a class="header-anchor" href="#方案二-parquet写入-duckdb查询" aria-label="Permalink to &quot;方案二: parquet写入/duckdb查询&quot;">​</a></h2><ul><li>优点: 存储压缩可选,查询性能好,代码简单 <a href="./..%2Fdb%2FApache-Parquet.html">Apache-Parquet.md</a>,</li><li>缺点: 不支持append写入, 需要合并策略解决海量小文件的问题,合并过程严重依赖锁,导致代码复杂度提升</li></ul><h2 id="方案三-采用此方案-csv循环写入-parquet归并-duckdb查询" tabindex="-1">方案三(采用此方案): csv循环写入(parquet归并)/duckdb查询 <a class="header-anchor" href="#方案三-采用此方案-csv循环写入-parquet归并-duckdb查询" aria-label="Permalink to &quot;方案三(采用此方案): csv循环写入(parquet归并)/duckdb查询&quot;">​</a></h2><p>该方案采取 行列混合存储,通过csv文件作为缓冲区,避免了每秒数据落盘导致过多小文件的问题; buffer flush的特性,解决异常断电导致的单行数据破损的问题; 按天/主键分区,查询性能不会随数据总量提示而降低</p><ul><li>优点: 支持append写入,查询性能号,补偿(异常断电)代码简洁</li><li>缺点: 查询需要合并parquet和csv文件结果</li></ul><h2 id="实现细节" tabindex="-1">实现细节 <a class="header-anchor" href="#实现细节" aria-label="Permalink to &quot;实现细节&quot;">​</a></h2><p><img src="'+l+'" alt="img.png"></p><h2 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h2><ul><li>避免同时执行 parquet 压缩导致CPU过高的异常 <ol><li>给每个 writer设置 3000-4000以内随机的阈值,可以有效避免设备同时上线导致的集中执行压缩的问题</li><li>取消初始化writer时的压缩, 若csv文件已存在,则进行追加写即可</li></ol></li></ul><h2 id="查询优化" tabindex="-1">查询优化 <a class="header-anchor" href="#查询优化" aria-label="Permalink to &quot;查询优化&quot;">​</a></h2><p>按天分区文件,可以开启多线程查询,每个线程查询某天文件中的数据,最后再合并结果</p>',25)]))}const q=e(o,[["render",i]]);export{b as __pageData,q as default};
