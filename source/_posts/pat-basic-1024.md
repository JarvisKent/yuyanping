title: PAT-Basic-1024 科学计数法
date: 2015-11-15 09:16:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
科学计数法是科学家用来表示很大或很小的数字的一种方便的方法，其满足正则表达式[+-][1-9]"."[0-9]+E[+-][0-9]+，即数字的整数部分只有1位，小数部分至少有1位，该数字及其指数部分的正负号即使对正数也必定明确给出。

现以科学计数法的格式给出实数A，请编写程序按普通数字表示法输出A，并保证所有有效位都被保留。

输入格式：

每个输入包含1个测试用例，即一个以科学计数法表示的实数A。该数字的存储长度不超过9999字节，且其指数的绝对值不超过9999。

输出格式：

对每个测试用例，在一行中按普通数字表示法输出A，并保证所有有效位都被保留，包括末尾的0。

输入样例1：
+1.23400E-03
输出样例1：
0.00123400
输入样例2：
-1.2E+10
输出样例2：
-12000000000
## 解题思路

这题先判断第一个字符是正还是负，是负直接先输出一个负号，然后从后面向前扫描，把指数先算出来，这样就知道移位需要移多少，根据算出来的指数E如果指数符号是负就先输出个“.0” ，之后输出 e –1 位的0，再输出原来除了“.”号的部分；如果是正那就输出除”.“号的字符，有tag记录输出位数，输出同时要判断tag-1位是不是和E相同，相同需要输出“.”号，之后如果位数不够要补0；
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
#define MAX 10000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
    char input[MAX]; 
    int e,tag;
    int i,len;
    scanf("%s",input);
    if( '-' == input[0] )
        printf("-");
    e = 0;
    tag = 1;
    len = strlen(input) -1 ;
    while( input[len] != '+' && input[len] != '-' ){
        e += tag* ( input[len] -'0' );
        tag *= 10;
        len-- ;
    }
    //如果指数为0就原样输出 
    if( 0 == e ){
        for( i = 1 ; i < len ; i++)
        printf("%c",input[i]);
    }
    //如果指数是负的 
    if( '-' == input[len] ){
        printf("0.");
        //指数决定要右移多少位补0 
        for( i = 1 ; i < e ; i++ )
            printf("0");
        //除了开头的符号和E输出中间的字符 ；
        //len - 1 是因为len的位置这时候是在E   
        for( i = 1 ; i < len - 1 ; i++ )
            if( input[i] != '.' )
                printf("%c",input[i]);   
    }else{
    //如果指数是正的 
        tag = 0 ;
        for( i = 1 ; i < len - 1 ; i++ ){
            if( input[i] != '.' ){
            printf("%c",input[i]);
            tag++;
            }
            //判断数点的位置 
            if( (tag - 1 == e)&& (tag != len - 3) )
                printf("."); 
        }
        //如果位数不够后补0 
        while( tag <= e ){
            printf("0");
            tag++;
        }
    } 
    return 0;
}
```
