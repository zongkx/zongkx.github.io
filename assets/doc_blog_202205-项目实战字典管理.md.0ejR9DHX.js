import{_ as n,c as s,o as p,a2 as e}from"./chunks/framework.BmNZU-I_.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202205-项目实战字典管理.md","filePath":"doc/blog/202205-项目实战字典管理.md"}'),i={name:"doc/blog/202205-项目实战字典管理.md"};function l(t,a,c,o,r,d){return p(),s("div",null,[...a[0]||(a[0]=[e(`<h2 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h2><p>SpringBoot2.2.6+MySQL5.6+Vue2.0+ElementUI</p><h2 id="数据库设计" tabindex="-1">数据库设计 <a class="header-anchor" href="#数据库设计" aria-label="Permalink to &quot;数据库设计&quot;">​</a></h2><p>考虑到不同的数据字典数据结构区别很小，除了在前台页面展示的列名和列的数量不一样以外，基本上都可以沿用同一种数据表结构，所以考虑使用两张表T_DICTIONARY和T_DICTIONARY_DETAIL，前者用来维护所有的数据字典表的表信息，包括表名、列名、标识、是否在用等，后者用来保存具体的某一个数据字典的数据，这里通过t_did关联前者的主键，用于区分该表的数据具体属于哪一张。后者的通用字段有五个，分别是col1到col5，根据需要从前到后存储数据字段的数据，而列名的显示通过T_DICTIONARY的字段t_col_name来保存,需要用户在录入数据的时候输入列名称,数据库存储的时候.用逗号隔开。</p><h2 id="系统设计" tabindex="-1">系统设计 <a class="header-anchor" href="#系统设计" aria-label="Permalink to &quot;系统设计&quot;">​</a></h2><p>系统采用前后端分离的模式，后台统一返回封装数据，前台对数据进行渲染，前台通过路由来进行数据表格页面的切换。</p><h2 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h2><h3 id="后台" tabindex="-1">后台 <a class="header-anchor" href="#后台" aria-label="Permalink to &quot;后台&quot;">​</a></h3><p>核心接口包括主表t_dictionary:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @PostMapping(&quot;/list&quot;)</span></span>
<span class="line"><span>    public List&lt;Dictionary&gt; dictionaryListAll(){</span></span>
<span class="line"><span>        QueryWrapper&lt;Dictionary&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>        queryWrapper.orderByAsc(&quot;t_order&quot;);</span></span>
<span class="line"><span>        return dictionaryService.list(queryWrapper);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @GetMapping(&quot;/{id}&quot;)</span></span>
<span class="line"><span>    public Dictionary dictionaryOne(@PathVariable Long id){</span></span>
<span class="line"><span>        return dictionaryService.getById(id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @PostMapping(&quot;/add&quot;)</span></span>
<span class="line"><span>    public boolean dictionaryAdd(@RequestBody Dictionary dictionary){</span></span>
<span class="line"><span>        return dictionaryService.save(dictionary);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @PostMapping(&quot;/delete/{id}&quot;)</span></span>
<span class="line"><span>    public boolean dictionaryDelete(@PathVariable Long id){</span></span>
<span class="line"><span>        return dictionaryService.removeById(id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @PostMapping(&quot;/update&quot;)</span></span>
<span class="line"><span>    public boolean dictionaryUpdate(@RequestBody Dictionary dictionary){</span></span>
<span class="line"><span>        return dictionaryService.updateById(dictionary);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>以及其详情表的接口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@GetMapping(&quot;/query/{did}&quot;)</span></span>
<span class="line"><span>    public List&lt;DictionaryDetail&gt; dictionaryDetailList(@PathVariable Long did){</span></span>
<span class="line"><span>        QueryWrapper&lt;DictionaryDetail&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>        queryWrapper.eq(&quot;t_did&quot;,did);</span></span>
<span class="line"><span>        return iDictionaryDetailService.list(queryWrapper);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @GetMapping(&quot;/{id}&quot;)</span></span>
<span class="line"><span>    public DictionaryDetail dictionaryDetailOne(@PathVariable Long id){</span></span>
<span class="line"><span>        return iDictionaryDetailService.getById(id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @PostMapping(&quot;/update&quot;)</span></span>
<span class="line"><span>    public boolean dictionaryDetailUpdate(@RequestBody DictionaryDetail dictionaryDetail){</span></span>
<span class="line"><span>        return iDictionaryDetailService.updateById(dictionaryDetail);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @PostMapping(&quot;/add&quot;)</span></span>
<span class="line"><span>    public boolean dictionaryDetailAdd(@RequestBody DictionaryDetail dictionaryDetail){</span></span>
<span class="line"><span>        return iDictionaryDetailService.save(dictionaryDetail);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @PostMapping(&quot;/delete/{id}&quot;)</span></span>
<span class="line"><span>    public boolean dictionaryDetailDelete(@PathVariable Long id){</span></span>
<span class="line"><span>        return iDictionaryDetailService.removeById(id);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>后台代码较少,主要提供两表的CRUD功能即可.</p><h3 id="前台" tabindex="-1">前台 <a class="header-anchor" href="#前台" aria-label="Permalink to &quot;前台&quot;">​</a></h3><p>前台主要包括两部分:左侧列表和右侧表格内容.左侧列表第一个菜单默认为对主表的管理[综合管理] ,点击后右侧显示主表的表格数据,添加数据后左侧列表中多出一个菜单,点击后即可对该[新增的数据字典表]进行数据维护.</p><p>Dictionary.vue 路由配置:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> routes: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      path: &#39;/&#39;,</span></span>
<span class="line"><span>      name: &#39;&#39;,</span></span>
<span class="line"><span>      component: Dictionary,</span></span>
<span class="line"><span>      redirect: &quot;/all&quot;,</span></span>
<span class="line"><span>      children: [</span></span>
<span class="line"><span>        {path: &#39;/all&#39;, component: All, name: &quot;All&quot;,hidden: false},</span></span>
<span class="line"><span>        {path: &#39;/detail/:id&#39;, component: Detail, name: &quot;Detail&quot;,hidden: true},</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>// all是主表对应的页面,detail则是各个字典表的页面,需要循环输出</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>              &lt;el-menu-item-group&gt;</span></span>
<span class="line"><span>                &lt;template slot=&quot;title&quot;&gt;&lt;/template&gt;</span></span>
<span class="line"><span>                &lt;el-menu-item index=&quot;/all&quot;&gt;</span></span>
<span class="line"><span>                  &lt;span&gt;综合管理&lt;/span&gt;</span></span>
<span class="line"><span>                &lt;/el-menu-item&gt;</span></span>
<span class="line"><span>                &lt;el-menu-item v-for=&quot;(item,index) in navList&quot; :index=&quot;&#39;/detail/&#39;+item.id&quot; :key=&quot;index&quot;&gt;</span></span>
<span class="line"><span>                  &lt;span&gt;{{item.dictionaryName}}&lt;/span&gt;</span></span>
<span class="line"><span>                &lt;/el-menu-item&gt;</span></span>
<span class="line"><span>              &lt;/el-menu-item-group&gt;</span></span></code></pre></div><p>All.vue 除了对t_dictionary的增上改查以外,在添加操作之后要对其父路由:Dictionary进行数据重新加载的操作. 在添加的回调里面,完成对Dictionary.vue的refresh方法调用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                this.$emit(&#39;refresh&#39;, &quot;&quot;);</span></span></code></pre></div><p>另外由于设计的字段是通用字段,所以在添加数据的时候需要同时添加字典表的字段名称,用于前台显示.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>          dictionaryColName:[{ required: true, message: &#39;请输入列名称(逗号隔开,最多支持五列)&#39;, trigger: &#39;blur&#39; }],</span></span></code></pre></div><p>Detail.vue 需要动态加载列和列名称</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> &lt;el-table-column</span></span>
<span class="line"><span>        v-for=&quot;(item,index) in col&quot;</span></span>
<span class="line"><span>        :key=&quot;index&quot;</span></span>
<span class="line"><span>        fixed</span></span>
<span class="line"><span>        :prop=&quot;item.prop&quot;</span></span>
<span class="line"><span>        :label=&quot;item.name&quot;</span></span>
<span class="line"><span>        width=&quot;150&quot;&gt;</span></span>
<span class="line"><span>      &lt;/el-table-column&gt;</span></span>
<span class="line"><span>data(){</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        id : &#39;&#39;,</span></span>
<span class="line"><span>        col : [],</span></span>
<span class="line"><span>        tableData: [],</span></span>
<span class="line"><span>        dialogTableVisible: false,</span></span>
<span class="line"><span>        dialogFormVisible: false,</span></span>
<span class="line"><span>        formData:[&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;],</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>initTable:function(id){</span></span>
<span class="line"><span>        this.axios({</span></span>
<span class="line"><span>          method: &#39;get&#39;,</span></span>
<span class="line"><span>          data: &quot;&quot;,</span></span>
<span class="line"><span>          url: &#39;api/dic/&#39;+id,</span></span>
<span class="line"><span>        }).then(result =&gt; {</span></span>
<span class="line"><span>          var col_names = result.data.data.dictionaryColName.split(&#39;,&#39;);</span></span>
<span class="line"><span>          var cols = [];</span></span>
<span class="line"><span>          for(var i = 0;i&lt;col_names.length;i++){</span></span>
<span class="line"><span>            var obj = {};</span></span>
<span class="line"><span>            obj.name = col_names[i];</span></span>
<span class="line"><span>            obj.prop = &#39;col&#39;+(i+1);</span></span>
<span class="line"><span>            cols.push(obj);</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>          this.col = cols;</span></span>
<span class="line"><span>          this.initTableData(id);</span></span>
<span class="line"><span>        }).catch(error =&gt; {</span></span>
<span class="line"><span>          this.$message.error(&quot;网络异常&quot;);</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      initTableData:function(id){</span></span>
<span class="line"><span>        this.axios({</span></span>
<span class="line"><span>          method: &#39;get&#39;,</span></span>
<span class="line"><span>          data: &quot;&quot;,</span></span>
<span class="line"><span>          url: &#39;api/dic/detail/query/&#39;+id,</span></span>
<span class="line"><span>        }).then(result =&gt; {</span></span>
<span class="line"><span>          this.tableData = result.data.data;</span></span>
<span class="line"><span>        }).catch(error =&gt; {</span></span>
<span class="line"><span>          this.$message.error(&quot;网络异常&quot;);</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      },</span></span></code></pre></div><p>同样的在添加页面修改页面都需要动态显示列和列名称.</p><hr>`,25)])])}const g=n(i,[["render",l]]);export{h as __pageData,g as default};
