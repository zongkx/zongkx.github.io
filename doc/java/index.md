## resource

- [Jdk下载](https://bell-sw.com/pages/downloads/#jdk-17-lts)
- [WPS](https://xxh.nyist.edu.cn/info/1029/3250.htm)
- [WPS2](https://ncre.neea.edu.cn/html1/report/1507/861-1.htm)
- [面试](https://www.developers.pub/wiki/1002310/1011936)
- [software](https://linux.do/t/topic/46515)

## opensource

- [多线程-Gobrs](https://async.sizegang.cn/)
- [sql-sqlbuilder](https://openhms.sourceforge.io/sqlbuilder/example.html)
- [对象复制-vo2dto](https://github1s.com/fuzhengwei/guide-vo2dto/blob/HEAD/pom.xml#L121-L126)
- [鉴权-casbin](https://casbin.org/zh-CN/)
- [api规范-cloudevents](https://cloudevents.github.io/sdk-java/http-basic.html)
- [json操作-JMESPath](https://jmespath.org/tutorial.html)
- [spi-PF4J](https://pf4j.org/doc/custom-manager.html)
- [批处理-easybatch](https://github1s.com/j-easy/easy-batch)
- [vscode插件-demo](https://www.cnblogs.com/powertoolsteam/p/16044151.html)
- [java-api-Spark](http://sparkjava.com/documentation#getting-started)
- [流程-camunda](https://camunda-cn.shaochenfeng.com/)
- [py-demo](https://github1s.com/Python-World/python-mini-projects/blob/HEAD/README.md)

## xml👍

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
    <localRepository>D:\dev\maven\rep</localRepository>
    <pluginGroups></pluginGroups>
    <proxies></proxies>
    <servers></servers>
    <mirrors>
        <mirror>
            <id>nexus-aliyun</id>
            <name>Nexus aliyun</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>
    <profiles></profiles>
</settings>

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.5.5</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.5.5</version>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>


```

## yml

```yml
spring: # mysql-connector-java ( mybatis-spring-boot-starter / mybatis-plus-boot-starter / jpa )
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/test?useSSL=false
    username: root
    password: 123456
  jpa: # 仅针对spring-boot-starter-data-jpa 
    database-platform: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: update
```

```yml
spring: # spring-boot-starter-data-mongodb
  data:
    mongodb:
      uri: mongodb://127.0.0.1:27017/test #无密码
      # uri: mongodb://admin:123456@127.0.0.1:27017/test #有密码
```

