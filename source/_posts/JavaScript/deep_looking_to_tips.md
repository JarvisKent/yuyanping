title: 深入学习 JavaScript 一些小事
date: 2016-01-04 19:09:45
tags: [JavaScript]
categories: [Web前端]
---
## 链式申明赋值
```javascript
// antipattern, do not use 
function foo() {
    var a = b = 0;
    // ...
}
```
要避免上面的变量定义，因为这样会成为如下形式：
```javascript
var a = (b = 0);
```
这就相当于b成为隐式全局(可以被删除)变量了。
<!--more-->
## for loop
应该写成下面这种风格比较好：
```javascript
function looper() {
  var i = 0,        
  max,        
  myarray = [];
  // ...

  for (i = 0, max = myarray.length; i < max; i++) {        
    // do something with myarray[i]    
  } 
}
```
## return
return 的时候不要另起一行，不然就等于返回`undefined`：
```javascript
// warning: unexpected return value 
function func() {
  return   // undefined;
    {        
      name: "Batman"    
    }; 
}
```
## Function
函数表达式：
```javascript
var add = function (a, b) {    
  return a + b; 
};
```
注意后面跟着分号(semicolon)。
函数申明：
```javascript
function foo() {    
  // function body goes here 
}
```
后面不需要跟分号。函数申明在函数体内使用，如下：
```javascript
// global scope 
function foo() {}

function local() {    
  // local scope    
  function bar() {}    
  return bar; 
}
```
## Self-Defining Functions 
```javascript
var scareMe = function () {    
  alert("Boo!");    
  scareMe = function () {        
    alert("Double boo!");    
  }; 
};

// using the self-defining function 
scareMe(); // Boo! 
scareMe(); // Double boo!
```
