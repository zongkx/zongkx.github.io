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

## idea 连接 linux docker

1. 编辑Docker配置文件

   >
   编辑配置文件/etc/systemd/system/multi-user.target.wants/docker.service，在环境变量ExecStart后面添加 `-H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock`
   ，允许来自任意IP的客户端连接。

   > 2375 是自定义端口

   > `vim /etc/systemd/system/multi-user.target.wants/docker.service`

2. 重启docker

   > `systemctl daemon-reload`
    
   > `systemctl restart docker`

3. 关闭centos防火墙

   > `systemctl stop firewalld.service `
   >
   > `systemctl disable firewalld.service `

4. 连接

   > `tcp://localhost:2375`
