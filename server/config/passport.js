// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// load up the user model
var User = require('../models/user');
var teamMember = require('../models/teamMember');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function() {
                User.findOne({ 'local.email': email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }
                    // if no user is found, return the message
                    if (!user) {
                        return done(null, false, { message: 'Not a register user' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    // all is well, return user
                    else {
                        return done(null, user);
                    }
                });
            });

        }));


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true; // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
        function(req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'facebook.id': profile.id }, function(err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)

                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.name = profile.displayName;
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                                user.facebook.image = profile.photos[0].value;
                                user.save(function(err) {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            User.findOne({ 'local.email': (profile.emails[0].value || '').toLowerCase() }, function(err, user) {
                                if (err) {
                                    console.log(err);
                                }
                                if (user) {
                                    user.facebook.token = token;
                                    user.facebook.name = profile.displayName;
                                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                                    user.facebook.image = profile.photos[0].value;
                                    user.save(function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, user);
                                    });
                                } else {
                                    var newUser = new User();
                                    var newTeamMember = new teamMember();

                                    newUser.facebook.id = profile.id;
                                    newUser.facebook.token = token;
                                    newUser.facebook.name = profile.displayName;
                                    newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                                    newUser.facebook.image = profile.photos[0].value;

                                    newTeamMember.name = newUser.facebook.name;
                                    newTeamMember.email = newUser.facebook.email;
                                    newTeamMember.image = newUser.facebook.image;

                                    newUser.save(function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, newUser);
                                    });

                                    newTeamMember.save(function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, newTeamMember);
                                    });
                                }
                            });

                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = profile.displayName;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                    user.facebook.image = profile.photos[0].value;
                    user.save(function(err) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, user);
                    });

                }
            });

        }));


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

        },
        function(req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'google.id': profile.id }, function(err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.google.token) {
                                user.google.token = token;
                                user.google.name = profile.displayName;
                                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                                user.google.image = profile._json.image.url; //pull the profile image

                                user.save(function(err) {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {
                            User.findOne({ 'local.email': (profile.emails[0].value || '').toLowerCase() }, function(err, user) {
                                if (err) {
                                    console.log(err);
                                }
                                if (user) {
                                    user.google.token = token;
                                    user.google.name = profile.displayName;
                                    user.google.email = (profile.emails[0].value || '').toLowerCase();
                                    user.google.image = profile.photos[0].value;
                                    user.save(function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, user);
                                    });
                                } else {
                                    var newUser = new User();
                                    var newTeamMember = new teamMember();

                                    newUser.google.id = profile.id;
                                    newUser.google.token = token;
                                    newUser.google.name = profile.displayName;
                                    newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                                    newUser.google.image = profile._json.image.url; //pull the profile image

                                    newTeamMember.name = newUser.google.name;
                                    newTeamMember.email = newUser.google.email;
                                    newTeamMember.image = newUser.google.image;

                                    newUser.save(function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, newUser);
                                    });

                                    newTeamMember.save(function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, newTeamMember);
                                    });
                                }
                            });


                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                    user.google.image = profile._json.image.url; //pull the profile image

                    user.save(function(err) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, user);
                    });

                }

            });

        }));

};