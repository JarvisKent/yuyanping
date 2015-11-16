title: PAT-Basic-1027 打印沙漏
date: 2015-11-15 09:19:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
本题要求你写个程序把给定的符号打印成沙漏的形状。例如给定17个“*”，要求按下列格式打印

    *****
     ***
      *
     ***
    *****
所谓“沙漏形状”，是指每行输出奇数个符号；各行符号中心对齐；相邻两行符号数差2；符号数先从大到小顺序递减到1，再从小到大顺序递增；首尾符号数相等。

给定任意N个符号，不一定能正好组成一个沙漏。要求打印出的沙漏能用掉尽可能多的符号。

输入格式：

输入在一行给出1个正整数N（<=1000）和一个符号，中间以空格分隔。

输出格式：

首先打印出由给定符号组成的最大的沙漏形状，最后在一行中输出剩下没用掉的符号数。

输入样例：
19 *
输出样例：
    *****
     ***
      *
     ***
    *****
2
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    int n,i,j,t,remain,rows=-1,used=-1;
    char c;
    scanf("%d %c",&n,&c);   
    while(used<=n)
    {
        //如果只有1行那就使用一个
        //如果打印3行，那就使用7个字符能组成符合题目要求的漏斗 
        remain = n-used;
        rows+=2;
        //组成沙漏需要用多少个字符 
        used+=2*rows;
    }
    //需要把上面最后一次多加的两行减掉 
    rows-=2;
    //需要打印空白的最大个数 
    t=(rows-1)/2;
    for(i=0;i<rows;i++)
    {
        for(j=0;j<t-abs(i-t);j++)
            printf(" ");
        for(j=0;j<abs(i-t)*2+1;j++)
            printf("%c",c);
        printf("\n");
    }
    printf("%d\n",remain);
    return 0;
}
```
