function requireLogin (req,res,next) {
    if (req.session.username == null) {
        res.status(401);
        res.send("need login");
        return;
    }

    next();
}

function roleMenu (req,res,next) {
    if (req.session) {
        
    }
}


module.exports = {
    requireLogin
}