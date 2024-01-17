[https://www.csdn.net/tags/Mtzakg4sOTQ0NTYtYmxvZwO0O0OO0O0O.html](https://www.csdn.net/tags/Mtzakg4sOTQ0NTYtYmxvZwO0O0OO0O0O.html)


> 
> docker build -t my/demoapp .


> docker exec -it {} /bin/bash
> 



> docker logs -f {}

[
](http://10.6.207.82:8080/xxljob/)

> docker run  -d -p 8081:8081 -p 9999:9999 my/demoapp

    -p: 指定端口映射，格式为：主机(宿主)端口:容器端口
    -d: 后台运行容器，并返回容器ID；
    -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
    -i: 以交互模式运行容器，通常与 -t 同时使用；


> docker run -d -p 8080:8080 -e PARAMS="--server.port=8080" my/demoapp

空悬镜像删除
> docker rmi $(docker images -q -f dangling=true)

