### Neo4j
 
#### 节点简单命令

1. CREATE命令：创建节点命令
2. MATCH命令：查询命令
3. RETURN命令：返回数据命令
4. DELETE命令：删除命令，可以用于删除节点和关联节点信息
5. REMOVE命令：可以用于删除标签和属性

#### 单个节点操作

```
CREATE (emp:Employee) --创建节点emp,它的标签名称为EMployee
CREATE (m:Movie:Cinema:Film:Picture) --创建节点m,它有多个标签名称
```

```
CREATE (dept:Dept { deptno:10,dname:"Accounting",location:"Hyderabad" }) --创建节点dept,它的标签名称为Dept,它的属性为 deptno\dname\location
```

```
MATCH (dept: Dept)
RETURN dept.deptno,dept.dname --检索节点dept,获取其属性deptno/dname
```

#### 多个节点操作

```
match(n) return n -- 获取所有节点
match (n) detach delete n --删除所有节点
```

#### 单个关系操作

```
CREATE (p1:Profile1)-[r1:LIKES]->(p2:Profile2) --创建节点p1,p2, p1(From Node)指向p2(To Node)的关系是r1
```

#### WHERE + (布尔运算)

```
match(dept:Person) where dept.deptName='设计部' return dept  --获取节点dept中属性deptName为设计部的节点
```

#### 创建关系

```
match  (c:CC),(b:BB) where c.name='hahhah'  create (c)-[r1:RRR{name:'shshshshs'}]->(b) return r1
```

#### DELETE和REMOVE

DELETE操作用于删除节点和关联关系。
REMOVE操作用于删除标签和属性。

```
create (:Test{name:'aaa'})
create (:Test{name:'bbb'})
match (a:Test),(b:Test) where a.name='aaa' and b.name='bbb' create (a)-[:RT{type:'ha'}]->(b)

match (a:Test) delete a --删除标签为Test的节点
match (a:Test)-[rel]-(b:Test) delete a,rel,b  --删除标签为Test和其关系
match (a:Test) where a.name='aaa' remove a.name --移除标签为Test的节点的name
```

#### SET

```
match (a:Test) where id(a)=16 set a.name = 'aaa' return a --对id=16的标签Test的a节点设置属性 name='aaa'
```

#### ORDER　BY

类似于SQL,加在return * 后面即可

#### UNOIN和UNOIN ALL

类似于SQL

```
match (a:Test) return a.name as name union all match(a:Test) return a.name as name --没有去重
match (a:Test) return a.name as name union  match(a:Test) return a.name as name -- 去重后的结果
```

#### LIMIT和SKIP

类似于SQL

```
match (a:Test) return a limit 1 -- 返回结果中的第一行
match (a:Test) return a skip 1 --跳过结果中的第一行
```

#### MERGE

merge = create + match
如果没有结果,则新增,有的话返回

#### 关系函数

1. STARTNODE 用于知道关系的开始节点。
2. ENDNODE    它用于知道关系的结束节点。
3. ID 它用于知道关系的ID。
4. TYPE   它用于知道字符串表示中的一个关系的TYPE。


### 测试

```
match (n) detach delete n
create (cetc:Czdw{name:'15'})
create (zd:Czdw{name:'ce'})
create (ht1:Htxx{name:'ht1'})
create (ht2:Htxx{name:'ht2'})
create (jds1:Jds{name:'1'})
create (jds2:Jds{name:'2'})
-- match的时候节点标签只要对了,标签前面的可以理解为别名,根据别名.属性找到对应的节点即可
match  (n:Czdw),(j:Jds) where n.name='15' and j.name='1' create (n)<-[r1:R1{type:'监管'}]-(j) return r1
match  (n:Czdw),(h:Htxx) where n.name='15' and h.name='ht1' create (n)-[r2:R2{type:'执行'}]->(h) return r2

match  (n:Czdw),(j:Jds) where n.name='ce' and j.name='2' create (n)<-[r11:R1{type:'监管'}]-(j) return r11
match  (n:Czdw),(h:Htxx) where n.name='ce' and h.name='合同2' create (n)-[r22:R2{type:'执行'}]->(h) return r22

match  (n1:Jds),(n2:Jds) where n1.name='1' and n2.name='2' create (n1)-[r3:R3{type:'同级'}]->(n2) return r3
```

```
neo4j-admin import --mode=csv --database=test.db --nodes "D:\Java\neo4j-3.5.24\import\htxx.csv" --nodes "D:\Java\neo4j-3.5.24\import\jds.csv" --relationships "D:\Java\neo4j-3.5.24\import\r.csv"


neo4j-admin import --mode=csv --database test.db --nodes:Category “D:\Java\neo4j-3.5.24\import\profession.csv” --relationships “F:\neo4j-community-3.5.5-windows\neo4j-community-3.5.5\import\shuyu_to_biaozhun.csv” --ignore-extra-columns=true --ignore-missing-nodes=true --ignore-duplicate-nodes=true
```
