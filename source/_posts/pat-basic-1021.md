title: PAT-Basic-1021 个位数统计
date: 2015-11-15 09:11:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定一个k位整数N = dk-1*10k-1 + ... + d1*101 + d0 (0<=di<=9, i=0,...,k-1, dk-1>0)，请编写程序统计每种不同的个位数字出现的次数。例如：给定N = 100311，则有2个0，3个1，和1个3。

输入格式：

每个输入包含1个测试用例，即一个不超过1000位的正整数N。

输出格式：

对N中每一种不同的个位数字，以D:M的格式在一行中输出该位数字D及其在N中出现的次数M。要求按D的升序输出。

输入样例：
100311
输出样例：
0:2
1:3
3:1
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
#define MAX 1000 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    char input[MAX];
    int count[10];
    int len,i;
    scanf("%s",input);
    len = strlen(input);
    memset( count,0,10*sizeof(int) );
    //从第一个输入字符开始统计 
    for( i = 0 ; i < len ; i++ ){
        count[ input[i] - 48 ]++;
    }
    //输出控制 
    for( i = 0 ; i < 10 ; i++ ) {
        if(  count[i]  > 0)
        printf("%d:%d\n",i,count[i]);
    }
        
    return 0;
}
```
