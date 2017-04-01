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
        //console.log(req);
        path = req.file.path;
        res.send(req.file);
    });
app.route('/deleteImage/:boardID/:imageID')
    .put(function(req, res) {
        var imageID = req.params.imageID;

        cloudinary.uploader.destroy(imageID, function(result) {
            if (result.result === 'ok') {
                var data = req.body;
                data.coverImageID = '';
                data.coverImageUrl = '';
                boardController.editBoard(data, req.params.boardID, function(results) {
                    res.json(results);
                });
            }
        });
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
                            //console.log('successfully deleted ' + path);
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
        if (path) {
            cloudinary.uploader.upload(path, function(result) {
                var secureCoverImageUrl = result.secure_url; // cover image url
                var secureCoverImageId = result.public_id; // cover image id
                var editData = req.body;
                //delete temp files from uploads
                if (path) {
                    //if path exist then delete
                    fs.unlink(path, (err) => {
                        if (err) throw err;
                        //console.log('successfully deleted ' + path);
                    });
                }
                //assign images into board entry
                if (editData) {
                    editData.coverImageUrl = secureCoverImageUrl;
                    editData.coverImageID = secureCoverImageId;
                    boardController.editBoard(editData, req.params.index, function(results) {
                        path = null;
                        res.json(results);
                    });
                }
            });
        } else {
            var editData = req.body;
            if (editData.coverImageUrl === '' && editData.coverImageID === '') {
                editData.coverImageUrl = '';
                editData.coverImageID = '';
            }

            boardController.editBoard(editData, req.params.index, function(results) {
                path = null;
                res.json(results);
            });

        }

    })
    .delete(function(req, res) {
        boardController.deleteBoard(req.params.index, function(results) {
            res.json(results);
        });
    });








module.exports = app;