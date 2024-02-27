## https

- 阿里云申请的ssl证书包括 `zkx.com_public.crt`,`zkx.com_chain.crt`,`zkx.com.key`,使用1/3即可
- dockerfile 需要把前端的镜像里面添加 上面的证书文件

```Dockerfile
FROM nginx:1.24.0
COPY dist/ /usr/share/nginx/html/
ADD zkx.com_public.crt /home/zkx.com_public.crt
ADD zkx.com.key /home/zkx.com.key
COPY nginx/conf/default.conf /etc/nginx/conf.d/default.conf
```

```conf
server {
    listen 443 ssl ;
    server_name  zkx.com;
    ssl_certificate /home/zkx.com_public.crt;
    ssl_certificate_key /home/zkx.com.key;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    location / {
    	try_files $uri $uri/ /index.html;
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    location /r/ {
        proxy_pass https://zkx.com:7311;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
