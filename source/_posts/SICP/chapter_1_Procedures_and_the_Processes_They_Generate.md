title: Procedures and the Processes They Generate
tags: [SICP,Lisp]
categories: [计算机科学]
date: 2016-01-11 11:58:07
---
## 预见性
开头,文章用棋手的例子来说明，一个专业棋手(expert)和业余的区别，专业棋手，能预见(visualize)这一步棋可能产生的影响。所以预见处理过程(processes)会产生的结果，是通往计算机科学必修之课。
## 线性递归和迭代
解决`n!`的方法有很多种，一种是通过观察得出，n可以由n-1计算得到，有如下代码：
```javascript
(define (factorial n)
  (if (= n 1) 
      1 
      (* n (factorial (- n 1)))))
```
<!--more-->
下面是这个程序，对6阶乘的计算过程图例：
![1.2.1_factorial_recursive](http://7xoed1.com1.z0.glb.clouddn.com/2016/SICP/1.2.1_factorial_recursive.png "A linear recursive process for computing 6") 
上面这种方法是递归得到阶乘结果，换一种思维去想想，刚才是从`n->(n-1)`那是否能通过`(n-1)->n`呢？当然是可以的，下面通过迭代求阶乘，但是，是由n-1去推出n。
```javascript
(define (factorial n) 
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* counter product)
                 (+ counter 1)
                 max-count)))
```
这和上面的递归不是很像么？可能在程序上不太明显，下面来看看这个处理过程图例：
![1.2.1_factorial_iterative](http://7xoed1.com1.z0.glb.clouddn.com/2016/SICP/1.2.1_factorial_iterative.png "A linear iterative process for computing 6")
和上面递归求解的过程有明显的区别，递归求解，会展开到最后一步，然后通过栈来反向求解。然而迭代方法，每一步，都能得到每一步实际的值，虽然上面这个程序，也是使用`fact-iter`进行递归，但是这个过程，确实是迭代的求解。
### 递归过程和递归程序
不要把递归过程(recursive process)和递归程序(recursive procedure)搞混，通常，我们把一个自己调用自己本身的程序叫做**递归程序**。当我们在描述一个处理过程，遵循递归的方式进行求值的时候，这个处理过程被称为**递归过程**，它并不是描述这个程序的语法范畴。
## 递归树
下面是Fibonacci的定义：
$$\large
f(n) =
\begin{cases}
0  & \text{if  $n$ = 0,} \\\
1 & \text{if  $n$ = 1,}  \\\
Fib(n−1)+Fib(n−2) & \text{otherwise.} 
\end{cases}
$$
上面的公式，马上就能转换成下面的程序：
```javascript
(define (fib n)
  (cond ((= n 0) 0)
        ((= n 1) 1)
        (else (+ (fib (- n 1))
                 (fib (- n 2))))))
```
再来看看其计算5的过程图例：
![1.2.2_tree_recursive](http://7xoed1.com1.z0.glb.clouddn.com/2016/SICP/1.2.2_tree_recursive.png "The tree-recursive process generated in computing (fib 5)")
会发现，很多重复计算，有趣的是，它的增长率，正好是黄金分割率(Golden Ratio)，满足下面的公式：

Fib(n)接近\\(\large\varphi^n/\sqrt{5}\\)，\\(\large\varphi\\)满足下面的公式：
$$\large \varphi^2 = \varphi + 1$$
$$\large \varphi = \frac{ 1 + \sqrt{5}}{2} \approx 1.6180$$
### 迭代求解
Fib也可以使用迭代进行求解，观察下fibonacci数，0, 1, 1, 2, 3, 5, 8, 13, 21, ….，除了开头2个，后面的数都是前两数之和，所以可以编写如下迭代程序：
```javascript
(define (fib n) 
  (fib-iter 1 0 n))

(define (fib-iter a b count)
  (if (= count 0)
      b
      (fib-iter (+ a b) a (- count 1))))
```
大\\(\Theta\\)和指数增长的内容略过，自己比较熟习了。
## Greatest Common Divisors
求最大公约数，可以使用从2、3、4......去找两个数的最大公约数，但是这个方法效率太低，来看看一个经典的算法，**Euclid’s Algorithm**，可以通过观察得知，如果\\(r = a \% b\\),那么可以得到如下算法：
```javascript
GCD(a,b) = GCD(b,r)
         = GCD(r,r1)
         = GCD(r1,r2)
         = GCD(r2,0) = r2
```
很容易得到程序如下：
```javascript
(define (gcd a b)
  (if (= b 0)
      a
      (gcd b (remainder a b))))
```

