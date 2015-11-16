title: PAT-Advanced-1009 Product of Polynomials
date: 2015-11-15 10:41:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
This time, you are supposed to find A*B where A and B are two polynomials.

Input Specification:

Each input file contains one test case. Each case occupies 2 lines, and each line contains the information of a polynomial: K N1 aN1 N2 aN2 ... NK aNK, where K is the number of nonzero terms in the polynomial, Ni and aNi (i=1, 2, ..., K) are the exponents and coefficients, respectively. It is given that 1 <= K <= 10, 0 <= NK < ... < N2 < N1 <=1000.

Output Specification:

For each test case you should output the product of A and B in one line, with the same format as the input. Notice that there must be NO extra space at the end of each line. Please be accurate up to 1 decimal place.

Sample Input
2 1 2.4 0 3.2
2 2 1.5 1 0.5
Sample Output
3 3 3.6 2 6.0 1 1.6
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MaxExponent 2010 //2个多项式相乘指数可以达到2000 
#define MaxTerms 21
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//时间复杂度达到了 N^2 应该有更高效的方法，这里用了穷举 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    //数据定义&初始化 
    double K[MaxExponent],
           A_Coefficient[MaxTerms],
           B_Coefficient[MaxTerms]; //存放系数 
    double coefficient = 0.0 ;
    int e = 0,
        A_Exponent[MaxTerms],
        B_Exponent[MaxTerms];
    int i,j,aLen,bLen,totalTerms = 0 ;
    memset(K,0,sizeof(K)); 
    memset(A_Coefficient,0,sizeof(A_Coefficient)); 
    memset(B_Coefficient,0,sizeof(B_Coefficient)); 
    memset(A_Exponent,0,sizeof(A_Exponent)); 
    memset(B_Exponent,0,sizeof(B_Exponent)); 
    scanf("%d",&aLen);
    //输入A的数据 
    for( i = 0 ; i < aLen ; i++ ){
        scanf("%d %lf",&e,&coefficient);
        A_Coefficient[i] = coefficient ;
        A_Exponent[i] = e;
    }
    scanf("%d",&bLen);
    //输入B的数据 
    for( i = 0 ; i < bLen ; i++ ){
        scanf("%d %lf",&e,&coefficient);
        B_Coefficient[i] = coefficient ;
        B_Exponent[i] = e;
    }
    //处理数据,时间复杂度N^2 有点高 
    for( i = 0 ; i < aLen ; i++ ){
        for( j = 0 ; j < bLen ; j++ ){
            K[ A_Exponent[i]+B_Exponent[j] ] +=A_Coefficient[i] * B_Coefficient[j];
        }
    } 
    //统计有多少项，这个方法真不好,暂时想不出好办法 
    for( i = 0 ; i < MaxExponent ; i++ )
        if( K[i] != 0 ) totalTerms++;
    //格式输出 
    printf("%d",totalTerms);
    for( i= MaxExponent-1 ; i >= 0 ; i-- ){
        if(  K[i] != 0 ){
            printf(" %d %0.1lf",i,K[i]);
        }
    }
    
    return 0;
}
```
