title: PAT-Basic-1014 福尔摩斯的约会
date: 2015-11-15 09:01:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
大侦探福尔摩斯接到一张奇怪的字条：“我们约会吧！ 3485djDkxh4hhGE 2984akDfkkkkggEdsb s&hgsfdk d&Hyscvnm”。大侦探很快就明白了，字条上奇怪的乱码实际上就是约会的时间“星期四 14:04”，因为前面两字符串中第1对相同的大写英文字母（大小写有区分）是第4个字母'D'，代表星期四；第2对相同的字符是'E'，那是第5个英文字母，代表一天里的第14个钟头（于是一天的0点到23点由数字0到9、以及大写字母A到N表示）；后面两字符串第1对相同的英文字母's'出现在第4个位置（从0开始计数）上，代表第4分钟。现给定两对字符串，请帮助福尔摩斯解码得到约会的时间。

输入格式：

输入在4行中分别给出4个非空、不包含空格、且长度不超过60的字符串。

输出格式：

在一行中输出约会的时间，格式为“DAY HH:MM”，其中“DAY”是某星期的3字符缩写，即MON表示星期一，TUE表示星期二，WED表示星期三，THU表示星期四，FRI表示星期五，SAT表示星期六，SUN表示星期日。题目输入保证每个测试存在唯一解。

输入样例：
3485djDkxh4hhGE 
2984akDfkkkkggEdsb 
s&hgsfdk 
d&Hyscvnm
输出样例：
THU 14:04
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//大写英文字母A-G确认星期几
//0-9、A-N确定小时
//后面小写's'出现的位置确定分钟 
int main(int argc, char *argv[]) {
    char str1[61]; 
    char str2[61]; 
    char str3[61]; 
    char str4[61]; 
    int mark,i;
    int sLen1,sLen2,sLen3,sLen4;
    mark = 0 ;
    gets(str1);
    gets(str2);
    gets(str3);
    gets(str4);
    sLen1 = strlen(str1);
    sLen2 = strlen(str2);
    sLen3 = strlen(str3);
    sLen4 = strlen(str4);
    //处理前两个字符串输出DAY 
    for( i = 0 ; i < sLen1 && i < sLen2 ; i++ ){
        if( (str1[i] == str2[i]) && (str1[i] >= 'A') && (str1[i] <= 'G') ){
            switch(str1[i]){
                case 'A' : printf("MON "); break;
                case 'B' : printf("TUE "); break;
                case 'C' : printf("WED "); break;
                case 'D' : printf("THU "); break;
                case 'E' : printf("FRI "); break;
                case 'F' : printf("SAT "); break;
                case 'G' : printf("SUN "); break;
            }
            mark = i ;
            break;
        }
    }
    //向后处理字符输出HH
    for( i = mark + 1 ; i < sLen1 && i < sLen2 ; i++ ){ 
        if( (str1[i] == str2[i]) &&
         ( (str1[i] >= 'A') && (str1[i] <= 'N') ||
           (str1[i] >= '0') && (str1[i] <= '9') ) ){
        if( (str1[i] >= 'A') && (str1[i] <= 'N') ){
                //ASCII转换成整数输出 
                printf("%d:",str1[i]-'A'+10);
            }else{
                printf("0%d:",str1[i]-'0');
            }
            break;
        }
    }
    //输出MM
    for( i = 0 ; i < sLen3 && i < sLen4 ; i++ ){
        if( str3[i] == str4[i] && 
          ( ( str3[i] >= 'A' && str3[i] <= 'Z' )||
          ( str3[i] >= 'a' && str3[i] <= 'z' ) )
         ){
            printf("%d%d",i/10,i%10);
            break;
         }
    } 
    return 0;
}
```
