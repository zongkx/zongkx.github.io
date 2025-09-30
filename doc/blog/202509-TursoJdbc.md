## Turso

早在半年前,无意间发现 [turso](https://github.com/tursodatabase/turso) ,作为 sqlite的rust重置版本, 它额外提供了 mvcc 支持,
我认为这是一个非常有前景的尝试, 但是由于这个项目的jdbc驱动开发投入过少, 最近一段时间我抽空尝试了一次 pull request, 记录一下,
帮助我理解 rust jni 以及 jdbc driver 的工作特性

## JNI/JNA/FFM

- JNI

turso使用JNI完成 native方法绑定, 同样的 sqlite/duckdb 也都使用了 JNI完成绑定,
JNI作为java原生提供的能力, 性能对比JNA更强,但是需要写胶水代码完成,同时容易出现内存问题

```rust
#[no_mangle]
pub extern "system" fn Java_tech_turso_core_TursoStatement_changes<'local>(
    mut env: JNIEnv<'local>,
    obj: JObject<'local>,
    stmt_ptr: jlong,
) -> jlong {
    let stmt = match to_turso_statement(stmt_ptr) {
        Ok(stmt) => stmt,
        Err(e) => {
            set_err_msg_and_throw_exception(&mut env, obj, SQLITE_ERROR, e.to_string());
            return -1;
        }
    };

    stmt.connection.conn.changes()
}
```

- JNA

使用 Java 的 FFI（Foreign Function Interface）概念，利用 JDK 8 的反射机制和本地代码（主要是 JNI）在运行时动态地加载本地库，并直接将
Java 方法映射到本地函数签名，从而无需编写 C/C++ 胶水代码。

- FFM

API 从 JDK 17 开始以预览版形式出现，并在 JDK 22 中正式定稿。它结合了 JNI 的高性能和 JNA 的易用性，旨在成为 Java
调用本地代码的新的官方标准。

## Type2/Type4 驱动

- Type 2 驱动，也被称为部分 Java 驱动（Partially Java Driver）或 JDBC-Native API 驱动。
- Type 4 驱动： 完全用 Java 编写，直接将 JDBC 调用转换为数据库的网络协议（如 TCP/IP）。

turso/sqlite/duckdb这类嵌入式数据库必须要依赖 native lib, 所有必须要使用 Type2 驱动 ,另外使用 一体化JAR包的方式提高易用性,
所有平台编译出来的原生库文件都被打包JAR中, Type2 最明显的劣势便是 native reflect 非常麻烦, 像 sqlite比较成熟的驱动提供了
native image支持, duckdb 社区尚未有所行动, 未来Type2 JDBC驱动可能都会往 FFM发展, 简化驱动 native image支持

## 孤儿内存

### Sqlite

ResultSet 底层维护了一个 SQLite 语句对象 (sqlite3_stmt*)，这个对象本质上是一个游标 (Cursor)
Java 代码中调用 resultSet.next() 时，JDBC 驱动通过 JNI 调用底层的 C 函数（如 sqlite3_step()
JDBC 规范为此提供了一个标准且强制的模式：
完成对 ResultSet、Statement 和 Connection 的操作后，必须调用它们的 close() 方法:当 Java 代码调用 close() 时，JDBC 驱动通过
JNI 调用底层的 C 函数，如 sqlite3_finalize()，来销毁对应的 sqlite3_stmt* 游标对象，从而释放它在原生堆上占用的所有内存。

### Turso

```rust
impl TursoStatement {
    pub fn new(stmt: Statement, connection: TursoConnection) -> Self {
        TursoStatement { stmt, connection }
    }

    #[allow(clippy::wrong_self_convention)]
    pub fn to_ptr(self) -> jlong {
        Box::into_raw(Box::new(self)) as jlong
    }

    pub fn drop(ptr: jlong) {
        let _boxed = unsafe { Box::from_raw(ptr as *mut TursoStatement) };
    }
}
```

```java
public final class TursoStatement {

    private static final Logger log = LoggerFactory.getLogger(TursoStatement.class);

    private final String sql;
    private final long statementPointer;
    private final TursoResultSet resultSet;

    private boolean closed;

    // TODO: what if the statement we ran was DDL, update queries and etc. Should we still create a
    // resultSet?
    public TursoStatement(String sql, long statementPointer) {
        this.sql = sql;
        this.statementPointer = statementPointer;
        this.resultSet = TursoResultSet.of(this);
        log.debug("Creating statement with sql: {}", this.sql);
        // ....
    }
}

```

Box 转换为一个裸指针 (*mut T), Java 接收这个裸指针（通常是作为一个 long 类型）并存储在相应的 Java 对象（如
TursoStatement 实例 的 statementPointer）中  
关闭的代码

```java
  public void close() throws SQLException {
    if (closed) {
        return;
    }
    this.resultSet.close();
    _close(statementPointer);
    closed = true;
}

private native void _close(long statementPointer);
```

```rust
#[no_mangle]
pub extern "system" fn Java_tech_turso_core_TursoStatement__1close<'local>(
    _env: JNIEnv<'local>,
    _obj: JObject<'local>,
    stmt_ptr: jlong,
) {
    TursoStatement::drop(stmt_ptr);
}

```

```rust
    pub fn drop(ptr: jlong) {
        // 重获所有权
        let _boxed = unsafe { Box::from_raw(ptr as *mut TursoStatement) };
        // 自动清理
    }
```

这段代码通过 Box::from_raw 确保了原本在 Java 和 Rust 边界上处于**不安全状态（裸指针）的内存，能够被重新纳入 Rust
内存安全管理的掌控之中，并确保了 Drop 机制被触发，从而彻底避免了“孤儿内存”（内存泄漏）**的出现。

### 错误的案例

into_raw()

```rust
#[no_mangle]
pub extern "C" fn getVersion() -> *mut c_char {
    let result = std::panic::catch_unwind(|| -> Result<String> {
        // 在这里，编译器知道 Result<String> 等同于 Result<String, duckdb::Error>
        let conn = Connection::open_in_memory()?;
        let mut stmt = conn.prepare("SELECT version()")?;
        let version: String = stmt.query_row([], |row| row.get(0))?;
        Ok(version)
    });
    match result {
        Ok(Ok(version)) => CString::new(version).unwrap().into_raw(),
        _ => std::ptr::null_mut(),
    }
}
```

Rust 中使用 CString::new(version).unwrap().**into_raw()** 时：

- CString::into_raw() 的作用是放弃 Rust 对这个字符串数据的内存管理权。
- Rust 的所有权系统不再追踪这块内存，Rust 的内存安全保证也被绕过。
- 这块内存将不会被 Rust 的栈或堆自动清理（不会在函数结束时释放）。 责任被转移给了外部调用者（即 Java/JNI）。

JVM GC 无法感知或管理由 JNI/FFI 调用底层 C/Rust 代码分配的、位于原生堆 (Native Heap) 上的内存。

## JDBC Driver

### LocalDateTime

虽然 JDBC 规范推荐使用 setObject(index, localDateTime) 来处理 Java 8 的日期时间类型，但在 SQLite JDBC
驱动中，这种做法确实会经常遇到时区问题，导致数据存储不准确。

## Development

### 开发环境搭建

windows环境非常不擅长 rust 交叉编译, 我还是倾向于在linux环境开发rust相关库,包括安装 cmake等

以 ubuntu为例, 使用 apt安装rust即可

进入 turso 源码 /bindings/java 目录,
先后执行:

- `make linux_x86`
- `make publish_local`

把 /libs/linux_x86 生成的 `lib_turso_java.so`
复制到 `test/resources/libs/linux_x86` 即可 使用单元测试完成

### test

```java

@Test
void execute_insert_should_return_number_of_inserted_elements() throws Exception {
    connection.prepareStatement("CREATE TABLE test (col INTEGER)").execute();
    PreparedStatement prepareStatement =
            connection.prepareStatement("INSERT INTO test (col) VALUES (?), (?), (?)");
    prepareStatement.setInt(1, 1);
    prepareStatement.setInt(2, 2);
    prepareStatement.setInt(3, 3);
    assertEquals(prepareStatement.executeUpdate(), 3);
}

```

### spotless

执行 gradle 插件中的  `spotlessJavaApply` 即可完成代码格式化