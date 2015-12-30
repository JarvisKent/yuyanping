title: 餐饮管理系统——整合MongoDB
date: 2015/12/30 20:00:00
tags: [AngularJS,Node.js,餐饮管理系统]
categories: [Web前端]
---
一转眼十几天过去，最近忙着工作上的事。今天打算整合 **MongoDB** ,前一段时间,已经把[需求][requirements]和[概要][general_design]修改了下，发现还是写的不好，那也不能拖着，留着最基本的东西先搭建一个原型。
## 下载安装MongoDB
到[MongoDB][MongoDB_download]官网下载，使用的windows 64bit系统，就下载64位的，其中有**legacy**版本，下面是官网的解释，我win8的系统就装**Windows 64-bit 2008 R2+**的就行。
>MongoDB for Windows 64-bit Legacy runs on Windows Vista, Windows Server 2003, and Windows Server 2008 and does not include recent performance enhancements.
<!--more-->
### 配置基础环境
下载安装完成之后，需要做的是，在**C盘**根目录下,创建一个数据库文件夹，`\data\db`，注意，这是2个文件夹。
### 运行MongoDB
创建好数据库目录，进入到MongoDB的安装目录中的**bin**文件夹内，在命令行运行`mongod.exe`。如果一切顺利，控制台会打印端口信息。
### 创建数据库
我现在来创建一个**restaurant**的数据库，在命令行运行`mongo.exe`，之后使用`use`命令来创建数据库，比如说：
```javascript
use restaurant
db.users.insert({username:"admin",password:"admin",role:"admin"})
```
Ok,现在已经创建了restaurant数据库，users集合，还给集合里面插入了一个document。
可以使用`db`查看当前数据库名称，`show collections`查看当前数据库所有集合，`db.<集合名称>.find()`查看集合中所有对象。
## 安装驱动
最基本的数据已经添加到数据库中，现在可以在项目中调用数据库中的信息。到自己的项目根目录运行：
```javascript
npm install mongodb --save
```
这是官网的驱动，也可以安装[mongoose][mongoose]。
## 调用数据
看了官网的文档，回调很麻烦，这里找了**monk**帮忙解决这个问题，安装下：
```javascript
npm install monk --save
```
在**users.model.js**加入下面的代码：
```javascript
var
  monk = require('monk'),
  db = monk('localhost:27017/restaurant');
```
然后修改下find方法：
```javascript
function find(user,cb) {
  
  var users = db.get('users');
  users.find(user,_cb);

  function _cb(err,doc) {
    if (err) throw err;
    console.info(doc);
    cb(doc);
    db.close();
  };
};
```
相比[v1.0.1][]，我开始使用回调的方式，来实现代码逻辑。改了下程序代码，使用postman测试下登录，一切正常。
![整合MongoDB测试结果](http://7xoed1.com1.z0.glb.clouddn.com/2015/RMS/article/Integration_mongodb_login_test.png "整合MongoDB测试结果")

## 备注
在控制台输出了下面2句话：
```javascript
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }
js-bson: Failed to load c++ bson extension, using pure JS version
```
模块没有动过应该不会少才对，以后再来处理。
这里吐槽下MongoDB官网的帮助文档，写的不是很好。就比如说`mongo`中的`use`，我找了大半天，没发现他有说明，可以创建数据库的功能，因为在控制台输出的帮助中是如下这段话：
```javascript
 use <db_name>  set current database
```
按照常规来理解，这家伙应该是切换数据库用的。

[requirements]:https://github.com/HelloYu/Restaurant-Management-System/wiki/%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90
[general_design]:https://github.com/HelloYu/Restaurant-Management-System/wiki/%E6%A6%82%E8%A6%81%E8%AE%BE%E8%AE%A1 
[MongoDB_download]:https://www.mongodb.org/downloads#production "mongoDB下载"
[mongoose]:https://www.npmjs.com/package/mongoose "mongoose"
[v1.0.1]:https://github.com/HelloYu/Restaurant-Management-System/releases/tag/v1.0.1 "餐饮管理系统v1.0.1"