#include <iostream>
#include <cstring>
using namespace std;

class Matrix{
private:
    unsigned int m_rows, m_cols;
    int** data;
public: 
    /* 1. */ 
    Matrix(unsigned int m, unsigned int n);
    /* A specialised constructor that initialises a matrix of size m×n, every element in this matrix is 0. */
    /* 2. */ 
    Matrix ( const Matrix & mat );
    /* A copy constructor that copies every element from matrix mat. */

    /* 3. */ 
    Matrix (int ** array , unsigned int m , unsigned int n );
    /* Initialise current matrix using a 2D array with size of m × n. */

    /* 4. */ 
    unsigned int rows () const;
    /* Returns the number of rows in the matrix. */

    /* 5. */ 
    unsigned int columns () const;
    /* Returns the number of columns in the matrix. */

    /* 6. */ 
    int get ( unsigned i , unsigned j ) const;
    /* Returns the element at ith row and jth column. (i and j here begin at 0) */

    /* 7. */ 
    void set ( unsigned i , unsigned j , int value);
    /* Update value at ith row and jth column. (i and j here begin at 0). */

    /* 8. */ 
    Matrix operator +( const Matrix & mat );
    /* Returns a matrix that contains the results of addition of two matrices. */

    /* 9. */ 
    Matrix operator -( const Matrix & mat );
    /* Returns a matrix that contains the results of subtraction of two matrices */

    /* 10. */ 
    Matrix operator *( const Matrix & mat );
    /* Returns a matrix that contains the results of multiplication of two matrices. */

    /* 11. */ 
    Matrix operator ~() const;
    /* Returns the transpose of current matrix. */

    /* 12. */ 
    bool operator ==( const Matrix & mat );
    /* Returns true(1) if two matrices are the same, otherwise false(0). 
    Two matrices are the same iff they both contain the same element at exact location
    in each matrix. */
    
    /* 13. */ 
    string toStr ();
    /* Returns a string representation ((showing every element in the matrix)) of
    /* the matrix. */

    void print();
};