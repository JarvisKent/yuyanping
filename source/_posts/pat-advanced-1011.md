title: PAT-Advanced-1011 World Cup Betting
date: 2015-11-15 10:43:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
With the 2010 FIFA World Cup running, football fans the world over were becoming increasingly excited as the best players from the best teams doing battles for the World Cup trophy in South Africa. Similarly, football betting fans were putting their money where their mouths were, by laying all manner of World Cup bets.

Chinese Football Lottery provided a "Triple Winning" game. The rule of winning was simple: first select any three of the games. Then for each selected game, bet on one of the three possible results -- namely W for win, T for tie, and L for lose. There was an odd assigned to each result. The winner's odd would be the product of the three odds times 65%.

For example, 3 games' odds are given as the following:

 W    T    L
1.1  2.5  1.7
1.2  3.0  1.6
4.1  1.2  1.1
To obtain the maximum profit, one must buy W for the 3rd game, T for the 2nd game, and T for the 1st game. If each bet takes 2 yuans, then the maximum profit would be (4.1*3.0*2.5*65%-1)*2 = 37.98 yuans (accurate up to 2 decimal places).

Input

Each input file contains one test case. Each case contains the betting information of 3 games. Each game occupies a line with three distinct odds corresponding to W, T and L.

Output

For each test case, print in one line the best bet of each game, and the maximum profit accurate up to 2 decimal places. The characters and the number must be separated by one space.

Sample Input
1.1 2.5 1.7
1.2 3.0 1.6
4.1 1.2 1.1
Sample Output
T T W 37.98
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//又是一水题 
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    float W,T,L,profit = 1;
    float Max = 0.0;
    char Tag[3]={'W','T','L'};
    int mark = 0 ;
    int i;
    for( i = 0 ; i < 3 ; i++ ){
        mark = 0;
        scanf("%f %f %f",&W,&T,&L);
        Max = W;
        if( Max < T){
            Max = T;
            mark = 1;
        } 
        if( Max < L){
             Max = L;
             mark = 2;
        }
        printf("%c ",Tag[mark]);
        profit *= Max;
    }
    printf("%0.2f",(profit*0.65-1)*2);
    return 0;
}
```
