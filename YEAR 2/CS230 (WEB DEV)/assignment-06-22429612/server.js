//note example could not work due to a fact that the user got deleted.
//MOST OF THE EXAMPLES ARE HARD CODED JUST FOR EASE AND THESE WOULD NOT
//BE INCLUDED IN MAIN APP
//ALSO SOME PARTS CONTAIN THE USER ID IN CODE SO YOU CAN CHECK DB IF UPDATE WORKED BASED ON THE ID
//EXAMPLES ARE ONLY THERE FOR A FASTER TESTING OF WHAT THE CODE DOES AND ARE FOR TESTING ONLY
//
//NOTE*** NOT SURE WHY BUT THE ALERT FROM JS IS A BIT BUGGY SOMETIMES YOU HAVE TO CLICK
//ON WEB OUTSIDE THE ALERT, IF THIS IS IN WAY OF GRADING JUST COMMENT THEM OUT
//THEY PROVIDED EXTRA INFO FOR GRADERS JUST TO MAKE SURE NO ISSUES OR COMPLICATIONS
//ARISE DURING THE GRADING PROCESS OF HOW EXAMPLE BUTTONS WORK

//TESTED WITH CHROME Version 124.0.6367.63 (Official Build) (64-bit) and Version 124.0.6367.92 (Official Build) (64-bit)

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on

//MONGODB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const connect = require('./connection/atlas_connect');  //connection uri for atlas
var server = http.createServer(); // create the server

// database collections
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
        console.log('Successfully Connected To MongoDB!\n');
        const db = client.db(dbName);
        collectionUser = db.collection('USERS');
        collectionAddress = db.collection('ADDRESS');
        collectionShip = db.collection('SHIPPING');
        collectionOrders = db.collection('ORDERS');

    } catch(error) {
        // Ensures that the client will close when you finish/error
        console.error(error);
        client.close();
        console.log("MongoDB connnection closed!");
    }
}
connection();  //initilize connection function

