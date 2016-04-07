title: 搞定 property 和 attribute
tags: []
categories: [Web前端]
date: 2016-03-25 19:58:07
---
有两个单词`property`和`attribute`，经常在计算机中被使用到，也很容易混，下面说说我的简单理解。
拿前端元素来举例，一个div元素如下：
```javascript
<div id='Attribute'></div>
```
上面的id就是attr，可以使用如下代码访问property:
```javascript
var div = document.getElementById('attribute');
console.info(div.id);  // Attribute
```
这样粗看，好像prop和attr代表同一个东西？只是一个在表现层，一个在行为层。
### 命名的区别
也许大多数情况确实如此，举个常见的情况，在DOM元素中有`class`这个attr，而在js中是使用`className`这个prop来表示，因为class是保留字