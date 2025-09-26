## Turso

早在半年前,无意间发现 [turso](https://github.com/tursodatabase/turso) ,作为 sqlite的rust重置版本, 它额外提供了 mvcc 支持,
我认为这是一个非常有前景的尝试, 但是由于这个项目的jdbc驱动开发投入过少, 最近一段时间我抽空尝试了一次 pull request, 记录一下,
帮助我理解 rust jni已经 jdbc driver 的工作特性

## 开发环境搭建

windows环境非常不擅长 rust 交叉编译, 我还是倾向于在linux环境开发rust相关库,包括安装 cmake等

以 ubuntu为例, 使用 apt安装rust即可

进入 turso 源码 /bindings/java 目录,
先后执行:

`make linux_x86`
`make publish_local`

把 /libs/linux_x86 生成的 `lib_turso_java.so`
复制到 `test/resources/libs/linux_x86` 即可 使用单元测试完成

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

## test

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

## spotless

执行 gradle 插件中的  `spotlessJavaApply` 即可完成代码格式化