//OPERATING SYSTEM: WINDOWS 10 PRO
//BROWSER: GOOGLE CHROME 
//Version 124.0.6367.158 (Official Build) (64-bit)//

//*ADDITIONAL NOTES*
//for any buttons containing "Random" no inputs are needed
//
const express = require('express');
const app = express();
const path = require('path');
const createRouter = require('./routes/create');  //router for (C) CRUD 
const searchRouter = require('./routes/search');  //router for (R) CRUD 
const updateRouter = require('./routes/update');  //router for (U) CRUD 
const deleteRouter = require('./routes/delete');  //router for (D) CRUD 

// Serve static files from the frontend's public directory
app.use(express.static(path.join(__dirname, '../client/public')));
//__dirname: path of the directory containing the file executed (i.e. myApp.js).

// Specify the directory where the views are located
app.set('views', path.join(__dirname, '../client/views'));

app.set('view engine', 'ejs');  //setting view engine for my dynmaic web 


//both below are middleware used for post methods
//server can then accept or store these in data (object)
app.use(express.json());    
app.use(express.urlencoded({extended: false})); 

//Main page for the website
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/create', createRouter);
app.use('/search', searchRouter);
app.use('/update', updateRouter);
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

//80% research was done on https://www.w3schools.com/js/
//other referrences: *NOTE THESE WERE ONLY USED TO GRASP BETTER SOLUTIONS TO CODE*
//SUCH AS EXPORTING SCHEMAS
//https://mongoosejs.com/docs/queries.html
//https://fakerjs.dev/api/faker.html
//https://fakerjs.dev/guide/usage
//https://mongoosejs.com/docs/shared-schemas.html
//https://mongoosejs.com/docs/schematypes.html