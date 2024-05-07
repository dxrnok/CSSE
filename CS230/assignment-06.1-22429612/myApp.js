const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const connect = require('./connection/atlas_connect');  //connection uri for atlas
const app = express();

//both below are middleware used for post methods
//server can then accept or store these in data (object)
app.use(express.json());    
app.use(express.urlencoded({extended: false})); 

app.set('view engine', 'ejs');  //setting view engine for my dynmaic web 
                                //(found during research on stack overflow)
app.use(express.static(__dirname + '/public')); //loading in middelware from /public
//__dirname: path of the directory containing the file executed (i.e. myApp.js).

//DECLARING COLLECTIONS
let collectionMember;
let collectionClass;
let collectionMemberClass;

//CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
const client = new MongoClient(connect.database.url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
let newId = 1, gymClassId = 1;
const dbName = 'CS230-06-UPDATED';
///CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
async function connection() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        console.log('Successfully Connected To MongoDB!');
        const db = client.db(dbName);
        collectionMember = db.collection('members');
        collectionClass = db.collection('class');
        collectionMemberClass = db.collection('member-class-info');
        
        var findLastID = await collectionMember.find({ID: newId}).toArray();
        var findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
        while(findLastID.length > 0){
            newId++;
            findLastID = await collectionMember.find({ID: newId}).toArray();
        }
        while(findLastClassID.length > 0){
            gymClassId++;
            findLastClassID = await collectionMember.find({ID: gymClassId}).toArray();
        }
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

//render a page to select what you want to create in database
app.get('/create', (req, res) => {
    res.render('createPage');
});

//methods to render ejs files for (C) from CRUD /create/...
app.get('/create/member', (req, res) => {
    res.render('createMember');
});

app.get('/create/gymClass', (req, res) => {
    res.render('createGymClass');
});

app.get('/create/classMember', (req, res) => {
    res.render('addMemberToClass');
});

app.get('/create/classMemberRedirected', (req, res) => {
    res.render('addMemberToClassOnRedirect');
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
    res.render('updateShippingAddress');
});

//POST method for member creation
app.post('/create/member', async (req, res) => {
    try{
        if(req.body.button === 'createUser'){   //check button clicked value
                                                //lines with req.body use the middleware stated at line 7,8
            const checkPremium = req.body.premium === 'true';

            const dataUser = {
                _id: newId,
                title: req.body.title === 'other' ? req.body.otherInput : req.body.title,
                fname: req.body.fname,
                sname: req.body.sname,
                email: req.body.email,
                premium: checkPremium
            };

            const userData = await collectionMember.insertOne(dataUser);  //insert data into collection
            console.log('Member Data Inserted Successfully:', userData.acknowledged);  //log that insertion went successfully

            //send a message and redirect to main page found similar example on stackoverflow to change page and alert
            //this format will be used multiple times through out the code so i provided message here
            //they all have the same intention just changed to satisfy part of code
            console.log('Redirecting to choose gym classes');
            const script = `
                <script>
                    alert('User created successfully!');
                    window.location.href = '/create/classMemberRedirected';
                </script>
            `;
            console.log('User and Gym Classes Created Successfully!');

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            var findLastID = await collectionMember.find({ID: newId}).toArray();
            while(findLastID){
                newId++;
            }
            var genTitle = '', genFname = '', genSname = '', genPrem = false;
            const randomTitle = ['Mr', 'Mx', 'Mrs', 'Prof', 'Dr'];
            genTitle = randomTitle[Math.floor(Math.random() * randomTitle.length)];
            const randomFname = ['Exe', 'Boby', 'Freddy', 'Richie', 'Adam'];
            genFname = randomFname[Math.floor(Math.random() * randomFname.length)];
            const randomSname = ['Downhill', 'Everest', 'Johnson', 'Townsend', 'Heffernan'];
            genSname = randomSname[Math.floor(Math.random() * randomSname.length)];
            const booleanArr = [true, false];
            const newMail = genFname+'.'+genSname+'@mail.example';
            genPrem = booleanArr[Math.floor(Math.random() * booleanArr.length)];

            var memberData = {
                _id: newId,
                title: genTitle,
                fname: genFname,
                sname: genSname,
                email: newMail,
                premium: genPrem
            }   

            const insertedExample = await collectionMember.insertOne(memberData);  //insert data into collection

            var genClassID = 0;
            var insertedGymClass;
            for(let i = 0; i < 3; i++){
                genClassID = Math.floor(Math.random() * gymClassId)+1;
                insertedGymClass = await collectionMemberClass.insertOne({userID: newId, classID: genClassID});
                console.log('Gym Class Inserted Successfully:', insertedGymClass.acknowledged);
            }
            
            //log that everything went successfully
            console.log('Member Inserted Successfully:', insertedExample.acknowledged);
            
            const script = `
            <script>
                alert('Check Console!');
                window.location.href = '/';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Creating Member:', error);
        res.status(500).send('Error Creating Member');
    }
});

//POST method for user shipping address creation
app.post('/create/classMemberRedirected', async (req, res) => {
    try{
        const classData = {
            userID: newId,
            classID: req.body.classID
        } 

        var classIDArray = classData.classID.split(',');
        var classArray = []
        var classFound = false, notFoundID = 0;
        for (let i = 0; i < classIDArray.length; i++) {
            var classIDsToInt = parseInt(classIDArray[i].trim());
            classArray.push(classIDsToInt);
            var findClass = await collectionClass.find({ID: classIDsToInt}).toArray()
            if(findClass.length > 0){
                classFound = true;
            }else{
                classFound = false;
                notFoundID = classIDsToInt;
                break;
            }
        }
        var findMember = await collectionMember.find({ID: classData.userID}).toArray();
        if(findMember.length > 0){
            console.log('Member with ID', classData.userID, 'was found!');
            if(classFound){
                console.log('Gym Class with ID(s)', classData.classID, 'was found!');
                    var createGymClasses = await collectionMemberClass.insert({userID: newId, classID: classArray});
                    for(let i = 0; i < classArray.length; i++){
                        var findClass = await collectionClass.findOne({ID: classArray[i]});
                        findClass.members++;
                        await collectionClass.updateOne({ID: classArray}, {$set: {members: findClass.members}})
                    }
                    console.log('Member Class with ID', classArray, 'Inserted Successfully', createGymClasses.acknowledged);
            }else{
                console.log('Gym Class with ID ', notFoundID, ' was NOT found!');
                const notFound = `
                    <script>
                        alert('GYM CLASS ID NOT FOUND!');
                        window.location.href = '/create/classMember';
                    </script>
                `;
                res.status(500).send(notFound);
                return
            }
        }else{
            const notFound = `
                    <script>
                        alert('MEMBER ID NOT FOUND!');
                        window.location.href = '/create/classMember';
                    </script>
                `;
            console.log('Member with ID', classData.userID, 'was NOT found!');
            res.status(500).send(notFound);
            return
        }
        const script = `
            <script>
                alert('User created successfully!');
                window.location.href = '/';
            </script>
        `;

        //Successful status and exec script
        res.status(200).send(script);
    }catch(error){
        console.error('Error Creating User: ', error);
        res.status(500).send('Error Creating User');
    }
});

app.post('/create/classMember', async (req, res) => {
    try{
        const classData = {
            userID: parseInt(req.body.userID),
            classID: req.body.classID
        } 

        var classIDArray = classData.classID.split(',');
        var classArray = []
        var classFound = false, notFoundID = 0;
        for (let i = 0; i < classIDArray.length; i++) {
            var classIDsToInt = parseInt(classIDArray[i].trim());
            classArray.push(classIDsToInt);
            var findClass = await collectionClass.find({ID: classIDsToInt}).toArray()
            if(findClass.length > 0){
                classFound = true;
            }else{
                classFound = false;
                notFoundID = classIDsToInt;
                break;
            }
        }

        var findMember = await collectionMember.find({ID: classData.userID}).toArray();
        if(findMember.length > 0){
            console.log('Member with ID', classData.userID, 'was found!');
            if(classFound){
                console.log('Gym Class with ID(s)', classData.classID, 'was found!');
                for(let i = 0; i < classArray.length; i++){
                    var createGymClasses = await collectionMemberClass.insertOne({userID: classData.userID, classID: classArray[i]});
                    var findClass = await collectionClass.findOne({ID: classArray[i]});
                    findClass.members++;
                    await collectionClass.updateOne({ID: classArray[i]}, {$set: {members: findClass.members}})
                    console.log('Member Class with ID', classArray[i], 'Inserted Successfully', createGymClasses.acknowledged);
                }
            }else{
                console.log('Gym Class with ID', notFoundID, 'was NOT found!');
                const notFound = `
                    <script>
                        alert('GYM CLASS ID NOT FOUND!');
                        window.location.href = '/create/classMember';
                    </script>
                `;
                res.status(500).send(notFound);
                return
            }
        }else{
            const notFound = `
                    <script>
                        alert('MEMBER ID NOT FOUND!');
                        window.location.href = '/create/classMember';
                    </script>
                `;
            console.log('Member with ID', classData.userID, 'was NOT found!');
            res.status(500).send(notFound);
            return
        }
        const script = `
            <script>
                alert('Check Console!');
                window.location.href = '/';
            </script>
        `;
        console.log('User created successfully!');

        //Successful status and exec script
        res.status(200).send(script);
    }catch(error){
        console.error('Error Creating User:', error);
        res.status(500).send('Error Creating User');
    }
});

app.post('/create/gymClass', async (req, res) => {
    try{
        if(req.body.button === 'createClass'){   //check button clicked value
                                                //lines with req.body use the middleware stated at line 7,8
            const classData = {
                ID: gymClassId,
                name: req.body.className,
                day: req.body.day,
                length: req.body.classLength,
                price: req.body.price,
                members: 0
            };

            const insertData = await collectionClass.insertOne(classData);  //insert data into collection
            console.log('Gym Class Inserted Successfully:', insertData.acknowledged);  //log that insertion went successfully

            //send a message and redirect to main page found similar example on stackoverflow to change page and alert
            //this format will be used multiple times through out the code so i provided message here
            //they all have the same intention just changed to satisfy part of code
            const script = `
                <script>
                    alert('Gym class created successfully!');
                    window.location.href = '/';
                </script>
            `;
            console.log('User created successfully!');

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            var genName = '', genDay = '', genLength = 0, genPrice = 0;
            const randomName = ['Cardio', 'Conditioning', 'Fitness', 'Strength', 'Boxing'];
            genName = randomName[Math.floor(Math.random() * randomName.length)];

            const randomDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            genDay = randomDay[Math.floor(Math.random() * randomDay.length)];

            genLength = Math.floor(Math.random() * 4)+1;
            genPrice = Math.floor(Math.random() * 40)+10;

            var gymClassData = {
                ID: gymClassId,
                name: genName,
                day: genDay,
                length: genLength,
                price: genPrice,
                members: 0
            };

            const insertedExample = await collectionClass.insertOne(gymClassData);  //insert data into collection
            
            //log that everything went successfully
            console.log('Gym Class Example Inserted Successfully:', insertedExample.acknowledged);
            
            const script = `
            <script>
                alert('Example Gym Class Created!');
                window.location.href = '/';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Creating Member:', error);
        res.status(500).send('Error Creating Member');
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
            //store into data
            const userData = {
                fname: req.body.fname,
                sname: req.body.sname,
            }
            //initilize new query for search based on data sent in
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
                console.log('There Are No Users In Database');
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
                console.log('There Are No Users In Database');
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
            const idIn = new ObjectId(req.body.userID); //store id into mongoDB new ObjectId
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
                if(manu !== ''){
                    updateQueryData.manufacturer = manu;
                }
                if(model !== ''){
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

//DATABASE
//For my database structure i went for making separate documents for follwoing:
//ADDRESS, USERS, SHIPPING ADDRESS, ORDERS, PHONES.
//I made sure to create a key customerID which then was stored into a variable in code
//and stored into each collection. This allowed me to aviod document embedding in one collection

//IMPACT ON CODE DEVELOPMENT
//This database approach allowed me to easily add addresses without embedding documents into one collection
//which could cause one collection being huge for a simple fact that each user could have multiple orders
//I believe this way saved me some time because for embedding documents it could be easier to make
//a mistake without noticing. Here i just made user to properly allocate data into each collection
//Overall my coding approach could have been simple as CRUD could have been done through a terminal
