//require router module
const express = require('express');
const router = express.Router();
//require database AccountModel
const AccountModel = require('../models/account');
const assert = require('assert');
//require MD5
const md5 = require('md5');

router.get('/', (req, res) => {
    res.render('reg', {error: null});
})

router.post('/', (req, res) => {
    //get input
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password)
    }
    //check database if has same username
    AccountModel.find({ username: data.username }, function (err, docs) {
        let errorMsg;
        if (err) {
            errorMsg = 'Error connect to database';
            console.log(err);
            res.render('reg',{error: errorMsg})
            return;
        }
        //check username is duplicated 
        if (docs.length > 0) {
            errorMsg = 'Username already exist';
            res.render('reg', { error: errorMsg });
            return;
        }
        //verify data
        if (!isValidEmail(data.email)) {
            errorMsg = 'Invalid email address';
            res.render('reg', { error: errorMsg });
            return;
        }
        //save data into database
        let newAccount = new AccountModel(data);
        newAccount.save();
        res.render('login',{error:null})
    
    })

})

function isValidEmail(email) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(email);
}

module.exports = router;