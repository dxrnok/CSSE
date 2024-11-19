const express = require('express');
const router = express.Router();
const {Landlord, LandlordA, Tenant, TenantA, Contract} = require('../db');
const ObjectId = require('mongodb').ObjectId;
const faker = require('faker');

//render a page to select what you want to update in database
router.get('/', (req, res) => {
    res.render('updatePage');
});

//methods to render ejs files for (U) from CRUD /update/...
router.get('/landlord', (req, res) => {
    res.render('updateLandlord');
});

router.get('/tenant', (req, res) => {
    res.render('updateTenant');
});

router.get('/contract', (req, res) => {
    res.render('updateContract');
});

router.post('/landlord', async (req, res) => {
    try{
        const idIn = new ObjectId(req.body.userID); // Use the string ID directly
        if(req.body.button === 'updateB'){
            const findLandlord = await Landlord.find({_id: idIn});
            if(findLandlord.length > 0){
                //set all inputs to seperate variables DETAILS
                const t =  req.body.title === 'other' ? req.body.otherInput.charAt(0).toUpperCase() + req.body.otherInput.substring(1).toLowerCase() : req.body.title;
                const fn = req.body.fname.charAt(0).toUpperCase() + req.body.fname.substring(1).toLowerCase();
                const sn = req.body.sname.charAt(0).toUpperCase() + req.body.sname.substring(1).toLowerCase();
                const num = req.body.mobile;
                const mail = req.body.email;
                const birth =  req.body.dob;
                const cP = req.body.councilPermission;
                const c = req.body.contact;
                //ADDRESS
                const a1 = req.body.address1.charAt(0).toUpperCase() + req.body.address1.substring(1).toLowerCase();
                const a2 = req.body.address2.charAt(0).toUpperCase() + req.body.address2.substring(1).toLowerCase();
                const t0wn = req.body.town.charAt(0).toUpperCase() + req.body.town.substring(1).toLowerCase();
                const cc = req.body.city.charAt(0).toUpperCase() + req.body.city.substring(1).toLowerCase();
                const eir = req.body.eircode.toUpperCase()
                const updateContract = {}, updateAddress = {};

                //if input is not empty place it into query
                if(t !== ''){
                    updateContract.title = t;
                }
                if(fn !== ''){
                    updateContract.fname = fn;
                }
                if(sn !== ''){
                    updateContract.sname = sn;
                }
                if(num !== ''){
                    updateContract.mobile = num;
                }
                if(mail !== ''){
                    updateContract.email = mail;
                }
                if(birth !== ''){
                    updateContract.dob = birth;
                }
                if(cP !== ''){
                    updateContract.councilPermission = cP;
                }
                if(c !== ''){
                    updateContract.contact = c;
                }

                if(a1 !== ''){
                    updateAddress.address1 = a1;
                }
                if(a2 !== ''){
                    updateAddress.address2 = a2;
                }
                if(t0wn !== ''){
                    updateAddress.town = t0wn;
                }
                if(cc !== ''){
                    updateAddress.city = cc;
                }
                if(eir !== ''){
                    updateAddress.eircode = eir;
                }

                const updateL = await Landlord.updateOne({_id: idIn}, {$set: updateContract});
                const updateA = await LandlordA.updateOne({ID: idIn}, {$set: updateAddress});

                const toArr = [updateContract];
                if(updateL.modifiedCount > 0){
                    console.log('Landlord Updated Successfully', toArr);
                }

                const toArrA = [updateAddress];
                if(updateA.modifiedCount > 0){
                    console.log('Landlord Address Updated Successfully', toArrA);
                }
                
                const script = `
                    <script>
                        alert('Updated Landlord Successfully!');
                        window.location.href = '/';
                    </script>
                `;
                //Successful status and exec script
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('Error finding landlord with given ID! Check console!');
                        window.location.href = '/update/landlord';
                    </script>
                `;
                console.log('Couldnt find landlord with ID:', idIn);
                console.log('Remember to only input the ID of the user without "ObjectId()" e.g. input: 663f99ae4cc768cfc97cf697');
                //SEND status and exec script
                res.status(500).send(script);
                return;
            }
        }else{
            //random creation
            var sex = 'male';
            var exampleUpdateL = {
                title: faker.random.arrayElement(['Mr', 'Mx', 'Mrs', 'Prof', 'Dr']),
                fname: faker.name.firstName(sex),
                sname: faker.name.lastName()
            }   

            var exampleUpdateA = {
                address1: faker.random.arrayElement(['221 Fake View Park', '232 Hilton Drivers', '2456 Hidden Court', '12 Mirror Park', '1 Stevens Green Road']),
                town: faker.random.arrayElement(['City', 'Example', 'Temple', 'Irns', 'Dublin', 'Upper']),
                city: faker.random.arrayElement(['Town', 'Street', 'Uppa', 'Xera', 'Gerry']),
            }
            const countL = await Landlord.countDocuments();  //count documents in collection
            const randomL = Math.floor(Math.random() * countL);   //gen a random number
            const randomLandlord = await Landlord.findOne().skip(randomL);   //find a random user by skipping documents with the generated number
            const randomId = randomLandlord._id;
            
            const updateDataL = await Landlord.updateOne({_id: randomId}, {$set: exampleUpdateL});
            const updateDataA = await LandlordA.updateOne({ID: randomId}, {$set: exampleUpdateA});
            
            const toArr = [exampleUpdateL];
            if(updateDataL.modifiedCount > 0){
                console.log();
                console.log('Landlord ID', randomId.toString());
                console.log('Landlord Updated Successfully', toArr);
            }

            const toArrA = [exampleUpdateA];
            if(updateDataA.modifiedCount > 0){
                console.log('Landlord Address Updated Successfully', toArrA);
            }

            const script = `
                <script>
                    alert('Random Landlord Updated Successfully!');
                    window.location.href = '/update/landlord';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating Landlord:', error);
        res.status(500).send('Error Updating Landlord');
    }
});

router.post('/tenant', async (req, res) => {
    try{
        const idIn = new ObjectId(req.body.userID); // Use the string ID directly
        if(req.body.button === 'updateB'){
            const findTenant = await Tenant.find({_id: idIn});
            if(findTenant.length > 0){
                //set all inputs to seperate consts DETAILS
                const t =  req.body.title === 'other' ? req.body.otherInput.charAt(0).toUpperCase() + req.body.otherInput.substring(1).toLowerCase() : req.body.title;
                const fn = req.body.fname.charAt(0).toUpperCase() + req.body.fname.substring(1).toLowerCase();
                const sn = req.body.sname.charAt(0).toUpperCase() + req.body.sname.substring(1).toLowerCase();
                const num = req.body.mobile;
                const mail = req.body.email;
                //ADDRESS
                const a1 = req.body.address1.charAt(0).toUpperCase() + req.body.address1.substring(1).toLowerCase();
                const a2 = req.body.address2.charAt(0).toUpperCase() + req.body.address2.substring(1).toLowerCase();
                const t0wn = req.body.town.charAt(0).toUpperCase() + req.body.town.substring(1).toLowerCase();
                const cc = req.body.city.charAt(0).toUpperCase() + req.body.city.substring(1).toLowerCase();
                const eir = req.body.eircode.toUpperCase()
                const updateContract = {}, updateAddress = {};

                //if input is not empty place it into query
                if(t !== ''){
                    updateContract.title = t;
                }
                if(fn !== ''){
                    updateContract.fname = fn;
                }
                if(sn !== ''){
                    updateContract.sname = sn;
                }
                if(num !== ''){
                    updateContract.mobile = num;
                }
                if(mail !== ''){
                    updateContract.email = mail;
                }
        
                if(a1 !== ''){
                    updateAddress.address1 = a1;
                }
                if(a2 !== ''){
                    updateAddress.address2 = a2;
                }
                if(t0wn !== ''){
                    updateAddress.town = t0wn;
                }
                if(cc !== ''){
                    updateAddress.city = cc;
                }
                if(eir !== ''){
                    updateAddress.eircode = eir;
                }

                const updateL = await Tenant.updateOne({_id: idIn}, {$set: updateContract});
                const updateA = await TenantA.updateOne({ID: idIn}, {$set: updateAddress});

                const toArr = [updateContract];
                if(updateL.modifiedCount > 0){
                    console.log('Tenant Updated Successfully', toArr);
                }

                const toArrA = [updateAddress];
                if(updateA.modifiedCount > 0){
                    console.log('Tenant Address Updated Successfully', toArrA);
                }
                
                const script = `
                    <script>
                        alert('Updated Tenant Successfully!');
                        window.location.href = '/';
                    </script>
                `;
                //Successful status and exec script
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('Error finding Tenant with given ID! Check console!');
                        window.location.href = '/update/tenant';
                    </script>
                `;
                console.log('Couldnt find Tenant with ID:', idIn);
                console.log('Remember to only input the ID of the user without "ObjectId()" e.g. input: 663f99ae4cc768cfc97cf697');
                //SEND status and exec script
                res.status(500).send(script);
                return;
            }
        }else{
            //random creation
            var sex = 'male';
            var exampleUpdateL = {
                title: faker.random.arrayElement(['Mr', 'Mx', 'Mrs', 'Prof', 'Dr']),
                fname: faker.name.firstName(sex),
                sname: faker.name.lastName()
            }   

            var exampleUpdateA = {
                address1: faker.random.arrayElement(['261 Fake Park', '236 Hilton Octos', '245 Hidden Field', '12 Mirror Streak', '1 Stevens Old Road']),
                town: faker.random.arrayElement(['City', 'Example', 'Temple', 'Irns', 'Dublin', 'Upper']),
                city: faker.random.arrayElement(['Town', 'Street', 'Uppa', 'Xera', 'Gerry']),
            }

            const countT = await Tenant.countDocuments();  //count documents in collection
            const randomT = Math.floor(Math.random() * countT);   //gen a random number
            const randomTenant = await Tenant.findOne().skip(randomT);   //find a random user by skipping documents with the generated number
            const randomId = randomTenant._id;                              //^if randomT = 5 then the .skip would skip over 5 documents, returns the next one
            
            const updateDataL = await Tenant.updateOne({_id: randomId}, {$set: exampleUpdateL});
            const updateDataA = await TenantA.updateOne({ID: randomId}, {$set: exampleUpdateA});
            
            const toArr = [exampleUpdateL];
            if(updateDataL.modifiedCount > 0){
                console.log();
                console.log('Tenant ID', randomId.toString());
                console.log('Tenant Updated Successfully', toArr);
            }

            const toArrA = [exampleUpdateA];
            if(updateDataA.modifiedCount > 0){
                console.log('Tenant Address Updated Successfully', toArrA);
            }

            const script = `
                <script>
                    alert('Random Tenant Updated Successfully!');
                    window.location.href = '/update/tenant';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating Tenant:', error);
        res.status(500).send('Error Updating Tenant');
    }
});

router.post('/contract', async (req, res) => {
    try{
        const idIn = new ObjectId(req.body.userID); // Use the string ID directly
        if(req.body.button === 'updateB'){
            const findContract = await Contract.find({_id: idIn});
            if(findContract.length > 0){
                const cd = req.body.contractDate;
                const pA = req.body.property;
                const t = req.body.tenants;
                const l = req.body.landlord;
                const f = req.body.fee;
                const d = req.body.doorNum;
                const cL = req.body.contractLength;
                const pT = req.body.propertyType === 'other' ? req.body.otherInput.charAt(0).toUpperCase() + req.body.otherInput.substring(1).toLowerCase() : req.body.propertyType;

                const updateContract = {};
                
                //if input is not empty place it into query
                if(cd !== ''){
                    updateContract.contractDate = t;
                }
                if(pA !== ''){
                    updateContract.propertyAddress = pA;
                }
                if(t !== ''){
                    updateContract.tenants = t;
                }
                if(l !== ''){
                    updateContract.landlord = l;
                }
                if(f !== ''){
                    updateContract.fee = f;
                }
                if(d !== ''){
                    updateContract.doorNum = d;
                }
                if(cL !== ''){
                    updateContract.contractLength = cL;
                }
                if(pT !== ''){
                    updateContract.propertyType = pT;
                }

                var tenantsArray = updateContract.tenants.split(',');   //STORE INTO AN ARRAY
                var newArr = []
                var tenantFound = false, notFoundTenant = '';
                //checked if the tenants inputed by user are valid
                for(var i = 0; i < tenantsArray.length; i++){
                    var tenantToString = tenantsArray[i];  //store a name
                    newArr.push(tenantToString);
                    var first = tenantToString.substring(0, tenantToString.indexOf(' '));
                    var second = tenantToString.substring(tenantToString.indexOf(' ')+1);
                    var findTenant = await Tenant.find({fname: first, sname: second});
                    //searched to check if a tenant with the fnam and sname exists
                    if(findTenant.length > 0){
                        tenantFound = true;
                    }else{
                        tenantFound = false;
                        notFoundTenant = tenantToString;
                        break;
                    }
                }
                
                var updateArray = {};
                //storing tenants into a new array;
                for(let i = 0; i < findContract.length; i++){
                    updateArray = (findContract[i].tenants);
                }
                
                if(tenantFound){
                    console.log('Tenant(s)', updateContract.tenants, 'found!');

                    //adding user inputs into an array of existing tenants
                    for(var i = 0; i < newArr.length; i++){
                        var checkT = false;
                        for(var j = 0; j < updateArray.length; j++){
                            if(updateArray[j] === newArr[i]){   //comapre if users didnt add users that already are in the contract
                                checkT = true;
                                break;
                            }
                        }

                        if(!checkT){ //check if user didnt input a tenant that is already in the contract
                            if(updateArray.length < 3){ //there is less than 3 users in the contract
                                updateArray.push(newArr[i]);
                            }else{
                                console.log('There is a Max number of tenants or You are adding a number of tenants that cant be added into that contract');
                                const script = `
                                    <script>
                                        alert('Error: Check Console!');
                                        window.location.href = '/';
                                    </script>
                                `;
                                res.status(500).send(script);
                                return
                            }
                        }else{
                            console.log('A user you are trying to add already exists', newArr[i]);
                            const script = `
                                <script>
                                    alert('Error while inserting tenant into contract! Check Console!');
                                    window.location.href = '/update/contract';
                                </script>
                            `;
                            res.status(500).send(script);
                            return
                        }
                    }
                    
                    await Contract.updateOne({_id: idIn}, {$set: {tenants: updateArray}});
                }else{
                    console.log('Tenant ', notFoundTenant, 'was NOT found!');
                    const notFound = `
                        <script>
                            alert('TENANT NOT FOUND!');
                            window.location.href = '/update/contract';
                        </script>
                    `;
                    res.status(500).send(notFound);
                    return
                }
                
                const script = `
                    <script>
                        alert('Updated Contract Successfully!');
                        window.location.href = '/';
                    </script>
                `;
                //Successful status and exec script
                res.status(200).send(script);
            }else{
                const script = `
                    <script>
                        alert('Error finding Contract with given ID! Check console!');
                        window.location.href = '/update/contract';
                    </script>
                `;
                console.log('Couldnt find Contract with ID:', idIn);
                console.log('Remember to only input the ID of the contract without "ObjectId()" e.g. input: 663f99ae4cc768cfc97cf697');
                //Send status and exec script
                res.status(500).send(script);
                return;
            }
        }else{
            //random creation
            var randomFee = Math.floor(Math.random() * 1500)+800;
            var exampleUpdateC = {
                fee: randomFee,
                contractLength: faker.random.arrayElement(['Month', 'Year', 'Pernament'])
            }

            const countC = await Contract.countDocuments();  //count documents in collection
            const randomC = Math.floor(Math.random() * countC);   //gen a random number
            const randomCotract = await Contract.findOne().skip(randomC);   //find a random user by skipping documents with the generated number
            const randomId = randomCotract._id;
            
            const updateC = await Contract.updateOne({_id: randomId}, {$set: exampleUpdateC});
            
            const toArr = [exampleUpdateC];
            if(updateC.modifiedCount > 0){
                console.log();
                console.log('Contract ID', randomId.toString());
                console.log('Contract Updated Successfully', toArr);
            }

            const script = `
                <script>
                    alert('Random Contract Updated Successfully!');
                    window.location.href = '/update/contract';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Updating Contract:', error);
        res.status(500).send('Error Updating Contract');
    }
});

module.exports = router;