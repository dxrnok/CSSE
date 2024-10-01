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

//This algorithm iterates through all possible numbers 
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

int powFunc(int base, int power){
    int res = 1;
    if(base == 0 || base == 1 || base == -1){
        return base;
    }
    
    while(power != 0){
        res *= base;
        power--;
    }
    return res;
}

bool powOf2(int num){
    if(num <= 0){
        return false;
    }

    while(num%2==0){
        num /= 2;
    }
    return num == 1;
}

int main(){
    string w = "\033[0;31m", c = "\033[0;32m", r = "\033[0m";
    int x = 73237;
    //cout << " Your Number Is: " << v;
    printf("Your Number is: %d\n", x);
    //cout << " Reversed Number: " << reverseNum(x);
    printf("Reversed Number: %d\n", reverseNum(x));

    int y = 24, z = 36;
    // cout << " GCD: " << GCD(y, z);
    printf("GCD: %d and %d = %d\n", y, z, GCD(y,z));
    // cout << " pal " << isPal(121);
    printf("Palindrome: %d = %s\n", x, isPal(x) ? "\033[0;32mtrue\033[0m" : "\033[0;31mfalse\033[0m");

    int base = 1, power = 3;
    printf("Power Function: %d^%d = %d\n", base, power, powFunc(base,power));

    int powOf2Num = 128;
    printf("Power Of Two: %d = %s\n", powOf2Num, powOf2(powOf2Num) ? "\033[0;32mtrue\033[0m" : "\033[0;31mfalse\033[0m");
}