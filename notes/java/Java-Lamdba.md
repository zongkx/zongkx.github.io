

**把一段代码赋值给一个变量**. 比如 code = public void doSomething(String s){sout;} 其中 public 和 方法名都是多余的,对于void来说编译器可以自行判断返回值类型,同样的对于参数s也可以自行判断 对于花括号里面的内容来说,如果只有一行代码可以用 ->代替{} 

code = (s)->sout(s); 对于 这块代码 就是lambda表达式 ,而对于code而言就可以理解为lambda类型的变量,在Java8中所有lambda类型都是一个接口,而lambda表达式就是接口的实现 而这个接口只有一个接口函数,称为函数式接口

比如自定义接口:

```
@FunctionalInterface//标识只能有一个接口方法
public interface MyFunctionInterface {
    void doSomething(String s);
}
@Test
public void lambda(){
    MyFunctionInterface myFunctionInterface = s -> {
        System.out.println("123"+s);
    };
    myFunctionInterface.doSomething("4");//1234
}
```

//可以看到利用lambda表达式简化了接口的实现所需要的代码(不需要新增类来实现接口中的方法)

- 成员函数和lambda表达式

> //String::length 把String转为其长度 可以更换为e->e.length()
>  
> // e->System.out.println(e) == System.out::println


- 常用的几个jdk内置@FunctionalInterface接口

> public interface Consumer
>  
> public interface Predicate
>  
> public interface BiConsumer<T, U>
>  
> public interface Function<T, R>


```
@Test
public void lambda(){
	Consumer<String> consumer = s -> {//不带返回值 void
        System.out.println(s);
        System.out.println(111);
    };
    consumer.accept("s");
	
    Predicate<String> predicate = s -> {//带返回值 boolean
        System.out.println(111);
        System.out.println(s);
        return false;
    };
    boolean a = predicate.test("a");
    
	BiConsumer<String ,Integer> biConsumer = (k,v)->{//无返回值 两个入参
        System.out.println(k+""+v);
    };
    biConsumer.accept("num",1);
    
   //将P开头的Person打印出来
   List<Person> personList = Arrays.asList(new Person("Paul"),new Person("Job"));
   test1(person -> System.out.println(person.getName()),person -> person.getName().startsWith("P"),personList);
   personList.stream().filter(person -> person.getName().startsWith("P")).forEach(person -> System.out.println(person.getName()));    
}
    public static void test1(Consumer<Person> consumer,Predicate<Person> predicate,List<Person> list){
        list.forEach(person -> {
            if (predicate.test(person)){
                consumer.accept(person);
            }
        });
    }
```


