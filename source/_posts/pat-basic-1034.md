title: PAT-Basic-1034 有理数四则运算
date: 2015-11-15 09:27:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
本题要求编写程序，计算2个有理数的和、差、积、商。

输入格式：

输入在一行中按照“a1/b1 a2/b2”的格式给出两个分数形式的有理数，其中分子和分母全是整型范围内的整数，负号只可能出现在分子前，分母不为0。

输出格式：

分别在4行中按照“有理数1 运算符 有理数2 = 结果”的格式顺序输出2个有理数的和、差、积、商。注意输出的每个有理数必须是该有理数的最简形式“k a/b”，其中k是整数部分，a/b是最简分数部分；若为负数，则须加括号；若除法分母为0，则输出“Inf”。题目保证正确的输出中没有超过整型范围的整数。

输入样例1：
2/3 -4/2
输出样例1：
2/3 + (-2) = (-1 1/3)
2/3 - (-2) = 2 2/3
2/3 * (-2) = (-1 1/3)
2/3 / (-2) = (-1/3)
输入样例2：
5/3 0/6
输出样例2：
1 2/3 + 0 = 1 2/3
1 2/3 - 0 = 1 2/3
1 2/3 * 0 = 0
1 2/3 / 0 = Inf
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//分数要最简形式
//除法分母为0输出Inf 
//有负号要括号 
int gcd(long long a , long long b){
    long long r,max,min;
    max = (a > b) ? a : b ;
    min = (a > b) ? b : a ;
    r = max % min ;
    while(r){
        max = min;
        min = r ;
        r = max % min ;
    }
    return min;
}
void form(long long a,long long b){
    long long c,d,t;
    int flag = 0 ;
    //如果a是负数后面需要根据flag判断输出 
    if( a<0 ){
        a = - a;
        flag = 1;
    }
    if( 0 == a ) printf("0");
    else {
        t = gcd( a , b );
        a = a / t ;
        b = b / t ;
        c = a / b ;
        d = a % b ;
        //开始输出如果a不是负 
        if( 0 == flag ){
            if( 0 == d ) printf("%lld",c);
            else{
                if( 0 == c )
                printf("%lld/%lld",a,b);
                else
                printf("%lld %lld/%lld",c,d,b);
            }
        }else{
                if( 0 == d ) printf("(-%lld)",c);
            else{
                if( 0 == c )
                printf("(-%lld/%lld)",a,b);
                else
                printf("(-%lld %lld/%lld)",c,d,b);
            }   
        }
    }
}
void plus(long long a1,long long b1,long long a2,long long b2){
    form(a1,b1);
    printf(" + ");
    form(a2,b2);
    printf(" = ");
    form( a1*b2+a2*b1 , b1*b2 );
    printf("\n");
}
void minus(long long a1,long long b1,long long a2,long long b2){
    form(a1,b1);
    printf(" - ");
    form(a2,b2);
    printf(" = ");
    form( a1*b2-a2*b1 , b1*b2 );
    printf("\n");
}
void muilt(long long a1,long long b1,long long a2,long long b2){
    form(a1,b1);
    printf(" * ");
    form(a2,b2);
    printf(" = ");
    form( a1*a2 , b1*b2 );
    printf("\n");
}
void divide(long long a1,long long b1,long long a2,long long b2){
    form(a1,b1);
    printf(" / ");
    form(a2,b2);
    printf(" = ");
    if( 0 == a2) printf("Inf\n");
    else{
        if( a2 < 0 ){
            a2 = -a2;
            a1 = -a1;
            
        }
        form( a1*b2 , a2*b1 );
        printf("\n");
    }
}
int main(int argc, char *argv[]) {
    long long a1,b1,a2,b2;
    while( ~scanf("%lld/%lld %lld/%lld",&a1,&b1,&a2,&b2) ){
        plus(a1,b1,a2,b2);
        minus(a1,b1,a2,b2);
        muilt(a1,b1,a2,b2);
        divide(a1,b1,a2,b2);
    } 
    return 0;
}
```
