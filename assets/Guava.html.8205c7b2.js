import{_ as n,a as e}from"./app.6a98a4dc.js";const s={},a=e(`<h2 id="\u96C6\u5408" tabindex="-1"><a class="header-anchor" href="#\u96C6\u5408" aria-hidden="true">#</a> \u96C6\u5408</h2><blockquote><p><a href="http://ifeve.com/google-guava-collectionutilities/" target="_blank" rel="noopener noreferrer">http://ifeve.com/google-guava-collectionutilities/</a></p></blockquote><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>List&lt;String&gt; theseElements = Lists.newArrayList(&quot;alpha&quot;, &quot;beta&quot;, &quot;gamma&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Test
    @SneakyThrows
    public void mapTest (){
        Map&lt;String,String&gt; map = Maps.newHashMap();

        //salary/salary1\u4E0D\u53EF\u53D8map,\u8C03\u7528put\u65B9\u6CD5\u4F1A\u629B\u5F02\u5E38 UnsupportedOperationException
        Map&lt;String, Integer&gt; salary = ImmutableMap.&lt;String, Integer&gt; builder()
                .put(&quot;John&quot;, 1000)
                .put(&quot;Jane&quot;, 1500)
                .put(&quot;Adam&quot;, 2000)
                .put(&quot;Tom&quot;, 2000)
                .build();
        Map&lt;String, Integer&gt; salary1 = ImmutableMap.of(&quot;John&quot;,1000,&quot;Jane&quot;,1500);

        //\u4E09\u5217
        Table&lt;String,String,Integer&gt; distance = HashBasedTable.create();
        distance.put(&quot;London&quot;, &quot;Paris&quot;, 340);
        distance.put(&quot;New York&quot;, &quot;Los Angeles&quot;, 3940);
        distance.put(&quot;London&quot;, &quot;New York&quot;, 5576);
        System.out.println(distance.row(&quot;London&quot;));// {Paris=340, New York=5576}

        //\u4E00\u952E\u591A\u503C
        Multimap&lt;Integer, String&gt; keyValues = ArrayListMultimap.create();
        keyValues.put(1, &quot;a&quot;);
        keyValues.put(1, &quot;b&quot;);
        keyValues.put(2, &quot;c&quot;);
        System.out.println(keyValues.toString());// {1=[a, b], 2=[c]}
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Test
    @SneakyThrows
    public void setTest (){
        HashSet&lt;Integer&gt; setA = Sets.newHashSet(1, 2, 3, 4, 5);
        HashSet&lt;Integer&gt; setB = Sets.newHashSet(4, 5, 6, 7, 8);

        Sets.SetView&lt;Integer&gt; union = Sets.union(setA, setB);//\u5408\u96C6
        System.out.println(union);//[1, 2, 3, 4, 5, 8, 6, 7]

        Sets.SetView&lt;Integer&gt; difference = Sets.difference(setA, setB);//\u5DEE\u96C6
        System.out.println(difference);//[1, 2, 3]

        Sets.SetView&lt;Integer&gt; intersection = Sets.intersection(setA, setB);//\u4EA4\u96C6
        System.out.println(intersection);//[4, 5]
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>`,8);function t(r,l){return a}var u=n(s,[["render",t],["__file","Guava.html.vue"]]);export{u as default};
