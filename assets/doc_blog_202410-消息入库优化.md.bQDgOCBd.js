import{_ as s,c as n,o as p,ag as e}from"./chunks/framework.DK1-H3E1.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202410-消息入库优化.md","filePath":"doc/blog/202410-消息入库优化.md"}'),t={name:"doc/blog/202410-消息入库优化.md"};function l(i,a,o,c,r,d){return p(),n("div",null,a[0]||(a[0]=[e(`<h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><ul><li>MQTT客户端每秒接收大量设备数据,单条消息约1m</li></ul><h2 id="cpu负载优化" tabindex="-1">cpu负载优化 <a class="header-anchor" href="#cpu负载优化" aria-label="Permalink to &quot;cpu负载优化&quot;">​</a></h2><ol><li>移除额外的json序列化操作 mq客户端接收到的消息是json格式,需要进行第一次反序列化操作(假设反序列化为Device数组),用于后续业务操作, Device数组中的wave/args需要合并后 json string格式存储, 此处可以使用自定义的 Collectors, 降低字符串拼接带来的额外新生代内存消耗以及 json序列化带来的cpu消耗<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    List&lt;Device&gt; list = ....</span></span>
<span class="line"><span>    String wave = list.stream().filter(a -&gt; StringUtils.isNotEmpty(a.getWave()))</span></span>
<span class="line"><span>            .map(a -&gt; String.format(&quot;\\&quot;%s\\&quot;:%s&quot;, a.getType(), a.getWave()))</span></span>
<span class="line"><span>            .collect(toJsonFormat());</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  private Collector&lt;String, StringBuilder, String&gt; toJsonFormat() {</span></span>
<span class="line"><span>     return Collector.of(</span></span>
<span class="line"><span>             () -&gt; new StringBuilder(&quot;{&quot;),</span></span>
<span class="line"><span>             (sb, s) -&gt; {</span></span>
<span class="line"><span>                 if (sb.length() &gt; 1) {</span></span>
<span class="line"><span>                     sb.append(&quot;,&quot;);</span></span>
<span class="line"><span>                 }</span></span>
<span class="line"><span>                 sb.append(s);</span></span>
<span class="line"><span>             },</span></span>
<span class="line"><span>             (sb1, sb2) -&gt; {</span></span>
<span class="line"><span>                 if (sb1.length() &gt; 1 &amp;&amp; sb2.length() &gt; 1) {</span></span>
<span class="line"><span>                     sb1.append(&quot;,&quot;);</span></span>
<span class="line"><span>                 }</span></span>
<span class="line"><span>                 sb1.append(sb2, 1, sb2.length() - 1);</span></span>
<span class="line"><span>                 return sb1;</span></span>
<span class="line"><span>             },</span></span>
<span class="line"><span>             sb -&gt; sb.append(&quot;}&quot;).toString()</span></span>
<span class="line"><span>     );</span></span>
<span class="line"><span> }</span></span></code></pre></div></li></ol><h2 id="内存优化" tabindex="-1">内存优化 <a class="header-anchor" href="#内存优化" aria-label="Permalink to &quot;内存优化&quot;">​</a></h2><p><a href="https://tech.meituan.com/2020/11/12/java-9-cms-gc.html" target="_blank" rel="noreferrer">Java中9种常见的CMS GC问题分析与解决</a></p><ol><li>增加新生代内存大小,减少full gc发生的频率 -XX:NewSize -XX:MaxNewSize</li></ol>`,7)]))}const h=s(t,[["render",l]]);export{u as __pageData,h as default};
