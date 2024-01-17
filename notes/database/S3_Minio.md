面向对象存储


```xml
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>aws-java-sdk-s3</artifactId>
            <version>1.11.1015</version>
        </dependency>
        <dependency>
            <groupId>io.minio</groupId>
            <artifactId>minio</artifactId>
            <version>8.2.1</version>
        </dependency> 
```

使用原生的aws sdk或者minio都可以
`[https://docs.aws.amazon.com/zh_cn/sdk-for-java/v1/developer-guide/examples-s3.html](https://docs.aws.amazon.com/zh_cn/sdk-for-java/v1/developer-guide/examples-s3.html)`
`[doc](https://docs.min.io/docs/java-client-api-reference.html)`

## 配置

```java
@Component
public class AwsS3Component implements InitializingBean {

    @Value("${custom.aws.access-key}")
    private String accessKey;
    @Value("${custom.aws.secret-key}")
    private String accessSecret;
    @Value("${custom.aws.endpoint}")
    private String endpoint;

    private AmazonS3 client;
    public AmazonS3 getClient() {
        return client;
    }

    @Override
    public void afterPropertiesSet() {
        ClientConfiguration config = new ClientConfiguration();
        config.setProtocol(Protocol.HTTP);
        config.disableSocketProxy();

        this.client = AmazonS3ClientBuilder
                .standard()
                .withClientConfiguration(config)
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, accessSecret)))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endpoint, Regions.CN_NORTH_1.getName()))
                .enablePathStyleAccess()
                .build();
    }
}
```

```java
@Component
public class MinIOFactory implements InitializingBean {
    @Value("${custom.aws.access-key}")
    private String accessKey;

    @Value("${custom.aws.secret-key}")
    private String accessSecret;

    @Value("${custom.aws.endpoint}")
    private String endpoint;

    private MinioClient minioClient;

    public MinioClient getMinioClient() {
        return minioClient;
    }

    @Override
    public void afterPropertiesSet() {
        this.minioClient = new MinioClient.Builder()
                .credentials(accessKey,accessSecret)
                .endpoint(endpoint,80,false)
                .region("cn-north-1")
                .build();
    }
}
```

## 测试

```java
    @Autowired
    private AwsS3Component awsS3Component;



    //读取S3中某个具体的文件,需要传递 租户id,项目id和文件名称fileName
    @Test
    void contextLoads() throws Exception{
        // bucketId,path
        S3Object o =  awsS3Component.getClient().getObject("1111","a/1.json");
        S3ObjectInputStream s3is = o.getObjectContent();
        InputStream inputStream = s3is.getDelegateStream();

    }
    //创建某个桶

    @Test
    void a(){
        String bucketId = UUID.randomUUID().toString();
        Bucket b ;
        AmazonS3 amazonS3 = awsS3Component.getClient();
        if (amazonS3.doesBucketExistV2(bucketId)) {
            System.out.format("Bucket %s already exists.\n", bucketId);
//            b = s3.getBucket(bucketId);
        } else {
            try {
                b = amazonS3.createBucket(bucketId);
            } catch (AmazonS3Exception e) {
                System.err.println(e.getErrorMessage());
            }
        }

    }
    //删除桶以及桶内所有对象
    @Test
    void b(){
        String bucketName = "1111";
        AmazonS3 s3Client = awsS3Component.getClient();
        ObjectListing objectListing = s3Client.listObjects(bucketName);
        while (true) {
            Iterator<S3ObjectSummary> objIter = objectListing.getObjectSummaries().iterator();
            while (objIter.hasNext()) {
                s3Client.deleteObject(bucketName, objIter.next().getKey());
            }
            if (objectListing.isTruncated()) {
                objectListing = s3Client.listNextBatchOfObjects(objectListing);
            } else {
                break;
            }
        }
        VersionListing versionList = s3Client.listVersions(new ListVersionsRequest().withBucketName(bucketName));
        while (true) {
            Iterator<S3VersionSummary> versionIter = versionList.getVersionSummaries().iterator();
            while (versionIter.hasNext()) {
                S3VersionSummary vs = versionIter.next();
                s3Client.deleteVersion(bucketName, vs.getKey(), vs.getVersionId());
            }
            if (versionList.isTruncated()) {
                versionList = s3Client.listNextBatchOfVersions(versionList);
            } else {
                break;
            }
        }
        s3Client.deleteBucket(bucketName);
    }
    //删除某个对象
    @Test
    void c (){
        AmazonS3 s3Client = awsS3Component.getClient();
        s3Client.deleteObject("1111","1.md");

    }

    //创建对象,根据JSONObject
    @Test
    void d(){
        AmazonS3 s3Client = awsS3Component.getClient();
        String bucketId = "1111";
        String key ="a/1.json";
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id","2");
        InputStream result = new ByteArrayInputStream(jsonObject.toString().getBytes(StandardCharsets.UTF_8));
        ObjectMetadata objectMetadata = new ObjectMetadata();
        s3Client.putObject(bucketId,key,result,objectMetadata);

    }
```

