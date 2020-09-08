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
    let date = format(id, 'yyyy-mm-dd HH:MM:ss');
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

function add200Ariticle() {
    for (let i = 0; i < 200; i++) {
        let id = Date.now();
        let date = format(id, 'yyyy-mm-dd HH:MM:ss');
        let data = {
            username: `walter`,
            title: `Lorem Ipsum${i}`,
            content: `Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            date: date,
            id: id
        }
        let newArticle = new ArticleModel(data);
        newArticle.save();
    }
}

module.exports = router;