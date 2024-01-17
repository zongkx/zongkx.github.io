## == 和 equals

### 结论:

“==”操作符用于比较两个引用（内存中的存放地址）是否相等，它们是否是同一个对象。

.equals() 用于比较两个对象的内容是否相等。

### 分析

Object类中实现的.equals()方法如下:

```
public boolean equals(Object obj) {
    return (this == obj);
}
```

默认使用==来比较,假如子类没有重写该方法,则两者用法一致:比较两个对象的内存地址或者对象的引用是否相等.
实际上,比较内存地址太重,不一定符合使用场景,如String中重写了该方法:

```
public boolean equals(Object anObject) {
    if (this == anObject) {//==直接返回true
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {//比较长度
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {//逐个比较字符
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

String的初始化常有直接赋值和 new String();前者是在字符串常量区中创建对象,并将对象的引用赋值;后者在堆中创建对象,并将其引用赋值.

特别的,对于Integer而言,当其范围在 -128到127之间的值,由于会在IntegerCache.cache产生,会复用已有的对象,所以用或者equals均为true,范围之外的值用会返回false

### 用法:

1.) 使用Objects.equals(Object o1,Object o2);
可以最大程度上避免NPE,不需要手动判空,如果使用 .equals(),尽量将已知字符串放在前面.

```
public static boolean equals(Object a, Object b) {// a,b均可以为空而不NPE,  null==null 为true
    return (a == b) || (a != null && a.equals(b));//任一为真则真
}
```

## Map

Map键值对，每个键对应的值都是唯一的，而HashMap是Map的一种，称为散列表。除了Map，Set作为数学意义上的集合，与Map密切相关。集合的特性：无序、互异、确定，而Map的key就符合集合的要求，所以Set内部实现利用了Map。在HashSet中就定义了HashMap作为成员变量，set中的元素被作为key，而value作为无意义的值。

### HashMap

HashMap在Java中的底层实现是数组和链表实现的 通过key的hashcode值找到数组上的某个位置， 然后通过key的equals方法找到链表中key对应的value

#### put

在往hashmap里面put元素的时候，先根据key的hash值得到这个元素在数组中的位置，然后把这个元素放到对应位置，如果这个位置已经有元素，那么新元素将会以链表的形式放入，新加入的在链头。如果没有元素,那么新增一个Entry(链表)在这里,在每次addEntry的时候都会判断是否需要扩容。如果key为空，则put一个空值进去。

> HashMap允许 : map.put(null,null);map.put("",null);


#### get

根据key的hash值找到数组中的位置，再根据key的equals方法找到链表中的元素，由此可以得知当数组中每个位置都只放了一个元素的时候，效率是最高的（省去了key的equals）

#### hash算法

为了让数组更均匀一些，首先可以想到用hashcode对数组长度取模运算，但是过于消耗性能。Java在这里用的是按位与（length-1）：h & （length-1）h是hashcode值

- 为什么数组长度为2的整次幂的时候，性能最好？

#### 负载因子

默认的负载因子是0.75，默认容量是16.当当前数据超过容量*负载因子时需要对原数组进行扩容（2倍），扩容需要rehash和数据复制，比较消耗性能，所以尽量预估map的容量，避免出现扩容的情况。

#### JDK1.8的优化

尽管通过hash算法减少了哈希冲突的可能，但是在某些情况下还是会导致查询效率低下的问题（需要遍历链表），所以jdk1.8引入了红黑树来优化查询效率。 在触发阈值的情况下，链表将被转化为红黑树，

##### put

1.判断当前桶是否空，空的话初始化。 2.根据key的hash值定位到具体的桶，为空则表面没有哈希冲突，则直接创建一个桶；有的话先比较key的hash值是否与已有的key的hash值相等，如果相等赋值给e，在第6步的时候统一返回 3.如果当前桶是红黑树的话，则按照红黑树的写入方式写入数据；如果为链表的话，则封装节点到链表末端 4.判断当前链表大小是否触发阈值，大于时转换为红黑树 5.如果在遍历的过程中找到key相同时直接退出遍历 6.如果e！=null则相当于存在相同的key，需要覆盖值 7.判断是否需要扩容

##### get

根据key的hash值定位桶，桶为空返回null，否则判断桶的第一个位置是否为所取key，是的话直接返回，不是的话在判断该桶是红黑树还是链表，再去二叉树查找或遍历链表找到key对应的值返回。

#### 遍历

```
        Iterator<Map.Entry<String, Integer>> entryIterator = map.entrySet().iterator();
        while (entryIterator.hasNext()) {
            Map.Entry<String, Integer> next = entryIterator.next();
            System.out.println("key=" + next.getKey() + " value=" + next.getValue());
        }
        
        Iterator<String> iterator = map.keySet().iterator();
        while (iterator.hasNext()){
            String key = iterator.next();
            System.out.println("key=" + key + " value=" + map.get(key));

        }
//JDK1.8也提供了：
        map.forEach((k,v)->{
            
        });
