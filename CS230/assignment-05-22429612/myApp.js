const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const connect = require('./connection/atlas_connect');
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

app.get('/deleteUser', (req, res) => {
    res.render('deleteUser');
});

app.get('/createUser/userShippingAddress', (req, res) => {
    //res.sendFile(path.join(__dirname, '/usersCreate.ejs'));
    res.render('shipping');
});

let userID; //storing userID from USER CREATION
app.post('/createUser', async (req, res) => {
    try{
        if(req.body.button === 'createUser'){
            const dataUser = {
                title: req.body.title === 'other' ? req.body.otherInput : req.body.title,
                fname: req.body.fname,
                sname: req.body.sname,
                mobile: req.body.mobile,
                email: req.body.email
            };

            const userData = await collectionUser.insertOne(dataUser);
            console.log('User Data Inserted Successfully:', userData);
            console.log('Adding address...');
            console.log(req.body);
        
            userID = userData.insertedId;
            const dataAddress = {
                customerID: userID,
                address1: req.body.address1,
                address2: req.body.address2,
                town: req.body.town,
                city: req.body.city,
                eircode: req.body.eircode
            } 
            const addressData = await collectionAddress.insertOne(dataAddress);
            console.log('Address Inserted Successfully:', addressData);
            if (req.body.ship) {    //check the checkbox if yes redirect
                console.log('Redirecting to Shipping Address...');
                res.redirect('/createUser/userShippingAddress');
                return;
            }else{
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
            const users = [
                { _id: 1, title: 'Mrs', fname: 'Billy', sname: 'Randy', mobile: '8893030222', email: 'Billy.Randy@myapp.com'},
                { _id: 2, title: 'Ms', fname: 'Emily', sname: 'Randy', mobile: '8893030223', email: 'Emily.Randy@myapp.com'},
                { _id: 3, title: 'Mx', fname: 'Urge', sname: 'Sovolov', mobile: '5833030212', email: 'Urge.RanSovolovdy@myapp.com'},
                { _id: 4, title: 'Dr', fname: 'Daniel', sname: 'Nibbers', mobile: '7453287618', email: 'Daniel.Nibbers@myapp.com'},
                { _id: 5, title: 'Miss', fname: 'Ella', sname: 'Mewers', mobile: '2390876435', email: 'Ella.Mewers@myapp.com'},
                { _id: 6, title: 'Prof', fname: 'Xavi', sname: 'Upenec', mobile: '3425667890', email: 'Xavi.Upenec@myapp.com'},
                { _id: 7, title: 'Mr', fname: 'Danny', sname: 'Flyns', mobile: '1234567323', email: 'Danny.Flyns@myapp.com'},
                { _id: 8, title: 'Mr', fname: 'George', sname: 'Sanders', mobile: '5553662134', email: 'George.Sanders@myapp.com'},
                { _id: 9, title: 'Ms', fname: 'Jenny', sname: 'Sewers', mobile: '1234563321', email: 'Jenny.Sewers@myapp.com'},
                { _id: 10, title: 'Mr', fname: 'Billy', sname: 'Johnson', mobile: '1238956748', email: 'Billy.Johnson@myapp.com'}
            ];
            const insert10Users = await collectionUser.insertMany(users);
            const usersAddress = [
                { _id: 1, customerID: 1, address1: '221 Fake View Park', town: 'Bikini Bottom', city: 'UnderWater'},
                { _id: 2, customerID: 2, address1: '221 Fake View Park', town: 'Bikini Bottom', city: 'UnderWater'},
                { _id: 3, customerID: 3, address1: '232 Hilton Drivers', town: 'Racing', city: 'Track'},
                { _id: 4, customerID: 4, address1: '2456 Hidden Court', town: 'Hiders Town', city: 'Uptheroad'},
                { _id: 5, customerID: 5, address1: '12 Mirror Park', town: 'LA', city: 'LA'},
                { _id: 6, customerID: 6, address1: '1 Stevens Green Road', town: 'Diners', city: 'NightTown'},
                { _id: 7, customerID: 7, address1: '33 River Cart', town: 'River Dogers', city: 'River Courts'},
                { _id: 8, customerID: 8, address1: '111 Never End Road', town: 'Neverstown', city: 'Villa'},
                { _id: 9, customerID: 9, address1: '344 Bin Road', town: 'French', city: 'Night'},
                { _id: 10, customerID: 10, address1: '5656 One Road', town: 'Kinders', city: 'Germany'}
            ];
            const insert10Address = await collectionAddress.insertMany(usersAddress);
            const insert10ShipAddress = await collectionShip.insertMany(usersAddress);
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

app.post('/createUser/userShippingAddress', async (req, res) => {
    try{
        const dataAddress = {
            customerID: userID,
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            city: req.body.city,
            eircode: req.body.eircode
        } 
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

app.post('/searchUser', async (req, res) => {
    try{
        if(req.body.button === 'exampleB'){
            const user = await collectionUser.find({'fname': 'Xavi'}).toArray();
            const script = `
                    <script>
                        alert('User Found Printed in Console!');
                        window.location.href = '/searchUser';
                    </script>
            `;
            res.status(500).send(script);
            console.log('Users found:', user);
        }else if(req.body.button === 'searchAllB'){
            const user = await collectionUser.find({}).toArray();
            const script = `
                    <script>
                        alert('Printed All Users to DB!');
                        window.location.href = '/searchUser';
                    </script>
            `;
            res.status(500).send(script);
            console.log('Users found:', user);
        }else{
            const userData = {
                //title: req.body.title === 'other' ? req.body.otherInput : req.body.title,
                fname: req.body.fname,
                sname: req.body.sname,
                //address1: req.body.address1,
                //address2: req.body.address2,
                //town: req.body.town,
                //city: req.body.city,
                //eircode: req.body.eircode
            }
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
                        _id: userId
                    }
                    console.log('User ' + (i+1) + ' :', user[i]);
                    const address = await collectionAddress.find(newQuery).toArray();
                    console.log('User '+ (i+1) +  ' Address:', address);
            
                    const shippingAddress = await collectionShip.find(newQuery).toArray();
                    console.log('User '+ (i+1) +  ' Shipping Address:', shippingAddress);
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
    let userId;
    try{
        if(req.body.button === 'exampleB'){
            const deleteUser = await collectionUser.deleteOne({_id: 6});
            const script = `
                <script>
                    alert('Deleted User Printed To Console!');
                    window.location.href = '/deleteUser';
                </script>
            `;
            res.status(500).send(script);
            console.log('Users Deleted With ID 6', deleteUser);
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
            const userId = req.body.userID; // Extract the userID from request body
            
            if (userId) {
                const deleteUser = await collectionUser.deleteOne({_id : userId});
                const deleteUserA = await collectionAddress.deleteOne({customerID : userId});
                const deleteUserS = await collectionShip.deleteOne({customerID : userId});
                console.log('Deleted User With ID:', userId, deleteUser);
                console.log('Deleted User Address With ID:', userId, deleteUserA);
                console.log('Deleted User Shipping Address With ID:', userId, deleteUserS);

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

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});