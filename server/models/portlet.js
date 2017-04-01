var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cloudinary = require('cloudinary');
var multer = require('multer');
var fs = require('fs');
var boardController = require("../controller/board_controller");
var Board = mongoose.model('Board');




cloudinary.config({
    cloud_name: 'shyamal',
    api_key: '517683456484993',
    api_secret: 'r-ZR3H2rRvvcGr8wVYxxEZlfN5A',
});


var app = express();





app.route('/portlet/:index')
    .get(function(req, res) {
        Board.findOne({ 'boardId': req.params.index }, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    })
    .put(function(req, res) {
        Board.findOne({ 'boardId': req.params.index }, function(err, result) {
            if (err) throw err;
            if (!result) {
                res.json({
                    message: "Board with ID: " + req.params.index + " not found.",
                });
            }

            function makeId() { // Public Domain/MIT
                var d = new Date().getTime();
                if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                    d += performance.now(); //use high-precision timer if available
                }
                return 'xyyxyy-xyxyy-xxyx-xyxyx'.replace(/[xy-]/g, function(c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'y' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }
            var portletId = makeId();
            if (result) {
                result.portlet.push({
                    "portletName": req.body.portletname,
                    "portletId": portletId,
                    "portletCards": [],
                    "portletCreatedOn": new Date()
                });
                result.save(function(err, result) {
                    if (err) throw err;
                    res.json({
                        message: "Successfully updated the portlet",
                        board: result
                    });
                });
            }


        });

    });

app.route('/edit/portlet/:portletId')
    .put(function(req, res) {
        Board.findOne({ 'portlet.portletId': req.params.portletId }, function(err, result) {
            var result = result;
            var dataToSave;
            result.portlet.forEach(function(element) {
                if (element.portletId === req.params.portletId) {
                    var index = result.portlet.indexOf(element);
                    result.portlet.splice(index, 1);
                }
            });
            result.save(function(err, result) {
                if (err) throw err;
                res.json({
                    message: 'Successfully deleted the portlet',
                    board: result
                });
            });


        });
    });


module.exports = app;