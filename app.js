//require modules
const assert = require('assert');
const express = require('express');

const middleware = require('./controllers/middleware');
const methodOverride = require('method-override');


//init app
const app = express();

//fire middleware
middleware(app);

//fire route
// route(app);

//load login module
const home = require('./routers/home')
app.use('/', home);
app.use('/home', home);
//load login module
const login = require('./routers/login')
app.use('/login', login);
//load reg module
const register = require('./routers/reg')
app.use('/reg', register);
//publish
const publish = require('./routers/publish')
app.use('/publish', publish);
//your article
const yourArticles = require('./routers/yourArticles')
app.use('/yourArticles', yourArticles);
//method override
app.use(methodOverride('_method'));

//listen to port 3000
app.listen(3000, (err) => {
    assert.equal(null, err);
    console.log('Server is listening to port 3000');
});