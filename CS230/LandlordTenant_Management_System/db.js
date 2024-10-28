const connect = require('./connection/atlas_connect');  //connection uri for atlas
const mongoose = require('mongoose');

//DATABASE CONNECTION
mongoose.connect(connect.database.url,{}).then(() => {
    console.log('Successfully Connected To MongoDB!');
}).catch(error => {
    // Ensures that the client will close when you finish/error
    console.error(error);
    //client.close();
});

//SCHEMAS
//declaring schemas
const LandlordSchema = new mongoose.Schema({
    title: String,
    fname: String,
    sname: String,
    mobile: String,
    email: String,
    dob: String,
    councilPermission: String,
    contact: String
},{versionKey: false}); //get rid of the __v in database

const LandlordASchema = new mongoose.Schema({
    ID: mongoose.Types.ObjectId,
    address1: String,
    address2: String,
    town: String,
    city: String,
    eircode: String
},{versionKey: false}); //get rid of the __v in database

const TenantSchema = new mongoose.Schema({
    title: String,
    fname: String,
    sname: String,
    mobile: String,
    email: String,
},{versionKey: false}); //get rid of the __v in database

const TenantASchema = new mongoose.Schema({
    ID: mongoose.Types.ObjectId,
    address1: String,
    address2: String,
    town: String,
    city: String,
    eircode: String
},{versionKey: false}); //get rid of the __v in database

const ContractSchema = new mongoose.Schema({
    contractDate: String,
    propertyAddress: String,
    tenants: [String],
    landlord: String,
    fee: Number,
    propertyDoor: Number,
    contractLength: String,
    propertyType: String
},{versionKey: false}); //get rid of the __v in database

//i passed the third arg becasue it was creating a new colletion all in lower case
//creates a schema to export to router
const Landlord = mongoose.model('LandlordDetails', LandlordSchema, 'LandlordDetails'); 
const LandlordA = mongoose.model('LandlordAddress', LandlordASchema, 'LandlordAddress'); 
const Tenant = mongoose.model('TenantDetails', TenantSchema, 'TenantDetails'); 
const TenantA = mongoose.model('TenantAddress', TenantASchema, 'TenantAddress'); 
const Contract = mongoose.model('LandlordTenantContract', ContractSchema, 'LandlordTenantContract');

module.exports = {Landlord, LandlordA, Tenant, TenantA, Contract};