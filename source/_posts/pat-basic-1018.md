title: PAT-Basic-1018  锤子剪刀布
date: 2015-11-15 09:08:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
大家应该都会玩“锤子剪刀布”的游戏：两人同时给出手势，胜负规则如图所示：


现给出两人的交锋记录，请统计双方的胜、平、负次数，并且给出双方分别出什么手势的胜算最大。

输入格式：

输入第1行给出正整数N（<=105），即双方交锋的次数。随后N行，每行给出一次交锋的信息，即甲、乙双方同时给出的的手势。C代表“锤子”、J代表“剪刀”、B代表“布”，第1个字母代表甲方，第2个代表乙方，中间有1个空格。

输出格式：

输出第1、2行分别给出甲、乙的胜、平、负次数，数字间以1个空格分隔。第3行给出两个字母，分别代表甲、乙获胜次数最多的手势，中间有1个空格。如果解不唯一，则输出按字母序最小的解。

输入样例：
10
C J
J B
C B
B B
B C
C C
C B
J B
B C
J J
输出样例：
5 3 2
2 3 5
B B
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
// X：甲方 ； Y： 乙方 ; 
//分析题目可以得知只需要记录 X和Y的胜和平就能得到他们的负
//之后分别记录他们出的手势赢的次数 
int main(int argc, char *argv[]) {
    int xWin,yWin,pin;
    int xB,xC,xJ,yB,yC,yJ;
    int n,i;
    char x,y;
    n = 0 ;
    xWin = 0 ; yWin= 0 ; pin = 0 ;
    xB = 0 ; xC = 0 ; xJ = 0;
    yB = 0 ; yC = 0 ; yJ = 0;
    scanf("%d",&n);
    for( i = 0 ; i < n ; i++ ){
        scanf(" %c %c ",&x,&y);
        //先计算X赢的情况 
        if( ('B' == x) && ('C' == y) ) { xWin++ ; xB++ ; continue ; }
        if( ('C' == x) && ('J' == y) ) { xWin++ ; xC++ ; continue ; }
        if( ('J' == x) && ('B' == y) ) { xWin++ ; xJ++ ; continue ; }
        //再计算平局的情况 
        if( ('B' == x) && ('B' == y) ) { pin++ ; continue ; }
        if( ('C' == x) && ('C' == y) ) { pin++ ; continue ; }
        if( ('J' == x) && ('J' == y) ) { pin++ ; continue ; }
        //后计算Y赢的情况
        if( ('J' == x) && ('C' == y) ) { yWin++ ; yC++ ; continue ; } 
        if( ('C' == x) && ('B' == y) ) { yWin++ ; yB++ ; continue ; } 
        if( ('B' == x) && ('J' == y) ) { yWin++ ; yJ++ ; continue ; } 
    } 
    //输出X的输赢 
    printf("%d %d %d\n",xWin,pin,yWin);
    //输出Y的输赢 
    printf("%d %d %d\n",yWin,pin,xWin);
    //输出赢最多的手势
    if( xB >= xC && xB >= xJ ) printf("B ");
    else if( xC >= xJ ) printf("C ");
    else printf("J ");
    if( yB >= yC && yB >= yJ ) printf("B");
    else if( yC >= yJ ) printf("C");
    else printf("J");
    return 0;
}
```
