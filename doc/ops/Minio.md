## 简介

## https 部署

- `/home/minio/conf/certs`中添加 `private.key` 和 `public.crt`
- `docker`启动挂载此目录
  > docker run --log-opt max-size=1024m --log-opt max-file=3 -p 29000:9000 -p 29090:9090 --name minio -d
  --restart=always -v /home/comen/minio/data:/data -v /home/comen/minio/conf:/root/.minio -e
  MINIO_SERVER_URL=https://demo.com:29000   -e MINIO_ROOT_USER=admin -e MINIO_ROOT_PASSWORD=password -e
  TZ=Asia/Shanghai quay.io/minio/minio:latest server /data --console-address :9090 