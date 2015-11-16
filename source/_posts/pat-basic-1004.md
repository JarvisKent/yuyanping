title: PAT-Basic-1004 成绩排名
date: 2015-11-15 08:33:04
tags: [PAT,PAT Basic]
categories: [算法]
toc: false
---
读入n名学生的姓名、学号、成绩，分别输出成绩最高和成绩最低学生的姓名和学号。

输入格式：每个测试输入包含1个测试用例，格式为

  第1行：正整数n
  第2行：第1个学生的姓名 学号 成绩
  第3行：第2个学生的姓名 学号 成绩
  ... ... ...
  第n+1行：第n个学生的姓名 学号 成绩
其中姓名和学号均为不超过10个字符的字符串，成绩为0到100之间的一个整数，这里保证在一组测试用例中没有两个学生的成绩是相同的。
输出格式：对每个测试用例输出2行，第1行是成绩最高学生的姓名和学号，第2行是成绩最低学生的姓名和学号，字符串间有1空格。

输入样例：
3
Joe Math990112 89
Mike CS991301 100
Mary EE990830 95
输出样例：
Mike CS991301
Joe Math990112
```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	int n,i;
	char studentName[1000][11];
	char studentId[1000][11];
	int grade[1000];
	//nMax,nMin为最大最小的成绩，iMax,iMin为下标号 
	int nMax=0,nMin=100,iMax=0,iMin=0;
	scanf("%d",&n);
	for( i = 0 ; i < n ; i++ ){
		scanf("%s %s %d",studentName[i],studentId[i],&grade[i]);
		if(grade[i]>nMax){
			nMax = grade[i];
			iMax = i ;
		}
		if(grade[i]<nMin){
			nMin = grade[i];
			iMin = i ;
		}	
	} 
	printf("%s %s\n",studentName[iMax],studentId[iMax]);
	printf("%s %s\n",studentName[iMin],studentId[iMin]);
	return 0;
}
```
