import{_ as i,o as a,c as n,a2 as t}from"./chunks/framework.CV95Wmln.js";const p="/assets/123235435.BB8rMr9n.png",l="/assets/20298734.DRvOqM9c.png",e="/assets/234346.DyRRoCNM.png",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202601-AI实践和应用.md","filePath":"doc/blog/202601-AI实践和应用.md"}'),h={name:"doc/blog/202601-AI实践和应用.md"};function k(o,s,r,E,d,F){return a(),n("div",null,[...s[0]||(s[0]=[t('<h2 id="部署" tabindex="-1">部署 <a class="header-anchor" href="#部署" aria-label="Permalink to &quot;部署&quot;">​</a></h2><p>使用 <code>https://lmstudio.ai/download</code> 非常易于部署</p><p>拿没有显卡的Windows物理机为例, 跑 <code>wen3-8b-deepseek-v3.2-speciale-distill</code> 配置中关闭显卡: <img src="'+p+'" alt="img.png"></p><p><img src="'+l+'" alt="img.png"></p><ul><li>GPU卸载关闭</li><li>线程池拉满</li><li>KV缓存到GPU关闭</li></ul><p><img src="'+e+`" alt="img.png"></p><p>开启网络服务</p><h2 id="mr-codereview" tabindex="-1">MR CodeReview <a class="header-anchor" href="#mr-codereview" aria-label="Permalink to &quot;MR CodeReview&quot;">​</a></h2><p>在gitlab ci中添加以下配置</p><pre><code>- gitlab runner 需要 python环境
- temperature设置为0.1 避免过多废话
</code></pre><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">stages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">variables</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  GIT_DEPTH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 关键修复：设置为 0 禁用 depth 限制</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  LM_STUDIO_URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://10.4.46.232:1234/v1&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  REVIEW_MODEL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;qwen3-8b-deepseek-v3.2-speciale-distill&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 请确保在 GitLab UI 的 CI/CD Variables 中配置了 GITLAB_TOKEN</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ai_code_review</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  stage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  only</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">merge_requests</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      echo &quot;--- 环境检测 ---&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      # 确保我们有远程分支的信息</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      echo &quot;正在提取代码差异 (Diff)...&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      RAW_DIFF=$(git diff FETCH_HEAD...HEAD)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      echo &quot;正在处理 JSON 转义 (使用 Python)...&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      SAFE_DIFF=$(echo &quot;$RAW_DIFF&quot; | python -c &#39;import json, sys; print(json.dumps(sys.stdin.read()))&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      echo &quot;正在调用 AI 模型 $REVIEW_MODEL...&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      AI_RESPONSE=$(curl -s $LM_STUDIO_URL/chat/completions \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        -H &quot;Content-Type: application/json&quot; \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        -d &quot;{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          \\&quot;model\\&quot;: \\&quot;$REVIEW_MODEL\\&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          \\&quot;temperature\\&quot;: \\&quot;0.1\\&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          \\&quot;top\\&quot;: \\&quot;0.7\\&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          \\&quot;messages\\&quot;: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            {\\&quot;role\\&quot;: \\&quot;system\\&quot;, \\&quot;content\\&quot;: \\&quot;你是一个资深的 Java 开发专家。请严格评审以下 Diff：1. 仅指出可能导致崩溃的 Bug 或严重的性能问题；2. 提供具体的重构建议；3. 忽略格式等琐碎问题。要求：分条列出，言简意赅，严禁废话，总数不超 100 字，必须使用中文和Markdown语法进行排版。\\&quot;},</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            {\\&quot;role\\&quot;: \\&quot;user\\&quot;, \\&quot;content\\&quot;: $SAFE_DIFF}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          ]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        }&quot;)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      echo &quot;正在解析 AI 回复: $AI_RESPONSE&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      export AI_RESPONSE</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      REVIEW_BODY=$(echo &quot;$AI_RESPONSE&quot; |PYTHONIOENCODING=utf-8 python -c &quot;import json, sys, re; data=json.load(sys.stdin); content=data[&#39;choices&#39;][0][&#39;message&#39;][&#39;content&#39;]; content=re.sub(r&#39;&lt;think&gt;.*?&lt;/think&gt;&#39;, &#39;&#39;, content, flags=re.DOTALL).strip(); print(content)&quot;)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      echo &quot;正在解析 AI 回复: $REVIEW_BODY&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      export REVIEW_BODY</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      SAFE_PAYLOAD=$(python -c &quot;import json, os; print(json.dumps({&#39;body&#39;: os.environ.get(&#39;REVIEW_BODY&#39;, &#39;&#39;).strip()}))&quot;)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      curl --request POST \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        --header &quot;PRIVATE-TOKEN: $GITLAB_TOKEN&quot; \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        --header &quot;Content-Type: application/json&quot; \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          --data &quot;$SAFE_PAYLOAD&quot; \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes&quot;</span></span></code></pre></div><p>另外需要 配置 Gitlab token</p><ol><li>项目设置-访问令牌,新建一个 拥有Api权限的token, 复制token</li><li>项目设置-CICD-变量,新建一个变量 <code>GITLAB_TOKEN</code>,值为复制的token, 关闭 保护变量和隐藏变量</li></ol><p>ci开启后,提交的MR就会见到AI 评论.</p>`,14)])])}const u=i(h,[["render",k]]);export{g as __pageData,u as default};
