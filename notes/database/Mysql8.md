## Window Function
> [https://baijiahao.baidu.com/s?id=1728966619393719484&wfr=spider&for=pc](https://baijiahao.baidu.com/s?id=1728966619393719484&wfr=spider&for=pc)

类比oracle的 ROW_NUMBER() PARTITION BY,分组后排序
```java
   SELECT stu_id,name,subject,score,
    ROW_NUMBER() OVER (PARTITION BY subject ORDER BY score DESC) AS ROW_NUM,
    DENSE_RANK() OVER (PARTITION BY subject ORDER BY score DESC) AS DENSE_RK,
    RANK() OVER (PARTITION BY subject ORDER BY score DESC) AS RK
   FROM tb_score ts ;
```


