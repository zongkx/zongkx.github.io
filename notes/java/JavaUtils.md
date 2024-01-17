## DateUtils

```java
//根据年月获取第一天
public static Date getFistDayByYearAndMonth(Integer year, Integer month){
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.MONTH,month-1);
    calendar.set(Calendar.YEAR,year);
    calendar.add(Calendar.MONTH,0);
    calendar.set(Calendar.DAY_OF_MONTH,1);
    return calendar.getTime();
}
//根据年月获取其最后一天
public static Date getLastDayByYearAndMonth(Integer year,Integer month){
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.MONTH,month-1);
    calendar.set(Calendar.YEAR,year);
    calendar.add(Calendar.MONTH,1);
    calendar.set(Calendar.DAY_OF_MONTH,0);
    return calendar.getTime();
}
    static DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    static DateTimeFormatter dateTimeFormatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    static ZoneId zoneId = ZoneId.systemDefault();

	
    @Test
    public void toLocalDate(){
        Date date = new Date();
        LocalDateTime localDateTime = date.toInstant().atZone(zoneId).toLocalDateTime();
        System.out.println(dateTimeFormatter2.format(localDateTime));
        LocalDate localDate = date.toInstant().atZone(zoneId).toLocalDate();
        System.out.println(dateTimeFormatter.format(localDate));
    }
    @Test
    public void toDate(){
        LocalDateTime localDateTime = LocalDateTime.now();
        Date date = Date.from(localDateTime.atZone(zoneId).toInstant());
        System.out.println(DateFormatUtils.format(date,"yyyy-MM-dd HH:mm:ss"));

        LocalDate localDate = LocalDate.now();
        Date date1 = Date.from(localDate.atStartOfDay(zoneId).toInstant());
        System.out.println(DateFormatUtils.format(date1,"yyyy-MM-dd"));
    }
    @Test
    public void firstOrLast(){
        LocalDate localDate = LocalDate.of(2020,1,10);
        System.out.println(dateTimeFormatter.format(localDate.with(TemporalAdjusters.firstDayOfMonth())));//当月第一天
        System.out.println(dateTimeFormatter.format(localDate.with(TemporalAdjusters.lastDayOfMonth())));//当月最后一天
    }
    @Test
    public void between(){
        LocalDate localDate1 = LocalDate.of(2020,10,10);
        LocalDate localDate2 = LocalDate.of(2020,10,12);
        System.out.println(localDate2.toEpochDay()-localDate1.toEpochDay());//2天

        LocalDateTime localDateTime1 = LocalDateTime.of(2020,10,10,18,0,0);
        LocalDateTime localDateTime2 = LocalDateTime.of(2020,10,10,21,0,0);
        System.out.println(
                (localDateTime2.atZone(zoneId).toEpochSecond()-localDateTime1.atZone(zoneId).toEpochSecond())/60/60
        );//3小时
    }
```

## IOUtils
### InputStream<--> String
```java
    @Test
    public void stringToInputStream () throws IOException {
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
public static <T> void fileWriterList1(String path, List<T> list){
    try {
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), StandardCharsets.UTF_8));
        for(T t:list){
            bufferedWriter.write(t.toString());
            bufferedWriter.newLine();
            bufferedWriter.flush();
        }
        bufferedWriter.close();
    }catch (Exception e){
        e.printStackTrace();
    }
}

```
### 输出并压缩
```java
	//将list中的数据一行一行写到指定文件中,并分割文件压缩为zip
    public static <T> String fileWriterList0(String path,String fileName,int pageSize, List<T> list){
        int size = list.size();
        int total = size/pageSize==0?1:size/pageSize+1;
        String zipName = fileName+".zip";
        String txtName = fileName+".txt";
        try {
            ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(path+zipName));
            File[] files = new File[total];
            byte[] bytes = new byte[1024];
            for(int i=0;i<total;i++){
                String temp = path+ "_"+i+"_"+txtName;
                files[i] = new File(temp);
                FileOutputStream fileOutputStream = new FileOutputStream(temp);
                FileInputStream fileInputStream = new FileInputStream(files[i]);
                BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(fileOutputStream, StandardCharsets.UTF_8));
                int z = (i+1)* pageSize-1;
                for(int k = i * pageSize; z>=size?k<size:k<z; k++){
                    bufferedWriter.write(list.get(k).toString());
                    bufferedWriter.newLine();
                    bufferedWriter.flush();
                }
                bufferedWriter.close();
                zipOutputStream.putNextEntry(new ZipEntry(files[i].getName()));
                int len;
                while ((len=fileInputStream.read(bytes))>0){
                    zipOutputStream.write(bytes,0,len);
                }
                fileInputStream.close();
                fileOutputStream.close();
                zipOutputStream.closeEntry();
                if(files[i].exists()){
                    files[i].delete();
                };
            }
            zipOutputStream.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return path+zipName;
    }
```

