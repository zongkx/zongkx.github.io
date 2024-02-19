## JacksonUtil

```java
import com.fasterxml.jackson.*;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class JacksonUtil {
    private static ObjectMapper objectMapper;

    public JacksonUtil(ObjectMapper objectMapper) {
        JacksonUtil.objectMapper = objectMapper;
        JacksonUtil.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);//忽略反序列化的未知属性,等同于注解 @JsonIgnoreProperties(true)

    }

    // 序列化为 String
    public static String toStr(Object o) {
        return objectMapper.writeValueAsString(o);
    }

    // 反序列化为 java bean,也可以是 map等集合
    public static <T> T toBean(String json, Class<T> beanClass) {
        return objectMapper.readValue(json, beanClass);
    }

    // 反序列化为 List<Bean>,也可以是List<Map>
    public static <T> List<T> toListBean(String json, Class<T> tClass) {
        return objectMapper.readValue(json, new TypeReference<ArrayList<T>>() {
        });
    }

    // 反序列化为 Map<String,Bean>
    public static <T> HashMap<String, T> toMapBean(String json, Class<T> tClass) {
        TypeFactory typeFactory = objectMapper.getTypeFactory();
        MapType mapType = typeFactory.constructMapType(HashMap.class, String.class, tClass);
        return map;
    }

    // List<Map> 根据map中的key分组 转换为 Map<List>
    public static Map<String, List<String>> listMapGroupToList(List<HashMap<String, String>> listMap) {
        Map<String, List<Map.Entry<String, String>>> collect = listMap.stream()
                .flatMap(m -> m.entrySet().stream())
                .collect(Collectors.groupingBy(a -> a.getKey()));
        Map<String, List<String>> map = new HashMap<>();
        collect.forEach((k, v) -> map.put(k, v.stream().map(Map.Entry::getValue).collect(Collectors.toList())));
        return map;
    }


    // 特殊转换 (此处对objectMapper 最好使用新的实例,避免污染bean)
    public static <T> T toBean(String json, Class<T> tClass, PropertyNamingStrategy strategy) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(strategy);
        return t;
    }

}

```

```java

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class JsonTests {
    private JacksonUtil jacksonUtil;

    @BeforeAll
    public void before() {
        jacksonUtil = new JacksonUtil(new ObjectMapper());
    }


    @Test
    @SneakyThrows
    public void a1() {

        String s = """
                {
                "name":"Paul"
                }""";
        System.out.println(jacksonUtil.toBean(s, HashMap.class));
    }

    @Test
    @SneakyThrows
    public void a2() {
        String s = """
                [{
                "name":"Paul"
                }]""";
        List list = jacksonUtil.toBean(s, List.class);
        System.out.println(list);
    }

    @Test
    @SneakyThrows
    public void a3() {
        String s = "{\"u1\":{\"name\":\"Paul\"},\"u2\":{\"name\":\"Eve\"}}";
        HashMap<String, User> stringUserHashMap = jacksonUtil.toMapBean(s, User.class);
        System.out.println(stringUserHashMap);
        HashMap<String, HashMap> stringUserHashMap1 = jacksonUtil.toMapBean(s, HashMap.class);
        System.out.println(stringUserHashMap1);
    }

    @Test
    @SneakyThrows
    public void a4() {
        HashMap<String, String> map1 = new HashMap<>();
        map1.put("name", "Paul");
        map1.put("age", "12");

        HashMap<String, String> map2 = new HashMap<>();
        map2.put("name", "Eve");
        map2.put("age", "13");

        Map<String, List<String>> stringListMap = JacksonUtil.listMapGroupToList(new ArrayList<>(Arrays.asList(map1, map2)));
        System.out.println(stringListMap);
    }

    @Test
    @SneakyThrows
    public void a5() {
        String s = "{\"user_name\":\"bee\",\"id_number\":\"123456\"}";
        System.out.println(jacksonUtil.toBean(s, User1.class, PropertyNamingStrategies.SNAKE_CASE));

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class User {
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class User1 {
        private String userName;
        private String idNumber;
    }
}
```

## 常用注解和配置

> //忽略反序列化的未知属性,等同于注解 @JsonIgnoreProperties(true)
> mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false)

```yaml
spring:
  jackson:
    deserialization:
      fail_on_unknown_properties: false
```

## Json 转 JsonLine

```java

@Test
@SneakyThrows
public void a5() {
    List all = new ArrayList();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try (SequenceWriter seq = new ObjectMapper().writer().withRootValueSeparator("\n")
            .writeValues(byteArrayOutputStream)) {
        all.forEach((Consumer<Object>) s -> {
            try {
                seq.write(s);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
    InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

}

```

## Jackson ThreadLocal

每个线程拥有自己的ObjectMapper对象.

```java
public class Jackson {
    private static final ThreadLocal<ObjectMapper> om = ThreadLocal.withInitial(() -> {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    });

    public Jackson() {
    }

    public static ObjectMapper getObjectMapper() {
        return om.get();
    }
}

```

## bean被覆盖的问题

springboot 自定义objectMapper bean 导致无法获取 jackson 自动配置的bean

```yaml
@Configuration
  public class JacksonConf {

  @Bean
  @Primary
  public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
  return builder.createXmlMapper(false).build();
  }
}

```

## 驼峰和下划线

```java

@Test
@SneakyThrows
public void test() {
    ObjectMapper objectMapper = new ObjectMapper();
    String json = "{\"user_name\":\"bflee\",\"id_number\":\"123456\"}";
    objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
    AA aa = objectMapper.readValue(json, AA.class);
    String s = objectMapper.writeValueAsString(aa);
    System.out.println(aa);
    System.out.println(s);
}

@Data
@AllArgsConstructor
@NoArgsConstructor
static class AA {
    private String userName;
    private String idNumber;
}
```

## @JsonSubTypes

```java

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = HiveTarget.class, name = HiveTarget.TYPE),
        @JsonSubTypes.Type(value = HBaseTarget.class, name = HBaseTarget.TYPE)
})
public class AbstractTarget {
    private String type;
}
```

```java

@Data
@EqualsAndHashCode(callSuper = true)
public class HBaseTarget extends AbstractTarget {
    private String namespace;
    private String table;
    private String columnFamily;
    private String column;

    static final String TYPE = "hbase";

    public HBaseTarget() {
        setType(TYPE);
    }
}

```

```java

@Data
@EqualsAndHashCode(callSuper = true)
public class HiveTarget extends AbstractTarget {
    private String schema;
    private String table;
    private String column;

    static final String TYPE = "hive";

    public HiveTarget() {
        setType(TYPE);
    }
}

```

```java

@Test
@SneakyThrows
public void a5() {
    objectMapper.registerSubtypes(new NamedType(clz, s1));//单例对象注册sub type的方式
}
```



