title: PAT-Advanced-1003 Emergency
date: 2015-11-15 10:35:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
As an emergency rescue team leader of a city, you are given a special map of your country. The map shows several scattered cities connected by some roads. Amount of rescue team<!--more-->s in each city and the length of each road between any pair of cities are marked on the map. When there is an emergency call to you from some other city, your job is to lead your men to the place as quickly as possible, and at the mean time, call up as many hands on the way as possible.

Input

Each input file contains one test case. For each test case, the first line contains 4 positive integers: N (<= 500) - the number of cities (and the cities are numbered from 0 to N-1), M - the number of roads, C1 and C2 - the cities that you are currently in and that you must save, respectively. The next line contains N integers, where the i-th integer is the number of rescue teams in the i-th city. Then M lines follow, each describes a road with three integers c1, c2 and L, which are the pair of cities connected by a road and the length of that road, respectively. It is guaranteed that there exists at least one path from C1 to C2.

Output

For each test case, print in one line two numbers: the number of different shortest paths between C1 and C2, and the maximum amount of rescue teams you can possibly gather.
All the numbers in a line must be separated by exactly one space, and there is no extra space allowed at the end of a line.

Sample Input
5 6 0 2
1 2 1 5 3
0 1 1
0 2 2
0 3 1
1 2 1
2 4 1
3 4 1
Sample Output
2 4

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAXN 520
#define INF 999999
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//两个问题：
//1、如何得到2个点最短距离 
//2、如何得到这些距离上能派出的人数 
//使用dfs直接进行统计得到距离，如果到达要求的点比MinDist要小就更新
//之后使用一个变量记录能招唤的消防队人数 
int roadMap[MAXN][MAXN],teamNum[MAXN],visited[MAXN];
int city , teamCount = 0 ,roadNum = 0 , minDist = INF ;
int end;

void DFS( int start , int end , int dist , int teamCounting){
    //如果已经是终点，判断此次搜索的距离是否更短
    if( start == end ){
        if( dist < minDist ){
            //这里注意如果是最短只有一条要赋值 
            roadNum = 1;
            minDist = dist ;
            teamCount = teamCounting ;
        }else if ( dist == minDist ){
            //如果等于就加上一条 
            roadNum++;
            if( teamCount < teamCounting )
                teamCount = teamCounting ;
        }
        return ;
    }
    //后面大余最小距离的就不需要再搜索了 
    if( dist > minDist )  return ;
    int i;
    for( i = 0 ; i < city ; i++  ){
        if( roadMap[start][i] != INF && !visited[i] ){
            //防止往回搜索 
            visited[i] = 1;
            DFS(i,end,roadMap[start][i]+dist,teamCounting + teamNum[i]); 
            //只有取消标记下次才能再通过另外的结点访问此结点 
            visited[i] = 0;
        }
        
    }
    
}

int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    int i,j;
    for( i = 0 ; i < MAXN ; i++ )
        for( j = 0 ; j < MAXN ; j++ )
            roadMap[i][j] = INF ;
    int start;
    int road;
    int tmp,tmp1,tmp2;
    //清除归零
    memset(visited,0,sizeof(visited)); 
    memset(teamNum,0,sizeof(teamNum)); 
    scanf("%d%d%d%d",&city,&road,&start,&end);
    //录入城市消防队 
    for( i = 0 ; i < city ; i++ ){
        scanf("%d",&tmp); 
        teamNum[i] = tmp ;
    }
    //录入地图
    for( i = 0 ; i < road ; i++ ){
        scanf("%d %d %d",&tmp,&tmp1,&tmp2);
        roadMap[tmp][tmp1] = tmp2;
        roadMap[tmp1][tmp] = tmp2;
    }
    //开始搜索
    DFS( start , end , 0 , teamNum[start] );    
    printf("%d %d",roadNum,teamCount);              
    return 0;
}
```
