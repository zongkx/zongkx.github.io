## gitlab+jenkins+docker+docker

目前公司运行了一套上述服务部署环境,作为一名后端开发虽然没有亲自部署过这些服务,但是简单使用还是很有必要掌握的. 

### 1. gitlab

gitlab中一般包括dev/master分支,分别用于测试环境和生产环境

### 2. 项目中的配置

```
  <profiles>
        <profile>
            <id>pro</id>
            <activation>
                <activeByDefault>false</activeByDefault>
            </activation>
            <properties>
                <profile-name>pro</profile-name>
                <server-port>9092</server-port>
            </properties>
        </profile>
        <profile>
            <id>pro</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <profile-name>dev</profile-name>
                <server-port>9092</server-port>
            </properties>
        </profile>
  </profiles>
```

利用插件`maven-resources-plugin`自动替换application.yml/k8s svc文件/log.xml等的文件中的占位符,
通过`-Pdev`/`-Ppro` 实现生成不同配置文件的功能.

```
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
```

`deploy.yml`:

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: mydemo-service
  namespace: mydemo-${profile-name}
  labels:
    name: mydemo
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      annotations:
        prometheus.io/path: /prometheus
        prometheus.io/port: "${server-port}"
        prometheus.io/scrape: "true"
      labels:
        name: mydemo-service
    spec:
      containers:
        - image: 127.0.0.1/${project.artifactId}-${profile-name}:${project.version}-${timestamp}
          name: mydemo-service
      restartPolicy: Always
```

`svc.yml`

```
apiVersion: v1
kind: Service
metadata:
  name: mydemo-service--svc
  namespace: mydemo-${profile-name}
spec:
  selector:
    name: mydemo-service
  ports:
    - name: http
      port: ${server-port}
      protocol: TCP
  type: NodePort
```

`dockerfile`

```
FROM openjdk:8-arthas
VOLUME /tmp
ADD mydemo-service-1.0-SNAPSHOT.jar app.jar
RUN sh -c 'touch /app.jar'
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Duser.timezone=GMT+08","-jar","/app.jar"]
```

### 3. jenkins

需要完成流水线中的脚本,为了直接从maven项目到k8s部署,实际上用流水线脚本即可完成.
分三步

```
node("my") {
   stage('git clone') { 
   }
   stage('maven build && deploy ') {
   }
   stage("publish k8s") {
   }
}
```

1. 拉代码

```
  stage('获取代码') {
       checkout([$class: 'GitSCM', branches: [[name: '${branch}']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '凭据ID', url: 'GIT地址']]])
   }
```

2. 构建并推送镜像

```
  stage('maven build && deploy ') {      
      sh "   '${mvnHome}/bin/mvn'  clean  package  install -Dmaven.test.skip  -Pdev -U"
      sh " cd mydemo-service &&  '${mvnHome}/bin/mvn'  clean  package  docker:build -DpushImage   -Dmaven.test.skip  -Pdev"
   }
```

依赖插件`docker-maven-plugin`

```
 <plugin>
    <groupId>com.spotify</groupId>
    <artifactId>docker-maven-plugin</artifactId>
    <version>0.4.11</version>
    <configuration>
        <imageName>127.0.0.1/${project.artifactId}-${profile-name}</imageName>
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

3. k8s部署

```
   sh  "cd mydemo-service && kubectl  -s http://127.0.0.1:8888 apply  -f  target/classes/deploy.yaml -f target/classes/svc.yaml"
```

### 4. k8s

在k8s中指定的命名空间即可找到对应服务.
