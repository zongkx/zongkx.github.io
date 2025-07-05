## docker for windows 安装

### 1.开启windows服务:

- 适用于linux的windows子系统
- 虚拟机平台

### 2. 安装更新wsl2的更新包(可选)

> [https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)

### 3. 安装

正常安装docker for windows 即可

### 4. k8s

在docker-设置-kubernetes中,勾选enable kubernetes和show system containers

点击(由于google的原因开启过程中会一直处于start,所以可以使用阿里镜像)

```bash
git clone https://hub.fastgit.org/AliyunContainerService/k8s-for-docker-desktop.git
```

根目录执行

```bash
.\load_images.ps1
```

执行完成可见k8s成功启动,接下来配置控制台

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.4/aio/deploy/recommended.yaml
```

检查 kubernetes-dashboard 应用状态并开启api server 访问代理

```
kubectl get pod -n kubernetes-dashboard
kubectl proxy
```

访问控制台:

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

生成token:

```
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
```

复制最后生成的token,即可完成登录

## docker for centos8 安装

### yum

```
sudo yum install -y yum-utils

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#centos7
yum makecache fast

#centos8
yum makecache

yum -y install docker-ce docker-ce-cli containerd.io
```

### 启动

> sudo systemctl start docker

### 修改镜像

> vi /etc/docker/daemon.json

```json
{
  "registry-mirrors": [
    "https://2qtk1jto.mirror.aliyuncs.com"
  ]
}
```

### 重启

> systemctl daemon-reload


> systemctl restart docker.service

## docker compose

[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
> sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o
> /usr/local/bin/docker-compose

> sudo chmod +x /usr/local/bin/docker-compose

## 常用指令

```shell
docker build -t my/demoapp .

docker exec -it {} /bin/bash

docker logs -f {}

docker run -d -p 8081:8081 -p 9999:9999 my/demoapp

 #   -p: 指定端口映射，格式为：主机(宿主)端口:容器端口
 #  -d: 后台运行容器，并返回容器ID；
 #   -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
 #   -i: 以交互模式运行容器，通常与 -t 同时使用；

docker run -d -p 8080:8080 -e PARAMS="--server.port=8080" my/demoapp


docker rmi $(docker images -q -f dangling=true)

#删除空悬镜像

docker image prune

# 删除所有关闭的容器
docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm

# 删除所有dangling数据卷(即无用的volume)：
docker volume rm $(docker volume ls -qf dangling=true)


 docker login **.com
  # 输入账号密码
 docker tag my/demoapp **.com/my/demoapp:1.0
 docker push **.com/my/demoapp:1.0

ocker container update --restart=always mysql

docker commit --author="zkx" 容器ID 镜像名称:tag


```

## 常用镜像

### mysql

```shell
docker run -itd mysql --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456a mysql
```

```yml
version: '3'
services:
  mysql:
    image: mysql:latest #镜像名称以及版本
    restart: always #重启docker后该容器也重启
    container_name: mysql8 #容器名称
    environment:
      MYSQL_ROOT_PASSWORD: 123456 #指定用户密码
      TZ: Asia/Shanghai
    ports:
      - 3306:3306 #本地端口号与容器内部端口号
```

### pg

```shell
docker run --name pgdata -p 5432:5432 -e POSTGRES_PASSWORD=123456a -v /pgdata:/var/lib/postgresql/data -d postgres
```

### portainer

```yaml
# docker run -d -p 8000:8000 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
version: '3'
services:
  portainer:
    image: portainer/portainer
    restart: always
    container_name: portainer
    ports:
      - 8000:8000
      - 9000:9000
```

### yapi

默认用户 admin@admin.com
默认密码 ymfe.org

```yaml
version: '2.1'
services:
  yapi:
    image: mrjin/yapi:latest
    # build: ./
    container_name: yapi
    environment:
      - VERSION=1.10.2
      - LOG_PATH=/tmp/yapi.log
      - HOME=/home
      - PORT=3000
      - ADMIN_EMAIL=test@test.com
      - DB_SERVER=mongo
      - DB_NAME=yapi
      - DB_PORT=27017
    # restart: always
    ports:
      - 3000:3000
    volumes:
      - ~/data/yapi/log/yapi.log:/home/vendors/log # log dir
    depends_on:
      - mongo
    entrypoint: "bash /wait-for-it.sh mongo:27017 -- entrypoint.sh"
  mongo:
    image: mongo
    container_name: mongo
    # restart: always
    ports:
      - 27017:27017
    volumes:
      - ~/data/yapi/mongodb:/data/db #db dir
