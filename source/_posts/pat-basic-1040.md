title: PAT-Basic-1040 有几个PAT
date: 2015-11-15 09:33:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
字符串APPAPT中包含了两个单词“PAT”，其中第一个PAT是第2位(P),第4位(A),第6位(T)；第二个PAT是第3位(P),第4位(A),第6位(T)。

现给定字符串，问一共可以形成多少个PAT？

输入格式：

输入只有一行，包含一个字符串，长度不超过105，只包含P、A、T三种字母。

输出格式：

在一行中输出给定字符串中包含多少个PAT。由于结果可能比较大，只输出对1000000007取余数的结果。

输入样例：
APPAPT
输出样例：
2
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 100000
#define MOD 1000000007
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//这题想了很久没想出好办法来
//看了别人的代码原来还能这么搞
//这个思路就是没想到 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    //别人倒着统计 
//  int numberT = 0 ,numberAT = 0 ,numberPAT = 0;
//  char strings[MAX];
//  gets(strings);
//  int i = 0;
//  int len = 0 ;
//  len = strlen(strings);
//  for( i = len - 1  ; i > 0 ; i-- ){
//      if( strings[i] == 'T' ){
//          numberT ++;
//      }else if( strings[i] == 'A' ){
//          numberAT = ( numberAT + numberT ) % MOD ;
//      }else{
//          numberPAT = ( numberPAT + numberAT ) % MOD ; 
//      } 
//  } 
    //那我就正着统计试试 
    int numberP = 0 ,numberPA = 0 ,numberPAT = 0;
    char strings[MAX];
    gets(strings);
    int i = 0;
    int len = 0 ;
    len = strlen(strings);
    for( i = 0  ; i < len ; i++ ){
        if( strings[i] == 'P' ){
            numberP ++;
        }else if( strings[i] == 'A' ){
            numberPA = ( numberPA + numberP ) % MOD ;
        }else{
            numberPAT = ( numberPAT + numberPA ) % MOD ; 
        } 
    } 
    printf("%d",numberPAT);
    return 0;
}
```
