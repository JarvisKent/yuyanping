title: PAT-Advanced-1001 A+B Format
date: 2015-11-15 10:33:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
Calculate a + b and output the sum in standard format -- that is, the digits must be separated into groups of three by commas (unless there are less than four digits).

Input

Each input file contains one test case. Each case contains a pair of integers a and b where -1000000 <= a, b <= 1000000. The numbers are separated by a space.

Output

For each test case, you should output the sum of a and b in one line. The sum must be written in the standard format.

Sample Input
-1000000 9
Sample Output
-999,991
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 1000000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//马上想到的思路是除1000取余输出 
int main(int argc, char *argv[]) {
    int a = 0 ,b = 0;
    int c = 0 ;
    scanf("%d %d",&a,&b);
    c = a + b; 
    if(c<0){
        c = -c;
        printf("-");
    }
    if( c >= MAX ){
        printf("%d,%03d,%03d\n",c/MAX,c/1000%1000,c%1000);
    }else if( c >= 1000 ){
        printf("%d,%03d\n",c/1000,c%1000);
    }else{
        printf("%d\n",c);
    }

    return 0;
}
```
