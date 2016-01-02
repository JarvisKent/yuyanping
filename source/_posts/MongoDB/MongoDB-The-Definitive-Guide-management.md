title: 《MongoDB:The Definitive Guide》管理
date: 2015/12/20 12:00:00
tags: [JavaScript,MongoDB]
categories: [Web前端]
---
## 启动MongoDB
```javascript
mongod --port 5586 --fork --logpath mongodb.log
```

 - `--port` 指定服务器监听端口。
 - `--fork` 以守护进程的方式运行MongoDB,创建服务器进程。
 - `--logpath` 指定路径输出路径，而不是输出到命令行。
 - `--dbpath` 指定数据目录。

<!--more-->
## 停止MongoDB
向MongoDB服务发送`SIGINT`或者`SIGTERM`如果运行在终端，可以直接使用Ctrl-C直接停止。
## 使用管理接口
mongod启动时还会启动一个基本的HTTP服务器，端口号比主服务的端口号大`1000`。可以使用 `--rest` 选项开启REST支持，`--nohttpinterface` 关闭管理接口。
## serverStatus
```javascript
db.runCommand({"serverStatus":1})
```
## 安全和认证
```javascript
use admin
db.addUser("root","abcd");
db.addUser('read_only',"password",true);
```
创建只读用户，将`addUser`设置成true。重启服务器，加入`--auth`命令行选项，开启安全检测。
```javascript
db.auth('read_only',"password");
```
## 备份和修复
`mongodump`提供一种能在运行时备份的方法，但不一定是实时快照。
`nogorestore`从备份恢复数据。
```javascript
mongodump -d test -o backup
```
从数据库test到目录backup的热备份。
```javascript
mongorestore -d foo --drop backup/test/
```
`-d`指定要恢复的数据库，这里是foo。这个选项可以 将备份恢复到与原来不同名的数据库中。`--drop`代表在恢复前删除集合。否则数据会与现有集合数据合并。
## fsync和锁
```javascript
use admin
db.runCommand({"fsync":1,"lock":1});
```
### 解锁
```javascript
db.$cmd.sys.unlock.findOne();
db.currentOp();
```
## 修复
```javascript
use test
db.repairDatabase();
```



