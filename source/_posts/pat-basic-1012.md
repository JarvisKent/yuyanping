title: PAT-Basic-1012 数字分类
date: 2015-11-15 08:51:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定一系列正整数，请按要求对数字进行分类，并输出以下5个数字：

A1 = 能被5整除的数字中所有偶数的和；
A2 = 将被5除后余1的数字按给出顺序进行交错求和，即计算n1-n2+n3-n4...；
A3 = 被5除后余2的数字的个数；
A4 = 被5除后余3的数字的平均数，精确到小数点后1位；
A5 = 被5除后余4的数字中最大数字。
输入格式：

每个输入包含1个测试用例。每个测试用例先给出一个不超过1000的正整数N，随后给出N个不超过1000的待分类的正整数。数字间以空格分隔。

输出格式：

对给定的N个正整数，按题目要求计算A1~A5并在一行中顺序输出。数字间以空格分隔，但行末不得有多余空格。

若其中某一类数字不存在，则在相应位置输出“N”。

输入样例1：
13 1 2 3 4 5 6 7 8 9 10 20 16 18
输出样例1：
30 11 2 9.7 9
输入样例2：
8 1 2 4 5 6 7 9 16
输出样例2：
N 11 2 N 9
## 解题思路

首先根据求余数判断是属于哪种情况，在根据题意进行数字分类，提交代码后有2个测试点不通过，只得到了18分，应该是有些特殊情况没有考虑到位，暂时没有想到要怎么改进代码比较好。

## 补充

朋友帮忙看了下,发现是第2个条件我用的判断错误,交错级数的和可能为0所以不能使用A2>0判断，改成t>0代码就能全部通过。
```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#define N 1000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    //按题目要求，求余判断是哪种情况
    int n,reminder;
    int Input[N];
    int i;
    int A1,A2,A3,A5;
    int average,t;
    average =0;
    t = 0; //(-1)^t交错和幂 
    float A4;
    A1 = 0 ;
    A2 = 0 ;
    A3 = 0 ;
    A4 = 0.0 ;
    A5 = 0;
    scanf("%d",&n);
    //输入数据 
    for( i=0 ; i < n ; i++ )
        scanf("%d",&Input[i]); 
    i = 0 ;
    //数字分类 
    while( i < n ){
        reminder = Input[i] % 5 ;
        switch(reminder){
            case 0 : 
            //A1 = 能被5整除的数字中所有偶数的和； 
                if( !( Input[i]%2 ) )
                    A1 = A1 + Input[i] ;
                    break; 
            case 1 :
            //A2 = 将被5除后余1的数字按给出顺序进行交错求和，即计算n1-n2+n3-n4...；
                A2 = A2 + pow(-1,t)*Input[i];
                t++;    
                    break;
            case 2 :
            //A3 = 被5除后余2的数字的个数；
                A3++;
                    break; 
            case 3 :
            //A4 = 被5除后余3的数字的平均数，精确到小数点后1位； 
                A4 = A4 + Input[i];
                average++;
                break;
            case 4 :
                // A5 = 被5除后余4的数字中最大数字。
                if( A5 < Input[i] )
                    A5 = Input[i] ;
                    break;
        }
        i++;
    } 
    //输出控制  
    if( A1>0 ){
        printf("%d ",A1);
    } else{
        printf("N ");
    }
    //这里的判断条件不能使用A2>0,因为交错和有可能为0 
    if( t>0 ){
        printf("%d ",A2);
    } else{
        printf("N ");
    }
    if( A3>0 ){
        printf("%d ",A3);
    } else{
        printf("N ");
    }
    if( A4>0 ){
        printf("%.1lf ",A4/average);
    } else{
        printf("N ");
    }
    if( A5>0 ){
        printf("%d",A5);
    } else{
        printf("N");
    }
    return 0;
}
```
