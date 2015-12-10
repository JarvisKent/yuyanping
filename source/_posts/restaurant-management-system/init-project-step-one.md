title: 餐饮管理系统——初始化项目
tags: [AngularJS,Node.js]
categories: Web前端
---
这是第一篇文章，记录项目的初始化和整个项目结构的简单说明，我希望借这个项目学习`Node`的有关知识，顺便记录下来，也希望给需要的人一些帮助，有错误和建议请留言。
## 创建目录结构
我初步想了下，大概有如下几个目录：

 + `server` 存放服务器端文件。
 + `www` 存放客户端，也就是后台管理界面的文件。
  - `res` 资源文件。
  - `views` 存放html和angular的一些js文件。
  - `app` 存放顶层angular文件。
 + `test` 存放测试文件。

创建好上面的目录之后，先构建一个简单的服务器进行测试。
<!--more-->
## 搭建服务端
使用[express][express-url]来创建服务器。
### 安装 express 
```javascript
npm install express --save
```
写这篇文章的时候 express 版本为 4.13.1
### 测试服务器
在根目录下创建 **app.js** 文件，把下面的代码拷贝进去 。
```javascript
var express = require('express');
var app = express();
var fs = require('fs');
app.get('/', function (req, res) {
	var html = fs.createReadStream('./www/index.html');
	html.pipe(res);
}).listen(3000);
```
先使用一个简单的index.html页面,作为根目录`/`请求的返回信息，在 **www** 目录下创建一个index.html的页面。使用 Node 测试下服务器是否运行正常。
访问本地 **localhost:3000** 如果成功将会返回index.html中的信息。
## 总结
我相信从简单的开始，一步一步的去实现一个项目，对于我的成长是很有帮助的。这只是我正式步入 Node 的第一步，下面需要做的事还有很多。
### 项目文档
需求分析，概要设计，详细设计等，这些内容放在项目[Wiki][Restaurant-ordering-sytem-wiki]里面比较合适。



[express-url]:http://expressjs.com/en/index.html "express"
[Restaurant-ordering-sytem-wiki]:https://github.com/HelloYu/Restaurant-Ordering-System/wiki "github wiki"