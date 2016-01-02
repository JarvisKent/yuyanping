title: 《MongoDB:The Definitive Guide》查询
date: 2015/12/11 12:00:00
tags: [JavaScript,MongoDB]
categories: [Web前端]
---
前一篇[MongoDB:The Definitive Guide笔记](http://www.yuyanping.com/learning-notes/MongoDB-The-Definitive-Guide/)，主要记录的是一到三章的内容，数据库其实大部分都是在做查询操作，这章单独记录。
## 指定返回键
有时候并不需要返回整个文档，这时候可以通过设置，`find`的**第二个**参数来指定想要返回的键。例如：
```javascript
db.mySet.find(
	{},
	{key:1,key2:1}
	)
```
<!--more-->
只要在第二个参数中输入自己想要返回的key，后面跟个**1**就可以，如果要在返回的内容中排除这个键/值对，就把1改成**0**就行。`_id`默认是返回的，即使没有指定，如果想防止返回，可以写成如下格式：
```javascript
db.mySet.find(
	{},
	{key:1,"_id":0}
	)
```
这样就不会返回`_id`键值。
## 查询条件
### 所有比较操作符
 
 - `$lt` 对应 `<`, **less than** 的缩写。
 - `$lte` 对应 `<=`, **less than equal** 的缩写。
 - `$gt` 对应 `>`, **greater than** 的缩写。
 - `$gte` 对应 `>=`, **greater than equal** 的缩写。

依日期作为查询条件的例子：
```javascript
start = new Date("1991-04-06")
db.mySet.find({"birthday":{"$lt":start}})
```
### $ne
`$ne`是not equal的缩写，意思就是**不相等**，可以用于所有类型的数据，例如：
```javascript
db.mySet.find({"username":{"$ne":"Jeffrey"}})
```
就是查询所有名字，不为"Jeffrey"的文档。
## OR查询
MongoDB中两种方式进行OR查询。

 - `$in` 可用来查询一个键的多个值。
 - `$or` 用来完成多个键值的任意给定。

### $in
和关系数据库中的**in**操作差不多，使用如下：
```javascript
db.mySet.find({"id":{"$in":[1,2,3]}})
```
很容易理解，后面跟一个条件数组就行。不仅限数值，可以是任意类型。与$in相对的一个操作是`$nin`,就是返回不在查询条件中的数据。
### $or
`$or`是最常用的，传入一个条件数组就可以，例如：
```javascript
db.mySet.find({"$or":[
	{"id":
		{"$in":[1,2,3]}
	},
	{"username":"Jeffrey"}
]})
```
## $not and $mod
`$not`是元条件句，可以用在任何条件之上，例如：
```javascript
db.mySet.find({"id":
	{"$not":
		{"$mod":[5,1]}
	}
})
```
上面的语句返回，不能被5取模得1的文档。`$mod`后面跟一个数组[x,y]，value mod x = y。
## 正则表达式
在MongoDB中也可以使用正则表达式：
```javascript
db.mySet.find({"username":/jeffrey/i})
```
使用的是Perl兼容的正则表达式(PCRE)库。
## 查询数组
### $all
使用多个元素来匹配数组。例如：
```javascript
db.mySet.find({"username":{$all:["jeffrey","Yu"]}})
```
将会返回同时满足这两个条件的文档。
### $size
返回满足长度的文档。
### $slice
返回数组的一个子集合。例如：
```javascript
db.mySet.findOne({"$slice":10}) //返回前10个
db.mySet.findOne({"$slice":-10}) //返回后10个
db.mySet.findOne({"$slice":[10,10]}) //跳过前10个返回10条 11-20
```
$slice将返回文档中所有键，别的键说明符都是默认**不返回**未提及的键
## $where
$where可以执行任意的JavaScript作为查询的一部分，也可以使用一个字符串。如无必要少用，速度比常规慢很多。
## limit、skip和sort
```javascript
db.mySet.find().limit(1)
```
限制返回条数。
```javascript
db.mySet.find().skip(2)
```
略过前2个文档，返回余下文档。
```javascript
db.mySet.find().sort({username:1,age:-1}) //升序 1，降序-1
```

