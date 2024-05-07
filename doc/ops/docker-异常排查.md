## 容器异常Killed

```shell
  # 查出所有被kill掉的程序
 dmesg | grep -i 'killed process'
 # 根据pid进行对比
 docker inspect -f '{{.State.Pid}}' my_container
```


