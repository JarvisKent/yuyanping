title: PAT-Basic-1025 反转链表
date: 2015-11-15 09:17:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定一个常数K以及一个单链表L，请编写程序将L中每K个结点反转。例如：给定L为1→2→3→4→5→6，K为3，则输出应该为3→2→1→6→5→4；如果K为4，则输出应该为4→3→2→1→5→6，即最后不到K个元素不反转。

输入格式：

每个输入包含1个测试用例。每个测试用例第1行给出第1个结点的地址、结点总个数正整数N(<= 105)、以及正整数K(<=N)，即<!--more-->要求反转的子链结点的个数。结点的地址是5位非负整数，NULL地址用-1表示。

接下来有N行，每行格式为：

Address Data Next

其中Address是结点地址，Data是该结点保存的整数数据，Next是下一结点的地址。

输出格式：

对每个测试用例，顺序输出反转后的链表，其上每个结点占一行，格式与输入相同。

输入样例：
00100 6 4
00000 4 99999
00100 1 12309
68237 6 -1
33218 3 00000
99999 5 68237
12309 2 33218
输出样例：
00000 4 33218
33218 3 12309
12309 2 00100
00100 1 99999
99999 5 68237
68237 6 -1
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 100000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//此题看了别人的做出来的，有一个表达式不太明白什么意思，先放着回头看 
int main(int argc, char *argv[]) {
    int address[MAX];
    int data[MAX];
    int next[MAX];
    int final[MAX];
    int temp[MAX];
    int tempAddr,firstAddr,num,inverse;
    int i,n,k;
    scanf("%d%d%d",&firstAddr,&num,&inverse);
    //录入数据 
    for( i = 0 ; i < num ; i++ ){
        scanf("%d",&tempAddr);
        scanf("%d%d",&data[tempAddr],&next[tempAddr]);
    }
    //遍历链表 
    n  = 0;
    while( firstAddr != -1 ){
        temp[n] = firstAddr;
        n++;
        firstAddr = next[firstAddr];
    }
    for( i = 0 ; i < n ; i++ )
    {
        final[i] = temp[i];
    }
    k = 0;
    for( i = 0 ; i < ( n-n%inverse ) ; i++){
        //暂时没搞明白这个表达式的意思，知道是确定链表的位置
        //但是不太明白这样怎么能够实现,这个表达式我有点感觉数学很美,这是数论里面研究的东西?
        //我也推了下，但是不知道怎么推导出这个表达式，功力还不够呀 
         k = (i/inverse)*inverse+inverse-i%inverse-1; 
         final[i] = temp[k];
    }
    //按要求输出
    for( i = 0 ; i < n - 1 ; i++ ){
        printf("%05d %d %05d\n",final[i],data[final[i]],final[i+1] );
    } 
        printf("%05d %d %d\n",final[n - 1],data[final[n - 1]],-1 );
    return 0;
}
```
