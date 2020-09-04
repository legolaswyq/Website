const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')

module.exports = function (app) {
    // setup body-parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    //setup static file path
    app.use(express.static('public'));

    //setup view engine
    app.set('view engine', 'ejs');

    //setup session
    app.use(session({
        secret: 'i am handsome',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60  } // 1hour
    }))
}