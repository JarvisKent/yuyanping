title: 《MongoDB:The Definitive Guide》基础知识
date: 2015/12/11 12:00:00
tags: [JavaScript,MongoDB]
categories: [Web前端]
---
**MongoDB** 中几个基本概念：

 - **Document** 是基本数据单元。
 - **集合**	相当于关系型数据库中的表,无模式，同一集合文档类型可以不同。
 - 每一个文档都有一个特殊键`_id`，在一个集合中，唯一标识一个文档。

## 集合
### 无模式
在同一个集合中，文档类型可以是任意的。但是不能将所有文档放在一个集合中，这将会影响数据库的性能，同一集合中的文档最好是同一类型，这样建立的索引会更加高效。
<!--more-->
### 命名
集合的命名应满足如下几种方式：

 - 不能是空串。
 - 不能有空字符。
 - 不能以 **system** 开头，这是系统保留前缀。
 - 不能含有保留字符`$`。

## 数据库
数据库的命名也需要满足如下要求：

 - 不能是空串。
 - 不能含有一些特殊字符。
 - 全部小写。
 - 最多64字节。 

## 基本操作
### 创建(insert)
```javascript
db.mySet.insert(someDoc)
```
### 读取(find)
```javascript
db.mySet.find() // find all
db.mySet.findOne() 
```
### 更新(update)
```javascript
db.mySet.update({
		key:condition
	},
	newDoc)
```
有时候更新并不需要替换整个文档，这时候就可以使用原子(不进行整个文档改动)的[更新修改器](#$inc修改器)

### 删除(remove)
```javascript
db.mySet.remove({key:condition})
```
## 集合冲突
如果有个集合的名称叫`version`，通过db.version来访问，将返回服务器版本，而不是这个集合，通过使用`db.getCollection("version")`来解决冲突。
## _id和ObjectId
MongoDB中存储的文档必须有一个`_id`键，可以是**任意类型**，默认是ObjectId对象。
### ObjectId
使用12字节存储空间，按照如下方式生成：
![MongoDB_ObjectId](http://7xoed1.com1.z0.glb.clouddn.com/2015/MongoDB_ObjectId.png)

 - **时间戳** 从标准纪元开始，单位为秒，让ObjectId大致有序增长。
 - **机器** 是机器的唯一标识。
 - **PID** 进程唯一标识，防止多个进程产生相对ObjectId。
 - **计数器** 保证同一进程，同一秒产生的ObjectId也不同。

## 修改器
### $inc修改器
用来增加已有键的值(只能是整数，长整数或双精度浮点数。如果是其它值使用$set)，或者在健不存在的时候创建一个。
```javascript
db.mySet.update({
		key:condition
	},
	{
		"$inc":{needChangeKey:value} //value需要增加的值
	})
```
### $set修改器
给一个集合里的一个文档，原子的添加或更新信息：
```javascript
db.mySet.update({
		key:condition
	},
	{
		"$set":newJsonObject
	}) 
```
也可以修改内嵌文档：
```javascript
{"$set":{"obj.property":"new value"}}
```
### $unset修改器
删除某键值对：
```javascript
db.mySet.update({
		key:condition
	},
	{
		"$unset":{key:1} //恩书上是写1，为什么？
	}) 
```
### 数组修改器
数组修改器只能用来修改数组，其中有`$push`和`$pop`。有时候如果判断一个值如果不在数组才添加，可以使用`$ne`,如下：
```javascript
db.mySet.update({
	key:{"$ne":condition}
})
```
有些时候`$addToSet`更加合适，可以避免**重复**。还有配合`$each`可以遍历添加不重复的值。
#### $pop
```javascript
{$pop:{key:1}} //从尾部删除
{$pop:{key:-1}} //从头部删除
```
#### $pull
依据特定条件来删除，而不是依据位置。