var userID;
// listen for requests from clients
//basic code structure is referring back to JOHNS lecture videos and resources
server.on("request", function (request, response) {
    
    var currentRoute = url.format(request.url); // get the route
    var currentMethod = request.method; //get the HTTP request type
    var requestBody = "";

    switch (currentRoute) {
        // If no API call made then the default route is / so
        // just return the default index.html file to the user. 

        //case to load in styles.css for html 
        //(this is needed for the css to work within the html files)
        case "/css/styles.css":
            fs.readFile(__dirname + "/css/styles.css", function (err, data) {
                var headers = {"Content-Type": "text/css"};
                response.writeHead(200, headers);
                response.end(data);
            });
        break;
        
        //main page to load
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
        case "/createUser":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/userCreate.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
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

                    //check userData, based on what it contains preform actions
                    if(userData.button !== 'example'){  //this is for user inputed data
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
                        //check if the user ticked box for different shipping address
                        //if they did the checked value will be yes instead of no
                        if(userData.checked === 'no'){
                            await collectionShip.insertOne(colA); 
                        }
                    }else{  //example for generating a random user
                        var genTitle = '', genFname = '', genSname = '', genMobile = ''
                        const randomTitle = ['Mr', 'Mx', 'Mrs', 'Prof', 'Dr'];
                        genTitle = randomTitle[Math.floor(Math.random() * randomTitle.length)];
                        const randomFname = ['Exe', 'Boby', 'Freddy', 'Richie', 'Adam'];
                        genFname = randomFname[Math.floor(Math.random() * randomFname.length)];
                        const randomSname = ['Downhill', 'Everest', 'Johnson', 'Townsend', 'Heffernan'];
                        genSname = randomSname[Math.floor(Math.random() * randomSname.length)];
                        for(let i = 0; i < 10; i++){
                            genMobile = genMobile + Math.floor(Math.random() * 10);  
                        }
                
                        const newMail = genFname+"."+genSname+"@mail.example";

                        var colU = {
                            title: genTitle,
                            fname: genFname,
                            sname: genSname,
                            mobile: newMail,
                            email: genMobile
                        }
                        
                        let a1="", town="", city="";
                        //generate random address and number
                        const address1Gen = ["River Street","Field View","Cracked Road","Pinefield","Derry Dock","Cherrytree","Example Street","Hup Road"];
                        const num = Math.floor(Math.random() * 3000); 
                        a1 = num + " " + address1Gen[Math.floor(Math.random() * address1Gen.length)];

                        //generate random town
                        const townGen = ["Crooks","Maple","Example","Arachas","Derry","LA","Empty","Hub"];
                        town = townGen[Math.floor(Math.random() * townGen.length)];
                            
                        const cityGen = ["Body","Mody","Ricks","Open","Fence","Higgens","Close","Dimp"];
                        city = cityGen[Math.floor(Math.random() * cityGen.length)];

                        var updated = await collectionUser.insertOne(colU);
                        userID = updated.insertedId;
                        var colA = {
                            customerID: userID,
                            address1: a1,
                            address2: '',
                            town: town,
                            city: city,
                            eircode: ''
                        }
                        await collectionAddress.insertOne(colA);
                        await collectionShip.insertOne(colA);

                        userData = {
                            title: genTitle,
                            fname: genFname,
                            sname: genSname,
                            mobile: newMail,
                            email: genMobile,
                            customerID: userID,
                            address1: a1,
                            address2: '',
                            town: town,
                            city: city,
                            eircode: ''
                        }
                    }
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
            }
        break;

        //case for if user shipping address is different
        //note most of these methods have same comments
        case "/createUser/shippingAddress":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/userShippingAddress.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response
            
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
                    //userID is a variable that is initilized before all of the main code
                    //this allows the code to save _id of user created and then store it 
                    //in the new customerID to maintain the same id to allow all user data
                    //having reference back, deleting users is easier and updating
                    var colA = {
                        customerID: userID,
                        address1: userData.address1,
                        address2: userData.address2,
                        town: userData.town,
                        city: userData.city,
                        eircode: userData.eircode,
                    }
                    
                    await collectionShip.insertOne(colA); //insert new user shipping address
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
                    response.end();
                });
            }
        break;
        
        case "/updateUser":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/updateUser.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
            }
        break;

        case "/updateUser/data":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/updateData.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
            }else if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data",  function (chunk) {
                    requestBody += chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");
                // finished reading the body of the request
                request.on("end", async function () {
                    var userData = {};
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }

                    let query = {};
                    
                    //this checks what data was provided so then can be updated
                    //if this wasnt implemented this would mean that the fields left
                    //blank '' would be also updated therefore data that a user didnt want to update
                    //would be changed i.e fname: 'billy' and if the update query had fname: '' 
                    //simply because user didnt input that field as they didnt want to change the name
                    //this would change billy to blank in the db
                    if(userData.title !== ''){
                        query = {title: userData.title}
                    }
                    if(userData.fname !== ''){
                        query ={fname: userData.fname}
                    }
                    if(userData.sname !== ''){
                        query = { sname: userData.sname}
                    }
                    if(userData.mobile !== ''){
                        query = {mobile: userData.mobile}
                    }
                    if(userData.email !== ''){
                        query = {email: userData.email}
                    }

                    //making an objectId to find the user we want to update
                    const idIn = new ObjectId(userData._id);    
                    const exists = await collectionUser.find({ _id: idIn }).toArray();

                    //id user was found then we can update
                    if(exists.length > 0){
                        await collectionUser.updateOne({_id: idIn}, {$set: query});
                    }else{
                        if(userData.button === 'example'){
                            let genMobile="", genSname="";
                            const randomSname = ['Downhill', 'Everest', 'Johnson', 'Townsend', 'Heffernan'];
                            genSname = randomSname[Math.floor(Math.random() * randomSname.length)];
                            for(let i = 0; i < 10; i++){
                                genMobile = genMobile + Math.floor(Math.random() * 10);  
                            }
                    
                            const newMail = "Example."+genSname+"@mail.example";
                            userData = {
                                sname: genSname,
                                mobile: genMobile,
                                email: newMail
                            }
                            
                            await collectionUser.updateOne({fname: 'Example'}, {$set: userData});
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData._id, null, 2) +
                                "\n"
                            );
                        }
                    }
                    
                    // log the user data to console
                    console.log(
                        "USER DATA ON UPDATE RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end();
                });
            }
        break;

        case "/updateUser/order":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/updateOrder.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
            }else if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data",  function (chunk) {
                    requestBody += chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");
                // finished reading the body of the request
                request.on("end", async function () {
                    var userData = {};
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }

                    //same approach as before, check what fields were inputted
                    //and then determine the field(s) to be updated
                    let query = {};
                    if (userData.manufacturer !== '') {
                        query = {manufacturer: userData.manufacturer};
                    }else if(userData.model !== ''){
                        query = {model: userData.model};
                    }
                    
                    //same approach creating a ObjectId (this is used multiple times throughout the code)
                    const idIn = new ObjectId(userData.customerID);
                    const exists = await collectionOrders.find({ customerID: idIn }).toArray();
                    
                    if(exists.length > 0){
                        await collectionOrders.updateOne({customerID: idIn}, {$set: query});
                    }else{
                        //please note that most examples are hard coded, more detail on the first line of this file
                        if(userData.button === 'example'){
                            const exampleID = new ObjectId('662bf9ba51fb7298e4848beb');
                            const phones = ['XR', '15', '8', '11', '14', '13'];     //possible models being ordered
                            const randomNum = Math.floor(Math.random() * 5);        //pick at random
                            let picked = phones[randomNum];
                            userData = {
                                manufacturer: 'iPhone',
                                model: picked
                            }

                            await collectionOrders.updateOne({customerID: exampleID}, {$set: userData});
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData._id, null, 2) +
                                "\n"
                            );
                        }
                    }
                    
                    // log the user data to console
                    console.log(
                        "USER DATA ON UPDATE RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end();
                });
            }
        break;
        
        //note that updaing address example is set to one customer ID
        //check the user id set to check the database
        case "/updateUser/address":
            if(currentMethod == 'GET'){
                fs.readFile(__dirname + "/html/updateAddress.html", function (err, data) {
                    // get the file and add to data
                    var headers = {
                    // set the appropriate headers
                    "Content-Type": "text/html",
                    };
                    response.writeHead(200, headers);
                    response.end(data); // return the data (index.html)
                }); // as part of the response

                // Handle a POST request;  the user is sending user data via AJAX!
            }else if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data",  function (chunk) {
                    requestBody += chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");
                // finished reading the body of the request
                request.on("end", async function () {
                    var userData = {};
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }

                    //same approach as before
                    let query = {};
                    if (userData.address1 !== '') {
                        query.address1 = userData.address1;
                    }
                    if (userData.address2 !== '') {
                        query.address2 = userData.address2;
                    }
                    if (userData.town !== '') {
                        query.town = userData.town;
                    }
                    if (userData.city !== '') {
                        query.city = userData.city;
                    }
                    if (userData.eircode !== '') {
                        query.eircode = userData.eircode;
                    }
                    //same approach as before
                    const idIn = new ObjectId(userData.customerID);
                    const exists = await collectionAddress.find({ customerID: idIn }).toArray();
                    
                    if(exists.length > 0){
                        await collectionAddress.updateOne({customerID: idIn}, {$set: query});
                    }else{
                        if(userData.button === 'example'){
                            let a1="", town="", city="";

                            //generate random address and number
                            const address1Gen = ["River Street","Field View","Cracked Road","Pinefield","Derry Dock","Cherrytree","Example Street","Hup Road"];
                            const num = Math.floor(Math.random() * 3000); 
                            a1 = num + " " + address1Gen[Math.floor(Math.random() * address1Gen.length)];

                            //generate random town
                            const townGen = ["Crooks","Maple","Example","Arachas","Derry","LA","Empty","Hub"];
                            town = townGen[Math.floor(Math.random() * townGen.length)];
                            
                            const cityGen = ["Body","Mody","Ricks","Open","Fence","Higgens","Close","Dimp"];
                            city = cityGen[Math.floor(Math.random() * cityGen.length)];
                            
                            userData = {
                                address1: a1,
                                town: town,
                                city: city
                            }
                            const idIn = new ObjectId('662aeba58cdf1efda6e2a5a5');
                            await collectionAddress.updateOne({customerID: idIn}, {$set: userData}); 
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData.customerID, null, 2) +
                                "\n"
                            );
                        }
                    }
                    
                    // log the user data to console
                    console.log(
                        "USER DATA ON UPDATE RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end();
                });
            }
        break;

        case "/updateUser/shippingAddress":
            if(currentMethod == 'GET'){
                fs.readFile(__dirname + "/html/updateShippingAddress.html", function (err, data) {
                    // get the file and add to data
                    var headers = {
                    // set the appropriate headers
                    "Content-Type": "text/html",
                    };
                    response.writeHead(200, headers);
                    response.end(data); // return the data (index.html)
                }); // as part of the response

                // Handle a POST request;  the user is sending user data via AJAX!
            }else if (currentMethod === "POST") {
                // read the body of the POST request
                request.on("data",  function (chunk) {
                    requestBody += chunk.toString();
                });

                // determine the POST request Content-type (and log to console)
                // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
                const { headers } = request;
                let ctype = headers["content-type"];
                console.log("RECEIVED Content-Type: " + ctype + "\n");
                // finished reading the body of the request
                request.on("end", async function () {
                    var userData = {};
                    // saving the user from the body to the database
                    if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
                        userData = querystring.parse(requestBody);
                    } else {
                        userData = JSON.parse(requestBody);
                    }
                    //same approach as before for code below
                    const idIn = new ObjectId(userData.customerID);
                    const exists = await collectionShip.find({ customerID: idIn }).toArray();
                    let query = {};
                    if(userData.address1 !== ''){
                        query.address1 = userData.address1;
                    }
                    if(userData.address2 !== ''){
                        query.address2 = userData.address2;
                    }
                    if(userData.town !== ''){
                        query.town = userData.town;
                    }
                    if(userData.city !== ''){
                        query.city = userData.city;
                    }
                    if(userData.eircode !== ''){
                        query.eircode = userData.eircode;
                    }

                    if(exists.length > 0){
                        await collectionShip.updateOne({customerID: idIn}, {$set: query});
                    }else{
                        if(userData.button === 'example'){
                            let a1="", town="", city="";

                            //generate random address and number
                            const address1Gen = ["River Street","Field View","Cracked Road","Pinefield","Derry Dock","Cherrytree","Example Street","Hup Road"];
                            const num = Math.floor(Math.random() * 3000); 
                            a1 = num + " " + address1Gen[Math.floor(Math.random() * address1Gen.length)];

                            //generate random town
                            const townGen = ["Crooks","Maple","Example","Arachas","Derry","LA","Empty","Hub"];
                            town = townGen[Math.floor(Math.random() * townGen.length)];
                            
                            const cityGen = ["Body","Mody","Ricks","Open","Fence","Higgens","Close","Dimp"];
                            city = cityGen[Math.floor(Math.random() * cityGen.length)];
                            
                            userData = {
                                address1: a1,
                                town: town,
                                city: city
                            }
                            const idIn = new ObjectId('662bf9ba51fb7298e4848beb');
                            await collectionShip.updateOne({customerID: idIn}, {$set: userData}); 
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData.customerID, null, 2) +
                                "\n"
                            );
                        }
                    }
                    
                    // log the user data to console
                    console.log(
                        "USER DATA ON UPDATE RECEIVED: \n\n" +
                        JSON.stringify(userData, null, 2) +
                        "\n"
                    );
                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end(
                        /* "User (" +
                        userData.fname +
                        " " +
                        userData.sname +
                        ") data added to the Database!" */
                    );
                });
            }
        break;

        case "/deleteUser":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/deleteUser.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
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
                    const idIn = new ObjectId(userData._id);
                    const user = await collectionUser.find({_id: idIn}).toArray();    //find user(s) from collection
                    if (user.length === 1) {    // if there is only one user
                        //execute deleting from collections
                        const deleteUser = await collectionUser.deleteOne({_id: idIn});
                        const deleteUserA = await collectionAddress.deleteOne({customerID : idIn});
                        const deleteUserS = await collectionShip.deleteOne({customerID : idIn});
                        const deleteUserO = await collectionOrders.deleteOne({customerID : idIn});

                        //log all deletion note if deleted amount : 0  then that means user
                        //didnt have a shipping address could be casued by
                        //testing of each method individually or before a certain method was implemented
                        console.log('Deleted User With ID:', idIn, ' Deleted Amount: ', deleteUser.deletedCount);
                        console.log('Deleted User Address With ID:', idIn,' Deleted Amount: ', deleteUserA.deletedCount);
                        console.log('Deleted User Shipping Address With ID:', idIn,' Deleted Amount: ', deleteUserS.deletedCount);
                        console.log('Deleted User Orders With ID:', idIn,' Deleted Amount: ', deleteUserO.deletedCount);
                    }else{
                        if(userData.button === 'example'){
                            const user = await collectionUser.find({}).toArray();
                            const userID = user[0]._id;
                            const userD = await collectionUser.deleteOne({_id: userID});
                            const userA = await collectionAddress.deleteOne({customerID: userID});
                            const userS = await collectionShip.deleteOne({customerID: userID});
                            const userO = await collectionOrders.deleteOne({customerID: userID});

                            //log all deletion note if deleted amount : 0  then that means user
                            //didnt have a shipping address could be casued by
                            //testing of each method individually or before a certain method was implemented
                            const objToString = userID.toString(); //change id into string
                            console.log('Users Deleted With ID: ',  objToString , ' Deleted Amount: ', userD.deletedCount);
                            console.log('Users Address Deleted With ID: ', objToString, ' Deleted Amount: ', userA.deletedCount);
                            console.log('Users Shippng Address Deleted With ID: ', objToString, ' Deleted Amount: ', userS.deletedCount);
                            console.log('Users Orders With ID: ', objToString, ' Deleted Amount: ', userO.deletedCount);
                        }else if(userData.button == 'all'){
                            const delAllU = await collectionUser.deleteMany({});
                            const delAllA = await collectionAddress.deleteMany({});
                            const delAllS = await collectionShip.deleteMany({});
                            const dellAllO = await collectionOrders.deleteMany({});

                            //add up all deleted to have a total sum of how many were deleted
                            const all = delAllU.deletedCount + delAllA.deletedCount + delAllS.deletedCount + dellAllO.deletedCount;
                            console.log('Database Cleared!', ' Deleted Amount: ', all);
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData.customerID, null, 2) +
                                "\n"
                            );
                        }

                    }

                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end();
                });
            }
        break;
        
        //note example could not work due to a fact that the user got deleted.
        //MOST OF THE EXAMPLES ARE HARD CODED JUST FOR EASE AND THESE WOULD NOT
        //BE INCLUDED IN MAIN APP
        case "/searchUser":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/searchUser.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
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

                    let query = {};
                    if (userData.fname !== '') {
                        query = {
                            fname: userData.fname
                        };
                    }
                    if(userData.sname !== ''){
                        query = {
                            sname: userData.sname
                        };
                    }
                    
                    const user = await collectionUser.find(query).toArray();    //find user(s) from collection
                    if (user.length === 1) {    // if there is only one user
                        console.log('User Found: ', user.length);
                        console.log('User Data: ', user);
                        const userId = user[0]._id; //get user id from user array
                        //newQuery for find()
                        let newQuery = {
                            customerID: userId
                        }
                        //find user address where customerID = _id from user collection
                        const address = await collectionAddress.find(newQuery).toArray();
                        console.log('User Address:', address);
        
                        //find user ship address where customerID = _id from user collection
                        const shippingAddress = await collectionShip.find(newQuery).toArray();
                        console.log('User Shipping Address:', shippingAddress);
        
                        const userOrder = await collectionOrders.find(newQuery).toArray();
                        console.log('User Orders:', userOrder);
                    } else if (user.length > 1) {   //if there is more than one user found
                        console.log('Users Found:', user.length);
        
                        //this makes sure that all users will be logged into console
                        for (let i = 0; i < user.length; i++) {
                            const userId = user[i]._id; //update each user id from found users that matched
        
                            //query for find() based on customer ID
                            let newQuery = {
                                customerID: userId
                            }
                            console.log('User ' + (i+1) + ' With ID: ', userId);
        
                            //search for User with ID
                            const userSearchData = await collectionUser.find({_id: userId}).toArray();
                            console.log('User Data:', userSearchData);
        
                            //search for user based from customerID based off query
                            const address = await collectionAddress.find(newQuery).toArray();
                            console.log('User ' + (i+1) + ' Address:', address);
                            
                            //search for shipping address based from customerID based off query
                            const shippingAddress = await collectionShip.find(newQuery).toArray();
                            console.log('User ' + (i+1) + ' Shipping Address:', shippingAddress);
                        }
                    }else{
                        //HARDCODED
                        if(userData.button === 'example'){
                            //user from 10 users inserted into the db
                            const user = await collectionUser.find({_id: new ObjectId('662bf9ba51fb7298e4848beb')}).toArray();
                            const userID = user[0]._id;
                            const userA = await collectionAddress.find({customerID: userID}).toArray();
                            const userS = await collectionShip.find({customerID: userID}).toArray();
                            const userO = await collectionOrders.find({customerID: userID}).toArray();

                            console.log('User found:', user);
                            console.log('User Address:', userA);
                            console.log('User Shippin Addres:', userS);
                            console.log('User Orders:', userO); 
                        }else if(userData.button == 'all'){
                            const searchAll = await collectionUser.find({}).toArray();
                            const searchCount = await collectionUser.find({}).count();
                            console.log('Users found ',searchCount, ':', searchAll);
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData.customerID, null, 2) +
                                "\n"
                            );
                        }

                    }

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
            }
        break;

        case "/createOrder":
            if(currentMethod == 'GET'){
            fs.readFile(__dirname + "/html/userOrder.html", function (err, data) {
                // get the file and add to data
                var headers = {
                // set the appropriate headers
                "Content-Type": "text/html",
                };
                response.writeHead(200, headers);
                response.end(data); // return the data (index.html)
            }); // as part of the response

            // Handle a POST request;  the user is sending user data via AJAX!
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

                    const idIn = new ObjectId(userData.customerID);
                    const findUser = await collectionUser.find({_id: idIn}).toArray();

                    
                    if (findUser.length > 0) {    //CHECK IF THERE IS A USER WITH SUCH AN ID
                        let query = {
                            customerID: idIn,
                            manufacturer: userData.manufacturer,
                            model: userData.model
                        }
                        
                        await collectionOrders.insertOne(query);
                        console.log(
                            "USER ORDER RECEIVED: \n\n" +
                            JSON.stringify(query, null, 2) +
                            "\n"
                        );
                    }else{
                        if(userData.button === 'example'){
                            const exampleFind = await collectionUser.find({}).toArray();
                            const exampleID = exampleFind[0]._id;
                            const phones = ['XR', '15', '8', '11', '14', '13'];     //possible models being ordered
                            const randomNum = Math.floor(Math.random() * 5);        //pick at random
                            let picked = phones[randomNum];
                            let newQuery = {
                                customerID: exampleID,
                                manufacturer: 'iPhone',
                                model: picked
                            }

                            await collectionOrders.insertOne(newQuery);
                            console.log(
                                "USER ORDER RECEIVED: \n\n" +
                                JSON.stringify(newQuery, null, 2) +
                                "\n"
                            );
                        }else{
                            console.log(
                                "NO USER FOUND WITH ID: \n\n" +
                                JSON.stringify(userData.customerID, null, 2) +
                                "\n"
                            );
                        }

                    }

                    // respond to the user with confirmation message
                    var headers = {
                        "Content-Type": "text/plain",
                    };
                    response.writeHead(200, headers);
                    response.end();
                });
            }
        break;
    }
});

// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
    console.log("AJAX (HTTP) API server running on port: " + port);
});