```

### dolphinscheduler

```shell
docker run --name dolphinscheduler-standalone-server -p 12345:12345 -p 25333:25333 -d apache/dolphinscheduler-standalone-server:"3.1.5"
```

### nacos

```yaml
version: '3'
services:
  nacos:
    image: nacos/nacos-server:latest
    ports:
      - 28848:8848
      - 29848:9848
      - 29849:9849
    environment:
      - MODE=standalone
    volumes:
      - ./logs:/home/nacos/logs
      - ./custom.properties:/home/nacos/init.d/custom.properties
    restart: always
```

custom.properties

```properties

management.endpoints.web.exposure.include=*
```

### kafka

> docker run --name kafka01 \
> -p 9092:9092 \
> -e KAFKA_BROKER_ID=0 \
> -e KAFKA_ZOOKEEPER_CONNECT=39.97.243.43:2181 \
> -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://39.97.243.43:9092 \
> -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
> -d wurstmeister/kafka

```yaml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    volumes:
      - ./data:/data
    ports:
      - "2181:2181"

  kafka:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      - KAFKA_ADVERTISED_HOST_NAME=192.168.203.128
      - KAFKA_MESSAGE_MAX_BYTES=2000000
      - KAFKA_CREATE_TOPICS="Topic1:1:3,Topic2:1:1:compact"
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
    volumes:
      - ./kafka-logs:/kafka
      - /var/run/docker.sock:/var/run/docker.sock

  kafka-manager:
    image: sheepkiller/kafka-manager
    ports:
      - 9020:9000
    environment:
      ZK_HOSTS: zookeeper:2181
```

### mongo

> docker run -d -p 27017:27017 --name mongodb1 -e MONGO_INITDB_ROOT_USERNAME=test -e
> MONGO_INITDB_ROOT_PASSWORD=123456789 -v $PWD/db:/data/db mongo

### jenkins

`docker pull jenkins`

`docker run -u root -d -p 8080:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home jenkins`

[参考](https://www.jenkins.io/zh/doc/book/installing/)

admin密码:

`docker exec -u 0 -it b3f6901172a5 /bin/bash`

`cat /var/jenkins_home/secrets/initialAdminPassword`

### cloud dbeaver

> docker run --name cloudbeaver -d --rm -ti -p 8978:8978 -v ./:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:latest

### cubejs

```yaml
version: '2.2'
services:
  cube:
    image: cubejs/cube:v0.33.47
    ports:
      - 4000:4000  # Cube API and Developer Playground
      - 3000:3000  # Dashboard app, if created
    env_file: .env # 同目录下的env文件
    volumes:
      - .:/cube/conf #
```

```env
CUBEJS_DATASOURCES=default
CUBEJS_DEV_MODE=true
CUBEJS_WEB_SOCKETS=false
CUBEJS_DB_TYPE=trino
CUBEJS_DB_HOST=127.0.0.1
CUBEJS_DB_PORT=28443
CUBEJS_DB_USER=test
CUBEJS_DB_PRESTO_CATALOG=memory
CUBEJS_DEV_MODE=true
CUBEJS_DB_SSL=true
CUBEJS_DB_PASS=password
```

### xxl-job pyenv

需要一个包含py/node/jdk环境的基础镜像,用于xxl-job excutor使用
使用了docker-hub中的 pyenv镜像,其中包含了 py2/3

ADD自带解压缩功能

```dockerfile
FROM vicamo/pyenv

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD jdk.gz /opt/local
ENV JAVA_HOME /opt/local/jdk1.8.0_151
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV PATH $JAVA_HOME/bin:$PATH

ADD node-v12.16.2-linux-x64.tar.xz /opt
ENV PATH=$PATH:/opt/node-v12.16.2-linux-x64/bin


```

## 异常排查

容器异常Killed

```shell
  # 查出所有被kill掉的程序
 dmesg | grep -i 'killed process'
 # 根据pid进行对比
 docker inspect -f '{{.State.Pid}}' my_container
```

```shell
# 查询最近30小时被杀掉的进程
journalctl --since "30 hours  ago" | grep -i "killed process"

```


