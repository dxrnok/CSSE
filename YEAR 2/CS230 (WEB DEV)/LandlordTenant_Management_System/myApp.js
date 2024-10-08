//OPERATING SYSTEM: WINDOWS 10 PRO
//BROWSER: GOOGLE CHROME 
//Version 124.0.6367.158 (Official Build) (64-bit)

//*ADDITIONAL NOTES*
//for any buttons containing "Random" no inputs are needed
//

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const connect = require('./connection/atlas_connect');  //connection uri for atlas
const app = express();

//both below are middleware used for post methods
//server can then accept or store these in data (object)
app.use(express.json());    
app.use(express.urlencoded({extended: false})); 

app.set('view engine', 'ejs');  //setting view engine for my dynmaic web 
app.use(express.static(__dirname + '/public')); //loading in middelware from /public
//__dirname: path of the directory containing the file executed (i.e. myApp.js).

//declaring vars for storing database information later
var collectionTenant;
var collectionLandlord;
var collectionLandlordTenantContract;

//creation of mongoclient with additional mongoclient options
const client = new MongoClient(connect.database.url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const dbName = 'LandlordTenant'; //declaring database connection
//function to connect to MongoDB 
async function connection() {
    try {
        //connect the client to the server
        await client.connect();
        console.log('Successfully Connected To MongoDB!');
        const db = client.db(dbName);
        collectionLandlord = db.collection('LandlordDetails');
        collectionTenant = db.collection('TenantDetails');
        collectionLandlordTenantContract = db.collection('LandlordTenantContract');
        
    } catch(error) {
        // Ensures that the client will close when you finish/error
        console.error(error);
        client.close();
    }
}
connection();

//Main page for the website
app.get('/', (req, res) => {
    res.render('index');
});

const createRouter = require('./routes/create');  //router for (C) CRUD 
app.use('/create', createRouter);

//POST method for landlord creation
app.post('/create/landlord', (req, res) =>{
    try{
        if(req.body.button === 'create'){

        }
    }catch(error){
        console.error('Error Creating Member:', error);
        res.status(500).send('Error Creating Member');
    }
});

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});
