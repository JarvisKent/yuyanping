title: PAT-Basic-1009 说反话
date: 2015-11-15 08:45:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定一句英语，要求你编写程序，将句中所有单词的顺序颠倒输出。

输入格式：测试输入包含一个测试用例，在一行内给出总长度不超过80的字符串。字符串由若干单词和若干空格组成，其中单词是由英文字母（大小写有区分）组成的字符串，单词之间用1个空格分开，输入保证句子末尾没有多余的空格。

输出格式：每个测试用例的输出占一行，输出倒序后的句子。

输入样例：
Hello <!--more-->World Here I Come
输出样例：
Come I Here World Hello
## 解题思路
这题和前面做过的 [1008数字循环右移](../pat-basic-1008) 有点类似 ， 通过从字符串尾部向前扫描，如果发现空格就进行输出空格之后到end的字符，输出完之后再输出一个空格，之后将end的位置设置成空格的位置，再继续重复之前的操作，直到扫描到字符串的第一个字符，这时候只有最后一个单词没有输出，再用一个输出语句完成就行，这里好像程序写的不够简洁，应该有改善的余地，暂时还没有想到。
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	char Input[81];
	int length,end;
	int i,j;
	end = 0 ;
	length = 0 ;
	gets(Input);
	for( i=0 ; Input[i] != '\0' ; i++ ){
		length++;
	}
	end = length ; 
	for( i = length ; i >= 0 ; i-- ){
		if( ' ' == Input[i] ){
			for( j = i+1 ; j < end ; j++ )
		    	printf("%c",Input[j]);
		    printf(" ");
			end = i ;
		}
	}
	for( j = 0 ; j < end ; j++ )
		printf("%c",Input[j]);
	return 0;
}
```
