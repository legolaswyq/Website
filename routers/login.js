const express = require('express');
const md5 = require('md5');
const AccountModel = require('../models/account');
const router = express.Router();
const format = require('date-format');



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
    console.log();

    res.render('login', msg);
});

router.post('/', (req, res) => {
    //get input
    let data = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    //get account detail from database
    AccountModel.find({ username: data.username }, (err, docs) => {
        let msg = {
            error: null,
            username: undefined
        };
        if (err) {
            msg.error = 'Error connecting to database';
            console.log(err);
            res.render('login', msg);
            return;
        }

        if (docs.length == 0) {
            msg.error = 'Username is not exist';
            res.render('login', msg);
            return;
        }
        

        if (docs[0].password != data.password) {
            msg.error = 'Password is not correct';
            res.render('login', msg);
            return;
        }

        req.session.username = data.username;
        msg.username = data.username;
        res.render('index',msg);
    })
    
})

router.get('/logout', (req, res) => {
    req.session.username = undefined;
    let msg = {
        error: null,
        username: undefined
    }
    res.render('login', msg);
})


module.exports = router;