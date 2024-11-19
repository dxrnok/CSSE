const express = require('express');
const router = express.Router();
const {Landlord, LandlordA, Tenant, TenantA, Contract} = require('../db');
const ObjectId = require('mongodb').ObjectId;

//render a page to select what you want to delete in database
router.get('/', (req, res) => {
    res.render('deletePage');
});

//methods to render ejs files for (D) from CRUD /delete/...
router.get('/landlord', (req, res) => {
    res.render('deleteLandlord');
});

router.get('/tenant', (req, res) => {
    res.render('deleteTenant');
});

router.get('/contract', (req, res) => {
    res.render('deleteContract');
});

router.get('/contract/tenant', (req, res) => {
    res.render('deleteContractTenant');
});

router.post('/landlord', async (req, res) => {
    try{
        if(req.body.button === 'deleteB'){
            const idIn = new ObjectId(req.body.userID); // Use the string ID directly
            const findLandlord = await Landlord.find({_id: idIn});
            if(findLandlord.length > 0){
                const findLandlordA = await LandlordA.find({ID: idIn});
                await Landlord.deleteOne({_id: idIn});
                await LandlordA.deleteOne({_id: idIn});
                console.log('Landlord Details deleted:', findLandlord);
                console.log('Landlord Address deleted:', findLandlordA);
    
                const script = `
                    <script>
                        alert('Landlord Details Deleted Successfully!');
                        window.location.href = '/';
                    </script>
                `;
                //Successful status and exec script
                res.status(200).send(script);
            }else{
                console.log();
                console.log('NO LANDLORD FOUND WITH ID', idIn);
                const script = `
                    <script>
                        alert('NO LANDLORD FOUND!');
                        window.location.href = '/delete/landlord';
                    </script>
                `;

                //Send status and exec script
                res.status(500).send(script);
                return;
            }
        }else if(req.body.button === 'randomB'){
            const countL = await Landlord.countDocuments();  //count documents in collection
            const randomL = Math.floor(Math.random() * countL);   //gen a random number
            const randomLandlord = await Landlord.findOne().skip(randomL);   //find a random user by skipping documents with the generated number
            const randomArr = [randomLandlord]
            const findAddress = await LandlordA.find({ID: randomArr[0]._id});
            await Landlord.deleteOne({_id: idIn});
            await LandlordA.deleteOne({_id: idIn});
            console.log();
            console.log('Landlord Details deleted:', randomLandlord);
            console.log('Landlord Address deleted:', findAddress);
           
            const script = `
            <script>
                alert('Random Landlord Details Deleted Successfully!');
                window.location.href = '/delete/landlord';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            await Landlord.deleteMany({});
            await LandlordA.deleteMany({});
            console.log();
            console.log('All Landlords Details Deleted Successfully:');
           
            const script = `
                <script>
                    alert('All Landlords Deleted Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Deleting Landlord:', error);
        res.status(500).send('Error Deleting Landlord');
    }
});

router.post('/tenant', async (req, res) => {
    try{
        if(req.body.button === 'deleteB'){
            const idIn = new ObjectId(req.body.userID); // Use the string ID directly
            const findTenant = await Tenant.find({_id: idIn});
            if(findTenant.length > 0){
                const findTenantA = await TenantA.find({ID: idIn});
                await Landlord.deleteOne({_id: idIn});
                await LandlordA.deleteOne({_id: idIn});
                console.log('Tenant Details deleted:', findTenant);
                console.log('Tenant Address deleted:', findTenantA);
    
                const script = `
                    <script>
                        alert('Tenant Details Deleted Successfully!');
                        window.location.href = '/';
                    </script>
                `;
                //Successful status and exec script
                res.status(200).send(script);
            }else{
                console.log();
                console.log('NO TENANT FOUND WITH ID', idIn);
                const script = `
                    <script>
                        alert('NO TENANT FOUND!');
                        window.location.href = '/delete/tenant';
                    </script>
                `;

                //Send status and exec script
                res.status(500).send(script);
                return;
            }
        }else if(req.body.button === 'randomB'){
            const countT = await Tenant.countDocuments();  //count documents in collection
            const randomT = Math.floor(Math.random() * countT);   //gen a random number
            const randomTenant = await Tenant.findOne().skip(randomT);   //find a random user by skipping documents with the generated number
            const randomArr = [randomTenant]
            const findAddress = await TenantA.find({ID: randomArr[0]._id});
            await Tenant.deleteOne({_id: idIn});
            await TenantA.deleteOne({_id: idIn});
            console.log();
            console.log('Tenant Details deleted:', randomTenant);
            console.log('Tenant Address deleted:', findAddress);
           
            const script = `
            <script>
                alert('Random Tenant Details Deleted Successfully!');
                window.location.href = '/delete/tenant';
            </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            await Tenant.deleteMany({});
            await TenantA.deleteMany({});
            console.log();
            console.log('All Tenants Details Deleted Successfully:');
           
            const script = `
                <script>
                    alert('All Tenants Deleted Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Deleting Tenant:', error);
        res.status(500).send('Error Deleting Tenant');
    }
});

router.post('/contract', async (req, res) => {
    try{
        if(req.body.button === 'deleteB'){
            const idIn = new ObjectId(req.body.contractID); // Use the string ID directly
            const findContract = await Contract.find({_id: idIn});
            if(findContract.length > 0){
                await Contract.deleteOne({_id: idIn});
                console.log('Contract Deleted:', findContract);
    
                const script = `
                    <script>
                        alert('Contract Deleted Successfully!');
                        window.location.href = '/';
                    </script>
                `;
                //Successful status and exec script
                res.status(200).send(script);
            }else{
                console.log();
                console.log('NO CONTRACT FOUND WITH ID', idIn);
                const script = `
                    <script>
                        alert('NO CONTRACT FOUND!');
                        window.location.href = '/delete/contract';
                    </script>
                `;

                //Send status and exec script
                res.status(500).send(script);
                return;
            }
        }else if(req.body.button === 'randomB'){
            const countC = await Contract.countDocuments();  //count documents in collection
            const randomC = Math.floor(Math.random() * countC);   //gen a random number
            const randomContract = await Contract.findOne().skip(randomC);   //find a random user by skipping documents with the generated number
            const randomArr = [randomContract];
            await Contract.deleteOne({_id: randomContract._id});

            console.log();
            console.log('Random Contract Deleted:', randomArr);
           
            const script = `
                <script>
                    alert('Random Contract Deleted Successfully!');
                    window.location.href = '/delete/contract';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }else{
            await Contract.deleteMany({});
            console.log();
            console.log('All Contracts Deleted Successfully:');
           
            const script = `
                <script>
                    alert('All Contracts Deleted Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Deleting Contract:', error);
        res.status(500).send('Error Deleting Contract');
    }
});

router.post('/contract/tenant', async (req, res) => {
    try{
        if(req.body.button === 'deleteB'){
            const idIn = new ObjectId(req.body.contractID); // Use the string ID directly
            const findContract = await Contract.findOne({_id: idIn});
            
            const contractFound =[findContract];
            if(contractFound.length > 0){
                let tenantsArray = findContract.tenants;
                const nameT = req.body.fname +' '+req.body.sname; // Use the string ID directly
                var tenantFound = false;

                var findTenant = await Tenant.find({fname: req.body.fname, sname: req.body.sname});
                //searched to check if a user being deleted exists
                if(findTenant.length > 0){
                    tenantFound = true;
                }
                
                if(tenantFound){
                    for(let i = 0; i < contractFound.length; i++){
                        if(nameT !== contractFound[i]){
                            tenantFound =false; 
                        }
                    }
                    if(tenantFound){
                        console.log('Tenant', nameT, 'found!');
                        tenantsArray = tenantsArray.filter(e => e !== nameT)
                        await Contract.updateOne({_id: idIn}, {$set: {tenants: tenantsArray}});
                        console.log('Tenant Deleted Successfully:')
                    }else{
                        console.log('Tenant ', nameT, 'was NOT found in Contract!');
                        const notFound = `
                            <script>
                                alert('TENANT NOT FOUNT IN CONTRACT!');
                                window.location.href = '/delete/contract';
                            </script>
                        `;
                    res.status(500).send(notFound);
                    return
                    }
                }else{
                    console.log('Tenant ', nameT, 'was NOT found in DB!');
                    const notFound = `
                        <script>
                            alert('TENANT NOT FOUND!');
                            window.location.href = '/delete/contract';
                        </script>
                    `;
                    res.status(500).send(notFound);
                    return
                }
                
                const script = `
                    <script>
                        alert('Deleted Tenant From Contract Successfully!');
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
            await Contract.deleteMany({});
            console.log();
            console.log('All Contracts Deleted Successfully:');
           
            const script = `
                <script>
                    alert('All Contracts Deleted Successfully!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Deleting Contract:', error);
        res.status(500).send('Error Deleting Contract');
    }
});

module.exports = router;