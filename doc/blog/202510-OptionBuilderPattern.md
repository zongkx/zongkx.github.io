## Info

今天看到一个[帖子](https://www.v2ex.com/t/1162789), 帖子对 两种风格的代码展开了激烈的讨论

阿里云 oss sdk v1/v2

- V1

`client := oss.New("endpoint","accesskey","secretkey")`

- V2

```golang

var region = "cn-hangzhou"

var endpoint = "oss-cn-hanghzou-internal.aliyuncs.com"

var myProvider := credentials.NewStaticCredentialsProvider("accessKey", "secretkey")

cfg := oss.LoadDefaultConfig().
	WithRegion(region).
    WithEndPoint(endpoint).
    WithUseDualStackEndpoint(true).
	WithCredentialsProvider(myProvider)

client,err := oss.NewClient(&cfg)

```

实际上这两种风格各有优劣,通常情况下,java代码似乎更常使用第二种写法

Builder 模式在 Java 等语言中流行，主要是为了解决 "伸缩式构造器（Telescoping Constructor）" 问题

1. 解决问题： 当一个类有许多可选参数时，如果不使用 Builder，开发者必须提供大量的构造函数重载（例如：一个接收 5 个参数，一个接收
   6 个参数，等等）。

2. 可读性问题： 即使构造函数重载了，调用时用户也必须记住大量参数的顺序和类型，这极易出错且代码难以阅读。

Option 模式（函数式选项）在 Go 中是为了在保持 Go 简洁风格的前提下，解决复杂结构的初始化、配置、校验和未来 API
扩展问题。它是一种轻量级、高可读性的配置解决方案。
Function Option 允许你在不改变核心 API 函数签名（func NewClient(options ...Option)）的情况下，无限地添加新的配置函数，实现极佳的向后兼容性。

## Builder Pattern

建造者模式是一种创建型设计模式，旨在将复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

简单来说，它的主要目标是解决传统构造器（Constructor）的两个主要问题：

1. 构造器参数过多 (Telescoping Constructor Problem): 当一个类有很多可选参数时，你需要创建许多不同参数数量的构造器，代码会变得冗长且难以维护。

2. 参数设置不直观： 当构造器参数过多时，用户很难记住每个位置的参数代表什么意义，容易传错参数。

java中大量使用了builder模式,来构建复杂对象, 比如说jdk11中的 HttpClient等

```java

@Test
@SneakyThrows
void test() {
    HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            // 等等
            .build();
}

```

## Option Pattern

选项模式不是一个正式的 GoF 设计模式，但它是一种在现代编程（尤其是在 Rust、Go 等语言中非常常见）中用于处理函数或方法的可选参数的最佳实践。

它的核心目的是：在不需要建造者模式的复杂性时，优雅地处理函数/方法的零个或多个可选配置参数。

### Functional Options Pattern

[functional](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis)

函数式选项模式, 核心在于**将配置行为封装为函数**

1. 不使用配置结构体 (Config Struct) 作为参数，也不使用 建造者模式 (Builder Pattern) 来构建产品。

2. 而是将每个可选配置（例如设置超时、设置缓冲区大小）都定义为一个特殊的函数类型。

3. 用户在调用构造函数时，传入零个或多个这样的配置函数。

### go

```go
type Options struct {
    timeout time.Duration
    logLevel int
    // ... 其他默认配置
}
// WithTimeout 返回一个 Option 函数，该函数会修改 Options 结构体中的 timeout 字段
func WithTimeout(t time.Duration) Option {
    return func(opts *Options) {
        opts.timeout = t
    }
}
func NewServer(addr string, options ...Option) (*Server, error) {
    // 1. 设置默认值
    opts := &Options{
        timeout:  5 * time.Second,
        logLevel: 1,
    }

    // 2. 遍历并应用所有配置函数
    for _, option := range options {
        option(opts)
    }

    // 3. 使用最终的 opts 构建 Server
    // ...
}
```

效果如下:

```go
server := NewServer("127.0.0.1",
    WithTimeout(10 * time.Second),
    WithMaxConnections(50),
)
```

虽然它在功能上类似于建造者模式，但它避免了传统 Builder 模式必须引入的两个额外类型（Builder 接口和 Concrete Builder
实现），代码量更少，更符合 Go 语言简洁的风格。

与传统的 Java/C++ 构造器问题一样，该模式允许用户只传入需要配置的参数，不必关心其他可选参数的顺序或默认值，有效地解决了参数列表过长的问题。

### java

```java
// 1. 内部配置持有者
class ClientOptions {
    int timeoutMs = 5000; // 默认 5000ms
    int maxConnections = 10; // 默认 10
    // 可以在这里添加所有配置项
}

// 2. 选项函数接口
// 这是一个函数式接口，接受 ClientOptions 并返回 void
@FunctionalInterface
interface ClientOption {
    void apply(ClientOptions options);
}

// 3. 具体的选项函数
class ClientOptionsFactory {
    public static ClientOption withTimeout(int timeoutMs) {
        // 返回一个 Lambda 表达式，它实现了 ClientOption 接口的 apply 方法
        return options -> options.timeoutMs = timeoutMs;
    }

    public static ClientOption withMaxConnections(int max) {
        return options -> options.maxConnections = max;
    }
}

class Client {
    private final int timeout;
    private final int maxConnections;

    // 4. 构造函数接受可变参数
    public Client(ClientOption... options) {
        // a. 设置默认值
        ClientOptions opts = new ClientOptions();

        // b. 遍历并应用所有配置函数
        for (ClientOption option : options) {
            option.apply(opts);
        }

        // c. 应用最终配置
        this.timeout = opts.timeoutMs;
        this.maxConnections = opts.maxConnections;

        System.out.println("Client created with: Timeout=" + timeout + "ms, MaxConnections=" + maxConnections);
    }

    // ... 其他 Client 方法
}
```

效果如下:

```java
public class Main {
    static void main(String[] args) {
        // 使用默认值
        Client client1 = new Client();

        // 显式配置超时和最大连接数
        Client client2 = new Client(
                ClientOptionsFactory.withTimeout(3000),
                ClientOptionsFactory.withMaxConnections(50)
        );

        // 只配置其中一个参数
        Client client3 = new Client(
                ClientOptionsFactory.withMaxConnections(25)
        );
    }
}
// 输出:
// Client created with: Timeout=5000ms, MaxConnections=10
// Client created with: Timeout=3000ms, MaxConnections=50
// Client created with: Timeout=5000ms, MaxConnections=25
```

可见, 当配置数量不多或配置逻辑相对简单时，函数式选项模式是一种比传统 Builder 模式更轻量级、更具函数式风格的选择