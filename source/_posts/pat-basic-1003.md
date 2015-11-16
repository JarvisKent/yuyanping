title: PAT-Basic-1003 我要通过！
date: 2015-11-15 08:31:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
“答案正确”是自动判题系统给出的最令人欢喜的回复。本题属于PAT的“答案正确”大派送 —— 只要读入的字符串满足下列条件，系统就输出“答案正确”，否则输出“答案错误”。

得到“答案正确”的条件是：

1. 字符串中必须仅有P, A, T这三种字符，不可以包含其它字符；
2. 任意形如 xPATx 的字符串都可以获得“答案正确”，其中 x 或者是空字符串，或者是仅由字母 A 组成的字符串；
3. 如果 aPbTc 是正确的，那么 aPbATca 也是正确的，其中 a, b, c 均或者是空字符串，或者是仅由字母 A 组成的字符串。

现在就请你为PAT写一个自动裁判程序，判定哪些字符串是可以获得“答案正确”的。
输入格式： 每个测试输入包含1个测试用例。第1行给出一个自然数n (<10)，是需要检测的字符串个数。接下来每个字符串占一行，字符串长度不超过100，且不包含空格。

输出格式：每个字符串的检测结果占一行，如果该字符串可以获得“答案正确”，则输出YES，否则输出NO。

输入样例：
8
PAT
PAAT
AAPATAA
AAPAATAAAA
xPATx
PT
Whatever
APAAATAA
输出样例：
YES
YES
YES
YES
NO
NO
NO
NO
## 解题思路
这题主要难在题目的解读，如果将题目读懂这题就不是很难，这里我把题目作简单的分析。

1、对于第一个条件，我们可以知道所输入字符串只能包括P,A,T三个字母，我们可以根据设置3个变量来统计这3个字母的数量如果3个字母数量之和不等于字符串长度那就有可能包含其它字母。

2、条件2告诉我们的是在PAT左右两边的字符必须相等或为空或为A字符

3、条件3是比较好理解的，意思就是说P，T之间如果增加一个字符A那么在T的右边就要添加与P左边相等的字符，这个字符的数量要根据P左边的字符来定。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	char Input[100];
	int pos_T,pos_P,count_P,count_A,count_T;
	int i,j,n;
	scanf("%d\n",&n);
	for( i = 0 ; i < n ; i++ ){
		gets(Input);
		pos_T = 0;
		pos_P = 0;
		count_P = 0;
		count_A = 0;
		count_T = 0;
		for( j = 0 ; j < strlen(Input) ; j++ ){
			if( Input[j] == 'P' ){
				count_P++;
				pos_P = j ;
			}
			if( Input[j] == 'A' ){
				count_A++;
			}	
			if( Input[j] == 'T' ){
				count_T++;
				pos_T = j ;
			}
		}
		if( //判断这个字符串是否只有P，A，T3个字母组成，条件1 
			count_P + count_A + count_T != strlen(Input) || 
			//中间如果没有字符就不符合条件3 
			pos_T-pos_P <= 1 || 
			//字符串中只能有一个P,T字符多出就不符合条件 
			count_P > 1 || count_T > 1 || 
			// T右边的字符数是P左边的整数倍，倍数是和中间添加的A的数量和P左边的字符数量有关，条件3 
			pos_P*(pos_T-pos_P-1) != strlen(Input)-pos_T-1
		 ){
		 	printf("NO\n");
		 }else{
		 	printf("YES\n");
		 }
	}
	return 0;
}
```
