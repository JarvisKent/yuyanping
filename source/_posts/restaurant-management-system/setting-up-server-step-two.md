title: 餐饮管理系统——构建基础架构
date: 2015/12/14 12:00:00
tags: [AngularJS,Node.js,餐饮管理系统]
categories: [Web前端]
---
前面已经简单构建了一个服务器，并能访问，现在要在此基础上进行完善。
首先完善下服务器端的目录结构，在server内添加如下文件：
 
 - **controllers** 存放逻辑处理文件。
 - **models** 存放数据库模型。  
 - **routes** 路由文件。  

<!--more-->
之后修改下`app.js`文件如下：
```javascript
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		login = require('./server/routes/login_route');

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

//login 路由
app.use(login);

var port = process.env.PORT || 8888;

app.listen(port);
console.log('server start on port ' + port);
```
## body-parser
是的，没错，有很大的变化，一个比较大的变化是开始多了一些中间件，有个`body-parser`这个是帮助我们自动解析，request的body内容的，参见express中的[req.body](http://expressjs.com/en/4x/api.html#req.body),不要忘记：
```javascript
npm install body-parser --save
```
## Router
这里也用到了express的[Router](http://expressjs.com/en/4x/api.html#router)模块,与主app分离出来方便重用和扩展。
下面来看看 login 的路由代码，如下：
```javascript
var express = require('express'),
		loginCtrl = require('../controllers/login_ctrl'),
		router = express.Router();

router.post('/login',function(req,res) {
	console.info('req.body.username'+req.body.username);
	var user = { 
		username: req.body.username,
		password: req.body.password
	}

	//都暂时没有考虑使用回调和promise
	var auth = loginCtrl.login(user);
  if (auth) {
  	res.json({status:200,user:user});
  } else {
  	res.json({status:401,message:'授权失败！'});
  }

});

module.exports = router;
```
也没什么特别的，这里我自己没什么疑问，就继续看看login controller的代码。
## login controller
login controller 里面的逻辑代码也很简单，就是判断下账号密码是否正确。
```javascript
var userModel = require('../models/users_model');

module.exports.login = function(userLogin) {
	if (!userLogin) {
		throw new Error('用户对象不能为空！');
	}

	var user = userModel.findOne(userLogin.username);

	//没有这个用户
	if (!user) {
		return false;
	}

	if (user.password == userLogin.password) {
		userLogin.role = user.role;
		return true;
	} else {
		return false;
	}
}
```
这里我是直接把异常抛出，外面没有进行捕获，后面再来完善，model的东西就不贴代码了，也很简单，这就是一个简单的RESTful API框架了，再这框架基础上进行扩展应该不会遇到太多问题。
## 总结

 - 在使用`postman`测试的时候，使用`form-data`模式发送的`post`，body-parser无法解析数据，form-data 和 x-www-form-urlencoded的区别？
 - 使用`body-parser`在控制台会输出:
 ```javascript
 body-parser deprecated undefined extended: provide extended option
 ```
 但是不影响使用，也按照stack-overflow上面的解答设置：
 ```javascript
 app.use(bodyParser.urlencoded({extend:true}));
 ```
 依然没有效果。