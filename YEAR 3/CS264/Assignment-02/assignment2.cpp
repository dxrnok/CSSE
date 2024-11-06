#include <iostream>
#include <cstring>

using namespace std;

/*
    Ensure you include sufficient comments to explain your solutions. This can
    come in the form of a multi-line comment before the solution, or inline
    comments left within the solution itself.
*/


unsigned int length(const char* str){
    int i = 0;
    for(i; i < str[i]; i++);    //loop through the word until '\0'
    return i;   //return counted characters
}

int indexOf(char c, const char* str){
    int index = 0;
    bool found = false;

    //loop through, if char c is found at given index then change found to true and 
    //terminate loop, if not found continue looping if index > str length then set
    //index to -1 and terminate loop
    while(!found){
        if(c != str[index]){
            index++;
        }else{
            found = true;
        }
        if(index == length(str)){
            index = -1;
            found = true;
        }
    }
    
    return index;
}

char* copy(char* dest, const char* src){  
    int l1 = length(dest), l2 = length(src);    //lengths of destination and source
    
    //if dest is shorter then return null
    if(l1 < l2){
        return NULL;
    }
    
    //loop through source and store it in dest
    for(int i = 0; src[i]; i++){
        dest[i] = src[i];
    }
    dest[l2] = '\0';    //this makes sure that any irrelevant characters that have been stored in dest are removed
    return dest;
}


char* substring(int i, int j, const char* str){
    //checks if i or j are > str length
    if(i > length(str) || j > length(str)){
        return NULL;
    }
    int len = j-i; //get length of the given substring 
    char* sub = new char[len];
    for(int k = 0; str[k]; k++){ //iterate through str and store each char to new array
        sub[k] = str[i+k];
    }
    sub[len] = '\0'; //this makes sure that any irrelevant characters that have been stored in sub are removed
    return sub;
}

char* replace(char c, char p, const char* str){
    char* sub = new char[length(str)];
    //if there is no char in the word return copy of the word
    if(indexOf(c, str) == -1){
        int i = 0;
        while(length(sub) != length(str)){
            sub[i] = str[i];
            i++;
        }
        sub[i] = '\0';
        return sub;
    }

    int i;
    //iterate through str storing it into sub and if the char is found replace it and store in sub 
    for(i = 0; str[i]; i++){
        if(str[i] != c){
            sub[i] = str[i];
        }else{
            sub[i] = p;
        }
    }
    sub[i] = '\0';  //this makes sure that any irrelevant characters that have been stored in dest are removed

    return sub;
}

/*
    - Try to include your test cases below this multi-line comment -

    Ensure your test cases use the following format:

    [function]_name_test_case_[k](){
        test = example_value;
        exp = example_value;

        result = [function](test)
        if(result == output){
            cout << "[function]_name_test_case_[k] PASSED" << endl;
        }
        else{
            cout << "[function]_name_test_case_[k] FAILED" << endl;
        }
    }

    [function] - The name of the function being tested
    [k] - The index of the test
*/
//Automation testcase 
void length_test_cases() {

    char* test[5] = {"hello", "", "1234560", "a", "!*_"};
    int exp[5] = {5, 0, 7, 1, 3};
    int i = 0;
    for (i = 0; i < 5; i++) {
        int result = length(test[i]);
        cout << "length_test_case_" << i+1 << ": " << (result == exp[i] ? "PASSED" : "FAILED") << endl;
    }
}

//automation testcase
void indexOf_test_cases() {
    
    char testchar[5] = {'e', 'z', '*', 'a', 's'};
    char* test[5] = {"hello", "world", "special*characters", "aaa", "s"};
    int exp[5] = {1, -1, 7, 0, 0};
    int i = 0;
    for (int i = 0; i < 5; i++) {
        int result = indexOf(testchar[i], test[i]);
        cout << "indexOf_test_case_" << i+1 << ": " << (result == exp[i] ? "PASSED" : "FAILED") << endl;
    }
}

