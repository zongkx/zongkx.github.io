import{_ as n,a as e}from"./app.d740ecc1.js";const s={},a=e(`<h2 id="gitlab-jenkins-docker-docker" tabindex="-1"><a class="header-anchor" href="#gitlab-jenkins-docker-docker" aria-hidden="true">#</a> gitlab+jenkins+docker+docker</h2><p>\u76EE\u524D\u516C\u53F8\u8FD0\u884C\u4E86\u4E00\u5957\u4E0A\u8FF0\u670D\u52A1\u90E8\u7F72\u73AF\u5883,\u4F5C\u4E3A\u4E00\u540D\u540E\u7AEF\u5F00\u53D1\u867D\u7136\u6CA1\u6709\u4EB2\u81EA\u90E8\u7F72\u8FC7\u8FD9\u4E9B\u670D\u52A1,\u4F46\u662F\u7B80\u5355\u4F7F\u7528\u8FD8\u662F\u5F88\u6709\u5FC5\u8981\u638C\u63E1\u7684.</p><h3 id="_1-gitlab" tabindex="-1"><a class="header-anchor" href="#_1-gitlab" aria-hidden="true">#</a> 1. gitlab</h3><p>gitlab\u4E2D\u4E00\u822C\u5305\u62ECdev/master\u5206\u652F,\u5206\u522B\u7528\u4E8E\u6D4B\u8BD5\u73AF\u5883\u548C\u751F\u4EA7\u73AF\u5883</p><h3 id="_2-\u9879\u76EE\u4E2D\u7684\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-\u9879\u76EE\u4E2D\u7684\u914D\u7F6E" aria-hidden="true">#</a> 2. \u9879\u76EE\u4E2D\u7684\u914D\u7F6E</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  &lt;profiles&gt;
        &lt;profile&gt;
            &lt;id&gt;pro&lt;/id&gt;
            &lt;activation&gt;
                &lt;activeByDefault&gt;false&lt;/activeByDefault&gt;
            &lt;/activation&gt;
            &lt;properties&gt;
                &lt;profile-name&gt;pro&lt;/profile-name&gt;
                &lt;server-port&gt;9092&lt;/server-port&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
        &lt;profile&gt;
            &lt;id&gt;pro&lt;/id&gt;
            &lt;activation&gt;
                &lt;activeByDefault&gt;true&lt;/activeByDefault&gt;
            &lt;/activation&gt;
            &lt;properties&gt;
                &lt;profile-name&gt;dev&lt;/profile-name&gt;
                &lt;server-port&gt;9092&lt;/server-port&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
  &lt;/profiles&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>\u5229\u7528\u63D2\u4EF6<code>maven-resources-plugin</code>\u81EA\u52A8\u66FF\u6362application.yml/k8s svc\u6587\u4EF6/log.xml\u7B49\u7684\u6587\u4EF6\u4E2D\u7684\u5360\u4F4D\u7B26, \u901A\u8FC7<code>-Pdev</code>/<code>-Ppro</code> \u5B9E\u73B0\u751F\u6210\u4E0D\u540C\u914D\u7F6E\u6587\u4EF6\u7684\u529F\u80FD.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;plugin&gt;
    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;maven-resources-plugin&lt;/artifactId&gt;
    &lt;version&gt;3.2.0&lt;/version&gt;
    &lt;configuration&gt;
        &lt;encoding&gt;utf-8&lt;/encoding&gt;
        &lt;useDefaultDelimiters&gt;true&lt;/useDefaultDelimiters&gt;
        &lt;resources&gt;
            &lt;resource&gt;
                &lt;directory&gt;src/main/resources&lt;/directory&gt;
                &lt;filtering&gt;true&lt;/filtering&gt;
            &lt;/resource&gt;
            &lt;resource&gt;
                &lt;directory&gt;src/main/k8s&lt;/directory&gt;
                &lt;filtering&gt;true&lt;/filtering&gt;
            &lt;/resource&gt;
        &lt;/resources&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><code>deploy.yml</code>:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: mydemo-service
  namespace: mydemo-\${profile-name}
  labels:
    name: mydemo
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      annotations:
        prometheus.io/path: /prometheus
        prometheus.io/port: &quot;\${server-port}&quot;
        prometheus.io/scrape: &quot;true&quot;
      labels:
        name: mydemo-service
    spec:
      containers:
        - image: 127.0.0.1/\${project.artifactId}-\${profile-name}:\${project.version}-\${timestamp}
          name: mydemo-service
      restartPolicy: Always
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><code>svc.yml</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>apiVersion: v1
kind: Service
metadata:
  name: mydemo-service--svc
  namespace: mydemo-\${profile-name}
spec:
  selector:
    name: mydemo-service
  ports:
    - name: http
      port: \${server-port}
      protocol: TCP
  type: NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><code>dockerfile</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>FROM openjdk:8-arthas
VOLUME /tmp
ADD mydemo-service-1.0-SNAPSHOT.jar app.jar
RUN sh -c &#39;touch /app.jar&#39;
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENTRYPOINT [&quot;java&quot;,&quot;-Djava.security.egd=file:/dev/./urandom&quot;,&quot;-Duser.timezone=GMT+08&quot;,&quot;-jar&quot;,&quot;/app.jar&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_3-jenkins" tabindex="-1"><a class="header-anchor" href="#_3-jenkins" aria-hidden="true">#</a> 3. jenkins</h3><p>\u9700\u8981\u5B8C\u6210\u6D41\u6C34\u7EBF\u4E2D\u7684\u811A\u672C,\u4E3A\u4E86\u76F4\u63A5\u4ECEmaven\u9879\u76EE\u5230k8s\u90E8\u7F72,\u5B9E\u9645\u4E0A\u7528\u6D41\u6C34\u7EBF\u811A\u672C\u5373\u53EF\u5B8C\u6210. \u5206\u4E09\u6B65</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>node(&quot;my&quot;) {
   stage(&#39;git clone&#39;) { 
   }
   stage(&#39;maven build &amp;&amp; deploy &#39;) {
   }
   stage(&quot;publish k8s&quot;) {
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ol><li>\u62C9\u4EE3\u7801</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  stage(&#39;\u83B7\u53D6\u4EE3\u7801&#39;) {
       checkout([$class: &#39;GitSCM&#39;, branches: [[name: &#39;\${branch}&#39;]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: &#39;\u51ED\u636EID&#39;, url: &#39;GIT\u5730\u5740&#39;]]])
   }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="2"><li>\u6784\u5EFA\u5E76\u63A8\u9001\u955C\u50CF</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  stage(&#39;maven build &amp;&amp; deploy &#39;) {      
      sh &quot;   &#39;\${mvnHome}/bin/mvn&#39;  clean  package  install -Dmaven.test.skip  -Pdev -U&quot;
      sh &quot; cd mydemo-service &amp;&amp;  &#39;\${mvnHome}/bin/mvn&#39;  clean  package  docker:build -DpushImage   -Dmaven.test.skip  -Pdev&quot;
   }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u4F9D\u8D56\u63D2\u4EF6<code>docker-maven-plugin</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> &lt;plugin&gt;
    &lt;groupId&gt;com.spotify&lt;/groupId&gt;
    &lt;artifactId&gt;docker-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;0.4.11&lt;/version&gt;
    &lt;configuration&gt;
        &lt;imageName&gt;127.0.0.1/\${project.artifactId}-\${profile-name}&lt;/imageName&gt;
        &lt;imageTags&gt;\${project.version}-\${timestamp}&lt;/imageTags&gt;
        &lt;dockerDirectory&gt;src/main/docker&lt;/dockerDirectory&gt;
        &lt;serverId&gt;docker-image&lt;/serverId&gt;
        &lt;useConfigFile&gt;true&lt;/useConfigFile&gt;
        &lt;resources&gt;
            &lt;resource&gt;
                &lt;targetPath&gt;/&lt;/targetPath&gt;
                &lt;directory&gt;\${project.build.directory}&lt;/directory&gt;
                &lt;include&gt;\${project.build.finalName}.jar&lt;/include&gt;
            &lt;/resource&gt;
        &lt;/resources&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ol start="3"><li>k8s\u90E8\u7F72</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>   sh  &quot;cd mydemo-service &amp;&amp; kubectl  -s http://127.0.0.1:8888 apply  -f  target/classes/deploy.yaml -f target/classes/svc.yaml&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_4-k8s" tabindex="-1"><a class="header-anchor" href="#_4-k8s" aria-hidden="true">#</a> 4. k8s</h3><p>\u5728k8s\u4E2D\u6307\u5B9A\u7684\u547D\u540D\u7A7A\u95F4\u5373\u53EF\u627E\u5230\u5BF9\u5E94\u670D\u52A1.</p>`,27);function r(l,t){return a}var p=n(s,[["render",r],["__file","gitlab_jenkins_docker\u5B9E\u8DF5.html.vue"]]);export{p as default};
