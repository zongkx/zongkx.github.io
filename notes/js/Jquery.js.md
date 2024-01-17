
## 常用的选择器

### 纵向获取元素

```javascript
$(obj).find("input:nth-child(1)").val();//第1个子元素
$(obj).find("input:nth-child(2)").val();//第2个子元素

$(obj).find("input:first").val();//第1个子元素
$(obj).find("input:last").val();//最后1个子元素

$(obj).find("tr").eq(0).val();//第1个子元素
$(obj).find("tr").eq(1).val();//第2个子元素
```

### 横向获取元素

```javascript
//siblings获取除自己以外的同级元素
$(obj).siblings().eq(0).val("");//同级元素的第一个
$(obj).siblings().eq(1).val("");//同级元素的第二个
$(obj).siblings().eq(-1).val("");//同级元素的最后一个
```

### 属性选择

```javascript
$("#select option[value='"+str+"']");//根据option:value选择select中的某个option
$("#select option:selected");//获取已选中的select:option值	

$("td input[type='text']");
```

### 多条件选择

```javascript
$("table").find("td input[type='text'],td select,td textarea");
```
