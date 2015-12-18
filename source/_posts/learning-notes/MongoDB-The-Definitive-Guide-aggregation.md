title: 《MongoDB:The Definitive Guide》聚合
date: 2015/12/18 12:00:00
tags: [JavaScript,MongoDB]
categories: [Web前端]
---
## count
返回集合中的文档数量。
```javascript
db.mySet.count()
db.mySet.count({key:value})
```
## distinct
找出给定键的所有不同的值。
```javascript
db.runCommand({"distinct":"mySet","key":"age"}) //提供集合和键
```
<!--more-->
## group
```javascript
db.runCommand({"group": {
	"ns": "stocks", //集合
	"key": "day",
	initial: {"time":0},
	"$reduce": function(doc,prev) {
		if (doc.time > prev.time) {
			prev.price = doc.price;
			prev.time = doc.time;
		}
	}
}})
```
(使用到再来记录)
## MapReduce
可以轻松并行化到多个服务器的聚合方法。
(使用到再来记录)

