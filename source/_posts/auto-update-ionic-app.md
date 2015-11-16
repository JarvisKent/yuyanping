title: ionic 手机APP 自动升级更新(android)
date: 2015/11/15 16:00:00
tags: [Ionic,ngCordova]
categories: [Web前端]
---
这两天在编写 ionic手机APP的升级模块，做完了在这里记录下分享给有需要的朋友，也可以给自己做一个备忘。

需要安装的插件如下：
```bash
cordova plugin add cordova-plugin-file  //文件
cordova plugin add cordova-plugin-file-transfer //下载
cordova plugin add https://github.com/pwlin/cordova-plugin-file-opener2.git //安装
cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git   //版本
```
<!--more-->
先到自己的项目根目录安装上面的插件，再 module一个 service 复制如下代码到你的 service 里面：
```javascript
this.checkUpdate = function() {
  //从服务端获取最新版本的Json信息，需要和本地比对用的
  var url = 'http://xxx.xxx.xxx/update.json';
  $http.get(url).success(function(res) {
    var serveAppVersion = res.version;
    $cordovaAppVersion.getAppVersion().then(function(version) {
      //如果本地于服务端的APP版本不符合
      if (version != res.version) {
        showUpdateConfirm(res);
      } else {
        //当前已经是最新版本
        $cordovaToast.showLongCenter('当前版本是最新的！=^_^=');
      }
    });
  })
}
var showUpdateConfirm = function(data) {
  var confirmPopup = $ionicPopup.confirm({
      title: '升级到最新版本：v'+data.version,
      template: data.info, //从服务端获取更新的内容
      cancelText: '取消',
      okText: '升级'
  });
  confirmPopup.then(function(res) {
    if (res) {

      $ionicLoading.show({
          template: "已经下载：0%"
      });

      var url = 'http://xxx.xxx.xxx/your.apk'; //可以从服务端获取更新APP的路径
      var targetPath =  '/sdcard/Download/your.apk'; //APP下载存放的路径，可以使用cordova file插件进行相关配置
      var trustHosts = true
      var options = {};

      $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function(result) {
          // 打开下载下来的APP
          $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive').then(function() {
              // 成功
         
          }, function(err) {
              // 错误
          });

          $ionicLoading.hide();
      }, function(err) {
          $ionicLoading.hide();
      }, function(progress) {
          //进度，这里使用文字显示下载百分比
           var downloadProgress ;

          $timeout(function() {
            downloadProgress = (progress.loaded / progress.total) * 100;
            $ionicLoading.show({
              template: '已经下载：' + Math.floor(downloadProgress) + '%'
            });
            if (downloadProgress > 99) {
              $ionicLoading.hide();
            };
          })

      });
    } else {
      // 取消更新
    }
  });
}
```
不要忘记注入相关依赖
$http, $cordovaAppVersion,$cordovaToast, $ionicActionSheet, $timeout, $ionicPopup, $ionicLoading, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2

注意

上面的代码是不能在浏览器运行的,只能到手机端进行测试！
