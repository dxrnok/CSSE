const express = require('express');
const router = express.Router();
const {Landlord, LandlordA, Tenant, TenantA, Contract} = require('../db');
const ObjectId = require('mongodb').ObjectId;

//render a page to select what you want to search in database
router.get('/', (req, res) => {
    res.render('searchPage');
});

//methods to render ejs files for (R) from CRUD /search/...
router.get('/landlord', (req, res) => {
    res.render('searchLandlord');
});

router.get('/tenant', (req, res) => {
    res.render('searchTenant');
});

router.get('/contract', (req, res) => {
    res.render('searchContract');
});

router.post('/landlord', async (req, res) => {
    try{
        if(req.body.button === 'searchB'){
            const data = new Landlord({
                fname: req.body.fname.charAt(0).toUpperCase() + req.body.fname.substring(1).toLowerCase(),
                sname: req.body.sname.charAt(0).toUpperCase() + req.body.sname.substring(1).toLowerCase(),
            });
            let query = {};
            if (data.fname && data.sname) { //checking data inputted and set it into query
                query = {
                    fname: data.fname,
                    sname: data.sname
                };
            }else if(data.fname){
                query = {
                    fname: data.fname
                };
            }else{
                query = {
                    sname: data.sname
                };
            }
            var toArr = [query];
            let findLandlord = await Landlord.find(query);  //search from DB
            if(findLandlord.length === 1){  //if one landlord was found
                const findAddress = await LandlordA.find({ID: findLandlord[0]._id});
                console.log();
                console.log('Landlord Found Successfully:', findLandlord);
                console.log('Landlord Address Successfully:', findAddress);
            }else if(findLandlord.length > 1){//if landlord > 1 was found then itarate through them and print
                for(let i = 0; i < findLandlord.length; i++){
                    const findAddress = await LandlordA.find({ID: findLandlord[i]._id});
                    console.log();
                    console.log('Landlord', i+1 ,'Found Successfully:', findLandlord[i]);
                    console.log('Landlord', i+1 ,'Address Successfully:', findAddress[0]);
                }
            }else{
                console.log();
                console.log('NO LANDLORD FOUND BY', toArr);
                const script = `
                    <script>
                        alert('NO LANDLORD FOUND!');
                        window.location.href = '/search/landlord';
                    </script>
                `;

                //Send status and exec script
                res.status(500).send(script);
                return;
            }

            const script = `
            <script>
                alert('Landlord Details Found Successfully!');
                window.location.href = '/';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else if(req.body.button === 'randomB'){
            const countL = await Landlord.countDocuments();  //count documents in collection
            const randomL = Math.floor(Math.random() * countL);   //gen a random number
            const randomLandlord = await Landlord.findOne().skip(randomL);   //find a random user by skipping documents with the generated number
            const randomArr = [randomLandlord]
            const findAddress = await LandlordA.find({ID: randomArr[0]._id});
            console.log();
            console.log('Landlord Found Successfully:', randomArr);
            console.log('Landlord Address Successfully:', findAddress);
           
            const script = `
            <script>
                alert('Random Landlord Found Successfully!');
                window.location.href = '/search/landlord';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else if(req.body.button === 'searchAllB'){
            const findAllLandlords = await Landlord.find({});
            console.log();
            console.log('All Landlords:', findAllLandlords);
           
            const script = `
            <script>
                alert('All Landlords Found Successfully!');
                window.location.href = '/search/landlord';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            const findAllAddress = await LandlordA.find({});
            console.log();
            console.log('All Address Successfully:', findAllAddress);
            const script = `
                <script>
                    alert("All Address's Found Successfully!");
                    window.location.href = '/search/landlord';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Searching Landlord:', error);
        res.status(500).send('Error Searching Landlord');
    }
});

router.post('/tenant', async (req, res) => {
    try{
        if(req.body.button === 'searchB'){
            const data = new Tenant({
                fname: req.body.fname.charAt(0).toUpperCase() + req.body.fname.substring(1).toLowerCase(),
                sname: req.body.sname.charAt(0).toUpperCase() + req.body.sname.substring(1).toLowerCase(),
            });
            let query = {};
            if (data.fname && data.sname) {
                query = {
                    fname: data.fname,
                    sname: data.sname
                };
            }else if(data.fname){
                query = {
                    fname: data.fname
                };
            }else{
                query = {
                    sname: data.sname
                };
            }
            var toArr = [query];
            let findTenant = await Tenant.find(query);  //search from DB
            if(findTenant.length === 1){
                const findAddress = await TenantA.find({ID: findTenant[0]._id});
                console.log();
                console.log('Tenant Found Successfully:', findTenant);
                console.log('Tenant Address Successfully:', findAddress);
            }else if(findTenant.length > 1){
                for(let i = 0; i < findTenant.length; i++){
                    const findAddress = await TenantA.find({ID: findTenant[i]._id});
                    console.log();
                    console.log('Tenant', i+1 ,'Found Successfully:', findTenant[i]);
                    console.log('Tenant', i+1 ,'Address Successfully:', findAddress[0]);
                }
            }else{
                console.log();
                console.log('NO TENANT FOUND BY', toArr);
                const script = `
                    <script>
                        alert('NO TENANT FOUND!');
                        window.location.href = '/search/tenant';
                    </script>
                `;

                //Send status and exec script
                res.status(500).send(script);
                return;
            }

            const script = `
            <script>
                alert('Tenant Details Found Successfully!');
                window.location.href = '/';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else if(req.body.button === 'randomB'){
            const countT = await Tenant.countDocuments();  //count documents in collection
            const randomT = Math.floor(Math.random() * countT);   //gen a random number
            const randomTenant = await Tenant.findOne().skip(randomT);   //find a random user by skipping documents with the generated number
            const randomArr = [randomTenant]
            const findAddress = await TenantA.find({ID: randomArr[0]._id});
            console.log();
            console.log('Tenant Found Successfully:', randomArr);
            console.log('Tenant Address Successfully:', findAddress);
           
            const script = `
            <script>
                alert('Random Tenant Found Successfully!');
                window.location.href = '/search/tenant';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else if(req.body.button === 'searchAllB'){
            const findAllTenants = await Tenant.find({});
            console.log();
            console.log('All Tenants:', findAllTenants);
           
            const script = `
            <script>
                alert('All Tenants Found Successfully!');
                window.location.href = '/search/tenant';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            const findAllAddress = await TenantA.find({});
            console.log();
            console.log('All Address Successfully:', findAllAddress);
            const script = `
                <script>
                    alert("All Address's Found Successfully!");
                    window.location.href = '/search/tenant';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Searching Tenant:', error);
        res.status(500).send('Error Searching Tenant');
    }
});

router.post('/contract', async (req, res) => {
    try{
        if(req.body.button === 'searchB'){
            const idIn = new ObjectId(req.body.contractID);
            let findContract = await Contract.find({_id: idIn});  //search from DB
            if(findContract.length > 0){
                console.log();
                console.log('Contract Found Successfully:', findContract);
            }else{
                console.log();
                console.log('NO CONTRACT FOUND WITH ID:', idIn);
                const script = `
                    <script>
                        alert('Contrac Details Found Successfully!');
                        window.location.href = '/';
                    </script>
                `;

                //Send status and exec script
                res.status(500).send(script);
                return;
            }

            const script = `
                <script>
                    alert('Contract Details Found Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else if(req.body.button === 'randomB'){
            const countC = await Contract.countDocuments();  //count documents in collection
            const randomC = Math.floor(Math.random() * countC);   //gen a random number
            const randomContract = await Contract.findOne().skip(randomC);   //find a random user by skipping documents with the generated number
            const randomArr = [randomContract];
            console.log();
            console.log('Contract Found Successfully:', randomArr);
           
            const script = `
            <script>
                alert('Random Contract Found Successfully!');
                window.location.href = '/search/contract';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            const findAllC = await Contract.find({});
            console.log();
            console.log('All Contracts:', findAllC);
           
            const script = `
            <script>
                alert('All Contracts Found Successfully!');
                window.location.href = '/';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Searching Contract:', error);
        res.status(500).send('Error Searching Contract');
    }
});
module.exports = router;