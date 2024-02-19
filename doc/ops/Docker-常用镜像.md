## mysql

> docker pull mysql
> docker run -itd {image_id} --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456a mysql


## pg
> docker pull postgres
> 
> docker run --name pgdata -p 5432:5432 -e POSTGRES_PASSWORD=123456a -v /pgdata:/var/lib/postgresql/data -d postgres



## kafka
> docker run --name kafka01 \
-p 9092:9092 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ZOOKEEPER_CONNECT=39.97.243.43:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://39.97.243.43:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-d  wurstmeister/kafka


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
KAFKA_ADVERTISED_HOST_NAME: 192.168.203.128
KAFKA_MESSAGE_MAX_BYTES: 2000000
KAFKA_CREATE_TOPICS: "Topic1:1:3,Topic2:1:1:compact"
KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
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
>  docker run -d -p 27017:27017 --name mongodb1 -e MONGO_INITDB_ROOT_USERNAME=test -e MONGO_INITDB_ROOT_PASSWORD=123456789 -v $PWD/db:/data/db mongo  



### 

