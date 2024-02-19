## 官方文档

> [https://docsify.js.org/#/zh-cn/](https://docsify.js.org/#/zh-cn/)


## 简易步骤

### 1. 新建同名仓库,并开启GiteePages服务

### 2. 初始化Docsify

### 3. 开启离线模式

参考

> [https://docsify.js.org/#/zh-cn/pwa](https://docsify.js.org/#/zh-cn/pwa)


本地打开index.html即可

### 4.提交git后更新GiteePage服务即可

## 目录结构

```
.
│  .nojekyll        用于阻止 GitHub Pages 会忽略掉下划线开头的文件
│  files.md         列出files文件夹中的文件用于下载
│  index.html       入口文件
│  nav.md           导航栏
│  README.md        首页
│  sidebar.md       侧边栏
│  push.bat         列出导航栏、侧边栏、files、提交到仓库Windows脚本
│  push.sh          列出导航栏、侧边栏、files、提交到仓库Linux或Mac脚本
│
├─files             存放所有提供下载文件的文件夹
│
├─images            存放所有图片文件
│  │
│  └─icons          存放图标文件
│
...... 其他自己的md文档或文件夹
```
