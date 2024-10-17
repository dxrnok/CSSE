#include <iostream>
using namespace std;
#include "a1.cpp"

int main(){
     int x;
    //cout << "Type a number: "; 
    cin >> x; //Get user input
    printf("%s\n", isPalindrome(x) ? "true" : "false");
}