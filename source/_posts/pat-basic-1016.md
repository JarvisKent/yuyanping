title: PAT-Basic-1016  部分A+B
date: 2015-11-15 09:05:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
正整数A的“DA（为1位整数）部分”定义为由A中所有DA组成的新整数PA。例如：给定A = 3862767，DA = 6，则A的“6部分”PA是66，因为A中有2个6。

现给定A、DA、B、DB，请编写程序计算PA + PB。

输入格式：

输入在一行中依次给出A、DA、B、DB，中间以空格分隔，其中0 < A, B < 1010。

输出格式：<!--more-->

在一行中输出PA + PB的值。

输入样例1：
3862767 6 13530293 3
输出样例1：
399
输入样例2：
3862767 1 13530293 8
输出样例2：
0
## 解题思路

使用字符数组存储A、B这样比较好处理，之后通过part函数来处理，返回值就是PA、PB
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
int part(char * A , int Da , int len){
    int temp ,i ;
    temp = 0 ;
    for(  i = 0 ; i < len ; i++ ){
        //ascii码中0为48 
        if( A[i] == Da+48 )
            temp = temp*10 + Da ;  
    }
    return temp;
}
int main(int argc, char *argv[]) {
    char A[11];
    char B[11];
    int Da,Db;
    int Pa,Pb;
    int lenA,lenB;
    scanf("%s%d%s%d",A,&Da,B,&Db);
    lenA = strlen(A);
    lenB = strlen(B);
    Pa = part(A,Da,lenA); 
    Pb = part(B,Db,lenB); 
    printf("%d\n",Pa+Pb);
    return 0;
}
```
