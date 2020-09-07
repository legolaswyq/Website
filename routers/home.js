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
            console.log(docs);
            res.render('index', msg);
        });
});
router.post('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('index', msg);
})



module.exports = router;