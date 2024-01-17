# js数组操作

## 数组

1. 查找

```javascript
var array = [{xlh:1},{xlh:2}];
var index = array.findIndex(item=>{
    return item.xlh == "1";
});//index:0
```

2. 遍历

数组遍历一般用for循环即可,对于in的用法一般用于普通对象(数组是一种特殊的对象)

```javascript
var o1 = {x:1,y:2,z:3}
for(var k in o1){
    alert(o1[k]);//k取得是属性名 o1.k将为undefined:用.来取值必须是确定的属性名
}
```

3. 截取/删除

```javascript
//slice :截取某个区间的元素,返回这些元素
var array = [{xlh:1},{xlh:2},{xlh:3}];
var a2 = array.slice(0,2);//截取下标0到下标2个(不包含array[2])中的元素
//pop :删除最后一个元素,返回该元素
//shift :删除第一个元素,返回该元素

//splice: 删除某个区间的元素,返回这些元素
var a2 = array.splice(0,2);//删除下标0到下标2个(不包含array[2])
```

4. 追加/拼接

```javascript
//push :添加到最后,返回添加的元素
//unshift :添加到最前面,返回添加的元素
//concat :拼接到前面的数组之后,返回新的数组(a1,a2均没有被改变)
var a1 = [{xlh:1},{xlh:2},{xlh:3}];
var a2  = [{xlh:4}];
console.log(a1.concat(a2))
```

5. 排序

```javascript
var a1 = [{xlh:1},{xlh:2},{xlh:3}];
a1.sort((a,b) => {
	return a.xlh > b.xlh ? -1:1;
})//按降序排:3,2,1
```

6. 集合

```javascript
var arr1 = [1,2,3];
var arr2 = [1,2,4,5];
var diff = arr1.filter(function(val){return arr2.indexOf(val)> -1})//取交集
console.log(diff) // 1,2
var diff2= arr2.filter(function(val){return arr1.indexOf(val) === -1})//取差集
console.log(diff2) // 4,5
```

## 对象

1. 深拷贝

```javascript
	//通过json拷贝
	var copy = JSON.parse(JSON.stringify(obj));
	//  JS对象深拷贝
	function copy(obj){
		var str,newObj = obj.constructor === Array?[]:{};
		if(typeof obj!== 'object'){
			return;
		}else{
			for(var i in obj){
				if(typeof obj[i] === 'object'){
					newObj[i]= copy(obj[i]);
				}else{
					newObj[i]=obj[i];
				}
			}
		}
		return newObj;
	}
```

## 定时器和延时器

```javascript
	var timer = setInterval(function () {
		alert(1);
	},1000)
	setTimeout(function () {
		if(timer){
			clearInterval(timer)
		}
	},2000)
```

# js客户端文件操作

## 文本文件

```javascript
	//JS 读取TXT文件内容
	function showFile(){
		var myFile = $("#myFile").val();
		var file = document.getElementById("myFile").files[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload= function (e){
			console.log(this.result);
		}
	}
```

## Excel

```javascript
	// 依赖xlsx.full.min.js 
	// 文件上传监听
	document.getElementById('file').addEventListener('change', function(e) { 
		var files = e.target.files;
		if(files.length == 0) return;
		var f = files[0];
		if(!/^.*\.(?:xls|xlsx)$/i.test(f.name)) { //文件格式校验失败
			alert("仅支持读取xlsx或xls格式");
			return;
		}
		readWorkbookFromLocalFile(f, function(workbook) {
			var sheetNames = workbook.SheetNames;
			var worksheet = workbook.Sheets[sheetNames[0]];
			array = XLSX.utils.sheet_to_json(worksheet);
	});
	// 读取本地 excel文件
	function readWorkbookFromLocalFile(file, callback) {
		const reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {type: 'binary',dateNF:'yyyy-MM-dd'});
			if(callback) callback(workbook);
		};
		reader.readAsBinaryString(file);
	}
```

## Word

```javascript
	//依赖 mammoth.browser.js
	// 文件上传监听
	$(function(){
		document.getElementById("file")
				.addEventListener("change", handleFileSelect, false);
	});
	function handleFileSelect(event) {
		readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
			mammoth.convertToHtml({arrayBuffer: arrayBuffer})
					.then(displayResult)
					.done();
		});
	}
	function readFileInputEventAsArrayBuffer(event, callback) {
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function(loadEvent) {
			var arrayBuffer = loadEvent.target.result;
			callback(arrayBuffer);
		};
		reader.readAsArrayBuffer(file);
	}
	function displayResult(result) {
		//result对象:包含value字符串和message数组
		console.log(result)
		//根据value来针对处理word中需要处理的数据
	}
```
