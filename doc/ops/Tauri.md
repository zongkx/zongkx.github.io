## Rust离线安装
[下载链接](https://static.rust-lang.org/dist/rust-1.80.1-i686-pc-windows-gnu.msi)
一直点下一步即可
## cargo 代理
用户目录 ./cargo 中新建 config.toml
```
[source.crates-io]
replace-with = 'rsproxy-sparse'

[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"

# 稀疏索引，要求 cargo >= 1.68
[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"

[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"

[net]
git-fetch-with-cli = true
```

## Tauri
1. 初始化项目
  > npm create tauri-app@latest
2. 安装tauti-cli(可选)
  > npm install -g tauri-cli
3. 运行项目
  > npm run tauri dev
4. 打包
  > npm run tauri build

