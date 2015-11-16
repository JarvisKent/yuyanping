title: PAT-Advanced-1006 Sign In and Sign Out 
date: 2015-11-15 10:38:04
tags: [PAT,PAT Advanced]
categories: [算法]
toc: false
---
At the beginning of every day, the first person who signs in the computer room will unlock the door, and the last one who signs out will lock the door. Given the records of signing in's and out's, you are supposed to find the ones who have unlocked and locked the door on that day.

Input Specification:

Each input file contains one test case. Each case contains the records for one day. The case starts with a positive integer M, which is the total number of records, followed by M lines, each in the format:

ID_number Sign_in_time Sign_out_time
where times are given in the format HH:MM:SS, and ID number is a string with no more than 15 characters.

Output Specification:

For each test case, output in one line the ID numbers of the persons who have unlocked and locked the door on that day. The two ID numbers must be separated by one space.

Note: It is guaranteed that the records are consistent. That is, the sign in time must be earlier than the sign out time for each person, and there are no two persons sign in or out at the same moment.

Sample Input:
3
CS301111 15:30:28 17:00:10
SC3021234 08:00:00 11:25:25
CS301133 21:45:00 21:58:40
Sample Output:
SC3021234 CS301133
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
//将时间转换成秒直接进行对比，之后四个变量记录最早、最迟、和相应ID 
//考虑到一天最迟来的应该是23：59：59 如果是0点到的应该不算这天 

int main(int argc, char *argv[]) {
//  freopen("1.txt","r",stdin);
    //变量定义
    char ID_Temp[16],
         ID_First_UnLock[16], 
         ID_Last_Lock[16];
    int tempTimeIn = 0,tempTimeOut = 0,
        ihours,iminutes,iseconds,
        ohours,ominutes,oseconds;
    int first_Sign_In = 86400 , last_Sign_Out = 0 ;
    int M,i;
    //数据录入和处理
    scanf("%d",&M);
    for( i = 0 ; i < M ; i++ ){
        scanf("%s %d:%d:%d %d:%d:%d",
                                    ID_Temp,
                                    &ihours,&iminutes,&iseconds,
                                    &ohours,&ominutes,&oseconds
                                    );
        tempTimeIn = ihours*3600 + iminutes*60 + iseconds;                      
        tempTimeOut = ohours*3600 + ominutes*60 + oseconds; 
        if( tempTimeIn <= first_Sign_In ){
            first_Sign_In = tempTimeIn;
            strcpy(ID_First_UnLock,ID_Temp);
        }
        if( tempTimeOut >= last_Sign_Out ){
            last_Sign_Out = tempTimeOut;
            strcpy(ID_Last_Lock,ID_Temp);
        }                   
    }   
    //结果输出 
    printf("%s %s",ID_First_UnLock,ID_Last_Lock);     
    return 0;
}
```
