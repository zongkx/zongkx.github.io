import{_ as a,c as n,a2 as i,o as t}from"./chunks/framework.DptEmx5X.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Caddy.md","filePath":"doc/ops/Caddy.md"}'),p={name:"doc/ops/Caddy.md"};function e(l,s,o,h,d,r){return t(),n("div",null,s[0]||(s[0]=[i(`<h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">caddy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reverse-proxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :7311</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :8111</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">caddy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reverse-proxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :5500</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :7311</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">caddy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reverse-proxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://idea.lanyus.com:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   http://127.0.0.1:8888</span></span></code></pre></div><h2 id="caddy-file" tabindex="-1">caddy file <a class="header-anchor" href="#caddy-file" aria-label="Permalink to &quot;caddy file&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>:7311 {</span></span>
<span class="line"><span>	log {</span></span>
<span class="line"><span>		output stdout</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	@allowOptions {</span></span>
<span class="line"><span>		method OPTIONS</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	handle @allowOptions {</span></span>
<span class="line"><span>		header Access-Control-Allow-Origin &quot;*&quot;</span></span>
<span class="line"><span>		header Access-Control-Allow-Methods &quot;GET, POST, PUT, DELETE, OPTIONS&quot;</span></span>
<span class="line"><span>		header Access-Control-Allow-Headers &quot;Content-Type, Authorization&quot;</span></span>
<span class="line"><span>		respond &quot;OK&quot; 200</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	handle_path /aims* {</span></span>
<span class="line"><span>		reverse_proxy :8311 {</span></span>
<span class="line"><span>			header_up x-header-userid &quot;1000000000000001&quot;</span></span>
<span class="line"><span>			header_up X-Forwarded-For 127.0.0.1</span></span>
<span class="line"><span>			header_down Access-Control-Allow-Origin *</span></span>
<span class="line"><span>			header_down Access-Control-Expose-Headers Content-Disposition</span></span>
<span class="line"><span>			header_down Access-Control-Allow-Methods *</span></span>
<span class="line"><span>			header_down Access-Control-Allow-Headers *</span></span>
<span class="line"><span>			header_down Access-Control-Allow-Credentials &quot;true&quot;</span></span>
<span class="line"><span>			header_down Access-Control-Max-Age &quot;3600&quot;</span></span>
<span class="line"><span>			header_down Content-Type &quot;application/json&quot;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,5)]))}const F=a(p,[["render",e]]);export{k as __pageData,F as default};
