//require router module
const express = require('express');
const router = express.Router();
//require database AccountModel
const AccountModel = require('../models/account');
const assert = require('assert');
//require MD5
const md5 = require('md5');

router.get('/', (req, res) => {
    res.render('reg');
})

router.post('/', async (req, res) => {
    //save data into database
    let data = req.body;
    if (await verifyData(data)) {
        addNewAccountToDB(data);
        res.render('login');
    } else {
        let errorMessage = `invalid username or password`;
        res.render('reg',{msg:errorMessage});
    }
})


function addNewAccountToDB (data) {
    let newAccount = new AccountModel({
        username: data.username,
        email: data.email,
        password: md5Password(data.password)
    });
    newAccount.save(function  (err) {
        assert.equal(null, err);
    });
}

async function verifyData (data) {
    let isDataValid = false;
    if (verifyEmail(data.email) && await verifyName(data.username) && verifyPassword(data.password)) {
        isDataValid = true;
    }
    return isDataValid;
}


function verifyEmail (email) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(email);
}

async function verifyName(username) {
    let isValid = true;
    //check length
    if (username.length < 5) {
        isValid = false;
        return isValid;
    }
    //check no duplicated username in db
    await AccountModel.find({ username: username }, (err,result) => {
        assert.equal(null, err);
        if (result.length > 0) {
            isValid = false;
        }
    })
    return isValid;
}

function verifyPassword (password) {
    return password.length >= 8;
}

function md5Password (password) {
    return md5(password);
}

module.exports = router;