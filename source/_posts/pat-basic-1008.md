title: PAT-Basic-1008 数组元素循环右移问题
date: 2015-11-15 08:43:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
一个数组A中存有N（N>0）个整数，在不允许使用另外数组的前提下，将每个整数循环向右移M（M>=0）个位置，即将A中的数据由（A0 A1……AN-1）变换为（AN-M …… AN-1 A0 A1……AN-M-1）（最后M个数循环移至最前面的M个位置）。如果需要考虑程序移动数据的次数尽量少，要如何设计移动的方法？

输入格式：每个输入包含一个测试用例，第1行输入N ( 1<=N<=100)、M（M>=0）；第2行输入N个整数，之间用空格分隔。

输出格式：在一行中输出循环右移M位以后的整数序列，之间用空格分隔，序列结尾不能有多余空格。

输入样例：
6 2
1 2 3 4 5 6
输出样例：
5 6 1 2 3 4
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	//此题目可以直接输出不需要在数据里面排好序
	int n,m,count,i;
	int Input[100];
	count = 0;
	scanf("%d %d",&n,&m);
	//类似循环队列，这样能确认 m 的开始位置 
	m = n - m % n ;
	//输入数据 
	for( i = 0 ; i < n ; i++ ){
		scanf("%d",&Input[i]);
	}
	//按要求输出数据 
	for( i = m ; i < n ; i++ ){
		printf("%d",Input[i]);
		count++;
		if( count!= n ){
			printf(" ");
		} 	
	} 
	for( i = 0 ; i < m ; i++ ){
		printf("%d",Input[i]);
		count++;
		if( count!= n ){
			printf(" ");
		} 
	} 
	printf("\n");
	return 0;
}
```
