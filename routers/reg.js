//require router module
const express = require('express');
const router = express.Router();
//require database AccountModel
const AccountModel = require('../models/account');
const assert = require('assert');

router.get('/', (req, res) => {
    res.render('reg');
})

router.post('/', (req, res) => {
    //save data into database
    let data = req.body;
    let newAccount = new AccountModel({
        username: data.username,
        email: data.email,
        password: data.password
    });
    newAccount.save(function  (err) {
        assert.equal(null, err);
        console.log('success');
    });
    res.render('login');
})

module.exports = router;