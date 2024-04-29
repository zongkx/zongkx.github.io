## 简介

## 内嵌式服务

```xml

<dependencies>
    <dependency>
        <groupId>io.debezium</groupId>
        <artifactId>debezium-connector-mysql</artifactId>
        <version>1.9.8.Final</version>
    </dependency>
    <dependency>
        <groupId>io.debezium</groupId>
        <artifactId>debezium-embedded</artifactId>
        <version>1.9.8.Final</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
```

```java
public EmbeddedEngine embeddedEngine(DbtDb db,
                                     Class<? extends RelationalBaseSourceConnector> connector,
                                     List<String> includeTables,
                                     MysqlToDuckDBCDCHandler handler) {
    try {
        String name = db.getIp().replaceAll("\\.", "_") + "_dbt_";
        String os = System.getProperty("os.name").toLowerCase();
        Configuration configuration = Configuration.create()
                .with("connector.class", connector.getCanonicalName())
                .with("offset.storage", FileOffsetBackingStore.class.getCanonicalName())
                .with("offset.storage.file.filename", os.contains("win") ? "C:\\comen\\" + name + "offset.dat" : "/" + name + "offset.dat")
                .with("database.server.name", "my_app_db")
                .with("name", "dbt-connector")
                .with("snapshot.mode", "initial")
                .with("database.serverTimezone", "GMT+8")
                .with("database.hostname", db.getIp())
                .with("database.port", db.getPort())
                .with("database.user", db.getUserName())
                .with("database.dbname", db.getDb())
                .with("database.password", db.getPassword())
                .with("database.server.id", "123456")
                .with("table.include.list", Strings.join(",", includeTables))
                .with("include.schema.changes", "false")
                .with("database.history", FileDatabaseHistory.class.getCanonicalName())
                .with("database.history.file.filename", os.contains("win") ? "C:\\comen\\" + name + "bak.dat" : "/" + name + "bak.dat")
                .build();
        return EmbeddedEngine
                .create()
                .using(configuration)
                .notifying(handler::handleEvent).build();
    } catch (Exception e) {
        log.error("dbt cdc embedded engine init error", e);
        return null;
    }
}

```

```java
public enum CDCOperation {

    READ("r"),
    CREATE("c"),
    UPDATE("u"),
    DELETE("d");

    private final String code;

    CDCOperation(String code) {
        this.code = code;
    }

    public static CDCOperation forCode(String code) {
        CDCOperation[] var1 = values();
        for (CDCOperation op : var1) {
            if (op.code().equalsIgnoreCase(code)) {
                return op;
            }
        }
        return null;
    }

    public String code() {
        return this.code;
    }
}
```

```java
public void handleEvent(SourceRecord sourceRecord) {
    Struct sourceRecordValue = (Struct) sourceRecord.value();
    if (sourceRecordValue != null) {
        CDCOperation operation;
        try {
            String s = (String) sourceRecordValue.get(OPERATION);
            operation = CDCOperation.forCode(s);
            String tableName;
            if (operation != null && operation != CDCOperation.READ) {
                if (operation == CDCOperation.DELETE) {
                    Struct before = (Struct) sourceRecordValue.get(BEFORE);
                    tableName = tableName(before.schema().name());
                    Object o = before.get("id");
                    // do something
                } else {
                    Struct after = (Struct) sourceRecordValue.get(AFTER);
                    tableName = tableName(after.schema().name());
                    Map<String, Object> message = after.schema().fields().stream()
                            .map(Field::name)
                            .filter(fieldName -> after.get(fieldName) != null)
                            .map(fieldName -> Pair.of(fieldName, after.get(fieldName)))
                            .collect(toMap(Pair::getKey, Pair::getValue));
                    List<String> values = new ArrayList<>();
                    List<Field> fields = after.schema().fields();
                    for (Field field : fields) {
                        Object o = message.getOrDefault(field.name(), null);
                        String typeName = field.schema().name();
                        if (Objects.isNull(o)) {
                            values.add(null);
                        } else {
                            if (MicroTimestamp.class.getCanonicalName().equals(typeName)) {
                                LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(Long.parseLong(o.toString()) / 1000), ZoneId.systemDefault());
                                o = localDateTime.format(formatter1);
                            }
                            if (Timestamp.class.getCanonicalName().equals(typeName) || Date.class.getCanonicalName().equals(typeName)) {
                                LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(Long.parseLong(o.toString())), ZoneId.systemDefault());
                                o = localDateTime.format(formatter2);
                            }
                            values.add("'" + o + "'");
                        }
                    }
                    // do something
                    log.info("dbt cdc data  changed: {} with operation: {}", tableName, operation.name());
                }
            }
        } catch (Exception e) {
            log.error("dbt cdc error", e);
        }
    }

}
```