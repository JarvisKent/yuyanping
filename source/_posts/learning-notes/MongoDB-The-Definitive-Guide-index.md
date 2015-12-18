title: 《MongoDB:The Definitive Guide》索引
date: 2015/12/16 12:00:00
tags: [JavaScript,MongoDB]
categories: [Web前端]
---
MongoDB的索引技巧和MySQL/Oracle/SQLite类似，都可以互相借鉴。创建索引使用ensureIndex方法：
```javascript
db.mySet.find({key:1})
```
对某个键创建的索引，会加速对该键的查询，其它查询包含被索引的键，不会有任何性能提供。但是也不能对**每一个键**进行索引。
## 扩展索引
索引创建的好坏，能很大程度影响查询性能，比如：
```javascript
db.mySet.ensureIndex({user:1,date:-1})
```
<!--more-->
按用户名(升序)排序，按日期(降序)排序，会有如下情形：
```javascript
User 123 on 2015-12-10
User 123 on 2015-12-9
User 124 on 2015-12-10
User 124 on 2015-12-9
```
要是改变索引顺序，变成:
```javascript
{date:-1,user:1}
```
将最后几天的索引保存在内存中，会减少内存交换，加快索引。
(我的理解可能是，按date**先**建立的索引，数据库会去根据时间来查询，用户并没有时间顺序，而数据更新是可以按时间来排序的。)

建立索引时要考虑如下问题：

 - 会做什么样的查询？其中哪些键需要索引？
 - 每个键的索引方向是怎样的？
 - 如何应对扩展？有没有能使常用数据更多的保留在内存中，通过改变不同键的排列顺序？(上面就是这种方法)

## 索引名称
索引名类似:
```javascript
keyname1_dir1_keyname2_dir2_keyname3_dir3.....
```
`keynameX`代表索引的**键**,`dirX`代表索引的**方向**，如果索引键多了，这样的方法就不太好了，可以自己指定索引名称：
```javascript
db.mySet.ensureIndex({"a":1,"b":1.......},{"name":"alphabet"})
```
## 唯一索引
创建唯一索引：
```javascript
db.mySet.ensureIndex({key:1},{"unique":true})
```
insert并不检查是否有重复。
### 删除重复
使用`dropDups`可以删除重复的**索引**，保留第一个发现的文档：
```javascript
db.mySet.ensureIndex({key:1},{"unique":true,"dropDups":true})
```
## 使用explain和hint
### explain
看名字就知道干什么用的，可以得到查询细节，使用如下：
```javascript
db.mySet.find().explain()
```
对于一个包含64个文档，没有索引的查询会有类似如下输出：
![explain_basic_MongoDB](http://7xoed1.com1.z0.glb.clouddn.com/2015/explain_basic_MongoDB.png "explain_basic_MongoDB")

 - `cursor`: `BasicCursor` 这表示当前没有使用索引。
 - `nscanned`: 64 这表示查找的文档数量，如果返回的文档越接近这个数，说明效率越高。
 - `n`: 64 这表示返回的文档数量。
 - `millis`: 0 查询时间（毫秒）。

如果创建了索引，那可能`cursor`就不一样，如下：
```javascript
"cursor": "BtreeCursor age_1"
```
索引存储在B树的结构中，可以使用`system.indexes`来查询索引更进下一步的信息。
```javascript
db.system.indexes.find({"ns":"test.c","name":"age_1"})
```
### hint
当MongoDB用了非预期的索引，可以使用hint来强制使用某个索引。
```javascript
db.mySet.find({key:value,keyX:value1}).hint({keyX:1,key:1})
```
大多数情况下没有必要，MongoDB自己会选择最优的索引进行查询。
## 索引管理
索引的元信息存储在每一个数据库的 `system.indexes` 集合中。不能对其插入和删除文档，只能通过`ensureIndex`或者`dropIndex`操作。

