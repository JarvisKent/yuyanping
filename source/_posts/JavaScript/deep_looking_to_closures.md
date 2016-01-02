title: 深入学习 JavaScript 闭包
date: 2015-12-31 19:09:45
tags: [JavaScript]
categories: [Web前端]
---
对闭包还是有点模糊，来一次彻底的学习。下面是[MDN][MDN]上关于 **Closures**的简短定义。
>Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure 'remembers' the environment in which it was created.

注意最后的**created**，哇，明白了！来上代码。
<!--more-->
```javascript
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
    console.info(this);
  }
  return displayName;
};

var myFunc = makeFunc();
myFunc()
```
上面返回的`myFunc`函数,虽然是在**window**环境中执行的，但是还是能调用到makeFunc中的`name`。而且打印出来的`this`是window，而不是makeFunc。this和闭包的关系经常容易被搞混，this 是指向调用执行 的上下文环境，闭包包括了函数定义的环境。
## 私有化
闭包可以用来模拟，Java中的私有属性和方法。代码如下：
```javascript
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var counter1 = makeCounter();
var counter2 = makeCounter();
alert(counter1.value()); /* Alerts 0 */
counter1.increment();
counter1.increment();
alert(counter1.value()); /* Alerts 2 */
counter1.decrement();
alert(counter1.value()); /* Alerts 1 */
alert(counter2.value()); /* Alerts 0 */
```
其实不论包了多少层函数，最内层都是可以引用到，最外层函数的变量或者方法。以后有遇到问题再来做笔记。


[MDN]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures "Mozilla developer network"