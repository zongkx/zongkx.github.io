import{_ as i,C as l,o as a,c as t,a2 as n,b as o,w as e,a as c,E as r,a3 as h}from"./chunks/framework.CZW044RH.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/blog/202607-AWS实战.md","filePath":"doc/blog/202607-AWS实战.md"}'),d={name:"doc/blog/202607-AWS实战.md"};function u(k,s,F,g,C,E){const p=l("Mermaid");return a(),t("div",null,[s[1]||(s[1]=n(`<h2 id="aws-cli-aksk" tabindex="-1">AWS CLI / AKSK <a class="header-anchor" href="#aws-cli-aksk" aria-label="Permalink to &quot;AWS CLI / AKSK&quot;">​</a></h2><p>AWS 网页端针对EKS/ECR等未提供网页版资源操作功能, 多数情况下都需要使用cli 和本地的kubectl 来操作资源, 所以需要先安装基础环境</p><ul><li>下载</li></ul><p><code>https://awscli.amazonaws.com/AWSCLIV2.msi</code></p><ul><li>AKSK</li></ul><p>AWS控制台进入: <code>IAM/安全性/创建访问密钥</code>, 创建一个 <code>AKSK</code>, IDEA插件可以直接配置<code>AKSK</code>使用.</p><ul><li>命令行登录</li></ul><p>命令行输入 <code>aws login</code> ,自动跳转浏览器登录即可</p><h2 id="ecr" tabindex="-1">ECR <a class="header-anchor" href="#ecr" aria-label="Permalink to &quot;ECR&quot;">​</a></h2><ol><li><p>创建存储库 <code>xxx/yyyy</code></p><p>页面创建后获取存储库 URI</p></li><li><p>push</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@echo off</span></span>
<span class="line"><span>setlocal enabledelayedexpansion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 1. 检查是否安装了 aws CLI</span></span>
<span class="line"><span>where aws &gt;nul 2&gt;nul</span></span>
<span class="line"><span>if errorlevel 1 (</span></span>
<span class="line"><span>echo [错误] 未找到 aws 命令，请先安装 AWS CLI。</span></span>
<span class="line"><span>exit /b 1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>:: 2. 获取当前时间（格式：YYYYMMDDHHmm）</span></span>
<span class="line"><span>for /f &quot;usebackq delims=&quot; %%a in (\`powershell -Command &quot;Get-Date -Format &#39;yyyyMMddHHmm&#39;&quot;\`) do set mydatetime=%%a</span></span>
<span class="line"><span>echo 构建标签时间戳: %mydatetime%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 3. 设置镜像标签</span></span>
<span class="line"><span>set DOCKER_TAG=V2.0.12-%mydatetime%</span></span>
<span class="line"><span>echo 镜像标签: %DOCKER_TAG%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 4. 获取 ECR 临时密码</span></span>
<span class="line"><span>echo 正在获取 ECR 临时密码（区域: us-east-1）...</span></span>
<span class="line"><span>for /f &quot;usebackq delims=&quot; %%p in (\`aws ecr get-login-password --region us-east-1\`) do set ECR_PASSWORD=%%p</span></span>
<span class="line"><span>if errorlevel 1 (</span></span>
<span class="line"><span>echo [错误] 获取 ECR 密码失败，请检查 AWS CLI 配置和网络。</span></span>
<span class="line"><span>exit /b 1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>echo ECR 密码已获取（长度: !ECR_PASSWORD:~0,5!...）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 5. 使用获取到的密码登录到 ECR</span></span>
<span class="line"><span>echo 正在登录到 ECR...</span></span>
<span class="line"><span>aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 862087104231.dkr.ecr.us-east-1.amazonaws.com</span></span>
<span class="line"><span>if errorlevel 1 (</span></span>
<span class="line"><span>echo [错误] docker login 失败，请检查 Docker 是否运行。</span></span>
<span class="line"><span>exit /b 1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>echo 登录成功！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 6. 执行 Maven 构建（只 build，不 push）</span></span>
<span class="line"><span>set IMAGE_NAME=*****.dkr.ecr.us-east-1.amazonaws.com/demo/demo:%DOCKER_TAG%</span></span>
<span class="line"><span>@echo 镜像构建  %IMAGE_NAME% begin...</span></span>
<span class="line"><span>docker build -t %IMAGE_NAME% .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@echo  结束部署</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 7. 手动推送镜像</span></span>
<span class="line"><span>echo 推送镜像: %IMAGE_NAME%</span></span>
<span class="line"><span>docker push %IMAGE_NAME%</span></span>
<span class="line"><span>if errorlevel 1 (</span></span>
<span class="line"><span>echo [错误] Docker 推送失败</span></span>
<span class="line"><span>exit /b 1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo ================================</span></span>
<span class="line"><span>echo   推送镜像成功！</span></span>
<span class="line"><span>echo ================================</span></span>
<span class="line"><span>endlocal</span></span></code></pre></div><h2 id="rds" tabindex="-1">RDS <a class="header-anchor" href="#rds" aria-label="Permalink to &quot;RDS&quot;">​</a></h2><h2 id="eks" tabindex="-1">EKS <a class="header-anchor" href="#eks" aria-label="Permalink to &quot;EKS&quot;">​</a></h2>`,13)),(a(),o(h,null,{default:e(()=>[r(p,{id:"mermaid-61",class:"mermaid my-class",graph:"graph%20TD%0A%20%20%20%20subgraph%20Public_Internet%20%5B1.%20%E5%85%AC%E7%BD%91%E5%AE%A2%E6%88%B7%E7%AB%AF%20%2F%20IoT%20%E8%AE%BE%E5%A4%87%5D%0A%20%20%20%20%20%20%20%20Browser%5B%22%F0%9F%92%BB%20%E7%BD%91%E9%A1%B5%E7%AB%AF%E6%B5%8F%E8%A7%88%E5%99%A8%20%3Cbr%2F%3E%20(%E4%BA%BA%E7%B1%BB%E7%94%A8%E6%88%B7)%22%5D%0A%20%20%20%20%20%20%20%20Device%5B%22%F0%9F%93%9F%20%E7%89%A9%E8%81%94%E7%BD%91%E8%AE%BE%E5%A4%87%20%3Cbr%2F%3E%20(TCP%20%E5%AE%A2%E6%88%B7%E7%AB%AF)%22%5D%0A%20%20%20%20end%0A%0A%20%20%20%20subgraph%20DNS_Layer%20%5B2.%20DNS%20%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%5D%0A%20%20%20%20%20%20%20%20aed_DNS%5B%22%F0%9F%8C%90%20aed-aws.comen.com%20%3Cbr%2F%3E%20(CNAME%20%E8%AE%B0%E5%BD%95)%22%5D%0A%20%20%20%20%20%20%20%20codec_DNS%5B%22%F0%9F%8C%90%20codec-aws.comen.com%20%3Cbr%2F%3E%20(CNAME%20%E8%AE%B0%E5%BD%95)%22%5D%0A%20%20%20%20end%0A%0A%20%20%20%20subgraph%20AWS_Cloud%20%5B3.%20AWS%20%E7%BD%91%E7%BB%9C%E8%BE%B9%E7%95%8C%20-%20%E5%85%AC%E7%BD%91%E5%AD%90%E7%BD%91%5D%0A%20%20%20%20%20%20%20%20ALB%5B%22%F0%9F%8E%AF%20AWS%20ALB%20(%E4%B8%83%E5%B1%82%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1)%20%3Cbr%2F%3E%20%E7%9B%91%E5%90%AC%E7%AB%AF%E5%8F%A3%3A%2080%20%26%20443%20%3Cbr%2F%3E%20(%E9%9B%86%E6%88%90%20ACM%20%E8%AF%81%E4%B9%A6%2C%20%E5%8D%B8%E8%BD%BD%20TLS)%22%5D%0A%20%20%20%20%20%20%20%20NLB%5B%22%E2%9A%A1%20AWS%20NLB%20(%E5%9B%9B%E5%B1%82%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1)%20%3Cbr%2F%3E%20%E7%9B%91%E5%90%AC%E7%AB%AF%E5%8F%A3%3A%209122%20%3Cbr%2F%3E%20(Target%20Type%3A%20IP%20%E6%A8%A1%E5%BC%8F)%22%5D%0A%20%20%20%20end%0A%0A%20%20%20%20subgraph%20EKS_Cluster%20%5B4.%20AWS%20EKS%20%E9%9B%86%E7%BE%A4%20-%20VPC%20%E7%A7%81%E6%9C%89%E5%AD%90%E7%BD%91%5D%0A%20%20%20%20%20%20%20%20subgraph%20K8s_aed%20%5BAED%20%E7%BD%91%E9%A1%B5%E4%B8%9A%E5%8A%A1%20-%20Web%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20aed_Ingress%5B%22K8s%20Ingress%22%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20aed_Service%5B%22Service%3A%20aed%20%3Cbr%2F%3E%20(Type%3A%20ClusterIP)%22%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20aed_Pod1%5B%22Pod%3A%20aed-web-xxx%20%3Cbr%2F%3E%20(IP%3A%20172.31.x.x%3A80)%22%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20aed_Pod2%5B%22Pod%3A%20aed-web-yyy%20%3Cbr%2F%3E%20(IP%3A%20172.31.x.x%3A80)%22%5D%0A%20%20%20%20%20%20%20%20end%0A%0A%20%20%20%20%20%20%20%20subgraph%20K8s_codec%20%5BCodec%20TCP%20%E4%B8%9A%E5%8A%A1%20-%20IoT%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20codec_Service%5B%22Service%3A%20codec-nlb%20%3Cbr%2F%3E%20(Type%3A%20LoadBalancer%20%3Cbr%2F%3E%209122%20-%3E%209092)%22%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20codec_Pod1%5B%22Pod%3A%20codec-xxx%20%3Cbr%2F%3E%20(IP%3A%20172.31.66.240%3A9122)%22%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20codec_Pod2%5B%22Pod%3A%20codec-yyy%20%3Cbr%2F%3E%20(IP%3A%20172.31.z.z%3A9122)%22%5D%0A%20%20%20%20%20%20%20%20end%0A%20%20%20%20end%0A%0A%20%20%20%20%25%25%20%E6%B5%81%E9%87%8F%E8%B7%AF%E7%94%B1%E5%85%B3%E7%B3%BB%E8%BF%9E%E7%BA%BF%0A%20%20%20%20Browser%20--%3E%7CHTTPS%3A%2F%2F%7C%20aed_DNS%0A%20%20%20%20Device%20--%3E%7CTCP%209122%7C%20codec_DNS%0A%0A%20%20%20%20aed_DNS%20--%3E%7CCNAME%20%E6%8C%87%E5%90%91%7C%20ALB%0A%20%20%20%20codec_DNS%20--%3E%7CCNAME%20%E6%8C%87%E5%90%91%7C%20NLB%0A%0A%20%20%20%20%25%25%20ALB%20%E6%B5%81%E9%87%8F%E9%93%BE%E8%B7%AF%0A%20%20%20%20ALB%20--%3E%7CHTTP%2080%20%E8%BD%AC%E5%8F%91%7C%20aed_Ingress%0A%20%20%20%20aed_Ingress%20--%3E%20aed_Service%0A%20%20%20%20aed_Service%20--%3E%20aed_Pod1%0A%20%20%20%20aed_Service%20--%3E%20aed_Pod2%0A%0A%20%20%20%20%25%25%20NLB%20%E6%B5%81%E9%87%8F%E9%93%BE%E8%B7%AF%20(IP%E7%9B%B4%E8%BF%9E%E6%A8%A1%E5%BC%8F%EF%BC%8C%E7%BB%95%E8%BF%87%20Kube-Proxy)%0A%20%20%20%20NLB%20--%3E%7C%E7%9B%B4%E8%BF%9E%20Pod%209122%20%E7%AB%AF%E5%8F%A3%7C%20codec_Pod1%0A%20%20%20%20NLB%20--%3E%7C%E7%9B%B4%E8%BF%9E%20Pod%209122%20%E7%AB%AF%E5%8F%A3%7C%20codec_Pod2%0A%0A%20%20%20%20%25%25%20%E6%A0%B7%E5%BC%8F%E7%BE%8E%E5%8C%96%0A%20%20%20%20style%20ALB%20fill%3A%23FF9900%2Cstroke%3A%23333%2Cstroke-width%3A2px%2Ccolor%3A%23fff%0A%20%20%20%20style%20NLB%20fill%3A%23FF9900%2Cstroke%3A%23333%2Cstroke-width%3A2px%2Ccolor%3A%23fff%0A%20%20%20%20style%20EKS_Cluster%20fill%3A%23ececff%2Cstroke%3A%23333%2Cstroke-width%3A1px%0A%20%20%20%20style%20Public_Internet%20fill%3A%23f9f9f9%2Cstroke%3A%23333%2Cstroke-dasharray%3A%205%205%0A"})]),fallback:e(()=>[...s[0]||(s[0]=[c(" Loading... ",-1)])]),_:1})),s[2]||(s[2]=n(`<h3 id="iam-policy" tabindex="-1">IAM Policy <a class="header-anchor" href="#iam-policy" aria-label="Permalink to &quot;IAM Policy&quot;">​</a></h3><p>使用ROOT账号给IAM账号赋权 <code>AmazonEKSAdminPolicy</code></p><h3 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;Deployment&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: apps/v1</span></span>
<span class="line"><span>kind: Deployment</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  annotations:</span></span>
<span class="line"><span>    deployment.kubernetes.io/revision: &quot;1&quot;</span></span>
<span class="line"><span>    kubectl.kubernetes.io/last-applied-configuration: |</span></span>
<span class="line"><span>      {&quot;apiVersion&quot;:&quot;apps/v1&quot;,&quot;kind&quot;:&quot;Deployment&quot;,&quot;metadata&quot;:{&quot;annotations&quot;:{},&quot;labels&quot;:{&quot;app&quot;:&quot;aed&quot;},&quot;name&quot;:&quot;aed&quot;,&quot;namespace&quot;:&quot;default&quot;},&quot;spec&quot;:{&quot;replicas&quot;:1,&quot;selector&quot;:{&quot;matchLabels&quot;:{&quot;app&quot;:&quot;aed&quot;}},&quot;strategy&quot;:{&quot;rollingUpdate&quot;:{&quot;maxSurge&quot;:&quot;25%&quot;,&quot;maxUnavailable&quot;:&quot;25%&quot;},&quot;type&quot;:&quot;RollingUpdate&quot;},&quot;template&quot;:{&quot;metadata&quot;:{&quot;annotations&quot;:{&quot;redeploy-timestamp&quot;:&quot;1727438872541&quot;},&quot;labels&quot;:{&quot;app&quot;:&quot;aed&quot;}},&quot;spec&quot;:{&quot;containers&quot;:[{&quot;env&quot;:[{&quot;name&quot;:&quot;LANG&quot;,&quot;value&quot;:&quot;en_US.UTF-8&quot;},{&quot;name&quot;:&quot;LANGUAGE&quot;,&quot;value&quot;:&quot;en_US:en&quot;},{&quot;name&quot;:&quot;JAVA_HOME&quot;,&quot;value&quot;:&quot;/usr/lib/jvm/jdk-17.0.10-bellsoft-x86_64&quot;},{&quot;name&quot;:&quot;TZ&quot;,&quot;value&quot;:&quot;Asia/Shanghai&quot;},{&quot;name&quot;:&quot;PARAMS&quot;,&quot;valueFrom&quot;:{&quot;configMapKeyRef&quot;:{&quot;key&quot;:&quot;PARAMS&quot;,&quot;name&quot;:&quot;aed-prod-params&quot;}}}],&quot;image&quot;:&quot;862087104231.dkr.ecr.us-east-1.amazonaws.com/aed/iwork-aed:V2.0.12-202607151522&quot;,&quot;imagePullPolicy&quot;:&quot;Always&quot;,&quot;name&quot;:&quot;aed&quot;,&quot;ports&quot;:[{&quot;containerPort&quot;:80,&quot;name&quot;:&quot;ng&quot;,&quot;protocol&quot;:&quot;TCP&quot;},{&quot;containerPort&quot;:5701,&quot;name&quot;:&quot;hz&quot;,&quot;protocol&quot;:&quot;TCP&quot;}],&quot;resources&quot;:{&quot;requests&quot;:{&quot;cpu&quot;:&quot;500m&quot;,&quot;ephemeral-storage&quot;:&quot;4Gi&quot;,&quot;memory&quot;:&quot;1Gi&quot;}}}],&quot;dnsPolicy&quot;:&quot;ClusterFirst&quot;,&quot;imagePullSecrets&quot;:[{&quot;name&quot;:&quot;aed&quot;}],&quot;restartPolicy&quot;:&quot;Always&quot;,&quot;schedulerName&quot;:&quot;default-scheduler&quot;,&quot;securityContext&quot;:{},&quot;terminationGracePeriodSeconds&quot;:30}}}}</span></span>
<span class="line"><span>  labels:</span></span>
<span class="line"><span>    app: aed</span></span>
<span class="line"><span>  name: aed</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  progressDeadlineSeconds: 600</span></span>
<span class="line"><span>  replicas: 1</span></span>
<span class="line"><span>  revisionHistoryLimit: 10</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    matchLabels:</span></span>
<span class="line"><span>      app: aed</span></span>
<span class="line"><span>  strategy:</span></span>
<span class="line"><span>    rollingUpdate:</span></span>
<span class="line"><span>      maxSurge: 25%</span></span>
<span class="line"><span>      maxUnavailable: 25%</span></span>
<span class="line"><span>    type: RollingUpdate</span></span>
<span class="line"><span>  template:</span></span>
<span class="line"><span>    metadata:</span></span>
<span class="line"><span>      annotations:</span></span>
<span class="line"><span>        redeploy-timestamp: &quot;1727438872541&quot;</span></span>
<span class="line"><span>      labels:</span></span>
<span class="line"><span>        app: aed</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      containers:</span></span>
<span class="line"><span>        - env:</span></span>
<span class="line"><span>            - name: LANG</span></span>
<span class="line"><span>              value: en_US.UTF-8</span></span>
<span class="line"><span>            - name: LANGUAGE</span></span>
<span class="line"><span>              value: en_US:en</span></span>
<span class="line"><span>            - name: JAVA_HOME</span></span>
<span class="line"><span>              value: /usr/lib/jvm/jdk-17.0.10-bellsoft-x86_64</span></span>
<span class="line"><span>            - name: TZ</span></span>
<span class="line"><span>              value: Asia/Shanghai</span></span>
<span class="line"><span>            - name: PARAMS</span></span>
<span class="line"><span>              valueFrom:</span></span>
<span class="line"><span>                configMapKeyRef:</span></span>
<span class="line"><span>                  key: PARAMS</span></span>
<span class="line"><span>                  name: aed-prod-params</span></span>
<span class="line"><span>          image: *****.dkr.ecr.us-east-1.amazonaws.com/demo/demo:1</span></span>
<span class="line"><span>          imagePullPolicy: Always</span></span>
<span class="line"><span>          name: aed</span></span>
<span class="line"><span>          ports:</span></span>
<span class="line"><span>            - containerPort: 80</span></span>
<span class="line"><span>              name: ng</span></span>
<span class="line"><span>              protocol: TCP</span></span>
<span class="line"><span>            - containerPort: 5701</span></span>
<span class="line"><span>              name: hz</span></span>
<span class="line"><span>              protocol: TCP</span></span>
<span class="line"><span>          resources:</span></span>
<span class="line"><span>            requests:</span></span>
<span class="line"><span>              cpu: 500m</span></span>
<span class="line"><span>              ephemeral-storage: 4Gi</span></span>
<span class="line"><span>              memory: 1Gi</span></span>
<span class="line"><span>          terminationMessagePath: /dev/termination-log</span></span>
<span class="line"><span>          terminationMessagePolicy: File</span></span>
<span class="line"><span>      dnsPolicy: ClusterFirst</span></span>
<span class="line"><span>      imagePullSecrets:</span></span>
<span class="line"><span>        - name: aed</span></span>
<span class="line"><span>      restartPolicy: Always</span></span>
<span class="line"><span>      schedulerName: default-scheduler</span></span>
<span class="line"><span>      securityContext: { }</span></span>
<span class="line"><span>      terminationGracePeriodSeconds: 30</span></span></code></pre></div><h3 id="configmap" tabindex="-1">ConfigMap <a class="header-anchor" href="#configmap" aria-label="Permalink to &quot;ConfigMap&quot;">​</a></h3><p>configMap的 key 要和上面的 引用的 key保持一致</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: ConfigMap</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: aed-prod-params</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>data:</span></span>
<span class="line"><span>  PARAMS: |</span></span>
<span class="line"><span>    -Dspring.profiles.active=prod</span></span></code></pre></div><h3 id="service" tabindex="-1">Service <a class="header-anchor" href="#service" aria-label="Permalink to &quot;Service&quot;">​</a></h3><h4 id="alb和nlb" tabindex="-1">ALB和NLB <a class="header-anchor" href="#alb和nlb" aria-label="Permalink to &quot;ALB和NLB&quot;">​</a></h4><p>对于需要 TCP服务和HTTPS服务而言,常见的思路有两种:</p><ul><li>融合架构：NLB (四层) as a Target for ALB (七层) + 纯 TCP 业务直连</li></ul><p>在 EKS 生产环境中，通常会面临 HTTP/HTTPS (Web 应用) 与纯 TCP (物联网/长连接) 流量共存的场景。 本方案将 AWS NLB 置于公网最前端作为“唯一入口”，通过端口分流： 80/443 端口：转发给内网 ALB，由 ALB 负责 SSL 证书卸载与七层域名/路径路由。 9122 端口：直接转发给后端的 codec Pod，避开 ALB，支持高性能 TCP 长连接。</p><ul><li>极简解耦架构：公网 ALB (七层) + 独立公网 NLB (四层)</li></ul><p>通过采用两个独立的域名，我们将网页业务与 TCP 业务在 DNS 层面彻底剥离。两套流量各走各的负载均衡通道，互不干扰，架构极其清爽。</p><h4 id="alb-安装" tabindex="-1">ALB 安装 <a class="header-anchor" href="#alb-安装" aria-label="Permalink to &quot;ALB 安装&quot;">​</a></h4><h5 id="第一步-安装-eksctl-和-helm" tabindex="-1">第一步：安装 eksctl 和 helm <a class="header-anchor" href="#第一步-安装-eksctl-和-helm" aria-label="Permalink to &quot;第一步：安装 eksctl 和 helm&quot;">​</a></h5><p>CloudShell 默认没有这两个工具，需要先装上。</p><p><strong>安装 eksctl</strong>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PLATFORM</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">uname</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">_amd64</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$PLATFORM</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.tar.gz&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xz</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -C</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/eksctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/bin</span></span></code></pre></div><p><strong>安装 helm</strong>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bash</span></span></code></pre></div><h5 id="第二步-执行安装命令" tabindex="-1">第二步：执行安装命令 <a class="header-anchor" href="#第二步-执行安装命令" aria-label="Permalink to &quot;第二步：执行安装命令&quot;">​</a></h5><p>然后，你就可以完全按照我们之前讨论的步骤，在 CloudShell 中依次执行所有命令了：</p><p><strong>创建 IAM OIDC 提供商</strong> (你已经做过了):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">eksctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> utils</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> associate-iam-oidc-provider</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --region</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> us-east-1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --approve</span></span></code></pre></div><p><strong>下载并创建 IAM 策略</strong>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.13.3/docs/install/iam_policy.json</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">aws</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> iam</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create-policy</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --policy-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AWSLoadBalancerControllerIAMPolicy</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --policy-document</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file://iam_policy.json</span></span></code></pre></div><p><strong>创建 ServiceAccount 并绑定 IAM 角色</strong>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">eksctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> iamserviceaccount</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --cluster=aed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --namespace=kube-system</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --name=aws-load-balancer-controller</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --attach-policy-arn=arn:aws:iam::862087104231:policy/AWSLoadBalancerControllerIAMPolicy</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --override-existing-serviceaccounts</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --region</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> us-east-1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --approve</span></span></code></pre></div><p><strong>安装 AWS Load Balancer Controller</strong>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> eks</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://aws.github.io/eks-charts</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aws-load-balancer-controller</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> eks/aws-load-balancer-controller</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clusterName=aed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serviceAccount.create=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serviceAccount.name=aws-load-balancer-controller</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> region=us-east-1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vpcId=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">你的VPC_I</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">D</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kube-system</span></span></code></pre></div><blockquote><p><strong>小提示</strong>：vpcId 参数是必须的，可以通过以下命令获取:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">aws</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> eks</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> describe-cluster</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --region</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> us-east-1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --query</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;cluster.resourcesVpcConfig.vpcId&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --output</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text</span></span></code></pre></div></blockquote><h5 id="✅-安装后验证" tabindex="-1">✅ 安装后验证 <a class="header-anchor" href="#✅-安装后验证" aria-label="Permalink to &quot;✅ 安装后验证&quot;">​</a></h5><p>安装完成后，记得检查一下 Controller Pod 是否正常运行:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pods</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kube-system</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app.kubernetes.io/name=aws-load-balancer-controller</span></span></code></pre></div><p>看到 Pod 状态为 <code>Running</code> 就说明安装成功了。之后，你的 Ingress 资源就会被控制器接管，ALB 也会自动创建出来。</p><hr><h4 id="clusterip-service" tabindex="-1">ClusterIP Service <a class="header-anchor" href="#clusterip-service" aria-label="Permalink to &quot;ClusterIP Service&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Service</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: aed</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  ports:</span></span>
<span class="line"><span>    - name: aed</span></span>
<span class="line"><span>      port: 443</span></span>
<span class="line"><span>      targetPort: 80</span></span>
<span class="line"><span>      protocol: TCP</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    app: aed</span></span>
<span class="line"><span>  type: ClusterIP</span></span></code></pre></div><h4 id="nlb-service" tabindex="-1">NLB Service <a class="header-anchor" href="#nlb-service" aria-label="Permalink to &quot;NLB Service&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Service</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: codec-nlb</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>  annotations:</span></span>
<span class="line"><span>    service.beta.kubernetes.io/aws-load-balancer-type: &quot;external&quot;</span></span>
<span class="line"><span>    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: &quot;ip&quot;</span></span>
<span class="line"><span>    service.beta.kubernetes.io/aws-load-balancer-scheme: &quot;internet-facing&quot;</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  type: LoadBalancer</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    app: codec        # 准确勾连你的 codec 容器</span></span>
<span class="line"><span>  ports:</span></span>
<span class="line"><span>    - name: tcp-codec</span></span>
<span class="line"><span>      port: 9122      # NLB 对外暴露的公网端口</span></span>
<span class="line"><span>      targetPort: 9122 # 容器内部监听的端口</span></span>
<span class="line"><span>      protocol: TCP</span></span></code></pre></div><p><code>kubectl get svc codec-nlb -n default</code> 获取 aws 域名</p><h4 id="安全组和目标群组" tabindex="-1">安全组和目标群组 <a class="header-anchor" href="#安全组和目标群组" aria-label="Permalink to &quot;安全组和目标群组&quot;">​</a></h4><p>在 ip 模式下，NLB 会直接使用集群私有子网的 IP（即 NLB 所在子网的 IP）去连接你的 Pod。 排查动作：</p><ul><li>找到你 EKS 实例（Worker Node）所绑定的安全组 (Security Group)。</li><li>检查其入站规则 (Inbound Rules)。</li><li>必须确保允许：协议 = TCP, 端口 = 9122, 源地址 = 0.0.0.0/0 或者是你的“VPC 网段 CIDR”（例如 192.168.0.0/16）。</li><li>如果安全组没开，EKS 的网卡会直接丢弃 NLB 的健康检查流量，导致不健康。</li></ul><p>NLB TCP 测试</p><p><code> Test-NetConnection -ComputerName &quot;k8s-default-codecnlb-b3277b8189-4f8d0b35fddd89a8.elb.us-east-1.amazonaws.com&quot; -Port 9122</code></p><h4 id="hazelcast集群" tabindex="-1">Hazelcast集群 <a class="header-anchor" href="#hazelcast集群" aria-label="Permalink to &quot;Hazelcast集群&quot;">​</a></h4><p>对 hazelcast集群而言, 只需要配置一个 clustIp模式 的service 即可, 需要注意的就是 hz 进去 DNS</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Service</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: hazelcast</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  clusterIP: None</span></span>
<span class="line"><span>  clusterIPs:</span></span>
<span class="line"><span>    - None</span></span>
<span class="line"><span>  internalTrafficPolicy: Cluster</span></span>
<span class="line"><span>  ipFamilies:</span></span>
<span class="line"><span>    - IPv4</span></span>
<span class="line"><span>  ipFamilyPolicy: SingleStack</span></span>
<span class="line"><span>  ports:</span></span>
<span class="line"><span>    - name: hazelcast</span></span>
<span class="line"><span>      port: 5701</span></span>
<span class="line"><span>      protocol: TCP</span></span>
<span class="line"><span>      targetPort: 5701</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    app: aed</span></span>
<span class="line"><span>  sessionAffinity: None</span></span>
<span class="line"><span>  type: ClusterIP</span></span></code></pre></div><p>集群的DNS发现的 域名需要配置如下: , 启动 default代表 pod 的 namespace</p><p><code>config.getNetworkConfig().getJoin().getKubernetesConfig().setEnabled(true) .setProperty(&quot;service-dns&quot;, dns);</code><code>hazelcast.default.svc.cluster.local</code></p><h3 id="ingress" tabindex="-1">Ingress <a class="header-anchor" href="#ingress" aria-label="Permalink to &quot;Ingress&quot;">​</a></h3><h4 id="alb证书" tabindex="-1">ALB证书 <a class="header-anchor" href="#alb证书" aria-label="Permalink to &quot;ALB证书&quot;">​</a></h4><p>使用 aws cli 导入证书获取 arn key</p><p><code> aws acm import-certificate --certificate fileb://comen.com.pem --private-key fileb://comen.com.key --certificate-chain fileb://chain.pem --region us-east-1</code></p><h4 id="alb-ingress" tabindex="-1">ALB Ingress <a class="header-anchor" href="#alb-ingress" aria-label="Permalink to &quot;ALB Ingress&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: networking.k8s.io/v1</span></span>
<span class="line"><span>kind: Ingress</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: aed</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>  annotations:</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/scheme: internet-facing</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/target-type: ip</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/listen-ports: &#39;[{&quot;HTTP&quot;: 80}, {&quot;HTTPS&quot;: 443}]&#39;</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:us-east-1:******:certificate/********</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/ssl-redirect: &#39;443&#39;</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/healthcheck-protocol: HTTP</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/healthcheck-path: /</span></span>
<span class="line"><span>    alb.ingress.kubernetes.io/success-codes: 200-499</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  ingressClassName: alb</span></span>
<span class="line"><span>  rules:</span></span>
<span class="line"><span>    - host: *******.com</span></span>
<span class="line"><span>      http:</span></span>
<span class="line"><span>        paths:</span></span>
<span class="line"><span>          - path: /</span></span>
<span class="line"><span>            pathType: Prefix</span></span>
<span class="line"><span>            backend:</span></span>
<span class="line"><span>              service:</span></span>
<span class="line"><span>                name: aed</span></span>
<span class="line"><span>                port:</span></span>
<span class="line"><span>                  number: 443</span></span></code></pre></div>`,58))])}const b=i(d,[["render",u]]);export{q as __pageData,b as default};
