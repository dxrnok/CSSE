//OPERATING SYSTEM: WINDOWS 10 PRO
//BROWSER: GOOGLE CHROME 
//Version 124.0.6367.158 (Official Build) (64-bit)

//*ADDITIONAL NOTES*
//for any buttons containing "Random" no inputs are needed
//
const express = require('express');
const app = express();

//both below are middleware used for post methods
//server can then accept or store these in data (object)
app.use(express.json());    
app.use(express.urlencoded({extended: false})); 

app.set('view engine', 'ejs');  //setting view engine for my dynmaic web 
app.use(express.static(__dirname + '/public')); //loading in middelware from /public
//__dirname: path of the directory containing the file executed (i.e. myApp.js).

//Main page for the website
app.get('/', (req, res) => {
    res.render('index');
});

const createRouter = require('./routes/create');  //router for (C) CRUD 
app.use('/create', createRouter);

const searchRouter = require('./routes/search');  //router for (R) CRUD 
app.use('/search', searchRouter);

const updateRouter = require('./routes/update');  //router for (U) CRUD 
app.use('/update', updateRouter);

const deleteRouter = require('./routes/delete');  //router for (D) CRUD 
app.use('/delete', deleteRouter);

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});

//DATABASE
//For my database structure i went for making separate documents for follwoing:
//LandlordDetails, LandlordAddress, TenantDetails, TenantAddress, LandlordTenantContract.
//I made to store common ids from ...Details to ...Address which allows easy finding each tenant/landlord data
//This allowed me to avoid embbeding documents. Easier to navigate through isnt overwhealming

//IMPACT ON CODE DEVELOPMENT
//I made sure to create routes this time. This made it so much easier to read code and find simlpe errors
//I had a major difficulty trying to find code errors in my past assignmnets, the routes way allowed me to 
//develope a more clean and organised code. I added as much comments even to most basic parts just to make sure 
//anyone can understand the code