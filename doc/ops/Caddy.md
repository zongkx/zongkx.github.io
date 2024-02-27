## 安装

## 使用

```shell
caddy reverse-proxy /* --from :7311 --to :8111   
caddy reverse-proxy /* --from :5500 --to :7311   
caddy reverse-proxy /* --from http://idea.lanyus.com:80 --to   http://127.0.0.1:8888

```

## caddy file

```
:7311 {
	log {
		output stdout
	}
	@allowOptions {
		method OPTIONS
	}

	handle @allowOptions {
		header Access-Control-Allow-Origin "*"
		header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
		header Access-Control-Allow-Headers "Content-Type, Authorization"
		respond "OK" 200
	}
	handle_path /aims* {
		reverse_proxy :8311 {
			header_up x-header-userid "1000000000000001"
			header_up X-Forwarded-For 127.0.0.1
			header_down Access-Control-Allow-Origin *
			header_down Access-Control-Expose-Headers Content-Disposition
			header_down Access-Control-Allow-Methods *
			header_down Access-Control-Allow-Headers *
			header_down Access-Control-Allow-Credentials "true"
			header_down Access-Control-Max-Age "3600"
			header_down Content-Type "application/json"
		}
	}
}


```


