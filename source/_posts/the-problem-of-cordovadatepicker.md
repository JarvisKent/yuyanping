title: 关于 $cordovaDatePicker 默认时间控件样式的问题
date: 2015/11/02 12:00:00
tags: [ngCordova,Ionic,JavaScript]
categories: [Web前端]
---
最近在做一个需要根据时间进行历史记录查询的功能模块，使用 ngCordova 的 $cordovaDatePicker 插件，但是有个问题，在手机上弹出的时间选择窗口是传统的 android 主题样式，不是 Holo.light 这样的主题，我修改了 配置文件还是一样的效果，捣腾了好一段时间也没有解决，最后想到应该是这个插件的问题，到官<!--more-->网看了下也没有什么更详细的信息，最后打开源代码一看，不看不知道，一看吓一跳啊！

原来源代码里面将主题默认设置成传统模式，而且也没有在官方的文档提供属性说明，但是源代码里面却有这个可设置属性，属性如下：
```javascript
DatePicker.prototype.ANDROID_THEMES = {
  THEME_TRADITIONAL          : 1, // default
  THEME_HOLO_DARK            : 2,
  THEME_HOLO_LIGHT           : 3,
  THEME_DEVICE_DEFAULT_DARK  : 4,
  THEME_DEVICE_DEFAULT_LIGHT : 5
};
```
坑啊！这么大的坑，我花了半天时间才爬出来，下面是默认的配置属性，只要调用的时候自己修改下就好：
```javascript
var defaults = {
    mode : 'date',
    date : '',
    minDate: 0,
    maxDate: 0,
    cancelText: '',
    okText: '',
    todayText: '',
    nowText: '',
    is24Hour: false,
    androidTheme : window.datePicker.ANDROID_THEMES.THEME_TRADITIONAL, // Default theme 使用的时候根据需要进行赋值 如 2
  };
```
  