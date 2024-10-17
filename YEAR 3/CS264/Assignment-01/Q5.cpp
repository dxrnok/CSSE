#include <iostream>
using namespace std;
#include "a1.cpp"

int main(){
    int powOf2Num;
    //cout << "Type a number: ";
    cin >> powOf2Num;
    printf("%s\n", powOf2(powOf2Num) ? "true" : "false");
}