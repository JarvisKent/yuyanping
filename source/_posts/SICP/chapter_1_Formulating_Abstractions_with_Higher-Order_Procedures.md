title: Formulating Abstractions with Higher-Order Procedures
tags: [SICP]
categories: [计算机科学]
date: 2016-1-29 11:58:07
---
**Procedures**是对一个处理过程的描述，我觉得前面的笔记，把它称为程序并不是很合适，因为通常意义的程序是由许多个处理过程组成的，觉得把Procedure称为**函数**或者**处理过程**更合理。从Scheme中，我看到JavaScript的身影，或者说，从JavaScript中我看到了Scheme的身影更为准确。
这节主要说的是对一般处理过程的高阶抽象，还有提到**Lambda**定义，似乎就是匿名函数的前身。Let本地变量的定义，是不是很熟习，[let](http://es6.ruanyifeng.com/#docs/let#let命令)这家伙，在ES6中也有定义。
<!--more-->
## Procedures as Arguments
先来看看三个不同的函数：
```javascript
(define (sum-integers a b)
  (if (> a b) 
      0 
      (+ a (sum-integers (+ a 1) b))))
```
这是一个累加函数，从a开始到b结束。
```javascript
(define (sum-cubes a b)
  (if (> a b) 
      0 
      (+ (cube a) 
         (sum-cubes (+ a 1) b))))
```
也是一个累加函数，但是是对a进行立方。
```javascript
(define (pi-sum a b)
  (if (> a b)
      0
      (+ (/ 1.0 (* a (+ a 2))) 
         (pi-sum (+ a 4) b))))
```
对分数进行累加。上面这三个函数其实有很多相似的地方，可以抽象成如下的形式：
```javascript
(define (⟨name⟩ a b)
  (if (> a b)
      0
      (+ (⟨term⟩ a) 
         (⟨name⟩ (⟨next⟩ a) b))))
```
现在对上面的sum重新定义一个通用的函数：
```javascript
(define (sum term a next b)
  (if (> a b)
      0
      (+ (term a)
         (sum term (next a) next b))))
```
OK，现在来做一个积分的题目，求定积分可以被表示成如下公式：
$$\large \int_{a}^{b} f = \left\[ f\left\(a+\frac{dx}{2}\right\) + f\left\(a+dx+\frac{dx}{2}\right\)+ f\left\(a+2dx+\frac{dx}{2}\right\)+\ldots\right\]dx$$
可以进行如下定义和调用：
```javascript
(define (integral f a b dx)
  (define (add-dx x) (+ x dx))
  (* (sum f (+ a (/ dx 2.0)) add-dx b) 
     dx))

(integral cube 0 1 0.01)
.24998750000000042

(integral cube 0 1 0.001)
.249999875000001
```
## Constructing Procedures Using Lambda
这里的Lambda，很像JS中匿名函数的概念，定义和使用相对简单：
```javascript
((lambda (x y z) (+ x y (square z))) 1 2 3)
12
```
### let申明本地变量
下面是一个let定义：
```javascript
(+ (let ((x 3))
     (+ x (* x 10)))
   x)
```
第二个参数x假设是5，结果是多少？是38，因为在Let作用域里面计算后为33。
再来看一个例子：
```javascript
(let ((x 3)
      (y (+ x 2)))
  (* x y))
```
如果给个参数x=2，结果会是多少?注意y是在let的定义中，所以其中x是外部的x=2，而不是x=3。下面是抽象的定义：
```javascript
(let ((⟨var₁⟩ ⟨exp₁⟩)
      (⟨var₂⟩ ⟨exp₂⟩)
      …
      (⟨varn⟩ ⟨expn⟩))
  ⟨body⟩)
```
## 结束语
后面的内容，就是把整个处理过程进行更高层次的抽象，最后到达面向对象的层次，函数式Lisp就和JS一样，可以进行面向对象的实现，也提到了类优先的概念，现代语言中的一些概念，原来很多源自这些祖先级的语言，虽然时代和语法有些区别，但是概念基本是相通的，也很好理解，这节先记录到这。


