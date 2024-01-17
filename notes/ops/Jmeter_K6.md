## Jmeter

### 单个请求

1. 添加线程组G1,设置线程数10,ramp-up 1,循环1
2. 添加一个Http Header Manager,设置共享header
3. 线程组下添加十个HTTP请求

> http请求下可添加BeanShell 后置处理器,防止乱码./添加固定定时器,设置间隔
prev.setDataEncoding("UTF-8");


4. 添加查看结果树和聚合报告

### 多个请求

1. 添加线程组G1-G10,设置线程数1,ramp-up 1,循环1
2. 每个线程组添加一个HTTP请求,并设置不同的body json
3. 添加查看结果树和聚合报告

## K6

相较于jmeter,更加轻量,需要编写js代码完成测试

> [https://k6.io/docs/](https://k6.io/docs/)


win安装

> [https://dl.k6.io/msi/k6-latest-amd64.msi](https://dl.k6.io/msi/k6-latest-amd64.msi)


idea 插件安装

> [https://plugins.jetbrains.com/plugin/16141-k6](https://plugins.jetbrains.com/plugin/16141-k6)


### 简单测试

```
import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
    vus: 1,//并发数
    rps: 1,//每秒并发数
    duration: "1s",//持续运行实际
};
export default function () {
    let res = http.get('https://httpbin.org/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
```

idea->run/debug configurations -> add K6
选择该文件,保存运行即可,如下报告

```
     checks.........................: 100.00% ✓ 1   ✗ 0
     data_received..................: 15 kB   7.9 kB/s
     data_sent......................: 695 B   360 B/s
     http_req_blocked...............: avg=694.87ms min=694.87ms med=694.87ms max=694.87ms p(90)=694.87ms p(95)=694.87ms
     http_req_connecting............: avg=229.47ms min=229.47ms med=229.47ms max=229.47ms p(90)=229.47ms p(95)=229.47ms
     http_req_duration..............: avg=226.11ms min=226.11ms med=226.11ms max=226.11ms p(90)=226.11ms p(95)=226.11ms
       { expected_response:true }...: avg=226.11ms min=226.11ms med=226.11ms max=226.11ms p(90)=226.11ms p(95)=226.11ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 1
     http_req_receiving.............: avg=1.05ms   min=1.05ms   med=1.05ms   max=1.05ms   p(90)=1.05ms   p(95)=1.05ms
     http_req_sending...............: avg=453.9µs  min=453.9µs  med=453.9µs  max=453.9µs  p(90)=453.9µs  p(95)=453.9µs
     http_req_tls_handshaking.......: avg=463.94ms min=463.94ms med=463.94ms max=463.94ms p(90)=463.94ms p(95)=463.94ms
     http_req_waiting...............: avg=224.6ms  min=224.6ms  med=224.6ms  max=224.6ms  p(90)=224.6ms  p(95)=224.6ms
     http_reqs......................: 1       0.51909/s
     iteration_duration.............: avg=1.92s    min=1.92s    med=1.92s    max=1.92s    p(90)=1.92s    p(95)=1.92s
     iterations.....................: 1       0.51909/s
     vus............................: 1       min=1 max=1
     vus_max........................: 1       min=1 max=1
```

对于需要模拟不同用户同时请求,可以用 http.batch()

```
function getByNameAndCreditId(){
    let res = http.batch(
        [getReq(0),getReq(1),getReq(2)]
    );
    check(res[0],{
        "is status 200":(r)=> r.status === 200,
    })
    sleep(2)
}

function getReq(index){
    return {
        method: "POST",
        url: "http://localhost:32096/test",
        body: JSON.stringify(body_params[index]),
        params: params
    };
}
```

### 负载测试

```
export let options = {
    stages: [
        { duration: '5s', target: 30 },
        { duration: '10s', target: 30 },
        { duration: '3s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '3s', target: 50 },
        { duration: '10s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
}
```
