#include <iostream>
#include <cstring>
#include "Matrix.cpp"

using namespace std;

void Test_Case_Operator_Plus(){
    cout << "Plus Method:\n";
    Matrix matrix1(2, 2);
    Matrix matrix2(2, 2);

    matrix1.set(0, 0, 5);
    matrix1.set(0, 1, 3);
    matrix1.set(1, 0, 1);
    matrix1.set(1, 1, 2);
    cout << "Matrix 1:\n";
    matrix1.print();

    matrix2.set(0, 0, 1);
    matrix2.set(0, 1, 1);
    matrix2.set(1, 0, 1);
    matrix2.set(1, 1, 1);
    cout << "Matrix 2:\n";
    matrix2.print();

    Matrix sum = matrix1 + matrix2;
    cout << "Sum:\n";
    sum.print();
}

void Test_Case_Operator_Minus(){
    cout << "Minus Method:\n";
    Matrix matrix1(2, 2);
    Matrix matrix2(2, 2);

    matrix1.set(0, 0, 5);
    matrix1.set(0, 1, 3);
    matrix1.set(1, 0, 1);
    matrix1.set(1, 1, 2);
    cout << "Matrix 1:\n";
    matrix1.print();

    matrix2.set(0, 0, 1);
    matrix2.set(0, 1, 1);
    matrix2.set(1, 0, 1);
    matrix2.set(1, 1, 1);
    cout << "Matrix 2:\n";
    matrix2.print();

    Matrix sum = matrix1 - matrix2;
    cout << "Sum:\n";
    sum.print();
}

void Test_Case_Operator_Multi(){
    cout << "Multi Method:\n";
    Matrix matrix1(2, 2);
    Matrix matrix2(2, 2);

    matrix1.set(0, 0, 5);
    matrix1.set(0, 1, 3);
    matrix1.set(1, 0, 1);
    matrix1.set(1, 1, 2);
    cout << "Matrix 1:\n";
    matrix1.print();

    matrix2.set(0, 0, 1);
    matrix2.set(0, 1, 1);
    matrix2.set(1, 0, 1);
    matrix2.set(1, 1, 1);
    cout << "Matrix 2:\n";
    matrix2.print();

    Matrix sum = matrix1 * matrix2;
    cout << "Sum:\n";
    sum.print();
}

void Test_Case_Operator_Trans(){
    cout << "Transpose Method:\n";
    Matrix matrix1(2, 3);
    Matrix matrix2(2, 2);

    matrix1.set(0, 0, 5);
    matrix1.set(0, 1, 3);
    matrix1.set(1, 0, 1);
    matrix1.set(1, 1, 2);
    matrix1.set(0, 2, 6);
    matrix1.set(1, 2, 9);
    cout << "Matrix1:\n";
    matrix1.print();

    Matrix trans = ~matrix1;
    cout << "Transpose:\n";
    trans.print();
}
void Basic_Methods_Test(){
    cout << "Basic Testing of Methods:\n";
    Matrix matrix1(2, 2);
    Matrix matrix3(4, 3);
    cout << "Matrix 1:\n";
    matrix1.print();
    matrix1.set(0, 1, 5);
    matrix1.set(0, 0, 2);
    matrix1.set(1, 0, 3);
    matrix1.set(1, 1, 7);
    cout << "Setting elements in matrix:\n";
    matrix1.print();

    Matrix matrix2(matrix1);
    cout << "Matrix1 copied into matrix 2:\n";
    matrix2.print();
    cout << "Rows Of Matrix2: " << matrix2.rows() << " \n";
    cout << "Columns Of Matrix2: " <<  matrix2.columns() << " \n";
    cout << "Matrix2 Element @ 2,0: " <<  matrix2.get(2, 0) << " \n";
    cout << "Matrix2 Element @ 1,0: " <<  matrix2.get(1, 0) << " \n";
    
    bool check = matrix1 == matrix2;
    cout <<"Matrix1 == Matrix2? (1 = true, 0 = false): " << check << "\n";
    check = matrix1 == matrix3;
    cout <<"Matrix1 == Matrix3? (1 = true, 0 = false): " << check << "\n";
    cout << endl;
}

void STR_Methods_Test(){
    cout << "STR Testing of Methods:\n";
    Matrix matrix1(2, 2);
    cout << "Matrix1:\n";
    cout << matrix1.toStr();
    cout << endl;
}

void Array_To_Matrix_Test(){
    cout << "Array To Matrix Test:\n";
    cout << "Array:\n";
    int ** arr = new int*[4];
    for (int i = 0; i < 4; i++){
        arr[i] = new int[4]; 
        for (int j = 0; j < 4; j++){
            arr[i][j] = i+j;
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;

    Matrix arrToMatrix (arr, 4, 4);
    cout << "Matrix:\n";
    arrToMatrix.print();
}
int main(){
    Basic_Methods_Test();
    STR_Methods_Test();
    Test_Case_Operator_Plus();
    Test_Case_Operator_Minus();
    Test_Case_Operator_Multi();
    Test_Case_Operator_Trans();
    Array_To_Matrix_Test();
    return 0;
}