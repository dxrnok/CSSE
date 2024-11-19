#include <iostream>
#include <cstring>
#include "Matrix.h"

using namespace std;

/* 1. */ 
 /**
 * Constructor that initializes a matrix of size m × n, 
 * where every element is set to 0.
 * @param m Number of rows.
 * @param n Number of columns.
 */
Matrix::Matrix(unsigned int m, unsigned int n) {
    m_rows = m; 
    m_cols = n;
    if (m_rows <= 0 || m_cols <= 0) {
        cout << "Both dimensions must be positive";
    }else{
        data = new int*[m_rows]; 
        for (int i = 0; i < m_rows; i++){
            data[i] = new int[m_cols]; 
            for (int j = 0; j < m_cols; j++){
                data[i][j] = 0;
            }
        }
    }
}

/* 2. */ 
/**
 * Copy constructor that creates a new matrix by copying 
 * all elements from another matrix.
 * @param mat The matrix to be copied.
 */
Matrix::Matrix ( const Matrix & mat ){
    m_rows = mat.m_rows;
    m_cols = mat.m_cols;
    if (m_rows <= 0 || m_cols <= 0) {
        cout << "Both dimensions must be positive";
    }else{
        data = new int*[m_rows];
        for (int i = 0; i < m_rows; ++i){
            data[i] = new int[m_cols];
            for (int j = 0; j < m_cols; ++j){
                data[i][j] = mat.data[i][j];
            }
        }
    }
}

/* 3. */ 
/**
 * Constructor that initializes the matrix using a 2D array.
 * Copies the data from the provided array of size m × n.
 * @param array A 2D array of integers.
 * @param m Number of rows in the matrix.
 * @param n Number of columns in the matrix.
 */
Matrix::Matrix (int ** array , unsigned int m , unsigned int n ){
    m_rows = m;
    m_cols = n;
    if (m_rows <= 0 || m_cols <= 0) {
        cout << "Both dimensions must be positive";
    }else{
        data = new int*[m_rows];
        for(unsigned int i = 0; i < m_rows; i++){
            data[i] = new int[m_cols]; 
            for(unsigned int j = 0; j < m_cols; j++){
                data[i][j] = array[i][j];
            } 
        }
    }
}

/* 4. */ 
 /**
 * Retrieves the number of rows in the matrix. Read-only
 * @return The number of rows in the matrix.
 */
unsigned int Matrix::rows () const{return m_rows;}

/* 5. */ 
 /**
 * Retrieves the number of columns in the matrix. Read-only
 * @return The number of columns in the matrix.
 */
unsigned int Matrix::columns () const{return m_cols;}

/* 6. */
/**
 * Retrieves the value at the specified row and column. Read-only
 * (Indices start from 0).
 * @param i Row index.
 * @param j Column index.
 * @return Value at the given location, or -1 if out of bounds.
 */
int Matrix::get ( unsigned i , unsigned j ) const{
    if((i >= m_rows || j >= m_cols) || (i < 0 || j < 0)){
        return -1;
    }else return data[i][j];
}

/* 7. */
/**
 * Sets a value at the specified row and column in the matrix.
 * (Indices start from 0).
 * @param i Row index.
 * @param j Column index.
 * @param value The value to be set at the specified location.
 */
void Matrix::set ( unsigned i , unsigned j , int value){
    if((i >= m_rows || j >= m_cols) || (i < 0 || j < 0)){
        cout << "Index out of bounds ";
    }else data[i][j] = value;
}

/* 8. */ 
 /**
 * Adds two matrices element wise.
 * @param mat The matrix to add to the current matrix.
 * @return A new matrix representing the result of the addition.
 */
Matrix Matrix::operator +( const Matrix & mat ){
    if(m_rows != mat.m_rows || m_cols != mat.m_cols){
        cout << "Index out of bounds ";
    }else{
        Matrix sum (m_rows, m_cols);
        for (int i = 0; i < m_rows; ++i){
            for (int j = 0; j < m_cols; ++j){
                sum.data[i][j] = data[i][j] + mat.data[i][j];
            }
        }
        return sum;
    }
}

/* 9. */
 /**
 * Subtracts two matrices element wise..
 * @param mat The matrix to subtract from the current matrix.
 * @return A new matrix representing the result of the subtraction.
 */
Matrix Matrix::operator -( const Matrix & mat ){
    if(m_rows != mat.m_rows || m_cols != mat.m_cols){
        cout << "Index out of bounds ";
    }else{
        Matrix sum (m_rows, m_cols);
        for (int i = 0; i < m_rows; i++){
            for (int j = 0; j < m_cols; j++){
                sum.data[i][j] = data[i][j] - mat.data[i][j];
            }
        }
        return sum;
    }
}

/* 10. */ 
/**
 * Multiplies two matrices element wise..
 * @param mat The matrix to multiply with the current matrix.
 * @return A new matrix representing the product of the two matrices.
 */
Matrix Matrix::operator *( const Matrix & mat ){
    if(m_rows != mat.m_rows){
        cout << "Number of Rows is not the same ";
    }else{
        Matrix sum (m_rows, m_cols);
        for (int i = 0; i < m_rows; i++){
            for (int j = 0; j < mat.m_rows; j++){
                for(int k = 0; k<m_cols; k++){
                    sum.data[i][j] += data[i][k] * mat.data[k][j];
                }
            }
        }
        return sum;
    }
}

/* 11. */ 
/**
 * Transpose of a matrix.
 * @return A new matrix that is the transpose of the current matrix.
 */
Matrix Matrix::operator ~() const{
    Matrix transpose (m_cols, m_rows);
    for (int i = 0; i < m_rows; i++){
        for (int j = 0; j < m_cols; j++){
            transpose.data[j][i] = data[i][j];
        }
    }
    return transpose;
}

/* 12. */ 
/**
* check if two matrices are the same: two matrices are the same
* if they both contain the same element at the same location in
* each matrix.  
* @param mat is another matrix
* @return true(1) if both are the same, else false(0).
*/
bool Matrix::operator ==( const Matrix & mat ){
    //check if bot rows and cols are the same size
    if(m_rows != mat.m_rows || m_cols != mat.m_cols){
        return false;
    }

    for (int i = 0; i < m_rows; i++){
        for (int j = 0; j < m_cols; j++){
            if(data[i][j] != mat.data[i][j]){
                return false;
            }
        }
    }
    return true;
}

/* 13. */ 
/**
 * Converts the matrix into a string representation, where 
 * each row is a line of space-separated values. Read-only
 * @return A string representation of the matrix.
 */
string Matrix::toStr (){
    string str = "";
    for (int i = 0; i < m_rows; i++){
        for (int j = 0; j < m_cols; j++){
            str += to_string(data[i][j]);
            if(j < m_cols-1){
                str += " ";
            }
        }
        if(i < m_rows-1){
            str += "\n";
        }
    }
    return str;
}

/* 14. */ 
/**
 * prints the matrix. Read-only
 */
//i made my own method to print the matrixes, the toStr is still used in one of the test cases
void Matrix::print (){
    for (int i = 0; i < m_rows; i++) {
        for (int j = 0; j < m_cols; j++) {
            cout << data[i][j] << " ";      // Print each element in a row
        }
        cout << endl;
    }
    cout << endl;
}