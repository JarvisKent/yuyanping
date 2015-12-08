title: PAT-Basic-1023 组个最小数
date: 2015-11-15 09:15:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定数字0-9各若干个。你可以以任意顺序排列这些数字，但必须全部使用。目标是使得最后得到的数尽可能小（注意0不能做首位）。例如：给定两个0，两个1，三个5，一个8，我们得到的最小的数就是10015558。

现给定数字，请编写程序输出能够组成的最小的数。

输入格式：

每个输入包含1个测试用例。每个测试用例在一行中给出10个非负整数，顺序表示我们拥有数字0<!--more-->、数字1、……数字9的个数。整数间用一个空格分隔。10个数字的总个数不超过50，且至少拥有1个非0的数字。

输出格式：

在一行中输出能够组成的最小的数。

输入样例：
2 2 0 0 0 3 0 0 1 0
输出样例：
10015558
## 解题思路

这题也是水题，一个数组收入每个数字有多少个，都不需要排序从小到大，第一个输出不能从0肯定从1开始，如果数组内的位数个数不是0的话就从头开始输出，这就能输出0之后依次输出就好。
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    int num[10];
    int i;
    for( i = 0 ; i < 10 ; i++ ){
        scanf("%d",&num[i]);
    } 
    for( i = 1  ; i < 10 ; ){
        if( num[i] > 0 ){
            printf("%d",i);
            num[i]--;
            i = 0;
        }else{
            i++;
        }
    }
    return 0;
}
```
