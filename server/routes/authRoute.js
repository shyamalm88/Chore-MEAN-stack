module.exports = function(app, passport) {






};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log(res);
    if (req.isAuthenticated())
        return next();

    res.redirect('http://localhost:4200/');
}