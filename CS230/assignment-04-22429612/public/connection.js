var	mysql	=	require('mysql');

var	con	=	mysql.createConnection({
	host:	"127.0.0.1",
	user:	"nodeUser",
	password:	"nodeUser-24",
    //database: "CS230"
});

con.connect(function(err){
	if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS CS230", function (err) {
        if(err)throw err;
        console.log("Database created");
    });
    con.query("USE CS230", function (err) {
        if(err)throw err;
        console.log("Selected database");
    });
    var sql =   "CREATE TABLE IF NOT EXISTS users (" +
                "id INT AUTO_INCREMENT PRIMARY KEY," +
                "title VARCHAR(50)," +
                "firstnames VARCHAR(50) NOT NULL," +
                "surname VARCHAR(50) NOT NULL," +
                "mobileNO VARCHAR(20) NOT NULL," +
                "email VARCHAR(255) NOT NULL," +
                "address1 VARCHAR(255) NOT NULL," +
                "address2 VARCHAR(255)," +
                "town VARCHAR(50) NOT NULL," +
                "city VARCHAR(50) NOT NULL," +
                "eircode VARCHAR(7) NOT NULL" +
            ")";
    con.query(sql, function (err) {
        if (err) throw err;
        console.log("Table created");
    });
});