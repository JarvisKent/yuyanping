title: PAT-Basic-1029 旧键盘
date: 2015-11-15 09:21:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。现在给出应该输入的一段文字、以及实际被输入的文字，请你列出肯定坏掉的那些键。

输入格式：

输入在2行中分别给出应该输入的文字、以及实际被输入的文字。每段文字是不超过80个字符的串，由字母A-Z（包括大、小写）、数字0-9、以及下划线“_”（代表空格）组成。题目保证2个字符串均非空。

输出格式：

按照发现顺序，在一行中输出坏掉的键。其中英文字母只输出大写，每个坏键只输出一次。题目保证至少有1个坏键。

输入样例：
7_This_is_a_test
_hs_s_a_es
输出样例：
7TI

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    char sOne[81],sTwo[81],miss[80];
    int n,i,j,k,mark;
    scanf("%s %s",sOne,sTwo);
    n = 0;
    j = 0;
    for( i = 0 ; i < strlen(sOne) ; i++ ){
        if( sOne[i] == sTwo[j] && j < strlen(sTwo) ){
            j++;
        }else{
            mark = 0 ;
            if( islower(sOne[i]) )
            //如果是小写转换大写 
                sOne[i] = sOne[i] - 32 ;
            for( k = 0 ; k < n ; k++ )
                if( sOne[i] == miss[k])
                    mark = 1 ;
            if( 0 == mark )
            miss[n++] = sOne[i];    
        }
    } 
    for( i = 0 ; i < n ; i++ )
        printf("%c",miss[i]);
    return 0;
}
```
