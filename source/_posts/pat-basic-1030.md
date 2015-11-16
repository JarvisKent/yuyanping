title: PAT-Basic-1030 完美数列
date: 2015-11-15 09:22:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定一个正整数数列，和正整数p，设这个数列中的最大值是M，最小值是m，如果M <= m * p，则称这个数列是完美数列。

现在给定参数p和一些正整数，请你从中选择尽可能多的数构成一个完美数列。

输入格式：

输入第一行给出两个正整数N和p，其中N（<= 105）是输入的正整数的个数，p（<= 109）是给定的参数。第二行给出N个正整数，每个数不超过109。

输出格式：

在一行中输出最多可以选择多少个数可以用它们组成一个完美数列。

输入样例：
10 8
2 3 20 4 5 1 6 7 8 9
输出样例：
8

```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 100000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
int cmp(const void *a , const void * b ){
    return   *(int *)a-*(int *)b;
} 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int input[MAX];
    int N,P;
    int i,max;
    scanf("%d%d",&N,&P);
    for( i = 0 ; i < N ; i++ ){
        scanf("%d",&input[i]);
    }
    qsort(input,N,sizeof(input[0]),cmp);
    max = 0 ;
    for( i = 0 ; i < N - max ; i++ ){
        //最后一个测试点需要用到long long  
        while( (i + max < N) && ((long long)input[i+max] <= (long long)input[i]*P) )
            ++max;
    }
    printf("%d",max);
    return 0;
}
```
