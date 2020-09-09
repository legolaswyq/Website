//require router module
const express = require('express');
const router = express.Router();
//require database AccountModel
const ArticleModel = require('../models/article');
const { requireLogin } = require('../controllers/author');

router.get('/',requireLogin, (req, res) => {
    res.redirect('/yourArticles/page/1')
});

router.post('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('yourArticles', msg);
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

    let currentPage = req.params['currentPage'];

    let msg = {
        error: null,
        username: req.session.username,
        articles: null,
        count: null,
        currentPage: currentPage
    }

    ArticleModel.find({ "username": req.session.username}).countDocuments((err, count) => {
        if (err) {
            console.log(err);
            return;
        }
        msg.count = count;
        
        ArticleModel.
            find({ "username": req.session.username}).
            limit(10).
            sort({ "id": -1 }).
            skip((currentPage-1) * 10).
            exec((err, docs) => {
            if (err) {
                console.log(err);
                return;
            }
            msg.articles = docs;
            res.render('yourArticles', msg);
            });

    
    })
});


module.exports = router;