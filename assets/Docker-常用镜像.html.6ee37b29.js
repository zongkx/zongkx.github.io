import{_ as n,a}from"./app.6a98a4dc.js";const s={},e=a(`<h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h2><blockquote><p>docker pull mysql docker run -itd {image_id} --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456a mysql</p></blockquote><h2 id="pg" tabindex="-1"><a class="header-anchor" href="#pg" aria-hidden="true">#</a> pg</h2><blockquote><p>docker pull postgres</p><p>docker run --name pgdata -p 5432:5432 -e POSTGRES_PASSWORD=123456a -v /pgdata:/var/lib/postgresql/data -d postgres</p></blockquote><h2 id="kafka" tabindex="-1"><a class="header-anchor" href="#kafka" aria-hidden="true">#</a> kafka</h2><blockquote><p>docker run --name kafka01 <br> -p 9092:9092 <br> -e KAFKA_BROKER_ID=0 <br> -e KAFKA_ZOOKEEPER_CONNECT=39.97.243.43:2181 <br> -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://39.97.243.43:9092 <br> -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 <br> -d wurstmeister/kafka</p></blockquote><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;2&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
<span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> wurstmeister/zookeeper
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">&quot;2181:2181&quot;</span>

<span class="token key atrule">kafka</span><span class="token punctuation">:</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> wurstmeister/kafka
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">&quot;9092:9092&quot;</span>
<span class="token key atrule">environment</span><span class="token punctuation">:</span>
<span class="token key atrule">KAFKA_ADVERTISED_HOST_NAME</span><span class="token punctuation">:</span> 192.168.203.128
<span class="token key atrule">KAFKA_MESSAGE_MAX_BYTES</span><span class="token punctuation">:</span> <span class="token number">2000000</span>
<span class="token key atrule">KAFKA_CREATE_TOPICS</span><span class="token punctuation">:</span> <span class="token string">&quot;Topic1:1:3,Topic2:1:1:compact&quot;</span>
<span class="token key atrule">KAFKA_ZOOKEEPER_CONNECT</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">2181</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> ./kafka<span class="token punctuation">-</span>logs<span class="token punctuation">:</span>/kafka
<span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock

<span class="token key atrule">kafka-manager</span><span class="token punctuation">:</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> sheepkiller/kafka<span class="token punctuation">-</span>manager
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> 9020<span class="token punctuation">:</span><span class="token number">9000</span>
<span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">ZK_HOSTS</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">2181</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="mongo" tabindex="-1"><a class="header-anchor" href="#mongo" aria-hidden="true">#</a> mongo</h2><blockquote><p>docker run -d -p 27017:27017 --name mongodb1 -e MONGO_INITDB_ROOT_USERNAME=test -e MONGO_INITDB_ROOT_PASSWORD=123456789 -v $PWD/db:/data/db mongo</p></blockquote><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3>`,10);function p(t,l){return e}var c=n(s,[["render",p],["__file","Docker-\u5E38\u7528\u955C\u50CF.html.vue"]]);export{c as default};
