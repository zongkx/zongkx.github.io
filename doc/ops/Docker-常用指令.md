## build

> docker build -t my/demoapp .

## exec

> docker exec -it {} /bin/bash

## log

> docker logs -f {}

## run

> docker run -d -p 8081:8081 -p 9999:9999 my/demoapp

    -p: 指定端口映射，格式为：主机(宿主)端口:容器端口
    -d: 后台运行容器，并返回容器ID；
    -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
    -i: 以交互模式运行容器，通常与 -t 同时使用；

> docker run -d -p 8080:8080 -e PARAMS="--server.port=8080" my/demoapp

## clean

```shell
docker rmi $(docker images -q -f dangling=true)

#删除空悬镜像

docker image prune

# 删除所有关闭的容器
docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm

# 删除所有dangling数据卷(即无用的volume)：
docker volume rm $(docker volume ls -qf dangling=true)

```

## push

1. docker login **.com
   输入账号密码
2. docker tag my/demoapp **.com/my/demoapp:1.0
3. docker push **.com/my/demoapp:1.0

## update

> docker container update --restart=always mysql

## commit

```shell
docker commit --author="zkx" 容器ID 镜像名称:tag
```