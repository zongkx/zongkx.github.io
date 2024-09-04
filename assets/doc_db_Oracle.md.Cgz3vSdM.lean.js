import{_ as i,c as a,a2 as n,o as h}from"./chunks/framework.3tXBFUNe.js";const g=JSON.parse('{"title":"常用内置函数","description":"","frontmatter":{},"headers":[],"relativePath":"doc/db/Oracle.md","filePath":"doc/db/Oracle.md"}'),k={name:"doc/db/Oracle.md"};function l(t,s,p,e,r,E){return h(),a("div",null,s[0]||(s[0]=[n(`<h1 id="常用内置函数" tabindex="-1">常用内置函数 <a class="header-anchor" href="#常用内置函数" aria-label="Permalink to &quot;常用内置函数&quot;">​</a></h1><h2 id="oracle" tabindex="-1">Oracle <a class="header-anchor" href="#oracle" aria-label="Permalink to &quot;Oracle&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- greatest :两列中取更晚的时间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> greatest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(time1,time2) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test; </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- concat :字符串拼接,只支持两个参数,Mysql为三个</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> like</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> concat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;%&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--可用 || 代替</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- replace :字符串替换,三个参数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--id中的1替换为2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- ifnull :若为空,替换为</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ifnull</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;unknown&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--id中的null替换为unknown</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- instr :根据in排序</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> instr(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1,2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,id );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- start with * onnect by * :树结构遍历</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TestA </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">start</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> connect</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> prior</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id ;</span></span></code></pre></div><h2 id="分组后按某个字段取出其中一行数据" tabindex="-1">分组后按某个字段取出其中一行数据 <a class="header-anchor" href="#分组后按某个字段取出其中一行数据" aria-label="Permalink to &quot;分组后按某个字段取出其中一行数据&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> 	SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,CREATE_TIME,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ROW_NUMBER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">OVER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">PARTITION</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> BY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TYPE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CREATE_TIME </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DESC</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) rn</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> 	FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TABLE1 ) t </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> -- 根据type分组然后取出每组create_time最晚的那条数据</span></span></code></pre></div>`,5)]))}const y=i(k,[["render",l]]);export{g as __pageData,y as default};
