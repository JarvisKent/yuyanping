title: 深入学习 JavaScript call and apply
date: 2016-01-06 22:49:45
tags: [JavaScript]
categories: [Web前端]
---
MDN上对`call`和`apply`的区别如下：
>Note: While the syntax of this function is almost identical to that of call(), the fundamental difference is that call() accepts an argument list, while apply() accepts a single array of arguments.

这2个东东基本是一个作用，都是绑定this的，执行上下文环境，最大区别是参数的不同。来简单做一个题，将数组展开：
```javascript
[[1,2,3],["a","b","c"],[1,2,3]] => [1,2,3,"a","b","c",1,2,3]
```
<!--more-->
这个题目，如果使用一般的方法，肯定需要用`for`来遍历。如果使用`apply`那就会很优雅。实现代码如下：
```javascript
function flattenArray(lol) {
  return [].concat.apply([],lol);
}
console.info(flattenArray([[1,2,3],["a","b","c"],[1,2,3]]));
```
其实apply和call操作，是一个函数`currying`化的过程，这就涉及到高阶函数的概念，在其它文章再记录吧，回头有空再来添加链接。