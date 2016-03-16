title: Git 基础知识笔记
date: 2016/3/3 19:30:00
tags: [Git]
categories: [Web前端]
---
## Git Status

```javascript
$ git status -s M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```

 - 'M' 代表modified
 - 'A' 代表staged
 - '??' 代表untracked

有两列，前列代表已经在stage中的状态，后面是代表当前working directory的状态，比如Rakefile是两个`MM`第一个代表在修改后已经staged了，第二个代表修改后还没有staged。下一次commit只会提交前一次staged的内容。
<!--more-->
## .gitignore
```javascript
# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a
```
`!`的意思是反模式，就是除什么之外的意思。比如上面是忽略所有.a结尾的文件，除了lib.a这个文件。
## git rm
```javascript
git rm --cached README
```
加`--cached`，是将文件从git中移除不进行track，但是会保留文件，如果没加会删除文件。
## git log
```javascript
git log A..B
```
查看B中有几个commit是A没有的。
## git stash
如果切换分支的时候不想commit，要切换的时候：
```javascript
git stash
```
切换回来看看保存了什么stash：
```javascript
git stash list
```
要还原哪个stash
```javascript
git stash apply stash@{2}
```
删除stash:
```javascript
git stash drop
```




