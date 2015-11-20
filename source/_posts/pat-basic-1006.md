title: PAT-Basic-1006 换个格式输出整数
date: 2015-11-15 08:38:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
让我们用字母B来表示“百”、字母S表示“十”，用“12...n”来表示个位数字n（<10），换个格式来输出任一个不超过3位的正整数。例如234应该被输出为BBSSS1234，因为它有2个“百”、3个“十”、以及个位的4。

输入格式：每个测试输入包含1个测试用例，给出正整数n（<1000）。

输出格式：每个测试用例的输出占一行，用规定的格式输出n。
<!--more-->
输入样例1：
234
输出样例1：
BBSSS1234
输入样例2：
23
输出样例2：
SS123
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	int input; 
	int b,s,g,i;
	scanf("%d",&input);
	g = input % 10 ;
	s = input / 10 % 10;
	b = input / 100 ;
	for( i = 0 ; i < b ; i++ )
		printf("B");
	for( i = 0 ; i < s ; i++ )
		printf("S");
	for( i = 1 ; i <= g ; i++ )
		printf("%d",i);
	return 0;
}
```
