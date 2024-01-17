## 基础

### stream
流分为串行流stream()和并行流parallelStream(),流的核心在于操作符的使用
### 中间操作符
map:传入Function的函数是接口实例,功能是将类型T转为R 
mapToInt:返回的是IntStream流,限定了返回值为Int 
flatmap:将流中的每个值都转换成另一个流,最后连接所有的流 
limit(n):获取n个元素 
distinct():依据equals和hashcode去重 
filter: 过滤 
peek:  如果想打印流经的每个元素的状态（日志或 debug），这时应该用 peek()
skip(n):跳过n个元素,配合limit可实现分页 
sorted:排序

## 示例
### 多个list排列组合
[1,2],[3]---> [1,3],[2,3]

```java
    @Test
    @SneakyThrows
    public void a222 (){
        List<String> colorList = Arrays.asList("红色", "黑色", "金色");
        List<String> sizeList = Arrays.asList("32G", "64G");
        List<String> placeList = Arrays.asList("国产", "进口");

        List<String> descartesList = descartes(colorList, sizeList, placeList);
        descartesList.forEach(System.out::println);
    }
    public static List<String> descartes(List<String>... lists) {
        List<String> tempList = new ArrayList<>();
        for (List<String> list : lists) {
            if (tempList.isEmpty()) {
                tempList = list;
            } else {
                tempList = tempList.stream().flatMap(item -> list.stream().map(item2 -> item + "," + item2)).collect(Collectors.toList());
            }
        }
        return tempList;
    }
```

### list分组
```java
Map<String,String> map1 = Maps.newHashMap();
map1.put("id","1");
map1.put("grade","80");
Map<String,String> map2= Maps.newHashMap();
map2.put("id","1");
map2.put("grade","90");
List<Map<String,String>> list = Lists.newArrayList(map1,map2);
Map<String, List<Map<String, String>>> groupList = list.stream().
                collect(Collectors.groupingBy(e -> e.get("id")));
```

### List Map根据key去重
```java
        ArrayList<Map<String, String>> data = list.stream().collect(
                Collectors.collectingAndThen(Collectors.toCollection(
                        () -> new TreeSet<>(Comparator.comparing(m -> m.get("key")))), ArrayList::new));
```
### List 取交集/差集
```java
	// list1 中有  list2 中没有
	list1.stream()
                .filter(item -> !list2.stream().map(e -> e.get("name"))
                        .collect(Collectors.toList()).contains(item.get("name"))).collect(Collectors.toList());

	// 交集
	list1.stream()
                .filter(item -> list2.stream().map(e -> e.get("name"))
                        .collect(Collectors.toList()).contains(item.get("name"))).collect(Collectors.toList());

	// list2 中有  list1 中没有
	list2.stream()
                .filter(item -> !list1.stream().map(e -> e.get("name"))
                        .collect(Collectors.toList()).contains(item.get("name"))).collect(Collectors.toList());
```
### 简单取max/min等操作
```java
    @Test
    @SneakyThrows
    public void a999() {
        List<String> stringList = Arrays.asList("1,2", "2,1", "cc,c", "d,d,d", "eee");
        List<String> numList = Arrays.asList("1,2", "3,4");
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, -2);
        List<BigDecimal> list2 = Arrays.asList(new BigDecimal(-1), new BigDecimal(2));
        // 将1,2 3,4按逗号分割,再求和:10
        int zbSl = numList.stream().flatMap(s -> Arrays.stream(s.split(",")))
                .mapToInt(s -> (s == null || s == "") ? 0 : Integer.parseInt(s)).sum();
        System.out.println(zbSl);
        //1,2,3,4,-2中大于2的集合:[3,4]
        List<Integer> list = list1.stream().filter(num -> num > 2).collect(Collectors.toList());
        System.out.println(list);
        //1,2,3,4,-2中的最小值
        System.out.println(list1.stream().min(Integer::compare).get());
        //-1,2中的最小值
        System.out.println(list2.stream().min(BigDecimal::compareTo).get());
        //对1,2,3,4,-2 每个数进行平方操作
        List<Integer> res = list1.stream().map(i -> i * i).distinct().collect(Collectors.toList());
        System.out.println(res);
    }
```
### ListMap key转小写

List< Map<String,Object>>中所有key转为小写

```java
    
    List< Map<String,Object>> mapList = new ArrayList<>();
    Map<String,Object> map = new HashMap<>();
    map.put("NOW",new Timestamp(System.currentTimeMillis()));
    mapList.add(map);
    mapList.stream().flatMap(m->{
        Map<String,Object> map1 = new HashMap<>();
        m.forEach((k,v)->{
            map1.put(k.toLowerCase(),v);
        });
        return Stream.of(map1);
    }).collect(Collectors.toList()).get(0).forEach((k,v)->{
        System.out.println(k+v);
    });
```
