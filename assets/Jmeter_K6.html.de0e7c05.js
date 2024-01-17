import{_ as t,o as l,c as p,b as n,d as e,F as i,a as r,e as a,r as m}from"./app.d740ecc1.js";const b={},c=r('<h2 id="jmeter" tabindex="-1"><a class="header-anchor" href="#jmeter" aria-hidden="true">#</a> Jmeter</h2><h3 id="\u5355\u4E2A\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#\u5355\u4E2A\u8BF7\u6C42" aria-hidden="true">#</a> \u5355\u4E2A\u8BF7\u6C42</h3><ol><li>\u6DFB\u52A0\u7EBF\u7A0B\u7EC4G1,\u8BBE\u7F6E\u7EBF\u7A0B\u657010,ramp-up 1,\u5FAA\u73AF1</li><li>\u6DFB\u52A0\u4E00\u4E2AHttp Header Manager,\u8BBE\u7F6E\u5171\u4EABheader</li><li>\u7EBF\u7A0B\u7EC4\u4E0B\u6DFB\u52A0\u5341\u4E2AHTTP\u8BF7\u6C42</li></ol><blockquote><p>http\u8BF7\u6C42\u4E0B\u53EF\u6DFB\u52A0BeanShell \u540E\u7F6E\u5904\u7406\u5668,\u9632\u6B62\u4E71\u7801./\u6DFB\u52A0\u56FA\u5B9A\u5B9A\u65F6\u5668,\u8BBE\u7F6E\u95F4\u9694 prev.setDataEncoding(&quot;UTF-8&quot;);</p></blockquote><ol start="4"><li>\u6DFB\u52A0\u67E5\u770B\u7ED3\u679C\u6811\u548C\u805A\u5408\u62A5\u544A</li></ol><h3 id="\u591A\u4E2A\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#\u591A\u4E2A\u8BF7\u6C42" aria-hidden="true">#</a> \u591A\u4E2A\u8BF7\u6C42</h3><ol><li>\u6DFB\u52A0\u7EBF\u7A0B\u7EC4G1-G10,\u8BBE\u7F6E\u7EBF\u7A0B\u65701,ramp-up 1,\u5FAA\u73AF1</li><li>\u6BCF\u4E2A\u7EBF\u7A0B\u7EC4\u6DFB\u52A0\u4E00\u4E2AHTTP\u8BF7\u6C42,\u5E76\u8BBE\u7F6E\u4E0D\u540C\u7684body json</li><li>\u6DFB\u52A0\u67E5\u770B\u7ED3\u679C\u6811\u548C\u805A\u5408\u62A5\u544A</li></ol><h2 id="k6" tabindex="-1"><a class="header-anchor" href="#k6" aria-hidden="true">#</a> K6</h2><p>\u76F8\u8F83\u4E8Ejmeter,\u66F4\u52A0\u8F7B\u91CF,\u9700\u8981\u7F16\u5199js\u4EE3\u7801\u5B8C\u6210\u6D4B\u8BD5</p>',9),u={href:"https://k6.io/docs/",target:"_blank",rel:"noopener noreferrer"},o=a("https://k6.io/docs/"),d=n("p",null,"win\u5B89\u88C5",-1),h={href:"https://dl.k6.io/msi/k6-latest-amd64.msi",target:"_blank",rel:"noopener noreferrer"},_=a("https://dl.k6.io/msi/k6-latest-amd64.msi"),g=n("p",null,"idea \u63D2\u4EF6\u5B89\u88C5",-1),x={href:"https://plugins.jetbrains.com/plugin/16141-k6",target:"_blank",rel:"noopener noreferrer"},v=a("https://plugins.jetbrains.com/plugin/16141-k6"),k=r(`<h3 id="\u7B80\u5355\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u7B80\u5355\u6D4B\u8BD5" aria-hidden="true">#</a> \u7B80\u5355\u6D4B\u8BD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import http from &#39;k6/http&#39;;
import { check, sleep } from &#39;k6&#39;;
export let options = {
    vus: 1,//\u5E76\u53D1\u6570
    rps: 1,//\u6BCF\u79D2\u5E76\u53D1\u6570
    duration: &quot;1s&quot;,//\u6301\u7EED\u8FD0\u884C\u5B9E\u9645
};
export default function () {
    let res = http.get(&#39;https://httpbin.org/&#39;);
    check(res, { &#39;status was 200&#39;: (r) =&gt; r.status == 200 });
    sleep(1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>idea-&gt;run/debug configurations -&gt; add K6 \u9009\u62E9\u8BE5\u6587\u4EF6,\u4FDD\u5B58\u8FD0\u884C\u5373\u53EF,\u5982\u4E0B\u62A5\u544A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>     checks.........................: 100.00% \u2713 1   \u2717 0
     data_received..................: 15 kB   7.9 kB/s
     data_sent......................: 695 B   360 B/s
     http_req_blocked...............: avg=694.87ms min=694.87ms med=694.87ms max=694.87ms p(90)=694.87ms p(95)=694.87ms
     http_req_connecting............: avg=229.47ms min=229.47ms med=229.47ms max=229.47ms p(90)=229.47ms p(95)=229.47ms
     http_req_duration..............: avg=226.11ms min=226.11ms med=226.11ms max=226.11ms p(90)=226.11ms p(95)=226.11ms
       { expected_response:true }...: avg=226.11ms min=226.11ms med=226.11ms max=226.11ms p(90)=226.11ms p(95)=226.11ms
     http_req_failed................: 0.00%   \u2713 0   \u2717 1
     http_req_receiving.............: avg=1.05ms   min=1.05ms   med=1.05ms   max=1.05ms   p(90)=1.05ms   p(95)=1.05ms
     http_req_sending...............: avg=453.9\xB5s  min=453.9\xB5s  med=453.9\xB5s  max=453.9\xB5s  p(90)=453.9\xB5s  p(95)=453.9\xB5s
     http_req_tls_handshaking.......: avg=463.94ms min=463.94ms med=463.94ms max=463.94ms p(90)=463.94ms p(95)=463.94ms
     http_req_waiting...............: avg=224.6ms  min=224.6ms  med=224.6ms  max=224.6ms  p(90)=224.6ms  p(95)=224.6ms
     http_reqs......................: 1       0.51909/s
     iteration_duration.............: avg=1.92s    min=1.92s    med=1.92s    max=1.92s    p(90)=1.92s    p(95)=1.92s
     iterations.....................: 1       0.51909/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>\u5BF9\u4E8E\u9700\u8981\u6A21\u62DF\u4E0D\u540C\u7528\u6237\u540C\u65F6\u8BF7\u6C42,\u53EF\u4EE5\u7528 http.batch()</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function getByNameAndCreditId(){
    let res = http.batch(
        [getReq(0),getReq(1),getReq(2)]
    );
    check(res[0],{
        &quot;is status 200&quot;:(r)=&gt; r.status === 200,
    })
    sleep(2)
}

function getReq(index){
    return {
        method: &quot;POST&quot;,
        url: &quot;http://localhost:32096/test&quot;,
        body: JSON.stringify(body_params[index]),
        params: params
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="\u8D1F\u8F7D\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u8D1F\u8F7D\u6D4B\u8BD5" aria-hidden="true">#</a> \u8D1F\u8F7D\u6D4B\u8BD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export let options = {
    stages: [
        { duration: &#39;5s&#39;, target: 30 },
        { duration: &#39;10s&#39;, target: 30 },
        { duration: &#39;3s&#39;, target: 50 },
        { duration: &#39;2s&#39;, target: 50 },
        { duration: &#39;3s&#39;, target: 50 },
        { duration: &#39;10s&#39;, target: 50 },
        { duration: &#39;5s&#39;, target: 0 },
    ],
    thresholds: {
        http_req_duration: [&#39;p(99)&lt;1500&#39;],
    },
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,8);function q(f,B){const s=m("ExternalLinkIcon");return l(),p(i,null,[c,n("blockquote",null,[n("p",null,[n("a",u,[o,e(s)])])]),d,n("blockquote",null,[n("p",null,[n("a",h,[_,e(s)])])]),g,n("blockquote",null,[n("p",null,[n("a",x,[v,e(s)])])]),k],64)}var T=t(b,[["render",q],["__file","Jmeter_K6.html.vue"]]);export{T as default};
