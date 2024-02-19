## 

> S-NEO_PENG#890808-g4tibemn0jen#37bb9

## 本地agent 启动
非agent启动也可以探测部分jvm数据等，建议开启agent启动
windows：添加启动参数
> -agentpath:D:\\dev\\jprofiler\\bin\\windows-x64\\jprofilerti.dll=port=8849,nowait

linux：添加启动参数
> -agentpath:/opt/jprofiler13.0.2/bin/linux-x64/libjprofilerti.so=port=8849,nowait

选择这个本地服务
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1660549268475-9316d07d-d733-4b3f-a64c-f187341f06b8.png#clientId=ud4e7b093-fa5b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=512&id=u2ac0bbd6&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=512&originWidth=702&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48050&status=done&style=none&taskId=u8e89da55-68b7-410f-949f-51f54a1264e&title=&width=702)
探针开启，比如数据库、异常等等
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1660549311977-84bc3286-292a-4211-ae4d-ccd7567d0b64.png#clientId=ud4e7b093-fa5b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=648&id=u08f52a30&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=648&originWidth=1103&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108931&status=done&style=none&taskId=u5583c212-9277-492b-ad24-8ec01948140&title=&width=1103)
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21561641/1660549321226-daeb1ee5-95b8-4688-a38b-10aa9841d534.png#clientId=ud4e7b093-fa5b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=891&id=ubcb0aaee&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=891&originWidth=1186&originalType=binary&ratio=1&rotation=0&showTitle=false&size=184638&status=done&style=none&taskId=u62345f12-c01d-4f0a-b22b-340066643e4&title=&width=1186)
