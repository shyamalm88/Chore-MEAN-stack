var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
var multer = require('multer');
var fs = require('fs');
var boardController = require("../controller/board_controller");




cloudinary.config({
    cloud_name: 'shyamal',
    api_key: '517683456484993',
    api_secret: 'r-ZR3H2rRvvcGr8wVYxxEZlfN5A',
});


var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var path = null;
app.route("/imageUpload")
    .post(multer({ dest: "./uploads/" }).single("cover"), function(req, res) {
        console.log(req);
        path = req.file.path;
        res.send(req.file);
    });


app.route('/board')
    .get(function(req, res) {
        boardController.getAllBoards(function(results) { res.json(results); });
    })
    .post(function(req, res) {
        boardController.addNewBoard(req.body, function(data) {
            if (path) {
                //cloudinary image upload code
                cloudinary.uploader.upload(path, function(result) {
                    var secureCoverImageUrl = result.secure_url; // cover image url
                    var secureCoverImageId = result.public_id; // cover image id
                    var editData = data.board;
                    //delete temp files from uploads
                    if (path) {
                        //if path exist then delete
                        fs.unlink(path, (err) => {
                            if (err) throw err;
                            console.log('successfully deleted ' + path);
                        });
                    }
                    //assign images into board entry
                    if (data) {
                        editData.coverImageUrl = secureCoverImageUrl;
                        editData.coverImageID = secureCoverImageId;
                    }

                    //if cover images are uploaded then edit board data with image url and image ID
                    boardController.editBoard(editData, editData._id, function(editedData) {
                        //setting the path variable again null to work properly
                        path = null;
                        res.json(editedData);
                    })

                });
            } else {
                // if no image added then return original data with out edit.
                res.json(data);
            }

        });
    });

app.route('/board/:index')
    .get(function(req, res) {
        boardController.getBoardDetails(req.params, function(results) { res.json(results); });
    })
    .post(function(req, res) {
        boardController.addNewBoard(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .put(function(req, res) {
        boardController.editBoard(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .delete(function(req, res) {
        boardController.deleteBoard(req.params.index, function(results) {
            res.json(results);
        });
    });





module.exports = app;