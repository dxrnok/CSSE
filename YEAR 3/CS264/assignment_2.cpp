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
    dest[l2] = '\0';    //this makes sure that any irrelevant characters that have been stored in dest are removed5
    return dest;
}

char* substring(int i, int j, const char* str){
    //checks if i or j are > str length
    if(i > length(str) || j > length(str)){
        return NULL;
    }
    int len = j-i; //get ;ength of the given substring (+1 )
    char* sub = new char[len+1];
    for(int k = 0; str[k]; k++){
        sub[k] = str[i+k];
    }
    sub[len] = '\0';
    return sub;
}

/* char* replace(char c, char p, const char* str){

}
 */
/*
    - Try to include your test cases below this multi-line comment -

    Ensure your test cases use the following format:

    [function]_name_test_case_[k](){
        test_input = example_value;
        expected_output = example_value;

        result = [function](test_input)
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

// Call your test functions in the main function below
int main(){
    // [function]_name_test_case_[k]()
    char* a = "string\0";
    char dest[9] = "bmdea123";
    printf("Length: %d\n", length(a));
    printf("Index: %d\n", indexOf('i',a));
    printf("Copy: %s\n", copy(dest,"yest"));
    printf("Substring: %s\n", substring(0,3, "string"));
    return 0;
}

