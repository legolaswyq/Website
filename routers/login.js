const express = require('express');
const md5 = require('md5');
const AccountModel = require('../models/account');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login',{error:null});
});

router.post('/', (req, res) => {
    //get input
    let data = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    //get account detail from database
    AccountModel.find({ username: data.username }, (err, docs) => {
        let errorMsg;
        if (err) {
            errorMsg = 'Error connecting to database';
            console.log(err);
            res.render('login', { error: errorMsg });
            return;
        }

        if (docs.length == 0) {
            errorMsg = 'Username is not exist';
            res.render('login', { error: errorMsg });
            return;
        }
        

        if (docs[0].password != data.password) {
            errorMsg = 'Password is not correct';
            res.render('login', { error: errorMsg });
            return;
        }

        req.session.username = data.username;
        res.render('index');
    })
    
})


module.exports = router;