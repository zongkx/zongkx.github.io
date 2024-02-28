## 磁盘

- 查看磁盘占用
  > df -Th

- 查看磁盘剩余空间
  > df -h

## 清理

- 清理系统日志文件
  > sudo journalctl --vacuum-size=100M
- 清理临时文件
  > sudo rm -rf /tmp/*
- 删除无用的软件包和依赖项
  > sudo yum autoremove
- 清理Yum缓存：
  > sudo yum clean all

## SSH

```shell
scp -r root@192.168.1.1:/path/remote/file /path/loacl
scp -r root@192.168.8.80:/home/gitlab-runner/tmp/vte/jars /path/loacl
firewall-cmd --zone=public --add-port=17000/tcp --permanent
```

## 根据pid查找进程执行目录信息

> ps -aux|grep -v grep |grep 12421

## 防火墙

- 安装
  > yum install firewalld firewalld-config

- 添加白名单

  > firewall-cmd --zone=public --add-port=80/tcp --permanent

- 查看白名单

  > firewall-cmd --permanent --list-port

- 重启

  > firewall-cmd --reload 或者 service firewalld restart

## 网络

> lsof -i:8080

> netstat -tuln | grep 8080

## locate

常用的查找文件的命令find，但find是读盘搜索，效率较低。
当系统刚刚建立时，或者新增、删除文件时，mlocate的数据库文件并不能同步更新，需要使用root用户手动执行updatedb命令进行更新。
> sudo -i updatedb

1. 查找包含passwd的文件。
   > locate passwd

2. 精确查找名叫passwd的文件。
   > locate -b '\passwd'

3. 查找以passwd结尾的文件。
   > locate '*passwd'

## find

> find / -name demo

找出 / 目录下 名字包含 demo的文件

## yum

> yum install  *.rpm //安装某个rpm软件

> yum install java-1.8.0-openjdk* -y

## rpm

> rpm -qa|grep dremio // 查找包信息

> rpm -e  *.noarch //移除软件

## 查找环境变量 which

> which python