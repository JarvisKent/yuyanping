title: PAT-Basic-1007 素数对猜想
date: 2015-11-15 08:39:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
让我们定义 dn 为：dn = pn+1 - pn，其中 pi 是第i个素数。显然有 d1=1 且对于n>1有 dn 是偶数。“素数对猜想”认为“存在无穷多对相邻且差为2的素数”。

现给定任意正整数N (< 105)，请计算不超过N的满足猜想的素数对的个数。

输入格式：每个测试输入包含1个测试用例，给出正整数N。

输出格式：每个测试用例的输出占一行，不<!--more-->超过N的满足猜想的素数对的个数。

输入样例：
20
输出样例：
4
```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h> 
#define Max 100000 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	int prime[Max];
	int n,i,j;
	int countPrime;
	countPrime = 0 ;
	scanf("%d",&n);
	//素数简单打表 
	for( i = 0 ; i < Max ; i++ ){
		prime[i] = 1 ;
	}
	prime[0] = 0 ; prime[1] = 0 ;
	for ( i = 2 ; i <= sqrt(Max) ; i++ ){
		if( 1 == prime[i] ){
			for( j = i*2 ; j < Max ; j += i )
			 prime[j] = 0 ;
		}
	} 
	//统计素数对
	for( i = 2 ; i <= n ; i++ ){
		if(1 == prime[i] && i - j == 2  ){
			countPrime++;
			j = i ;		
			continue;	
		}
		if( 1 == prime[i] ) j = i ;
	}
	//输出素数对个数 
	printf("%d\n",countPrime);
	return 0;
}
```
