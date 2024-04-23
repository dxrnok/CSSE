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
    //res.sendFile(path.join(__dirname, '/usersCreate.ejs'));
    res.render('shipping');
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
            console.log('User Data Inserted Successfully:', userData);  //log that insertion went successfully
        
            
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
            console.log('Address Inserted Successfully:', addressData); //log that Address was inserted Successfully
            if (req.body.ship) {    //check if the checkbox if clicked
                console.log('Redirecting to Shipping Address...');  //log that you have been redirected
                res.redirect('/createUser/userShippingAddress');    //redirect onto page to create shipping address
                return;                                             //exit to prevent rest of the code executing
            }else{
                //if ship address is the same as home address then just insert home address into ship
                const shipData = await collectionShip.insertOne(dataAddress);
                console.log('Shipping Address Inserted Successfully:', shipData);
            }

            //send a message and redirect to main page found similar example on stackoverflow to change page and alert
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

            userIds = await collectionUser.find({}).toArray();  //find and store user collection 
                                                                //(couldnt find a working way to store _id for customerID)
            //store 10 user addresses with same customerIDs from collection USERS _ids 
            const usersAddress = [
                { customerID: userIds[0]._id, address1: '221 Fake View Park', town: 'Bikini Bottom', city: 'UnderWater'},
                { customerID: userIds[1]._id, address1: '221 Fake View Park', town: 'Bikini Bottom', city: 'UnderWater'},
                { customerID: userIds[2]._id, address1: '232 Hilton Drivers', town: 'Racing', city: 'Track'},
                { customerID: userIds[3]._id, address1: '2456 Hidden Court', town: 'Hiders Town', city: 'Uptheroad'},
                { customerID: userIds[4]._id, address1: '12 Mirror Park', town: 'LA', city: 'LA'},
                { customerID: userIds[5]._id, address1: '1 Stevens Green Road', town: 'Diners', city: 'NightTown'},
                { customerID: userIds[6]._id, address1: '33 River Cart', town: 'River Dogers', city: 'River Courts'},
                { customerID: userIds[7]._id, address1: '111 Never End Road', town: 'Neverstown', city: 'Villa'},
                { customerID: userIds[8]._id, address1: '344 Bin Road', town: 'French', city: 'Night'},
                { customerID: userIds[9]._id, address1: '5656 One Road', town: 'Kinders', city: 'Germany'}
            ];
            //insert shipping address and home address for users
            const insert10Address = await collectionAddress.insertMany(usersAddress);
            const insert10ShipAddress = await collectionShip.insertMany(usersAddress);

            //log that everything went successfully
            console.log('Users Inserted Successfully:', insert10Users);
            console.log('Addresses Inserted Successfully:', insert10Address);
            console.log('Shipping Addresses Inserted Successfully:', insert10ShipAddress);
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
        console.log('User Data Inserted Successfully:', shipData);
        //send a message and redirect to main page
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
            const user = await collectionUser.find({'fname': 'Xavi'}).toArray();    //user from 10 users inserted into the db
            const script = `
                    <script>
                        alert('User Found Printed in Console!');
                        window.location.href = '/searchUser';
                    </script>
            `;
            res.status(200).send(script);
            console.log('Users found:', user);
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
            //initilize new query for search
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

            
            const user = await collectionUser.find(query).toArray();
            if (user.length === 1) {
                console.log('Users Found: ', user.length);
                console.log('User Data: ', user);
                const userId = user[0]._id;
                let newQuery = {
                    _id: userId
                }
                const address = await collectionAddress.find(newQuery).toArray();
                console.log('User Address:', address);
            
                const shippingAddress = await collectionShip.find(newQuery).toArray();
                console.log('User Shipping Address:', shippingAddress);
            
                const script = `
                    <script>
                        alert('User Found Printed in Console!');
                        window.location.href = '/';
                    </script>
                `;
                res.status(500).send(script);
            } else if (user.length > 1) {
                console.log('Users Found:', user.length);
                for (let i = 0; i < user.length; i++) {
                    const userId = user[i]._id;
                    let newQuery = {
                        customerID: userId
                    }
                    console.log('User ' + (i+1) + ' With ID: ', userId);
                    const userSearchData = await collectionUser.find({_id: userId}).toArray();
                    console.log('User Data:', userSearchData);


                    const address = await collectionAddress.find(newQuery).toArray();
                    console.log('User ' + (i+1) + ' Address:', address);
            
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

app.post('/deleteUser', async (req, res) => {
    try{
        if(req.body.button === 'exampleB'){
            let script = `
                <script>
                    alert('Deleted User Printed To Console!');
                    window.location.href = '/deleteUser';
                </script>
            `;
            let code = 200;
            
            const idIns = await collectionUser.find({}).toArray();
            if(idIns.length > 0){
                const userObj = idIns[0]._id;
                console.log(userObj);
                const deleteUser = await collectionUser.deleteOne({_id: userObj});
                const deleteUserA = await collectionAddress.deleteOne({customerID: userObj});
                const deleteUserS = await collectionShip.deleteOne({customerID: userObj});
                
                const objToString = userObj.toString()
                console.log('Users Deleted With ID: Object(' + objToString +')' , deleteUser);
                console.log('Users Address Deleted With ID: Object(' + objToString +')' , deleteUserA);
                console.log('Users Shippng Address Deleted With ID: Object(' + objToString +')' , deleteUserS);
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
        }else if(req.body.button === 'deleteAllB'){
            await collectionUser.deleteMany({});
            await collectionAddress.deleteMany({});
            await collectionShip.deleteMany({});
            const script = `
                    <script>
                        alert('Deleted All Users!');
                        window.location.href = '/';
                    </script>
            `;
            res.status(200).send(script);
            console.log('Database Cleared!');
        }else{
            const idIn = new ObjectId(req.body.userID);
            if(Object.values(idIn).length > 0){
                console.log(idIn);
                const deleteUser = await collectionUser.deleteOne({_id: idIn});
                const deleteUserA = await collectionAddress.deleteOne({customerID : idIn});
                const deleteUserS = await collectionShip.deleteOne({customerID : idIn});
                console.log('Deleted User With ID:', idIn, deleteUser);
                console.log('Deleted User Address With ID:', idIn, deleteUserA);
                console.log('Deleted User Shipping Address With ID:', idIn, deleteUserS);

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
})

function createObjectId(idString) {
    return ObjectId(idString);
}

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});