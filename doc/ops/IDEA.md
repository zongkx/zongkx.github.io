## class/enum/interface

```sql
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
/**
 * @author zongkx
 */
 
 
public class ${NAME} {
}

```
## tests

```sql
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

/**
 * @author zongkx
 */

import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;


/**
 * @author zongkxc
 */

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ${NAME}Tests {

    @BeforeAll
    public void before(){
        
        
    }
    
    
    @Test
    @SneakyThrows
    public void a1 (){

    }
 }
```
