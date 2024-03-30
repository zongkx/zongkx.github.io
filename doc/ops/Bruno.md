## 简介

https://docs.usebruno.com/

https://www.usebruno.com/downloads

## 关闭ssl验证

菜单-collection-PREFERENCES-General-SSL/TLS

## token

URL添加 环境变量 IP

```js
req.setHeader("Authorization", "{{token}}");
req.setUrl(bru.getEnvVar("IP") + req.getUrl());

```

![1](.images/22860f5a.png)
![2](.images/72dedde2.png)
![3](.images/4888c3c6.png)