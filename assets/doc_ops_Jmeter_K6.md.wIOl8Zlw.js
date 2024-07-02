import{_ as s,c as a,o as n,a3 as p}from"./chunks/framework.Bsyxd66g.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Jmeter&K6.md","filePath":"doc/ops/Jmeter&K6.md"}'),e={name:"doc/ops/Jmeter&K6.md"},t=p(`<h2 id="jmeter" tabindex="-1">Jmeter <a class="header-anchor" href="#jmeter" aria-label="Permalink to &quot;Jmeter&quot;">​</a></h2><h3 id="单个请求" tabindex="-1">单个请求 <a class="header-anchor" href="#单个请求" aria-label="Permalink to &quot;单个请求&quot;">​</a></h3><ol><li><p>添加线程组G1,设置线程数10,ramp-up 1,循环1</p></li><li><p>添加一个Http Header Manager,设置共享header</p></li><li><p>线程组下添加十个HTTP请求</p><blockquote><p>http请求下可添加BeanShell 后置处理器,防止乱码./添加固定定时器,设置间隔 prev.setDataEncoding(&quot;UTF-8&quot;);</p></blockquote></li><li><p>添加查看结果树和聚合报告</p></li></ol><h3 id="多个请求" tabindex="-1">多个请求 <a class="header-anchor" href="#多个请求" aria-label="Permalink to &quot;多个请求&quot;">​</a></h3><ol><li>添加线程组G1-G10,设置线程数1,ramp-up 1,循环1</li><li>每个线程组添加一个HTTP请求,并设置不同的body json</li><li>添加查看结果树和聚合报告</li></ol><h2 id="k6" tabindex="-1">K6 <a class="header-anchor" href="#k6" aria-label="Permalink to &quot;K6&quot;">​</a></h2><p>相较于jmeter,更加轻量,需要编写js代码完成测试</p><blockquote><p><a href="https://k6.io/docs/" target="_blank" rel="noreferrer">https://k6.io/docs/</a></p></blockquote><p>win安装</p><blockquote><p><a href="https://dl.k6.io/msi/k6-latest-amd64.msi" target="_blank" rel="noreferrer">https://dl.k6.io/msi/k6-latest-amd64.msi</a></p></blockquote><p>idea 插件安装</p><blockquote><p><a href="https://plugins.jetbrains.com/plugin/16141-k6" target="_blank" rel="noreferrer">https://plugins.jetbrains.com/plugin/16141-k6</a></p></blockquote><h3 id="简单测试" tabindex="-1">简单测试 <a class="header-anchor" href="#简单测试" aria-label="Permalink to &quot;简单测试&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import http from &#39;k6/http&#39;;</span></span>
<span class="line"><span>import { check, sleep } from &#39;k6&#39;;</span></span>
<span class="line"><span>export let options = {</span></span>
<span class="line"><span>    vus: 1,//并发数</span></span>
<span class="line"><span>    rps: 1,//每秒并发数</span></span>
<span class="line"><span>    duration: &quot;1s&quot;,//持续运行实际</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>export default function () {</span></span>
<span class="line"><span>    let res = http.get(&#39;https://httpbin.org/&#39;);</span></span>
<span class="line"><span>    check(res, { &#39;status was 200&#39;: (r) =&gt; r.status == 200 });</span></span>
<span class="line"><span>    sleep(1);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>idea-&gt;run/debug configurations -&gt; add K6 选择该文件,保存运行即可,如下报告</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     checks.........................: 100.00% ✓ 1   ✗ 0</span></span>
<span class="line"><span>     data_received..................: 15 kB   7.9 kB/s</span></span>
<span class="line"><span>     data_sent......................: 695 B   360 B/s</span></span>
<span class="line"><span>     http_req_blocked...............: avg=694.87ms min=694.87ms med=694.87ms max=694.87ms p(90)=694.87ms p(95)=694.87ms</span></span>
<span class="line"><span>     http_req_connecting............: avg=229.47ms min=229.47ms med=229.47ms max=229.47ms p(90)=229.47ms p(95)=229.47ms</span></span>
<span class="line"><span>     http_req_duration..............: avg=226.11ms min=226.11ms med=226.11ms max=226.11ms p(90)=226.11ms p(95)=226.11ms</span></span>
<span class="line"><span>       { expected_response:true }...: avg=226.11ms min=226.11ms med=226.11ms max=226.11ms p(90)=226.11ms p(95)=226.11ms</span></span>
<span class="line"><span>     http_req_failed................: 0.00%   ✓ 0   ✗ 1</span></span>
<span class="line"><span>     http_req_receiving.............: avg=1.05ms   min=1.05ms   med=1.05ms   max=1.05ms   p(90)=1.05ms   p(95)=1.05ms</span></span>
<span class="line"><span>     http_req_sending...............: avg=453.9µs  min=453.9µs  med=453.9µs  max=453.9µs  p(90)=453.9µs  p(95)=453.9µs</span></span>
<span class="line"><span>     http_req_tls_handshaking.......: avg=463.94ms min=463.94ms med=463.94ms max=463.94ms p(90)=463.94ms p(95)=463.94ms</span></span>
<span class="line"><span>     http_req_waiting...............: avg=224.6ms  min=224.6ms  med=224.6ms  max=224.6ms  p(90)=224.6ms  p(95)=224.6ms</span></span>
<span class="line"><span>     http_reqs......................: 1       0.51909/s</span></span>
<span class="line"><span>     iteration_duration.............: avg=1.92s    min=1.92s    med=1.92s    max=1.92s    p(90)=1.92s    p(95)=1.92s</span></span>
<span class="line"><span>     iterations.....................: 1       0.51909/s</span></span>
<span class="line"><span>     vus............................: 1       min=1 max=1</span></span>
<span class="line"><span>     vus_max........................: 1       min=1 max=1</span></span></code></pre></div><p>对于需要模拟不同用户同时请求,可以用 http.batch()</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getByNameAndCreditId(){</span></span>
<span class="line"><span>    let res = http.batch(</span></span>
<span class="line"><span>        [getReq(0),getReq(1),getReq(2)]</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    check(res[0],{</span></span>
<span class="line"><span>        &quot;is status 200&quot;:(r)=&gt; r.status === 200,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    sleep(2)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function getReq(index){</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        method: &quot;POST&quot;,</span></span>
<span class="line"><span>        url: &quot;http://localhost:32096/test&quot;,</span></span>
<span class="line"><span>        body: JSON.stringify(body_params[index]),</span></span>
<span class="line"><span>        params: params</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="负载测试" tabindex="-1">负载测试 <a class="header-anchor" href="#负载测试" aria-label="Permalink to &quot;负载测试&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export let options = {</span></span>
<span class="line"><span>    stages: [</span></span>
<span class="line"><span>        { duration: &#39;5s&#39;, target: 30 },</span></span>
<span class="line"><span>        { duration: &#39;10s&#39;, target: 30 },</span></span>
<span class="line"><span>        { duration: &#39;3s&#39;, target: 50 },</span></span>
<span class="line"><span>        { duration: &#39;2s&#39;, target: 50 },</span></span>
<span class="line"><span>        { duration: &#39;3s&#39;, target: 50 },</span></span>
<span class="line"><span>        { duration: &#39;10s&#39;, target: 50 },</span></span>
<span class="line"><span>        { duration: &#39;5s&#39;, target: 0 },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    thresholds: {</span></span>
<span class="line"><span>        http_req_duration: [&#39;p(99)&lt;1500&#39;],</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,20),l=[t];function i(o,c,r,m,d,h){return n(),a("div",null,l)}const _=s(e,[["render",i]]);export{g as __pageData,_ as default};
