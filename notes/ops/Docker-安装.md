
# docker for windows 安装

## 1.开启windows服务:

- 适用于linux的windows子系统
- 虚拟机平台

## 2. 安装更新wsl2的更新包(可选)

> [https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)


## 3.正常安装docker for windows 即可

## 4. k8s

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
# docker for centos8 安装
## yum

```
sudo yum install -y yum-utils

yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#centos7
yum makecache fast

#centos8
yum makecache

yum -y install docker-ce docker-ce-cli containerd.io
```

## 启动

> sudo systemctl start docker


## 修改镜像

> vi /etc/docker/daemon.json


```json
{
  "registry-mirrors": ["https://2qtk1jto.mirror.aliyuncs.com"]
}
```

## 重启

> systemctl daemon-reload


> systemctl restart docker.service

# docker compose
[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
>  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

> sudo chmod +x /usr/local/bin/docker-compose



# docker jar
## 

## 

