//require modules
const assert = require('assert');
const express = require('express');
const middleware = require('./controllers/middleware');
const route = require('./controllers/route');


//init app
const app = express();

//fire middleware
middleware(app);

//fire route
route(app);

//listen to port 3000
app.listen(3000, (err) => {
    assert.equal(null, err);
    console.log('Server is listening to port 3000');
});