### 序列化

除此之外可以使用序列化的方法实现深拷贝,需要实现Serializable接口的对象

```java

@Test
void B() {
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
`User(id=2, name=null, password=null)User(id=1, name=null, password=null)`


