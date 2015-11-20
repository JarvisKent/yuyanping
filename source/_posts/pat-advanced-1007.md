title: PAT-Advanced-1007 Maximum Subsequence Sum 
date: 2015-11-15 10:39:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
Given a sequence of K integers { N1, N2, ..., NK }. A continuous subsequence is defined to be { Ni, Ni+1, ..., Nj } where 1 <= i <= j <= K. The Maximum Subsequen<!--more-->ce is the continuous subsequence which has the largest sum of its elements. For example, given sequence { -2, 11, -4, 13, -5, -2 }, its maximum subsequence is { 11, -4, 13 } with the largest sum being 20.

Now you are supposed to find the largest sum, together with the first and the last numbers of the maximum subsequence.

Input Specification:

Each input file contains one test case. Each case occupies two lines. The first line contains a positive integer K (<= 10000). The second line contains K numbers, separated by a space.

Output Specification:

For each test case, output in one line the largest sum, together with the first and the last numbers of the maximum subsequence. The numbers must be separated by one space, but there must be no extra space at the end of a line. In case that the maximum subsequence is not unique, output the one with the smallest indices i and j (as shown by the sample case). If all the K numbers are negative, then its maximum sum is defined to be 0, and you are supposed to output the first and the last numbers of the whole sequence.

Sample Input:
10
-10 1 2 3 4 -5 -23 3 7 -21
Sample Output:
10 1 4
## 解题思路

这题查了一些资料和看了别人的代码，如果一个数为负数，那他肯定不是最长子序列和的开头，这样可以使用一次循环在O（n）中得到最长子序列和。
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 10001
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    //定义初始化变量 
    int input[MAX];
    memset(input,0,sizeof(input)); 
    int k,i;
    int begin = 0 ,
        end  ,
        tmpI = 0,
        tmpJ = 0,
        tmpMax = 0,
        MaxSum = 0; 
    //数据输入 
    scanf("%d",&k);
    for( i = 0 ; i < k ; i++ )
        scanf("%d",&input[i]);
    end = k - 1; 
    //核心代码   
    for( i = 0 ; i < k ; i++ ){
        //可能是初始状态，可能是寻找最大子序列中 
        if( tmpMax >= 0 ){
            tmpMax += input[i];
            tmpJ = i;
        }else{
        //子序列和不可能为负数开头 
            tmpMax = input[i];
            tmpI = i;
            tmpJ = i;
        } 
        //如果找到更大的子序列和就更新，如果整个序列都是负数那就清零 
        if( tmpMax > MaxSum || ( tmpMax == 0 && end == k-1 )) {
            MaxSum = tmpMax ;
            begin = tmpI ;
            end = tmpJ;
        } 
    }
    printf("%d %d %d",MaxSum,input[begin],input[end]);
    return 0;
}
```
