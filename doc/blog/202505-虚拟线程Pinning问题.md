## 问题

今天发现一个很奇怪的问题,在一个批量下线的场景中, 导致程序假死的现象
对应的代码核心是 异步废弃hazelcast缓存,其中使用了 虚拟线程

## 分析

网上查询资料后得知

虚拟线程通过**“挂载 (mounting)”到平台线程上执行代码。当一个虚拟线程遇到阻塞操作（例如，网络 I/O、文件 I/O、Thread.sleep()
等待），它会“卸载 (unmounting)
”，将自己的状态保存到堆上，然后释放它所挂载的平台线程，让该平台线程可以去执行其他等待中的虚拟线程。当阻塞操作完成时，该虚拟线程会再次被调度，并挂载到任意可用的平台线程**
上继续执行。

Pinning就是指，在某些特定情况下，一个虚拟线程在执行阻塞操作时，无法卸载它的平台线程

导致虚拟线程固定的主要场景：
在 JDK 21 及更早版本中，有以下两种主要情况会导致虚拟线程固定：

- synchronized 块或方法：

  原因： synchronized 关键字依赖于 Java 对象的内部锁 (intrinsic lock / monitor)。在 JDK 21 及更早版本中，JVM
  将这个锁的所有权与平台线程关联起来。当一个虚拟线程进入 synchronized 块并尝试获取锁时，如果它成功获取了锁，并且在
  synchronized 块内部发生了阻塞操作（例如，进行网络调用、数据库查询、Thread.sleep() 等），那么该虚拟线程会固定在其当前的平台线程上。JVM
  需要确保持有锁的线程在整个 synchronized 块执行期间保持不变，以便正确管理锁的获取和释放。
  后果： 如果所有平台线程都被不同的 synchronized 块固定，并且这些固定又伴随着阻塞操作，那么平台线程池就可能耗尽，导致系统吞吐量下降，甚至出现死锁或活锁。

- JNI (Java Native Interface) 调用：

  原因： 当虚拟线程调用本地方法（用 C/C++ 等编写）时，它会进入 Java 虚拟机外部的本地代码。JVM
  无法控制本地代码的执行和调度，因此无法在本地方法执行期间卸载虚拟线程。
  后果： 类似于 synchronized，如果 JNI 调用是长时间运行或阻塞的，它会占用一个平台线程。
  某些老的阻塞 I/O (在 JDK 21 之前或使用非标准库)：

虽然 JDK 21 已经对大部分标准库的 I/O 操作进行了优化，使其支持虚拟线程的卸载（例如 Socket, ServerSocket, FileInputStream
等），但如果你使用的是非常老的 Java 版本或某些没有适配虚拟线程的第三方 I/O 库，它们内部可能仍然会使用导致固定的底层实现

## 复现

```java

@Test
@SneakyThrows
void testLocalCache4() {
    Config config = new Config();
    config.addCacheConfig(new CacheSimpleConfig().setName("A"));
    config.addCacheConfig(new CacheSimpleConfig().setName("B"));
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
    UaaUser uaaUser = new UaaUser();
    uaaUser.setAccount("a");
    hazelcastInstance.getMap("A").set("key", uaaUser);
    for (int i = 0; i < 1111; i++) {
        hazelcastInstance.getMap("A").put(i + "", uaaUser);
    }

    LockSupport.parkNanos(200_000_000L);

    ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor();
    List<CompletableFuture<Void>> threadList = new ArrayList<>();
    for (int i = 0; i < 1111; i++) {
        int finalI = i;
        threadList.add(CompletableFuture.runAsync(() -> aa(hazelcastInstance, finalI), executorService));
    }
    CompletableFuture.allOf(threadList.toArray(new CompletableFuture[0])).join();
    LockSupport.parkNanos(200_000_000L); // 200 毫秒

    // 使用虚拟线程执行任务
    Thread.startVirtualThread(() -> {
        while (true) {
            System.out.println(hazelcastInstance.getMap("A").keySet());
            System.out.println(hazelcastInstance.getMap("B").keySet());
            // LockSupport.parkNanos 在虚拟线程中是非阻塞的，会卸载载体线程
            LockSupport.parkNanos(200_000_000L); // 200 毫秒
        }
    });
    Thread.sleep(5000000);
}

@SneakyThrows
private void aa(HazelcastInstance hazelcastInstance, int i) {
    bb(hazelcastInstance, i);
}

private synchronized void bb(HazelcastInstance hazelcastInstance, int i) throws InterruptedException {
    Thread.sleep(2000L);
    hazelcastInstance.getMap("A").evict(i + "");
}

```

## 解决

移除 `synchronized`

```java

private void bb(HazelcastInstance hazelcastInstance, int i) throws InterruptedException {
    Thread.sleep(2000L);
    hazelcastInstance.getMap("A").evict(i + "");
}
```