```

推荐用entrySet遍历,这样不需要在循环中再执行 map.get(key)操作,避免浪费性能. 由于HashMap并没有对内部的数据做任何同步操作,所以不适合并发时候使用,专门用于并发:java.util.concurrent 下的ConcurrentHashMap

### ConcurrentHashMap

它也是由数组链表组成，其内部类Segment中的 transient volatile HashEntry<K,V>[] table;和HashMap中的HashEntry一样作为数据存放的桶。且其HashEntry的value以及链表都是volatile修饰的，保证其内部的可见性。

#### put

根据key定位到Segment，在对应的Segment中进行put，其中为了保证并发的原子性，所以put操作添加了锁处理。第一步会尝试获取锁，如果获取失败则通过scanAndLockForPut自旋获取锁，如果到达最大次数仍没有获取锁将会改为阻塞锁获取，保证能获取成功，再put接收后释放锁。其中间的put过程大致和hashmap类似，先根据key的hashcode定位HashEntry，遍历或者创建新的HashEntry。（两次hash定位）

#### get

get操作类似 由于volatile修饰，保证了内存可见性，所以每次获取都是最新的值。其get方法不需要加锁，十分高效。

#### JDK1.8优化

类似HashMap，1.8中用Node替换了HashEntry，同时val和next都加了volatile修饰，保证其可见性。

> 自旋锁和互斥锁：前者在获取锁的时候，如果该锁已经被其它线程获取，那么该线程将会循环等待，然后不断地尝试获取锁。互斥锁用于保护临界区，确保同一时间只有一个线程访问资源。如果互斥量已经上锁，那么调用者将会阻塞。


##### put

对当前的table进行无条件自循环直到put成功 1.hash（key） 2.判断是否需要初始化 3.如果没有hash冲突就直接CAS插入 4.如果还在进行扩容操作就先进行扩容 5.如果存在hash冲突，就加锁来保证线程安全，这里有两种情况，一种是链表形式就直接遍历到尾端插入，一种是红黑树就按照红黑树结构插入(默认阈值为8) 6.成功就统计size,并计算是否需要扩容.

##### get

根据hash值定位，按照红黑树或者链表来检索到value。
## 
## 对象拷贝

list.addAll()是浅拷贝,list的深拷贝本质上是list存储的对象的深拷贝.
由于Java中用对象的作为入口参数的传递则缺省为"引用传递"，也就是说仅仅传递了对象的一个"引用"，这个"引用"的相当于c中的指针。当函数体内部对输入变量改变时，实质上就是在对这个对象的直接操作。除了在函数传值的时候是"引用传递"，在任何用"＝"向对象变量赋值的时候都是"引用传递"。
对于Class中包含除基础数据类型和String以外,实现深拷贝都需要重写clone方法.例如对象A中有一个变量 String []name;需要A implements Cloneable ,

## 重写clone方法

```
public Object clone() {   
        A o = null;   
        try {   
            o = (A) super.clone();   
            o.name=(String[])name.clone(); 
        } catch (CloneNotSupportedException e) {   
            e.printStackTrace();   
        }   
        return o;   
} 
//String[]的拷贝
	String []s = {"m","n"};
        String []s1 = (String[])s.clone();
        s[1] = "a";
        for (String s2:s1){
            log.info(s2.toString());
        }
// m,n
```

此时可以循环list,调用

```
list.add((A)o.clone());
```

### 序列化

除此之外可以使用序列化的方法实现深拷贝,需要实现Serializable接口的对象

```
    @Test
    void B(){
        User user = new User();
        user.setId(1L);
        List<User> list = new ArrayList<>();
        list.add(user);
        List<User> res = depCopy(list);
        user.setId(2L);
        list.forEach(System.out::print);
        res.forEach(System.out::print);
    }

    public static <T> List<T> depCopy(List<T> srcList) {
        ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
        try {
            ObjectOutputStream out = new ObjectOutputStream(byteOut);
            out.writeObject(srcList);
            ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());
            ObjectInputStream inStream = new ObjectInputStream(byteIn);
            List<T> destList = (List<T>) inStream.readObject();
            return destList;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
```

结果为:
User(id=2, name=null, password=null)User(id=1, name=null, password=null)


### 反射

```
 public static void copy(Object src,Object dest){
        Field[] fields = src.getClass().getDeclaredFields();
        Class<?> srcClass = src.getClass();
        Class<?> destClass = dest.getClass();
        for(Field f:fields){
            try { 
                String key = f.getName();
                String getMethodName = "get"+key.substring(0,1).toUpperCase()+key.substring(1);
                String setMethodName = "set"+key.substring(0,1).toUpperCase()+key.substring(1);
                Method getMethod =  srcClass.getDeclaredMethod(getMethodName);
                Method setMethod = destClass.getDeclaredMethod(setMethodName,f.getType());
                Object value = getMethod.invoke(src);
                if(value != null){
                    setMethod.invoke(dest,value);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
```


# 

