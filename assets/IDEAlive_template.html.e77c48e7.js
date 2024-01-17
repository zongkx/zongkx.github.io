import{_ as n,a as s}from"./app.6a98a4dc.js";const a={},e=s(`<h2 id="class-enum-interface" tabindex="-1"><a class="header-anchor" href="#class-enum-interface" aria-hidden="true">#</a> class/enum/interface</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token comment">#if (\${PACKAGE_NAME} &amp;&amp; \${PACKAGE_NAME} != &quot;&quot;)package \${PACKAGE_NAME};#end</span>
<span class="token comment">/**
 * @author zongkx
 */</span>
 
 
<span class="token keyword">public</span> class \${NAME} {
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="tests" tabindex="-1"><a class="header-anchor" href="#tests" aria-hidden="true">#</a> tests</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token comment">#if (\${PACKAGE_NAME} &amp;&amp; \${PACKAGE_NAME} != &quot;&quot;)package \${PACKAGE_NAME};#end</span>

<span class="token comment">/**
 * @author zongkx
 */</span>

<span class="token keyword">import</span> lombok<span class="token punctuation">.</span>SneakyThrows<span class="token punctuation">;</span>
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>BeforeAll<span class="token punctuation">;</span>
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Test<span class="token punctuation">;</span>
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>TestInstance<span class="token punctuation">;</span>


<span class="token comment">/**
 * @author zongkxc
 */</span>

<span class="token variable">@TestInstance</span><span class="token punctuation">(</span>TestInstance<span class="token punctuation">.</span>Lifecycle<span class="token punctuation">.</span>PER_CLASS<span class="token punctuation">)</span>
<span class="token keyword">public</span> class \${NAME}Tests {

    <span class="token variable">@BeforeAll</span>
    <span class="token keyword">public</span> void before<span class="token punctuation">(</span><span class="token punctuation">)</span>{
        
        
    }
    
    
    <span class="token variable">@Test</span>
    <span class="token variable">@SneakyThrows</span>
    <span class="token keyword">public</span> void a1 <span class="token punctuation">(</span><span class="token punctuation">)</span>{

    }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div>`,4);function p(l,t){return e}var r=n(a,[["render",p],["__file","IDEAlive_template.html.vue"]]);export{r as default};
