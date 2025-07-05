import{_ as n,c as s,o as p,a2 as l}from"./chunks/framework.DxykYmMe.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202505-重构改善代码设计一.md","filePath":"doc/blog/202505-重构改善代码设计一.md"}'),e={name:"doc/blog/202505-重构改善代码设计一.md"};function i(t,a,c,o,r,d){return p(),s("div",null,a[0]||(a[0]=[l(`<h2 id="提炼函数" tabindex="-1">提炼函数 <a class="header-anchor" href="#提炼函数" aria-label="Permalink to &quot;提炼函数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 重构前</span></span>
<span class="line"><span>public void printOwing(double amount) {</span></span>
<span class="line"><span>   printBanner();</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   // 打印详情</span></span>
<span class="line"><span>   System.out.println(&quot;name: &quot; + name);</span></span>
<span class="line"><span>   System.out.println(&quot;amount: &quot; + amount);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 重构后</span></span>
<span class="line"><span>public void printOwing(double amount) {</span></span>
<span class="line"><span>   printBanner();</span></span>
<span class="line"><span>   printDetails(amount);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private void printDetails(double amount) {</span></span>
<span class="line"><span>   System.out.println(&quot;name: &quot; + name);</span></span>
<span class="line"><span>   System.out.println(&quot;amount: &quot; + amount);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h3><ol><li>测试优先</li><li>使用IDEA提示,消除重复代码</li><li>逐步提炼</li><li>命名优先(如果找不到合适的名称,则表明代码块职责并不明确)</li></ol><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ol><li>消除重复代码</li><li>提高可读性</li><li>简化复杂逻辑</li><li>为代码块赋予明确语义</li></ol><h3 id="不适用场景" tabindex="-1">不适用场景 <a class="header-anchor" href="#不适用场景" aria-label="Permalink to &quot;不适用场景&quot;">​</a></h3><ul><li>过度分解导致碎片化</li><li>代码块与上下文强耦合</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 不推荐：需要传递过多参数</span></span>
<span class="line"><span>public void process() {</span></span>
<span class="line"><span>    int a = 10;</span></span>
<span class="line"><span>    String b = &quot;data&quot;;</span></span>
<span class="line"><span>    boolean c = true;</span></span>
<span class="line"><span>    // 提炼后的函数需要传递a、b、c三个参数</span></span>
<span class="line"><span>    processSubtask(a, b, c);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    private void processSubtask(int a, String b, boolean c) {</span></span>
<span class="line"><span>    // 逻辑依赖a、b、c</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 问题：参数过多，可能意味着原函数职责过重</span></span></code></pre></div><ul><li>性能敏感场景 <ul><li>循环内频繁调用函数</li><li>过多的参数传递</li></ul></li><li>破环原有逻辑的原子性</li></ul><h2 id="引入参数对象" tabindex="-1">引入参数对象 <a class="header-anchor" href="#引入参数对象" aria-label="Permalink to &quot;引入参数对象&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 重构前</span></span>
<span class="line"><span>public void createEvent(String title, LocalDateTime startTime, </span></span>
<span class="line"><span>                       LocalDateTime endTime, String location) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 重构后</span></span>
<span class="line"><span>class EventParams {</span></span>
<span class="line"><span>    String title;</span></span>
<span class="line"><span>    LocalDateTime startTime;</span></span>
<span class="line"><span>    LocalDateTime endTime;</span></span>
<span class="line"><span>    String location;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public void createEvent(EventParams params) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,12)]))}const m=n(e,[["render",i]]);export{h as __pageData,m as default};
