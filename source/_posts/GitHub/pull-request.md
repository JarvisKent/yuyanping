title: Git pull request
date: 2015/12/13 14:30:00
tags: [Git]
categories: [Web前端]
---
需要进行团队协作开发，将对 Git 的 `pull request`功能进行学习和记录分享。
## Fork and Clone
对自己需要贡献的项目，先进行`fork`操作，之后在自己的仓库(repositories)找到刚才fork的项目，将这个项目`clone`到本地。
## 创建分支
一般情况，最好还是不要在master分支，直接修改，可以根据自己想要贡献的内容，创建一个新的分支。
<!--more-->
## push
修改完成后，将修改的内容`push`到**自己**的fork仓库，如果是创建了分支，在push的时候要指明。例如：
```javascript
git push origin login
```
这就是将我本地login分支，推送到远程仓库中。接着可以到GitHub看看刚才推送的内容，如创建了新分支也会有相应的分支可供选择。
## New pull request
接下来就是创建一个pull request请求了，点击自己的fork仓库，会有很明显的一个**New pull request**绿色按钮，因为我用的新版本的GitHub,可能你们跟我不一样，也许在底部，之后只要设置**base**，就是需要贡献的仓库，还有自己的**branch**就可以，如果没有冲突，会有**Able to merge**的提示，如果出现冲突，解决后再pull request下就行。
## 删除 Branch
当你的pull request被接受，你就会收到成功的信息，这时候你就可以删除自己的 branch了，下面也会有一个按钮提供给你删除。