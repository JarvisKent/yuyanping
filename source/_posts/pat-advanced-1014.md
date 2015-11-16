title: PAT-Advanced-1014 Waiting in Line
date: 2015-11-15 10:46:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
Suppose a bank has N windows open for service. There is a yellow line in front of the windows which devides the waiting area into two parts. The rules for the customers to wait in line are:

The space inside the yellow line in front of each window is enough to contain a line with M customers. Hence when all the N lines are full, all the customers after (and including) the (NM+1)st one will have to wait in a line behind the yellow line.
Each customer will choose the shortest line to wait in when crossing the yellow line. If there are two or more lines with the same length, the customer will always choose the window with the smallest number.
Customer[i] will take T[i] minutes to have his/her transaction processed.
The first N customers are assumed to be served at 8:00am.
Now given the processing time of each customer, you are supposed to tell the exact time at which a customer has his/her business done.

For example, suppose that a bank has 2 windows and each window may have 2 custmers waiting inside the yellow line. There are 5 customers waiting with transactions taking 1, 2, 6, 4 and 3 minutes, respectively. At 08:00 in the morning, customer1 is served at window1 while customer2 is served at window2. Customer3 will wait in front of window1 and customer4 will wait in front of window2. Customer5 will wait behind the yellow line.

At 08:01, customer1 is done and customer5 enters the line in front of window1 since that line seems shorter now. Customer2 will leave at 08:02, customer4 at 08:06, customer3 at 08:07, and finally customer5 at 08:10.

Input

Each input file contains one test case. Each case starts with a line containing 4 positive integers: N (<=20, number of windows), M (<=10, the maximum capacity of each line inside the yellow line), K (<=1000, number of customers), and Q (<=1000, number of customer queries).

The next line contains K positive integers, which are the processing time of the K customers.

The last line contains Q positive integers, which represent the customers who are asking about the time they can have their transactions done. The customers are numbered from 1 to K.

Output

For each of the Q customers, print in one line the time at which his/her transaction is finished, in the format HH:MM where HH is in [08, 17] and MM is in [00, 59]. Note that since the bank is closed everyday after 17:00, for those customers who cannot be served before 17:00, you must output "Sorry" instead.

Sample Input
2 2 7 5
1 2 6 4 3 534 2
3 4 5 6 7
Sample Output
08:07
08:06
08:10
17:00
Sorry
## 解题思路

这题一开始都没搞清楚要干什么，其实也不是没有搞清楚，只是感觉最近太疲劳，文字读不进去，经过反复的读题目，看了别人的一些解题思路，最终写出自己的代码和整个思路。

1、使用队列模拟整个过程，并记录值以备查询使用（应该有不需要进行模拟直接可以算出服务时间的方法）

2、先将前N*M个人进队列，如果还有人还没有服务的活，再从窗口队列中查找服务时间结束最早的出队，从后续的待服务选第一个人进队，重复执行，直到所有人都算出开始服务时间和结束服务时间。

3、如果服务时间已经过17：00 后面还有人没服务，都不计算，因为数据量不大，不需要剪枝。

## 问题

可能是队列操作有问题，还是哪里有问题，没有检查出来，有一个测点没有过，先放着，等大神。

解决

只需要把WINWAIT改成比10大的就行，但是不知道为什么这样就对？题目不是说最多就10个人在黄线内？？

放着以后再看看。

最新：原来是在一开始入队的时候没有取模，导致数组越界！
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define WINWAIT 10 //原来10最后一个测点不过 最新：这里不需要修改，下面入队取模就行
#define INF 999999 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
typedef struct Customer{
    //开始服务的时间,为了后续判断是否在 17：00前进行服务 
    int startTime; 
    int endTime;
    //服务时间 
    int processTime; 
}Customer; 
typedef struct Window{
    int head;
    int tail;
    //最大在黄线内就10人 
    int winQueue[WINWAIT];
    //窗口当前服务结束时间 
    int endTime;
}Win; 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    //定义及初始化 
    Customer cus[1010];
    Win win[25]; 
        int N,M,K,Q;
    int i,j;
    for( i = 0 ; i < 1010 ; i++ ){
        cus[i].startTime = 0;
        cus[i].endTime = 0;
        cus[i].processTime = 0;
    }
    for( i = 0 ; i < 25 ; i++ ){
        win[i].endTime = 0;
        win[i].head = 0;
        win[i].tail = 0;
    }
    //数据录入
    scanf("%d%d%d%d",&N,&M,&K,&Q);
    for( i = 1 ; i <= K ; i++) {
        scanf("%d",&cus[i].processTime);
    }
    //进行处理
    i = 1 ; 
    //用 i 表示 排在黄线内的客户 , 
    //用 j 表示 当前的窗口号，从小到大为黄线内的客户服务，注意后面 j 赋值的意义 
    for( j = 0 ; i <= N * M && i <= K ; i++, j=(j+1)%N ){
        //当前客户服务的开始时间就是窗口为前一个客户服务的结束时间 
        cus[i].startTime = win[j].endTime ;
        //客户服务结束 
        cus[i].endTime = win[j].endTime + cus[i].processTime;
        //更新当前窗口服务结束时间以便为下一位服务
        win[j].endTime += cus[i].processTime;
        //对窗口进行入队操作
        win[j].winQueue[win[j].tail] = i ; 
        win[j].tail =([win[j].tail +1)%WINWAIT ; //这里也需要取模,不然会越界!
        //坑,一开始考虑是不需要的,如果取模不就覆盖第一个排队的,后来朋友说只是下标到第一个没有覆盖
        //想想也对，也不知道一开始怎么想的。
    } 
    //黄线内满之后还有客户需要服务 再计算他们的服务时间 
    //从黄线前找出服务时间最早结束的窗口，出队，再把一个黄线后的客户入队 
    int minTime;
    int cIndex;
    int pos;
    for( ; i <= K ; i++){
        minTime = INF;
        for( j = 0 ; j < N ; j++ ){
            //排在窗口 j 的第一个客户 
            cIndex = win[j].winQueue[ win[j].head ];
            if( cus[cIndex].endTime < minTime ){
                minTime = cus[cIndex].endTime;
                pos = j;
            }
        }
        //找到最早结束的一个窗口
        cus[i].startTime = win[pos].endTime ;
        //客户服务结束 
        cus[i].endTime = win[pos].endTime + cus[i].processTime;
        //更新当前窗口服务结束时间以便为下一位服务
        win[pos].endTime += cus[i].processTime;
        //对窗口进行入队操作
        win[pos].head = (win[pos].head+1)%WINWAIT; 
        win[pos].winQueue[win[pos].tail] = i ; 
        win[pos].tail = (win[pos].tail+1)%WINWAIT;
    }   
    //查询输出
    int hour,minutes;
    while(Q--){
        scanf("%d",&j);
        if( cus[j].startTime + 8*60 >= 17*60 ){
              printf("Sorry\n");  
        }else{
             hour = (cus[j].endTime + 8*60) / 60;
             minutes = (cus[j].endTime + 8*60) % 60;
            printf("%02d:%02d\n",hour,minutes);  
        }
    } 
    return 0;
}
```
