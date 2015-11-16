title: PAT-Basic-1019  数字黑洞
date: 2015-11-15 09:09:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定任一个各位数字不完全相同的4位正整数，如果我们先把4个数字按非递增排序，再按非递减排序，然后用第1个数字减第2个数字，将得到一个新的数字。一直重复这样做，我们很快会停在有“数字黑洞”之称的6174，这个神奇的数字也叫Kaprekar常数。

例如，我们从6767开始，将得到

7766 - 6677 = 1089
9810 - 0189 = 9621
9621 - 1269 = 8352
8532 - 2358 = 6174
7641 - 1467 = 6174
... ...

现给定任意4位正整数，请编写程序演示到达黑洞的过程。

输入格式：

输入给出一个(0, 10000)区间内的正整数N。

输出格式：

如果N的4位数字全相等，则在一行内输出“N - N = 0000”；否则将计算的每一步在一行内输出，直到6174作为差出现，输出格式见样例。注意每个数字按4位数格式输出。

输入样例1：
6767
输出样例1：
7766 - 6677 = 1089
9810 - 0189 = 9621
9621 - 1269 = 8352
8532 - 2358 = 6174
输入样例2：
2222
输出样例2：
2222 - 2222 = 0000
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//升序反着来就是降序只需要排一次序
//四个数字都一样意味对1111取余得0
int a,b;
int cmp(const void * a ,const void * b ){
    return (*(int *)b)- (*(int *)a);
}
void BlackHole(int n){
    int temp[4];
    temp[0] = n/1000;
    temp[1] = n/100%10;
    temp[2] = n/10%10;
    temp[3] = n%10;
    qsort(temp,4,sizeof(int),cmp);
    a = temp[0]*1000+temp[1]*100+temp[2]*10+temp[3]; 
    b = temp[3]*1000+temp[2]*100+temp[1]*10+temp[0];        
}
int main(int argc, char *argv[]) {
    int n,result;
    scanf("%d",&n);
    if( 0 == n%1111 ){
        //输出控制%4d占四位缺位补空格%04d缺位补0 
        printf("%04d - %04d = 0000\n",n,n);
        return 0;
    }
    do{
        BlackHole(n);
        result = a - b;
        printf("%04d - %04d = %04d\n",a,b,result);
        n = result; 
    }while( result != 6174 );
    return 0;
}
```
