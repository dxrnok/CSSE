var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on
var path = require("path");

//MONGODB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const connect = require('./connection/atlas_connect');  //connection uri for atlas

var server = http.createServer(); // create the server

// In-memory databases
var userDatabase = [];
var addressDatabase = [];
var shippingAddressDatabase = [];
var orderDatabase = [];
let collectionUser;
let collectionAddress;
let collectionShip;
let collectionOrders;

//CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
const client = new MongoClient(connect.database.url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const dbName = 'CS230-06';
///CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
async function connection() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        console.log('Successfully Connected To MongoDB!');
        const db = client.db(dbName);
        collectionUser = db.collection('USERS');
        collectionAddress = db.collection('ADDRESS');
        collectionShip = db.collection('SHIPPING');
        collectionOrders = db.collection('ORDERS');

    } catch(error) {
        // Ensures that the client will close when you finish/error
        console.error(error);
    }
}
connection();  //initilize connection function

var userID;
// listen for requests from clients
server.on("request", function (request, response) {
    
    var currentRoute = url.format(request.url); // get the route (/ or /api/user)
    var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
    var requestBody = ""; // will contain the extracted POST data later

    // determine the route (/ or /api/user)
    switch (currentRoute) {
        //
        // If no API call made then the default route is / so
        // just return the default index.html file to the user.
        // This contains the forms, etc. for making the CRUD
        // requests (only Create and Retrieve implemented)
        //
        //case to load in styles.css for html
        case "/css/styles.css":
            fs.readFile(__dirname + "/css/styles.css", function (err, data) {
                var headers = {"Content-Type": "text/css"};
                response.writeHead(200, headers);
                response.end(data);
            });
        break;

        case "/":
            fs.readFile(__dirname + "/index.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
            };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

        break;

        //
        // Handle the requests from client made using the route /api/user
        // These come via AJAX embedded in the earlier served index.html
        // There will be a single route (/api/user) but two HTTP request methods
        // POST (for Create) and GET (for Retrieve)
        //
        case "/createUser":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/usersCreate.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response
            // Handle a POST request;  the user is sending user data via AJAX!
            // This is the CRUD (C)reate request. These data need to be
            // extracted from the POST request and saved to the database!
            }else if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data", function (chunk) {
                    requestBody += chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");

                // finished reading the body of the request
                request.on("end", async function () {
                    var userData = "";
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }
                    var colU = {
                        title: userData.title,
                        fname: userData.fname,
                        sname: userData.sname,
                        mobile: userData.mobile,
                        email: userData.email
                    }

                    var updated = await collectionUser.insertOne(colU);
                    userID = updated.insertedId;
                    var colA = {
                        customerID: userID,
                        address1: userData.address1,
                        address2: userData.address2,
                        town: userData.town,
                        city: userData.city,
                        eircode: userData.eircode,
                    }
                    await collectionAddress.insertOne(colA);
                    await collectionShip.insertOne(colA);
                    // log the user data to console
                    console.log(
                        "USER DATA RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end(
                        "User (" +
                        userData.fname +
                        " " +
                        userData.sname +
                        ") data added to the Database!"
                    );
                });
                // Handle a GET request;  the user is requesting user data via AJAX!
                // This is the CRUD (R)etrieve request. These data need to be
                // extracted from the database and returned to the user as JSON!
            }
        break;

        case "/createUser/shippingAddress":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/shipping.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response
            // Handle a POST request;  the user is sending user data via AJAX!
            // This is the CRUD (C)reate request. These data need to be
            // extracted from the POST request and saved to the database!
            }else if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data", function (chunk) {
                    requestBody += chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");

                // finished reading the body of the request
                request.on("end", async function () {
                    var userData = "";
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }

                    var colA = {
                        customerID: userID,
                        address1: userData.address1,
                        address2: userData.address2,
                        town: userData.town,
                        city: userData.city,
                        eircode: userData.eircode,
                    }
                    const exists = await collectionShip.findOne({ _id: userID });
                    if(exists){
                        await collectionShip.updateOne({_id: userID}, {$set: colA});
                    }else{
                        await collectionShip.insertOne(colA);
                    }
                    // log the user data to console
                    console.log(
                        "USER SHIPPING ADDRESS RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end(
                        "User (" +
                        userData.fname +
                        " " +
                        userData.sname +
                        ") data added to the Database!"
                    );
                });
                // Handle a GET request;  the user is requesting user data via AJAX!
                // This is the CRUD (R)etrieve request. These data need to be
                // extracted from the database and returned to the user as JSON!
            }
        break;
  }
});

// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
    console.log("AJAX (HTTP) API server running on port: " + port + "\n");
});
