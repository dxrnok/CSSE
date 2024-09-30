#include <iostream>
using namespace std;
#include <stdio.h>

//in this method takes in a number and then continues to loop through each number one by one starting from the right most digit.
//Then the reversed number is multiplied by 10 to make sure that the next digit will be placed behind the last digit instead of adding them
//e.g. 5672 => 2 *10 => 20 => 27
//if the number wouldnt be multiplied by 10 then the 2 and 7 would make 9
int reverseNum(int num){
    int reversed = 0, rem = 0;

    while(num != 0){
        rem = num%10;
        reversed = reversed*10 + rem;
        num/= 10;
    }
    return reversed;
}

int GCD(int num1, int num2){
    int gcd = 1;

    for(int i = 1; i <= num1 && i <= num2; i++){
        if(num1%i == 0 && num2%i == 0){
            gcd = i;
        }
    }
    return gcd;
}

bool isPal(int num){
    int rev = reverseNum(num);
    string str = to_string(rev), pal = to_string(num);
    string newPal = "";
    char minus = ' ';
    if(str.at(0) == '-'){
        str = str.substr(1) + '-';
    }

    bool check = false;
    if(str == pal){
        check = true;
    }

    return check;
}

int powFunc(int num1, int num2){
    int res = num1;
    for(int i = 1; i < num2; i++){
        res *= num1;
    }
    return res;
}

int main(){
    int x = -121;
    //cout << " Your Number Is: " << v;
    printf("Your Number is: %d\n", x);
    //cout << " Reversed Number: " << reverseNum(x);
    printf("Reversed Number: %d\n", reverseNum(x));

    int y = 24, z = 36;
    // cout << " GCD: " << GCD(y, z);
    printf("GCD of %d and %d", y, z);
    printf(" is %d\n", GCD(y,z));
    // cout << " pal " << isPal(121);
    printf("Palindrome: %s\n", isPal(x) ? "true" : "false");

    int k = 2, h = 3;
    printf("Power Function of %d^%d", k, h);
    printf(" = %d\n", powFunc(k,h));
}