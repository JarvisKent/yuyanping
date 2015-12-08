title: PAT-Advanced-1005 Spell It Right 
date: 2015-11-15 10:37:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
Given a non-negative integer N, your task is to compute the sum of all the digits of N, and output every digit of the sum in English.

Input Specification:

Each inpu<!--more-->t file contains one test case. Each case occupies one line which contains an N (<= 10100).

Output Specification:

For each test case, output in one line the digits of the sum in English words. There must be one space between two consecutive words, but no extra space at the end of a line.

Sample Input:
12345
Sample Output:
one five

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//水题呀，还是用一个数组去接，这个数组只要10个空间 
//通过字符形式读入，之后打入表内，最后根据表内个数和下标相乘
//最后相加就能得到结果，100个9最多也就900，
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    char * letter[11] = {"zero","one","two","three","four","five","six","seven","eight","nine"} ;
    int count[10];
    char ch;
    int i = 0;
    int sum = 0; 
    memset(count,0,sizeof(count));
    //数据输入
    while( scanf("%c",&ch) == 1 ){
        i = ch-'0';
        count[i] = count[i] + 1;
    }
    // 0 的个数都不需要算所以从1开始 
    for( i = 1 ; i < 10 ; i++ )
        sum = sum + count[i]*i ;
    //输出处理3种情况  
    if( sum > 99 ){
        printf("%s %s %s\n",
                letter[sum/100],
                letter[sum/10%10],
                letter[sum%10]
                );
    }else if( sum > 9 ){
        printf("%s %s\n",
                letter[sum/10],
                letter[sum%10]
                );
    }else{
        printf("%s\n",letter[sum]);
    }
    return 0;
}
```
