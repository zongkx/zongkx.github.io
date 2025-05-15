## 下载

[url](https://openresty.org/en/)

## http插件

[如何引入第三方库](https://www.bookstack.cn/read/openresty-best-practices/ngx_lua-how_use_third_lib.md)

只要将 lua-resty-http/lib/resty/ 目录下的 http.lua 和 http_headers.lua 两个文件拷贝到 /usr/local/openresty/lualib/resty
目录下即可。

## lua 定时任务/HTTP

```nginx

#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    # 定义共享字典（可选，用于跨 worker 协调）
    lua_shared_dict task_lock 10m;

    init_by_lua_block {
        -- 全局变量（可选）
    }

    init_worker_by_lua_block {
        if 0 == ngx.worker.id() then
            local delay = 2  -- 每 2 秒执行一次

            -- 定时器回调函数
            local function check(premature)
                if premature then
                    return
                end

                -- 在回调函数中引入模块
                local httpc = require "resty.http"
                local http = httpc:new()

                -- 执行 HTTP 请求
                local res, err = http:request_uri("http://localhost:71/users", {
                    method = "GET",
                    headers = {
                        ["User-Agent"] = "OpenResty/1.0"
                    }
                })
                ngx.log(ngx.ERR, "请求成功: ", res.body)
                -- 处理响应
                if not err and res.status == ngx.HTTP_OK then
                    ngx.log(ngx.INFO, "请求成功: ", res.body)
                else
                    ngx.log(ngx.ERR, "请求失败: ", err or "未知错误")
                end
            end

            -- 创建定时器
            local ok, err = ngx.timer.every(delay, check)
            if not ok then
                ngx.log(ngx.ERR, "创建定时器失败: ", err)
            end
        end
    }

    server {
        listen 80;
        location / {
            # 其他配置
        }
    }
}



```