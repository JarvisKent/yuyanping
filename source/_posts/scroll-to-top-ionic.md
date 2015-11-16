title: ionic 手机 APP 返回顶部
date: 2015/11/15 16:01:00
tags: [Ionic]
categories: [Web前端]
---
最近在用 ionic 做的一个项目，当用户数据太多的时候，如果要往上拉就挺麻烦的，我就想能不能在手机上也能实现在网页中的回到顶部的效果呢？毕竟 ionic 是基于 jQuery 的框架，要是 jQuery能做的，用到 ionic 中应该也是没有问题的，下面是实现以后的动态效果图：
![scroll-to-top](http://static.yuyanping.com/wp-content/uploads/2015/07/back-to-top_thumb.gif)
要实现这个功能也不是挺难的，需要使用到 Ionic 的  $ionicScrollDelegate API ，下面是一些实现代码和步骤：

## 步骤

### 下载jQuery

到[jQuery](http://jquery.com/)官网下载 js 文件，这个功能需要用到 Js 的 fadeIn 和 fadeOut 。
<!--more-->
## 创建新项目
1、使用 Ionic start goTop tabs 命令创建一个新的空白项目（或者直接使用到你现有的项目中去），创建好之后，可以到 templates 文件里面找一个包含 ion-view 标签的html 文件，随便都可以，之后复制如下代码，覆盖原来网页的代码：
```html
<ion-view view-title="{{moveData}}">
  <ion-content on-scroll="getScrollPosition()" >
    <ion-list>
      <ion-item ng-repeat="playlist in playlists" href="">
        {{playlist.title}}
      </ion-item>
    </ion-list>
  </ion-content>
    <div  class="scrollToTop" ng-click="scrollTop()"></div>
</ion-view>
```
2、导入 刚才下载的 jQuery 到项目中来，放到 **ionic.bundle.js** 之前，否则可能出错。

3、添加 CSS 样式，下载图标[文件](http://static.yuyanping.com/wp-content/uploads/2015/07/back-to-top.png)。
```css
.scrollToTop{
  height: 48px;
  width: 48px;
  position: fixed;
  bottom: 15%;
  right: 5%; 
  z-index: 1000;
  display:none;
  background:url('../img/back-to-top.png') no-repeat;
}
```
4、添加如下 代码到你的 Controller 中，不要忘记注入依赖：**$ionicScrollDelegate**
```javascript
  $scope.scrollTop = function() {//ng-click for back to top button
    $ionicScrollDelegate.scrollTop();
  };
 
 $scope.getScrollPosition = function() {
 //monitor the scroll
  $scope.moveData = $ionicScrollDelegate.getScrollPosition().top;
 
  if($scope.moveData>=250){
      $('.scrollToTop').fadeIn();
   }else if($scope.moveData<250){
       $('.scrollToTop').fadeOut();
   }
    
  };
 
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },   { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },   { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },   { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },   { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },   { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },   { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 }
  
   ];  
```
运行看看应该是没有问题了，上面的 moveData 是用来比对当前 scroll 的位置，如果超过设定的值 就 fadeIn 小于 就 fadeOut。

## 后续

在这个简单的新建项目实验可以用，但是放到我的项目中就没办法用了，后面找了下，原来是因为我项目中已经存在一个 Scroll 区域，直接用 $ionicScrollDelegate 中的 **getScrollPosition().top** 得到的会全部为 0，

这时候要用到 **$getByHandle()** ，使用这个之前你先要在 html 文件里面 加 delegate-handle=”homeScroll” 标签，比如说我加在 ion-content 里，之后在 controller 里面如下调用：
```javascript
$ionicScrollDelegate.$getByHandle('homeScroll').getScrollPosition().top
```
可以看看官方的文档，写的还是比较清楚的。

如果还有不懂的朋友就下载完整代码看看吧 [scroll-to-top](https://github.com/HelloYu/scroll-to-top-of-ionic
)


