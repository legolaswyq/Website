const express = require('express');
const ArticleModel = require('../models/article');
const AccountModel = require('../models/account');
const { requireLogin,setArticle, setMenu } = require('../controllers/author');

const router = express.Router();

router.get('/',setMenu, (req, res) => {
    ArticleModel.find().sort({ 'id': -1 }).limit(1).exec((err, docs) => {
        if (err) {
            console.log(err);
            return;
        }
        req.session.startPoint = docs[0].id;
        res.redirect('/page/1');
    })
});

router.post('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('index', msg);
})

router.get('/articles/id=:id',setMenu, (req, res) => {
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

    ArticleModel.countDocuments((err, count) => {
        if (err) {
            console.log(err);
            return;
        }
        msg.count = count;
        
        ArticleModel.
            find({ "id": { $lte: req.session.startPoint } }).
            limit(10).
            sort({ "id": -1 }).
            skip((currentPage-1) * 10).
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