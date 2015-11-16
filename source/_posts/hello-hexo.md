title: Hello Hexo
date: 2015/11/13 12:00:00
tags: [Hexo,Node.js,Git]
categories: [Web前端]
---
这是用 `hexo` 搭建博客后的第一篇文章，读了很多前辈们写的教程，很多不适合，现在最新版本的hexo，有的又写的太杂乱，最后还是官方文档写的比较容易懂，这里作一个简单的记录。在我写这篇文章的时候，使用的是Hexo **3.0** ,hexo-cli **0.1.9** 的版本。

## 开始使用hexo
关于[hexo](https://hexo.io/zh-cn/docs/index.html 'hexo intrduction')的介绍这里就不多说，可以到官网看看写的很清楚，这里只简单说明下在使用过程中需要注意的事，还有一些坑。
<!--more-->
### 安装前提

 - [Node.js](https://nodejs.org/en/ 'node.js')
 - [Git](https://desktop.github.com/ 'git desktop')

需要注意的是，Node.js不要安装 **Latest Features** 有时候会出问题，还是安装 **Mature and Dependable** 版本的比较稳定。😍

### 安装hexo-cli
安装完前面的2个软件之后，需要安装一个全局的 **hexo-cli** 运行如下命令在控制台(Dos of Windows)
```javascript
npm install -g hexo-cli
```
这里注意最好别用 `cnpm`命令来装，可能会存在问题，也是一个坑。
### 创建一个hexo项目
现在来建立第一个 hexo 项目，使用如下命令
```javascript
hexo init <项目名称>
```
运行上面的命令会建立一个项目文件夹，进入 **项目根目录** 运行如下命令来安装 Hexo 所依赖的模块
```javascript
npm install 
 ```
到现在为止，安装Hexo基本完成，敲入下面的命令来启动看看结果
```javascript
hexo s
```
"s"是"server"命令的缩写，有关命令的使用可以到[这里](https://hexo.io/zh-cn/docs/commands.html)查看。

## hexo使用进阶
其实安装hexo就是这么简单，并没有网上那些教程来的那么复杂。安装完Hexo，而且能使用 **localhost:4000** 在浏览器中访问到的话，就可以部署到 **Github Pages** 上，如何部署呢？下面跟我一步步来，其它也很简单，这里根据我自己的情况来作说明，也许会有所不同，请举一反三。

### 创建一个Github Pages
我这里假设，在上面已经通过学习hexo命令的使用，已经创建了新的文章。都有使用git的经验，不然会看这篇文章的你估计也是很神奇的孩子。😂
到[Github Pages](https://pages.github.com/)官网可以看到很详细的介绍，就是在创建仓库的时候，以 **username.github.io** 这样的形式命名，不然会无法访问。
### 部署hexo
因为写完文章之后，使用 `hexo g` 每次会生成新的 html 文件，如果使用git命令来同步有点麻烦，hexo 提供了直接部署的功能，只要在项目 `_config.yml` 中进行配置。因为前面已经安装 **Git Desktop** 所以在我这边操作的时候好像不需要设置 **SSH Key** ，我这里就简单的配置下就可以部署，下面是我的配置参数
```javascript
deploy:
  type: git
  repository: https://github.com/HelloYu/helloyu.github.io.git [改成你自己的仓库]
  branch: master   
```
要注意 `YAML` 语法中 `:` 后面是有 **空格** 的，没有空格会出错。保存以后运行如下命令来测试看看
```javascript
hexo d -g   
```
如果不出问题，就会同步到你的仓库，以后写完文章只要运行上面的命令就可以。就这么简单！😈

### 添加评论插件
插件我看了多玩，最后还是决定用  **Disqus**，因为多玩不知道为什么，我的名字一直显示有问题，改不了，也许是他们缓存没有刷新，注册后配置下 **_config.yml** 就可以。
登录到[Disqus](https://disqus.com/) 界面，在右上角的 **settings** 里面，有一项 **Add Disqus to Site** 跟着步骤做就可以
```javascript
disqus_shortname: [你的shortname]   
```
## 备注

 - `hexo clean` 除了发布文章外，在部署前使用下这个命令删除下缓存。
 - tags 官方文档是使用 '- tag1', '- tag2' 的形式，其实也可以使用[tag1,tag2]，这样比较方便