```java
@Component
@Slf4j
public class MinioUtil {

    private static MinioClient minioClient;

    private MinioConfig minioConfig;

    public MinioUtil(MinioConfig minioConfig) {
        this.minioConfig = minioConfig;
        minioClient = minioConfig.getMinioClient();
    }

    /**
     * 检查该租户是否已存在
     * @param bucketId
     * @return
     * @throws Exception
     */
    public static boolean bucketExists(String bucketId) throws Exception{
        return minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketId).build());
    }

    /**
     * 检查对象是否存在
     * @param bucketId
     * @param key
     * @return
     */
    public static boolean objectExists(String bucketId,String key){
        Iterable<Result<Item>> results = minioClient.listObjects(
                ListObjectsArgs.builder()
                        .bucket(bucketId)
                        .prefix(key)
                        .build());
        return results.iterator().hasNext();
    }

    /**
     * 获取对象内容
     * @param bucketId
     * @param key
     * @return
     * @throws Exception
     */
    public static String getObjectContent(String bucketId,String key) throws Exception{
        GetObjectArgs getObjectArgs = GetObjectArgs.builder()
                .bucket(bucketId).object(key)
                .build();
        InputStream inputStream = null;
        try {
            inputStream = minioClient.getObject(getObjectArgs);
            return new String(ByteStreams.toByteArray(inputStream));
        } finally {
            if(inputStream!=null){
                inputStream.close();
            }
        }
    }

    /**
     * 创建桶
     * @param bucketId 租户id
     * @return
     */
    public static void createBucketIfNotExists(String bucketId) throws Exception{
        if(!bucketExists(bucketId)){
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketId).build());
        }
    }


    /**
     * 删除桶内某个文件夹
     * @param bucketId
     * @param key
     * @throws Exception
     */
    public static void removeFolder(String bucketId,String key) throws Exception{
        Iterable<Result<Item>> results = minioClient.listObjects(
                ListObjectsArgs.builder()
                        .bucket(bucketId)
                        .prefix(key)
                        .build());
        if(results.iterator().hasNext()){
            List<DeleteObject> objects = new LinkedList<>();
            for (Result<Item> result : results) {
                objects.add(new DeleteObject(result.get().objectName()));
            }
            Iterable<Result<DeleteError>> results1 = minioClient.removeObjects(
                    RemoveObjectsArgs.builder().bucket(bucketId).objects(objects).build());
            for (Result<DeleteError> result : results1) {
                DeleteError error = result.get();
                log.error("Error in deleting object " + error.objectName() + "; " + error.message());
            }
        }
    }

    /**
     * 添加对象
     * @param bucketId 租户id
     * @param content 文件内容
     * @return
     */
    public static void putObject(String bucketId,String key,String content) throws Exception{
        createBucketIfNotExists(bucketId);
        InputStream inputStream = null;
        try {
            inputStream = new ByteArrayInputStream(content.toString().getBytes(StandardCharsets.UTF_8));
            minioClient.putObject(
                    PutObjectArgs.builder().bucket(bucketId).object(key)
                            .stream(inputStream, inputStream.available(), -1)
                            .build());
        } finally {
            if(inputStream!=null){
                inputStream.close();
            }
        }
    }

    /**
     * 删除某个对象
     * @param bucketId
     * @param key
     * @throws Exception
     */
    public static void removeObject(String bucketId,String key) throws Exception{
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(bucketId)
                        .object(key)
                        .build());
    }
}
```
