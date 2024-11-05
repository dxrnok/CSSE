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
var collectionMember;
var collectionClass;
var collectionMemberClass;

//CODE TO CONNECT TO MONGODB (GIVEN IN ATLAS)
const client = new MongoClient(connect.database.url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

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

app.get('/create/memberClassInfo', (req, res) => {
    res.render('createMemberClassInfo');
});

//methods to render ejs files for (U) from CRUD /update/...
app.get('/update', (req, res) => {
    res.render('updatePage');
});

app.get('/update/member', (req, res) => {
    res.render('updateMember');
});

app.get('/update/gymClass', (req, res) => {
    res.render('updateGymClass');
});
app.get('/update/memberClassInfo', (req, res) => {
    res.render('updateMemberClassInfo');
});

//methods to render ejs files for (D) from CRUD /delete/...
app.get('/delete', (req, res) => {
    res.render('deletePage');
});

app.get('/delete/member', (req, res) => {
    res.render('deleteMember');
});

app.get('/delete/gymClass', (req, res) => {
    res.render('deleteGymClass');
});

//methods to render ejs files for (R) from CRUD /search/...
app.get('/search', (req, res) => {
    res.render('searchPage');
});

app.get('/search/member', (req, res) => {
    res.render('searchMember');
});

app.get('/search/gymClass', (req, res) => {
    res.render('searchGymClass');
});

var newId = 1, gymClassId = 1;  //ids that increment based on what already is in DB

//POST method for member creation
app.post('/create/member', async (req, res) => {
    try{
        if(req.body.button === 'createUser'){   //check button clicked value
                                                //lines with req.body use the middleware stated at line 7,8
            const checkPremium = req.body.premium === 'true';
            var findLastID = await collectionMember.find({ID: newId}).toArray();
            while(findLastID.length > 0){
                newId++;
                findLastID = await collectionMember.find({ID: newId}).toArray();
            }
            
            const dataUser = {
                ID: newId,
                title: req.body.title === 'other' ? req.body.otherInput : req.body.title,
                fname: req.body.fname,
                sname: req.body.sname,
                email: req.body.email,
                premium: checkPremium
            };

            await collectionMember.insertOne(dataUser);  //insert data into collection
            var toArr = [dataUser]
            console.log('Member Data Inserted Successfully:', toArr);  //log that insertion went successfully

            //send a message and redirect to main page found similar example on stackoverflow to change page and alert
            //this format will be used multiple times through out the code so i provided message here
            //they all have the same intention just changed to satisfy part of code
            console.log('Redirecting to choose gym classes');
            const script = `
                <script>
                    alert('Please Choose Classes for Member!');
                    window.location.href = '/create/member';
                </script>
            `;
            console.log('User and Gym Classes Created Successfully!');

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            //updating IDs
            var findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
            while(findLastClassID.length > 0){
                gymClassId++;
                findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
                if(findLastClassID.length <= 0){
                    gymClassId -= 1;
                }
            }
            var findLastID = await collectionMember.find({ID: newId}).toArray();
            while(findLastID.length > 0){
                newId++;
                findLastID = await collectionMember.find({ID: newId}).toArray();
            }

            //random generating for RANDOM button
            var genTitle = '', genFname = '', genSname = '', genPrem = false;
            const randomTitle = ['Mr', 'Mx', 'Mrs', 'Prof', 'Dr'];
            genTitle = randomTitle[Math.floor(Math.random() * randomTitle.length)];
            const randomFname = ['Exe', 'Boby', 'Freddy', 'Richie', 'Adam'];
            genFname = randomFname[Math.floor(Math.random() * randomFname.length)];
            const randomSname = ['Downhill', 'Everest', 'Johnson', 'Townsend', 'Heffernan'];
            genSname = randomSname[Math.floor(Math.random() * randomSname.length)];
            const booleanArr = [true, false];
            const newMail = genFname.charAt(0).toLowerCase() + genFname.substring(1)+'.'+genSname.charAt(0).toLowerCase() + genSname.substring(1)+'@mail.example';
            genPrem = booleanArr[Math.floor(Math.random() * booleanArr.length)];

            var memberData = {
                ID: newId,
                title: genTitle,
                fname: genFname,
                sname: genSname,
                email: newMail,
                premium: genPrem
            }   

            await collectionMember.insertOne(memberData);  //insert data into collection

            var genClassID = [];
            for(var i = 0, j = 0; i < 3; i++){
                var randomClassID = Math.floor(Math.random() * gymClassId)+1;
                while(j < genClassID.length){
                    if(genClassID[j] === randomClassID){
                        randomClassID = Math.floor(Math.random() * gymClassId)+1;
                    }
                    j++;
                }
                j = 0;
                genClassID.push(randomClassID);
            }
            await collectionMemberClass.insertOne({userID: newId, classID: genClassID});
            //log that everything went successfully
            var toArr = [memberData]
            console.log('Member Inserted Successfully:', toArr);

            for(var i = 0; i < genClassID.length; i++){
                var findClass = await collectionClass.findOne({ID: genClassID[i]});
                findClass.members++;
                await collectionClass.updateOne({ID: genClassID[i]}, {$set: {members: findClass.members}})
            }

            console.log('Gym Class Inserted Successfully:', genClassID);

            const script = `
            <script>
                alert('Random User Created Successfully!');
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

app.post('/create/memberClassInfo', async (req, res) => {
    try{
        const classData = {
            userID: newId,
            classID: req.body.classID
        } 
        //checked if the classes inputed by user are valid
        var classIDArray = classData.classID.split(',');
        var classArray = []
        var classFound = false, notFoundID = 0;
        for (var i = 0; i < classIDArray.length; i++) {
            var classIDsToInt = parseInt(classIDArray[i].trim());
            classArray.push(classIDsToInt);
            var findClass = await collectionClass.find({ID: classIDsToInt}).toArray()
            //searched to check if a class with the id exists
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
                await collectionMemberClass.insertOne({userID: newId, classID: classArray});
                for(var i = 0; i < classArray.length; i++){
                    var findClass = await collectionClass.findOne({ID: classArray[i]});
                    findClass.members++;
                    await collectionClass.updateOne({ID: classArray[i]}, {$set: {members: findClass.members}})
                }
                    console.log('Gym Class(es) with ID', classArray, 'Inserted Successfully');
            }else{
                console.log('Gym Class with ID ', notFoundID, ' was NOT found!');
                const notFound = `
                    <script>
                        alert('GYM CLASS ID NOT FOUND!');
                        window.location.href = '/create/memberClassInfo';
                    </script>
                `;
                res.status(500).send(notFound);
                return
            }
        }else{
            const notFound = `
                    <script>
                        alert('MEMBER ID NOT FOUND!');
                        window.location.href = '/create/memberClassInfo';
                    </script>
                `;
            console.log('Member with ID', classData.userID, 'was NOT found!');
            res.status(500).send(notFound);
            return
        }
        const script = `
            <script>
                alert('Member Class Information Inserted successfully!');
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

app.post('/create/gymClass', async (req, res) => {
    try{
        if(req.body.button === 'createClass'){   //check button clicked value
                                               //lines with req.body use the middleware stated at line 7,8
            
            //updating IDs
            var findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
        
            while(findLastClassID.length > 0){
                gymClassId++;
                findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
            }

            const classData = {
                ID: gymClassId,
                name: req.body.className,
                day: req.body.day,
                length: req.body.classLength,
                price: req.body.price,
                members: 0
            };

            await collectionClass.insertOne(classData);  //insert data into collection
            var toArr = [classData]
            console.log('Gym Class Inserted Successfully:', toArr);  //log that insertion went successfully

            //send a message and redirect to main page found similar example on stackoverflow to change page and alert
            //this format will be used multiple times through out the code so i provided message here
            //they all have the same intention just changed to satisfy part of code
            const script = `
                <script>
                    alert('Gym class created successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            //updating IDs
            var findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
        
            while(findLastClassID.length > 0){
                gymClassId++;
                findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
            }

            //random generating for RANDOM button
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

            await collectionClass.insertOne(gymClassData);  //insert data into collection
            var toArr = [gymClassData]
            //log that everything went successfully
            console.log('Random Gym Class Inserted Successfully:', toArr);
            
            const script = `
            <script>
                alert('Random Gym Class Created!');
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

app.post('/update/member', async (req, res) => {
    try{
        if(req.body.button === 'updateMember'){
            const idIn = parseInt(req.body.userID);
            const memberFind = await collectionMember.find({ID: idIn}).toArray()
        
            if(memberFind.length > 0){

                //set all inputs to seperate consts
                const t = req.body.title;
                const fn = req.body.fname;
                const sn = req.body.sname;
                const em = req.body.email;
                const pr = req.body.premium === 'true';
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
                if(em !== ''){
                    updateQueryData.email = em;
                }
                if(pr !== ''){
                    updateQueryData.premium = pr ;
                }
                var toArr = [updateQueryData];
                //update users data
                await collectionMember.updateOne({ID: idIn}, {$set: updateQueryData});
                console.log('Updated Member Data:' , toArr);
    
                const script = `
                <script>
                    alert('Updated Member Data!');
                    window.location.href = '/';
                </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No Member Found');
                        window.location.href = '/update/member';
                    </script>
                `;
                console.log('No Member Found with ID: ', idIn);
                res.status(500).send(script);
            }
        }else{

            //updating IDs
            var findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
        
            while(findLastClassID.length > 0){
                gymClassId++;
                findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
            }

            //random generating
            var genID = 0, genName = '', genDay = '', genLength = 0, genPrice = 0;
            const randomName = ['Cardio', 'Conditioning', 'Fitness', 'Strength', 'Boxing'];
            genName = randomName[Math.floor(Math.random() * randomName.length)];

            const randomDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            genDay = randomDay[Math.floor(Math.random() * randomDay.length)];

            genLength = Math.floor(Math.random() * 4)+1;
            genPrice = Math.floor(Math.random() * 40)+10;

            genID = Math.floor(Math.random() * newId)+1;
            var memberData = {
                title: genTitle,
                fname: genFname,
                sname: genSname,
                email: newMail,
                premium: genPrem
            }   

            await collectionMember.updateOne({ID: genID}, {$set: memberData});  //insert data into collection
            var toArr = [memberData]
            //log that everything went successfully
            console.log('Member with ID', genID, 'Was Updated:', toArr);
            

            const script = `
            <script>
                alert('Updated Member Data Printed In Console!');
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

app.post('/update/gymClass', async (req, res) => {
    try{
        if(req.body.button === 'updateClass'){   //check button clicked value
            var idIn = parseInt(req.body.classID);
            var classFind = await collectionClass.find({ID: idIn}).toArray()
        
            if(classFind.length > 0){
                //set all inputs to seperate consts
                var n = req.body.name;
                var d = req.body.day;
                var l = parseInt(req.body.classLength);
                var p = parseInt(req.body.price);
                var updateQueryData = {};

                //if input is not empty place it into query
                if(n !== ''){
                    updateQueryData.name = n;
                }
                if(d !== ''){
                    updateQueryData.day = d;
                }
                if(l !== ''){
                    updateQueryData.length = l;
                }
                if(p !== ''){
                    updateQueryData.price = p;
                }
                
                var toArr = [updateQueryData];
                //update users data
                await collectionClass.updateOne({ID: idIn}, {$set: updateQueryData});
                console.log('Updated Gym Class Data:' , toArr);
    
                const script = `
                <script>
                    alert('Updated Gym Class!');
                    window.location.href = '/';
                </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No Gym Class Found');
                        window.location.href = '/update/gymClass';
                    </script>
                `;
                console.log('No Gym Class Found with ID: ', idIn);
                res.status(500).send(script);
            }
        }else{
            //updating IDs
            var findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
        
            while(findLastClassID.length > 0){
                gymClassId++;
                findLastClassID = await collectionClass.find({ID: gymClassId}).toArray();
                if(findLastClassID.length <= 0){
                    gymClassId -= 1;
                }
            }

            //random generating for RANDOM button
            var genID = 0, genName = '', genDay = '', genLength = 0, genPrice = 0;
            const randomName = ['Cardio', 'Conditioning', 'Fitness', 'Strength', 'Boxing'];
            genName = randomName[Math.floor(Math.random() * randomName.length)];

            const randomDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            genDay = randomDay[Math.floor(Math.random() * randomDay.length)];

            genLength = Math.floor(Math.random() * 4)+1;
            genPrice = Math.floor(Math.random() * 35)+10;
            genID = Math.floor(Math.random() * gymClassId)+1;

            var gymClassData = {
                name: genName,
                day: genDay,
                length: genLength,
                price: genPrice,
            };


            await collectionClass.updateOne({ID: genID}, {$set: gymClassData});  //insert data into collection
            var toArr = [gymClassData]
            //log that everything went successfully
            console.log('Gym Class with ID', genID, 'Was Updated:', toArr);
            

            const script = `
            <script>
                alert('Updated Gym Class Printed In Console!');
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

app.post('/update/memberClassInfo', async (req, res) => {
    try{
        if(req.body.button == 'updateMemberClass'){
            const classData = {
                userID: parseInt(req.body.userID),
                classID: req.body.classID
            } 

            var classIDArray = classData.classID.split(',');
            var classArray = []
            var classFound = false, notFoundID = 0;
            //checked if the classes inputed by user are valid
            for (var i = 0; i < classIDArray.length; i++) {
                var classIDsToInt = parseInt(classIDArray[i].trim());  //store an id
                classArray.push(classIDsToInt); 
                var findClass = await collectionClass.find({ID: classIDsToInt}).toArray();
                //searched to check if a class with the id exists
                if(findClass.length > 0){
                    classFound = true;
                }else{
                    classFound = false;
                    notFoundID = classIDsToInt;
                    break;
                }
            }

            var findMember = await collectionMember.find({ID: classData.userID}).toArray();
            var findMemberClass = await collectionMemberClass.find({userID: classData.userID}).toArray();
            var updateArray = findMemberClass[findMemberClass.length - 1].classID;  //stored all classID into an array
                                                                                    //for easier comparing
            if(findMember.length > 0){
                console.log('Member with ID', classData.userID, 'was found!');
                if(classFound){
                    console.log('Gym Class with ID(s)', classData.classID, 'was found!');

                    //checks if user is already in those classes so it doesnt update the member count
                    for (var i = 0; i < classArray.length; i++) {
                        var existingIndex = updateArray.indexOf(classArray[i]);
                        if (existingIndex === -1) {
                            var findClass = await collectionClass.findOne({ ID: classArray[i] });
                            findClass.members++;
                            await collectionClass.updateOne({ ID: classArray[i] }, { $set: { members: findClass.members } });
                        }
                    }

                    //adding user inputs into an array of existing classes
                    for(var i = 0; i < classArray.length; i++){
                        var checkID = false;
                        for(var j = 0; j < updateArray.length; j++){
                            if(updateArray[j] === classArray[i]){
                                checkID = true;
                                break;
                            }
                        }
                        if (!checkID) {
                            updateArray.push(classArray[i]);
                        }
                    }
                    
                    await collectionMemberClass.updateOne({userID: classData.userID}, {$set: {classID: updateArray}});
                    
                }else{
                    console.log('Gym Class with ID', notFoundID, 'was NOT found!');
                    const notFound = `
                        <script>
                            alert('GYM CLASS ID NOT FOUND!');
                            window.location.href = '/update/memberClassInfo';
                        </script>
                    `;
                    res.status(500).send(notFound);
                    return
                }
            }else{
                const notFound = `
                        <script>
                            alert('MEMBER ID NOT FOUND!');
                            window.location.href = '/update/memberClassInfo';
                        </script>
                    `;
                console.log('Member with ID', classData.userID, 'was NOT found!');
                res.status(500).send(notFound);
                return
            }
        }else{
            console.log("123");
        }
        const script = `
            <script>
                alert('Member Class Updated Successfully!');
                window.location.href = '/';
            </script>
        `;
        console.log('Member Class Updated Successfully!');

        //Successful status and exec script
        res.status(200).send(script);
    }catch(error){
        console.error('Error Updating Member Class:', error);
        res.status(500).send('Error Updating Member Class');
    }
});

//POST method for deletion of users
app.post('/delete/member', async (req, res) => {
    try{
        var idIn = await collectionMember.find({ID: parseInt(req.body.userID)}).toArray();  //find ids from database

        if(idIn.length > 0){   //check if any there id was found 
            var findClasses = await collectionMemberClass.find({userID: parseInt(req.body.userID)}).toArray();
            if (findClasses.length > 0) {   
                //decrement the members count when deleting member
                var updateArray = findClasses[findClasses.length - 1].classID; 
                //updateArray get all of teh classID into an array to make it easy to iterate through
                for(var i = 0; i < updateArray.length; i++){
                    var classData = await collectionClass.findOne({ID: updateArray[i]});
                    var getMembers = classData.members;
                    
                    var updateMembers = getMembers - 1;
                    //made sure to check if the member count doesnt get below 0 which could lead to code malfunction
                    if(updateMembers >= 0){
                        await collectionClass.updateOne({ID: updateArray[i]},{$set: {members: updateMembers}});
                    }
                }
            }
            await collectionMember.deleteOne({ID: parseInt(req.body.userID)});
            await collectionMemberClass.deleteOne({userID: parseInt(req.body.userID)});

            console.log("Memeber with ID", parseInt(req.body.userID), "was deleted Successfully");
        }else{
            console.log('There Are No Users In Database');
            var script = `
                <script>
                    alert('No Users Found In Database!');
                    window.location.href = '/delete/member';
                </script>
            `;
            res.status(500).send(script);
            return;
        }
        var script = `
            <script>
                alert('Deleted User Printed To Console!');
                window.location.href = '/';
            </script>
        `;
        res.status(200).send(script);
    }catch(error){
        console.error('Error Deleting User: ', error);
        res.status(500).send('Error Deleting User');
    }
});

app.post('/delete/gymClass', async (req, res) => {
    try {
        //find all memberclasses that contain the classID wanted to be deleted
        var findMemberClass = await collectionMemberClass.find({classID: parseInt(req.body.classID)}).toArray();

        if(findMemberClass.length > 0){
            //iterate through the found memberclasses and based on
            //each one update getting rid of the class id we want to delete
            for(var i = 0; i < findMemberClass.length; i++) {
                var classIDArray = findMemberClass[i].classID;
                var updatedClassIDArray = [];
                for (var j = 0; j < classIDArray.length; j++) {
                    if (classIDArray[j] !== parseInt(req.body.classID)) {
                        updatedClassIDArray.push(classIDArray[j]);
                        //adds the all the classID that are not = 
                        //to the class user wants to delete 
                    }
                }
                //update each memberclass one by one
                //reason that i didnt update many is because its very unlikely that
                //memberclasses in classID will be the same simply because they are randomly generated
                //in the creation proccess (random button)
                await collectionMemberClass.updateOne({userID: findMemberClass[i].userID }, {$set: { classID: updatedClassIDArray}});
            }
        }

        await collectionClass.deleteOne({ID: parseInt(req.body.classID)});

        console.log("Gym class with ID", parseInt(req.body.classID), "was deleted successfully");

        var script = `
            <script>
                alert('Deleted gym class printed to console!');
                window.location.href = '/';
            </script>
        `;
        res.status(200).send(script);
    } catch (error) {
        console.error('Error deleting gym class: ', error);
        res.status(500).send('Error deleting gym class');
    }
});

//POST method for searching users
app.post('/search/member', async (req, res) => {
    try{
        if(req.body.button === 'searchMember'){ //check button value
            var findM = await collectionMember.find({ID: parseInt(req.body.userID)}).toArray();    //user from 10 users inserted into the db
            if(findM.length > 0){
                var findMC = await collectionMemberClass.find({userID: parseInt(req.body.userID)}).toArray();

                const script = `
                        <script>
                            alert('User Found Printed in Console!');
                            window.location.href = '/search/member';
                        </script>
                `;
                res.status(200).send(script);
                console.log('Member found:', findM);
                console.log('Member Classes Found:', findMC);
            }else{
                const script = `
                    <script>
                        alert('No Memeber Found!');
                        window.location.href = '/search/member';
                    </script>
                `;
                res.status(500).send(script);
                return;
            }
        }else{ //check button value
            var member = await collectionMember.find({}).toArray(); //find all members from members collection
            const script = `
                    <script>
                        alert('Printed All Users to DB!');
                        window.location.href = '/';
                    </script>
            `;
            res.status(200).send(script);
            console.log('Users found:', member);
        }
    }catch(error){
        console.error('Error Searching User: ', error);
        res.status(500).send('Error Searching User');
    }
});

app.post('/search/gymClass', async (req, res) => {
    try{
        if(req.body.button === 'searchGym'){ //check button value
            var findC = await collectionClass.find({ID: parseInt(req.body.classID)}).toArray();
            if(findC.length > 0){
                var provideMC = req.body.provideMC === 'true';
                console.log('Class found:', findC);
                if(provideMC){
                    var findMC = await collectionMemberClass.find({userID: parseInt(req.body.classID)}).toArray();
                    console.log('Member Classes Found:', findMC);
                }
                const script = `
                        <script>
                            alert('Class Found Printed in Console!');
                            window.location.href = '/search/gymClass';
                        </script>
                `;
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('No Memeber Found!');
                        window.location.href = '/search/gymClass';
                    </script>
                `;
                res.status(500).send(script);
                return;
            }
        }else{ //check button value
            var findC = await collectionClass.find({}).toArray(); //find all users from User collection
            console.log('Classes found:', findC);
    
            const script = `
                    <script>
                        alert('Printed All Classse to DB!');
                        window.location.href = '/';
                    </script>
            `;
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Searching For Gym Class: ', error);
        res.status(500).send('Error For Gym Class');
    }
});

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});

//DATABASE
//For my database structure i went for making separate documents for follwoing:
//members, class, member-class-info *NOTE* if using mongosh u need to db.getCollection("member-class-info").... to get the collection
//I made sure to create a key IDs which then was stored into a variable in code
//and stored into each collection. This allowed me to aviod document embedding in one collection
//i made a arry in member-class-info to prevent making the collection too large

//IMPACT ON CODE DEVELOPMENT
//Very easy to navigate through based on the dynamic web
//Overall my coding approach could have been simple as CRUD could have been done through a terminal