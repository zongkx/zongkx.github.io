## 利用function替换反射

先有实体类 Pat , 需要根据 get方法获取其属性值,可以用在需要利用反射的场景(Function缓存下拉)

```java

@Test
@SneakyThrows
void a1() {
    Class<Pat> patClass = Pat.class;
    Field[] declaredFields = patClass.getDeclaredFields();
    List<Function> list = new ArrayList<>();
    for (Field declaredField : declaredFields) {
        list.add(createGetterFunction(declaredField));
    }
    Pat pat = new Pat(1L, 2L, "aa", "bb");
    for (Function function : list) {
        Object apply = function.apply(pat);
        System.out.println(apply);
    }

}

private Function<Object, Object> createGetterFunction(Field field) {
    return (Object instance) -> {
        try {
            field.setAccessible(true);
            return field.get(instance);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    };
}

```

