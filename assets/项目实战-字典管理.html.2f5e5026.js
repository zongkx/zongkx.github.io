import{_ as n,a}from"./app.6a98a4dc.js";const e={},s=a(`<h2 id="\u6280\u672F\u9009\u578B" tabindex="-1"><a class="header-anchor" href="#\u6280\u672F\u9009\u578B" aria-hidden="true">#</a> \u6280\u672F\u9009\u578B</h2><p>SpringBoot2.2.6+MySQL5.6+Vue2.0+ElementUI</p><h2 id="\u6570\u636E\u5E93\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u8BBE\u8BA1" aria-hidden="true">#</a> \u6570\u636E\u5E93\u8BBE\u8BA1</h2><p>\u8003\u8651\u5230\u4E0D\u540C\u7684\u6570\u636E\u5B57\u5178\u6570\u636E\u7ED3\u6784\u533A\u522B\u5F88\u5C0F\uFF0C\u9664\u4E86\u5728\u524D\u53F0\u9875\u9762\u5C55\u793A\u7684\u5217\u540D\u548C\u5217\u7684\u6570\u91CF\u4E0D\u4E00\u6837\u4EE5\u5916\uFF0C\u57FA\u672C\u4E0A\u90FD\u53EF\u4EE5\u6CBF\u7528\u540C\u4E00\u79CD\u6570\u636E\u8868\u7ED3\u6784\uFF0C\u6240\u4EE5\u8003\u8651\u4F7F\u7528\u4E24\u5F20\u8868T_DICTIONARY\u548CT_DICTIONARY_DETAIL\uFF0C\u524D\u8005\u7528\u6765\u7EF4\u62A4\u6240\u6709\u7684\u6570\u636E\u5B57\u5178\u8868\u7684\u8868\u4FE1\u606F\uFF0C\u5305\u62EC\u8868\u540D\u3001\u5217\u540D\u3001\u6807\u8BC6\u3001\u662F\u5426\u5728\u7528\u7B49\uFF0C\u540E\u8005\u7528\u6765\u4FDD\u5B58\u5177\u4F53\u7684\u67D0\u4E00\u4E2A\u6570\u636E\u5B57\u5178\u7684\u6570\u636E\uFF0C\u8FD9\u91CC\u901A\u8FC7t_did\u5173\u8054\u524D\u8005\u7684\u4E3B\u952E\uFF0C\u7528\u4E8E\u533A\u5206\u8BE5\u8868\u7684\u6570\u636E\u5177\u4F53\u5C5E\u4E8E\u54EA\u4E00\u5F20\u3002\u540E\u8005\u7684\u901A\u7528\u5B57\u6BB5\u6709\u4E94\u4E2A\uFF0C\u5206\u522B\u662Fcol1\u5230col5\uFF0C\u6839\u636E\u9700\u8981\u4ECE\u524D\u5230\u540E\u5B58\u50A8\u6570\u636E\u5B57\u6BB5\u7684\u6570\u636E\uFF0C\u800C\u5217\u540D\u7684\u663E\u793A\u901A\u8FC7T_DICTIONARY\u7684\u5B57\u6BB5t_col_name\u6765\u4FDD\u5B58,\u9700\u8981\u7528\u6237\u5728\u5F55\u5165\u6570\u636E\u7684\u65F6\u5019\u8F93\u5165\u5217\u540D\u79F0,\u6570\u636E\u5E93\u5B58\u50A8\u7684\u65F6\u5019.\u7528\u9017\u53F7\u9694\u5F00\u3002</p><h2 id="\u7CFB\u7EDF\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8BBE\u8BA1" aria-hidden="true">#</a> \u7CFB\u7EDF\u8BBE\u8BA1</h2><p>\u7CFB\u7EDF\u91C7\u7528\u524D\u540E\u7AEF\u5206\u79BB\u7684\u6A21\u5F0F\uFF0C\u540E\u53F0\u7EDF\u4E00\u8FD4\u56DE\u5C01\u88C5\u6570\u636E\uFF0C\u524D\u53F0\u5BF9\u6570\u636E\u8FDB\u884C\u6E32\u67D3\uFF0C\u524D\u53F0\u901A\u8FC7\u8DEF\u7531\u6765\u8FDB\u884C\u6570\u636E\u8868\u683C\u9875\u9762\u7684\u5207\u6362\u3002</p><h2 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h2><h3 id="\u540E\u53F0" tabindex="-1"><a class="header-anchor" href="#\u540E\u53F0" aria-hidden="true">#</a> \u540E\u53F0</h3><p>\u6838\u5FC3\u63A5\u53E3\u5305\u62EC\u4E3B\u8868t_dictionary:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @PostMapping(&quot;/list&quot;)
    public List&lt;Dictionary&gt; dictionaryListAll(){
        QueryWrapper&lt;Dictionary&gt; queryWrapper = new QueryWrapper&lt;&gt;();
        queryWrapper.orderByAsc(&quot;t_order&quot;);
        return dictionaryService.list(queryWrapper);
    }
    @GetMapping(&quot;/{id}&quot;)
    public Dictionary dictionaryOne(@PathVariable Long id){
        return dictionaryService.getById(id);
    }
    @PostMapping(&quot;/add&quot;)
    public boolean dictionaryAdd(@RequestBody Dictionary dictionary){
        return dictionaryService.save(dictionary);
    }
    @PostMapping(&quot;/delete/{id}&quot;)
    public boolean dictionaryDelete(@PathVariable Long id){
        return dictionaryService.removeById(id);
    }
    @PostMapping(&quot;/update&quot;)
    public boolean dictionaryUpdate(@RequestBody Dictionary dictionary){
        return dictionaryService.updateById(dictionary);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>\u4EE5\u53CA\u5176\u8BE6\u60C5\u8868\u7684\u63A5\u53E3</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@GetMapping(&quot;/query/{did}&quot;)
    public List&lt;DictionaryDetail&gt; dictionaryDetailList(@PathVariable Long did){
        QueryWrapper&lt;DictionaryDetail&gt; queryWrapper = new QueryWrapper&lt;&gt;();
        queryWrapper.eq(&quot;t_did&quot;,did);
        return iDictionaryDetailService.list(queryWrapper);
    }
    @GetMapping(&quot;/{id}&quot;)
    public DictionaryDetail dictionaryDetailOne(@PathVariable Long id){
        return iDictionaryDetailService.getById(id);
    }

    @PostMapping(&quot;/update&quot;)
    public boolean dictionaryDetailUpdate(@RequestBody DictionaryDetail dictionaryDetail){
        return iDictionaryDetailService.updateById(dictionaryDetail);
    }
    @PostMapping(&quot;/add&quot;)
    public boolean dictionaryDetailAdd(@RequestBody DictionaryDetail dictionaryDetail){
        return iDictionaryDetailService.save(dictionaryDetail);
    }

    @PostMapping(&quot;/delete/{id}&quot;)
    public boolean dictionaryDetailDelete(@PathVariable Long id){
        return iDictionaryDetailService.removeById(id);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>\u540E\u53F0\u4EE3\u7801\u8F83\u5C11,\u4E3B\u8981\u63D0\u4F9B\u4E24\u8868\u7684CRUD\u529F\u80FD\u5373\u53EF.</p><h3 id="\u524D\u53F0" tabindex="-1"><a class="header-anchor" href="#\u524D\u53F0" aria-hidden="true">#</a> \u524D\u53F0</h3><p>\u524D\u53F0\u4E3B\u8981\u5305\u62EC\u4E24\u90E8\u5206:\u5DE6\u4FA7\u5217\u8868\u548C\u53F3\u4FA7\u8868\u683C\u5185\u5BB9.\u5DE6\u4FA7\u5217\u8868\u7B2C\u4E00\u4E2A\u83DC\u5355\u9ED8\u8BA4\u4E3A\u5BF9\u4E3B\u8868\u7684\u7BA1\u7406[\u7EFC\u5408\u7BA1\u7406],\u70B9\u51FB\u540E\u53F3\u4FA7\u663E\u793A\u4E3B\u8868\u7684\u8868\u683C\u6570\u636E,\u6DFB\u52A0\u6570\u636E\u540E\u5DE6\u4FA7\u5217\u8868\u4E2D\u591A\u51FA\u4E00\u4E2A\u83DC\u5355,\u70B9\u51FB\u540E\u5373\u53EF\u5BF9\u8BE5[\u65B0\u589E\u7684\u6570\u636E\u5B57\u5178\u8868]\u8FDB\u884C\u6570\u636E\u7EF4\u62A4.</p><p>Dictionary.vue \u8DEF\u7531\u914D\u7F6E:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> routes: [
    {
      path: &#39;/&#39;,
      name: &#39;&#39;,
      component: Dictionary,
      redirect: &quot;/all&quot;,
      children: [
        {path: &#39;/all&#39;, component: All, name: &quot;All&quot;,hidden: false},
        {path: &#39;/detail/:id&#39;, component: Detail, name: &quot;Detail&quot;,hidden: true},

      ]
    },
// all\u662F\u4E3B\u8868\u5BF9\u5E94\u7684\u9875\u9762,detail\u5219\u662F\u5404\u4E2A\u5B57\u5178\u8868\u7684\u9875\u9762,\u9700\u8981\u5FAA\u73AF\u8F93\u51FA
  ]
              &lt;el-menu-item-group&gt;
                &lt;template slot=&quot;title&quot;&gt;&lt;/template&gt;
                &lt;el-menu-item index=&quot;/all&quot;&gt;
                  &lt;span&gt;\u7EFC\u5408\u7BA1\u7406&lt;/span&gt;
                &lt;/el-menu-item&gt;
                &lt;el-menu-item v-for=&quot;(item,index) in navList&quot; :index=&quot;&#39;/detail/&#39;+item.id&quot; :key=&quot;index&quot;&gt;
                  &lt;span&gt;{{item.dictionaryName}}&lt;/span&gt;
                &lt;/el-menu-item&gt;
              &lt;/el-menu-item-group&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>All.vue \u9664\u4E86\u5BF9t_dictionary\u7684\u589E\u4E0A\u6539\u67E5\u4EE5\u5916,\u5728\u6DFB\u52A0\u64CD\u4F5C\u4E4B\u540E\u8981\u5BF9\u5176\u7236\u8DEF\u7531:Dictionary\u8FDB\u884C\u6570\u636E\u91CD\u65B0\u52A0\u8F7D\u7684\u64CD\u4F5C. \u5728\u6DFB\u52A0\u7684\u56DE\u8C03\u91CC\u9762,\u5B8C\u6210\u5BF9Dictionary.vue\u7684refresh\u65B9\u6CD5\u8C03\u7528</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>                this.$emit(&#39;refresh&#39;, &quot;&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u53E6\u5916\u7531\u4E8E\u8BBE\u8BA1\u7684\u5B57\u6BB5\u662F\u901A\u7528\u5B57\u6BB5,\u6240\u4EE5\u5728\u6DFB\u52A0\u6570\u636E\u7684\u65F6\u5019\u9700\u8981\u540C\u65F6\u6DFB\u52A0\u5B57\u5178\u8868\u7684\u5B57\u6BB5\u540D\u79F0,\u7528\u4E8E\u524D\u53F0\u663E\u793A.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>          dictionaryColName:[{ required: true, message: &#39;\u8BF7\u8F93\u5165\u5217\u540D\u79F0(\u9017\u53F7\u9694\u5F00,\u6700\u591A\u652F\u6301\u4E94\u5217)&#39;, trigger: &#39;blur&#39; }],
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Detail.vue \u9700\u8981\u52A8\u6001\u52A0\u8F7D\u5217\u548C\u5217\u540D\u79F0</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> &lt;el-table-column
        v-for=&quot;(item,index) in col&quot;
        :key=&quot;index&quot;
        fixed
        :prop=&quot;item.prop&quot;
        :label=&quot;item.name&quot;
        width=&quot;150&quot;&gt;
      &lt;/el-table-column&gt;
data(){
      return {
        id : &#39;&#39;,
        col : [],
        tableData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        formData:[&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;],
      }
    }
initTable:function(id){
        this.axios({
          method: &#39;get&#39;,
          data: &quot;&quot;,
          url: &#39;api/dic/&#39;+id,
        }).then(result =&gt; {
          var col_names = result.data.data.dictionaryColName.split(&#39;,&#39;);
          var cols = [];
          for(var i = 0;i&lt;col_names.length;i++){
            var obj = {};
            obj.name = col_names[i];
            obj.prop = &#39;col&#39;+(i+1);
            cols.push(obj);
          }
          this.col = cols;
          this.initTableData(id);
        }).catch(error =&gt; {
          this.$message.error(&quot;\u7F51\u7EDC\u5F02\u5E38&quot;);
        })
      },
      initTableData:function(id){
        this.axios({
          method: &#39;get&#39;,
          data: &quot;&quot;,
          url: &#39;api/dic/detail/query/&#39;+id,
        }).then(result =&gt; {
          this.tableData = result.data.data;
        }).catch(error =&gt; {
          this.$message.error(&quot;\u7F51\u7EDC\u5F02\u5E38&quot;);
        })
      },
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>\u540C\u6837\u7684\u5728\u6DFB\u52A0\u9875\u9762\u4FEE\u6539\u9875\u9762\u90FD\u9700\u8981\u52A8\u6001\u663E\u793A\u5217\u548C\u5217\u540D\u79F0.</p><hr>`,25);function r(i,l){return s}var p=n(e,[["render",r],["__file","\u9879\u76EE\u5B9E\u6218-\u5B57\u5178\u7BA1\u7406.html.vue"]]);export{p as default};
