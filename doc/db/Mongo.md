## 动态关联查询
 
根据 type 动态关联不同的 document进行连接查询

```js

        const uri = 'mongodb://test:123456789@10.13.0.58:27017/test?authSource=admin'; // 替换为你的MongoDB连接字符串
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('test'); // 替换为你的数据库名称
        const usersCollection = database.collection('user');
        const pipeline = [
            {
                $lookup: {
                    from: 'order1',
                    localField: '_id',
                    foreignField: 'uid',
                    as: 'fromA'
                }
            },
            {
                $lookup: {
                    from: 'order2',
                    localField: '_id',
                    foreignField: 'uid',
                    as: 'fromB'
                }
            },
            {
                $addFields: {
                    info: {
                        $cond: {
                            if: {$eq: ["$type", '1']},
                            then: "$fromA",
                            else: "$fromB"
                        }
                    }
                }
            },
            {
                $project: {
                    fromA: 0,
                    fromB: 0
                }
            }
        ];
        const cursor = usersCollection.aggregate(pipeline);
        const results = await cursor.toArray();
```        