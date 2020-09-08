const express = require('express');
const ArticleModel = require('../models/article');
const AccountModel = require('../models/account');


const router = express.Router();

router.get('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username,
        articles: null,
        count: null,
        currentPage: 1
    }

    ArticleModel.countDocuments((err, count) => {
        if (err) {
            console.log(err);
            return;
        }
        msg.count = count;

        ArticleModel.
        find().
        limit(10).
        sort({ "id": -1 }).
        exec((err, docs) => {
            if (err) {
                console.log(err);
                return;
            }
            msg.articles = docs;
            res.render('index', msg);
        });
    })
});

router.post('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('index', msg);
})

router.get('/articles/id=:id', (req, res) => {
    let id = req.params['id'];
    let data = {
        username: req.session.username,
        article: null
    }
    
    ArticleModel.
        find({ id: id }).
        exec((err, docs) => {
            if (err) {
                console.log(err);
                return;
            }
            data.article = docs[0];
            res.render('article', data);
        })
})

router.get('/page/:currentPage', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username,
        articles: null,
        count: null,
        currentPage: req.params['currentPage']
    }

    ArticleModel.countDocuments((err, count) => {
        if (err) {
            console.log(err);
            return;
        }
        msg.count = count;

        ArticleModel.
        find().
        limit(10).
        sort({ "id": -1 }).
        exec((err, docs) => {
            if (err) {
                console.log(err);
                return;
            }
            msg.articles = docs;
            res.render('index', msg);
        });
    })
});
module.exports = router;