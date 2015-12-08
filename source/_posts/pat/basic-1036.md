title: PAT-Basic-1036 跟奥巴马一起编程
date: 2015-11-15 09:29:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
美国总统奥巴马不仅呼吁所有人都学习编程，甚至以身作则编写代码，成为美国历史上首位编写计算机代码的总统。2014年底，为庆祝“计算机科学教育周”正式启动，奥巴马编写了很简单的计算机代码：在屏幕上画一个正方形。现在你也跟他一起画吧！

输入格式：

输入在一行中给出正方形边长N（3<=N<=20）和组成正方形边的某种字符C，间隔一个空格。

输出格式：
<!--more-->
输出由给定字符C画出的正方形。但是注意到行间距比列间距大，所以为了让结果看上去更像正方形，我们输出的行数实际上是列数的50%（四舍五入取整）。

输入样例：
10 a
输出样例：

aaaaaaaaaa
a　　　　a
a　　　　a
a　　　　a
aaaaaaaaaa

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//首先计算出中间有多少行
//分成上中下三个部分分别打印 
int main(int argc, char *argv[]) {
    double n,rows;
    char c;
    scanf("%lf %c",&n,&c);
    rows = ceil(n/2) - 2;
    int i;
    //打印头行 
    for( i = 0 ; i < n ; i++ ){
        printf("%c",c);
    }
    printf("\n"); 
    //打印中间部分
    int j ;
    for( j = 0 ; j < rows ; j++ ){
        for( i = 0 ; i < n ; i++ ){
            //头和尾打印其它位置打印空格 
            if( (0 == i) || ( i == (n-1) )){
                printf("%c",c);
            }else{
                printf(" ");
            }
        } 
        printf("\n"); 
    }
    //打印尾行 
    for( i = 0 ; i < n ; i++ ){
        printf("%c",c);
    }
    printf("\n"); 
    return 0;
}
```
