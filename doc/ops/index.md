## 常用指令

```shell
# 查看磁盘占用
> df -Th

# 根据pid查找进程执行目录信息
> ps -aux|grep -v grep |grep 12421

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

```shell
docker run -d -p 8000:8000 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
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


