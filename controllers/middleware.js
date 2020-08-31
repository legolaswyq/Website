const bodyParser = require('body-parser');
const express = require('express');

module.exports = function (app) {
    // setup body-parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //setup static file path
    app.use(express.static('public'));

    //setup view engine
    app.set('view engine', 'ejs');
}