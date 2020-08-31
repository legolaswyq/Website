module.exports = function (app) {
    
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/home', (req, res) => {
        res.render('index');
    });


    app.get('/login', (req, res) => {
        res.render('login');
    })

    app.get('/reg', (req, res) => {
        res.render('reg');
    })

    
}


