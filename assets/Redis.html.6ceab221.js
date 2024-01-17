import{_ as l,o as p,c as i,b as n,d as r,F as b,a as s,e,r as t}from"./app.d740ecc1.js";const u={},c=s(`<h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h1><p>\u4F18\u70B9\uFF1A</p><ol><li>\u8BFB\u5199\u6027\u80FD\u4F18\u79C0\uFF08\u57FA\u4E8E\u5185\u5B58\u3001\u91C7\u7528\u5355\u7EBF\u7A0B\u907F\u514D\u4E86\u4E0D\u5FC5\u8981\u7684\u4E0A\u4E0B\u6587\u5207\u6362\u548C\u7ADE\u4E89\u6761\u4EF6\u3001\u4F7F\u7528\u591A\u8DEFIO\u590D\u7528\u6A21\u578B\uFF0C\u975E\u963B\u585EIO\u3001\u6570\u636E\u7ED3\u6784\u7B80\u5355\u4E14\u4E30\u5BCC\uFF09</li><li>\u652F\u6301\u6570\u636E\u6301\u4E45\u5316\uFF08AOF\u3001RDB\uFF09</li><li>\u652F\u6301\u4E8B\u52A1\uFF0CRedis\u7684\u6240\u6709\u64CD\u4F5C\u90FD\u662F\u539F\u5B50\u6027\u7684\uFF0C\u540C\u65F6\u8FD8\u652F\u6301\u51E0\u4E2A\u64CD\u4F5C\u5408\u5E76\u540E\u7684\u539F\u5B50\u6027\u6267\u884C</li><li>\u652F\u6301\u4E3B\u4ECE\u590D\u5236\uFF0C\u4E3B\u673A\u4F1A\u81EA\u52A8\u5C06\u6570\u636E\u540C\u6B65\u5230\u4ECE\u673A\uFF0C\u53EF\u4EE5\u8FDB\u884C\u8BFB\u5199\u5206\u79BB</li></ol><p>\u7F3A\u70B9\uFF1A</p><ol><li>\u53D7\u9650\u4E8E\u7269\u7406\u5185\u5B58\uFF0C\u4E0D\u9002\u5408\u5927\u91CF\u6570\u636E\u9AD8\u6027\u80FD\u8BFB\u5199\uFF0C\u9002\u5408\u4F5C\u4E3A\u7F13\u5B58\uFF0C</li><li>\u4E0D\u5177\u5907\u81EA\u52A8\u5BB9\u9519\u548C\u6062\u590D\u529F\u80FD\uFF0C\u5B58\u5728\u6570\u636E\u4E0D\u4E00\u81F4\u6027\u7684\u95EE\u9898\uFF08\u4E3B\u673A\u5B95\u673A\uFF0C\u6570\u636E\u672A\u53CA\u65F6\u540C\u6B65\uFF09</li></ol><h2 id="\u6570\u636E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B" aria-hidden="true">#</a> \u6570\u636E\u7C7B\u578B</h2><h3 id="\u5B57\u7B26\u4E32string" tabindex="-1"><a class="header-anchor" href="#\u5B57\u7B26\u4E32string" aria-hidden="true">#</a> \u5B57\u7B26\u4E32String</h3><p>\u53EF\u5B58\u50A8\uFF1A\u5B57\u7B26\u4E32\u3001\u6574\u6570\u6216\u8005\u6D6E\u70B9\u6570\uFF1B \u64CD\u4F5C\uFF1A\u5BF9\u6574\u4E2A\u5B57\u7B26\u4E32\u6216\u5176\u4E2D\u4E00\u90E8\u5206\u6267\u884C\u64CD\u4F5C\uFF1B\u5BF9\u6574\u6570\u6216\u6D6E\u70B9\u6570\u81EA\u589E\u6216\u81EA\u51CF \u5E94\u7528\uFF1A\u9002\u7528\u4E8E\u7B80\u5355\u7684\u952E\u503C\u5BF9\u7F13\u5B58</p><blockquote><p>\u9002\u5408\u6700\u7B80\u5355\u7684k-v\u5B58\u50A8\uFF0C\u7C7B\u4F3C\u4E8Ememcached\u7684\u5B58\u50A8\u7ED3\u6784\uFF0C\u77ED\u4FE1\u9A8C\u8BC1\u7801\uFF0C\u914D\u7F6E\u4FE1\u606F\u7B49\uFF0C\u5C31\u7528\u8FD9\u79CD\u7C7B\u578B\u6765\u5B58\u50A8\u3002</p></blockquote><h3 id="\u54C8\u5E0C-hash" tabindex="-1"><a class="header-anchor" href="#\u54C8\u5E0C-hash" aria-hidden="true">#</a> \u54C8\u5E0C hash</h3><p>\u53EF\u5B58\u50A8\uFF1A\u5305\u542B\u952E\u503C\u5BF9\u7684\u65E0\u5E8F\u6563\u5217\u8868 \u64CD\u4F5C\uFF1A\u6DFB\u52A0\u83B7\u53D6\u79FB\u9664\u5355\u4E2A\u952E\u503C\u5BF9\uFF1B\u83B7\u53D6\u6240\u6709\u952E\u503C\u5BF9\uFF1B\u68C0\u67E5\u67D0\u4E2A\u952E\u662F\u5426\u5B58\u5728 \u5E94\u7528\uFF1A\u7ED3\u6784\u5316\u7684\u6570\u636E\uFF0C\u6BD4\u5982\u4E00\u4E2A\u5BF9\u8C61</p><blockquote><p>\u4E00\u822Ckey\u4E3AID\u6216\u8005\u552F\u4E00\u6807\u793A\uFF0Cvalue\u5BF9\u5E94\u7684\u5C31\u662F\u8BE6\u60C5\u4E86\u3002\u5982\u5546\u54C1\u8BE6\u60C5\uFF0C\u4E2A\u4EBA\u4FE1\u606F\u8BE6\u60C5\uFF0C\u65B0\u95FB\u8BE6\u60C5\u7B49\u3002</p></blockquote><h3 id="\u5217\u8868" tabindex="-1"><a class="header-anchor" href="#\u5217\u8868" aria-hidden="true">#</a> \u5217\u8868</h3><p>\u53EF\u5B58\u50A8\uFF1A\u5217\u8868 list \u64CD\u4F5C\uFF1A\u4ECE\u4E24\u8FB9\u538B\u5165\u6216\u5F39\u51FA\u5143\u7D20\uFF1B\u5BF9\u5355\u4E2A\u591A\u4E2A\u5143\u7D20\u4FEE\u526A\uFF1B\u53EA\u4FDD\u7559\u4E00\u4E2A\u8303\u56F4\u5185\u7684\u5143\u7D20 \u5E94\u7528\uFF1A\u5B58\u50A8\u4E00\u4E9B\u5217\u8868\u578B\u7684\u6570\u636E\uFF0C\u7C7B\u4F3C**\u5217\u8868</p><blockquote><p>\u56E0\u4E3Alist\u662F\u6709\u5E8F\u7684\uFF0C\u6BD4\u8F83\u9002\u5408\u5B58\u50A8\u4E00\u4E9B\u6709\u5E8F\u4E14\u6570\u636E\u76F8\u5BF9\u56FA\u5B9A\u7684\u6570\u636E\u3002\u5982\u7701\u5E02\u533A\u8868\u3001\u5B57\u5178\u8868\u7B49\u3002\u56E0\u4E3Alist\u662F\u6709\u5E8F\u7684\uFF0C\u9002\u5408\u6839\u636E\u5199\u5165\u7684\u65F6\u95F4\u6765\u6392\u5E8F\uFF0C\u5982\uFF1A\u6700\u65B0\u7684***\uFF0C\u6D88\u606F\u961F\u5217\u7B49\u3002</p></blockquote><h3 id="\u96C6\u5408-set" tabindex="-1"><a class="header-anchor" href="#\u96C6\u5408-set" aria-hidden="true">#</a> \u96C6\u5408 set</h3><p>\u53EF\u5B58\u50A8\uFF1A\u65E0\u9700\u96C6\u5408 \u64CD\u4F5C\uFF1A\u6DFB\u52A0\u83B7\u53D6\u79FB\u9664\u5355\u4E2A\u5143\u7D20\uFF1B\u67E5\u627E\u67D0\u4E2A\u5143\u7D20\uFF1B\u8BA1\u7B97\u4EA4\u96C6\u3001\u5E76\u96C6\u3001\u5DEE\u96C6\uFF1B\u83B7\u53D6\u67D0\u4E2A\u5143\u7D20 \u5E94\u7528\uFF1A\u4EA4\u96C6\u3001\u5DEE\u96C6\u3001\u5E76\u96C6\u64CD\u4F5C</p><blockquote><p>\u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3AID-List\u7684\u6A21\u5F0F\uFF0C\u5982\u5FAE\u535A\u4E2D\u4E00\u4E2A\u4EBA\u6709\u54EA\u4E9B\u597D\u53CB\uFF0Cset\u6700\u725B\u7684\u5730\u65B9\u5728\u4E8E\uFF0C\u53EF\u4EE5\u5BF9\u4E24\u4E2Aset\u63D0\u4F9B\u4EA4\u96C6\u3001\u5E76\u96C6\u3001\u5DEE\u96C6\u64CD\u4F5C\u3002\u4F8B\u5982\uFF1A\u67E5\u627E\u4E24\u4E2A\u4EBA\u5171\u540C\u7684\u597D\u53CB\u7B49\u3002</p></blockquote><h3 id="\u6709\u5E8F\u96C6\u5408zset" tabindex="-1"><a class="header-anchor" href="#\u6709\u5E8F\u96C6\u5408zset" aria-hidden="true">#</a> \u6709\u5E8F\u96C6\u5408Zset</h3><p>\u53EF\u5B58\u50A8\uFF1A\u6709\u5E8F\u96C6\u5408 \u64CD\u4F5C\uFF1A\u6DFB\u52A0\u83B7\u53D6\u5220\u9664\u5143\u7D20\uFF1B\u6839\u636E\u8303\u56F4\u83B7\u53D6\u5143\u7D20\u6392\u540D\uFF1B \u5E94\u7528\uFF1A\u53BB\u91CD\u4E14\u6392\u5E8F</p><blockquote><p>\u6392\u5E8F</p></blockquote><h2 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h2><ul><li>\u8BA1\u6570\u5668\uFF1A\u53EF\u4EE5\u5BF9String\u81EA\u589E\u81EA\u51CF\u5B9E\u73B0\u8BA1\u6570\u5668\u529F\u80FD\u3002</li><li>\u7F13\u5B58\uFF1A\u5C06\u70ED\u70B9\u6570\u636E\u653E\u5230\u5185\u5B58\u4E2D\uFF0C\u8BBE\u7F6E\u5185\u5B58\u7684\u6700\u5927\u4F7F\u7528\u91CF\u4EE5\u53CA\u6DD8\u6C70\u673A\u5236\u4FDD\u8BC1\u7F13\u5B58\u547D\u4E2D\u7387</li><li>\u4F1A\u8BDD\u7F13\u5B58\uFF1A\u53EF\u4EE5\u4F7F\u7528 Redis \u6765\u7EDF\u4E00\u5B58\u50A8\u591A\u53F0\u5E94\u7528\u670D\u52A1\u5668\u7684\u4F1A\u8BDD\u4FE1\u606F\u3002\u5F53\u5E94\u7528\u670D\u52A1\u5668\u4E0D\u518D\u5B58\u50A8\u7528\u6237\u7684\u4F1A\u8BDD\u4FE1\u606F\uFF0C\u4E5F\u5C31\u4E0D\u518D\u5177\u6709\u72B6\u6001\uFF0C\u4E00\u4E2A\u7528\u6237\u53EF\u4EE5\u8BF7\u6C42\u4EFB\u610F\u4E00\u4E2A\u5E94\u7528\u670D\u52A1\u5668\uFF0C\u4ECE\u800C\u66F4\u5BB9\u6613\u5B9E\u73B0\u9AD8\u53EF\u7528\u6027\u4EE5\u53CA\u53EF\u4F38\u7F29\u6027</li><li>\u67E5\u627E\u8868\uFF1A\u7528\u4E8E\u83B7\u53D6\u4E0D\u53EF\u9760\u6570\u636E\u7684\u5FEB\u901F\u67E5\u8BE2</li><li>\u6D88\u606F\u961F\u5217\uFF1A\u5229\u7528list\u53CC\u5411\u94FE\u8868\u7684\u7279\u6027\uFF0C\u53EF\u4EE5\u901A\u8FC7lpush\u548Clpop\u5199\u5165\u548C\u8BFB\u53D6\u6D88\u606F\uFF0C\u66F4\u4E3B\u6D41\u7684\u662FRabbitMQ\u7B49\u6D88\u606F\u4E2D\u95F4\u4EF6\u3002</li><li>SET\u548CZSET\uFF1A\u53D6\u4EA4\u96C6\u3001\u5DEE\u96C6\u7B49\u64CD\u4F5C\uFF1B\u6392\u5E8F</li></ul><h2 id="\u6301\u4E45\u5316" tabindex="-1"><a class="header-anchor" href="#\u6301\u4E45\u5316" aria-hidden="true">#</a> \u6301\u4E45\u5316</h2><p>\u5C06\u5185\u5B58\u4E2D\u7684\u6570\u636E\u5199\u5165\u5230\u78C1\u76D8\uFF0C\u9632\u6B62\u6570\u636E\u4E22\u5931</p><h3 id="rdb-\u9ED8\u8BA4" tabindex="-1"><a class="header-anchor" href="#rdb-\u9ED8\u8BA4" aria-hidden="true">#</a> RDB\uFF08\u9ED8\u8BA4\uFF09</h3><p>Redis DataBase\uFF1A\u6309\u7167\u4E00\u5B9A\u7684\u65F6\u95F4\u5C06\u5185\u5B58\u7684\u6570\u636E\u4EE5\u5FEB\u7167\u7684\u5F62\u5F0F\u4FDD\u5B58\u5230\u786C\u76D8\u4E2D\uFF0C\u5BF9\u5E94\u4EA7\u751F\u7684\u6570\u636E\u6587\u4EF6\u4E3Adump.rdb\u3002\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684save\u53C2\u6570\u6765\u5B9A\u4E49\u5FEB\u7167\u7684\u5468\u671F\u3002 \u5176\u7F3A\u70B9\u662F\uFF1A\u6570\u636E\u5B89\u5168\u6027\u4F4E\uFF0CRDB\u662F\u95F4\u9694\u4E00\u6BB5\u65F6\u95F4\u8FDB\u884C\u6301\u4E45\u5316\uFF0C\u671F\u95F4\u51FA\u73B0\u5B95\u673A\u5BFC\u81F4\u6570\u636E\u4E22\u5931\u3002</p><h3 id="aof" tabindex="-1"><a class="header-anchor" href="#aof" aria-hidden="true">#</a> AOF</h3><p>Append Only File\uFF1ARedis\u6267\u884C\u7684\u6BCF\u6B21\u5199\u547D\u4EE4\u8BB0\u5F55\u5230\u5355\u72EC\u7684\u65E5\u5FD7\u6587\u4EF6\u4E2D\uFF0C\u5F53\u91CD\u542FRedis\u4F1A\u91CD\u65B0\u5C06\u6301\u4E45\u5316\u7684\u65E5\u5FD7\u4E2D\u6587\u4EF6\u6062\u590D\u6570\u636E\u3002 \u4F18\u70B9\uFF1A</p><ol><li>\u6570\u636E\u5B89\u5168\uFF0Caof \u6301\u4E45\u5316\u53EF\u4EE5\u914D\u7F6E appendfsync \u5C5E\u6027\uFF0C\u6709 always\uFF0C\u6BCF\u8FDB\u884C\u4E00\u6B21 \u547D\u4EE4\u64CD\u4F5C\u5C31\u8BB0\u5F55\u5230 aof \u6587\u4EF6\u4E2D\u4E00\u6B21\u3002</li><li>\u901A\u8FC7 append \u6A21\u5F0F\u5199\u6587\u4EF6\uFF0C\u5373\u4F7F\u4E2D\u9014\u670D\u52A1\u5668\u5B95\u673A\uFF0C\u53EF\u4EE5\u901A\u8FC7 redis-check-aof \u5DE5\u5177\u89E3\u51B3\u6570\u636E\u4E00\u81F4\u6027\u95EE\u9898\u3002</li><li>AOF \u673A\u5236\u7684 rewrite \u6A21\u5F0F\u3002AOF \u6587\u4EF6\u6CA1\u88AB rewrite \u4E4B\u524D\uFF08\u6587\u4EF6\u8FC7\u5927\u65F6\u4F1A\u5BF9\u547D\u4EE4 \u8FDB\u884C\u5408\u5E76\u91CD\u5199\uFF09\uFF0C\u53EF\u4EE5\u5220\u9664\u5176\u4E2D\u7684\u67D0\u4E9B\u547D\u4EE4\uFF08\u6BD4\u5982\u8BEF\u64CD\u4F5C\u7684 flushall\uFF09)</li></ol><p>\u7F3A\u70B9:</p><ol><li>AOF \u6587\u4EF6\u6BD4 RDB \u6587\u4EF6\u5927\uFF0C\u4E14\u6062\u590D\u901F\u5EA6\u6162\u3002</li><li>\u6570\u636E\u96C6\u5927\u7684\u65F6\u5019\uFF0C\u6BD4 rdb \u542F\u52A8\u6548\u7387\u4F4E\u3002</li></ol><h2 id="\u4E8B\u52A1" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u52A1" aria-hidden="true">#</a> \u4E8B\u52A1</h2><p>\u539F\u5B50\u6027:\u4E8B\u52A1\u4E2D\u7684\u64CD\u4F5C\u8981\u4E48\u90FD\u53D1\u751F\uFF0C\u8981\u4E48\u90FD\u4E0D\u53D1\u751F \u4E00\u81F4\u6027\uFF1A\u4E8B\u52A1\u6267\u884C\u524D\u540E\u6570\u636E\u5B8C\u6574\u6027\u4E00\u81F4 \u9694\u79BB\u6027\uFF1A\u5E76\u53D1\u6267\u884C\u7684\u4E92\u4E0D\u5F71\u54CD \u6301\u4E45\u6027\uFF1A\u4E8B\u52A1\u4E00\u65E6\u63D0\u4EA4\uFF0C\u6570\u636E\u5C31\u6C38\u4E45\u88AB\u4FEE\u6539 Redis\u4E8B\u52A1\u603B\u662F\u4FDD\u8BC1\u4E00\u81F4\u6027\u548C\u9694\u79BB\u6027\u3002\u5F53\u670D\u52A1\u5668\u8FD0\u884C\u5728AOF\u6301\u4E45\u5316\u6A21\u5F0F\u4E0B\uFF0C\u5E76\u4E14appendfsync\u9009\u9879\u7684\u503C\u4E3Aalways\u65F6\uFF0C\u4E8B\u52A1\u4E5F\u5177\u6709\u6301\u4E45\u6027\u3002</p><h2 id="\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u96C6\u7FA4" aria-hidden="true">#</a> \u96C6\u7FA4</h2><h3 id="\u54E8\u5175\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u54E8\u5175\u6A21\u5F0F" aria-hidden="true">#</a> \u54E8\u5175\u6A21\u5F0F</h3><p>\u54E8\u5175\u662Fredis\u96C6\u7FA4\u4E2D\u975E\u5E38\u91CD\u8981\u7684\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u8D1F\u8D23</p><ul><li>\u96C6\u7FA4\u76D1\u63A7\uFF1A\u8D1F\u8D23\u76D1\u63A7redis master\u548Cslvae\u8FDB\u7A0B</li><li>\u6D88\u606F\u901A\u77E5\uFF1A\u5982\u679C\u67D0\u4E2Aredis\u5B9E\u4F8B\u6709\u6545\u969C\uFF0C\u901A\u77E5\u7BA1\u7406\u5458</li><li>\u6545\u969C\u8F6C\u79FB\uFF1A\u5982\u679Cmaster node\u5B95\u673A\uFF0C\u4F1A\u81EA\u52A8\u8F6C\u79FB\u5230slave node</li><li>\u914D\u7F6E\u4E2D\u5FC3\uFF1A\u5982\u679C\u6545\u969C\u8F6C\u79FB\u4E86\uFF0C\u901A\u77E5client\u5BA2\u6237\u7AEF\u65B0\u7684master\u5730\u5740 \uFF08\u81F3\u5C11\u9700\u89813\u4E2A\u54E8\u5175\uFF1B\u4E0D\u4FDD\u8BC1\u6570\u636E\u96F6\u4E22\u5931\uFF0C\u4FDD\u8BC1\u9AD8\u53EF\u7528\uFF09</li></ul><h3 id="\u4E3B\u4ECE\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#\u4E3B\u4ECE\u67B6\u6784" aria-hidden="true">#</a> \u4E3B\u4ECE\u67B6\u6784</h3><p>maternode\u8D1F\u8D23\u6570\u636E\u5199\u5165\uFF0C\u5199\u5165\u4E4B\u540E\u590D\u5236\u5230\u82E5\u5E72\u4E2Aslavenode\uFF0C\u8BFB\u64CD\u4F5C\u90FD\u4ECE\u4ECE\u8282\u70B9\u53D6\u6570\u636E\u3002\uFF08\u8BFB\u5199\u5206\u79BB\uFF09</p><h2 id="springboot-demo" tabindex="-1"><a class="header-anchor" href="#springboot-demo" aria-hidden="true">#</a> SpringBoot Demo</h2><h3 id="\u4F9D\u8D56\u548C\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56\u548C\u914D\u7F6E" aria-hidden="true">#</a> \u4F9D\u8D56\u548C\u914D\u7F6E</h3><p>SpringBoot\u5E38\u7528\u7684Redis\u5BA2\u6237\u7AEF\u5982Jedis\\Lettuce\uFF0CSpringBoot2.0\u4E4B\u540E\u5DF2\u7ECF\u9ED8\u8BA4\u4F7F\u7528Lettuce\uFF0C</p><blockquote><p>Lettuce\u7684\u8FDE\u63A5\u662F\u57FA\u4E8ENetty\u7684\uFF0C\u8FDE\u63A5\u5B9E\u4F8B\u53EF\u4EE5\u5728\u591A\u4E2A\u7EBF\u7A0B\u95F4\u5171\u4EAB\uFF0C\u5982\u679C\u4F60\u4E0D\u77E5\u9053Netty\u4E5F\u6CA1\u4E8B\uFF0C\u5927\u81F4\u610F\u601D\u5C31\u662F\u4E00\u4E2A\u591A\u7EBF\u7A0B\u7684\u5E94\u7528\u53EF\u4EE5\u4F7F\u7528\u540C\u4E00\u4E2A\u8FDE\u63A5\u5B9E\u4F8B\uFF0C\u800C\u4E0D\u7528\u62C5\u5FC3\u5E76\u53D1\u7EBF\u7A0B\u7684\u6570\u91CF\u3002\u901A\u8FC7\u5F02\u6B65\u7684\u65B9\u5F0F\u53EF\u4EE5\u8BA9\u6211\u4EEC\u66F4\u597D\u5730\u5229\u7528\u7CFB\u7EDF\u8D44\u6E90\u3002 Jedis \u662F\u76F4\u8FDE\u6A21\u5F0F\uFF0C\u5728\u591A\u4E2A\u7EBF\u7A0B\u95F4\u5171\u4EAB\u4E00\u4E2A Jedis \u5B9E\u4F8B\u65F6\u662F\u7EBF\u7A0B\u4E0D\u5B89\u5168\u7684\uFF0C\u6BCF\u4E2A\u7EBF\u7A0B\u90FD\u53BB\u62FF\u81EA\u5DF1\u7684 Jedis \u5B9E\u4F8B\uFF0C\u5F53\u8FDE\u63A5\u6570\u91CF\u589E\u591A\u65F6\uFF0C\u7269\u7406\u8FDE\u63A5\u6210\u672C\u5C31\u8F83\u9AD8\u4E86\u3002</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u914D\u7F6E:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring.cache.type=Redis
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.lettuce.pool.max-active=8
spring.redis.lettuce.pool.max-idle=8
spring.redis.lettuce.pool.min-idle=0
# \u5982\u679C\u914D\u7F6E\u4E86pool,\u90A3\u4E48\u5FC5\u987B\u52A0\u5165commons-pool2\u7684\u4F9D\u8D56
        &lt;!-- redis\u4F9D\u8D56commons-pool --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
            &lt;artifactId&gt;commons-pool2&lt;/artifactId&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="redistemplate" tabindex="-1"><a class="header-anchor" href="#redistemplate" aria-hidden="true">#</a> RedisTemplate</h3><p>\u5728\u914D\u7F6E\u5B8C\u4E4B\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7\u6CE8\u5165RedisTemplate\u6765\u4F7F\u7528\u4E86,\u4E0D\u8FC7RedisTemplate\u9ED8\u8BA4\u53EA\u652F\u6301&lt;String,String&gt;\u5F62\u5F0F\u7684\uFF0C\u4E3A\u4E86\u80FD\u591F\u6269\u5C55\uFF0C\u53EF\u4EE5\u624B\u52A8\u6DFB\u52A0bean\u6765\u5B9E\u73B0\u3002\uFF08Spring-Cache\u4E5F\u53EF\u4EE5\u4F7F\u7528Redis\uFF0C\u5728\u67D0\u79CD\u60C5\u51B5\u4E0B\uFF0C\u5982\u679C\u53EF\u4EE5\u624B\u52A8\u8BFB\u5199\u7F13\u5B58\u4E5F\u53EF\u4EE5\u4E0D\u4F7F\u7528@Cache\u7B49\u6CE8\u89E3\uFF09 \u4E0B\u9762\u662F\u81EA\u5B9A\u4E49bean</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Bean
    public RedisSerializer&lt;Object&gt; redisSerializer() {

        ObjectMapper objectMapper = new ObjectMapper();
        //\u53CD\u5E8F\u5217\u5316\u65F6\u5019\u9047\u5230\u4E0D\u5339\u914D\u7684\u5C5E\u6027\u5E76\u4E0D\u629B\u51FA\u5F02\u5E38
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        //\u5E8F\u5217\u5316\u65F6\u5019\u9047\u5230\u7A7A\u5BF9\u8C61\u4E0D\u629B\u51FA\u5F02\u5E38
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //\u53CD\u5E8F\u5217\u5316\u7684\u65F6\u5019\u5982\u679C\u662F\u65E0\u6548\u5B50\u7C7B\u578B,\u4E0D\u629B\u51FA\u5F02\u5E38
        objectMapper.configure(DeserializationFeature.FAIL_ON_INVALID_SUBTYPE, false);
        //\u4E0D\u4F7F\u7528\u9ED8\u8BA4\u7684dateTime\u8FDB\u884C\u5E8F\u5217\u5316,
        objectMapper.configure(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS, false);
        //\u4F7F\u7528JSR310\u63D0\u4F9B\u7684\u5E8F\u5217\u5316\u7C7B,\u91CC\u9762\u5305\u542B\u4E86\u5927\u91CF\u7684JDK8\u65F6\u95F4\u5E8F\u5217\u5316\u7C7B
        objectMapper.registerModule(new JavaTimeModule());
        //\u542F\u7528\u53CD\u5E8F\u5217\u5316\u6240\u9700\u7684\u7C7B\u578B\u4FE1\u606F,\u5728\u5C5E\u6027\u4E2D\u6DFB\u52A0@class
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        //\u914D\u7F6Enull\u503C\u7684\u5E8F\u5217\u5316\u5668
        GenericJackson2JsonRedisSerializer.registerNullValueSerializer(objectMapper, null);
        return new GenericJackson2JsonRedisSerializer(objectMapper);

    }


    @Bean(name = &quot;redisTemplate&quot;)
    public RedisTemplate&lt;Object, Object&gt; redisTemplate(RedisConnectionFactory redisConnectionFactory, RedisSerializer&lt;Object&gt; redisSerializer) {

        RedisTemplate&lt;Object, Object&gt; template = new RedisTemplate&lt;&gt;();
        template.setConnectionFactory(redisConnectionFactory);
        template.setDefaultSerializer(redisSerializer);
        template.setValueSerializer(redisSerializer);
        template.setHashValueSerializer(redisSerializer);
        template.setKeySerializer(StringRedisSerializer.UTF_8);
        template.setHashKeySerializer(StringRedisSerializer.UTF_8);
        template.afterPropertiesSet();
        return template;
    }
 /**
     * \u5BF9hash\u7C7B\u578B\u7684\u6570\u636E\u64CD\u4F5C
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public HashOperations&lt;String, String, Object&gt; hashOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForHash();
    }

    /**
     * \u5BF9redis\u5B57\u7B26\u4E32\u7C7B\u578B\u6570\u636E\u64CD\u4F5C
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public ValueOperations&lt;String, Object&gt; valueOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForValue();
    }

    /**
     * \u5BF9\u94FE\u8868\u7C7B\u578B\u7684\u6570\u636E\u64CD\u4F5C
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public ListOperations&lt;String, Object&gt; listOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForList();
    }

    /**
     * \u5BF9\u65E0\u5E8F\u96C6\u5408\u7C7B\u578B\u7684\u6570\u636E\u64CD\u4F5C
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public SetOperations&lt;String, Object&gt; setOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForSet();
    }

    /**
     * \u5BF9\u6709\u5E8F\u96C6\u5408\u7C7B\u578B\u7684\u6570\u636E\u64CD\u4F5C
     *
     * @param redisTemplate
     * @return
     */
    @Bean
    public ZSetOperations&lt;String, Object&gt; zSetOperations(RedisTemplate redisTemplate) {
        return redisTemplate.opsForZSet();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br></div></div><p>\u5728\u7F51\u4E0A\u641C\u5230\u7684\u5927\u90E8\u5206RedisTemplate\u4E2D\u7528\u7684\u90FD\u662FJackson2JsonRedisSerializer,\u5176\u4E2D\u7684enableDefaultTyping\u8FD8\u662F\u4E00\u4E2A\u8FC7\u671F\u7684\u65B9\u6CD5,\u627E\u5230\u4E86\u4F7F\u7528GenericJackson2JsonRedisSerializer\u7684\u539F\u56E0:</p><blockquote><ol><li>\u65E0\u53C2\u6784\u9020\u8C03\u7528\u4E00\u4E2A\u53C2\u6570\u7684\u6784\u9020</li><li>\u6784\u9020\u4E2D\u521B\u5EFAObjectMapper,\u5E76\u4E14\u8BBE\u7F6E\u4E86\u4E00\u4E2ANullValueSerializer</li><li>ObjectMapper\u8BBE\u7F6E\u5305\u542B\u7C7B\u4FE1\u606F \u4E0A\u9762\u7684RedisTemplate redisTemplate\u4F5C\u4E3A\u53C2\u6570,\u5982\u679C\u76F4\u63A5\u7528RedisTemplate&lt;String,Object&gt; redisTemplate \u5728IDEA\u4E2D\u4F1A\u62A5\u4E0D\u80FD\u6CE8\u5165bean\u7684\u9519\u8BEF,\u53EA\u9700\u8981\u628Ak,v</li></ol></blockquote><p>\u5BF9\u4E8EJDK1.8\u4E2D\u7684LocalDate\u548CLocalDateTime\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0</p><blockquote><p>Caused by: com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Cannot construct instance of <code>java.time.LocalDateTime</code> (no Creators, like default construct, exist): cannot deserialize from Object value (no delegate- or property-based Creator)</p></blockquote><p>\u8FD9\u662F\u7531\u4E8ELocalDateTime\u6CA1\u7A7A\u6784\u9020,\u65E0\u6CD5\u53CD\u5C04\u8FDB\u884C\u6784\u9020,\u6240\u4EE5\u4F1A\u629B\u51FA\u5F02\u5E38.(\u5982\u679C\u81EA\u5B9A\u4E49\u7684\u5BF9\u8C61\u6CA1\u6709\u63D0\u4F9B\u9ED8\u8BA4\u6784\u9020,\u4E5F\u4F1A\u629B\u51FA\u8FD9\u4E2A\u5F02\u5E38) \u53EF\u4EE5\u5728\u8BE5\u5C5E\u6027\u4E0A\u6DFB\u52A0\u6CE8\u89E3</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@JsonDeserialize(using = LocalDateTimeDeserializer.class)
@JsonSerialize(using = LocalDateTimeSerializer.class)
private LocalDateTime createTime;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="redisutil" tabindex="-1"><a class="header-anchor" href="#redisutil" aria-hidden="true">#</a> RedisUtil</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.demo.Util;

import org.springframework.data.redis.core.BoundListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * redisTemplate\u5C01\u88C5
 *
 */
@Component
public class RedisUtils {

    @Resource
    private RedisTemplate&lt;String, Object&gt; redisTemplate;


    /**
     * \u6307\u5B9A\u7F13\u5B58\u5931\u6548\u65F6\u95F4
     * @param key \u952E
     * @param time \u65F6\u95F4(\u79D2)
     * @return
     */
    public boolean expire(String key,long time){
        try {
            if(time&gt;0){
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u6839\u636Ekey \u83B7\u53D6\u8FC7\u671F\u65F6\u95F4
     * @param key \u952E \u4E0D\u80FD\u4E3Anull
     * @return \u65F6\u95F4(\u79D2) \u8FD4\u56DE0\u4EE3\u8868\u4E3A\u6C38\u4E45\u6709\u6548
     */
    public long getExpire(String key){
        return redisTemplate.getExpire(key,TimeUnit.SECONDS);
    }

    /**
     * \u5224\u65ADkey\u662F\u5426\u5B58\u5728
     * @param key \u952E
     * @return true \u5B58\u5728 false\u4E0D\u5B58\u5728
     */
    public boolean hasKey(String key){
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5220\u9664\u7F13\u5B58
     * @param key \u53EF\u4EE5\u4F20\u4E00\u4E2A\u503C \u6216\u591A\u4E2A
     */
    @SuppressWarnings(&quot;unchecked&quot;)
    public void del(String ... key){
        if(key!=null&amp;&amp;key.length&gt;0){
            if(key.length==1){
                redisTemplate.delete(key[0]);
            }else{
                redisTemplate.delete(CollectionUtils.arrayToList(key));
            }
        }
    }

    //============================String=============================
    /**
     * \u666E\u901A\u7F13\u5B58\u83B7\u53D6
     * @param key \u952E
     * @return \u503C
     */
    public Object get(String key){
        return key==null?null:redisTemplate.opsForValue().get(key);
    }

    /**
     * \u666E\u901A\u7F13\u5B58\u653E\u5165
     * @param key \u952E
     * @param value \u503C
     * @return true\u6210\u529F false\u5931\u8D25
     */
    public boolean set(String key,Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u666E\u901A\u7F13\u5B58\u653E\u5165\u5E76\u8BBE\u7F6E\u65F6\u95F4
     * @param key \u952E
     * @param value \u503C
     * @param time \u65F6\u95F4(\u79D2) time\u8981\u5927\u4E8E0 \u5982\u679Ctime\u5C0F\u4E8E\u7B49\u4E8E0 \u5C06\u8BBE\u7F6E\u65E0\u9650\u671F
     * @return true\u6210\u529F false \u5931\u8D25
     */
    public boolean set(String key,Object value,long time){
        try {
            if(time&gt;0){
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            }else{
                set(key, value);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u9012\u589E
     * @param key \u952E
     * @param delta \u8981\u589E\u52A0\u51E0(\u5927\u4E8E0)
     * @return
     */
    public long incr(String key, long delta){
        if(delta&lt;0){
            throw new RuntimeException(&quot;\u9012\u589E\u56E0\u5B50\u5FC5\u987B\u5927\u4E8E0&quot;);
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }

    /**
     * \u9012\u51CF
     * @param key \u952E
     * @param delta \u8981\u51CF\u5C11\u51E0(\u5C0F\u4E8E0)
     * @return
     */
    public long decr(String key, long delta){
        if(delta&lt;0){
            throw new RuntimeException(&quot;\u9012\u51CF\u56E0\u5B50\u5FC5\u987B\u5927\u4E8E0&quot;);
        }
        return redisTemplate.opsForValue().increment(key, -delta);
    }

    //================================Map=================================
    /**
     * HashGet
     * @param key \u952E \u4E0D\u80FD\u4E3Anull
     * @param item \u9879 \u4E0D\u80FD\u4E3Anull
     * @return \u503C
     */
    public Object hget(String key,String item){
        return redisTemplate.opsForHash().get(key, item);
    }

    /**
     * \u83B7\u53D6hashKey\u5BF9\u5E94\u7684\u6240\u6709\u952E\u503C
     * @param key \u952E
     * @return \u5BF9\u5E94\u7684\u591A\u4E2A\u952E\u503C
     */
    public Map&lt;Object,Object&gt; hmget(String key){
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * HashSet
     * @param key \u952E
     * @param map \u5BF9\u5E94\u591A\u4E2A\u952E\u503C
     * @return true \u6210\u529F false \u5931\u8D25
     */
    public boolean hmset(String key, Map&lt;String,Object&gt; map){
        try {
            redisTemplate.opsForHash().putAll(key, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * HashSet \u5E76\u8BBE\u7F6E\u65F6\u95F4
     * @param key \u952E
     * @param map \u5BF9\u5E94\u591A\u4E2A\u952E\u503C
     * @param time \u65F6\u95F4(\u79D2)
     * @return true\u6210\u529F false\u5931\u8D25
     */
    public boolean hmset(String key, Map&lt;String,Object&gt; map, long time){
        try {
            redisTemplate.opsForHash().putAll(key, map);
            if(time&gt;0){
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5411\u4E00\u5F20hash\u8868\u4E2D\u653E\u5165\u6570\u636E,\u5982\u679C\u4E0D\u5B58\u5728\u5C06\u521B\u5EFA
     * @param key \u952E
     * @param item \u9879
     * @param value \u503C
     * @return true \u6210\u529F false\u5931\u8D25
     */
    public boolean hset(String key,String item,Object value) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5411\u4E00\u5F20hash\u8868\u4E2D\u653E\u5165\u6570\u636E,\u5982\u679C\u4E0D\u5B58\u5728\u5C06\u521B\u5EFA
     * @param key \u952E
     * @param item \u9879
     * @param value \u503C
     * @param time \u65F6\u95F4(\u79D2)  \u6CE8\u610F:\u5982\u679C\u5DF2\u5B58\u5728\u7684hash\u8868\u6709\u65F6\u95F4,\u8FD9\u91CC\u5C06\u4F1A\u66FF\u6362\u539F\u6709\u7684\u65F6\u95F4
     * @return true \u6210\u529F false\u5931\u8D25
     */
    public boolean hset(String key,String item,Object value,long time) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            if(time&gt;0){
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5220\u9664hash\u8868\u4E2D\u7684\u503C
     * @param key \u952E \u4E0D\u80FD\u4E3Anull
     * @param item \u9879 \u53EF\u4EE5\u4F7F\u591A\u4E2A \u4E0D\u80FD\u4E3Anull
     */
    public void hdel(String key, Object... item){
        redisTemplate.opsForHash().delete(key,item);
    }

    /**
     * \u5224\u65ADhash\u8868\u4E2D\u662F\u5426\u6709\u8BE5\u9879\u7684\u503C
     * @param key \u952E \u4E0D\u80FD\u4E3Anull
     * @param item \u9879 \u4E0D\u80FD\u4E3Anull
     * @return true \u5B58\u5728 false\u4E0D\u5B58\u5728
     */
    public boolean hHasKey(String key, String item){
        return redisTemplate.opsForHash().hasKey(key, item);
    }

    /**
     * hash\u9012\u589E \u5982\u679C\u4E0D\u5B58\u5728,\u5C31\u4F1A\u521B\u5EFA\u4E00\u4E2A \u5E76\u628A\u65B0\u589E\u540E\u7684\u503C\u8FD4\u56DE
     * @param key \u952E
     * @param item \u9879
     * @param by \u8981\u589E\u52A0\u51E0(\u5927\u4E8E0)
     * @return
     */
    public double hincr(String key, String item,double by){
        return redisTemplate.opsForHash().increment(key, item, by);
    }

    /**
     * hash\u9012\u51CF
     * @param key \u952E
     * @param item \u9879
     * @param by \u8981\u51CF\u5C11\u8BB0(\u5C0F\u4E8E0)
     * @return
     */
    public double hdecr(String key, String item,double by){
        return redisTemplate.opsForHash().increment(key, item,-by);
    }

    //============================set=============================
    /**
     * \u6839\u636Ekey\u83B7\u53D6Set\u4E2D\u7684\u6240\u6709\u503C
     * @param key \u952E
     * @return
     */
    public Set&lt;Object&gt; sGet(String key){
        try {
            return redisTemplate.opsForSet().members(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * \u6839\u636Evalue\u4ECE\u4E00\u4E2Aset\u4E2D\u67E5\u8BE2,\u662F\u5426\u5B58\u5728
     * @param key \u952E
     * @param value \u503C
     * @return true \u5B58\u5728 false\u4E0D\u5B58\u5728
     */
    public boolean sHasKey(String key,Object value){
        try {
            return redisTemplate.opsForSet().isMember(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5C06\u6570\u636E\u653E\u5165set\u7F13\u5B58
     * @param key \u952E
     * @param values \u503C \u53EF\u4EE5\u662F\u591A\u4E2A
     * @return \u6210\u529F\u4E2A\u6570
     */
    public long sSet(String key, Object...values) {
        try {
            return redisTemplate.opsForSet().add(key, values);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * \u5C06set\u6570\u636E\u653E\u5165\u7F13\u5B58
     * @param key \u952E
     * @param time \u65F6\u95F4(\u79D2)
     * @param values \u503C \u53EF\u4EE5\u662F\u591A\u4E2A
     * @return \u6210\u529F\u4E2A\u6570
     */
    public long sSetAndTime(String key,long time,Object...values) {
        try {
            Long count = redisTemplate.opsForSet().add(key, values);
            if(time&gt;0) {
                expire(key, time);
            }
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * \u83B7\u53D6set\u7F13\u5B58\u7684\u957F\u5EA6
     * @param key \u952E
     * @return
     */
    public long sGetSetSize(String key){
        try {
            return redisTemplate.opsForSet().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * \u79FB\u9664\u503C\u4E3Avalue\u7684
     * @param key \u952E
     * @param values \u503C \u53EF\u4EE5\u662F\u591A\u4E2A
     * @return \u79FB\u9664\u7684\u4E2A\u6570
     */
    public long setRemove(String key, Object ...values) {
        try {
            Long count = redisTemplate.opsForSet().remove(key, values);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    //===============================list=================================

    /**
     * \u83B7\u53D6list\u7F13\u5B58\u7684\u5185\u5BB9
     * @param key \u952E
     * @param start \u5F00\u59CB
     * @param end \u7ED3\u675F  0 \u5230 -1\u4EE3\u8868\u6240\u6709\u503C
     * @return
     */
    public List&lt;Object&gt; lGet(String key, long start, long end){
        try {
            return redisTemplate.opsForList().range(key, start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * \u83B7\u53D6list\u7F13\u5B58\u7684\u957F\u5EA6
     * @param key \u952E
     * @return
     */
    public long lGetListSize(String key){
        try {
            return redisTemplate.opsForList().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * \u901A\u8FC7\u7D22\u5F15 \u83B7\u53D6list\u4E2D\u7684\u503C
     * @param key \u952E
     * @param index \u7D22\u5F15  index&gt;=0\u65F6\uFF0C 0 \u8868\u5934\uFF0C1 \u7B2C\u4E8C\u4E2A\u5143\u7D20\uFF0C\u4F9D\u6B21\u7C7B\u63A8\uFF1Bindex&lt;0\u65F6\uFF0C-1\uFF0C\u8868\u5C3E\uFF0C-2\u5012\u6570\u7B2C\u4E8C\u4E2A\u5143\u7D20\uFF0C\u4F9D\u6B21\u7C7B\u63A8
     * @return
     */
    public Object lGetIndex(String key,long index){
        try {
            return redisTemplate.opsForList().index(key, index);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * \u5C06list\u653E\u5165\u7F13\u5B58
     * @param key \u952E
     * @param value \u503C
     * @return
     */
    public boolean lSet(String key, Object value) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5C06list\u653E\u5165\u7F13\u5B58
     * @param key \u952E
     * @param value \u503C
     * @param time \u65F6\u95F4(\u79D2)
     * @return
     */
    public boolean lSet(String key, Object value, long time) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            if (time &gt; 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5C06list\u653E\u5165\u7F13\u5B58
     * @param key \u952E
     * @param value \u503C
     * @return
     */
    public boolean lSet(String key, List&lt;Object&gt; value) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u5C06list\u653E\u5165\u7F13\u5B58
     * @param key \u952E
     * @param value \u503C
     * @param time \u65F6\u95F4(\u79D2)
     * @return
     */
    public boolean lSet(String key, List&lt;Object&gt; value, long time) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            if (time &gt; 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u6839\u636E\u7D22\u5F15\u4FEE\u6539list\u4E2D\u7684\u67D0\u6761\u6570\u636E
     * @param key \u952E
     * @param index \u7D22\u5F15
     * @param value \u503C
     * @return
     */
    public boolean lUpdateIndex(String key, long index,Object value) {
        try {
            redisTemplate.opsForList().set(key, index, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * \u79FB\u9664N\u4E2A\u503C\u4E3Avalue
     * @param key \u952E
     * @param count \u79FB\u9664\u591A\u5C11\u4E2A
     * @param value \u503C
     * @return \u79FB\u9664\u7684\u4E2A\u6570
     */
    public long lRemove(String key,long count,Object value) {
        try {
            Long remove = redisTemplate.opsForList().remove(key, count, value);
            return remove;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * \u6A21\u7CCA\u67E5\u8BE2\u83B7\u53D6key\u503C
     * @param pattern
     * @return
     */
    public Set keys(String pattern){
        return redisTemplate.keys(pattern);
    }

    /**
     * \u4F7F\u7528Redis\u7684\u6D88\u606F\u961F\u5217
     * @param channel
     * @param message \u6D88\u606F\u5185\u5BB9
     */
    public void convertAndSend(String channel, Object message){
        redisTemplate.convertAndSend(channel,message);
    }


     /**
     * \u6839\u636E\u8D77\u59CB\u7ED3\u675F\u5E8F\u53F7\u904D\u5386Redis\u4E2D\u7684list
     * @param listKey
     * @param start  \u8D77\u59CB\u5E8F\u53F7
     * @param end  \u7ED3\u675F\u5E8F\u53F7
     * @return
     */
    public List&lt;Object&gt; rangeList(String listKey, long start, long end) {
        //\u7ED1\u5B9A\u64CD\u4F5C
        BoundListOperations&lt;String, Object&gt; boundValueOperations = redisTemplate.boundListOps(listKey);
        //\u67E5\u8BE2\u6570\u636E
        return boundValueOperations.range(start, end);
    }
    /**
     * \u5F39\u51FA\u53F3\u8FB9\u7684\u503C --- \u5E76\u4E14\u79FB\u9664\u8FD9\u4E2A\u503C
     * @param listKey
     */
    public Object rifhtPop(String listKey){
        //\u7ED1\u5B9A\u64CD\u4F5C
        BoundListOperations&lt;String, Object&gt; boundValueOperations = redisTemplate.boundListOps(listKey);
        return boundValueOperations.rightPop();
    }

    //=========BoundListOperations \u7528\u6CD5 End============

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br><span class="line-number">327</span><br><span class="line-number">328</span><br><span class="line-number">329</span><br><span class="line-number">330</span><br><span class="line-number">331</span><br><span class="line-number">332</span><br><span class="line-number">333</span><br><span class="line-number">334</span><br><span class="line-number">335</span><br><span class="line-number">336</span><br><span class="line-number">337</span><br><span class="line-number">338</span><br><span class="line-number">339</span><br><span class="line-number">340</span><br><span class="line-number">341</span><br><span class="line-number">342</span><br><span class="line-number">343</span><br><span class="line-number">344</span><br><span class="line-number">345</span><br><span class="line-number">346</span><br><span class="line-number">347</span><br><span class="line-number">348</span><br><span class="line-number">349</span><br><span class="line-number">350</span><br><span class="line-number">351</span><br><span class="line-number">352</span><br><span class="line-number">353</span><br><span class="line-number">354</span><br><span class="line-number">355</span><br><span class="line-number">356</span><br><span class="line-number">357</span><br><span class="line-number">358</span><br><span class="line-number">359</span><br><span class="line-number">360</span><br><span class="line-number">361</span><br><span class="line-number">362</span><br><span class="line-number">363</span><br><span class="line-number">364</span><br><span class="line-number">365</span><br><span class="line-number">366</span><br><span class="line-number">367</span><br><span class="line-number">368</span><br><span class="line-number">369</span><br><span class="line-number">370</span><br><span class="line-number">371</span><br><span class="line-number">372</span><br><span class="line-number">373</span><br><span class="line-number">374</span><br><span class="line-number">375</span><br><span class="line-number">376</span><br><span class="line-number">377</span><br><span class="line-number">378</span><br><span class="line-number">379</span><br><span class="line-number">380</span><br><span class="line-number">381</span><br><span class="line-number">382</span><br><span class="line-number">383</span><br><span class="line-number">384</span><br><span class="line-number">385</span><br><span class="line-number">386</span><br><span class="line-number">387</span><br><span class="line-number">388</span><br><span class="line-number">389</span><br><span class="line-number">390</span><br><span class="line-number">391</span><br><span class="line-number">392</span><br><span class="line-number">393</span><br><span class="line-number">394</span><br><span class="line-number">395</span><br><span class="line-number">396</span><br><span class="line-number">397</span><br><span class="line-number">398</span><br><span class="line-number">399</span><br><span class="line-number">400</span><br><span class="line-number">401</span><br><span class="line-number">402</span><br><span class="line-number">403</span><br><span class="line-number">404</span><br><span class="line-number">405</span><br><span class="line-number">406</span><br><span class="line-number">407</span><br><span class="line-number">408</span><br><span class="line-number">409</span><br><span class="line-number">410</span><br><span class="line-number">411</span><br><span class="line-number">412</span><br><span class="line-number">413</span><br><span class="line-number">414</span><br><span class="line-number">415</span><br><span class="line-number">416</span><br><span class="line-number">417</span><br><span class="line-number">418</span><br><span class="line-number">419</span><br><span class="line-number">420</span><br><span class="line-number">421</span><br><span class="line-number">422</span><br><span class="line-number">423</span><br><span class="line-number">424</span><br><span class="line-number">425</span><br><span class="line-number">426</span><br><span class="line-number">427</span><br><span class="line-number">428</span><br><span class="line-number">429</span><br><span class="line-number">430</span><br><span class="line-number">431</span><br><span class="line-number">432</span><br><span class="line-number">433</span><br><span class="line-number">434</span><br><span class="line-number">435</span><br><span class="line-number">436</span><br><span class="line-number">437</span><br><span class="line-number">438</span><br><span class="line-number">439</span><br><span class="line-number">440</span><br><span class="line-number">441</span><br><span class="line-number">442</span><br><span class="line-number">443</span><br><span class="line-number">444</span><br><span class="line-number">445</span><br><span class="line-number">446</span><br><span class="line-number">447</span><br><span class="line-number">448</span><br><span class="line-number">449</span><br><span class="line-number">450</span><br><span class="line-number">451</span><br><span class="line-number">452</span><br><span class="line-number">453</span><br><span class="line-number">454</span><br><span class="line-number">455</span><br><span class="line-number">456</span><br><span class="line-number">457</span><br><span class="line-number">458</span><br><span class="line-number">459</span><br><span class="line-number">460</span><br><span class="line-number">461</span><br><span class="line-number">462</span><br><span class="line-number">463</span><br><span class="line-number">464</span><br><span class="line-number">465</span><br><span class="line-number">466</span><br><span class="line-number">467</span><br><span class="line-number">468</span><br><span class="line-number">469</span><br><span class="line-number">470</span><br><span class="line-number">471</span><br><span class="line-number">472</span><br><span class="line-number">473</span><br><span class="line-number">474</span><br><span class="line-number">475</span><br><span class="line-number">476</span><br><span class="line-number">477</span><br><span class="line-number">478</span><br><span class="line-number">479</span><br><span class="line-number">480</span><br><span class="line-number">481</span><br><span class="line-number">482</span><br><span class="line-number">483</span><br><span class="line-number">484</span><br><span class="line-number">485</span><br><span class="line-number">486</span><br><span class="line-number">487</span><br><span class="line-number">488</span><br><span class="line-number">489</span><br><span class="line-number">490</span><br><span class="line-number">491</span><br><span class="line-number">492</span><br><span class="line-number">493</span><br><span class="line-number">494</span><br><span class="line-number">495</span><br><span class="line-number">496</span><br><span class="line-number">497</span><br><span class="line-number">498</span><br><span class="line-number">499</span><br><span class="line-number">500</span><br><span class="line-number">501</span><br><span class="line-number">502</span><br><span class="line-number">503</span><br><span class="line-number">504</span><br><span class="line-number">505</span><br><span class="line-number">506</span><br><span class="line-number">507</span><br><span class="line-number">508</span><br><span class="line-number">509</span><br><span class="line-number">510</span><br><span class="line-number">511</span><br><span class="line-number">512</span><br><span class="line-number">513</span><br><span class="line-number">514</span><br><span class="line-number">515</span><br><span class="line-number">516</span><br><span class="line-number">517</span><br><span class="line-number">518</span><br><span class="line-number">519</span><br><span class="line-number">520</span><br><span class="line-number">521</span><br><span class="line-number">522</span><br><span class="line-number">523</span><br><span class="line-number">524</span><br><span class="line-number">525</span><br><span class="line-number">526</span><br><span class="line-number">527</span><br><span class="line-number">528</span><br><span class="line-number">529</span><br><span class="line-number">530</span><br><span class="line-number">531</span><br><span class="line-number">532</span><br><span class="line-number">533</span><br><span class="line-number">534</span><br><span class="line-number">535</span><br><span class="line-number">536</span><br><span class="line-number">537</span><br><span class="line-number">538</span><br><span class="line-number">539</span><br><span class="line-number">540</span><br><span class="line-number">541</span><br><span class="line-number">542</span><br><span class="line-number">543</span><br><span class="line-number">544</span><br><span class="line-number">545</span><br><span class="line-number">546</span><br><span class="line-number">547</span><br><span class="line-number">548</span><br><span class="line-number">549</span><br><span class="line-number">550</span><br><span class="line-number">551</span><br><span class="line-number">552</span><br><span class="line-number">553</span><br><span class="line-number">554</span><br><span class="line-number">555</span><br><span class="line-number">556</span><br><span class="line-number">557</span><br><span class="line-number">558</span><br><span class="line-number">559</span><br><span class="line-number">560</span><br><span class="line-number">561</span><br><span class="line-number">562</span><br><span class="line-number">563</span><br><span class="line-number">564</span><br><span class="line-number">565</span><br><span class="line-number">566</span><br><span class="line-number">567</span><br><span class="line-number">568</span><br><span class="line-number">569</span><br><span class="line-number">570</span><br><span class="line-number">571</span><br><span class="line-number">572</span><br><span class="line-number">573</span><br><span class="line-number">574</span><br><span class="line-number">575</span><br><span class="line-number">576</span><br><span class="line-number">577</span><br><span class="line-number">578</span><br><span class="line-number">579</span><br><span class="line-number">580</span><br></div></div><h3 id="\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u6D4B\u8BD5" aria-hidden="true">#</a> \u6D4B\u8BD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Resource
    private RedisUtils redisUtils;

    @Test
    void contextLoads() {
        User user = new User();
        user.setId(1l);
        user.setTime(LocalDateTime.now());
        user.setPassword(&quot;xxx&quot;);
        redisUtils.lSet(&quot;test&quot;,user);
        redisUtils.set(&quot;user&quot;,user);
        log.info(redisUtils.get(&quot;user&quot;).toString());
        List&lt;Object&gt; list = redisUtils.lGet(&quot;test&quot;,0L,-1L);
        list.forEach(System.out::print);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="springboot-\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#springboot-\u5E94\u7528" aria-hidden="true">#</a> SpringBoot \u5E94\u7528</h2><h3 id="token\u9274\u6743" tabindex="-1"><a class="header-anchor" href="#token\u9274\u6743" aria-hidden="true">#</a> Token\u9274\u6743</h3><ol><li>\u7528\u6237\u767B\u5F55\u8BF7\u6C42\u767B\u5F55\u63A5\u53E3\u65F6\uFF0C\u9A8C\u8BC1\u7528\u6237\u540D\u5BC6\u7801\u7B49\uFF0C\u9A8C\u8BC1\u6210\u529F\u4F1A\u8FD4\u56DE\u7ED9\u524D\u7AEF\u4E00\u4E2Atoken\uFF0C\u8FD9\u4E2Atoken\u5C31\u662F\u4E4B\u540E\u9274\u6743\u7684\u552F\u4E00\u51ED\u8BC1\u3002</li><li>\u540E\u53F0\u53EF\u80FD\u5C06token\u5B58\u50A8\u5728redis\u6216\u8005\u6570\u636E\u5E93\u4E2D\u3002</li><li>\u4E4B\u540E\u524D\u7AEF\u7684\u8BF7\u6C42\uFF0C\u9700\u8981\u5728header\u4E2D\u643A\u5E26token\uFF0C\u540E\u7AEF\u53D6\u51FAtoken\u53BBredis\u6216\u8005\u6570\u636E\u5E93\u4E2D\u8FDB\u884C\u9A8C\u8BC1\uFF0C\u5982\u679C\u9A8C\u8BC1\u901A\u8FC7\u5219\u653E\u884C\uFF0C\u5982\u679C\u4E0D\u901A\u8FC7\u5219\u62D2\u7EDD\u64CD\u4F5C\u3002</li></ol><p>\u4E0B\u9762\u7528Redis\u4F5C\u4E3A\u7F13\u5B58\u4FDD\u5B58token\uFF0C\u901A\u8FC7mvc\u62E6\u622A\u5668\u6765\u5B9E\u73B0\u5BF9\u767B\u5F55\u7684\u9A8C\u8BC1\u3002</p><h3 id="redisservice-loginservice" tabindex="-1"><a class="header-anchor" href="#redisservice-loginservice" aria-hidden="true">#</a> RedisService/LoginService</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Resource
    private RedisUtils redisUtils;
    @Override
    public void setToken(String key, Object value) {
        redisUtils.set(key,value);
    }
    @Override
    public Object getToken(String key) {
        return redisUtils.get(key);
    }
    @Override
    public boolean deleteToken(String key) {
        redisUtils.del(key);
        return true;
    }
    @Resource
    private RedisService redisService;
    @Override
    public String login(String username, String password) {
        if (Objects.equals(&quot;test&quot;, username) &amp;&amp; Objects.equals(&quot;123&quot;, password)) {//\u6D4B\u8BD5
            String token = UUID.randomUUID().toString();
            redisService.setToken(token, username);
            return &quot;\u7528\u6237\uFF1A&quot; + username + &quot;\u767B\u5F55\u6210\u529F\uFF0Ctoken\u662F\uFF1A&quot; + token;
        } else {
            return &quot;\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF\uFF0C\u767B\u5F55\u5931\u8D25\uFF01&quot;;
        }

    }
    @Override
    public String logout(HttpServletRequest request) {
        String token = request.getHeader(&quot;token&quot;);
        Boolean delete = redisService.deleteToken(token);
        if (!delete) {
            return &quot;\u6CE8\u9500\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u767B\u5F55\uFF01&quot;;
        }
        return &quot;\u6CE8\u9500\u6210\u529F\uFF01&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="\u62E6\u622A\u5668\u548C\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u62E6\u622A\u5668\u548C\u914D\u7F6E" aria-hidden="true">#</a> \u62E6\u622A\u5668\u548C\u914D\u7F6E</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Resource
    MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns(&quot;/**&quot;)
                .excludePathPatterns(&quot;/toLogin&quot;,&quot;/login&quot;,&quot;/js/**&quot;,&quot;/css/**&quot;,&quot;/images/**&quot;);
    }
@Component
@Slf4j
public class MyInterceptor implements HandlerInterceptor {
    @Resource
    private RedisService redisService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        log.info(&quot;\u8BF7\u6C42\u8DEF\u5F84\uFF1A{}&quot;, request.getRequestURI());
        response.setCharacterEncoding(&quot;UTF-8&quot;);
        response.setContentType(&quot;text/html;charset=utf-8&quot;);
        String token = request.getHeader(&quot;token&quot;);
        if (StringUtils.isEmpty(token)) {
            response.getWriter().print(&quot;\u7528\u6237\u672A\u767B\u5F55\uFF0C\u8BF7\u767B\u5F55\u540E\u64CD\u4F5C\uFF01&quot;);
            return false;
        }
        Object loginStatus = redisService.getToken(token);
        if( Objects.isNull(loginStatus)){
            response.getWriter().print(&quot;token\u9519\u8BEF\uFF0C\u8BF7\u67E5\u770B\uFF01&quot;);
            return false;
        }
        return true;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="\u63A5\u53E3\u548C\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u548C\u6D4B\u8BD5" aria-hidden="true">#</a> \u63A5\u53E3\u548C\u6D4B\u8BD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Resource
    private UserService userService;
    @GetMapping(&quot;/login&quot;)
    public String login(String username,String password){
        return userService.login(username,password);
    }
    @GetMapping(&quot;/logout&quot;)
    public String logout(HttpServletRequest request){
        return userService.logout(request);
    }
    @GetMapping(&quot;/test&quot;)
    public String test(HttpServletRequest request){
        return &quot;ok&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,70),m={href:"http://localhost:8080/login?username=test&password=123",target:"_blank",rel:"noopener noreferrer"},o=e("http://localhost:8080/login?username=test&password=123"),d=e(" \u7528\u6237\uFF1Atest\u767B\u5F55\u6210\u529F\uFF0Ctoken\u662F\uFF1A564aa232-a015-481e-94f3-8a0174b11932"),h=s(`<blockquote><p>GET /test HTTP/1.1 token: 564aa232-a015-481e-94f3-8a0174b11932 Host: localhost:8080 ok</p></blockquote><blockquote><p>GET /logout HTTP/1.1 token: 564aa232-a015-481e-94f3-8a0174b11932 Host: localhost:8080 \u6CE8\u9500\u6210\u529F</p></blockquote><h3 id="\u62D3\u5C55" tabindex="-1"><a class="header-anchor" href="#\u62D3\u5C55" aria-hidden="true">#</a> \u62D3\u5C55</h3><ul><li>\u57FA\u4E8EToken\u53EF\u4EE5\u5B9E\u73B0\u7B80\u5355\u7684\u5355\u70B9\u767B\u5F55,\u5C06token\u653E\u5230cookie\u4E2D</li><li>redis\u7684value\u53EF\u4EE5\u9002\u5F53\u5B58\u50A8\u7528\u6237\u7684\u4FE1\u606F</li><li>token\u7684\u751F\u6210\u89C4\u5219\u53EF\u4EE5\u9002\u5F53\u590D\u6742</li><li>\u62E6\u622A\u5668\u53EF\u4EE5\u81EA\u5B9A\u4E49\u62E6\u622A\u7279\u5B9A\u7684token</li><li>jwt\u6269\u5C55,\u540E\u7EED\u4F1A\u7528.</li></ul><h1 id="redission" tabindex="-1"><a class="header-anchor" href="#redission" aria-hidden="true">#</a> Redission</h1><h2 id="\u5206\u5E03\u5F0F\u5B58\u5728\u7684\u5E76\u53D1\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u5206\u5E03\u5F0F\u5B58\u5728\u7684\u5E76\u53D1\u95EE\u9898" aria-hidden="true">#</a> \u5206\u5E03\u5F0F\u5B58\u5728\u7684\u5E76\u53D1\u95EE\u9898</h2><h2 id="\u95EE\u9898\u6A21\u62DF" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u6A21\u62DF" aria-hidden="true">#</a> \u95EE\u9898\u6A21\u62DF</h2><p>\u5546\u54C1\u8D2D\u4E70,\u5728\u5355\u673A\u65F6\u5E76\u53D1\u95EE\u9898\u53EF\u4EE5\u901A\u8FC7synchronized, \u4F46\u662F\u5728\u5206\u5E03\u5F0F\u60C5\u51B5\u4E0B,JVM\u7EA7\u522B\u7684\u9501\u4E0D\u4F1A\u751F\u6548.</p><p>\u5047\u8BBE: redis\u5B58\u4E86\u4E2Astring [stock:200]</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@GetMapping(&quot;/buy&quot;)
public String buy(){
    synchronized (this){
        String s = redisUtils.get(&quot;stock&quot;).toString();
        Integer i = Integer.parseInt(s);
        if(i&gt;0){
            int real = i-1;
            redisUtils.set(&quot;stock&quot;,real+&quot;&quot;);
            logger.info(&quot;\u8D2D\u4E70\u6210\u529F,\u5269\u4F59:&quot;+real);
        }else{
            logger.info(&quot;\u8D2D\u4E70\u5931\u8D25&quot;);
        }
    }
    return &quot;buy end&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ol><li>\u542F\u52A8\u4E24\u4E2A\u670D\u52A1product 8081/8082,\u5E76\u4F7F\u7528Nginx\u505A\u8D1F\u8F7D\u5747\u8861</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> # \u5F85\u9009\u670D\u52A1\u5668\u5217\u8868
   worker_processes  1;

   events {
   worker_connections  1024;
}


   http {
   upstream  my-server {
   server    localhost:8081 weight=1;
   server    localhost:8082 weight=1;
   }

   server {
   listen       80;
   server_name  localhost;

   location / {
   proxy_pass http://my-server;
   proxy_redirect default;
   }

}

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><ol><li>\u4F7F\u7528jmeter\u8FDB\u884C\u538B\u529B\u6D4B\u8BD5</li></ol>`,13),g={href:"http://127.0.0.1/buy",target:"_blank",rel:"noopener noreferrer"},k=e("http://127.0.0.1/buy"),y=s(`<p>\u53EF\u4EE5\u770B\u5230\u540E\u53F0\u6253\u5370\u7684\u5269\u4F59\u5E93\u5B58\u51FA\u73B0\u4E86\u540C\u6837\u7684\u6570\u5B57.</p><h2 id="\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3" aria-hidden="true">#</a> \u89E3\u51B3</h2><h3 id="\u5165\u95E8\u7EA7-setnx-set-if-not-exists" tabindex="-1"><a class="header-anchor" href="#\u5165\u95E8\u7EA7-setnx-set-if-not-exists" aria-hidden="true">#</a> \u5165\u95E8\u7EA7 setnx (set if not exists)</h3><p>setnx key value \u5C06key\u7684\u503C\u8BBE\u4E3Avalue,\u5F53\u4E14\u4EC5\u5F53key\u4E0D\u5B58\u5728</p><p>\u5229\u7528redis\u5355\u7EBF\u7A0B\u6A21\u578B,\u82E5\u5E72\u7EBF\u7A0B\u540C\u65F6\u6267\u884Csetnx,\u4F1A\u8FDB\u5165\u961F\u5217.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @GetMapping(&quot;/buy2&quot;)
    public String buy2() {
        String lockKey = &quot;product_01&quot;;
        // setIfAbsent\u539F\u5B50\u547D\u4EE4
        Boolean result = redisTemplate.opsForValue().setIfAbsent(lockKey, &quot;zong&quot;,10,TimeUnit.SECONDS);//\u540C\u65F6\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4
        if (!result) {
            return &quot;error&quot;;
        }
        try {
            Integer i = Integer.parseInt(redisUtils.get(&quot;stock&quot;).toString());

            if (i &gt; 0) {
                int real = i - 1;
                redisUtils.set(&quot;stock&quot;, real + &quot;&quot;);
                logger.info(&quot;\u8D2D\u4E70\u6210\u529F,\u5269\u4F59:&quot; + real);
            } else {
                logger.info(&quot;\u8D2D\u4E70\u5931\u8D25&quot;);
            }
        } finally {
            redisTemplate.delete(lockKey);
        }
        return &quot;buy end&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u9AD8\u5E76\u53D1\u4ECD\u7136\u5B58\u5728\u7684\u95EE\u9898: \u9501\u6C38\u4E45\u5931\u6548:\u5047\u8BBE\u7EBF\u7A0B1try\u540E\u9762\u7684\u4EE3\u7801\u6267\u884C\u65F6\u95F4\u8D85\u8FC7\u4E86\u9501\u7684\u8FC7\u671F\u65F6\u95F4,\u6B64\u65F6\u7EBF\u7A0B2\u8FDB\u5165\u5E76\u52A0\u9501,\u4F46\u7EBF\u7A0B1\u4F1A\u6267\u884C\u5230\u91CA\u653E\u9501\u7684\u5730\u65B9, \u5BFC\u81F4\u7EBF\u7A0B1\u5220\u9664\u4E86\u7EBF\u7A0B2\u7684\u9501.</p><h3 id="\u4F18\u5316-\u6DFB\u52A0\u9501\u9700\u8981\u539F\u5B50\u64CD\u4F5C-\u6BCF\u4E2A\u7EBF\u7A0B\u52A0\u7684\u9501\u7684value\u90FD\u8BBE\u4E3Auuid-\u91CA\u653E\u9501\u7684\u65F6\u5019\u8FDB\u884C\u5224\u65AD" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316-\u6DFB\u52A0\u9501\u9700\u8981\u539F\u5B50\u64CD\u4F5C-\u6BCF\u4E2A\u7EBF\u7A0B\u52A0\u7684\u9501\u7684value\u90FD\u8BBE\u4E3Auuid-\u91CA\u653E\u9501\u7684\u65F6\u5019\u8FDB\u884C\u5224\u65AD" aria-hidden="true">#</a> \u4F18\u5316:(\u6DFB\u52A0\u9501\u9700\u8981\u539F\u5B50\u64CD\u4F5C)\u6BCF\u4E2A\u7EBF\u7A0B\u52A0\u7684\u9501\u7684value\u90FD\u8BBE\u4E3AUUID,\u91CA\u653E\u9501\u7684\u65F6\u5019\u8FDB\u884C\u5224\u65AD</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    String id  = UUID.randomUUID().toString();
    // setIfAbsent\u539F\u5B50\u547D\u4EE4
    Boolean result = redisTemplate.opsForValue().setIfAbsent(lockKey, id,10,TimeUnit.SECONDS);//\u540C\u65F6\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4
    //...
    if (id.equals(redisTemplate.opsForValue().get(lockKey))){
        redisTemplate.delete(lockKey);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u4ECD\u7136\u5B58\u5728\u7684\u95EE\u9898:\u7EBF\u7A0B1\u5728\u5224\u65AD\u6210\u529F\u8FDB\u5165\u7684\u90A3\u4E00\u77AC\u95F4(\u8FD8\u6CA1\u6709\u6267\u884C\u9501\u7684\u91CA\u653E), \u9501\u8FC7\u671F\u4E86,\u7EBF\u7A0B2\u53C8\u521A\u52A0\u4E86\u9501,\u4ECD\u7136\u5BFC\u81F4\u7EBF\u7A0B1\u91CA\u653E\u4E86\u7EBF\u7A0B2\u7684\u9501</p><h3 id="\u89E3\u51B3-\u9501\u7EED\u547D-\u5220\u9664\u9501\u4E5F\u9700\u8981\u539F\u5B50\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3-\u9501\u7EED\u547D-\u5220\u9664\u9501\u4E5F\u9700\u8981\u539F\u5B50\u64CD\u4F5C" aria-hidden="true">#</a> \u89E3\u51B3:\u9501\u7EED\u547D(\u5220\u9664\u9501\u4E5F\u9700\u8981\u539F\u5B50\u64CD\u4F5C)</h3><p>\u518D\u5F00\u4E00\u4E2A\u5B9A\u65F6\u4EFB\u52A1,\u5224\u65AD\u4E3B\u7EBF\u7A0B\u7684\u9501\u662F\u5426\u8FD8\u6301\u6709\u8BE5\u9501,\u82E5\u9501\u8FC7\u671F\u4E14\u4E3B\u7EBF\u7A0B\u8FD8\u6CA1\u7ED3\u675F,\u5C31\u5237\u65B0\u9501\u7684\u8FC7\u671F\u65F6\u95F4. \u4F7F\u7528\u5206\u5E03\u5F0F\u9501\u6846\u67B6\u89E3\u51B3\u8BE5\u95EE\u9898.</p><h3 id="redission-1" tabindex="-1"><a class="header-anchor" href="#redission-1" aria-hidden="true">#</a> Redission</h3><h4 id="\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56" aria-hidden="true">#</a> \u4F9D\u8D56</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    &lt;dependency&gt;
        &lt;groupId&gt;org.redisson&lt;/groupId&gt;
        &lt;artifactId&gt;redisson&lt;/artifactId&gt;
        &lt;version&gt;3.6.5&lt;/version&gt;
    &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Bean
    public Redisson redisson(){
        //\u5355\u673A\u6A21\u5F0F
        Config config = new Config();
        config.useSingleServer().setAddress(&quot;redis://localhost:6379&quot;).setDatabase(0);
        return (Redisson) Redisson.create(config);

    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="\u52A0\u9501\u548C\u91CA\u653E" tabindex="-1"><a class="header-anchor" href="#\u52A0\u9501\u548C\u91CA\u653E" aria-hidden="true">#</a> \u52A0\u9501\u548C\u91CA\u653E</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    @Autowired
    Redisson redisson;

    @GetMapping(&quot;/buy3&quot;)
    public String buy3() {
        String lockKey = &quot;product_01&quot;;
        RLock lock = redisson.getLock(lockKey);
        try {
            lock.lock();//\u771F\u6B63\u7684\u52A0\u9501 setIfAbsent 30s
            Integer i = Integer.parseInt(redisUtils.get(&quot;stock&quot;).toString());
            if (i &gt; 0) {
                int real = i - 1;
                redisUtils.set(&quot;stock&quot;, real + &quot;&quot;);
                logger.info(&quot;\u8D2D\u4E70\u6210\u529F,\u5269\u4F59:&quot; + real);
            } else {
                logger.info(&quot;\u8D2D\u4E70\u5931\u8D25&quot;);
            }
        } finally {
            lock.unlock();//
        }
        return &quot;buy end&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>redisson\u5927\u81F4\u903B\u8F91(lua\u811A\u672C\u5B9E\u73B0):</p><ol><li>\u7EBF\u7A0B1\u52A0\u9501\u6210\u529F(30s), \u5F00\u542F\u540E\u53F0\u7EBF\u7A0B(\u6BCF\u4E2A10s\u68C0\u6D4B\u7EBF\u7A0B1\u662F\u5426\u8FD8\u6301\u6709\u9501,\u5982\u679C\u6709\u5219\u5EF6\u957F10s)</li><li>\u7EBF\u7A0B2\u5224\u65AD\u662F\u5426\u80FD\u52A0\u9501,\u4E0D\u80FD\u5219\u81EA\u65CB\u7B49\u5F85,\u77E5\u9053\u80FD\u4E3A\u6B62</li><li>\u7EBF\u7A0B1\u91CA\u653E\u9501,\u7EBF\u7A0B2\u52A0\u9501</li></ol><h3 id="redis\u4E3B\u4ECE\u67B6\u6784\u5BFC\u81F4\u7684\u5206\u5E03\u5F0F\u9501\u5931\u6548\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#redis\u4E3B\u4ECE\u67B6\u6784\u5BFC\u81F4\u7684\u5206\u5E03\u5F0F\u9501\u5931\u6548\u95EE\u9898" aria-hidden="true">#</a> Redis\u4E3B\u4ECE\u67B6\u6784\u5BFC\u81F4\u7684\u5206\u5E03\u5F0F\u9501\u5931\u6548\u95EE\u9898</h3><p>\u5BA2\u6237\u7AEF\u52A0\u9501\u62FF\u5230\u4E3B\u8282\u70B9\u7684\u8FD4\u56DE\u540E,\u4E3B\u8282\u70B9\u8FD8\u672A\u540C\u6B65\u7ED9\u4ECE\u8282\u70B9\u5C31\u5B95\u673A\u4E86,\u5BFC\u81F4\u4ECE\u8282\u70B9\u6CA1\u6709\u62FF\u5230\u5BA2\u6237\u7AEF\u7684\u9501.</p><blockquote><p>CAP\u539F\u5219:\u4E00\u81F4\u6027/\u53EF\u7528\u6027/\u5206\u533A\u5BB9\u9519\u6027,\u4E09\u8005\u4E0D\u53EF\u80FD\u540C\u65F6\u5B58\u5728.</p></blockquote><ul><li>Redis\u6EE1\u8DB3AP:\u4E00\u81F4\u6027/\u5206\u533A\u5BB9\u9519\u6027,Redis\u5F3A\u8C03\u53EF\u7528\u6027,\u4F1A\u7ACB\u5373\u8FD4\u56DE\u7ED3\u679C.</li><li>Zookeeper\u6EE1\u8DB3CP:\u4E00\u81F4\u6027/\u5206\u533A\u5BB9\u9519\u6027,\u540C\u6837\u7684,Zookeeper\u5728\u5BA2\u6237\u7AEF\u52A0\u9501\u540E\u4E0D\u4F1A\u7ACB\u5373\u8FD4\u56DE\u7ED3\u679C, \u53EA\u6709Zookeeper\u96C6\u7FA4\u534A\u6570\u4EE5\u4E0A\u90FD\u83B7\u5F97\u540C\u6B65\u540E,\u624D\u4F1A\u8FD4\u56DE\u5BA2\u6237\u7AEF\u6210\u529F(\u8FC7\u534A\u5199)</li></ul><h4 id="redlock" tabindex="-1"><a class="header-anchor" href="#redlock" aria-hidden="true">#</a> Redlock</h4><p>Redis\u5BF9\u4E8E\u6B64\u95EE\u9898,\u4E5F\u53EF\u4EE5\u4F7F\u7528Redlock\u6765\u89E3\u51B3. Redlock\u9488\u5BF9\u7684\u662F\u5BA2\u6237\u7AEF,\u5BA2\u6237\u7AEF\u52A0\u9501\u540E,\u8D85\u8FC7\u534A\u6570\u4EE5\u4E0A\u7684\u8282\u70B9\u52A0\u9501\u6210\u529F\u624D\u7B97\u6210\u529F.(\u727A\u7272\u53EF\u7528\u6027,\u4E0D\u5982\u76F4\u63A5\u7528zookeeper)</p>`,27);function S(v,x){const a=t("ExternalLinkIcon");return p(),i(b,null,[c,n("blockquote",null,[n("p",null,[n("a",m,[o,r(a)]),d])]),h,n("blockquote",null,[n("p",null,[n("a",g,[k,r(a)])])]),y],64)}var q=l(u,[["render",S],["__file","Redis.html.vue"]]);export{q as default};
