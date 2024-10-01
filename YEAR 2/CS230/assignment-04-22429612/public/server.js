
const myDB = require('./connection');
const userControl = require('./functions');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON bodies

// Endpoint to create a new user
app.post('/createUser', function(req, res) {
    const { title, firstnames, surname, mobileNO, email, address1, address2, town, city, eircode } = req.body;
    userControl.createUser(title, firstnames, surname, mobileNO, email, address1, address2, town, city, eircode, function(err, result) {
        if (err) {
            res.status(500).json({ message: 'Error creating user' });
            return;
        }
        res.json({ message: 'User created successfully' });
    });
});

// Endpoint to search for users by name
app.get('/searchUser', function(req, res) {
    const name = req.query.name;
    userControl.searchUsersByName(name, function(err, results) {
        if (err) {
            res.status(500).json({ message: 'Error searching users' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to delete a user by email
app.delete('/deleteUser', function(req, res) {
    const email = req.body.email;
    userControl.deleteUser(email, function(err, result) {
        if (err) {
            res.status(500).json({ message: 'Error deleting user' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'assginment-04.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});

module.exports = {
  createUser: createUser,
  searchUsersByName: searchUsersByName
};