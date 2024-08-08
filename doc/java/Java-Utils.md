## TreeUtls
```java
public class TreeUtil {
    /**
     * 使用Map合成树
     *
     * @param menuList       需要合成树的List
     * @param pId            对象中的父ID字段,如:Menu:getPid
     * @param id             对象中的id字段 ,如：Menu:getId
     * @param rootCheck      判断E中为根节点的条件，如：x->x.getPId()==-1L ,
     *                       x->x.getParentId()==null,x->x.getParentMenuId()==0
     * @param setSubChildren E中设置下级数据方法，如： Menu::setSubMenus
     * @param <T>            ID字段类型
     * @param <E>            泛型实体对象
     * @return
     */
    public static <T, E> List<E> makeTree(List<E> menuList, Function<E, T> pId, Function<E, T> id,
            Predicate<E> rootCheck, BiConsumer<E, List<E>> setSubChildren) {
        // 按原数组顺序构建父级数据Map，使用Optional考虑pId为null
        Map<Optional<T>, List<E>> parentMenuMap = menuList.stream().collect(Collectors.groupingBy(
                node -> Optional.ofNullable(pId.apply(node)),
                LinkedHashMap::new,
                Collectors.toList()));
        List<E> result = new ArrayList<>();
        for (E node : menuList) {
            // 添加到下级数据中
            setSubChildren.accept(node, parentMenuMap.get(Optional.ofNullable(id.apply(node))));
            // 如里是根节点，加入结构
            if (rootCheck.test(node)) {
                result.add(node);
            }
        }
        return result;
    }

    /**
     * 树中过滤
     * 
     * @param tree        需要过滤的树
     * @param predicate   过滤条件
     * @param getChildren 获取下级数据方法，如：MenuVo::getSubMenus
     * @return List<E> 过滤后的树
     * @param <E> 泛型实体对象
     */
    public static <E> List<E> filter(List<E> tree, Predicate<E> predicate, Function<E, List<E>> getChildren) {
        return tree.stream().filter(item -> {
            if (predicate.test(item)) {
                List<E> children = getChildren.apply(item);
                if (children != null && !children.isEmpty()) {
                    filter(children, predicate, getChildren);
                }
                return true;
            }
            return false;
        }).collect(Collectors.toList());
    }

    /**
     * 树中搜索
     * 
     * @param tree
     * @param predicate
     * @param getSubChildren
     * @return 返回搜索到的节点及其父级到根节点
     * @param <E>
     */
    public static <E> List<E> search(List<E> tree, Predicate<E> predicate, Function<E, List<E>> getSubChildren) {
        Iterator<E> iterator = tree.iterator();
        while (iterator.hasNext()) {
            E item = iterator.next();
            List<E> childList = getSubChildren.apply(item);
            if (childList != null && !childList.isEmpty()) {
                search(childList, predicate, getSubChildren);
            }
            if (!predicate.test(item) && (childList == null || childList.isEmpty())) {
                iterator.remove();
            }
        }
        return tree;
    }

}

public class TreeTest {

    // 树节点数
    public static Integer size = 5000000;
    // 树深度
    public static Integer deep = 100;
    private static List<MenuVo> menuVos = new ArrayList<>();

    @BeforeAll
    public static void init() {
        long currentId = 1;
        List<MenuVo> currentLevel = new ArrayList<>();
        MenuVo root = new MenuVo(currentId++, 0L, "Root");
        menuVos.add(root);
        currentLevel.add(root);
        for (int level = 1; level < deep && currentId <= size; level++) {
            List<MenuVo> nextLevel = new ArrayList<>();
            for (MenuVo parent : currentLevel) {
                for (int i = 0; i < size / Math.pow(10, level); i++) {
                    if (currentId > size)
                        break;
                    MenuVo child = new MenuVo(currentId++, parent.getId(), String.format("测试name:%s", currentId));
                    menuVos.add(child);
                    nextLevel.add(child);
                }
            }
            currentLevel = nextLevel;
        }
    }

    @Test
    public void testBigTree() {
        List<MenuVo> tree = TreeUtil.makeTree(menuVos, MenuVo::getPId, MenuVo::getId, x -> x.getPId() == 0,
                MenuVo::setSubMenus);
        System.out.println(tree);
    }

}

@AllArgsConstructor
@Data
public class MenuVo {

    private Long id;
    private Long pId;
    private String name;
    private List<MenuVo> subMenus;  

    public MenuVo() {
    }

    public MenuVo(Long id, Long pId, String name) {
        this.id = id;
        this.pId = pId;
        this.name = name;
    }

}
```

