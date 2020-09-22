const ArticleModel = require('../models/article');

function requireLogin(req, res, next) {
    if (req.session.username == null) {
        res.status(401);
        res.send("need login");
        return;
    }
    next();
}

function setMenu(req, res, next) {
    if (!req.session.role) {
        req.session.menu = 'basic';
    } else {
        req.session.menu = req.session.role;
    }
    next();
}

function setArticle (req,res,next) {
    let articleId = req.params["id"];
    ArticleModel.find({ id: articleId }).exec((err, docs) => {
        if (err) {
            console.log(err);
            return;
        }
        let author = docs[0].username;
        if (author != req.session.username) {
            res.status(403);
            res.send('you are not the author');
        }
        next();
    })
}


module.exports = {
    requireLogin,
    setMenu,
    setArticle
}