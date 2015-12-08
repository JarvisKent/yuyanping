title: 餐饮订单管理系统——初始化项目
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

根目录下通过server.js来启动
我使用[express][express-url]来初始化我的项目基本结构，简单说明下步骤。
## 安装 express 
```javascript
npm install express --save
```
写这篇文章的时候 express 版本为 4.13.1
[express-url]:http://expressjs.com/en/index.html "express"