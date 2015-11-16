title: PAT-Basic-1010 一元多项式求导
date: 2015-11-15 08:46:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
给定一句英语，要求你编写程序，将句中所有单词的顺序颠倒输出。

输入格式：测试输入包含一个测试用例，在一行内给出总长度不超过80的字符串。字符串由若干单词和若干空格组成，其中单词是由英文字母（大小写有区分）组成的字符串，单词之间用1个空格分开，输入保证句子末尾没有多余的空格。

输出格式：每个测试用例的输出占一行，输出倒序后的句子。

输入样例：
Hello World Here I Come
输出样例：
Come I Here World Hello
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	 int n, e, flag = 0;  
    while ( scanf("%d%d", &n, &e) != EOF)  
    {  
        if( n*e )  
        {  
            if(flag)  
                printf(" ");  
            else  
                flag = 1;  
            printf("%d %d", n*e, e-1);  
        }  
    }  
    if(!flag) printf("0 0");  
	return 0;
}
```
