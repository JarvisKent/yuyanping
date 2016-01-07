title: 深入学习 JavaScript 单例模式
date: 2016-01-06 19:49:45
tags: [JavaScript,设计模式]
categories: [Web前端]
---
## 对象字面量方法
单例最简单的实现，应该是使用对象字面量表达式，如下：
```javascript
var singleton = (function() {
  var 
    _username = 'Mr.Yu',
    _instantiated;

  function _init() {
    return {
      getUser: function() {
        return _username;
      },
      setUser: function(newUser) {
        _username = newUser
      }
    }
  }

  return {
    getInstance: function() {
      if (!_instantiated) {
        _instantiated = _init();
      }
      return _instantiated;
    }
  }
}())
var user = singleton.getInstance();

console.info(user.getUser()); // Mr.Yu

user.setUser('Jeffrey Yu');

console.info(user.getUser()); // Jeffrey Yu

var user2 = singleton.getInstance();

console.info(user2.getUser()); // Jeffrey Yu
```
<!--more-->
## 函数重写
```javascript
function Singleton() {
    // the cached instance   
  var instance;
    // rewrite the constructor   
  Singleton = function Singleton() { 
    return instance;   
  };
  console.info(instance);
    // carry over the prototype properties    
  Singleton.prototype = this;
  console.info(Singleton);
    // the instance   
  instance = new Singleton();
  console.info(instance);
    // reset the constructor pointer    
  instance.constructor = Singleton;
    // all the functionality    
  instance.username = 'Mr.Yu';   

    return instance; 
}
var user = new Singleton();
var user2 = new Singleton();
console.info(user.username);  // Mr.Yu
user.username = 'Jeffrey Yu';
console.info(user2.username); // Jeffrey Yu
```
一个单例模式有好几种实现方法，其它都类似，看多都是泪，用第一种就好。

参考：
 - 《JavaScript Patterns》Stoyan Stefanov 