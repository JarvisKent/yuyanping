title: The Elements of Programming
tags: [SICP,Lisp]
categories: [计算机科学]
date: 2016-01-02 11:58:07
---
限于英文水平，可能有概念性的错误，或者文字性错误，还请纠正指出，感谢。
## 抽象
开头，借用John Locke(1690)的文章，来谈人的思维活动，是怎么对事物进行抽象的，其中说到三点：

 - 1、将多个简单的想法，整合成一个复杂的想法。
 - 2、观察两个事物，内在的联系，无论他们简单还是复杂。
 - 3、将他们联系的部分，抽取出来。这样就完成了事物的抽象过程。

<!--more-->
## 基本要素
文章中说到，任何强大的计算机语言，都会提供如下三种机制：

 - 1、原始表达式，最基本的实体。 
 - 2、组合方法，从简单的，组合成复杂的。 
 - 3、抽象方法，可以以一个单元的形式进行操作。

比如，在Lisp中，有如下表达式：
```Lisp
(+ 137 349)
486
```
486是Lisp解析器返回的值，这个表达式中，括号(parentheses)中，最左边的元素，被叫做**操作符**，其它元素被称为**操作数(operands)**，其实这个表达式，也被称为**前缀表达式(prefix notation|expression)**,前缀表达式最大的优势，就是可以有任意多的参数，如下：
```Lisp
(+ 21 35 12 7)
75

(* 25 4 12)
1200
```
前缀表达式还有一个明显的优势，那就是，在组合表达式的时候，能清楚的表明嵌套关系。如下：
```Lisp
(+ (* 3 5) (- 10 6))
19
```
虽然没有嵌套层数的限制，但是对于我们来说，过多的层次就很难读懂，比如：
```javascript
(+ (* 3 (+ (* 2 4) (+ 3 5))) (+ (- 10 7) 6))
```
对于Lisp解析器没有问题，不过我们也可以将上面这个表达式写成如下，更易读的形式：
```javascript
(+ (* 3
      (+ (* 2 4)
         (+ 3 5)))
   (+ (- 10 7)
      6))
```
## Scheme中的命名和环境
在scheme中是如下方式定义变量和函数的：
```javascript
(define pi 3.14159)
(define radius 10)

(* pi (* radius radius))
314.159

(define circumference (* 2 pi radius))

circumference
62.8318
```
上面就是命名，那什么是环境呢？当我们使用circumference这个计算过程的时候(似乎没看到函数这个概念暂时)，需要有内存去记录，这就是它的环境。抽象出一个过程定义如下：
```javascript
(define (<name> <formal parameters>) <body>)
```
更复杂的一些过程定义：
```javascript
(define (sum-of-squares x y)
  (+ (square x) (square y)))

(sum-of-squares 3 4)
25
```
## 两种计算过程方法
Applicative order and normal order，这两种计算方法，第一种，的计算过程如下：
```javascript
(sum-of-squares (+ a 1) (* a 2))

(sum-of-squares (+ 5 1) (* 5 2))

(+ (square 6) (square 10))

(+ (* 6 6) (* 10 10))

(+ 36 100)

136
```
可以看到是逐层往下进行的计算。第二种方法如下：
```javascript
(sum-of-squares (+ 5 1) (* 5 2))

(+ (square (+ 5 1)) 
   (square (* 5 2)))

(+ (* (+ 5 1) (+ 5 1)) 
   (* (* 5 2) (* 5 2)))

(+ (* 6 6) 
   (* 10 10))

(+ 36 100)

136
```
是一种先展开，后计算的方法。
## 条件表达式和判定符
在Lisp中，使用cond(conditional)来表达条件：
```javascript
(define (abs x)
  (cond ((> x 0) x)
        ((= x 0) 0)
        ((< x 0) (- x))))

(cond (<p₁> <e₁>)
      (<p₂> <e₂>)
      …
      (<pn> <en>))
```
`p`代表条件相当于`(x > y)`，cond就相当于if，`e`就是expression，条件成立后需要做的事。使用`else`语句来写上面的判断：
```javascript
(define (abs x)
  (cond ((< x 0) (- x))
        (else x)))
```
再来看看比较熟习的`if`语句：
```javascript
(define (abs x)
  (if (< x 0)
      (- x)
      x))
```
## 示例：开平方根
\\(\large\sqrt{x}\\) = the y such that y  \\(\large\geq\\)  0 and \\(\large y^2\\) = x
从上面能得到的一个式子，但是却无法得出具体的数值：
```javascript
(define (sqrt x)
  (the y (and (>= y 0) 
              (= (square y) x))))
```
这就是一个**函数**，和计算过程还是有点差别的。在数学领域，通常关心的是，什么(what is)，而在计算机领域，通常关心的是，如何(how is)。那计算机是怎么计算平方根的呢?通常使用牛顿方法，也就是猜近似值。假设对2开根，从1开始猜，有如下的结果
```javascript
Guess     Quotient      Average

1         (2/1)  = 2    ((2 + 1)/2)  = 1.5

1.5       (2/1.5)       ((1.3333 + 1.5)/2)
            = 1.3333      = 1.4167

1.4167    (2/1.4167)    ((1.4167 + 1.4118)/2) 
            = 1.4118      = 1.4142  

1.4142    ...           ...
```
为什么从1开始？为什么是除？其实是这样的 \\(\large x = y^2\\) 所以 \\(\large y = \frac{x}{y}\\)，之后通过不断的取平均数来逼近正确的数值。上面的思想转换成下面的计算过程：
```javascript
(define (sqrt x)
  (sqrt-iter 1.0 x))  // 假设始终从1开始猜。
  
(define (sqrt-iter guess x)
  (if (good-enough? guess x)
      guess
      (sqrt-iter (improve guess x) x)))

(define (improve guess x)
  (average guess (/ x guess)))

(define (average x y) 
  (/ (+ x y) 2))

(define (good-enough? guess x)
  (< (abs (- (square guess) x)) 0.001))
```
上面这个处理过程都是分开的，用户有时候只关心sqrt而不关心其它，所以就要把其它的过程封装在sqrt内部：
```javascript
(define (sqrt x)
  (define (good-enough? guess)
    (< (abs (- (square guess) x)) 0.001))
  (define (improve guess)
    (average guess (/ x guess)))
  (define (sqrt-iter guess)
    (if (good-enough? guess)
        guess
        (sqrt-iter (improve guess))))
  (sqrt-iter 1.0))
```
这样就封装成一个块，可以像函数一样来调用了。这是第一章，[抽象过程][Chapter-1]中第一节的学习笔记，后续的笔记将以链接的形式出现在后面。

## 备注

 - **REPL** is short for read-eval-print loop,这其实是一个很好理解的概念，输入，计算，输出。这就是命令控制台一直在做的事。
 - **Scheme** dialect of Lisp

[Chapter-1]:http://sarabander.github.io/sicp/html/Chapter-1.xhtml#Chapter-1