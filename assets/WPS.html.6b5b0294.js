import{_ as n,a as s}from"./app.6a98a4dc.js";const e={},a=s(`<h2 id="poi\u5BFC\u51FA\u5230\u6A21\u677F" tabindex="-1"><a class="header-anchor" href="#poi\u5BFC\u51FA\u5230\u6A21\u677F" aria-hidden="true">#</a> POI\u5BFC\u51FA\u5230\u6A21\u677F</h2><h3 id="\u9700\u6C42" tabindex="-1"><a class="header-anchor" href="#\u9700\u6C42" aria-hidden="true">#</a> \u9700\u6C42</h3><p>\u6700\u8FD1\u8FDE\u7EED\u4E24\u4E2A\u9700\u6C42\u90FD\u662F:\u5BFC\u51FA\u7684Excel\u80FD\u76F4\u63A5\u518D\u5BFC\u5165\u5230\u7CFB\u7EDF\u4E2D,\u800C\u5BFC\u5165\u529F\u80FD\u4F9D\u8D56\u4E8E\u5BFC\u5165\u6A21\u677F\uFF0C\u4ECA\u5929\u5199\u4E86\u4E00\u4E2A\u901A\u7528\u7684\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u5148\u8BFB\u53D6\u7CFB\u7EDF\u672C\u5730\u7684\u5BFC\u5165\u6A21\u677F\uFF0C\u518D\u5199\u5165\u6570\u636E\u751F\u6210\u4E00\u4E2A\u6587\u4EF6\u4F9B\u7528\u6237\u4E0B\u8F7D\u3002</p><blockquote><p>\u9996\u5148\u6DFB\u52A0\u4E00\u6761\u5BFC\u5165\u5BFC\u51FA\u4EFB\u52A1\uFF0C\u4FDD\u5B58\u5BFC\u51FA\u751F\u6210\u7684\u6587\u4EF6\u7684\u670D\u52A1\u5668\u5730\u5740\u548C\u8BE5\u4EFB\u52A1\u7684\u5176\u5B83\u4FE1\u606F\uFF0C\u5728\u6587\u4EF6\u751F\u6210\u5B8C\u6210\u540E\uFF0C\u5C06\u8BE5\u4EFB\u52A1\u8BB0\u5F55\u8BBE\u7F6E\u4E3A\u5DF2\u5B8C\u6210\uFF0C\u7528\u6237\u6839\u636E\u8BE5\u4EFB\u52A1\u8BB0\u5F55\u7684\u6587\u4EF6\u4FE1\u606F\u4E0B\u8F7D\u5373\u53EF\uFF0C\u8FD9\u6837\u53EF\u4EE5\u4F18\u5316\u6587\u4EF6\u751F\u6210\u8FC7\u6162\u7684\u5F0A\u7AEF</p></blockquote><h3 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u5BFC\u5165\u6A21\u677F\u7684\u7B2C\u4E00\u884C\u4F5C\u4E3A\u6570\u636E\u6807\u8BC6\uFF0C\u53EF\u4EE5\u901A\u8FC7\u53CD\u5C04\u6765\u5230\u5BF9\u5E94\u7684\u4F4D\u7F6E\u586B\u5199\u6570\u636E\u3002\u4E0D\u540C\u7684sheet\u9875\u5199\u5165\u7684\u6570\u636E\u53EF\u80FD\u4E0D\u4E00\u6837\uFF0C\u6240\u4EE5\u8003\u8651\u7528Map\u4F5C\u4E3A\u6570\u636E\u5BB9\u5668\uFF0C</p><blockquote><p>Map&lt;Integer, List&gt; map</p></blockquote><p>\u5176\u4E2DInteger\u4E0D\u4EC5\u4F5C\u4E3Akey\uFF0C\u800C\u4E14\u76F4\u63A5\u5C31\u80FD\u7528\u6765\u8868\u793A\u8FD9\u4E2Alist\u9700\u8981\u586B\u5165\u7684sheet[index]</p><h3 id="\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801" aria-hidden="true">#</a> \u4EE3\u7801</h3><p>\u4E0B\u9762\u7528\u7684\u662FPOI\u7684XSSFWorkbook\u7528\u6765\u8BFB\u53D6\u751F\u6210xlsx\u6587\u4EF6\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        &lt;!-- https://mvnrepository.com/artifact/org.apache.poi/poi --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.poi&lt;/groupId&gt;
            &lt;artifactId&gt;poi&lt;/artifactId&gt;
            &lt;version&gt;4.0.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!-- https://mvnrepository.com/artifact/org.apache.poi/poi-ooxml --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.poi&lt;/groupId&gt;
            &lt;artifactId&gt;poi-ooxml&lt;/artifactId&gt;
            &lt;version&gt;4.0.0&lt;/version&gt;
        &lt;/dependency&gt;
package com.demo.utils;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ExportExcelUseTemplate&lt;T&gt; implements Serializable {

    private String tempPath;

    private String tempName;

    private String fileName;

    private String filePath;

    private Map&lt;Integer, List&lt;T&gt;&gt; map;

    private XSSFWorkbook wb;
    
    private ExportExcelUseTemplate(){}
    
    public ExportExcelUseTemplate(String tempPath,String tempName,
        String filePath,String fileName,Map&lt;Integer,List&lt;T&gt;&gt; map){
        this.tempPath = tempPath;
        this.tempName = tempName;
        this.filePath = filePath;
        this.fileName = fileName;
        this.map = map;
    }
    
    protected void export(){
        readTemplate();
        writeData();
        createFile();
    }
    protected void readTemplate(){
        try{
            FileInputStream fileInputStream = new FileInputStream(this.tempPath+this.tempName);
            this.wb = new XSSFWorkbook(fileInputStream);
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    protected void writeData(){
        for(Integer index:map.keySet()){
            if(map.get(index).isEmpty()){
                continue;
            }
            XSSFSheet sheet = wb.getSheetAt(index-1);//\u7B2Cindex-1\u4E2Asheet
            XSSFRow row = sheet.getRow(0);
            List&lt;T&gt; list = map.get(index);
            sheet.shiftRows(3,3+list.size(),list.size());//\u4ECE\u7B2C\u4E09\u884C\u5F00\u59CB,\u7ED3\u675F\u4E0Esize+3,\u52A8\u6001\u6DFB\u52A0size\u884C
            for(int i =0 ;i&lt; list.size();i++){//\u904D\u5386\u6570\u636E
                XSSFRow createRow = sheet.createRow(3+i);
                for(int j=0;j&lt;row.getLastCellNum();j++){//\u904D\u5386key\u518D\u901A\u8FC7\u53CD\u5C04\u5199\u5165\u6570\u636E(\u5BFC\u5165\u6A21\u677F\u7684\u7B2C\u4E00\u884C\u4F5C\u4E3A\u6570\u636E\u6807\u8BC6)
                    try {
                        String key = row.getCell(j).getStringCellValue();
                        String value = getMethod(list.get(i),key);//\u6839\u636Ekey\u627E\u5230\u5BF9\u8C61\u4E2D\u5BF9\u5E94\u7684\u503C
                        createRow.createCell(j).setCellValue(value);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
    private void createFile(){
        try{
            File dir = new File(this.filePath);
            if(!dir.exists()){
                dir.mkdir();
            }
            FileOutputStream fileOutputStream = new FileOutputStream(this.filePath+this.fileName);
            this.wb.write(fileOutputStream);
            fileOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private String getMethod(T t, String key) throws Exception{
        Class&lt;?&gt; clazz = t.getClass();
        PropertyDescriptor pd = new PropertyDescriptor(key,clazz);
        Method getMethod = pd.getReadMethod();
        Object o = getMethod.invoke(t);
        if(o instanceof Date){
            SimpleDateFormat sd = new SimpleDateFormat(&quot;yyyy-MM-dd&quot;);
            return o==null? &quot;&quot; : sd.format(o);
        }
        return  o==null? &quot;&quot;:o.toString();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br></div></div>`,11);function r(p,l){return a}var i=n(e,[["render",r],["__file","WPS.html.vue"]]);export{i as default};
