//require router module
const express = require('express');
const router = express.Router();
//require database AccountModel
const AccountModel = require('../models/account');
const assert = require('assert');
//require MD5
const md5 = require('md5');

router.get('/', (req, res) => {
    let username = req.session.username;
    let msg = {
        error: null,
        username: username
    }

    if (username) {
        res.render('index', msg);
        return;
    }

    res.render('reg', msg);
})

router.post('/', (req, res) => {
    //get input
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password)
    }
    //check database if has same username
    let msg = {
        error: null,
        username: undefined
    }

    if (!isValidEmail(data.email)) {
        msg.error = 'Invalid email address';
        res.render('reg',msg);
        return;
    }

    let newAccount = new AccountModel(data);
    newAccount.save((err) => {
        if (err) {
            msg.error = 'Username already exist';
            res.render('reg', msg);
            return;
        }
        res.redirect('login');
    });
    
    

})

function isValidEmail(email) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(email);
}


module.exports = router;