title: PAT-Basic-1039 到底买不买
date: 2015-11-15 09:32:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
小红想买些珠子做一串自己喜欢的珠串。卖珠子的摊主有很多串五颜六色的珠串，但是不肯把任何一串拆散了卖。于是小红要你帮忙判断一下，某串珠子里是否包含了全部自己想要的珠子？如果是，那么告诉她有多少多余的珠子；如果不是，那么告诉她缺了多少珠子。

为方便起见，我们用[0-9]、[a-z]、[A-Z]范围内的字符来表示颜色。例如在图1中，第3串是小红想做的珠串；那么第1串可以<!--more-->买，因为包含了全部她想要的珠子，还多了8颗不需要的珠子；第2串不能买，因为没有黑色珠子，并且少了一颗红色的珠子。

输入格式：

每个输入包含1个测试用例。每个测试用例分别在2行中先后给出摊主的珠串和小红想做的珠串，两串都不超过1000个珠子。

输出格式：

如果可以买，则在一行中输出“Yes”以及有多少多余的珠子；如果不可以买，则在一行中输出“No”以及缺了多少珠子。其间以1个空格分隔。

输入样例1：
ppRYYGrrYBR2258
YrR8RrY
输出样例1：
Yes 8
输入样例2：
ppRYYGrrYB225
YrR8RrY
输出样例2：
No 2
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 1001 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//这种水题打表是最爽的
//2个数组，一个用来处理老板各珠子的个数
//2个变量，一个记录剩余，一个记录缺少
//如果缺少的数不等于0，就输出缺少，不然输出剩余 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    char need[MAX],total[MAX];
    //最大才到122的z 
    int count[125];
    int surPlus = 0,lackNum = 0;
    int temp;
    gets(total);
    gets(need);
    memset(count,0,sizeof(count[0])*125);
    int i ;
    //统计老板有多少个珠珠 
    for( i = 0 ; i < strlen(total) ; i++ ){
        count[total[i]] = count[total[i]] + 1; 
    }
    //统计小妹妹需要的珠珠 
    for( i = 0 ; i < strlen(need) ; i++ ){
        count[need[i]] = count[need[i]] - 1 ;
    } 
    //统计最后情况 
    for( i = 0 ; i < 125 ; i++ ){
        if( count[i] > 0 ){
            surPlus += count[i] ;
        }else{
            lackNum += count[i] ;
        }
    }
    if( 0 == lackNum ){
        printf("Yes %d",surPlus);
    }else{
        printf("No %d",-lackNum);
    }
    return 0;
    
}
```
