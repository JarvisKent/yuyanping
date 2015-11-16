title: PAT-Basic-1015 德才论
date: 2015-11-15 09:03:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
宋代史学家司马光在《资治通鉴》中有一段著名的“德才论”：“是故才德全尽谓之圣人，才德兼亡谓之愚人，德胜才谓之君子，才胜德谓之小人。凡取人之术，苟不得圣人，君子而与之，与其得小人，不若得愚人。”

现给出一批考生的德才分数，请根据司马光的理论给出录取排名。

输入格式：

输入第1行给出3个正整数，分别为：N（<=105），即考生总数；L（>=60），为录取最低分数线，即德分和才分均不低于L的考生才有资格被考虑录取；H（<100），为优先录取线——德分和才分均不低于此线的被定义为“才德全尽”，此类考生按德才总分从高到低排序；才分不到但德分到线的一类考生属于“德胜才”，也按总分排序，但排在第一类考生之后；德才分均低于H，但是德分不低于才分的考生属于“才德兼亡”但尚有“德胜才”者，按总分排序，但排在第二类考生之后；其他达到最低线L的考生也按总分排序，但排在第三类考生之后。

随后N行，每行给出一位考生的信息，包括：准考证号、德分、才分，其中准考证号为8位整数，德才分为区间[0, 100]内的整数。数字间以空格分隔。

输出格式：

输出第1行首先给出达到最低分数线的考生人数M，随后M行，每行按照输入格式输出一位考生的信息，考生按输入中说明的规则从高到低排序。当某类考生中有多人总分相同时，按其德分降序排列；若德分也并列，则按准考证号的升序输出。

输入样例：
14 60 80
10000001 64 90
10000002 90 60
10000011 85 80
10000003 85 80
10000004 80 85
10000005 82 77
10000006 83 76
10000007 90 78
10000008 75 79
10000009 59 90
10000010 88 45
10000012 80 100
10000013 90 99
10000014 66 60
输出样例：
12
10000013 90 99
10000012 80 100
10000003 85 80
10000011 85 80
10000004 80 85
10000007 90 78
10000006 83 76
10000005 82 77
10000002 90 60
10000014 66 60
10000008 75 79
10000001 64 90
```c
#include <stdio.h>
#include <stdlib.h>
#define N 100000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//此题不难，题目解读完整就行，就是条件比较多 M:德 T:才 
//先去除德才都不合格的,先选取德才分数都在H以上的按总分排  情况1 
//德分到才分不到按总分排在"才德全尽"之后  情况2
//德才全在H下，M高于T的按总分排 情况3 
//其他按总分 情况4 
//输出要求：总分相同,按M降序排,M相同按准考证升序 
typedef struct student{
    int stuID;
    int M;
    int T;
}stu; 
int comp( const void * a,const void * b ){
    //如果两总分不相等情况降序 
    if(  (*(stu *)a).M + (*(stu*)a).T != (*(stu* )b).M+(*(stu *)b).T )
        return  ((*(stu *)b).M + (*(stu*)b).T)- ((*(stu* )a).M+(*(stu *)a).T) ;
    //如果两总分相等,按M排 
    else if( (*(stu *)b).M != (*(stu *)a).M  )
        return (*(stu *)b).M -  (*(stu *)a).M ;
    //如果M相等按准考证升序排  
    else return (*(stu *)a).stuID - (*(stu *)b).stuID  ;     
}
int main(int argc, char *argv[]) {
    int n,l,h;
    int i; 
    int countP1 = 0 ;
    int countP2 = 0 ;
    int countP3 = 0 ;
    int countP4 = 0 ;
    //分四种情况分别处理 
    stu * p1 = (stu *)malloc(N*sizeof(stu)); //情况1 
    stu * p2 = (stu *)malloc(N*sizeof(stu)); //情况2 
    stu * p3 = (stu *)malloc(N*sizeof(stu)); //情况3
    stu * p4 = (stu *)malloc(N*sizeof(stu)); //情况4
    stu temp ; 
    scanf("%d%d%d",&n,&l,&h);
    for( i = 0 ; i < n ; i++ ){
        scanf("%d%d%d",&temp.stuID,&temp.M,&temp.T);
        if( (temp.M >= l) && (temp.T >= l) ){
            if( temp.M >= h && temp.T >= h ){  
            //满足情况1 
                p1[countP1++] = temp;
            }else if( temp.M >= h ){
            //满足情况2     
                p2[countP2++] = temp;
            }else if( temp.M >= temp.T ){
            //满足情况3 
                p3[countP3++] = temp;
            }else{
            //满足情况4 
                p4[countP4++] = temp; 
            } 
        }
    } 
    qsort(p1,countP1,sizeof(stu),comp);
    qsort(p2,countP2,sizeof(stu),comp);
    qsort(p3,countP3,sizeof(stu),comp);
    qsort(p4,countP4,sizeof(stu),comp);
    //输出操作 
    printf("%d\n",countP1+countP2+countP3+countP4);
    for( i = 0 ; i < countP1 ; i++ )
        printf("%d %d %d\n",p1[i].stuID,p1[i].M,p1[i].T); 
    for( i = 0 ; i < countP2 ; i++ )
        printf("%d %d %d\n",p2[i].stuID,p2[i].M,p2[i].T);
    for( i = 0 ; i < countP3 ; i++ )
        printf("%d %d %d\n",p3[i].stuID,p3[i].M,p3[i].T); 
    for( i = 0 ; i < countP4 ; i++ )
        printf("%d %d %d\n",p4[i].stuID,p4[i].M,p4[i].T);           
    return 0;
}
```
