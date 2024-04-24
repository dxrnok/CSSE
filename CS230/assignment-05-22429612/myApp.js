const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const connect = require('./connection/atlas_connect');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set('view engine', 'ejs');  //setting view engine for my dynmaic web (found during research on stack overflow)
app.use(express.static(__dirname + '/public')); //loading in middelware from /public

//DECLARING COLLECTIONS
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

const dbName = 'CS230';
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
connection();   //initilize connection function

//render index.ejs when GET request is made to homepage ('/')
app.get('/', (req, res) => {
    res.render('index');
})

//render usersCreate.ejs when GET request is made to /createUser
app.get('/createUser', (req, res) => {
    res.render('usersCreate');
});

app.get('/userOrder', (req, res) => {
    res.render('userOrder');
});
//render userShippingAddress.ejs when GET request is made to /updateUser/userShippingAddress
app.get('/updateUser/order', (req, res) => {
    res.render('updateOrder');
});


//render searchUser.ejs when GET request is made to /searchUser
app.get('/searchUser', (req, res) => {
    res.render('searchUser');
});

//render deleteUser.ejs when GET request is made to /deleteUser
app.get('/deleteUser', (req, res) => {
    res.render('deleteUser');
});

//render shipping.ejs when GET request is made to /createUser/userShippingAddress
app.get('/createUser/userShippingAddress', (req, res) => {
    res.render('shipping');
});

//render updateUser.ejs when GET request is made to /updateUser
app.get('/updateUser', (req, res) => {
    res.render('updateUser');
});
//render updateData.ejs when GET request is made to /updateUser/userData
app.get('/updateUser/data', (req, res) => {
    res.render('updateData');
});
//render userAddress.ejs when GET request is made to /updateUser/address
app.get('/updateUser/address', (req, res) => {
    res.render('userAddress');
});

//render userShippingAddress.ejs when GET request is made to /updateUser/userShippingAddress
app.get('/updateUser/shippingAddress', (req, res) => {
    res.render('userShippingAddress');
});

let userIds;    //storing userID from USER CREATION

