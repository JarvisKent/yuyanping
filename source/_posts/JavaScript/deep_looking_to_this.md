title: 深入学习 JavaScript this
date: 2016-1-1 19:09:45
tags: [JavaScript]
categories: [Web前端]
---
`this`在刚学习JavaScript的时候，一直搞不清楚它指代的执行环境。其实它很简单，就是一句话：**函数执行的对象环境**。但是理解这句话，其实也并不那么容易。拿点代码来看看：
```javascript
function f1(){
  return this;
}

f1() === window; // global object
```
<!--more-->
这里f1在window环境执行，所以this指向的是window，这很好理解。那再来个难点的：
```javascript
function f1(){
  var that = this;
  function isWindow() {
    console.info(this);  // window
    console.info(that == this);  // true
  }
  isWindow();
}

f1();
```
哎呀，`isWindow`不是在f1里面执行的么？怎么还是指向window，不应该是f1么？记住这句话：**“所有函数，只要没有指明执行对象，this默认指向window”**。我们再来改改：
```javascript
function f1(){
  var that = this;   // window
  function isWindow() {
    console.info(this);  // f1
    console.info(that == this);  // false
  }
  return {
    a: isWindow
  }
}

var t = f1();
t.a();
```
恩，好了，就这么简单，写太多反而容易混乱。
参考链接: [MDN][MDN_this]

[MDN_this]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this "JavaScript this"