## CompletableFuture

```java
				List<Object> res = new ArrayList<>();
        CompletableFuture<?> completableFuture1 = CompletableFuture.runAsync(()->{
            //主表 doSomething
            //res.add();
        });
        CompletableFuture<?> completableFuture2 = CompletableFuture.runAsync(()->{
            //子表 doSomething
            //res.add();
        });
        CompletableFuture all = CompletableFuture.allOf(completableFuture1,completableFuture2);
        while (true){
            if(all.isDone()){
                //doSomething
                break;
            }
        }
        long b = System.currentTimeMillis();
        return String.valueOf(b-a);
```


```java
    @Test
    @SneakyThrows
    public void ah2() {
        List<CompletableFuture<Void>> list = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            list.add(CompletableFuture.runAsync(() -> {
                System.out.println(Thread.currentThread().getName());
            }));
        }
        CompletableFuture.allOf(list.toArray(new CompletableFuture[0])).join();// join 等待结果,不join 则不等待
        System.out.println("aaaaa");
        Thread.sleep(2000L);
    }
```
