title: PAT-Basic-1035 插入与归并
date: 2015-11-15 09:28:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
根据维基百科的定义：

插入排序是迭代算法，逐一获得输入数据，逐步产生有序的输出序列。每步迭代中，算法从输入序列中取出一元素，将之插入有序序列中正确的位置。如此迭代直到全部元素有序。

归并排序进行如下迭代操作：首先将原始序列看成N个只包含1个元素的有序子序列，然后每次迭代归并两个相邻的有序子序列，直到最后只剩下1个有序的序列。

现给定原始序列和由某排序算<!--more-->法产生的中间序列，请你判断该算法究竟是哪种排序算法？

输入格式：

输入在第一行给出正整数N (<=100)；随后一行给出原始序列的N个整数；最后一行给出由某排序算法产生的中间序列。这里假设排序的目标序列是升序。数字间以空格分隔。

输出格式：

首先在第1行中输出“Insertion Sort”表示插入排序、或“Merge Sort”表示归并排序；然后在第2行中输出用该排序算法再迭代一轮的结果序列。题目保证每组测试的结果是唯一的。数字间以空格分隔，且行末不得有多余空格。
输入样例1：
10
3 1 2 8 7 5 9 4 6 0
1 2 3 7 8 5 9 4 6 0
输出样例1：
Insertion Sort
1 2 3 5 7 8 9 4 6 0
输入样例2：
10
3 1 2 8 7 5 9 4 0 6
1 3 2 8 5 7 4 9 0 6
输出样例2：
Merge Sort
1 2 3 8 4 5 7 9 0 6
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 100
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//判断方法似乎只有运行一步算法判断一次，还可以改进？ 
//对插入排序先判断，如果不是插入再判断是不是归并 
//MergeSort 首先需要有一个步长循环，步长从1开始之后是2的次方
//对步长内的数组进行排序 
int isInsertion(int  * origin , int * sorting , int n){
    int i,j,tmp;
    
    //插入排序最外层 
    for( i = 1 ; i < n ; i++ ){
        tmp = origin[i];
        for( j = i ; j > 0 && origin[j-1] > tmp ; j-- ){
            origin[j] = origin[j-1];
        }
        origin[j] = tmp ; 
        for( j = 0 ; j < n ; j++ ){
            if( origin[j] != sorting[j] )
                break;
        }
        //如果相等就再执行一次插入排序 
        if( j == n ){
            tmp = origin[i+1];
            for( j = i+1 ; j > 0 && origin[j-1] > tmp ; j-- ){
                origin[j] = origin[j-1];
            }
            origin[j] = tmp ; 
            printf("Insertion Sort\n"); 
            for( j = 0 ; j < n ; j++ ){
                //控制输出格式 
                if( j > 0 ){
                    printf(" ");
                }
                printf("%d",origin[j]);
            } 
            return 1; 
        }
    }
    return 0;
}
void isMergeSort(int * origin , int * sorting , int n ){
    int step,lBegin,lEnd,rBegin,rEnd;
    int tmp[MAX];
    //归并最外层循环 
    for( step = 1 ; step < n ; step*=2 ){
        //一次归并排序 
        for( lBegin = 0; lBegin < n - step ; lBegin = rEnd+1 ){
            rBegin = lBegin + step ;
            lEnd = rBegin - 1;
            rEnd = lEnd + step;
            if( rEnd > n )
                rEnd = n - 1;
            int k = 0;
            while( lBegin <= lEnd && rBegin <= rEnd )
                tmp[k++] = origin[lBegin] < origin[rBegin] ? origin[lBegin++] : origin[rBegin++];
            while(lBegin <= lEnd )
                tmp[k++] = origin[lBegin++];
            while(rBegin <= rEnd )
                tmp[k++] = origin[rBegin++];
            while( k>0 )
                origin[--rBegin] = tmp[--k];
            //判断是否和所给排序相等 
            int i ;
            for( i = 0 ; i < n ; i++ )
                if( origin[i] != sorting[i] )
                    break;  
            //如果相等再进行下一轮归并输出            
            if( i == n ){
                step *= 2;
                    for( lBegin = 0; lBegin < n - step ; lBegin = rEnd+1 ){
                        rBegin = lBegin + step ;
                        lEnd = rBegin - 1;
                        rEnd = lEnd + step;
                        if( rEnd > n )
                            rEnd = n - 1;
                        int k = 0;
                        while( lBegin <= lEnd && rBegin <= rEnd )
                            tmp[k++] = origin[lBegin] < origin[rBegin] ? origin[lBegin++] : origin[rBegin++];
                        while(lBegin <= lEnd )
                            tmp[k++] = origin[lBegin++];
                        while(rBegin <= rEnd )
                            tmp[k++] = origin[rBegin++];
                        while( k>0 )
                            origin[--rBegin] = tmp[--k]; 
                    }
                        //输出控制  
                        printf("Merge Sort\n");
                        for( k = 0 ; k < n ; k++ ){
                            if( k > 0 ){
                                printf(" ");
                            }
                            printf("%d",origin[k]);
                        }  
                        return ;
                }
            }                   
        }
    }
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int origin[MAX],sorting[MAX];
    int n,i;
    scanf("%d",&n);
    for( i = 0 ; i < n ; i++ ){
        scanf("%d",&origin[i]);
    }
    for( i = 0 ; i < n ; i++ ){
        scanf("%d",&sorting[i]);
    }
    int copyOrigin[MAX];
    //如果不是插入排序不能污染原始数据 
    for( i = 0 ; i < n ; i++ )
        copyOrigin[i] = origin[i];
    
    if( !isInsertion( copyOrigin , sorting , n ) ){
        isMergeSort( origin , sorting , n );
    }
    return 0; 
}
```
