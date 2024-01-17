## 依赖

```xml
		<dependency>
			<groupId>de.siegmar</groupId>
			<artifactId>logback-gelf</artifactId>
			<version>3.0.0</version>
		</dependency>
```

## 配置

```yaml
logging:
  level:
    root: ERROR //默认全局error级别
```

```xml
<conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
<conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
<conversionRule conversionWord="wEx" converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />
<property name="CONSOLE_LOG_PATTERN" value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>

<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
        <pattern>${CONSOLE_LOG_PATTERN}</pattern>
        <charset>UTF-8</charset>
    </encoder>
</appender>
<!--统一日志收集平台配置-->
<appender name="GELF" class="de.siegmar.logbackgelf.GelfUdpAppender">
    <graylogHost>ip</graylogHost>
    <graylogPort>12203</graylogPort>
    <encoder class="de.siegmar.logbackgelf.GelfEncoder">
        <staticField>app_name:demo</staticField>
    </encoder>
</appender>
<!-- 控制台输出日志级别 -->
<root level="info">
    <appender-ref ref="GELF" />
    <appender-ref ref="STDOUT" />
</root>
```

