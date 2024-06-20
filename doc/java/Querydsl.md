## 依赖

classifier可配置jakarta 针对jdk8以上

```
        <dependency>
            <groupId>com.querydsl</groupId>
            <artifactId>querydsl-sql</artifactId>
            <version>5.1.0</version>
        </dependency>
        <dependency>
            <groupId>com.querydsl</groupId>
            <artifactId>querydsl-apt</artifactId>
            <version>5.1.0</version>
            <classifier>jakarta</classifier>
        </dependency>
        <dependency>
            <groupId>com.querydsl</groupId>
            <artifactId>querydsl-jpa</artifactId>
            <version>5.1.0</version>
            <classifier>jakarta</classifier>
        </dependency>
```

## 子查询

```java
 public CommandLineRunner demo1(EntityManager entityManager) {
    JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
    // 子查询 select * from t_user where start = (select min(start) from t_user)
    List<User> fetch = queryFactory.selectFrom(QUser.user)
            .where(QUser.user.start.eq(SQLExpressions.select(QUser.user.start.min()).from(QUser.user)))
            .fetch();
    System.out.println(fetch);
    return args -> {
    };
}
```