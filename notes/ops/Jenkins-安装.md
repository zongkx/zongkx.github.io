## docker部署

`docker pull jenkins`

`docker run -u root -d -p 8080:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home jenkins`

[参考](https://www.jenkins.io/zh/doc/book/installing/)

admin密码:

`docker exec -u 0 -it b3f6901172a5 /bin/bash`

`cat /var/jenkins_home/secrets/initialAdminPassword`
