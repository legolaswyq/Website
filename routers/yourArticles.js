//require router module
const express = require('express');
const router = express.Router();
//require database AccountModel
const ArticleModel = require('../models/article');
const { requireLogin,setArticle, setMenu } = require('../controllers/author');

router.get('/',requireLogin, (req, res) => {
    res.redirect('/yourArticles/page/1')
});


router.get('/articles/id=:id',setArticle,setMenu, (req, res) => {
    let id = req.params['id'];
    let data = {
        username: req.session.username,
        article: null,
        menu: req.session.menu
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

router.get('/delete/:id', (req, res) => {
    let id = req.params['id'];
    ArticleModel.deleteOne({ id: id }).exec((err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/yourArticles');
    })
})

router.get('/modify/:id', (req, res) => {
    let id = req.params['id'];
    let msg = {
        username: req.session.username,
        article: null
    }
    ArticleModel.find({ id: id }).exec((err,docs) => {
        if (err) {
            console.log(err);
            return;
        }
        msg.article = docs[0];
        res.render('modify',msg);
    })
})

router.post('/modify/:id', (req, res) => {
    let msg = {
        id: req.body.id,
        username: req.session.username,
        content: req.body.content,
        title: req.body.title
    }
    ArticleModel.findOneAndUpdate({ id: msg.id }, msg).exec((err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect(`/yourArticles/articles/id=${msg.id}`);
    })
})


module.exports = router;