## NumberUtils
```java
//分转为万元
public static double changeF2WY(Long amount){
    return BigDecimal.valueOf(amount).divide(new BigDecimal(1000000),BigDecimal.ROUND_HALF_UP).doubleValue();
}
//计算百分比
public static String getPercentNumber(BigDecimal a ,BigDecimal b){
        return b==null?"-":
                b.compareTo(new BigDecimal(0))==0 ?"-":
                        a== null ? "0.00":
                                a.multiply(new BigDecimal(100)).divide(b,2,BigDecimal.ROUND_HALF_UP).toString();
 }
```

## StringUtils
```java
 
  // 1.2.3转为000001000002000003
  public static String turnString(String values) {
      StringBuilder obj = new StringBuilder("");
      if(null==values||values.length()==0){
          return "";
      }else{
          for(String value:values.split("\\.")){
              int length = value.length();
              if(length>6){
                  obj.append(value.substring(0, 6));
              }else{
                  for(int i=0; i<6-length; i++){
                      obj.append("0");
                  }
                  obj.append(value);
              }
          }
      }
      return obj.toString();
  }
  // 000001000002000003转为1.2.3
  public static String turnStringToDot(String values){
      StringBuilder obj = new StringBuilder("");
      if(null==values||values.length()<6|| values.contains("\\.")){
          return values;
      }else{
          for(int i=0; i<values.length()/6; i++){
              String value = values.substring(i*6, i*6+6);
              String res = value.replaceAll("^(0+)","");
              obj.append(res.length()==0 ?"0.": res+".");
          }
      }
      return obj.toString().substring(0, obj.toString().length()-1);
  }
```



```java
 
  // 1.2.3转为000001000002000003
  public static String turnString(String values) {
      StringBuilder obj = new StringBuilder("");
      if(null==values||values.length()==0){
          return "";
      }else{
          for(String value:values.split("\\.")){
              int length = value.length();
              if(length>6){
                  obj.append(value.substring(0, 6));
              }else{
                  for(int i=0; i<6-length; i++){
                      obj.append("0");
                  }
                  obj.append(value);
              }
          }
      }
      return obj.toString();
  }
  // 000001000002000003转为1.2.3
  public static String turnStringToDot(String values){
      StringBuilder obj = new StringBuilder("");
      if(null==values||values.length()<6|| values.contains("\\.")){
          return values;
      }else{
          for(int i=0; i<values.length()/6; i++){
              String value = values.substring(i*6, i*6+6);
              String res = value.replaceAll("^(0+)","");
              obj.append(res.length()==0 ?"0.": res+".");
          }
      }
      return obj.toString().substring(0, obj.toString().length()-1);
  }
```
### List/Arrays/String
```java
// List -->  Arrays
List<string> list = new ArrayList<string>(2);
list. add("1") ;list.add("2") ;
String[] arrays = new String[list.size()];
//如果使用toArray的无参方法，返回值是object[],容易出现类型转换异常
arrays = list. toArray (arrays);



// Arrays ---> List 
//asList()返回的对象是一个Arrays内部类，没有实现集合的修改方法
list = new ArrayList<> (Arrays.asList (arrays));


// List --> String
//可以使用common.lang中StringUtils中的join方法
String s = StringUtils.join(list,",");
//或者使用 Java8中的String.join();
String string = String. join(",", arrays) ;

// String --> List
stringbuilder sb = new stringbuilder（）；
while(...){
    ...
    sb.append(","+str);
    ...
}
sb.deleteCharAt(0);
List list =new ArrayList(Arrays.asList(sb.toString().split(,)));

//使用Arrays.asList构造的list没有重写add，remove方法，其size不可变，
//为了避免使用该list增删改的接口报错，
//使用new ArrayList()将其包起来即可。
//另外的，当asList的构造参数为基础数据类型数组，
//不能被泛型化的数组时，不能正确转list，
//会把整个数组作为一个元素转为list。此时可以使用

int[] intArr = {1, 2, 3};
List<Integer> list  = Arrays.stream(intArr).boxed().collect(Collectors.toList());
```

 

