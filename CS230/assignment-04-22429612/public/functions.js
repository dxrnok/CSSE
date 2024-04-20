
function createUser(title, firstnames, surname, mobileNO, email, address1, address2, town, city, eircode) {
    const userId = results.insertId;
    const userSql = `INSERT INTO users (id,title, firstnames, surname, mobileNO, email,address1, address2, town, city, eircode) VALUES (?, ?, ?, ?, ?)`;
    con.query(userSql, [userId, title, firstnames, surname, mobileNO, email, address1, address2, town, city, eircode], function(err, results){
        if (err) {
            console.error('Error creating user:', err);
            return;
        }
        console.log('User created successfully');
    });
}

function searchUsersByName(name) {
    const sql = `SELECT * FROM users WHERE firstnames LIKE ?`;
    con.query(sql, [`%${name}%`], function(err, results) {
        if (err) {
            console.error('Error searching users:', err);
            return;
        }
    
        if (results.length > 0) {
            results.forEach(function(row)   {
                console.log(`Title: ${row.title} - Name: ${row.firstnames} ${row.surname}`);
            });
        } else {
            console.log('0 results');
        }
    });
}

function deleteUser(email) {
    const getUserIDQuery = `SELECT id FROM users WHERE email=?`;

    con.query(getUserIDQuery, [email], (err, results) => {
        if (err) {
            console.error('Error getting user ID:', err);
            return;
        }

        if (results.length > 0) {
            const userId = results[0].id;
             const deleteUser = `DELETE FROM addresses WHERE id=?`;


                con.query(deleteUser, [userId], (err, results) => {
                if (err) {
                    console.error('Error deleting address:', err);
                    return;
                }
                console.log('User deleted successfully.');
                });
        } else {
            console.log('User not found.');
        }
    });
}