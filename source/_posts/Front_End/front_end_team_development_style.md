title: 前端组队“打怪”规范
tags: [前端开发规范,JavaScript]
categories: [Web前端]
date: 2016-02-23 19:58:07
---
## 编码规范
### 缩进
统一使用一个`tab`进行缩进，一个tab规定使用`4`个字符。

### 语句
```javascript
var i,
    len;
for (i=0, len=10; i < len; i++) {
    // code 
}

return (size > 0 ? size : defaultSize);

```
注意`,`后跟一个空格，`var`申明对象的格式，和语句间的空格。
### 函数和变量
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
### 私有变量和方法
私有成员，建议以`_`开头，如下：
```javascript
var _private,
    public;

function getPublic() {}

function _getPrivate() {}
```
### 构造函数
通常构造函数使用 **Pascal case**命名规范，和驼峰命名很相似，不同点在于首字母是大写的。开头单词也应该是名词，这样能区别于，变量和函数的命名。
```javascript
function Person() {
  this.name = 'Jeffrey Yu',
  this.sex = 'unknow',
  this.age = 'unknow'
}

var one = new Person();
```
### Strings
在JavaScript里面可以使用 **single quotes('单引号)** 或者 **double quotes("双引号)** 使用哪种纯属个人喜好，比如我同时在开发back-end和front-end，一般会选用 double quotes。
**字符串的换行连接**：
```javascript
// Good 
var longString = '<div class="awesome"><h2>团队打怪</h2></div> ' +
                 '<section>效率才高</section>'; 
```
字符串统一在JS中使用`'`单引号的形式。
### 常量
常量延用 **C** 语言的规范，通过 **UPPERCASE(大写)** 和 **underscores(下划线_)** 来组合命名。

```javascript
var MAX_COUNT = 10;
```
### 代码长度
建议一行代码长度不超过`80字符`。
## 项目规范
### 职责单一
一个js文件应该是一个最小逻辑功能组件，不要担心文件太多，部署的时候打包就行。
### 项目结构
![NgStructure](http://7xoed1.com1.z0.glb.clouddn.com/2016/Angular_tutorial/NgStructure.jpg "项目组织结构")
左边的是以`type`进行分类，右边的是以`domain`，实际开发可以使用混合的形式，在最外层，使用domain风格，内层使用type风格，如下图：
![ng_structure](http://7xoed1.com1.z0.glb.clouddn.com/2016/Angular_tutorial/ng_structure.png "项目组织实际应用")
### 文件命名
#### 一般性文件
一般性文件，如模板、视图等，建议命名格式为：`{module}`.`<{module type}>`.`{file type}`如：
```javascript
// directives 或 templates 目录内
contact-detail.tpl.html

// views内
contact-list.html

```
没有标明type，像`contact-list.html`就是一个完整的视图，而不是一个模板组件，完整视图中包括多个组件或者视图。
#### 功能性文件
功能性文件，如controller、service、directive等，在type结构下，建议以其功能和使用特征来命名，如下：
```javascript
// controllers
// |-ContactCtrl.js
angular.module('app',[])
    .controller('ContactCtrl')

// services
// |-ContactService.js
angular.module('app',[])
    .factory('ContactService')

// models
// |-ContactModel.js
angular.module('app',[])
    .factory('ContactModel')

// filters
// |-reverseFilter.js
// filter较特殊，在注入使用的时候是这样`reverseFilter`，在页面使用的时候
// 是这样<div ng-repeat="contact in contacts | reverse">
angular.module('app',[])
    .filter('reverse')

// directives
// |-contactList.js
// directive较特殊，需要在html中使用，开头必须小写，使用如<div contact-list>
// 连接符定义时以大写代替。 
angular.module('app',[])
    .directive('contactList')
```
注意**文件夹**多数以**复数**的形式命名。
### 项目风格
项目风格的选择，我推荐johnpapa写的[Angular Style Guide][Angular style guide]，其中比较重要的一点是，隔离scope，在开始写angular项目的时候，往往把所有的属性和方法都挂在scope下，而这个scope经常是传递给子scope，很多时候子scope根本没必要访问到父域中的属性和方法，有时候还有可能污染到父域中的东东，所以这里强烈推荐，`controller`以如下的方式使用：
`index.html`
```html
<div ng-controller="CustomerCtrl as customer">
  {{customer.user.name}}
</div>
```
`controller.js`
```javascript
function CustomerCtrl() {
    var vm = this;
    vm.user = {};
    vm.user.name = 'Jeffrey Yu';
}
```
## 后记
此文章是特定环境下的产物，只供参考。

[Angular style guide]:https://github.com/johnpapa/angular-styleguide
