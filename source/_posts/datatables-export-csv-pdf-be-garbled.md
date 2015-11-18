title: DataTables导出CSV、PDF中文乱码解决方法
date: 2015/11/01 12:00:00
tags: [pdfMake,DataTables,JavaScript]
categories: [Web前端]
---
在使用DataTables(V1.10.8 [2015-8-28])导出`CSV`、`PDF`文件时，中文会显示乱码，CSV需要对头部编码进行设置，PDF导出乱码是因为默认的字体不支持中文，我们需要替换字体
## CSV乱码解决方法
编辑DataTables源码文件`buttons.html5.js`找到如下代码段进行替换：
<!--more-->
```javascript
auto_bom = function(blob) {
	// prepend BOM for UTF-8 XML and text/* types (including HTML)
	//解决csv中文乱码问题
	if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type) || 
	blob.type == "text/csv") {
    return new Blob(["\ufeff", blob], {
      type: blob.type
    });
	}
	return blob;
}
```
## PDF乱码解决方法
因为DataTables调用的是**pdfMake**进行导出PDF，而pdfMake自带的字体无法支持中文，需要我们自己生成`vfs_fonts.js`进行替换，步骤如下：
### 安装Grunt及模块
首先运行如下命令：
```javascripyt
npm install -g grunt-cli
```
再到pdfMake**源代码**目录运行：
```javascript
npm install grunt --save-dev
```
之后再安装需要用到的模块：
```javascript
npm install grunt-dump-dir --save-dev
```
建议使用淘宝的`cnpm`速度会快很多。
### 编译自定义vfs_fonts.js文件
将下载的ttf字体文件放到项目`examples\fonts`目录下，在pdfMake根目录下运行如下命令：
```javascript
grunt dump_dir
```
如果运行成功将显示如下消息：

>File "build/vfs_fonts.js" created.
>Done, without errors.

现在可以将**build/vfs_fonts.js**文件引到自己的项目中来，再进行注册自定义字体的设置。
### 在项目中注册自定义字体
这里需要对`pdfMake.fonts`进行注册自己的自定义字体，在页面头部进行`javascript`载入初始化
```javascript
	pdfMake.fonts  = {
   msyh: {
      normal: 'msyh.ttf'
   		}
	};
```
**msyh**是我自定义的字体名称，使用的是微软雅黑字体，在你的`docDefinition`中将默认字体设置成你前面向pdfMake注册过的字体就可以了。
```javascript	
 	var docDefinition = {
  	 content: '测试pdfMake中文导出乱码', 
  	 defaultStyle: {
    		font: 'msyh'
  		}
};
 ```
附件是我使用的pdfMake和DataTables还有我使用微软雅黑编译的vfs_fonts.js文件。
[pdfMake][pdfMake]
[DataTables-1.10.8][DataTables-1.10.8]
[vfs_fonts.js][vfs_fonts]
[pdfMake]:http://7xoed1.com1.z0.glb.clouddn.com/2015/pdfmake-master.zip "pdfMake"
[DataTables-1.10.8]:http://7xoed1.com1.z0.glb.clouddn.com/2015/DataTables-1.10.8.zip "DataTables-1.10.8"
[vfs_fonts]:http://7xoed1.com1.z0.glb.clouddn.com/2015/vfs_fonts.js "vfs_fonts"
