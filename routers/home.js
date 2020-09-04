const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('index',msg);
});

router.post('/', (req, res) => {
    let msg = {
        error: null,
        username: req.session.username
    }
    res.render('index',msg);
})

module.exports = router;