//POST method for user creation
app.post('/createUser', async (req, res) => {
    try{
        if(req.body.button === 'createUser'){   //check button clicked value

            //store all User information provided from web to data
            const dataUser = {
                title: req.body.title === 'other' ? req.body.otherInput : req.body.title,
                fname: req.body.fname,
                sname: req.body.sname,
                mobile: req.body.mobile,
                email: req.body.email
            };

            const userData = await collectionUser.insertOne(dataUser);  //insert data into collection
            console.log('User Data Inserted Successfully:', userData.acknowledged);  //log that insertion went successfully
        
            
            let userID = userData.insertedId;   //store user _id that was just inserted (from mongoDB docs)

            //store all user address info into data
            const dataAddress = {
                customerID: userID,
                address1: req.body.address1,
                address2: req.body.address2,
                town: req.body.town,
                city: req.body.city,
                eircode: req.body.eircode
            };
            const addressData = await collectionAddress.insertOne(dataAddress); //insert data into collection
            console.log('Address Inserted Successfully:', addressData.acknowledged ); //log that Address was inserted Successfully
            if (req.body.ship) {    //check if the checkbox if clicked
                console.log('Redirecting to Shipping Address...');  //log that you have been redirected
                res.redirect('/createUser/userShippingAddress');    //redirect onto page to create shipping address
                return;                                             //exit to prevent rest of the code executing
            }else{
                //if ship address is the same as home address then just insert home address into ship
                const shipData = await collectionShip.insertOne(dataAddress);
                console.log('Shipping Address Inserted Successfully:', shipData.acknowledged );
            }

            const phones = ['XR', '15', '8', '11', '14', '13'];
            const randomNum = Math.floor(Math.random() * 6);
            let picked = phones[randomNum];
        
            const order = await collectionOrders.insertOne({
                customerID: userID,
                manufacturer: 'iPhone',
                model: picked
            })
            console.log('Order Placed Successfully:', order.acknowledged );
            //send a message and redirect to main page found similar example on stackoverflow to change page and alert
            //this format will be used multiple times through out the code so i provided message here
            //they all have the same intention just changed to satisfy part of code
            const script = `
                <script>
                    alert('User created successfully!');
                    window.location.href = '/';
                </script>
            `;
            console.log('User created successfully!');

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            //Store 10 users to data
            const users = [
                { title: 'Ms', fname: 'Emily', sname: 'Randy', mobile: '8893030223', email: 'Emily.Randy@myapp.com'},
                { title: 'Mrs', fname: 'Billy', sname: 'Randy', mobile: '8893030222', email: 'Billy.Randy@myapp.com'},
                { title: 'Dr', fname: 'Daniel', sname: 'Nibbers', mobile: '7453287618', email: 'Daniel.Nibbers@myapp.com'},
                { title: 'Mx', fname: 'Urge', sname: 'Sovolov', mobile: '5833030212', email: 'Urge.RanSovolovdy@myapp.com'},
                { title: 'Miss', fname: 'Ella', sname: 'Mewers', mobile: '2390876435', email: 'Ella.Mewers@myapp.com'},
                { title: 'Prof', fname: 'Xavi', sname: 'Upenec', mobile: '3425667890', email: 'Xavi.Upenec@myapp.com'},
                { title: 'Mr', fname: 'Danny', sname: 'Flyns', mobile: '1234567323', email: 'Danny.Flyns@myapp.com'},
                { title: 'Mr', fname: 'George', sname: 'Sanders', mobile: '5553662134', email: 'George.Sanders@myapp.com'},
                { title: 'Ms', fname: 'Jenny', sname: 'Sewers', mobile: '1234563321', email: 'Jenny.Sewers@myapp.com'},
                { title: 'Mr', fname: 'Billy', sname: 'Johnson', mobile: '1238956748', email: 'Billy.Johnson@myapp.com'}
            ];

            const insert10Users = await collectionUser.insertMany(users);   //insert data into collection

            userIds = insert10Users.insertedIds;    //save all inserted ids 
                                                    //(couldnt find a working way to store _id for customerID)
            //store customerIDs so they match previously inserted into users collection
            const usersAddress = [
                { customerID: userIds['0'], address1: '221 Fake View Park', town: 'Bikini Bottom', city: 'UnderWater'},
                { customerID: userIds['1'], address1: '221 Fake View Park', town: 'Bikini Bottom', city: 'UnderWater'},
                { customerID: userIds['2'], address1: '232 Hilton Drivers', town: 'Racing', city: 'Track'},
                { customerID: userIds['3'], address1: '2456 Hidden Court', town: 'Hiders Town', city: 'Uptheroad'},
                { customerID: userIds['4'], address1: '12 Mirror Park', town: 'LA', city: 'LA'},
                { customerID: userIds['5'], address1: '1 Stevens Green Road', town: 'Diners', city: 'NightTown'},
                { customerID: userIds['6'], address1: '33 River Cart', town: 'River Dogers', city: 'River Courts'},
                { customerID: userIds['7'], address1: '111 Never End Road', town: 'Neverstown', city: 'Villa'},
                { customerID: userIds['8'], address1: '344 Bin Road', town: 'French', city: 'Night'},
                { customerID: userIds['9'], address1: '5656 One Road', town: 'Kinders', city: 'Germany'}
            ];
            //insert shipping address and home address for users
            const insert10Address = await collectionAddress.insertMany(usersAddress);
            const insert10ShipAddress = await collectionShip.insertMany(usersAddress);

            const userOrders = [
                { customerID: userIds['0'], manufacturer: 'iPhone', model: 'XR'},
                { customerID: userIds['1'], manufacturer: 'iPhone', model: '11'},
                { customerID: userIds['2'], manufacturer: 'iPhone', model: '15'},
                { customerID: userIds['3'], manufacturer: 'iPhone', model: '14'},
                { customerID: userIds['4'], manufacturer: 'iPhone', model: '8'},
                { customerID: userIds['5'], manufacturer: 'iPhone', model: '8'},
                { customerID: userIds['6'], manufacturer: 'iPhone', model: '14'},
                { customerID: userIds['7'], manufacturer: 'iPhone', model: '14'},
                { customerID: userIds['8'], manufacturer: 'iPhone', model: 'XR'},
                { customerID: userIds['9'], manufacturer: 'iPhone', model: '11'}
            ];
            const insert10Ordres = await collectionOrders.insertMany(userOrders);
            
            //log that everything went successfully
            console.log('Users Inserted Successfully:', insert10Users.acknowledged );
            console.log('Addresses Inserted Successfully:', insert10Address.acknowledged );
            console.log('Shipping Addresses Inserted Successfully:', insert10ShipAddress.acknowledged );
            console.log('User Orders Inserted Successfullt:', insert10Ordres.acknowledged );

            //clear userids to prevent file from getting too large
            //and this will make sure that new entrys are added for new users
            if(userIds.length > 0){
                userIds.length = 0
            }
            
            const script = `
            <script>
                alert('User created successfully!');
                window.location.href = '/';
            </script>
            `;
            console.log('User created successfully!');

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Creating User: ', error);
        res.status(500).send('Error Creating User');
    }
});

//POST method for user shipping address creation
app.post('/createUser/userShippingAddress', async (req, res) => {
    try{
        //store data from web
        const dataAddress = {
            customerID: userID,
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        } 
        //insert data into collection and log that it went successfully
        const shipData = await collectionShip.insertOne(dataAddress);
        console.log('User Data Inserted Successfully:', shipData.acknowledged );

        const script = `
            <script>
                alert('User created successfully!');
                window.location.href = '/';
            </script>
        `;
        console.log('User created successfully!');

        //Successful status and exec script
        res.status(200).send(script);
    }catch(error){
        console.error('Error Creating User: ', error);
        res.status(500).send('Error Creating User');
    }
});


//POST method for searching users
app.post('/searchUser', async (req, res) => {
    try{
        if(req.body.button === 'exampleB'){ //check button value
            const user = await collectionUser.find({'fname': 'upsalala'}).toArray();    //user from 10 users inserted into the db
            const userID = user[0]._id;
            const userA = await collectionAddress.find({customerID: userID}).toArray();
            const userS = await collectionShip.find({customerID: userID}).toArray();
            const userO = await collectionOrders.find({customerID: userID}).toArray();
            const script = `
                    <script>
                        alert('User Found Printed in Console!');
                        window.location.href = '/searchUser';
                    </script>
            `;
            res.status(200).send(script);
            console.log('Users found:', user);
            console.log('Users Address:', userA);
            console.log('Users Shippin Addres:', userS);
            console.log('Users Orders:', userO);
        }else if(req.body.button === 'searchAllB'){ //check button value
            //i didnt print any user addresses or shipping addresses due to posssibility of having too much users.
            //you can search all users and then input their _id without ObjectId just what is in '', this will print user addresses
            const user = await collectionUser.find({}).toArray(); //find all users from User collection
            const script = `
                    <script>
                        alert('Printed All Users to DB!');
                        window.location.href = '/searchUser';
                    </script>
            `;
            res.status(200).send(script);
            console.log('Users found:', user);
        }else{
            //store from web
            const userData = {
                fname: req.body.fname,
                sname: req.body.sname,
            }
            //initilize new query for search based on input from web
            let query = {};
            if (userData.fname && userData.sname) {
                query = {
                    fname: userData.fname,
                    sname: userData.sname
                };
            }else if(userData.fname){
                query = {
                    fname: userData.fname
                };
            }else{
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
            
                const script = `
                    <script>
                        alert('User Found Printed in Console!');
                        window.location.href = '/';
                    </script>
                `;
                res.status(200).send(script);
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
                
                const script = `
                    <script>
                        alert('User Found Printed in Console!');
                        window.location.href = '/searchUser';
                    </script>
                `;
                res.status(500).send(script);
            }else{
                const script = `
                    <script>
                        alert('No User Found!');
                        window.location.href = '/searchUser';
                    </script>
                `;
                console.log('No User Found');
                res.status(500).send(script);
            }
        }
    }catch(error){
        console.error('Error Searching User: ', error);
        res.status(500).send('Error Searching User');
    }
});

app.post('/userOrder', async (req, res) => {
    try{
        if(req.body.button === 'exampleB'){
            let script = `
                <script>
                    alert('Order Printed To Console!');
                    window.location.href = '/';
                </script>
            `;
            let code = 200; //used to for sending successful/error message in web
            
            const idIns = await collectionUser.find({}).toArray();  //find ids from database

            if(idIns.length > 0){   //check if any there id was found 
                const userObj = idIns[0]._id;   //store id
                const phones = ['XR', '15', '8', '11', '14', '13'];     //possible models being ordered
                const randomNum = Math.floor(Math.random() * 5);        //pick at random
                let picked = phones[randomNum];                         

                const order = {
                    customerID: userObj,
                    manufacturer: 'iPhone', //HARD CODED BECAUSE I INPUTED ONLY ONE MANUFACTURER
                                            //if you want user input allowed change iPhone to req.body.manufacturer
                    model: picked           //store the random phone picked
                }
                //execution of deleting from databases when id is mathced
                const userOrder = await collectionUser.insertOne(order);
                
                console.log('Placed Order For User: ', userOrder.acknowledged);
            }else{
                console.log("There Are No Users In Database");
                script = `
                    <script>
                        alert('No Users Found In Database!');
                        window.location.href = '/deleteUser';
                    </script>
                `;
                code = 500;
                //res.status(500).send(script);
            }
            res.status(code).send(script);
        }else{
            const idIn = new ObjectId(req.body.userID);
            const userData = {
                customerID: idIn,
                manufacturer: req.body.manufacturer,
                model: req.body.model
            }

            const userOrder = await collectionOrders.insertOne(userData);    //find user(s) from collection
            console.log('Placed Order For User: ', userOrder.acknowledged);
            let script = `
                <script>
                    alert('Order Printed To Console!');
                    window.location.href = '/';
                </script>
            `;
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Placing Order: ', error);
        res.status(500).send('Error Placing Order');
    }
});

//POST method for deletion of users
app.post('/deleteUser', async (req, res) => {
    try{
        if(req.body.button === 'exampleB'){ //check if button clicked value 
            let script = `
                <script>
                    alert('Deleted User Printed To Console!');
                    window.location.href = '/deleteUser';
                </script>
            `;
            let code = 200; //used to for sending successful/error message in web
            
            const idIns = await collectionUser.find({}).toArray();  //find ids from database

            if(idIns.length > 0){   //check if any there id was found 
                const userObj = idIns[0]._id;   //store id
                
                //execution of deleting from databases when id is mathced
                const deleteUser = await collectionUser.deleteOne({_id: userObj});
                const deleteUserA = await collectionAddress.deleteOne({customerID: userObj});
                const deleteUserS = await collectionShip.deleteOne({customerID: userObj});
                const deleteUserO = await collectionOrders.deleteOne({customerID: userObj});
                
                const objToString = userObj.toString(); //change id into string
                console.log('Users Deleted With ID: ',  objToString , ' Deleted Amount: ', deleteUser.deletedCount );
                console.log('Users Address Deleted With ID: ', objToString, ' Deleted Amount: ', deleteUserA.deletedCount );
                console.log('Users Shippng Address Deleted With ID: ', objToString, ' Deleted Amount: ', deleteUserS.deletedCount );
                console.log('Users Orders With ID: ', objToString, ' Deleted Amount: ', deleteUserO.deletedCount );
            }else{
                console.log("There Are No Users In Database");
                script = `
                    <script>
                        alert('No Users Found In Database!');
                        window.location.href = '/deleteUser';
                    </script>
                `;
                code = 500;
                //res.status(500).send(script);
            }
            res.status(code).send(script);
        }else if(req.body.button === 'deleteAllB'){ //check button value (this is used to delete ALL user+data from collections)
            const users = await collectionUser.deleteMany({});
            const address = await collectionAddress.deleteMany({});
            const ship = await collectionShip.deleteMany({});
            const orders = await collectionOrders.deleteMany({});

            const all = users.deletedCount + address.deletedCount + ship.deletedCount + orders.deletedCount;
            const script = `
                    <script>
                        alert('Deleted All Users!');
                        window.location.href = '/';
                    </script>
            `;
            res.status(200).send(script);
            console.log('Database Cleared!', ' Deleted Amount: ', all);
        }else{
            const idIn = new ObjectId(req.body.userID); //store id inserted from web into mongoDB new ObjectId
            if(Object.values(idIn).length > 0){ //check if id was provided by user
                //execute deleting from collections
                const deleteUser = await collectionUser.deleteOne({_id: idIn});
                const deleteUserA = await collectionAddress.deleteOne({customerID : idIn});
                const deleteUserS = await collectionShip.deleteOne({customerID : idIn});
                const deleteUserO = await collectionOrders.deleteOne({customerID : idIn});

                //log all deletion
                console.log('Deleted User With ID:', idIn, ' Deleted Amount: ', deleteUser.deletedCount);
                console.log('Deleted User Address With ID:', idIn,' Deleted Amount: ', deleteUserA.deletedCount);
                console.log('Deleted User Shipping Address With ID:', idIn,' Deleted Amount: ', deleteUserS.deletedCount);
                console.log('Deleted User Orders With ID:', idIn,' Deleted Amount: ', deleteUserO.deletedCount);

                const script = `
                    <script>
                        alert('Deleted User Printed In Console!');
                        window.location.href = '/deleteUser';
                    </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No User Found With ID!');
                        window.location.href = '/deleteUser';
                    </script>
                `;
                console.log('No User Found');
                res.status(500).send(script);
            }
        }
    }catch(error){
        console.error('Error Deleting User: ', error);
        res.status(500).send('Error Deleting User');
    }
});

app.post('/updateUser/data', async (req, res) => {
    try{
        if(req.body.button === 'updateData'){
            const id = req.body.userID;
            const idIn = new ObjectId(req.body.userID);
            const userFind = await collectionUser.find({_id: idIn}).toArray()
        
            if(userFind.length > 0){

                //set all inputs to seperate consts
                const t = req.body.title;
                const fn = req.body.fname;
                const sn = req.body.sname;
                const mo = req.body.mobile;
                const em = req.body.email;
                const updateQueryData = {};

                //if input is not empty place it into query
                if(t !== ''){
                    updateQueryData.title = t;
                }
                if(fn !== ''){
                    updateQueryData.fname = fn;
                }
                if(sn !== ''){
                    updateQueryData.sname = sn;
                }
                if(mo !== ''){
                    updateQueryData.mobile = mo;
                }
                if(em !== ''){
                    updateQueryData.email = em;
                }

                //update users data
                const userUpdate = await collectionUser.updateOne({_id: idIn}, {$set: updateQueryData});
                console.log('Updated User Data: ' , userUpdate.modifiedCount);
    
                const script = `
                <script>
                    alert('Deleted User Printed In Console!');
                    window.location.href = '/';
                </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No User Found');
                        window.location.href = '/updateUser/userData';
                    </script>
                `;
                console.log('No User Found with ID: ', id);
                res.status(500).send(script);
            }
        }else{
            //random phone number generation
            let numberR = '';
            for(let i = 0; i < 10; i++){
                numberR = numberR + Math.floor(Math.random() * 10);  
            }
            //updating users
            const userMail = await collectionUser.updateOne({fname: 'James'}, {$set: {email: 'james.randers@mail.upsa'}});
            const userNO = await collectionUser.updateOne({fname: 'James'}, {$set: {mobile: numberR}});
            const userSN = await collectionUser.updateOne({fname: 'James'}, {$set: {sname: 'McGee'}});
            console.log('Updated User Mail: ' , userMail.modifiedCount);    //this will work only once since unless changed ^^
            console.log('Updated User Number: ' , userNO.modifiedCount);    //will generate random numbers
            console.log('Updated User Surname: ' , userSN.modifiedCount);   //same as first update ^^
            const script = `
            <script>
                alert('Updated User Printed In Console!');
                window.location.href = '/';
            </script>
            `;
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating User: ', error);
        res.status(500).send('Error Updating User');
    }

});

app.post('/updateUser/address', async (req, res) => {
    try{
        if(req.body.button === 'updateAddress'){
            const id = req.body.userID;
            const idIn = new ObjectId(req.body.userID);
            const userFind = await collectionUser.find({_id: idIn}).toArray()
        
            if(userFind.length > 0){
                //here is a similar approach to last update method (app.post(/updateUser/data)
                //set all inputs to seperate consts
                const a1 = req.body.address1;
                const a2 = req.body.address2;
                const ct = req.body.town;
                const c = req.body.city;
                const e = req.body.eircode;
                const updateQueryData = {};

                //if input is not empty place it into query
                if(a1 !== ''){
                    updateQueryData.address1 = a1;
                }
                if(a2 !== ''){
                    updateQueryData.address2 = a2;
                }
                if(ct !== ''){
                    updateQueryData.town = ct;
                }
                if(c !== ''){
                    updateQueryData.city = c;
                }
                if(e !== ''){
                    updateQueryData.eircode = e;
                }

                //update users data
                const userUpdate = await collectionAddress.updateOne({customerID: idIn}, {$set: updateQueryData});
                console.log('Updated User : ', userUpdate.acknowledged);
    
                const script = `
                <script>
                    alert('Deleted User Printed In Console!');
                    window.location.href = '/';
                </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No User Found');
                        window.location.href = '/updateUser/userData';
                    </script>
                `;
                console.log('No User Found with ID: ', id);
                res.status(500).send(script);
            }
        }else{
            //same approach as last update method (app.post(/updateUser/data)
            const findUser = await collectionUser.find({fname: 'James'}).toArray();
            const id = userID = findUser[0]._id;
            const userAddress1 = await collectionAddress.updateOne({customerID: id}, {$set: {address1: 'Maynooth Street'}});
            const userA2 = await collectionAddress.updateOne({customerID: id}, {$set: {address2: 'River Side'}});
            const userE = await collectionAddress.updateOne({customerID: id}, {$set: {eircode: 'XYZ 1123'}});
            console.log('Updated User Address1: ' , userAddress1.acknowledged);
            console.log('Updated User Address2: ' , userA2.acknowledged);
            console.log('Updated User Eircode: ' , userE.acknowledged);
            const script = `
            <script>
                alert('Deleted User Printed In Console!');
                window.location.href = '/';
            </script>
            `;
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating User: ', error);
        res.status(500).send('Error Updating User');
    }
});

//similar approach used from last method (/updateUser/address)
app.post('/updateUser/shippingAddress', async (req, res) => {
    try{
        if(req.body.button === 'updateAddress'){
            const id = req.body.userID;
            const idIn = new ObjectId(req.body.userID);
            const userFind = await collectionUser.find({_id: idIn}).toArray()
        
            if(userFind.length > 0){
                //set all inputs to seperate consts
                const a1 = req.body.address1;
                const a2 = req.body.address2;
                const ct = req.body.town;
                const c = req.body.city;
                const e = req.body.eircode;
                const updateQueryData = {};

                //if input is not empty place it into query
                if(a1 !== ''){
                    updateQueryData.address1 = a1;
                }
                if(a2 !== ''){
                    updateQueryData.address2 = a2;
                }
                if(ct !== ''){
                    updateQueryData.town = ct;
                }
                if(c !== ''){
                    updateQueryData.city = c;
                }
                if(e !== ''){
                    updateQueryData.eircode = e;
                }

                //update users data
                const userUpdate = await collectionShip.updateOne({customerID: idIn}, {$set: updateQueryData});
                console.log('Updated User Address: ', userUpdate.acknowledged);
    
                const script = `
                <script>
                    alert('Updated Address Printed In Console!');
                    window.location.href = '/';
                </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No User Found');
                        window.location.href = '/updateUser/shippingAddress';
                    </script>
                `;
                console.log('No User Found with ID: ', id);
                res.status(500).send(script);
            }
        }else{
            const findUser = await collectionUser.find({fname: 'James'}).toArray();
            const id = userID = findUser[0]._id;
            const userAddress1 = await collectionShip.updateOne({customerID: id}, {$set: {address1: 'Maynooth Street'}});
            const userA2 = await collectionShip.updateOne({customerID: id}, {$set: {address2: 'River Side'}});
            const userE = await collectionShip.updateOne({customerID: id}, {$set: {eircode: 'XYZ 1123'}});
            console.log('Updated User Address1: ' , userAddress1.acknowledged);
            console.log('Updated User Address2: ' , userA2.acknowledged);
            console.log('Updated User Eircode: ' , userE.acknowledged);
            const script = `
            <script>
                alert('Deleted User Printed In Console!');
                window.location.href = '/';
            </script>
            `;
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating User: ', error);
        res.status(500).send('Error Updating User');
    }
});

//similar approach as method app.post(/updateUser/shippinAddress)
app.post('/updateUser/order', async (req, res) => {
    try{
        if(req.body.button === 'updateOrder'){
            const id = req.body.userID;
            const idIn = new ObjectId(req.body.userID);
            const userFind = await collectionUser.find({_id: idIn}).toArray()
        
            if(userFind.length > 0){
                //set all inputs to seperate consts
                const manu = req.body.manufacturer;
                const model = req.body.model;
                const updateQueryData = {};

                //if input is not empty place it into query
                if(a1 !== ''){
                    updateQueryData.manufacturer = manu;
                }
                if(a2 !== ''){
                    updateQueryData.model = model;
                }

                //update users data
                const userUpdate = await collectionOrders.updateOne({customerID: idIn}, {$set: updateQueryData});
                console.log('Updated User Order : ', userUpdate.acknowledged);

                const script = `
                <script>
                    alert('Update Order Printed In Console!');
                    window.location.href = '/';
                </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No User Found');
                        window.location.href = '/updateUser/order';
                    </script>
                `;
                console.log('No User Found with ID: ', id);
                res.status(500).send(script);
            }
        }else{
            const findUser = await collectionUser.find({fname: 'James'}).toArray();
            const id = userID = findUser[0]._id;
            const phones = ['XR', '15', '8', '11', '14', '13'];
            const randomNum = Math.floor(Math.random() * 6);
            let picked = phones[randomNum];
            const userM = await collectionOrders.updateOne({customerID: id}, {$set: {model: picked}});
            console.log('Updated User Order Model: ' , userM.acknowledged);
            const script = `
            <script>
                alert('Deleted User Printed In Console!');
                window.location.href = '/';
            </script>
            `;
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating User: ', error);
        res.status(500).send('Error Updating User');
    }
});

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});