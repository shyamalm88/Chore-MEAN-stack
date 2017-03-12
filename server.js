var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var router = express.Router();


var app = express();



// app usage codes
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



var api = require('./server/routes/boardRoutes');
// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
app.use('/api', api);

require('./server/config/passport')(passport); // pass passport for configuration
app.use(session({
    secret: 'ArghyaChoreTrello', // session secret
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes ======================================================================
require('./server/routes/authRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//indicating routing files to index.html
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});




//mongodb connection
var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);










var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Server up: http://localhost:' + port);
});