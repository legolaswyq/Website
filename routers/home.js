const express = require('express');
const ArticleModel = require('../models/article');
const AccountModel = require('../models/account');


const router = express.Router();

router.get('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username,
        articles: null
    }
    ArticleModel.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            return;
        }

        msg.articles = docs;
        res.render('index', msg);
    })
});

router.post('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('index', msg);
})


function getArticle() {

}

function addArticle() {
    let data = {
        username: "walter",
        title: 1,
        content: `this is the 1 article`,
        date: new Date()
    }
    let newArticle = new ArticleModel(data);
    newArticle.save();

}

module.exports = router;