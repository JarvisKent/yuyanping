title: 使用\$scope.\$watch监听vm(controller as)
date: 2016/3/16 12:00:00
tags: [JavaScript,AngularJS]
categories: [Web前端]
toc: false
---
`controller as`的概念被越来越多人采用，我带领的小组，也全部使用[John Pappa's style guide](https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)所推荐的风格。`$scope.$watch`以前是直接监听绑定在\$scope下的内容，前段时间写的一个组件，在测试的时候没有问题，但是在实际使用中，却监测不到值，发现是对`as` 语法的理解不够深入，来记录下\$scope.\$watch监听as的方法。[demo](http://codepen.io/HelloYu/pen/GZqywL)
## Usage
<!--more-->
\$scope.\$watch常用的方法是监听一个挂载在$scope上的变量，有如下controller:
```javascript
function ScopeWatchCtrl() {
    $scope.data = 0;
    $scope.watchData = ''
    $scope.change = function() {
      $scope.data = $scope.data + 1;
    }
    $scope.$watch('data', function(newVal, oldVal) {
      $scope.watchData = oldVal;
    })   
}
```
可以看到上面直接监听的是`data`这个变量，如果使用as语法要如何使用能？有如下两种：
```javascript
function WatchControllerAsCtrl() {
    vm = this;
    vm.data = 0;
    vm.watchData = ''
    vm.change = function() {
      vm.data = vm.data + 1;
    }
    // 如果界面上controller as some ,这里要写成some.data
    // $scope.$watch('vm.data', function(newVal, oldVal) {
    //     vm.watchData = oldVal;
    //   })
    // 需要和view的as后的别名一样，如果想直接监听vm.data使用如下函数的方式
    $scope.$watch(function() {
        return (vm.data);
    }, function(newVal, oldVal) {
        vm.watchData = oldVal;
    })   
}
```
一种也是和前面scope一样的，如果直接监听的是字符串表达式，`vm.data`前的vm要和view里面as的别名一样，比如我的html如下：
```javascript
<div ng-controller="WatchControllerAsCtrl as hoho">
```
在controller里面的监听表达式就是`hoho.data`，如果使用函数的形式，那直接使用controller里面的别名就行，这里推荐使用函数的形式，如果是字符串，angular会处理后将你的表达式用一层函数wrap（包裹）。

