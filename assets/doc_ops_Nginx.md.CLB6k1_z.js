import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.DK1-H3E1.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Nginx.md","filePath":"doc/ops/Nginx.md"}'),i={name:"doc/ops/Nginx.md"};function l(t,s,c,o,r,d){return p(),n("div",null,s[0]||(s[0]=[e(`<h2 id="https" tabindex="-1">https <a class="header-anchor" href="#https" aria-label="Permalink to &quot;https&quot;">​</a></h2><ul><li>阿里云申请的ssl证书包括 <code>zkx.com_public.crt</code>,<code>zkx.com_chain.crt</code>,<code>zkx.com.key</code>,使用1/3即可</li><li>dockerfile 需要把前端的镜像里面添加 上面的证书文件</li></ul><div class="language-Dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nginx:1.24.0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist/ /usr/share/nginx/html/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> zkx.com_public.crt /home/zkx.com_public.crt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> zkx.com.key /home/zkx.com.key</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nginx/conf/default.conf /etc/nginx/conf.d/default.conf</span></span></code></pre></div><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 443 ssl ;</span></span>
<span class="line"><span>    server_name  zkx.com;</span></span>
<span class="line"><span>    ssl_certificate /home/zkx.com_public.crt;</span></span>
<span class="line"><span>    ssl_certificate_key /home/zkx.com.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    proxy_set_header Host $host;</span></span>
<span class="line"><span>    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>    	try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span>        root   /usr/share/nginx/html;</span></span>
<span class="line"><span>        index  index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    location /r/ {</span></span>
<span class="line"><span>        proxy_pass https://zkx.com:7311;</span></span>
<span class="line"><span>        proxy_set_header Host $http_host;</span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header REMOTE-HOST $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,4)]))}const _=a(i,[["render",l]]);export{k as __pageData,_ as default};