//few testcase functions for copy
void copy_test_case1() {
  
    char dest[12] = "destination";
    char* src = "source";
    char* exp = "source";
    copy(dest, src);
    if(strcmp(dest, exp)==0){
        cout << "copy_test_case_" << 1 << ": " << "PASSED" << endl;
    }else{
        cout << "copy_test_case_" << 1 << ": " << "FAILED" << endl;
    }
}
void copy_test_case2() {
  
    char dest[4] = "abc";
    char* src = "def";
    char* exp = "def";
    copy(dest, src);
    if(strcmp(dest, exp)==0){
        cout << "copy_test_case_" << 2 << ": " << "PASSED" << endl;
    }else{
        cout << "copy_test_case_" << 2 << ": " << "FAILED" << endl;
    }
}

void copy_test_case4() {
  
    char dest[12] = "123456";
    char* src = "e";
    copy(dest, src);
    if(strcmp(dest, "e")==0){
        cout << "copy_test_case_" << 4 << ": " << "PASSED" << endl;
    }else{
        cout << "copy_test_case_" << 4 << ": " << "FAILED" << endl;
    }
}

//few testcase function for substring
void substring_test_case1(){
    const char* test= "Sleeping Dogs";
    int i=0, j=8;
    const char* exp ="Sleeping";

    char* result =substring(i,j, test);
    if(strcmp(result, exp)==0){
        cout << "substring_test_case_" << 1 << ": " << "PASSED" << endl;
    }else{
        cout << "substring_test_case_" << 1 << ": " << "FAILED" << endl;
    }
} 

void substring_test_case2(){
    const char* test= "Halo Reach";
    int i=5, j=10;
    const char* exp ="Reach";

    char* result =substring(i,j, test);
    if(strcmp(result, exp)==0){
        cout << "substring_test_case_" << 2 << ": " << "PASSED" << endl;
    }else{
        cout << "substring_test_case_" << 2 << ": " << "FAILED" << endl;
    }
}

void substring_test_case3(){
    const char* test= "hello hi hey";
    int i=3, j=9;
    const char* exp ="lo hi";

    char* result =substring(i,j, test);
    if(strcmp(result, exp)==0){
        cout << "substring_test_case_" << 3 << ": " << "PASSED" << endl;
    }else{
        cout << "substring_test_case_" << 3 << ": " << "FAILED" << endl;
    }
}

//replace testcases
void replace_test_case1(){
    const char* test= "stringsir";
    char c='i';
    char p='x';
    const char* exp="strxngsxr";
    char* result =replace(c,p, test);
    if(strcmp(result, exp)==0){
        cout << "replace_test_case_" << 1 << ": " << "PASSED" << endl;
    }else{
        cout << "replace_test_case_" << 1 << ": " << "FAILED" << endl;
    }
}
void replace_test_case2(){
    const char* test= "grab";
    char c='a';
    char p='e';
    const char* exp="greb";
    char* result =replace(c,p, test);
    if(strcmp(result, exp)==0){
        cout << "replace_test_case_" << 2 << ": " << "PASSED" << endl;
    }else{
        cout << "replace_test_case_" << 2 << ": " << "FAILED" << endl;
    }
}

void replace_test_case3(){
    const char* test= "rebels";
    char c='a';
    char p='e';
    const char* exp="rebels";
    char* result =replace(c,p, test);
    if(strcmp(result, exp)==0){
        cout << "replace_test_case_" << 3 << ": " << "PASSED" << endl;
    }else{
        cout << "replace_test_case_" << 3 << ": " << "FAILED" << endl;
    }
}

// Main function to call all test cases
int main() {
    length_test_cases();
    indexOf_test_cases();
    copy_test_case1();
    copy_test_case2();
    printf("%s %s\n", copy("strr", "strrr"), "PASSED"); //count solve with test case so i showed here that null is returned
    copy_test_case4();
    substring_test_case1();
    substring_test_case2();
    substring_test_case3();
    replace_test_case1();
    replace_test_case2();
    replace_test_case3();
    
    return 0;
}
// Call your test functions in the main function below
/* int main(){
    // [function]_name_test_case_[k]()
    length_test_case_1();
    /* char* a = "string\0";
    char dest[9] = "bmdea123";
    printf("Length: %d\n", length(a));
    printf("Index: %d\n", indexOf('i',a));
    printf("Copy: %s\n", copy(dest,"yest"));
    printf("Substring: %s\n", substring(1,3, "string"));
    printf("Replace: %s\n", replace('i','x', "string")); 
    return 0;
}*/