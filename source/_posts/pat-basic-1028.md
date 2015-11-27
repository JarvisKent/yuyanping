title: PAT-Basic-1028 人口普查
date: 2015-11-15 09:20:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
某城镇进行人口普查，得到了全体居民的生日。现请你写个程序，找出镇上最年长和最年轻的人。

这里确保每个输入的日期都是合法的，但不一定是合理的——假设已知镇上没有超过200岁的老人，而今天是2014年9月6日，所以超过200岁的生日和未出生的生日都是不合理的，应该被过滤掉。

输入格式：

输入在第一行给出正整数N，取值在(0, 105]；随后N行，每行给出1个<!--more-->人的姓名（由不超过5个英文字母组成的字符串）、以及按“yyyy/mm/dd”（即年/月/日）格式给出的生日。题目保证最年长和最年轻的人没有并列。

输出格式：

在一行中顺序输出有效生日的个数、最年长人和最年轻人的姓名，其间以空格分隔。

输入样例：
5
John 2001/05/12
Tom 1814/09/06
Ann 2121/01/30
James 1814/09/05
Steve 1967/11/20
输出样例：
3 Tom John
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define nLen 6
#define dLen 11
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
int compare(char * young , char * old){
    int i ;
    for( i = 0 ; i < 10 ; i++ ){
        if( young[i] - old[i] > 0)
            return 1;
        if( young[i] - old[i] < 0 )
            return 0;
    }
    return 0;
} 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    char oldName[nLen],youngName[nLen];
    char bigDate[dLen]="1814/09/05",smallDate[dLen]="2014/09/07";
    char tempName[nLen],tempDate[dLen]; 
    int n,count;
    int i;
    count = 0;
    scanf("%d",&n);
    for( i = 0 ; i < n ; i++ ){
        scanf("%s %s",tempName,tempDate);
        //检测出生年月是否符合题意 
        if( compare(tempDate,"1814/09/05") && compare("2014/09/07",tempDate) ){
            count++;
            if( compare(tempDate,bigDate) ){    
                strcpy(bigDate,tempDate);
                strcpy(youngName,tempName);         
            } 
            if( compare(smallDate,tempDate) ){
                strcpy(smallDate,tempDate);
                strcpy(oldName,tempName);       
            }
        }
    }

    if( count > 0 ){
        printf("%d %s %s\n",count,oldName,youngName);
    }else{                     
        printf("0");
    }
    return 0;
}
```
