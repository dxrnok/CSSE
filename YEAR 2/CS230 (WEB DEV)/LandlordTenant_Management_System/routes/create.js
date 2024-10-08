const express = require('express');
const router = express();

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

module.exports = router;