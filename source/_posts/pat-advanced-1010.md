title: PAT-Advanced-1010 Radix
date: 2015-11-15 10:42:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
Given a pair of positive integers, for example, 6 and 110, can this equation 6 = 110 be true? The answer is "yes", if 6 is a decimal number and 110 is a binary number.

Now for any pair of positive integers N1 and N2, your task is to find the radix of one number while that of the other is given.

Input Specification:

Each input file contains one test case. Each case occupies a line which contains 4 positive integers:
N1 N2 tag radix
Here N1 and N2 each has no more than 10 digits. A digit is less than its radix and is chosen from the set {0-9, a-z} where 0-9 represent the decimal numbers 0-9, and a-z represent the decimal numbers 10-35. The last number "radix" is the radix of N1 if "tag" is 1, or of N2 if "tag" is 2.

Output Specification:

For each test case, print in one line the radix of the other number so that the equation N1 = N2 is true. If the equation is impossible, print "Impossible". If the solution is not unique, output the smallest possible radix.

Sample Input 1:
6 110 1 10
Sample Output 1:
2
Sample Input 2:
1 ab 1 2
Sample Output 2:
Impossible
## 解题思路

这题的Radix可能会很大，N1和N2也可能达到很大，如果按我个人理解，十个字符都是 ‘a’  那就是表示10个10排在一起，就是10^20，long long int 能表示的范围也才10^19，庆幸的是这个数的radix基本不会很大，一般情况下radix都不可能达到10^19这么大的数。

这题如果采用穷举法是很不现实的，基本上肯定是要超的，这里对条件进行解读：

1、如果N1>N2 , 在有解的条件下，用N2去表示N1 ，这时候N2的基数一定是大于N1的基数，但是不会大于N1这个数。

2、如果N1>N2，在有解的条件下，用N1去表示N2，这时候N1的基数一定是小于N2的基数。

反之亦然！注：N1、N2的比对是在十进制的条件下进行的，不需要进制转换。

## 问题

思路应该是没有问题，我也看了别人的代码，思路差不多，但是就是有1个测试点没有通过。解决：将最下界最大设置为：35就行，不知道为什么会超过35就不通过，暂时先放着。
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 11 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//让我们考虑一般情况，进行优化 
//1、如果 1 = N1 = N2  , 最小的基数就是 2
//2、如果 N1 = N2  ，直接输出基数， 
//3、如果 N1 ！= N2 ， 进行二分搜索判断Radix的取值 
//4、radix的上界和下界的确定
//{
//  1、下界应该是待判判断的Digits中最大的digit
//  2、上界应该就是给定数本身 
//           N1 N2 tag radix 
//  比如说 ：12 10  1  10 这里如果Radix是11，那正确，但是也不会超过12 
//  所以这里的上界是12。
//  也就是说，如果用一个digit更多位的数去表示一个digit更少的数，
//  这个Radix只可能比digit更少位的基数要小 ，反过来也是成立的 
//} 

long long int StrToLL(char *N,int length,long long int radix){
    long long int digit = 0 ;
    long long int bit = 1; 
    int i ;
    for( i = length - 1 ; i >= 0 ; i-- ){
        if( N[i] >= 'a' && N[i] <= 'z'){
            digit += (N[i]-'a'+10)*bit;
        }else{
            digit += (N[i]-'0')*bit;
        }
            bit *= radix;
    }
    return digit;
}
 int findRadix(char * N,int length){
    int radix = -1;
    int i,tmp = 0;
    for( i = 0 ; i < length ; i++ ){
        if(N[i] >= 'a' && N[i] <= 'z'){
            tmp = N[i] - 'a'+10;
        }else{
            tmp = N[i] - '0';
        }
        if( tmp > radix )
            radix = tmp;     
    }
    return radix + 1;
}
int cmp( char * N , int length ,long long int digit , long long int radix){
    long long int num = 0;
    long long int bit = 1;
    int i ;
    //和StrToLL的代码差不多 
    for( i = length - 1 ; i >=0 ; i-- ){
        if( N[i] >= 'a' && N[i] <= 'z'){
            num += (N[i]-'a'+10)*bit;
        }else{
            num += (N[i]-'0')*bit;
        }
        if( num > digit ) return 1;
            bit *= radix;
    }
    if( num == digit ) return 0;
    return -1;
} 
long long int BinarySearchRadix( char* N ,int length, long long int digit ){
    long long int left = findRadix(N,length);
    //不知道为什么这里如果超过35的下界就没办法通过测试点10 
    if(left > 35) left = 35; 
    long long int right;
    long long int mid = 0 ;
    int ans ;
    if( left > digit ){
        right = left;
    }else{
        right = digit;
    }
    while( left <= right ){
        mid = (left+right)/2;
        ans =  cmp( N , length, digit , mid);
        //说明找到 
        if( 0 == ans ){
            return mid;
        }else
        //说明基数太大，往左边找 
        if( 1 == ans ){
            right = mid - 1;
        }
        //说明基数太小，向右边找 
        else{
            left = mid + 1; 
        } 
    }
    return -1 ;
}
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin); 
    //变量定义&初始化 
    char N[3][MAX] ;
    memset(N[0],0,sizeof(N[0]));
    memset(N[1],0,sizeof(N[1]));
    memset(N[2],0,sizeof(N[2]));
    int tag = 0 ;
    long long int radix = 0 , 
                  digit = 0 , //存放StrToLL转换后的数据 
                  ans = 0;
    //数据录入 
    scanf("%s %s %d %lld",N[1],N[2],&tag,&radix);
    //先处理最一般情况，应该可以简化 
     if( (1 == atoi(N[1])) &&
         (1 == atoi(N[2])) 
          ){
        printf("2");
        return 0 ;
     }
     
     //将作为二分搜索上界和比对 
    digit = StrToLL(N[tag],strlen(N[tag]),radix);
    //判断需要处理哪个digits 
    ans = BinarySearchRadix(N[tag%2+1],strlen(N[tag%2+1]),digit);
    if( -1 == ans){
        printf("Impossible");
    }else{
        printf("%lld",ans);
    }
    return 0;
}
```
