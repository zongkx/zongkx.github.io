## 简介

反向etl区别与etl,其主要目的在于数据仓库到下游系统, etl更多的是为了 数仓的创建.
反向etl目的在于提供一个标准声明,方便下游app共享基础能力和扩展.
用途: 主数据订阅/第三方数据订阅等
## 核心组件

- easybatch  批处理
- xxljob 分布式调度
- pf4j 插件化开发
- dremio 数据湖(大于数仓,提供更强大的olap能力)


easybatch 批处理结合 xxljob调度即可实现  简单可靠的数据分发功能,配合数据湖/pf4j 插件开发,可以实现相当灵活的 :  反向etl功能/数据订阅.
```java
public interface IBatch<SOURCE, SINK> {
    
    JobExecutor jobExecutor();
    
    RecordReader reader(SOURCE i);
    
    RecordWriter writer(BatchResult result, SINK o);
    
    RecordMapper mapper();
    
    default CustomPipelineListener customPipelineListener(String jobId) {
        return new CustomPipelineListener(jobId);
    }
    
    default CustomWriterListener customWriterListener(String jobId) {
        return new CustomWriterListener(jobId);
    }
    
    default CustomReaderListener customReaderListener(String jobId) {
        return new CustomReaderListener(jobId);
    }
    
    // 可选
    default RecordProcessor processor() {
        return null;
    }
    
    default BatchResult execute(SOURCE source, SINK sink) {
        BatchResult result = new BatchResult(UUID.randomUUID().toString(), XxlJobHelper.getJobId());
        JobExecutor jobExecutor = jobExecutor();
        JobBuilder jobBuilder = new JobBuilder();
        jobBuilder.reader(reader(source));
        jobBuilder.writer(writer(result, sink));
        //jobBuilder.batchSize(100);
        RecordMapper mapper = mapper();
        if (mapper != null) {
            jobBuilder.mapper(mapper);
        }
        RecordProcessor processor = processor();
        if (processor != null) {
            jobBuilder.processor(processor);
        }
        jobBuilder.readerListener(customReaderListener(result.getJobId()));
        jobBuilder.writerListener(customWriterListener(result.getJobId()));
        jobBuilder.pipelineListener(customPipelineListener(result.getJobId()));
        Job job = jobBuilder.build();
        JobReport jobReport = jobExecutor.execute(job);
        result.setJobReport(jobReport.getStatus().toString());
        return result;
    }
    
    
}
```
```java
@Data
@AllArgsConstructor
@Slf4j
public class BatchResult {

    private String jobId;
    private long xxlJobId;
    /**
     * 总分发记录数
     */
    private Long totalNum;
    /**
     * 当前分发记录序号
     */
    private Long currentNum;
    /**
     * 单次写请求的数据量
     */
    private Integer batchSize;
    private Boolean success;
    private String msg;
    private String jobReport;
    private int successNum;
    private int errorNum;
}
```
