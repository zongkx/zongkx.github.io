import{_ as s,c as a,o as i,a4 as t}from"./chunks/framework.DY-fZ1W-.js";const e="/assets/22860f5a.BaEQS97c.png",n="/assets/72dedde2.BOItx9sM.png",r="/assets/4888c3c6.BXU-2L0R.png",m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Bruno.md","filePath":"doc/ops/Bruno.md"}'),h={name:"doc/ops/Bruno.md"},o=t(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p><a href="https://docs.usebruno.com/" target="_blank" rel="noreferrer">https://docs.usebruno.com/</a></p><p><a href="https://www.usebruno.com/downloads" target="_blank" rel="noreferrer">https://www.usebruno.com/downloads</a></p><h2 id="关闭ssl验证" tabindex="-1">关闭ssl验证 <a class="header-anchor" href="#关闭ssl验证" aria-label="Permalink to &quot;关闭ssl验证&quot;">​</a></h2><p>菜单-collection-PREFERENCES-General-SSL/TLS</p><h2 id="token" tabindex="-1">token <a class="header-anchor" href="#token" aria-label="Permalink to &quot;token&quot;">​</a></h2><p>URL添加 环境变量 IP</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">req.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Authorization&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{token}}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">req.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bru.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getEnvVar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;IP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> req.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span></code></pre></div><p><img src="`+e+'" alt="1"><img src="'+n+'" alt="2"><img src="'+r+'" alt="3"></p>',9),l=[o];function p(k,d,c,E,u,g){return i(),a("div",null,l)}const y=s(h,[["render",p]]);export{m as __pageData,y as default};