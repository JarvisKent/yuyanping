title: 《Maintainable JavaScript》笔记之基本格式
date: 2015/12/02 12:00:00
tags: [JavaScript]
categories: [Web前端]
---
最近的项目，写的 js 代码应该也不下万行了，但是一直没有感觉找到比较适合的风格，也看了各种比较流行的库的风格，但是感觉不够系统化的学习，所以找了 **Nicholas C. Zakas** 大神写的这书，来学习，顺便记录里面对我比较有用的东东。
## 命名规范
### 变量和函数
函数和变量的命名，选用的是 **camelCase(驼峰)** 规则。

 * 通常变量开头为 **noun(名词)** ,这是为了能与函数区分开。 
 * 函数命名开头为 **verb(动词)** 

<!--more-->
 一些例子：
```javascript
// Good 
var count = 10; 
var myName = "Nicholas"; 
var found = true;
// Bad: Easily confused with functions 
var getCount = 10; 
var isFound = true;
// Good 
function getName() {    
	return myName; 
}
// Bad: Easily confused with variable 
function theName() {  
  return myName; 
}
```
### 常量
常量延用 **C** 语言的规范，通过 **UPPERCASE(大写)** 和 **underscores(下划线_)** 来组合命名。

```javascript
var MAX_COUNT = 10;
```
### 构造函数
通常构造函数使用 **Pascal case**命名规范，和驼峰命名很相似，不同点在于首字母是大写的。开头单词也应该是名词，这样能区别于，变量和函数的命名。
### 原始数据类型
一些原始数据类型，比如numbers,strings,booleans,null,undefined 在使用中也需要注意一些规则。
#### Strings
在JavaScript里面可以使用 **single quotes('单引号)** 或者 **double quotes("双引号)** 使用哪种纯属个人喜好，比如我同时在开发back-end和front-end，一般会选用 double quotes。
**字符串的换行连接**：
```javascript
// Good 
var longString = "Here's the story, of a man " +
                	"named Brady."; //这里在markdown里面解析不一致？
```
注：如无特殊说明，本文多数代码引用 《Maintainable JavaScript》
 
