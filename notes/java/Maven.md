## 应用

### 指令
> mvn clean compile deploy  -DskipTests
### Profile 指定打包环境

profile也可以指定 ·distributionManagement·
> mvn package -P all   all in one fat jar
> mvn package -P plat  thin jar

```xml
<profile>
  <id>all</id>
  <activation><activeByDefault>true</activeByDefault></activation>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>3.2.3</version>
        <configuration>
          <filters>
            <filter>
              <artifact>*:*</artifact>
              <excludes>
                <exclude>META-INF/*.SF</exclude>
                <exclude>META-INF/*.DSA</exclude>
                <exclude>META-INF/*.RSA</exclude>
              </excludes>
            </filter>
          </filters>
          <createDependencyReducedPom>true</createDependencyReducedPom>
          <relocations>
            <relocation>
              <pattern>com.fasterxml</pattern>
              <shadedPattern>demo.com.fasterxml</shadedPattern>
            </relocation>
          </relocations>
        </configuration>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>shade</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</profile>

<profile><id>plat</id></profile>
```
### deploy 上次至私服

一般多模块项目,把`distributionManagement`标签放在 `package`为 `pom`的父级模块,
比如

- common( common-a,common-b)
- boot

需要deploy  common-a和common-b 两个模块,此时将`distributionManagement`放在 common中即可,在项目根目录或者在其目录下执行 `mvn deploy` 即可.

```xml
  <servers>
    <server>
      <id>nexus-releases</id>
      <username>admin</username>
      <password>admin</password>
    </server>
    <server>
      <id>nexus-snapshots</id>
      <username>admin</username>
      <password>admin</password>
    </server>
  </servers>
```

```xml
    <distributionManagement>
        <!-- 两个ID必须与 setting.xml中的<server><id>nexus-releases</id></server>保持一致 -->
        <repository>
            <id>nexus-releases</id>
            <name>Nexus Release Repository</name>
            <url>http://maven.demo.com/nexus/content/repositories/demo-Release/</url>
        </repository>
        <snapshotRepository>
            <id>nexus-snapshots</id>
            <name>Nexus Snapshot Repository</name>
            <url>http://maven.demo.com/nexus/content/repositories/demo-Snapshot/</url>
        </snapshotRepository>

    </distributionManagement>
```

## 插件

### 配置文件占位符替换
该插件将会把指定目录下的配置文件中的占位符替换为 `profile`中的配置信息
`dev`的`activeByDefault`为`true`,默认`mvn package`将执行dev环境
(也可以指定 `-Ppro` 来执行 `pro`环境.)

比如下文配置将会启用  dev,且dev中的${name}会被替换为dev-name

```yaml
spring:
profiles:
    active: ${profile-name}
```
```yaml
name: ${name}
```

```xml
<profiles>
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <profile-name>dev</profile-name>
            <name>dev-name</name>
        </properties>
    </profile>
    <profile>
        <id>pro</id>
        <activation>
            <activeByDefault>false</activeByDefault>
        </activation>
        <properties>
            <profile-name>pro</profile-name>
            <name>pro-name</name>
        </properties>
    </profile>
</profiles>


<build>
  <plugins>
      <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.2.0</version>
          <configuration>
              <encoding>utf-8</encoding>
              <useDefaultDelimiters>true</useDefaultDelimiters>
              <resources>
                  <resource>
                      <directory>src/main/resources</directory>
                      <filtering>true</filtering>
                  </resource>
                  <resource>
                      <directory>src/main/k8s</directory>
                      <filtering>true</filtering>
                  </resource>
              </resources>
          </configuration>
      </plugin>
    </plugins>
</build>
```
### java-doc
上传至mvn私服
```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-javadoc-plugin</artifactId>
  <executions>
    <execution>
      <id>attach-javadocs</id>
      <goals>
        <goal>jar</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```
### 生成java-source
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
    <executions>
        <execution>
            <id>attach-sources</id>
            <goals>
                <goal>jar</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
### fat-jar打包(all in one)
打包后的jar包含所有依赖,且路径被重写.
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.2.3</version>
    <configuration>
        <filters>
            <filter>
                <artifact>*:*</artifact>
                <excludes>
                    <exclude>META-INF/*.SF</exclude>
                    <exclude>META-INF/*.DSA</exclude>
                    <exclude>META-INF/*.RSA</exclude>
                </excludes>
            </filter>
        </filters>
        <createDependencyReducedPom>true</createDependencyReducedPom>
        <relocations>
            <relocation>
                <pattern>com.fasterxml</pattern>
                <shadedPattern>demo.com.fasterxml</shadedPattern>
            </relocation>
        </relocations>
    </configuration>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
### springboot插件
springboot 插件,用于启动springboot
> - spring-boot:repackage，默认goal。在mvn package之后，再次打包可执行的jar/war，同时保留mvn package生成的jar/war为.origin
> - spring-boot:run，运行Spring Boot应用
> - spring-boot:start，在mvn integration-test阶段，进行Spring Boot应用生命周期的管理
> - spring-boot:stop，在mvn integration-test阶段，进行Spring Boot应用生命周期的管理
> - spring-boot:build-info，生成Actuator使用的构建信息文件build-info.properties

```xml
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${springboot.version}</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
```
### docker插件
该插件需要配合mvn setting.xml中配置使用,mvn 编译的时候会自动 构建上传镜像
```xml
  <servers>
		<server>
			<id>docker-image</id>
			<username>admin</username>
			<password>admin</password>
			<configuration>
			  <email>123@qq.com</email>
			</configuration>
		</server>
  </servers>
```
```xml
            <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <version>0.4.11</version>
                <configuration>
                    <imageName>dockerimage.demo.com/${project.artifactId}-${profile-name}</imageName>
                    <!--suppress UnresolvedMavenProperty -->
                    <imageTags>${project.version}-${timestamp}</imageTags>
                    <dockerDirectory>src/main/docker</dockerDirectory>
                    <serverId>docker-image</serverId>
                    <useConfigFile>true</useConfigFile>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                        </resource>
                    </resources>
                </configuration>
            </plugin>
```
### maven 上传私服插件
可以配置忽略某个模块是否上传,配合`distributionManagement` 使用
```dockerfile
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-deploy-plugin</artifactId>
                <version>2.8.2</version>
                <configuration>
                    <skip>true</skip>
                </configuration>
            </plugin>````
```
