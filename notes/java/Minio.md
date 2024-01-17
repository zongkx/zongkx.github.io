### 批量下载

网上的例子大多数仅针对 一个bucket下面不存在多层级目录的情况,下面的代码实现了多层级目录递归下载的目的.
比如: 下载 `bucket-A`中 目录`python`下面的所有对象
/bucket-A/python/demo.py
/bucket-A/python/lib/A.py

```java
public static void downloadFiles(MinioClient minioClient,String bucketId,String path,String downloadPath) throws Exception {
    boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketId).build());
    if (found) {
        ListObjectsArgs listObjectsArgs = ListObjectsArgs.builder()
            .bucket(bucketId).startAfter(path).recursive(true).build();
        Iterable<Result<Item>> listObjects = minioClient.listObjects(listObjectsArgs);
        for (Result<Item> result : listObjects) {
            Item item = result.get();
            String objectName = item.objectName();
            if(!item.objectName().endsWith("/")){
                // 获取父级目录,并创建,避免 minioClient.downloadObject 异常
                Paths.get(downloadPath + objectName).normalize().toFile().getParentFile().mkdirs();
                minioClient.downloadObject(
                    DownloadObjectArgs.builder()
                    .bucket(bucketId)
                    .object(item.objectName())
                    .filename(downloadPath+item.objectName())
                    .build());
            }else{
                Paths.get(downloadPath + path).normalize().toFile().mkdirs();
            }
        }
    }
    }
```
### 读取文件内容
```java
        GetObjectResponse ylx = minioClient.getObject(GetObjectArgs.builder().bucket(s3Param.getBucket()).object(s3Param.getObjectName()).build());
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(ylx));
        String collect = bufferedReader.lines().collect(Collectors.joining());

```
