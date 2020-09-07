const express = require('express');
const router = express.Router();
const ArticleModel = require('../models/article');
const AccountModel = require('../models/account');
const format = require('dateformat');

router.get('/', (req, res) => {
    let msg = {
        username: req.session.username,
    }
    res.render('publish', msg);
})

router.post('/', (req, res) => {
    
    let id = Date.now();
    let date = format(id,'yyyy-mm-dd HH:MM:ss');
    let data = {
        username: req.session.username,
        title: req.body.title,
        content: req.body.content,
        date: date,
        id: id
    }

    let newArticle = new ArticleModel(data);
    newArticle.save((err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/');
    });
    

})

module.exports = router;