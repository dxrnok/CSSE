const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const connect = require("./connection/atlas_connect");
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//DECLARING COLLECTIONS
let collectionUser;
let collectionAddress;
let collectionShip;

//CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
const client = new MongoClient(connect.database.url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const dbName = 'CS230';
///CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
async function connection() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        console.log("Successfully Connected To MongoDB!");
        const db = client.db(dbName);
        collectionUser = db.collection("USERS");
        collectionAddress = db.collection("ADDRESS");
        collectionShip = db.collection("SHIPPING");

    } catch(error) {
        // Ensures that the client will close when you finish/error
        console.error(error);
    }
}
connection();

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/index.ejs'));
    res.render('index');
})

app.get('/createUser', (req, res) => {
    //res.sendFile(path.join(__dirname, '/usersCreate.ejs'));
    res.render('usersCreate');
});

app.get('/searchUser', (req, res) => {
    res.render('searchUser');
});

app.get('/createUser/userShippingAddress', (req, res) => {
    //res.sendFile(path.join(__dirname, '/usersCreate.ejs'));
    res.render('shipping');
});

let userID; //storing userID from USER CREATION
app.post('/createUser', async (req, res) => {
    try {
        
        const dataUser = {
            title: req.body.title === 'other' ? "Other (" +req.body.otherInput+")" : req.body.title,
            fname: req.body.fname,
            sname: req.body.sname,
            mobile: req.body.mobile,
            email: req.body.email
        };

        const userData = await collectionUser.insertOne(dataUser);
        console.log("User Data Inserted Successfully:", userData);
        console.log("Adding address...");
    
        userID = userData.insertedId;
        const dataAddress = {
            customerID: userID,
            address1: req.body.address1,
            address2: req.body.address1,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        } 
        const addressData = await collectionAddress.insertOne(dataAddress);
        console.log("Address Inserted Successfully:", addressData);
        if (req.body.ship) {    //check the checkbox if yes redirect
            console.log("Redirecting to Shipping Address...");
            res.redirect('/createUser/userShippingAddress');
            return;
        }else{
            const shipData = await collectionShip.insertOne(dataAddress);
            console.log("Shipping Address Inserted Successfully:", shipData);
        }

        //send a message and redirect to main page
        const script = `
            <script>
                alert('User created successfully!');
                window.location.href = '/';
            </script>
        `;
        console.log("User created successfully!");

        //Successful status and exec script
        res.status(200).send(script);
        
    } catch (error) {
        console.error("Error Creating User: ", error);
        res.status(500).send("Error Creating User");
    }
});

app.post('/createUser/userShippingAddress', async (req, res) => {
    try {
        const dataAddress = {
            customerID: userID,
            address1: req.body.address1,
            address2: req.body.address1,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        } 
        const shipData = await collectionShip.insertOne(dataAddress);
        console.log("User Data Inserted Successfully:", shipData);
        //send a message and redirect to main page
        const script = `
            <script>
                alert('User created successfully!');
                window.location.href = '/';
            </script>
        `;
        console.log("User created successfully!");

        //Successful status and exec script
        res.status(200).send(script);
    } catch (error) {
        console.error("Error Creating User: ", error);
        res.status(500).send("Error Creating User");
    }
});

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});