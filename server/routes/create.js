const express = require('express');
const router = express.Router();
const {Landlord, LandlordA, Tenant, TenantA, Contract} = require('../db');
const faker = require('faker');

//render a page to select what you want to create in database
router.get('/', (req, res) => {
    res.render('createPage');
});

//methods to render ejs files for (C) from CRUD /create/...
router.get('/landlord', (req, res) => {
    res.render('createLandlord');
});

router.get('/tenant', (req, res) => {
    res.render('createTenant');
});

router.get('/contract', (req, res) => {
    res.render('createContract');
});

router.post('/landlord', async (req, res) => {
    try{
        if(req.body.button === 'createB'){
            const data = new Landlord({
                title: req.body.title === 'other' ? req.body.otherInput.charAt(0).toUpperCase() + req.body.otherInput.substring(1).toLowerCase() : req.body.title,
                fname: req.body.fname.charAt(0).toUpperCase() + req.body.fname.substring(1).toLowerCase(),
                sname: req.body.sname.charAt(0).toUpperCase() + req.body.sname.substring(1).toLowerCase(),
                mobile: req.body.mobile,
                email: req.body.email,
                dob:  req.body.dob,
                councilPermission: req.body.councilPermission,
                contact: req.body.contact
            });
            let saveData = await data.save();  //save to database
            let userID = saveData._id;          //retrieve _id to store into Address for easy reference
            const toArr = [data];
            console.log();
            console.log('Landlord Created Successfully:', toArr);

            const dataAddress = new LandlordA({
                ID: userID,
                address1: req.body.address1.charAt(0).toUpperCase() + req.body.address1.substring(1).toLowerCase(),
                address2: req.body.address2.charAt(0).toUpperCase() + req.body.address2.substring(1).toLowerCase(),
                town: req.body.town.charAt(0).toUpperCase() + req.body.town.substring(1).toLowerCase(),
                city: req.body.city.charAt(0).toUpperCase() + req.body.city.substring(1).toLowerCase(),
                eircode: req.body.eircode.toUpperCase()
            });
            await dataAddress.save();
            var addressToArr = [dataAddress];
            console.log();
            console.log('Landlord Address Created Successfully:', addressToArr);
            
            const script = `
                <script>
                    alert('Landlord Details Inserted Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            //random generating for RANDOM button
            var sex = 'male';
            let genNumber = '';
            for(let i = 0; i < 10; i++){
                genNumber = genNumber + Math.floor(Math.random() * 10);  
            }
            //generate random date between ages of 18-120 *faker didnt want to work*
            var current = new Date();
            var dd = current.getDate();
            var mm = current.getMonth()+1; //+1 because first month january is 0 
            if(dd < 10){
                dd = '0'+dd
            }
            if(mm < 10){
                mm = '0'+mm;
            }
            var yyyy = current.getFullYear();
            var random = Math.floor(Math.random() * 102)+18;
            var newYYYY = yyyy - random;  // Date 120 years ago

            const exampleData = new Landlord({
                title: faker.random.arrayElement(['Mr', 'Mx', 'Mrs', 'Prof', 'Dr']),
                fname: faker.name.firstName(sex),
                sname: faker.name.lastName(),
                mobile: genNumber,
                email: faker.internet.email(),
                dob: newYYYY + '-' + mm + '-' +dd,
                councilPermission: faker.random.arrayElement(['Yes', 'No']),
                contact: faker.random.arrayElement(['Yes', 'No']),
            });
            let saveData = await exampleData.save();  //save to database
            let userID = saveData._id;          //retrieve _id to store into Address for easy reference
            var toArr = [exampleData];
            const exampleAddress = new LandlordA({
                ID: userID,
                address1: faker.random.arrayElement(['221 Fake View Park', '232 Hilton Drivers', '2456 Hidden Court', '12 Mirror Park', '1 Stevens Green Road']),
                address2: '',
                town: faker.random.arrayElement(['City', 'Example', 'Temple', 'Irns', 'Dublin', 'Upper']),
                city: faker.random.arrayElement(['Town', 'Street', 'Uppa', 'Xera', 'Gerry']),
                eircode: ''
            });
            await exampleAddress.save();
            var addressToArr = [exampleAddress];
            console.log();
            console.log('Landlord Created Successfully:', toArr);
            console.log('Address Created Successfully:', addressToArr);
            const script = `
            <script>
                alert('Random Landlord Inserted Successfully!');
                window.location.href = '/create/landlord';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Creating Landlord:', error);
        res.status(500).send('Error Creating Landlord');
    }
});

router.post('/tenant', async (req, res) => {
    try{
        if(req.body.button === 'createB'){
            const data = new Tenant({
                title: req.body.title === 'other' ? req.body.otherInput.charAt(0).toUpperCase() + req.body.otherInput.substring(1).toLowerCase() : req.body.title,
                fname: req.body.fname.charAt(0).toUpperCase() + req.body.fname.substring(1).toLowerCase(),
                sname: req.body.sname.charAt(0).toUpperCase() + req.body.sname.substring(1).toLowerCase(),
                mobile: req.body.mobile,
                email: req.body.email
            });
            let saveData = await data.save();  //save to database
            let userID = saveData._id;          //retrieve _id to store into Address for easy reference
            var toArr = [data];
            console.log();
            console.log('Tenant Created Successfully:', toArr);

            const dataAddress = new TenantA({
                ID: userID,
                address1: req.body.address1.charAt(0).toUpperCase() + req.body.address1.substring(1).toLowerCase(),
                address2: req.body.address2.charAt(0).toUpperCase() + req.body.address2.substring(1).toLowerCase(),
                town: req.body.town.charAt(0).toUpperCase() + req.body.town.substring(1).toLowerCase(),
                city: req.body.city.charAt(0).toUpperCase() + req.body.city.substring(1).toLowerCase(),
                eircode: req.body.eircode.toUpperCase()
            });
            await dataAddress.save();
            var addressToArr = [dataAddress];
            console.log();
            console.log('Tenant Address Created Successfully:', addressToArr);
            
            const script = `
            <script>
                alert('Tenant Details Inserted Successfully!');
                window.location.href = '/';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            //random generating for RANDOM button
            var sex = 'male';
            let genNumber = '';
            for(let i = 0; i < 10; i++){
                genNumber = genNumber + Math.floor(Math.random() * 10);  
            }

            const exampleData = new Tenant({
                title: faker.random.arrayElement(['Mr', 'Mx', 'Mrs', 'Prof', 'Dr']),
                fname: faker.name.firstName(sex),
                sname: faker.name.lastName(),
                mobile: genNumber,
                email: faker.internet.email(),
            });
            let saveData = await exampleData.save();  //save to database
            let userID = saveData._id;          //retrieve _id to store into Address for easy reference
            var toArr = [exampleData];
            const exampleAddress = new TenantA({
                ID: userID,
                address1: faker.random.arrayElement(['221 View Park', '232 Hilton Hill', '2456 Hidden Street', '12 Mirror View', '1 Stevens Green Drain']),
                address2: '',
                town: faker.random.arrayElement(['City', 'Example', 'Temple', 'Irns', 'Dublin', 'Upper']),
                city: faker.random.arrayElement(['Town', 'Street', 'Uppa', 'Xera', 'Gerry']),
                eircode: ''
            });
            await exampleAddress.save();
            var addressToArr = [exampleAddress];

            console.log();
            console.log('Tenant Created Successfully:', toArr);
            console.log('Address Created Successfully:', addressToArr);
            const script = `
            <script>
                alert('Random Tenant Inserted Successfully!');
                window.location.href = '/create/tenant';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Creating Tenant:', error);
        res.status(500).send('Error Creating Tenant');
    }
});

router.post('/contract', async (req, res) => {
    try{
        if(req.body.button === 'createB'){
            const data = new Contract({
                contractDate: req.body.contractDate,
                propertyAddress: req.body.property.charAt(0).toUpperCase() + req.body.property.substring(1).toLowerCase(),
                tenants: req.body.tenants,
                landlord: req.body.landlord,
                fee: req.body.fee,
                propertyDoor: req.body.propertyDoor,
                contractLength: req.body.contractLength,
                propertyType: req.body.propertyType === 'other' ? req.body.otherInput.charAt(0).toUpperCase() + req.body.otherInput.substring(1).toLowerCase() : req.body.propertyType,
            });
            await data.save();  //save to database
            var toArr = [data];
            console.log();
            console.log('Contract Created Successfully:', toArr);

            const script = `
                <script>
                    alert('Contract Inserted Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            var current = new Date();
            var dd = current.getDate();
            var mm = current.getMonth()+1; //+1 because first month january is 0 
            var yyyy = current.getFullYear();
            if(dd < 10){
                dd = '0'+dd
            }
            if(mm < 10){
                mm = '0'+mm;
            }
            var randomFee = Math.floor(Math.random() * 1500)+800;
            var randomDoor = Math.floor(Math.random() * 55)+5;
            const countL = await Landlord.countDocuments();  //count documents in collection
            const randomL = Math.floor(Math.random() * countL);   //gen a random number
            const randomLandlord = await Landlord.findOne().skip(randomL);   //find a random user by skipping documents with the generated number
            
            const countT = await Tenant.countDocuments();   //count documents in collection
            var tenantArr = [];
            
            if(countT>0){   //check if there is tenants in DB
                var usedID = [];
                for(let i = 0; i<3; i++){
                    var randomT = Math.floor(Math.random() * countT); //random number 

                    //check if last person wasnt already added into array
                    while(usedID.includes(randomT)){
                        randomT = Math.floor(Math.random() * countT);
                    }
                    usedID.push(randomT);
                    var findRandom = await Tenant.findOne().skip(randomT);  //find random document
                    tenantArr.push(findRandom.fname + ' ' +findRandom.sname);   //store fname and sname 
                }
            }else{
                console.log();
                console.log("NO TENANTS IN DB");
            }

            const exampleData = new Contract({
                contractDate: yyyy + '-' + dd + '-' + mm,
                propertyAddress: faker.random.arrayElement(['228 View Field', '232 Hillary Hill', '2456 Waken Street', '12 Glass Park View', '1 Gerards Green Field']),
                tenants: tenantArr,
                landlord: randomLandlord.fname + ' ' + randomLandlord.sname,
                fee: randomFee,
                propertyDoor: randomDoor,
                contractLength: faker.random.arrayElement(['Month', 'Year', 'Pernament']),
                propertyType: faker.random.arrayElement(['End-Terraced', 'Apartment', 'Mobile']),
            });

            await exampleData.save();  //save to database
            
            var toArr = [exampleData];
            console.log();
            console.log('Contract Created Successfully:', toArr); 
            const script = `
            <script>
                alert('Random Contract Inserted Successfully!');
                window.location.href = '/create/contract';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Creating Contract:', error);
        res.status(500).send('Error Creating Contract');
    }
});

module.exports = router;