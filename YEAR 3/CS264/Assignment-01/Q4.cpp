#include <iostream>
using namespace std;
#include "a1.cpp"

int main(){
    int base, power;
    //cout << "Type a number: ";
    cin >> base;
    //cout << "Type a number: ";
    cin >> power;
    printf("%d\n", powFunc(base,power));
}