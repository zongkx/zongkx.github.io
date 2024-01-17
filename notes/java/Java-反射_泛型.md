## 获取子类的泛型class
```java
public interface IHandler<I,O>{
  
    default Class<?> clz() {
        Class<?>[] classes = org.springframework.core.GenericTypeResolver.resolveTypeArguments(getClass(), IHandler.class);
        return classes[0];
    }
  
}
```
`ihandler`的子类实现调用`clz`即可获取泛型 `I`的`class`

## 对象复制

```java
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
