title: PAT-Advanced-1002 A+B for Polynomials
date: 2015-11-15 10:34:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
This time, you are supposed to find A+B where A and B are two polynomials.

Input

Each input file contains one test case. Each case occupies 2 lines, and each line contains the information of a polynomial: K N1 aN1 N2 aN2 ... NK aNK, where K is the number of nonzero terms in the polynomial, Ni and aNi (i=1, 2, ..., K) are the exponents and coefficients, respectively. It is given that 1 <= K <= 10，0 <= NK < ... < N2 < N1 <=1000.
<!--more-->
Output

For each test case you should output the sum of A and B in one line, with the same format as the input. Notice that there must be NO extra space at the end of each line. Please be accurate to 1 decimal place.

Sample Input
2 1 2.4 0 3.2
2 2 1.5 1 0.5
Sample Output
3 2 1.5 1 2.9 0 3.2
## 遇到的问题

这题在思路上不难，但是就是有一个测试点没有通过，想不出来漏考虑了什么条件，找了好久也没发现有什么问题，先放着。

问题解决：朋友帮忙看了，原来我数组开小了，A,B相加最多会有20项，我就开了10项
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
#include <math.h>
#define MAXN 1010 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    double K[11];
    double NK[MAXN];
    memset(K,0,sizeof(K)); 
    memset(NK,0,sizeof(NK)); 
    double A = 0.0 , B = 0.0;
    int n = 0 ,e = 0;
    scanf("%d",&n);
    int i ;
    //输入A 
    for( i = 0 ;  i < n ; i++ ){
        scanf("%d %lf",&e,&A);
        NK[e] = NK[e] + A  ; 
    }
    //输入B
    scanf("%d",&n);
    for( i = 0 ;  i < n ; i++ ){
        scanf("%d %lf",&e,&B);
        NK[e] = NK[e] + B ; 
    }
    int count = 0;
    int num = 0;
    //这里两项相加会有20个指数原来是11个大小
    int ex[21];
    memset(ex,0,sizeof(ex));
    //处理 
    for( i = 0 ; i < MAXN ; i++ ){
        if( NK[i] != 0 ){
            K[num] = NK[i];
            ex[num++] = i;
        }
    } 
    printf("%d",num);
    for( i = num-1  ; i >=0 ; i-- ){
        printf(" %d %.1lf",ex[i],K[i]);
    }
    
    return 0;
}
```
