## 常用指令

```shell
# 查看磁盘占用
df -Th

# 查看磁盘剩余空间
df -h

# 清理系统日志文件
sudo journalctl --vacuum-size=100M

# 清理临时文件
sudo rm -rf /tmp/*

# 删除无用的软件包和依赖项
sudo yum autoremove

#     清理Yum缓存：
sudo yum clean all

# 根据pid查找进程执行目录信息
ps -aux|grep -v grep |grep 12421

# ssh远程下载

scp -r root@192.168.1.1:/path/remote/file /path/loacl

scp -r root@192.168.8.80:/home/gitlab-runner/tmp/vte/jars /path/loacl

firewall-cmd --zone=public --add-port=17000/tcp --permanent
# 防火墙

# 安装

  yum install firewalld firewalld-config

# 添加白名单

  firewall-cmd --zone=public --add-port=80/tcp --permanent

# 查看白名单

  firewall-cmd --permanent --list-port

# 重启

  firewall-cmd --reload 或者 service firewalld restart
# 网络
  lsof -i:8080

  netstat -tuln | grep 8080
```

## docker-compose

```shell
 curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
 chmod a+x /usr/local/bin/docker-compose
```

## yapi

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

## portainer

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

## dolphinscheduler

```shell
docker run --name dolphinscheduler-standalone-server -p 12345:12345 -p 25333:25333 -d apache/dolphinscheduler-standalone-server:"3.1.5"
```

## nacos

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

## mysql

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

## pg

```shell
docker run --name pgdata -p 5432:5432 -e POSTGRES_PASSWORD=123456a -v /pgdata:/var/lib/postgresql/data -d postgres
```

## kafka

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

## mongo

> docker run -d -p 27017:27017 --name mongodb1 -e MONGO_INITDB_ROOT_USERNAME=test -e
> MONGO_INITDB_ROOT_PASSWORD=123456789 -v $PWD/db:/data/db mongo

## cloud dbeaver

> docker run --name cloudbeaver -d --rm -ti -p 8978:8978 -v ./:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:latest

## cubejs

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
CUBEJS_DB_HOST=192.168.12.24
CUBEJS_DB_PORT=28443
CUBEJS_DB_USER=test
CUBEJS_DB_PRESTO_CATALOG=memory
CUBEJS_DEV_MODE=true
CUBEJS_DB_SSL=true
CUBEJS_DB_PASS=password
```

```js
const {FileRepository} = require("@cubejs-backend/server-core");
module.exports = {
    contextToAppId: ({securityContext}) =>
        securityContext && securityContext.tenant !== undefined ? 'CUBEJS_APP_' + securityContext.tenant : 'CUBEJS_APP',
    repositoryFactory: ({securityContext}) =>
        new FileRepository(securityContext && securityContext.tenant !== undefined ? 'schema/' + securityContext.tenant : 'schema/'),
};
```