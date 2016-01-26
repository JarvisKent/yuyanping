title: Write a generic function chainer
tags: [JavaScript,CodeWars]
categories: [Coding Fun]
date: 2016-01-12 19:58:07
---
## Quiz
Write a generic function chainer that takes a starting value, and an array of functions to execute on it (array of symbols for ruby).

The input for each function is the output of the previous function (except the first function, which takes the starting value as it's input). Return the final value after execution is complete.
```javascript
function add(num) {
  return num + 1
}

function mult(num) {
  return num * 30
}

chain(2, [add, mult]);
// returns 90;
```
<!--more-->

## My Solutions
```javascript
function chain(input, fs) {
// implement the "chain" function
  var result = input;
  for (var i = 0,len =  fs.length; i < len; i++) {
    result = fs[i](result);
  }
  return result;
}
```
## Top Votes Solution
```javascript
function chain(v, fns) {
  return fns.reduce(function(v, fn) { return fn(v) }, v);
}
```
so, the top solution use `reduce` method, see [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) for more information. I think reduce method is not faster than for iteration.