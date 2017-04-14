var mongoose = require('mongoose');
var Board = mongoose.model('Board');

module.exports = function(app, passport) {
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/board',
    //     failureRedirect: '/login', // redirect back to the signup page if there is an error
    //     failureFlash: 'Invalid username or password.', // allow flash messages
    //     successFlash: 'Welcome!',
    //     session: true
    // }));

    // app.post('/login',
    //     passport.authenticate('local-login', {
    //         successRedirect: '/board',
    //         failureRedirect: '/login',
    //         failureFlash: true
    //     }));
    // function(req, res) {
    //     if (req.isAuthenticated()) {
    //         res.send({ 'message': 'successfully logged in' });
    //     } else {
    //         res.send({ 'message': 'please provide valid email & password' });
    //     }

    // });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (info) {
                return res.send(info);
            }
            if (!user) {
                return res.send({ 'message': 'Not a register user' });
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send({ 'message': 'successfully logged in' });
            });
        })(req, res, next);
    });




    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/board',
            failureRedirect: '/login',

        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account" }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/board',
            failureRedirect: '/login'
        }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        // res.render('connect-local.ejs', { message: 'loginMessage' });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/board',
            failureRedirect: '/login'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'], prompt: "select_account" }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect: '/board',
            failureRedirect: '/login'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    // app.get('/unlink/twitter', isLoggedIn, function(req, res) {
    //     var user = req.user;
    //     user.twitter.token = undefined;
    //     user.save(function(err) {
    //         res.redirect('/profile');
    //     });
    // });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
    app.get('/board', isLoggedIn, function(req, res, next) {
        var user = req.user;
        //res.json(user);
        next();
    });
    app.get('/', isLoggedIn, function(req, res, next) {
        var user = req.user;
        //res.json(user);
        next();
    });
    app.get('/userData', isLoggedIn, function(req, res, next) {
        var user = req.user;
        res.json(user);
        next();
    });
    app.get('/chore/c/:boardid/:boardname', isLoggedIn, function(req, res, next) {
        next();
    });

    app.get('/chore/c/:boardid/:boardname', function(req, res, next) {
        //console.log(req.params.boardid, 187);
        Board.findOne({ 'boardId': req.params.boardid }, function(err, result) {
            if (err) {
                //console.log(err);
                //res.redirect('/board');
                throw err;
            }
            if (!result) {
                res.redirect('/board');
            }
        });
        next();
    });



};



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}