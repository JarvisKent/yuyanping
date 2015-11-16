title: PAT-Basic-1020 月饼
date: 2015-11-15 09:10:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
月饼是中国人在中秋佳节时吃的一种传统食品，不同地区有许多不同风味的月饼。现给定所有种类月饼的库存量、总售价、以及市场的最大需求量，请你计算可以获得的最大收益是多少。

注意：销售时允许取出一部分库存。样例给出的情形是这样的：假如我们有3种月饼，其库存量分别为18、15、10万吨，总售价分别为75、72、45亿元。如果市场的最大需求量只有20万吨，那么我们最大收益策略应该是卖出全部15万吨第2种月饼、以及5万吨第3种月饼，获得 72 + 45/2 = 94.5（亿元）。

输入格式：

每个输入包含1个测试用例。每个测试用例先给出一个不超过1000的正整数N表示月饼的种类数、以及不超过500（以万吨为单位）的正整数D表示市场最大需求量。随后一行给出N个正数表示每种月饼的库存量（以万吨为单位）；最后一行给出N个正数表示每种月饼的总售价（以亿元为单位）。数字间以空格分隔。

输出格式：

对每组测试用例，在一行中输出最大收益，以亿元为单位并精确到小数点后2位。

输入样例：
3 20
18 15 10
75 72 45
输出样例：
94.50
## 遇到问题

这题好奇葩，是我解题思路有问题么？还是又少考虑了什么特殊情况？第一个测试不给过？找了半天也没找出来我哪里做错了！

留底回头再看。

问题找到了原来是cmp函数里面的返回值问题，里面相减的结果是float的返回确是 int 谢谢朋友帮我找出来这么低级的错误   2015.3.29

## 解题思路

这题只要根据单价进行结构体快排，选单价最高的进行先出售就可以得到最大利益。
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 1010
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
typedef struct mooncake{
    float capacity;
    float totalPrice;
    float singlePrice;
}mc; 
int cmp( const void * a , const void * b ){
    //return (*(mc *)b).singlePrice - (*(mc *)a).singlePrice; 这样返回会导致排序错误
    return (*(mc *)b).singlePrice > (*(mc *)a).singlePrice? 1 : -1 ;
}
int main(int argc, char *argv[]) {
    int n,m,i;
    float result = 0.0;
    mc cake[MAX];
    scanf("%d %d",&n,&m);
    //录入库存量 
    for( i = 0 ; i < n ; i++  ){
        scanf("%f",&cake[i].capacity);
    }
    //录入总价 
    for( i = 0 ; i < n ; i++  ){
        scanf("%f",&cake[i].totalPrice);
        cake[i].singlePrice = (cake[i].totalPrice / cake[i].capacity);
    }
    qsort(cake,n,sizeof(cake[0]),cmp);
    i = 0;
    while( (m > 0) && (i < n) ){
        //两种情况
        if( m >= cake[i].capacity ){
            m -= cake[i].capacity ;
            result += cake[i].totalPrice ;
            i++ ;
        }else{
            result += m*cake[i].singlePrice;
            m = 0 ;
        } 
    }
    printf("%.2lf\n",result);
    return 0;
}
```
