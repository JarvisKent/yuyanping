title: Git团队开发
tags: [Git]
categories: [Web前端]
date: 2016-03-01 19:58:07
---
## 导言
团队在使用TFS自建Git仓库，对项目进行版本管理，所以此文章的内容，有一些方法可能不通用，就如pull request请求的处理，这个需要在TFS网站上进行，不过这些应该影响不大，请举一返三。
## 工作流程
简单介绍Git团队开发工作流程：

 * `fetch` 每天来coding前，先执行下，拉取下远程`master`分支最新的内容。
 * `diff` 拉取完成后，查看主分支更新情况。
 * `merge` 如没有问题，就将主分支合并到本地主分支内。
 * `branch` 创建分支，在分支内进行创作。
 * `push` 将分支推送到远程分支内。
 * `pull reqeust` 在TFS发起pull request请求。

<!--more-->
上面只是简单的流程，其中也有步骤被省略了，下面进行详细介绍。
## 创造的过程
### 创建分支
这里只从创建branch开始说起。创建branch，有如下命令可供参考：
```javascript
// 先创建，再切换
git branch [branch_name]
git checkout branch_name

// 创建和切换同时进行,懒人专用
git checkout -b branch_name 
```
假设你已经创建完分支，而且也切换过来了，现在你可以在新的分支上面coding，在切换分支之前，记得要commit，不然应该是无法切换的。
### 推送分支
当你对分支修改后，为了后续的pull request，你需要推送分支到远程仓库，运行如下命令：
```javascript
git push origin [branch_name]
```
这样就能将自己本地分支推送到远程仓库（如果有权限的话），因为多数团队成员没有master主分支的push权限，所以需要发起pull request，请求将自己的代码合并到master分支中。
### pull request
这步的操作，需要在网站进行，登录TFS，找到自己参与的项目，可以看到大概如下图所示：
![Git_pull_request](http://7xoed1.com1.z0.glb.clouddn.com/2016/Git/Git_pull_request.jpeg "pull request")
点击左边的`New pull request`，就会出现如上图所示界面，提交请求后，可以在左边查看请求状态，并跟进。
## 注意

 * `branch`中的内容，如果没有commit到HEAD中，那会和其它分支共享，只有commit后，才会单独区分。
 * `master`最好是一直和远程的master同步，不要直接在上面操作，这样其它的branch都可以使用master作为基准进行开发。