## DateUtils

```java
//根据年月获取第一天
public static Date getFistDayByYearAndMonth(Integer year, Integer month) {
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.MONTH, month - 1);
    calendar.set(Calendar.YEAR, year);
    calendar.add(Calendar.MONTH, 0);
    calendar.set(Calendar.DAY_OF_MONTH, 1);
    return calendar.getTime();
}

//根据年月获取其最后一天
public static Date getLastDayByYearAndMonth(Integer year, Integer month) {
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.MONTH, month - 1);
    calendar.set(Calendar.YEAR, year);
    calendar.add(Calendar.MONTH, 1);
    calendar.set(Calendar.DAY_OF_MONTH, 0);
    return calendar.getTime();
}

static DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
static DateTimeFormatter dateTimeFormatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
static ZoneId zoneId = ZoneId.systemDefault();


@Test
public void toLocalDate() {
    Date date = new Date();
    LocalDateTime localDateTime = date.toInstant().atZone(zoneId).toLocalDateTime();
    System.out.println(dateTimeFormatter2.format(localDateTime));
    LocalDate localDate = date.toInstant().atZone(zoneId).toLocalDate();
    System.out.println(dateTimeFormatter.format(localDate));
}

@Test
public void toDate() {
    LocalDateTime localDateTime = LocalDateTime.now();
    Date date = Date.from(localDateTime.atZone(zoneId).toInstant());
    System.out.println(DateFormatUtils.format(date, "yyyy-MM-dd HH:mm:ss"));

    LocalDate localDate = LocalDate.now();
    Date date1 = Date.from(localDate.atStartOfDay(zoneId).toInstant());
    System.out.println(DateFormatUtils.format(date1, "yyyy-MM-dd"));
}

@Test
public void firstOrLast() {
    LocalDate localDate = LocalDate.of(2020, 1, 10);
    System.out.println(dateTimeFormatter.format(localDate.with(TemporalAdjusters.firstDayOfMonth())));//当月第一天
    System.out.println(dateTimeFormatter.format(localDate.with(TemporalAdjusters.lastDayOfMonth())));//当月最后一天
}

@Test
public void between() {
    LocalDate localDate1 = LocalDate.of(2020, 10, 10);
    LocalDate localDate2 = LocalDate.of(2020, 10, 12);
    System.out.println(localDate2.toEpochDay() - localDate1.toEpochDay());//2天

    LocalDateTime localDateTime1 = LocalDateTime.of(2020, 10, 10, 18, 0, 0);
    LocalDateTime localDateTime2 = LocalDateTime.of(2020, 10, 10, 21, 0, 0);
    System.out.println(
            (localDateTime2.atZone(zoneId).toEpochSecond() - localDateTime1.atZone(zoneId).toEpochSecond()) / 60 / 60
    );//3小时
}
```

## IOUtils

### InputStream<--> String

```java

@Test
public void stringToInputStream() throws IOException {
    InputStream inputStream = new ByteArrayInputStream("hello world".getBytes(StandardCharsets.UTF_8));
    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
    String collect = bufferedReader.lines().collect(Collectors.joining());
    System.out.println(collect);
}
```

### 路径处理

可以自动处理windows/linux的斜杠反斜杠的问题
> Paths.get("/opt/test").normalize()

### 输出数据到指定文件中

```java
//将list中的数据一行一行写到指定文件中
public static <T> void fileWriterList1(String path, List<T> list) {
    try {
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), StandardCharsets.UTF_8));
        for (T t : list) {
            bufferedWriter.write(t.toString());
            bufferedWriter.newLine();
            bufferedWriter.flush();
        }
        bufferedWriter.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

```

