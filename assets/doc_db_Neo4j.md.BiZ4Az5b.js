import{_ as a,c as e,o as s,a2 as n}from"./chunks/framework.CBOTroAR.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/db/Neo4j.md","filePath":"doc/db/Neo4j.md"}'),t={name:"doc/db/Neo4j.md"},p=n(`<h3 id="neo4j" tabindex="-1">Neo4j <a class="header-anchor" href="#neo4j" aria-label="Permalink to &quot;Neo4j&quot;">​</a></h3><h4 id="节点简单命令" tabindex="-1">节点简单命令 <a class="header-anchor" href="#节点简单命令" aria-label="Permalink to &quot;节点简单命令&quot;">​</a></h4><ol><li>CREATE命令：创建节点命令</li><li>MATCH命令：查询命令</li><li>RETURN命令：返回数据命令</li><li>DELETE命令：删除命令，可以用于删除节点和关联节点信息</li><li>REMOVE命令：可以用于删除标签和属性</li></ol><h4 id="单个节点操作" tabindex="-1">单个节点操作 <a class="header-anchor" href="#单个节点操作" aria-label="Permalink to &quot;单个节点操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CREATE (emp:Employee) --创建节点emp,它的标签名称为EMployee</span></span>
<span class="line"><span>CREATE (m:Movie:Cinema:Film:Picture) --创建节点m,它有多个标签名称</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CREATE (dept:Dept { deptno:10,dname:&quot;Accounting&quot;,location:&quot;Hyderabad&quot; }) --创建节点dept,它的标签名称为Dept,它的属性为 deptno\\dname\\location</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>MATCH (dept: Dept)</span></span>
<span class="line"><span>RETURN dept.deptno,dept.dname --检索节点dept,获取其属性deptno/dname</span></span></code></pre></div><h4 id="多个节点操作" tabindex="-1">多个节点操作 <a class="header-anchor" href="#多个节点操作" aria-label="Permalink to &quot;多个节点操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match(n) return n -- 获取所有节点</span></span>
<span class="line"><span>match (n) detach delete n --删除所有节点</span></span></code></pre></div><h4 id="单个关系操作" tabindex="-1">单个关系操作 <a class="header-anchor" href="#单个关系操作" aria-label="Permalink to &quot;单个关系操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CREATE (p1:Profile1)-[r1:LIKES]-&gt;(p2:Profile2) --创建节点p1,p2, p1(From Node)指向p2(To Node)的关系是r1</span></span></code></pre></div><h4 id="where-布尔运算" tabindex="-1">WHERE + (布尔运算) <a class="header-anchor" href="#where-布尔运算" aria-label="Permalink to &quot;WHERE + (布尔运算)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match(dept:Person) where dept.deptName=&#39;设计部&#39; return dept  --获取节点dept中属性deptName为设计部的节点</span></span></code></pre></div><h4 id="创建关系" tabindex="-1">创建关系 <a class="header-anchor" href="#创建关系" aria-label="Permalink to &quot;创建关系&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match  (c:CC),(b:BB) where c.name=&#39;hahhah&#39;  create (c)-[r1:RRR{name:&#39;shshshshs&#39;}]-&gt;(b) return r1</span></span></code></pre></div><h4 id="delete和remove" tabindex="-1">DELETE和REMOVE <a class="header-anchor" href="#delete和remove" aria-label="Permalink to &quot;DELETE和REMOVE&quot;">​</a></h4><p>DELETE操作用于删除节点和关联关系。 REMOVE操作用于删除标签和属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>create (:Test{name:&#39;aaa&#39;})</span></span>
<span class="line"><span>create (:Test{name:&#39;bbb&#39;})</span></span>
<span class="line"><span>match (a:Test),(b:Test) where a.name=&#39;aaa&#39; and b.name=&#39;bbb&#39; create (a)-[:RT{type:&#39;ha&#39;}]-&gt;(b)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match (a:Test) delete a --删除标签为Test的节点</span></span>
<span class="line"><span>match (a:Test)-[rel]-(b:Test) delete a,rel,b  --删除标签为Test和其关系</span></span>
<span class="line"><span>match (a:Test) where a.name=&#39;aaa&#39; remove a.name --移除标签为Test的节点的name</span></span></code></pre></div><h4 id="set" tabindex="-1">SET <a class="header-anchor" href="#set" aria-label="Permalink to &quot;SET&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match (a:Test) where id(a)=16 set a.name = &#39;aaa&#39; return a --对id=16的标签Test的a节点设置属性 name=&#39;aaa&#39;</span></span></code></pre></div><h4 id="order-by" tabindex="-1">ORDER　BY <a class="header-anchor" href="#order-by" aria-label="Permalink to &quot;ORDER　BY&quot;">​</a></h4><p>类似于SQL,加在return * 后面即可</p><h4 id="unoin和unoin-all" tabindex="-1">UNOIN和UNOIN ALL <a class="header-anchor" href="#unoin和unoin-all" aria-label="Permalink to &quot;UNOIN和UNOIN ALL&quot;">​</a></h4><p>类似于SQL</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match (a:Test) return a.name as name union all match(a:Test) return a.name as name --没有去重</span></span>
<span class="line"><span>match (a:Test) return a.name as name union  match(a:Test) return a.name as name -- 去重后的结果</span></span></code></pre></div><h4 id="limit和skip" tabindex="-1">LIMIT和SKIP <a class="header-anchor" href="#limit和skip" aria-label="Permalink to &quot;LIMIT和SKIP&quot;">​</a></h4><p>类似于SQL</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match (a:Test) return a limit 1 -- 返回结果中的第一行</span></span>
<span class="line"><span>match (a:Test) return a skip 1 --跳过结果中的第一行</span></span></code></pre></div><h4 id="merge" tabindex="-1">MERGE <a class="header-anchor" href="#merge" aria-label="Permalink to &quot;MERGE&quot;">​</a></h4><p>merge = create + match 如果没有结果,则新增,有的话返回</p><h4 id="关系函数" tabindex="-1">关系函数 <a class="header-anchor" href="#关系函数" aria-label="Permalink to &quot;关系函数&quot;">​</a></h4><ol><li>STARTNODE 用于知道关系的开始节点。</li><li>ENDNODE    它用于知道关系的结束节点。</li><li>ID 它用于知道关系的ID。</li><li>TYPE   它用于知道字符串表示中的一个关系的TYPE。</li></ol><h3 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>match (n) detach delete n</span></span>
<span class="line"><span>create (cetc:Czdw{name:&#39;15&#39;})</span></span>
<span class="line"><span>create (zd:Czdw{name:&#39;ce&#39;})</span></span>
<span class="line"><span>create (ht1:Htxx{name:&#39;ht1&#39;})</span></span>
<span class="line"><span>create (ht2:Htxx{name:&#39;ht2&#39;})</span></span>
<span class="line"><span>create (jds1:Jds{name:&#39;1&#39;})</span></span>
<span class="line"><span>create (jds2:Jds{name:&#39;2&#39;})</span></span>
<span class="line"><span>-- match的时候节点标签只要对了,标签前面的可以理解为别名,根据别名.属性找到对应的节点即可</span></span>
<span class="line"><span>match  (n:Czdw),(j:Jds) where n.name=&#39;15&#39; and j.name=&#39;1&#39; create (n)&lt;-[r1:R1{type:&#39;监管&#39;}]-(j) return r1</span></span>
<span class="line"><span>match  (n:Czdw),(h:Htxx) where n.name=&#39;15&#39; and h.name=&#39;ht1&#39; create (n)-[r2:R2{type:&#39;执行&#39;}]-&gt;(h) return r2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match  (n:Czdw),(j:Jds) where n.name=&#39;ce&#39; and j.name=&#39;2&#39; create (n)&lt;-[r11:R1{type:&#39;监管&#39;}]-(j) return r11</span></span>
<span class="line"><span>match  (n:Czdw),(h:Htxx) where n.name=&#39;ce&#39; and h.name=&#39;合同2&#39; create (n)-[r22:R2{type:&#39;执行&#39;}]-&gt;(h) return r22</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match  (n1:Jds),(n2:Jds) where n1.name=&#39;1&#39; and n2.name=&#39;2&#39; create (n1)-[r3:R3{type:&#39;同级&#39;}]-&gt;(n2) return r3</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>neo4j-admin import --mode=csv --database=test.db --nodes &quot;D:\\Java\\neo4j-3.5.24\\import\\htxx.csv&quot; --nodes &quot;D:\\Java\\neo4j-3.5.24\\import\\jds.csv&quot; --relationships &quot;D:\\Java\\neo4j-3.5.24\\import\\r.csv&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>neo4j-admin import --mode=csv --database test.db --nodes:Category “D:\\Java\\neo4j-3.5.24\\import\\profession.csv” --relationships “F:\\neo4j-community-3.5.5-windows\\neo4j-community-3.5.5\\import\\shuyu_to_biaozhun.csv” --ignore-extra-columns=true --ignore-missing-nodes=true --ignore-duplicate-nodes=true</span></span></code></pre></div>`,35),i=[p];function l(o,c,r,d,h,m){return s(),e("div",null,i)}const g=a(t,[["render",l]]);export{b as __pageData,g as default};