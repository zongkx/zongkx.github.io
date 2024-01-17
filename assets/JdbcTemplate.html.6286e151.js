import{_ as n,a as s}from"./app.d740ecc1.js";const a={},t=s(`<h2 id="key\u8F6C\u6362\u4E3A\u5927\u5199-\u5C0F\u5199" tabindex="-1"><a class="header-anchor" href="#key\u8F6C\u6362\u4E3A\u5927\u5199-\u5C0F\u5199" aria-hidden="true">#</a> key\u8F6C\u6362\u4E3A\u5927\u5199/\u5C0F\u5199</h2><p>\u91CD\u5199ColumnMapRowMapper</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@TestInstance</span><span class="token punctuation">(</span><span class="token class-name">TestInstance<span class="token punctuation">.</span>Lifecycle</span><span class="token punctuation">.</span><span class="token constant">PER_CLASS</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JdbcTests</span> <span class="token punctuation">{</span>
    <span class="token class-name">JdbcTemplate</span> jdbcTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@BeforeAll</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MysqlDataSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MysqlDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">3306</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUser</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;@@@@@&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setServerName</span><span class="token punctuation">(</span><span class="token string">&quot;39.97.243.43&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jdbcTemplate<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">a1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">&quot;select * from test.demo&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> query <span class="token operator">=</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ColumnMapRowMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getColumnKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> columnName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> columnName<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="queryforsteam-\u4F7F\u7528-\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u7684\u8D85\u65F6\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#queryforsteam-\u4F7F\u7528-\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u7684\u8D85\u65F6\u7684\u95EE\u9898" aria-hidden="true">#</a> QueryForSteam \u4F7F\u7528 \u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u7684\u8D85\u65F6\u7684\u95EE\u9898</h2><blockquote><p>https://blog.csdn.net/u010916254/article/details/127091549</p></blockquote><p>stream \u6A21\u5F0F\u9700\u8981\u663E\u793A\u5173\u95ED\uFF0C\u5426\u5219\u4F1A\u9020\u6210\u94FE\u63A5\u4E0D\u80FD\u91CA\u653E\uFF0C\u94FE\u63A5\u6C60\u4F1A\u6EE1\u4E86\uFF0C\u4E4B\u540E\u5C31\u4E0D\u80FD\u4F7F\u7528\u4E86\uFF0C\u53C2\u8003\u5185\u90E8\u5904\u7406</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Override
	public &lt;T&gt; Stream&lt;T&gt; queryForStream(String sql, RowMapper&lt;T&gt; rowMapper) throws DataAccessException {
		class StreamStatementCallback implements StatementCallback&lt;Stream&lt;T&gt;&gt;, SqlProvider {
			@Override
			public Stream&lt;T&gt; doInStatement(Statement stmt) throws SQLException {
				ResultSet rs = stmt.executeQuery(sql);
				Connection con = stmt.getConnection();
				return new ResultSetSpliterator&lt;&gt;(rs, rowMapper).stream().onClose(() -&gt; {
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u5BF9\u4E8Estream \u8FDB\u884C\u91CA\u653E\u5904\u7406\uFF0C\u53EF\u4EE5\u58F0\u660E\u5F0F\u5173\u95ED\u6216\u8005\u4F7F\u7528try resource \u6A21\u5F0F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>try(Stream&lt;Conf&gt; streamB = jdbcTemplate.queryForStream(
     &quot;select * from sys.sys_config&quot;, new BeanPropertyRowMapper&lt;&gt;(Conf.class))){
     System.out.println(streamB.findFirst().get().toString());
     return &quot;ok&quot;;
  }

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,9);function e(p,c){return t}var o=n(a,[["render",e],["__file","JdbcTemplate.html.vue"]]);export{o as default};
