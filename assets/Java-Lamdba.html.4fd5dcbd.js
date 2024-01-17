import{_ as n,a as s}from"./app.6a98a4dc.js";const e={},a=s(`<p><strong>\u628A\u4E00\u6BB5\u4EE3\u7801\u8D4B\u503C\u7ED9\u4E00\u4E2A\u53D8\u91CF</strong>. \u6BD4\u5982 code = public void doSomething(String s){sout;} \u5176\u4E2D public \u548C \u65B9\u6CD5\u540D\u90FD\u662F\u591A\u4F59\u7684,\u5BF9\u4E8Evoid\u6765\u8BF4\u7F16\u8BD1\u5668\u53EF\u4EE5\u81EA\u884C\u5224\u65AD\u8FD4\u56DE\u503C\u7C7B\u578B,\u540C\u6837\u7684\u5BF9\u4E8E\u53C2\u6570s\u4E5F\u53EF\u4EE5\u81EA\u884C\u5224\u65AD \u5BF9\u4E8E\u82B1\u62EC\u53F7\u91CC\u9762\u7684\u5185\u5BB9\u6765\u8BF4,\u5982\u679C\u53EA\u6709\u4E00\u884C\u4EE3\u7801\u53EF\u4EE5\u7528 -&gt;\u4EE3\u66FF{}</p><p>code = (s)-&gt;sout(s); \u5BF9\u4E8E \u8FD9\u5757\u4EE3\u7801 \u5C31\u662Flambda\u8868\u8FBE\u5F0F ,\u800C\u5BF9\u4E8Ecode\u800C\u8A00\u5C31\u53EF\u4EE5\u7406\u89E3\u4E3Alambda\u7C7B\u578B\u7684\u53D8\u91CF,\u5728Java8\u4E2D\u6240\u6709lambda\u7C7B\u578B\u90FD\u662F\u4E00\u4E2A\u63A5\u53E3,\u800Clambda\u8868\u8FBE\u5F0F\u5C31\u662F\u63A5\u53E3\u7684\u5B9E\u73B0 \u800C\u8FD9\u4E2A\u63A5\u53E3\u53EA\u6709\u4E00\u4E2A\u63A5\u53E3\u51FD\u6570,\u79F0\u4E3A\u51FD\u6570\u5F0F\u63A5\u53E3</p><p>\u6BD4\u5982\u81EA\u5B9A\u4E49\u63A5\u53E3:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@FunctionalInterface//\u6807\u8BC6\u53EA\u80FD\u6709\u4E00\u4E2A\u63A5\u53E3\u65B9\u6CD5
public interface MyFunctionInterface {
    void doSomething(String s);
}
@Test
public void lambda(){
    MyFunctionInterface myFunctionInterface = s -&gt; {
        System.out.println(&quot;123&quot;+s);
    };
    myFunctionInterface.doSomething(&quot;4&quot;);//1234
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>//\u53EF\u4EE5\u770B\u5230\u5229\u7528lambda\u8868\u8FBE\u5F0F\u7B80\u5316\u4E86\u63A5\u53E3\u7684\u5B9E\u73B0\u6240\u9700\u8981\u7684\u4EE3\u7801(\u4E0D\u9700\u8981\u65B0\u589E\u7C7B\u6765\u5B9E\u73B0\u63A5\u53E3\u4E2D\u7684\u65B9\u6CD5)</p><ul><li>\u6210\u5458\u51FD\u6570\u548Clambda\u8868\u8FBE\u5F0F</li></ul><blockquote><p>//String::length \u628AString\u8F6C\u4E3A\u5176\u957F\u5EA6 \u53EF\u4EE5\u66F4\u6362\u4E3Ae-&gt;e.length()</p><p>// e-&gt;System.out.println(e) == System.out::println</p></blockquote><ul><li>\u5E38\u7528\u7684\u51E0\u4E2Ajdk\u5185\u7F6E@FunctionalInterface\u63A5\u53E3</li></ul><blockquote><p>public interface Consumer</p><p>public interface Predicate</p><p>public interface BiConsumer&lt;T, U&gt;</p><p>public interface Function&lt;T, R&gt;</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Test
public void lambda(){
	Consumer&lt;String&gt; consumer = s -&gt; {//\u4E0D\u5E26\u8FD4\u56DE\u503C void
        System.out.println(s);
        System.out.println(111);
    };
    consumer.accept(&quot;s&quot;);
	
    Predicate&lt;String&gt; predicate = s -&gt; {//\u5E26\u8FD4\u56DE\u503C boolean
        System.out.println(111);
        System.out.println(s);
        return false;
    };
    boolean a = predicate.test(&quot;a&quot;);
    
	BiConsumer&lt;String ,Integer&gt; biConsumer = (k,v)-&gt;{//\u65E0\u8FD4\u56DE\u503C \u4E24\u4E2A\u5165\u53C2
        System.out.println(k+&quot;&quot;+v);
    };
    biConsumer.accept(&quot;num&quot;,1);
    
   //\u5C06P\u5F00\u5934\u7684Person\u6253\u5370\u51FA\u6765
   List&lt;Person&gt; personList = Arrays.asList(new Person(&quot;Paul&quot;),new Person(&quot;Job&quot;));
   test1(person -&gt; System.out.println(person.getName()),person -&gt; person.getName().startsWith(&quot;P&quot;),personList);
   personList.stream().filter(person -&gt; person.getName().startsWith(&quot;P&quot;)).forEach(person -&gt; System.out.println(person.getName()));    
}
    public static void test1(Consumer&lt;Person&gt; consumer,Predicate&lt;Person&gt; predicate,List&lt;Person&gt; list){
        list.forEach(person -&gt; {
            if (predicate.test(person)){
                consumer.accept(person);
            }
        });
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div>`,10);function t(r,l){return a}var i=n(e,[["render",t],["__file","Java-Lamdba.html.vue"]]);export{i as default};
