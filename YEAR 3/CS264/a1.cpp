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

//This algorithm iterates through all the numbers starting from one and if both of the inputted numbers are divisible 
//by the current number (which is "i") then this number is saved and after the program runs through all possible numbers then
//the number stored is returned
int GCD(int num1, int num2){
    int gcd = 1;

    for(int i = 1; i <= num1 && i <= num2; i++){
        if(num1%i == 0 && num2%i == 0){
            gcd = i;
        }
    }
    return gcd;
}

//Here I used the reverseNum method to reverse the number and then i converted the number to string.
//i also stored the original number to string just for easier comparison.
bool isPalindrome(int num){
    int rev = reverseNum(num);
    string str = to_string(rev), str2 = to_string(num);

    //if the reversed string contained a "-" at index 0 i removed it and stored it to the back of the 
    //reversed string because my reverse only reversed the numbers and kept "-" at the start of the number
    if(str.at(0) == '-'){
        str = str.substr(1) + '-';
    }

    //if both strings are == the method returns true else false 
    bool check = false;
    if(str == str2){
        check = true;
    }

    return check;
}

//not usable since complexity is not O(logN)
/* int powFunc(int base, int power){
    int res = 1;
    if(base == 0 || base == 1 || base == -1){
        return base;
    }
    
    while(power != 0){
        res *= base;
        power--;
    }
    return res;
} */

//at the start I made a quick check to make sure that a base is not 0 or 1 because these two numbers will always be the same 
//0^1000 = 0 and 1^10 = 1. I also checked if base is not -1 and power is odd because a "-" number to the power of any odd power
//will always return -1. If the number is -1 and power is even then method should return a positive one.
int powFunc(int base, int power){
    int res = 1;
    if(base == 0 || base == 1 || (base == -1 && power%2!=0)){
        return base;
    }else if(base == -1 && power%2==0){
        return base*-1;
    }
    
    //check to make sure power is not 0 to insure the loop is not infinit
    while(power!=0){
        //if the power is odd 
        if(power%2!=0){
            //multiple the result by the base
            res *= base;
        }
        
        power /= 2; //divide the power by 2 
        base *= base; //square the base
    }
    return res;
}

bool powOf2(int num){
    //check if number is a positive number and > 0
    if(num <= 0){
        return false;
    }

    //check if number is even and divide it by 2 until its == 1
    while(num%2==0){
        num /= 2;
    }

    //returns true if the num == 1 else false, if it == 1 it means its a power
    //of 2 else its not
    return num == 1;
}

int main(){
    //TASK 1
    int x;
    cout << "Type a number: "; 
    cin >> x; //Get user input
    printf("\nYour Number is: %d\n", x);
    printf("Reversed Number: %d\n", reverseNum(x));

    //TASK 2
    int y, z;
    cout << "Type a number: ";
    cin >> y;
    cout << "Type a number: ";
    cin >> z;

    printf("GCD: %d and %d = %d\n", y, z, GCD(y,z));

    //TASK 3 (INPUT IS FROM TASK 1)
    printf("Palindrome: %d = %s\n", x, isPalindrome(x) ? "\033[0;32mtrue\033[0m" : "\033[0;31mfalse\033[0m");

    //TASK 4
    int base = 4, power = 9;
    printf("Power Function: %d^%d = %d\n", base, power, powFunc(base,power));

    //TASK 5
    int powOf2Num = 128;
    printf("Power Of Two: %d = %s\n", powOf2Num, powOf2(powOf2Num) ? "\033[0;32mtrue\033[0m" : "\033[0;31mfalse\033[0m");
}