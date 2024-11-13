#include <iostream>
#include <cstring>

using namespace std;
class Matrix{
    private:
        unsigned int row, cols;
        //unsigned int** data;
    public: 
        /* 1. */ 
        Matrix ( unsigned int m , unsigned int n ){
        /* A specialised constructor that initialises a matrix of size m×n, every element in this matrix is 0. */
            row = m;
            cols = n;
            int data[m][n] ;
            for(int i = 0; i < (row); i++){
                //cout<< "$\n";
                for(int j = 0; j < cols; j++){
                    //cout<< "$";
                    data[i][j] = 0;
                    cout<< data;
                }
                cout<<"\n";
            }
        }
        /* 2. */ 
        Matrix ( const Matrix & mat ){
        /* A copy constructor that copies every element from matrix mat. */
            for (int i = 0; i < row; ++i){
                for (int j = 0; j < cols; ++j){
                    data[i][j] = mat.data[i][j];
                }
            }
        }

        /* 3. */ 
        Matrix (int ** array , unsigned int m , unsigned int n ){
        /* Initialise current matrix using a 2D array with size of m × n. */
            row = m;
            cols = n;
            data[m][n];
            for(int i = 0; i < row; i++){
                for(int j = 0; j < cols; j++){
                    data[i][j] = 0;
                    printf("%s\n","*");
                }
            }
        }

        /* 4. */ 
        unsigned int rows () const{return 0;}
        /* Returns the number of rows in the matrix. */

        /* 5. */ 
        unsigned int columns () const{return 0;}
        /* Returns the number of columns in the matrix. */

        /* 6. */ 
        int get ( unsigned i , unsigned j ) const{return 0;}
        /* Returns the element at ith row and jth column. (i and j here begin at 0) */

        /* 7. */ 
        void set ( unsigned i , unsigned j , int value){}
        /* Update value at ith row and jth column. (i and j here begin at 0). */

        /* 8. */ 
        Matrix operator +( const Matrix & mat ){}
        /* Returns a matrix that contains the results of addition of two matrices. */

        /* 9. */ 
        Matrix operator -( const Matrix & mat ){}
        /* Returns a matrix that contains the results of subtraction of two matrices */

        /* 10. */ 
        Matrix operator *( const Matrix & mat ){}
        /* Returns a matrix that contains the results of multiplication of two matrices. */

        /* 11. */ 
        Matrix operator ~() const{}
        /* Returns the transpose of current matrix. */

        /* 12. */ 
        //bool operator ==( const Matrix & mat ){}
        /* Returns true(1) if two matrices are the same, otherwise f alse(0). 
        Two matrices are the same iff they both contain the same element at exact location
        in each matrix. */

        /* 13. */ 
        string toStr (){return 0;}
        /* Returns a string representation ((showing every element in the matrix)) of
        /* the matrix. */

        /* *
        * check if two matrices are the same : two matrices are the same
        * if they both contain the same element at the same location in
        * each matrix .
        * @param mat is another matrix
        * @return true if both are the same , otherwise false .
        */
        //bool operator ==( const Matrix & mat ){}

};

int main(){
            int** a;
            Matrix(2, 2);
            return 0;
}