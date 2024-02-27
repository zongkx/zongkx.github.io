## 安装kubectl

```shell
curl -Lo kubectl    http://kubernetes.oss-cn-hangzhou.aliyuncs.com/kubernetes-release/release/v1.22.1/bin/linux/amd64/kubectl


mv kubectl /usr/bin


chmod a+x /usr/bin/kubectl
```

## 设置config

1. 在 home/kubectl 目录创建 config文件 复制远程k8s集群的api配置
2. 设置环境变量 `export KUBECONFIG=/home/kubectl/config`
3. 测试 `kubectl get pods -n aed-test` (-n 指定namespace)

## 新增pod

## 新增service

## 新增ingress

## 更新pod镜像

[参考](https://developer.aliyun.com/article/1122230)

```shell
#  deployment/(pod-name)  
# -n: 指定namespace
kubectl set image deployment/nginx-deployment-basic nginx=nginx:1.9.1 -n aed-test

``` 


