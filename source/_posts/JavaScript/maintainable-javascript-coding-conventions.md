title: 《Maintainable JavaScript》编码规范
date: 2015-12-08 09:09:45
tags: [JavaScript]
categories: [Web前端]
---
都是干货，备忘。
## 缩进(Indentation)
```javascript
// Good 
if (true) {    
    doSomething(); 
}
```
<!--more-->
**Douglas Crockford**大神喜欢用4个空格(space)其实我比较喜欢1个tab，个人喜好吧，也看自己团队的风格。只要不混用就行。当然tab可能在不同的编辑器会有不同的缩进效果，如果都是统一tab我想问题不大。
**注：**因为GitHub上面用tab表现的效果不太好，现在开始统一使用2个space。2016-1-1
## 一行长度(Line Length)
```javascript
// Good 
doSomething(argument1, argument2, argument3, argument4,
        argument5);
```
一行长度为**80**个字符，超过的到下一行缩进**8**个字符，8个空格或4个tab。
## 对象字面量定义(Object Literals)
```javascript
// Good 
var object = {
    key1: value1,    
    key2: value2,
    func: function() {
        // do something
    },
    key3: value3 
};
```
我喜欢变量在前，函数在后，函数内缩进一个tab。
## 函数申明(Function Declarations)
```javascript
// Good 
function doSomething(arg1, arg2) {
    return arg1 + arg2;
}
```
函数申明要注意的是括号要紧跟在函数名后，一个空格跟大花括号(braces)。
## 返回语句
```javascript
return;
return collection.size();
return (size > 0 ? size : defaultSize);
```
## for 语句
```javascript
// Good 
var i,
    len;
for (i=0, len=10; i < len; i++) {
    // code 
}
```
for 语句中的临时变量不要在初始化的时候进行申明。

## 总结
其实很多著名的库都有自己的编码风格，Douglas Crockford 大神的风格也只是一个参考，并没有规定一定要这么写代码才可以。主要是找到一个自己看的舒服的，或者团队一起,习惯使用的。


