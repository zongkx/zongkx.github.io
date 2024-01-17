import{_ as n,a as s}from"./app.6a98a4dc.js";const a={},e=s(`<p>\u9700\u8981\u4E00\u4E2A\u5305\u542Bpy/node/jdk\u73AF\u5883\u7684\u57FA\u7840\u955C\u50CF,\u7528\u4E8Exxl-job excutor\u4F7F\u7528 \u4F7F\u7528\u4E86docker-hub\u4E2D\u7684 pyenv\u955C\u50CF,\u5176\u4E2D\u5305\u542B\u4E86 py2/3</p><p>ADD\u81EA\u5E26\u89E3\u538B\u7F29\u529F\u80FD</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> vicamo/pyenv</span>

<span class="token instruction"><span class="token keyword">ENV</span> TZ=Asia/Shanghai</span>
<span class="token instruction"><span class="token keyword">RUN</span> ln -snf /usr/share/zoneinfo/<span class="token variable">$TZ</span> /etc/localtime &amp;&amp; echo <span class="token variable">$TZ</span> &gt; /etc/timezone</span>

<span class="token instruction"><span class="token keyword">ADD</span> jdk.gz /opt/local</span>
<span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME /opt/local/jdk1.8.0_151</span>
<span class="token instruction"><span class="token keyword">ENV</span> CLASSPATH <span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar</span>
<span class="token instruction"><span class="token keyword">ENV</span> PATH <span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$PATH</span></span>

<span class="token instruction"><span class="token keyword">ADD</span> node-v12.16.2-linux-x64.tar.xz /opt</span>
<span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token variable">$PATH</span>:/opt/node-v12.16.2-linux-x64/bin</span>


</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,3);function p(l,r){return e}var c=n(a,[["render",p],["__file","Docker-\u57FA\u7840\u955C\u50CF\u6784\u5EFA.html.vue"]]);export{c as default};
