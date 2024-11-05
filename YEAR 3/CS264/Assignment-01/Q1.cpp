#include <iostream>
using namespace std;
#include "a1.cpp"

int main(){
    //TASK 1
    int x;
    //cout << "Type a number: "; 
    cin >> x; //Get user input
    //printf("\nYour Number is: %d\n", x);
    printf("%d\n", reverseNum(x));
}