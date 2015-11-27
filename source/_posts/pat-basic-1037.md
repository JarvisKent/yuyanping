title: PAT-Basic-1037 在霍格沃茨找零钱
date: 2015-11-15 09:30:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
如果你是哈利·波特迷，你会知道魔法世界有它自己的货币系统 —— 就如海格告诉哈利的：“十七个银西可(Sickle)兑一个加隆(Galleon)，二十九个纳特(Knut)兑一个西可，很容易。”现在，给定哈利应付的价钱P和他实付的钱A，你的任务是写一个程序来计算他应该被找的零钱。

输入格式：

输入在1行中分别给出P和A，格式为“Galleon.Sickle<!--more-->.Knut”，其间用1个空格分隔。这里Galleon是[0, 107]区间内的整数，Sickle是[0, 17)区间内的整数，Knut是[0, 29)区间内的整数。

输出格式：

在一行中用与输入同样的格式输出哈利应该被找的零钱。如果他没带够钱，那么输出的应该是负数。

输入样例1：
10.16.27 14.1.28
输出样例1：
3.2.1
输入样例2：
14.1.28 10.16.27
输出样例2：
-3.2.1

```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//时间换算的思想 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int realPayGalleon = 0 , realPaySickle = 0 , realPayKnut = 0 ; 
    int shouldPayGalleon = 0 , shouldPaySickle = 0 , shouldPayKnut = 0 ;
    int realTemp,shouldTemp,temp;
    scanf("%d.%d.%d %d.%d.%d",
        &shouldPayGalleon,
        &shouldPaySickle,
        &shouldPayKnut,
        &realPayGalleon,
        &realPaySickle,
        &realPayKnut
    );
                                //这里的493是因为17*29
    realTemp = realPayGalleon * 493 + realPaySickle * 29 + realPayKnut ;
    shouldTemp = shouldPayGalleon * 493 + shouldPaySickle * 29 + shouldPayKnut ;
    temp = realTemp - shouldTemp ; 
    if(temp >= 0 ){
        printf("%d.%d.%d\n",temp/493,temp/29%17,temp%29);
    }else{
        temp = -temp;
        printf("-%d.%d.%d\n",temp/493,temp/29%17,temp%29);
    }
    return 0;
}
```
