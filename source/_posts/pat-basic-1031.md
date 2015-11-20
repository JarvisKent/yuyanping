title: PAT-Basic-1031 查验身份证
date: 2015-11-15 09:23:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
一个合法的身份证号码由17位地区、日期编号和顺序编号加1位校验码组成。校验码的计算规则如下：

首先对前17位数字加权求和，权重分配为：{7，9，10，5，8，4，2，1，6，3，7，9，10，5，8，4，2}；然后将计算的和对11取模得到值Z；最后按照以下关系对应Z值与校验码M的值：

Z：0 1 2 3 4 5 6 7 8 9 10
M：1 0 X 9 8<!--more--> 7 6 5 4 3 2

现在给定一些身份证号码，请你验证校验码的有效性，并输出有问题的号码。

输入格式：

输入第一行给出正整数N（<= 100）是输入的身份证号码的个数。随后N行，每行给出1个18位身份证号码。

输出格式：

按照输入的顺序每行输出1个有问题的身份证号码。这里并不检验前17位是否合理，只检查前17位是否全为数字且最后1位校验码计算准确。如果所有号码都正常，则输出“All passed”。

输入样例1：
4
320124198808240056
12010X198901011234
110108196711301866
37070419881216001X
输出样例1：
12010X198901011234
110108196711301866
37070419881216001X
输入样例2：
2
320124198808240056
110108196711301862
输出样例2：
All passed
```c
#include <stdio.h>
#include <stdlib.h>
#define inLen 17
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//首先通过输入判断是否都是数字，不是直接输出
//记录输出个数，为0就是全部pass
//之后根据题目要求算出校验码输出 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int weight[17] = {7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2};
    char M[11] = {'1','0','X','9','8','7','6','5','4','3','2'};
    char input[17],code; 
    int N ,sum ,unPass = 0;
    int i,j;
    scanf("%d",&N);
    for( i = 0 ; i < N ; i++ ){
        sum = 0;
        scanf("%17s%c",input,&code);
        for( j = 0 ; j < inLen ; j++ ){
            //如果不是数字那就直接输出吧 
            if( input[j] < '0' && input[j] >'9'){
                printf("%s%c\n",input,code); 
                unPass++;
                break;
            }   
        }
        for( j = 0 ; j < inLen ; j++ ){
            sum+= (input[j]-'0') * weight[j];
        }
        //检查最后一位校验码是否正确 
        if( M[sum%11] != code ){
            printf("%s%c\n",input,code); 
            unPass++;
        }               
    } 
    if( 0 == unPass  )
        printf("All passed"); 
    
    return 0;
}
```
