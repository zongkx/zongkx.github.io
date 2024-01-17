## 集合

> [http://ifeve.com/google-guava-collectionutilities/](http://ifeve.com/google-guava-collectionutilities/)

### List

```
List<String> theseElements = Lists.newArrayList("alpha", "beta", "gamma");
```

### Map

```
    @Test
    @SneakyThrows
    public void mapTest (){
        Map<String,String> map = Maps.newHashMap();

        //salary/salary1不可变map,调用put方法会抛异常 UnsupportedOperationException
        Map<String, Integer> salary = ImmutableMap.<String, Integer> builder()
                .put("John", 1000)
                .put("Jane", 1500)
                .put("Adam", 2000)
                .put("Tom", 2000)
                .build();
        Map<String, Integer> salary1 = ImmutableMap.of("John",1000,"Jane",1500);

        //三列
        Table<String,String,Integer> distance = HashBasedTable.create();
        distance.put("London", "Paris", 340);
        distance.put("New York", "Los Angeles", 3940);
        distance.put("London", "New York", 5576);
        System.out.println(distance.row("London"));// {Paris=340, New York=5576}

        //一键多值
        Multimap<Integer, String> keyValues = ArrayListMultimap.create();
        keyValues.put(1, "a");
        keyValues.put(1, "b");
        keyValues.put(2, "c");
        System.out.println(keyValues.toString());// {1=[a, b], 2=[c]}
    }
```

### Set

```
    @Test
    @SneakyThrows
    public void setTest (){
        HashSet<Integer> setA = Sets.newHashSet(1, 2, 3, 4, 5);
        HashSet<Integer> setB = Sets.newHashSet(4, 5, 6, 7, 8);

        Sets.SetView<Integer> union = Sets.union(setA, setB);//合集
        System.out.println(union);//[1, 2, 3, 4, 5, 8, 6, 7]

        Sets.SetView<Integer> difference = Sets.difference(setA, setB);//差集
        System.out.println(difference);//[1, 2, 3]

        Sets.SetView<Integer> intersection = Sets.intersection(setA, setB);//交集
        System.out.println(intersection);//[4, 5]
    }
```
