需要一个包含py/node/jdk环境的基础镜像,用于xxl-job excutor使用
使用了docker-hub中的 pyenv镜像,其中包含了 py2/3

ADD自带解压缩功能
```dockerfile
FROM vicamo/pyenv

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD jdk.gz /opt/local
ENV JAVA_HOME /opt/local/jdk1.8.0_151
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV PATH $JAVA_HOME/bin:$PATH

ADD node-v12.16.2-linux-x64.tar.xz /opt
ENV PATH=$PATH:/opt/node-v12.16.2-linux-x64/bin


```



