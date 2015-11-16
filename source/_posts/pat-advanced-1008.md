title: PAT-Advanced-1008 Elevator 
date: 2015-11-15 10:40:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
The highest building in our city has only one elevator. A request list is made up with N positive numbers. The numbers denote at which floors the elevator will stop, in specified order. It costs 6 seconds to move the elevator up one floor, and 4 seconds to move down one floor. The elevator will stay for 5 seconds at each stop.

For a given request list, you are to compute the total time spent to fulfill the requests on the list. The elevator is on the 0th floor at the beginning and does not have to return to the ground floor when the requests are fulfilled.

Input Specification:

Each input file contains one test case. Each case contains a positive integer N, followed by N positive numbers. All the numbers in the input are less than 100.

Output Specification:

For each test case, print the total time on a single line.

Sample Input:
3 2 3 1
Sample Output:
41

```c
#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//又一大水题 
int main(int argc, char *argv[]) {
    const int stopTime = 5 ,moveDownTime = 4 , moveUpTime = 6; 
    int curFloor = 0 ,tmpFloor = 0;
    int totalTime = 0;
    int n,i;
    scanf("%d",&n);
    for( i = 0 ; i < n ; i++ ){
        scanf("%d",&tmpFloor );
        if( tmpFloor > curFloor ){
            totalTime += ( tmpFloor - curFloor )*moveUpTime+stopTime ;
            curFloor = tmpFloor; 
        }else{
            totalTime += ( curFloor - tmpFloor )*moveDownTime+stopTime ;
            curFloor = tmpFloor; 
        } 
    }
    printf("%d",totalTime);
    return 0;
}
```
