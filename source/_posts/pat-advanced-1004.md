title: PAT-Advanced-1004 Counting Leaves
date: 2015-11-15 10:36:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
A family hierarchy is usually presented by a pedigree tree. Your job is to count those family members who have no child.
Input

Each input file contains one test case. Each case starts with a line containing 0 < N < 100, the number of nodes in a tree, and M (< N), the number of non-leaf nodes. Then M lines follow, each in the format:

ID K ID[1] ID[2] ... ID[K]
where ID is a two-digit number representing a given non-leaf node, K is the number of its children, followed by a sequence of two-digit ID's of its children. For the sake of simplicity, let us fix the root ID to be 01.
Output

For each test case, you are supposed to count those family members who have no child for every seniority level starting from the root. The numbers must be printed in a line, separated by a space, and there must be no extra space at the end of each line.

The sample case represents a tree with only 2 nodes, where 01 is the root and 02 is its only child. Hence on the root 01 level, there is 0 leaf node; and on the next level, there is 1 leaf node. Then we should output "0 1" in a line.

Sample Input
2 1
01 1 02
Sample Output
0 1
## 解题思路

这题一开始还真没明白意思，以为算点的叶子数，后来才知道原来是算层的，一代一代的输出，知道要干什么就很简单了，直接用DFS搜索就可以，而且还不需要设置访问数组，因为是树不可能会有回路，要求很简单，只要判断有没有叶结点就行，如果有叶结点，这层的叶结点数增加

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAXN 101
#define INF 999999

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//算各层叶子结点的数目，这里用到Level数组记录
//使用深度优先搜索，之后用一个标记变量 
int familyTree[MAXN][MAXN];
int level[MAXN]; 
int levelCount = 1;
void DFSTree(int cur , int levelCounting){
    int mark = 0 ;
    int i ;
    for( i = 1 ; i <= MAXN ; i++ ){
        if( familyTree[cur][i] != INF ){
            mark = 1;
            DFSTree(i,levelCounting+1); 
        }
    }
    //如果没有孩子说明叶结点，这层的叶结点数加 1 
    if( 0 == mark){
        level[levelCounting] = level[levelCounting] + 1 ;
        //为得到最大层的层数 
        if( levelCount < levelCounting ){
            levelCount = levelCounting ;
        }
    }
    return ;
}
int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    //初始化
    int i,j;
    int n,m;
    int ID,K,tmp;
    for( i = 0 ; i < MAXN ; i++ )
        for( j = 0 ; j < MAXN ; j++ )
            familyTree[i][j] = INF ;
    memset(level,0,sizeof(level));  
    //读入数据
    scanf("%d%d",&n,&m);
    //如果就一个根结点直接输出 
    if( 1 == n){
        printf("1");
        return 0;
    } 
    for( i = 1 ; i <= m ; i++ ){
        scanf("%d%d",&ID,&K);
        for( j = 0 ; j < K ; j++ ){
            scanf("%d",&tmp);
            familyTree[ID][tmp] = 1 ;
        }
    } 
    //进行处理 
    DFSTree(1 ,1);
    //格式控制输出     
    for( i = 1 ; i <= levelCount ; i++ ){
            if( i != 1 )
                printf(" ");
        printf("%d",level[i]);  
    } 
    return 0;
}
```
