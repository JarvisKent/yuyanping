title: PAT-Basic-1038 统计同成绩学生
date: 2015-11-15 09:31:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
本题要求读入N名学生的成绩，将获得某一给定分数的学生人数输出。

输入格式：

输入在第1行给出不超过105的正整数N，即学生总人数。随后1行给出N名学生的百分制整数成绩，中间以空格分隔。最后1行给出要查询的分数个数K（不超过N的正整数），随后是K个分数，中间以空格分隔。

输出格式：

在一行中按查询顺序给出得分等于指定分数的学生人数，中间以空格分<!--more-->隔，但行末不得有多余空格。

输入样例：
10
60 75 90 55 75 99 82 90 75 50
3 75 90 88
输出样例：
3 2 0
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 100000 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//我最喜欢打表，这种水题 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int scores[MAX];
    int getNum[MAX];
    memset(scores,0,sizeof(scores[0])*MAX);
    int n,t,i,temp ;
    scanf("%d",&n);
    //录入所有分数 
    for( i = 0 ; i < n ; i++ ){
        scanf("%d",&temp);
        scores[temp] = scores[temp] + 1;
    }
    scanf("%d",&t);
    //录入需要找的分数 
    for( i = 0 ; i < t ; i++ ){
        scanf("%d",&getNum[i]);
    }
    //输出分数个数 
    for( i = 0 ; i < t ; i++ ){
        if( i > 0) printf(" "); 
        printf("%d",scores[getNum[i]]); 
    }
    return 0;
}
```
