title: Fork的更新
date: 2015/12/14 19:30:00
tags: [Git]
categories: [Web前端]
---
当我们fork别人的项目后，别人更新了自己的项目，在我们仓库里的fork项目是不会自动更新的，这时候如果有需要，那就需要手动进行更新，也很简单。
## 查看remote
```javascript
git remote -v 
```
查看当前仓库设置的remote,你使用:
```javascript
git pull origin master
```
<!--more-->
这里面的`origin`并不是，无中生有的，用上面那个命令就能很清楚的知道，这个origin指向的地址。
## 添加fork更新地址
现在可以自己添加一个fork的原地址，这样他们更新，你只要在本地pull下就可以得到他们的更新。
```javascript
git remote add upstream [fork原地址]
```
upstream只是我自己取的，为了方便在后面更新pull的时候用。
## 更新fork
```javascript
git pull upstream master
```
现在就可以把远程fork的更新拉取到本地和**master**合并了，当然，最好使用`git fetch`和`git merge` 进行手动的拉和合并。