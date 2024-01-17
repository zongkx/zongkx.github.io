## CentOS 8 EOL切换源
[https://help.aliyun.com/document_detail/405635.html?spm=5176.smartservice_service_chat.0.0.712c3f1bBoZ19I](https://help.aliyun.com/document_detail/405635.html?spm=5176.smartservice_service_chat.0.0.712c3f1bBoZ19I)

## 


## 查找
### locate
常用的查找文件的命令find，但find是读盘搜索，效率较低。
当系统刚刚建立时，或者新增、删除文件时，mlocate的数据库文件并不能同步更新，需要使用root用户手动执行updatedb命令进行更新。
> sudo -i updatedb

1. 查找包含passwd的文件。
> locate passwd

2.  精确查找名叫passwd的文件。
>  locate -b '\passwd' 

3.  查找以passwd结尾的文件。 
> locate '*passwd'

### find
> find / -name demo

找出 /  目录下 名字包含 demo的文件



## 包管理
### yum
> yum install  *.rpm   //安装某个rpm软件

> yum install java-1.8.0-openjdk* -y

### rpm
> rpm -qa|grep dremio  // 查找包信息

> rpm -e  *.noarch //移除软件


## 查找环境变量
### which
> which python