## NumberUtils

```java
//分转为万元
public static double changeF2WY(Long amount) {
    return BigDecimal.valueOf(amount).divide(new BigDecimal(1000000), BigDecimal.ROUND_HALF_UP).doubleValue();
}

//计算百分比
public static String getPercentNumber(BigDecimal a, BigDecimal b) {
    return b == null ? "-" :
            b.compareTo(new BigDecimal(0)) == 0 ? "-" :
                    a == null ? "0.00" :
                            a.multiply(new BigDecimal(100)).divide(b, 2, BigDecimal.ROUND_HALF_UP).toString();
}
```

## StringUtils

```java

// 1.2.3转为000001000002000003
public static String turnString(String values) {
    StringBuilder obj = new StringBuilder();
    if (null == values || values.length() == 0) {
        return "";
    } else {
        for (String value : values.split("\\.")) {
            int length = value.length();
            if (length > 6) {
                obj.append(value, 0, 6);
            } else {
                for (int i = 0; i < 6 - length; i++) {
                    obj.append("0");
                }
                obj.append(value);
            }
        }
    }
    return obj.toString();
}

// 000001000002000003转为1.2.3
public static String turnStringToDot(String values) {
    StringBuilder obj = new StringBuilder();
    if (null == values || values.length() < 6 || values.contains("\\.")) {
        return values;
    } else {
        for (int i = 0; i < values.length() / 6; i++) {
            String value = values.substring(i * 6, i * 6 + 6);
            String res = value.replaceAll("^(0+)", "");
            obj.append(res.length() == 0 ? "0." : res + ".");
        }
    }
    return obj.toString();
}

```

```java

// 1.2.3转为000001000002000003
public static String turnString(String values) {
    StringBuilder obj = new StringBuilder();
    if (null == values || values.length() == 0) {
        return "";
    } else {
        for (String value : values.split("\\.")) {
            int length = value.length();
            if (length > 6) {
                obj.append(value, 0, 6);
            } else {
                for (int i = 0; i < 6 - length; i++) {
                    obj.append("0");
                }
                obj.append(value);
            }
        }
    }
    return obj.toString();
}

// 000001000002000003转为1.2.3
public static String turnStringToDot(String values) {
    StringBuilder obj = new StringBuilder();
    if (null == values || values.length() < 6 || values.contains("\\.")) {
        return values;
    } else {
        for (int i = 0; i < values.length() / 6; i++) {
            String value = values.substring(i * 6, i * 6 + 6);
            String res = value.replaceAll("^(0+)", "");
            obj.append(res.length() == 0 ? "0." : res + ".");
        }
    }
    return obj.toString();
}
```

### List/Arrays/String

```java

@Test
void B() {
    // List -->  Arrays
    List<string> list = new ArrayList<string>(2);
    list.add("1");
    list.add("2");
    String[] arrays = new String[list.size()];
    //如果使用toArray的无参方法，返回值是object[],容易出现类型转换异常
    arrays = list.toArray(arrays);


    // Arrays ---> List 
    //asList()返回的对象是一个Arrays内部类，没有实现集合的修改方法
    list = new ArrayList<>(Arrays.asList(arrays));


    // List --> String
    //可以使用common.lang中StringUtils中的join方法
    String s = StringUtils.join(list, ",");
    //或者使用 Java8中的String.join();
    String string = String.join(",", arrays);

    // String --> List
    stringbuilder sb = new stringbuilder("1,2,3,");
    sb.deleteCharAt(0);
    List list = new ArrayList(Arrays.asList(sb.toString().split(',')));

    //使用Arrays.asList构造的list没有重写add，remove方法，其size不可变，
    //为了避免使用该list增删改的接口报错，
    //使用new ArrayList()将其包起来即可。
    //另外的，当asList的构造参数为基础数据类型数组，
    //不能被泛型化的数组时，不能正确转list，
    //会把整个数组作为一个元素转为list。此时可以使用

    int[] intArr = {1, 2, 3};
    List<Integer> list = Arrays.stream(intArr).boxed().collect(Collectors.toList());
}
```

 

