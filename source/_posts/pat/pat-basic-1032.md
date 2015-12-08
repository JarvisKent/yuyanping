title: PAT-Basic-1032 挖掘机技术哪家强
date: 2015-11-15 09:24:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
为了用事实说明挖掘机技术到底哪家强，PAT组织了一场挖掘机技能大赛。现请你根据比赛结果统计出技术最强的那个学校。

输入格式：

输入在第1行给出不超过105的正整数N，即参赛人数。随后N行，每行给出一位参赛者的信息和成绩，包括其所代表的学校的编号（从1开始连续编号）、及其比赛成绩（百分制），中间以空格分隔。

输出格式：

在一行中给出总得分最高<!--more-->的学校的编号、及其总分，中间以空格分隔。题目保证答案唯一，没有并列。

输入样例：
6
3 65
2 80
1 100
2 70
3 40
3 0
输出样例：
2 150
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 100001
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//首先有一个10^5次方大的数组，存放信息
//下标就是学校，里面的数据就是总成绩
//装一个数据比对一个数据，这样始终得到最大数据的下标
//之后输出 
int main(int argc, char *argv[]) {
    int school[MAX];
    memset(school,0,sizeof(int)*MAX);
    int MaxSchool,tempSchool,tempScore;
    int i,N;
//  freopen("1.txt","r",stdin);
    scanf("%d",&N);
    MaxSchool = 0 ;
    for( i = 0 ; i < N ; i++ ){
        scanf("%d%d",&tempSchool,&tempScore);
        school[tempSchool] += tempScore ;
        if( school[MaxSchool] < school[tempSchool] ){
            MaxSchool = tempSchool ;
        }
    }
    printf("%d %d",MaxSchool,school[MaxSchool]);
    return 0;
}
```
