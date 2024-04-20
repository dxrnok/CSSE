const { MongoClient, ServerApiVersion } = require('mongodb');
const connect = require("./atlas_connect");
const client = new MongoClient(connect.database.url, {useUnifiedTopology: true});
const dbName = 'CS230';

client.connect(function(err){
    assert.equals(null, err);
    console.log('Successfully Connected to Server!');

    const db = client.db('dbName');
})