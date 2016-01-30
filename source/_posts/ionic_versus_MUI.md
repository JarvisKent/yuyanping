title: ionic vs MUI
date: 2016/1/25 16:01:00
tags: [Ionic]
categories: [Web前端]
---
**[Ionic](http://www.ionicframework.com/)** 和 **[MUI](http://dev.dcloud.net.cn/mui/)**，前者是国外最为流行的 Hybrid App 框架，后者在国内较为流行。因为正在使用ionic进行开发，对MUI不熟习，无法进行性能比较，而且没有实际开发经验，很多功能和实现都不了解，或多或少带有主观偏见。这篇文章只供参考。
## UI
从UI方面来看，ionic将UI组件进行directive封装，页面上使用自定义标签或者属性来调用，这样html文件会很干净。MUI的组件逻辑代码嵌入到页面中，习惯了MVVM的模式，今天去看MUI的代码简直头大。客观的来说MUI提供的UI组件会比ionic的多，但是这些组件复用性不太高，几个开源的案例，都是逻辑代码和表现层耦合在一起，修改和维护成本较高。
<!--more-->
## SPA
从`chrome:inspect`可以清楚知道，MUI框架没有路由的概念，所以每点开一个页面，他们都是单独的WebView，页面间的状态无法共享，如果页面间需要传递一些值，我看官网是使用init或者preload，设置`extras`参数。如果要返回上个页面，需要进行多WebView传值，使用官网提供的evalJS方法，参看[自定义事件](http://dev.dcloud.net.cn/mui/event/#customevent)，局限性很大，而且，这个方法应该就是对eval的封装，这个方法并不招人喜欢，参看[JavaScript 为什么不推荐使用 eval？](https://www.zhihu.com/question/20591877)找了很久，也没有找到MUI缓存的概念,这就带来了一个大问题，当有多个WebView的应用，性能就会让你大跌眼镜。参考[怎么看待DCloud起诉APICloud？](https://www.zhihu.com/question/30994540?sort=created)
![MUI_Not_SPA](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/MUI_Not_SPA.png "MUI会出现严重性能问题，而且没有好的解决方案。")
## 文档
在MUI官网转悠了几圈，发现文档写的不太好，还是上图看看吧。
![MUI_doc](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/MUI_doc.png "MUI的API文档，看得挺累的")
![MUI_Response_layout_issue](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/MUI_Response_layout_issue.png "响应式布局没有做好")
## 打包
在打包方面，HBuilder还是挺方便，ionic使用命令行的方式也很方便，我个人还是习惯使用命令行，不太喜欢图形界面的方式进行。
## 社区
这个不用说了，ionic的社区相当的完善壮大，而且还有老大哥Angular，Angular还有老大Google。放张图就知道MUI的社区有多冷清，我不是要黑MUI的，毕竟国产，也需要支持，但是资料找的越多，就越觉得这框架不太靠谱。
![MUI_Not_Response_Number](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/MUI_Not_Response_Number.png "MUI未回复数惊人")
再来看看QQ群的讨论气氛，MUI的群主自称大神，这点就不太受人欢迎，见过的大多数大神都是相当低调的。
![MUI_qq_group](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/MUI_qq_group.png "看来比较闲")
ionic从我进群，就基本上在讨论实际问题，我也乐意给别人解答问题。
![ionic_qq_group](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/ionic_qq_group.png "问题多的回答不过来")
当然以QQ讨论群来说明一些问题，有时候太片面，上面的群我选择都是最靠前的，截图也是随机的，只能作为一定参考。
## GitHub
两个都是开源的框架，再上GitHub看看情况，首先来看看MUI，基本就是只有一个人在维护更新。
![MUI_GitHub_Contributors](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/MUI_GitHub_Contributors.png "后勤无保障")
再来看看ionic，比MUI早一年的时间，但是无论star数量还是团队成员，都是无法比较的。
![ionic_GitHub_Contributors](http://7xoed1.com1.z0.glb.clouddn.com/2016/ionic_versus_MUI/ionic_GitHub_Contributors.png "团队的力量")
## 总结
其实到这里，已经没必要再去比较这两个框架，个人感觉不是一个级别的，如果拿react和ionic进行对比，还是有的一拼的。本人知识水平，精力有限，暂时不再深入的进行分析（再深入就要变成吐槽了！），如果你是个人项目，可以使用MUI玩玩，公司的话，如果不是场景特别需要，还是不要选择MUI比较好，毕竟要考虑后期的维护成本。当初我们也考虑过，APIClould和AppCan，但是综合很多因素，还是选择了ionic。
### MUI
MUI大概了解了下，跑了跑示例程序，没有实际进行开发，看了下代码，习惯了MVVM，传统的开发模式真的是让人头大，如果处理的不好，业务逻辑代码，组件逻辑代码，和表现层就会混在一起，形成高耦合的应用，以后的维护和升级那将会是噩梦。但是MUI的UI组件确实做的挺全，很适合一般公司进行快速开发，前提是业务逻辑不复杂，不然很容易出现一个文件上千行代码的情况。MUI也有她的优势，上手比较简单，学习曲线平滑，不像ionic，你需要先弄懂Angular，不然就很难使用，Angular有很多概念，filter、directive、service、provider、factory等，有的并不好掌握和理解。
### ionic
ionic和angular太亲近，导致只要angular会遇到的问题，ionic肯定也会遇到，但是Angular具有的优势，比如说数据双向绑定，依赖注入，指令标签等，让ionic成为最有前途的Hybrid App框架。当然她也有不足，ionic的学习曲线很徒，但是会angular那就一定会ionic，如果公司使用Angular作为前端框架，那建议还是使用ionic作为Hybrid App解决方案。毕竟在GitHub上，ionic的项目介绍就有这么一句话：

>Best friends with AngularJS.

### 后记
使用ionic开发快一年的时间，经过3个版本的重构，对MVC架构的理解是越来越清晰。将前端开发分清MVC层，无论是在开发速度，还是在后期维护，都会受益不浅，也佩服前辈们在这方面做出的努力和探索。随着大前端的趋势，很多后端开发的方法和理念，也慢慢向前端迁移，传统的前端开发方法，**业务逻辑层**和**行为层**往往是混杂在一起的，经常能看到逻辑层中，使用jQuery去操作DOM。我的态度似乎是一边倒的，也许是因为我比较反感MUI的这种开发模式，如果使用RequireJS或者Sea.js进行模块化下，可能会好很多。以后，如果使用到MUI进行开发（希望永远不会！），再来看看能不能平反吧。