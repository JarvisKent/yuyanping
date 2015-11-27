title: PAT-Basic-1033 旧键盘打字
date: 2015-11-15 09:25:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。现在给出应该输入的一段文字、以及坏掉的那些键，打出的结果文字会是怎样？

输入格式：

输入在2行中分别给出坏掉的那些键、以及应该输入的文字。其中对应英文字母的坏键以大写给出；每段文字是不超过105个字符的串。可用的字符包括字母[a-z, A-Z]、数字0-9、以及下划线“_”（代表空格）、“,”<!--more-->、“.”、“-”、“+”（代表上档键）。题目保证第2行输入的文字串非空。

注意：如果上档键坏掉了，那么大写的英文字母无法被打出。

输出格式：

在一行中输出能够被打出的结果文字。如果没有一个字符能被打出，则输出空行。

输入样例：
7+IE.
7_This_is_a_test.
输出样例：
_hs_s_a_tst
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 100001
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//有+号大写字母无法输出
//用一个表记录坏键
//一个一个字符读取判断输出 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int ascii[255];
    char ch,brokenKey[MAX];
    int len,i;
    memset( ascii, 0, sizeof(ascii[0])*255 );
    gets(brokenKey);
    len = strlen(brokenKey);
    //处理坏键字符 
    for( i = 0 ; i < len ; i++ ){
        ch = brokenKey[i] ;
        ascii[ch] = 1 ;
        //如果大写键坏了小定肯定也打不出 
        if( ch >= 'A' && ch <= 'Z' ){
            ch = ch -'A' + 'a' ;
            ascii[ch] = 1;
        }
    }
    //判断输出应该输出的字符
    while( scanf("%c",&ch) != EOF ){
        if( ascii[ch] == 0 ){
            if( ch >= 'A' && ch <= 'Z' &&  ( 1 == ascii['+'] ) )
                continue ;
            printf("%c",ch);    
        }
        
    } 
    return 0;
}
```
