import{_ as i,c as e,a2 as s,o as t}from"./chunks/framework.DPuwY6B9.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202304-数据安全和权限.md","filePath":"doc/blog/202304-数据安全和权限.md"}'),l={name:"doc/blog/202304-数据安全和权限.md"};function n(h,a,o,d,r,p){return t(),e("div",null,a[0]||(a[0]=[s(`<h2 id="_1-结果or异常" tabindex="-1">1.结果or异常 <a class="header-anchor" href="#_1-结果or异常" aria-label="Permalink to &quot;1.结果or异常&quot;">​</a></h2><ul><li>对于新增/修改,返回结果需不需要数据结果,还是直接返回true? 这取决于业务系统操作的连续性,如果在一个前台页面有一系列完整的操作,返回数据更好.</li><li>对于无法执行的操作,返回操作失败异常还是false? 最好是返回异常,利用Optional.orElseThrow()和全局异常处理,比如修改传入的ID是非法的.</li></ul><h2 id="_2-数据安全权限" tabindex="-1">2.数据安全权限 <a class="header-anchor" href="#_2-数据安全权限" aria-label="Permalink to &quot;2.数据安全权限&quot;">​</a></h2><ul><li>业务数据操作 对于多租户系统而言,单一数据操作如果仅通过主键ID并不可靠,最好通过继承的方式将租户的ID都写入到具体的业务表,然后操作的时候增加该条件.</li><li>用户信息 可以自定义一个用户上下文对象,方便取值. RBAC是一种基于角色控制权限的模型,这种模型理论上可以处理所有的权限问题,包括业务权限和数据权限.实际上其中存在一些细节问题. 业务权限简单理解就是 接口权限, 某个用户是否可以调用某个接口,比如新增A,修改B...,业务权限比较简单,元数据(接口地址\\接口名称)注册后,很容易分配,直接在拦截器中根据用户请求上下文进行判断即可. 数据权限粒度更细,比如涉及到 <code>分享</code> 功能的业务系统,用户A分享给B的数据,对于B来说可能只有<code>读</code>权限.这种情况下行级数据权限就不能简单的在一个地方处理了,实际处理中可能需要对SQL进行拦截处理亦或是对SQL进行拼接.</li></ul><h3 id="_2-1-rbac" tabindex="-1">2.1 RBAC <a class="header-anchor" href="#_2-1-rbac" aria-label="Permalink to &quot;2.1 RBAC&quot;">​</a></h3><h4 id="业务权限" tabindex="-1">业务权限 <a class="header-anchor" href="#业务权限" aria-label="Permalink to &quot;业务权限&quot;">​</a></h4><h4 id="数据权限" tabindex="-1">数据权限 <a class="header-anchor" href="#数据权限" aria-label="Permalink to &quot;数据权限&quot;">​</a></h4><ul><li>增</li></ul><p>增加数据应该按照业务权限处理,在数据还未产生的情况下,无法直接使用数据权限控制</p><ul><li>删</li></ul><p>一般而言 在 <code>新增/查看/修改</code> 权限的基础上,才可以 <code>删除</code>,逻辑删除可以理解为 一种特殊的<code>修改</code></p><ul><li>改</li></ul><p><code>改</code>权限 一般建立在 <code>增/查</code>的基础上</p><ul><li>查</li></ul><p>分页查可能需要抽象 <code>资源组</code>的概念,对主键进行一对多关联,方便权限表存储.</p><ul><li>关联操作</li></ul><p>关联操作涉及多个模型的情况下,最好直接从 最小粒度 进行控制,比如 模型A属于模型B的子模型,实际上一般可以直接理解 能够修改A即能够修改B,不过也可以分别 判断.</p><h2 id="_3-数据校验" tabindex="-1">3.数据校验 <a class="header-anchor" href="#_3-数据校验" aria-label="Permalink to &quot;3.数据校验&quot;">​</a></h2><p>都放是最可靠的,尤其是可能存在NPE的代码,因为service的method可能被多个地方调用.可使用Spring Validated完成校验.</p><h2 id="_4-分页查询-restful风格" tabindex="-1">4.分页查询/restful风格 <a class="header-anchor" href="#_4-分页查询-restful风格" aria-label="Permalink to &quot;4.分页查询/restful风格&quot;">​</a></h2><p>对于restful风格的接口而言,可能需要get接口完成分页查询,对于条件不多的,可以用get和query param实现,后台分别用两个vo接收(pageVO/dataVO),对于条件较多的查询来说,get请求参数不够直观,可以使用post,仅将page信息放置于query param或 path param</p><h2 id="_5-避免死代码" tabindex="-1">5. 避免死代码 <a class="header-anchor" href="#_5-避免死代码" aria-label="Permalink to &quot;5. 避免死代码&quot;">​</a></h2><ol><li>尽可能定义常量替代直接四处使用的值</li><li>利用占位符%s或{},复用这些常量</li><li>不确定/易变的常量配置化</li><li>避免使用+等直接操作字符串</li></ol><h2 id="_6-生命周期" tabindex="-1">6. 生命周期 <a class="header-anchor" href="#_6-生命周期" aria-label="Permalink to &quot;6. 生命周期&quot;">​</a></h2><p>在平时的代码开发中,经常需要对原有的业务逻辑进行扩展,所以往往需要在设计之初引入生命周期的概念 并结合适配器的设计模式能极大提高代码的扩展性</p><p>举个例子,如下接口<code>LifeCycle</code>,提供了<code>before</code>和<code>after</code>的默认实现,对于需要进行扩展的实现可以很容易进行操作, 同时不会影响已有的其它实现.</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LifeCycle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">I</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">O</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> before</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,I </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> after</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,I </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    O </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">execute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, I </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="_7-上下文" tabindex="-1">7. 上下文 <a class="header-anchor" href="#_7-上下文" aria-label="Permalink to &quot;7. 上下文&quot;">​</a></h2><p>实际上上文中的<code>Context</code>即为 上下文对象,上下文的使用场景非常广泛,上下文目的在于提供业务逻辑全生命周期中都有可能用到其它数据</p><h2 id="_8-openmetadata设计和借鉴" tabindex="-1">8. OpenMetadata设计和借鉴 <a class="header-anchor" href="#_8-openmetadata设计和借鉴" aria-label="Permalink to &quot;8. OpenMetadata设计和借鉴&quot;">​</a></h2><h3 id="资产元数据" tabindex="-1">资产元数据 <a class="header-anchor" href="#资产元数据" aria-label="Permalink to &quot;资产元数据&quot;">​</a></h3><p>比如<code>DB</code>,<code>Table</code>,<code>Pipeline</code>,<code>Report</code>,<code>Message</code>都可以被认为是<code>资产</code>,而对资产元数据的维护是数据治理的基础.</p><h3 id="存储" tabindex="-1">存储 <a class="header-anchor" href="#存储" aria-label="Permalink to &quot;存储&quot;">​</a></h3><p>使用mysql8(json)和es(资产检索),其中对于元数据表存储设计非常简洁,扩展性强,可以参考如下</p><ul><li><code>table_entity</code>: id,fullyQualifiedName,json,ts 其中json存具体的table属性</li><li><code>dbservice_entity</code>: id,name,type,json,ts json存数据库连接等属性</li><li><code>entity_relationship</code>来存储所有的关联关系 : fromId,toId,fromEntity,toEntity,relation,ts</li></ul><h3 id="ingest" tabindex="-1">ingest <a class="header-anchor" href="#ingest" aria-label="Permalink to &quot;ingest&quot;">​</a></h3><p>它使用python来进行三方集成</p>`,37)]))}const u=i(l,[["render",n]]);export{c as __pageData,u as default};
