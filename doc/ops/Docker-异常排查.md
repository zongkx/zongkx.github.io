## 容器异常Killed

```shell
  # 查出所有被kill掉的程序
 dmesg | grep -i 'killed process'
 # 根据pid进行对比
 docker inspect -f '{{.State.Pid}}' my_container
```

```shell
# 查询最近30小时被杀掉的进程
journalctl --since "30 hours  ago" | grep -i "killed process"

```