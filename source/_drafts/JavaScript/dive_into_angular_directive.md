title: 深入 AngularJS Directive
tags: [AngularJS,JavaScript]
categories: [Web前端]
date: 2016-02-29 19:58:07
---
## Tips
### 直接返回函数
如果directive直接返回一个函数，这个函数等同于link。
### 同时定义link和compile
在同时定义link和complie的时候，link会被忽略。
[compile]:https://docs.angularjs.org/api/ng/service/$compile
