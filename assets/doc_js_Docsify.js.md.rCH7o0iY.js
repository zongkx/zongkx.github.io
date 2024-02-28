import{_ as a,c as s,o as n,a4 as e}from"./chunks/framework.JkBXQW4V.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/js/Docsify.js.md","filePath":"doc/js/Docsify.js.md"}'),p={name:"doc/js/Docsify.js.md"},i=e(`<h2 id="官方文档" tabindex="-1">官方文档 <a class="header-anchor" href="#官方文档" aria-label="Permalink to &quot;官方文档&quot;">​</a></h2><blockquote><p><a href="https://docsify.js.org/#/zh-cn/" target="_blank" rel="noreferrer">https://docsify.js.org/#/zh-cn/</a></p></blockquote><h2 id="简易步骤" tabindex="-1">简易步骤 <a class="header-anchor" href="#简易步骤" aria-label="Permalink to &quot;简易步骤&quot;">​</a></h2><h3 id="_1-新建同名仓库-并开启giteepages服务" tabindex="-1">1. 新建同名仓库,并开启GiteePages服务 <a class="header-anchor" href="#_1-新建同名仓库-并开启giteepages服务" aria-label="Permalink to &quot;1. 新建同名仓库,并开启GiteePages服务&quot;">​</a></h3><h3 id="_2-初始化docsify" tabindex="-1">2. 初始化Docsify <a class="header-anchor" href="#_2-初始化docsify" aria-label="Permalink to &quot;2. 初始化Docsify&quot;">​</a></h3><h3 id="_3-开启离线模式" tabindex="-1">3. 开启离线模式 <a class="header-anchor" href="#_3-开启离线模式" aria-label="Permalink to &quot;3. 开启离线模式&quot;">​</a></h3><p>参考</p><blockquote><p><a href="https://docsify.js.org/#/zh-cn/pwa" target="_blank" rel="noreferrer">https://docsify.js.org/#/zh-cn/pwa</a></p></blockquote><p>本地打开index.html即可</p><h3 id="_4-提交git后更新giteepage服务即可" tabindex="-1">4.提交git后更新GiteePage服务即可 <a class="header-anchor" href="#_4-提交git后更新giteepage服务即可" aria-label="Permalink to &quot;4.提交git后更新GiteePage服务即可&quot;">​</a></h3><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>│  .nojekyll        用于阻止 GitHub Pages 会忽略掉下划线开头的文件</span></span>
<span class="line"><span>│  files.md         列出files文件夹中的文件用于下载</span></span>
<span class="line"><span>│  index.html       入口文件</span></span>
<span class="line"><span>│  nav.md           导航栏</span></span>
<span class="line"><span>│  README.md        首页</span></span>
<span class="line"><span>│  sidebar.md       侧边栏</span></span>
<span class="line"><span>│  push.bat         列出导航栏、侧边栏、files、提交到仓库Windows脚本</span></span>
<span class="line"><span>│  push.sh          列出导航栏、侧边栏、files、提交到仓库Linux或Mac脚本</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─files             存放所有提供下载文件的文件夹</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─images            存放所有图片文件</span></span>
<span class="line"><span>│  │</span></span>
<span class="line"><span>│  └─icons          存放图标文件</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>...... 其他自己的md文档或文件夹</span></span></code></pre></div>`,12),t=[i];function l(o,c,r,h,d,_){return n(),s("div",null,t)}const g=a(p,[["render",l]]);export{u as __pageData,g as default};
