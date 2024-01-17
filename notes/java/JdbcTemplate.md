## key转换为大写/小写

重写ColumnMapRowMapper
```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class JdbcTests {
    JdbcTemplate jdbcTemplate = new JdbcTemplate();
    @BeforeAll
    public void before() {
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setPort(3306);
        dataSource.setUser("root");
        dataSource.setPassword("@@@@@");
        dataSource.setServerName("39.97.243.43");
        jdbcTemplate.setDataSource(dataSource);
    }


    @Test
    @SneakyThrows
    public void a1() {
        String sql = "select * from test.demo";
        List<Map<String, Object>> query = jdbcTemplate.query(sql, new ColumnMapRowMapper(){
            protected String getColumnKey(String columnName) {
                return columnName.toUpperCase();
            }
        });
        System.out.println(query);
    }
}
```

## QueryForSteam 使用 数据库连接池的超时的问题

> https://blog.csdn.net/u010916254/article/details/127091549

stream 模式需要显示关闭，否则会造成链接不能释放，链接池会满了，之后就不能使用了，参考内部处理

```
@Override
	public <T> Stream<T> queryForStream(String sql, RowMapper<T> rowMapper) throws DataAccessException {
		class StreamStatementCallback implements StatementCallback<Stream<T>>, SqlProvider {
			@Override
			public Stream<T> doInStatement(Statement stmt) throws SQLException {
				ResultSet rs = stmt.executeQuery(sql);
				Connection con = stmt.getConnection();
				return new ResultSetSpliterator<>(rs, rowMapper).stream().onClose(() -> {
					JdbcUtils.closeResultSet(rs);
					JdbcUtils.closeStatement(stmt);
					DataSourceUtils.releaseConnection(con, getDataSource());
				});
			}
			@Override
			public String getSql() {
				return sql;
			}
		}

		return result(execute(new StreamStatementCallback(), false));
	}
```

对于stream 进行释放处理，可以声明式关闭或者使用try resource 模式

```
try(Stream<Conf> streamB = jdbcTemplate.queryForStream(
     "select * from sys.sys_config", new BeanPropertyRowMapper<>(Conf.class))){
     System.out.println(streamB.findFirst().get().toString());
     return "ok";
  }

```

