## 配置 StatementInspector

```yaml
spring:
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update
    open-in-view: false
    show-sql: false
    properties:
      hibernate.session_factory.statement_inspector: com.demo.MyInterceptor


```

```java
import lombok.RequiredArgsConstructor;
import org.hibernate.resource.jdbc.spi.StatementInspector;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class MyInterceptor implements StatementInspector {
    @Override
    public String inspect(String s) {
        return s;
    }
}
```