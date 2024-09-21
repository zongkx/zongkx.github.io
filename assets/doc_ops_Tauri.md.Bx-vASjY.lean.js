import{_ as s,c as n,a2 as t,o as p}from"./chunks/framework.B4jioCYE.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Tauri.md","filePath":"doc/ops/Tauri.md"}'),e={name:"doc/ops/Tauri.md"};function r(o,a,i,l,c,u){return p(),n("div",null,a[0]||(a[0]=[t(`<h2 id="rust离线安装" tabindex="-1">Rust离线安装 <a class="header-anchor" href="#rust离线安装" aria-label="Permalink to &quot;Rust离线安装&quot;">​</a></h2><p><a href="https://static.rust-lang.org/dist/rust-1.80.1-i686-pc-windows-gnu.msi" target="_blank" rel="noreferrer">下载链接</a> 一直点下一步即可</p><h2 id="cargo-代理" tabindex="-1">cargo 代理 <a class="header-anchor" href="#cargo-代理" aria-label="Permalink to &quot;cargo 代理&quot;">​</a></h2><p>用户目录 ./cargo 中新建 config.toml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[source.crates-io]</span></span>
<span class="line"><span>replace-with = &#39;rsproxy-sparse&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[source.rsproxy]</span></span>
<span class="line"><span>registry = &quot;https://rsproxy.cn/crates.io-index&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 稀疏索引，要求 cargo &gt;= 1.68</span></span>
<span class="line"><span>[source.rsproxy-sparse]</span></span>
<span class="line"><span>registry = &quot;sparse+https://rsproxy.cn/index/&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[registries.rsproxy]</span></span>
<span class="line"><span>index = &quot;https://rsproxy.cn/crates.io-index&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[net]</span></span>
<span class="line"><span>git-fetch-with-cli = true</span></span></code></pre></div><h2 id="tauri" tabindex="-1">Tauri <a class="header-anchor" href="#tauri" aria-label="Permalink to &quot;Tauri&quot;">​</a></h2><ol><li>初始化项目</li></ol><blockquote><p>npm create tauri-app@latest</p></blockquote><ol start="2"><li>安装tauti-cli(可选)</li></ol><blockquote><p>npm install -g tauri-cli</p></blockquote><ol start="3"><li>运行项目</li></ol><blockquote><p>npm run tauri dev</p></blockquote><ol start="4"><li>打包</li></ol><blockquote><p>npm run tauri build</p></blockquote>`,14)]))}const g=s(e,[["render",r]]);export{h as __pageData,g as default};
