title: PAT-Basic-1017  A除以B
date: 2015-11-15 09:07:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
本题要求计算A/B，其中A是不超过1000位的正整数，B是1位正整数。你需要输出商数Q和余数R，使得A = B * Q + R成立。

输入格式：

输入在1行中依次给出A和B，中间以1空格分隔。

输出格式：

在1行中依次输出Q和R，中间以1空格分隔。

输入样例：
123456789050987654321 7
输出样例：
17636684150141093474 3
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MaxLen 1001
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    char A[MaxLen];
    int B,ALength ;
    int i,temp,mark;
    mark = 0 ;
    temp = 0 ; 
    scanf("%s%d",A,&B);
    ALength = strlen(A);
    for( i = 0 ; i < ALength ; i++ ){   
        temp = temp*10 + (A[i]-48);
        if( temp >= B ){
            printf("%d",temp/B);
            mark = 1;
        }else if(mark){
            //借位的情况要输出一个0 
            printf("0");
        }
            
        temp = temp % B; 
    }
    //B不可能是0所以A如果是0直接跳出需要输出0
    if( 0 == mark ) printf("0"); 
    printf(" %d",temp);
    return 0;
}
```
