title: PAT-Basic-1013 数素数
date: 2015-11-15 08:59:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
令Pi表示第i个素数。现任给两个正整数M <= N <= 104，请输出PM到PN的所有素数。

输入格式：

输入在一行中给出M和N，其间以空格分隔。

输出格式：

输出从PM到PN的所有素数，每10个数字占1行，其间以空格分隔，但行末不得有多余空格。

输入样例：
5 27
输出样例：
11 13 17 19 23 29 31 37 41 4<!--more-->3
47 53 59 61 67 71 73 79 83 89
97 101 103
## 解题思路

这题一看就想到用素数打表，先打个表再把素数选出来，之后根据输入的M，N确定范围输出素数就好，这里我使用的打表方法具说是网上最快的，速度接近线性时间，研究了一下，把整个思路注释在代码中。
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define NumOfMax  120000
#define NumOfPrime 10000
//素数定理公式 x/ln(x) 其中X是数的范围
//这个公式能得到在X范围内大概的素数个数  
//比如说：我要大概10000个素数，那素数分布的范围大概是多少呢？ 
//根据公式 X/ln(X) 求出X = 120000 时  大概会有 10260个素数
//所以这时候我们就设数表的大小为120000 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
int prime[NumOfPrime];  
int visit[NumOfMax]; 
void InitPrime(){
    int i,j;
    int countPrime;
    //计算素数个数 
    countPrime = 0;
    for( i = 2 ; (i < NumOfMax) && (countPrime < NumOfPrime) ; i++) {
        //如果为0代表还没有访问过且可能为素数
        if( !visit[i] ) {
            //这里的素数是从0开始编号，后面输出的时候要注意 
            prime[countPrime] = i;
            countPrime++;
        }
        //这段逻辑的理解有些困难 
        for( j = 0 ; (j < countPrime) && (i*prime[j] < NumOfMax) ; j++ ){
            //将前面计算过的素数的倍数筛选出来
            visit[i*prime[j]] = 1 ;
            if( 0 == ( i%prime[j] ) ) break;
        } 
    }
} 
int main(int argc, char *argv[]) {
    memset(prime,0,sizeof(prime));
    memset(visit,0,sizeof(visit));
    InitPrime();
    int M,N;
    int i,count;
    count = 0;
    scanf("%d%d",&M,&N);
    //输出控制 
    for( i = M-1 ; i < N ; i++ ){
        if( count < 9 ){
            //这里判断如果是每一行第一个就不输出空格 
            if(count) printf(" ");
            printf("%d",prime[i]);
            count++; 
        }else{
            printf(" %d\n",prime[i]);
            count = 0;
        }
    }
    return 0;
}
```
