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



//indicating routing files to index.html
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

//mongodb connection
var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);






var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server up: http://localhost:' + port);
});