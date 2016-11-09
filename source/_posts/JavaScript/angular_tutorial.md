title: AngularJS 开发介绍
tags: [AngularJS,JavaScript]
categories: [Web前端]
date: 2016-02-20 19:58:07
---
## 路由
AngularJS实现路由系统有两个框架可供选择，自带的[ngRouter](https://docs.angularjs.org/tutorial/step_07)和社区提供的[UI-Router](https://github.com/angular-ui/ui-router)，下面只进行后者的使用介绍。
### UI-Router 简单使用
使用UI-Router实现SPA(单页面应用程序)开发的好处在于，能共享页面和页面之间的状态，信息等，不再像传统前端页面之间的信息无法直接共享使用。相较于ngRouter，UI-Router更加强大。先来看一个简单的路由例子[Live Demo](http://codepen.io/HelloYu/pen/ZQPMqR?editors=1010)
#### ui-sref 和 ui-view
Demo中的html页面有如下代码：
```javascript
<div ng-app="app">
  <a ui-sref="simple">Go to state</a>
  <div ui-view></div> 
</div>
```
<!--more-->
[ui-sref](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref)和[ui-view](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-view)，前者类似于`<a>`标签，后者类似于`<iframe>`，通过前者进行资源状态跳转，后者进行模板显示。

>ionic使用`<ion-nav-view>`</ion-nav-view>来替代ui-view。

跳转方式大致有如下三种：

 - $state.go() 
 - ui-sref 
 - url

其中只有第一种是在行为层或者逻辑层使用，其它都在表现层使用。
#### ui-router 的配置
使用之前，需要进行配置跳转规则，再来看看Demo中的配置代码：
```javascript
$stateProvider.state('simple', {
    url: '/simple/:param',
    template: viewTemplate,
    controller: 'viewCtrl'
  });
```
使用[$stateProvider](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider)对路由进行配置，第一个参数，代表**状态名称**，后面是配置参数。
#### ui-router url参数传递
很多时候，比如使用RESTful接口，需要根据URL参数，进行资源定位，这时候需要借用[$stateParams](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateParams)模块，获取上一个页面传递的参数，当然也是可以直接在控制器里面设置，不过一般都是在view层进行的。更多资料参看[URL Parameters](https://github.com/angular-ui/ui-router/wiki/URL-Routing#url-parameters)
#### @
`viewname@statename`的格式，在ui-router中被用来表示绝对视图，符号前是视图，符号后是state名称，有绝对当然会有相对，来看如下代码段：
```html
<!-- index.html (root unnamed template) -->
<body ng-app>
<div ui-view></div> <!-- contacts.html plugs in here -->
<div ui-view="status"></div>
</body>

<!-- contacts.html -->
<h1>My Contacts</h1>
<div ui-view></div>
<div ui-view="detail"></div>

<!-- contacts.detail.html -->
<h1>Contacts Details</h1>
<div ui-view="info"></div>
```
`module.js`
```javascript
$stateProvider
  .state('contacts', {
    // 可以看到这里没有设置views，那他会显示在父级未全名的view中。
    templateUrl: 'contacts.html'   
  })
  .state('contacts.detail', {
    views: {
        
        // 相对视图
       
        // 在views中设置相对视图，这个视图在父级中
        // <div ui-view='detail'/>  contacts.html
        "detail" : { },            

        // 设置一个未命名的视力，相当于不设置
        // <div ui-view/>  contacts.html
        "" : { }, 

        // 绝对视图

        // <div ui-view='info'/>  contacts.detail.html
        "info@contacts.detail" : { }

        // 内容显示在`contacts`中的`detail`视图内
        // <div ui-view='detail'/>  contacts.html
        "detail@contacts" : { }

        // 内容显示在`contacts`中的未命名的视图内
        // <div ui-view/> within contacts.html
        "@contacts" : { }

        // state未命名，那就是 root，这里就是Index
        // <div ui-view='status'/> index.html
        "status@" : { }

        // state和view都没命名，那就是root中的未命名视图
        // <div ui-view/>  index.html
        "@" : { } 
  });
```
看完上面的代码，对相对视图和绝对视图应该会有一定的了解，使用`@`来指明在哪个视图显示，需要通过state名称和view名称来组成唯一的视图标识，这样就能进行绝对视图的定位显示。

### UI-Router 多路由嵌套
通过路由嵌套来实现页面的部分更新，而不需要向服务器请求整个网页，提高用户体验，先来看一张ui-view的布局图![ui-router-nested](http://7xoed1.com1.z0.glb.clouddn.com/2016/Angular_tutorial/ui-router-nested.png "ui-view嵌套")
上面布局适合大多数的网页，下面来看看部分的实现代码：
```javascript
.state('top', {
    template:"<ui-view/>"
})
.state('top.middle', {
    template:"<ui-view/>"
})
.state('top.middle.bottom', {
    template:"<ui-view/>"
})
```
通过`.`表明继承关系，ui-router足够聪明，它知道各路由间的父子关系。一个路由中你可以嵌套任意多的路由，当然这个量也需要自己把握不能太多，不然容易导致浏览器内存泄漏导致崩溃。
## 特性

>Angular Prefixes \$ and \$\\$: To prevent accidental name collisions with your code, Angular prefixes names of public objects with \$ and names of private objects with \$\\$. Please do not use the \$ or \$\\$ prefix in your code.

上面是[Angular API][Angular API]文档的第一句话，`$`是公有对象和`$$`是私有对象保留前缀，请不要使用！
### directive
可以这么说，指令系统是angular框架的基石，所以弄懂如何使用[directive](https://docs.angularjs.org/guide/directive)是相当重要的。指令分为系统自带(built-in)和自定义(custome)两种，前一种如：`ng-model`、`ng-show`、`ng-if`等，我们需要学习如何自己定义指令，使用指令的好处有如下：

 - 模块化
 - 数据表现分离
 - 可复用
 - 可测试

先来看一个简单的[Demo](http://codepen.io/HelloYu/pen/GoLwVP)
下面是指令的所有定义选项：
```javascript
var myModule = angular.module(...);

myModule.directive('directiveName', function factory(injectables) {
  var directiveDefinitionObject = {
    priority: 0,
    template: '<div></div>', // or // function(tElement, tAttrs) { ... },
    // or
    // templateUrl: 'directive.html', // or // function(tElement, tAttrs) { ... },
    transclude: false,
    restrict: 'A', 
    templateNamespace: 'html',
    scope: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    controllerAs: 'stringIdentifier',
    bindToController: false,
    require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
      // or
      // return function postLink( ... ) { ... }
    },
    // or
    // link: {
    //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
    //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
    // }
    // or
    // link: function postLink( ... ) { ... }
  };
  return directiveDefinitionObject;
});
```
其中`restrict`、`scope`、`template`等是比较常用的，这里只介绍一些常用的属性，如果想深入，参看[$compile](https://docs.angularjs.org/api/ng/service/$compile)。
#### scope
scope有三个选项，设置指令的域，如下：

 - `false`: 当scope设置成false，会使用父级scope，不生成新的scope。
 - `true`: 当scope设置成true，会生成一个孩子scope，可访问父scope的内容。
 - `{}`: 当scope设置成{}，将会生成一个隔离的scope，不会继承父scope中的内容，在编写可重用组件的时候很常用。

隔离的scope有时候也需要和父scope共享信息，这时候需要借用一些申明符号，来引用绑定在html指令上的数据，有如下四种符号：

 - `@` or `@attr` 变量的值引用，只能是字符串，单向绑定，父域变化会影响子域，子域无法影响父域。
 - `=` or `=attr` 同上，但是是双向绑定，绑定的是对象。
 - `<` or `<attr` 同上，但是是单向绑定，和@有区别，绑定的是对象。
 - `&` or `&attr` 绑定方法，可以在指令中运行父域的方法。

`index.html`
```html
  <!-- for @ -->
  <my-component my-attr="hello {{name}}">
  <!-- for & -->
  <my-component my-attr="increment()">
```
`directive.js`
```javascript
  scope: { localName:'@myAttr' }
  scope: { localFn:'&myAttr' }
```
 在指令中就可以使用`localName`来引用绑定在my-attr上的值，当html中name发生变化的时候，localName也会跟着改变。可以在指令中调用`localFn({amount: 22})`。
#### restrict
有四个字符，代表使用方式，可以任意组合，如下：
 
 - E - 元素标签: `<my-directive></my-directive>`
 - A - 属性: `<div my-directive="exp"></div>`
 - C - Class: `<div class="my-directive: exp;"></div>`
 - M - 注释: `<!-- directive: my-directive exp -->`

默认不设置的话是`E`和`A`。
#### template
可以是字符串，也可以是函数，设置指令的模板：
 
 - 字符串形式 template: `<div red-on-hover>{{delete_str}}</div>`
 - 函数形式 template: `function(iElement,iAttr)` 有两个参数，一个代表这个指令所在元素，一个是属性集合。

#### templateUrl
和template相似，通过url指定模板。
#### transclude
有三个可选形式：
 
 - true : 转换指令内的元素（很抽象对吧，没事后面看例子）
 - 'element' : 转换所有元素，包括优先级比当前指令低的指令（还是抽象！这个要到一定水平才会用）
 - {...} (对象hash表) 对模板内的内容进行映射，也很高级，暂时没用到。

`directive.js` 
```javascript
angular.module('docsTransclusionDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.name = 'Tobias';
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'my-dialog.html'
  };
});
```
`index.html`
```html
<div ng-controller="Controller">
  <my-dialog>Check out the contents, {{name}}!</my-dialog>
</div>
```
`my-dialog.html`
```javascript
<div class="alert" ng-transclude></div>
```
上面的 "Check out..." 将会被转换到 `ng-transclude` 标记的div内部。

#### link & compile
使用link的简单[demo](http://codepen.io/HelloYu/pen/gPJWrP)，注意写directive的时候，如果向DOM添加了`Listener`,记得要手动删除，不然可能会导致内存泄漏。暂时未组织好简单易懂的方法，以后来补充修改，参看[[AngularJS系列(5-2)] Directive - Compile vs. Link](http://hellobug.github.io/blog/angularjs-directive-2-compile-vs-link/)
### $q
$q是angular项目在网络数据请求的时候经常用到的服务，这个服务提供方法异步执行的能力。看如下代码：
```javascript
function async() {
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: '/someUrl'
  }).then(function successCallback(response) {
    deferred.resolve(response);
  }, function errorCallback(err) {
    deferred.reject(err);
  });
  return deferred.promise; 
}

async().then(function(success) {
  // 请求成功 resolve后的结果
},function(err){
  // 失败 reject后的结果
})
```
更多的使用方法请参看[$q](https://docs.angularjs.org/api/ng/service/$q)API文档
### factory & service
facotry和service很类似，只是实例化方式有所区别，参看[service vs factory vs provider](http://www.oschina.net/translate/angularjs-factory-vs-service-vs-provider)

### filter
[filter](https://docs.angularjs.org/guide/filter)也分为built-in和custome，内建的[filter](https://docs.angularjs.org/api/ng/filter)有多种可选类型，看个使用`filter`类型的[demo](http://codepen.io/HelloYu/pen/JGVzNb)。最重要的还是自定义filter，和factory这些定义都类似，注入到 controller/service/directive 中的时候要注意是以`<filterName>Filter`形式，比如说一个filter叫number，注入时就要写成numberFilter。看一个实际使用的例子：
`filter.js`
```javascript
angular.module('myReverseFilterApp', [])
.filter('reverse', function() {
  return function(input, uppercase) {
    input = input || '';
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
})
.controller('MyController', ['$scope', 'reverseFilter', function($scope, reverseFilter) {
  $scope.greeting = 'hello';
  $scope.filteredGreeting = reverseFilter($scope.greeting);
}]);
```
`index.html`
```javascript
<div ng-controller="MyController">
  <input ng-model="greeting" type="text"><br>
  No filter: {{greeting}}<br>
  Reverse: {{greeting|reverse}}<br>
  Reverse + uppercase: {{greeting|reverse:true}}<br>
  Reverse, filtered in controller: {{filteredGreeting}}<br>
</div>
```
注意在定义的时候，函数第一个参数是`input`，这是filter所过滤对象的值，`reverse:true`才是第二个参数。如果定义有更多的参数也就是`:param2`这样的形式。
也可以使用[$filter](http://docs.angularjs.cn/api/ng/service/$filter)获取filter使用：
```javascript
angular.module('filterExample', [])
.controller('MainCtrl', function($scope, $filter) {
  $scope.originalText = 'hello';
  $scope.filteredText = $filter('uppercase')($scope.originalText);
});
```
### ngRepeat
#### 注意$index

### ngOptions(select)

[demo](http://codepen.io/HelloYu/pen/pjmmGN)
### 组件通信
各组件有时候要共享信息，通常使用的方法有如下几种：

 - \$broadcast、\$emit、\$on
 - $scope
 - service
 - 本地存储

这里来介绍下各组件（有继承关系）之间的通信，组件之间的实时通信使用[$broadcast](https://code.angularjs.org/1.3.15/docs/api/ng/type/$rootScope.Scope#$broadcast)向下广播、[$emit](https://code.angularjs.org/1.3.15/docs/api/ng/type/$rootScope.Scope#$emit)向上广播、[$on](https://code.angularjs.org/1.3.15/docs/api/ng/type/$rootScope.Scope#$on)订阅广播，主要是用在父controller和子controller之间逻辑处理完成后的通知通信。[Live Demo](http://codepen.io/HelloYu/pen/adxQwm)
## 测试 
暂时未准备好材料，以后完善。
### Unit Testing
`Jasmine`+`Karma`+`ngMock`
### E2E Testing
E2E(End-to-end)，多个组件联调测试，使用`Protractor`+`Mocha`。
## 模块化
使用Angular进行大型的项目开发，如果没有进行模块化，无论是开发效率还是后期维护，成本都太高。模块化主要从两方面进行：
 
 - 视图组件模块化
 - 逻辑模块化

视图模块化主要通过`directive`指令，对代码进行封装，要尽量做到高内聚，低耦合。逻辑模块化主要遵循`职责单一`原则。
## 规范化
以下内容多数进行重新整理，参看《[前端组队“打怪”规范](/Front_End/front_end_team_development_style)》
### 项目结构
首先从一开始构建项目说起，我比较喜欢手动去创建项目结构，跟随自己的思路，将项目一点一点构建起来，下面推荐如下两种项目结构：
![NgStructure](http://7xoed1.com1.z0.glb.clouddn.com/2016/Angular_tutorial/NgStructure.jpg "项目组织结构")
左边的是以`type`进行分类，右边的是以`domain`进行分类，我推荐使用右边的方式，有利于模块化开发，当然也可以两种方式混合使用。
### 职责单一
Angular是**MVVM**(Model-View-ViewModel)模式的代表，来看一张图，就明白是怎么回事。
![mvvm](http://7xoed1.com1.z0.glb.clouddn.com/2016/Angular_tutorial/mvvm.png "mvvm")
`vm`其实就是view和model进行绑定，view层发生改变，model层也会实时做出响应。借用这个模式，我们再对项目进行模块化分类，这就需要对项目在结构上更进一步的细分，比如：一个contacts模块下，有自己的controller、service和model，这些都要单独分开，使用`.controller(ctrl)`<.service、.model>命名规范，对每一个文件进行区分，一个文件内的代码遵循**职责单一**原则，如下图：
![single-responsibility](http://7xoed1.com1.z0.glb.clouddn.com/2016/Angular_tutorial/single-responsibility.png "职责单一")
不对啊，这样一个大项目那不是有上千个JS文件啊！那么多文件不是要加载好多次么？哈哈，Naive！你要知道这些是给人看的，是在开发环境才这么做，生产环境需要进行模块化打包。这样做的好处是，一个文件基本不会有太多的代码量，后期维护成本极低，代码复用性很高！
### 项目风格
项目风格的选择，我推荐johnpapa写的[Angular Style Guide][Angular style guide]，其中比较重要的一点是，隔离scope，在开始写angular项目的时候，往往把所有的属性和方法都挂在scope下，而这个scope经常是传递给子scope，很多时候子scope根本没必要访问到父域中的属性和方法，有时候还有可能污染到父域中的东东，所以这里强烈推荐，`controller`以如下的方式使用：
`index.html`
```html
<div ng-controller="CustomerController as customer">
  {{customer.user.name}}
</div>
```
`controller.js`
```javascript
function CustomerController() {
    var vm = this;
    vm.user = {};
    vm.user.name = 'Jeffrey Yu';
}
```
### 编码规范
编码风格,个人有个人的喜好，其实呢，很多的人是没有风格，想怎么写就怎么写，空格和tab混用，变量名随便起，风格不统一，在一个小团队，就那么几个人的时候，可能问题还不是很大，当项目到一定规模需要多人协同开发的时候，问题就会越来越多了，当然起变量名这种事，在一般的小公司估计要统一也是不太容易的，但是一定要切记**尽量不要混用tab和空格**进行缩进，不同的系统对tab解析规则不同，会有不同的表现，不然就使用tab，不然就全用空格，我推荐全部使用空格(GitHub仓库缩进好看！)。参见[《Maintainable JavaScript》编码规范](http://www.yuyanping.com/JavaScript/maintainable-javascript-coding-conventions/)、[变量命名](http://www.yuyanping.com/JavaScript/maintainable-javascript-basic-format/#u547D_u540D_u89C4_u8303)


## 资料
 - [AngularJs开发第一次技术分享演讲](http://v.youku.com/v_show/id_XMTQ3OTgxMjc3Mg==.html) 有很多可以提高的地方。
 - [AngularUI-Router 演示文档](http://slides.com/helloyu/ui-router#/)
 - [AngularJS 学习资料大全](https://github.com/jmcunningham/AngularJS-Learning)
 - [AngularJS 学习书籍合集](http://pan.baidu.com/s/1kTXDOKf) 密码: 5tfg
 - [AngularJS style guide][Angular style guide]
 - [AngularUI-Router Event](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#events-1)
 - [AngularUI-Router Demo](http://ui-router.github.io/sample-app/#/home)
 - [AngularUI-Router API](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-view)
 - [Angular开源实例项目](https://github.com/angular/angular.js/wiki/Projects-using-AngularJS)
 - [AngularUI](http://angular-ui.github.io)
 - [AngularJS API][Angular API]

## 学习手段

 - [CodePen.io](http://codepen.io) 超cool的地方，前端大神分享神作的地方。
 - 在线代码编辑调试推荐：CodePen、jsFiddle、jsBin、Plunker，我一般只使用codepen。
 - GitHub 这么有名不用介绍了。
 - YouTube 上面的学习视频资料相当丰富，质量也高，每个开源项目几乎都有自己的channel。
 - Google 像Angular、ionic这种的框架，中文资料还是相对较少。
 - [stackOverflow](http://stackoverflow.com) 找不到答案的时候，可以Post到上面去问。前提是实在是找不到！

## 后记
此文章主要目的是作为索引，后续会把内容单独抽取成文章，在通过这篇文章链接起来。个人精力和能力有限，暂时先记录这么多，如果文中有错误，请留言提出，非常感谢！

[Angular style guide]:https://github.com/johnpapa/angular-styleguide
[Angular API]:https://docs.angularjs.org/api

