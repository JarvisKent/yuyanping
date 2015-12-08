title: PAT-Advanced-1015 Reversible Primes
date: 2015-11-15 10:48:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
A reversible prime in any number system is a prime whose "reverse" in that number system is also a prime. For example in the decimal system 73 is a reversible prime bec<!--more-->ause its reverse 37 is also a prime.

Now given any two positive integers N (< 105) and D (1 < D <= 10), you are supposed to tell if N is a reversible prime with radix D.

Input Specification:

The input file consists of several test cases. Each case occupies a line which contains two integers N and D. The input is finished by a negative N.

Output Specification:

For each test case, print in one line "Yes" if N is a reversible prime with radix D, or "No" if not.

Sample Input:
73 10
23 2
23 10
-2
Sample Output:
Yes
Yes
No
```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#define  NumOfMax 110000
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//先判断N是不是素数，不是就直接输出，
//再判断N进制转换后的数是不是素数 
//打个表把素数先筛筛 

void InitPrime(int * prime){
    int i = 0 ,j = 0;
    for( i = 0 ; i < NumOfMax ; i++ ){  
        prime[i] = 1 ;  
    }  
    prime[0] = 0 ; prime[1] = 0 ;  
    for ( i = 2 ; i <= sqrt(NumOfMax) ; i++ ){  
        if( 1 == prime[i] ){  
            for( j = i*2 ; j < NumOfMax ; j += i )  
             prime[j] = 0 ;  
        }  
    } 
}
//反转数字N在进制D 
int ReverseNumber(int N,int D){
    int sum = 0 ;
    do{
        sum = sum * D + N%D;
        N /= D;  
    }while( N != 0);
    return sum;
}  
int main(int argc, char *argv[]) {
    int  prime[NumOfMax];
    int N,D;
    memset(prime,0,sizeof(prime));
//  freopen("1.txt","r",stdin);
    InitPrime(prime);
    while( scanf("%d",&N) && N >= 0 ){
        scanf("%d",&D);
        if( prime[N] && prime[ReverseNumber(N,D)] )
            printf("Yes\n");
        else
            printf("No\n"); 
    }
    return 0;
}
```
