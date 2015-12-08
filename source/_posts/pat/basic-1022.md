title: PAT-Basic-1022 D进制的A+B
date: 2015-11-15 09:12:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
输入两个非负10进制整数A和B(<=230-1)，输出A+B的D (1 < D <= 10)进制数。

输入格式：

输入在一行中依次给出3个整数A、B和D。

输出格式：

输出A+B的D进制数。

输入样例：
123 456 8
输出样例：
1103
## 解题思路

这题就是进制转换的思想，如果想从十进制转换成其它进制就取余相应<!--more-->进制的底，得到的余数的倒数就是要转换进制的表示数。
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 100
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    int A,B,C,D;
    int i,n;
    int digit[MAX];
    n = 0 ;
    scanf("%d%d%d",&A,&B,&D);
    C = A + B;
    while ( C != 0 ) {
        digit[n++] = C % D ;
        C = C / D;
    }
    for( i = n-1 ; i >= 0 ; i-- ){
        printf("%d",digit[i]);
    } 
    if( 0 == n ) printf("0");
    return 0;
}
```
