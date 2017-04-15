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
            var portletId = makeId('xyyxyy-xyxyy-xxyx-xyxyx');
            if (result) {
                result.portlet.push({
                    "portletName": req.body.portletname,
                    "portletId": portletId,
                    "portletCards": [],
                    "portletCreatedOn": new Date()
                });
                result.markModified('portlet');
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
            var responseResult = result;
            responseResult.portlet.forEach(function(element) {
                if (element.portletId === req.params.portletId) {
                    var index = result.portlet.indexOf(element);
                    responseResult.portlet.splice(index, 1);
                }
            });
            responseResult.save(function(err, result) {
                if (err) throw err;
                res.json({
                    message: 'Successfully deleted the portlet',
                    board: result
                });
            });


        });
    });

app.route('/add/cards/:portletId')
    .put(function(req, res) {
        Board.findOne({ 'portlet.portletId': req.params.portletId }, function(err, result) {
            if (err) throw err;
            if (!result) {
                res.json({
                    message: "Board with ID: " + req.params.portletId + " not found.",
                });
            }
            var portletCardId = makeId('yxcay-xyxyy-xayx-xycyx');
            if (result) {
                var responseCardResult = result;
                responseCardResult.portlet.forEach(function(element) {
                    if (element.portletId === req.params.portletId) {
                        element.portletCards.push({
                            "portletCardName": req.body.cardlabel,
                            "portletCardId": portletCardId,
                            "portletCardTagLine": "",
                            "portletCardCreatedOn": new Date(),
                            "portletCardUpdatedOn": new Date(),
                            "portletCardsImages": [],
                            "portletCardsAttachments": [],
                            "portletCardsComments": [],
                            "portletCardsMembers": [],
                            "portletCardsTodo": [],
                            "portletCardsDescription": '',
                            "portletCardDueDate": '',
                        });

                        responseCardResult.markModified('portlet');
                        responseCardResult.save(function(err, result) {
                            if (err) {
                                throw err;
                            }
                            res.json({
                                message: 'Successfully added card',
                                board: result
                            });
                        });
                    }
                });
            }
        });

    });

app.route('/edit/cards/:portletId/:editField')
    .put(function(req, res) {
        var editField = req.params.editField;
        Board.findOne({ 'portlet.portletCards.portletCardId': req.params.portletId }, function(err, result) {
            if (err) throw err;
            if (!result) {
                res.json({
                    message: "portlet card with ID: " + req.params.portletId + " not found.",
                });
            }
            if (result) {
                var responseCardResult = result;
                responseCardResult.portlet.forEach(function(element) {
                    var elm = element;
                    elm.portletCards.forEach(function(card) {
                        if (card.portletCardId === req.params.portletId) {
                            card[editField] = req.body[editField];
                            console.log(req.body)
                            card.portletCardUpdatedOn = new Date();
                            responseCardResult.markModified('portlet');
                            responseCardResult.save(function(err, result) {
                                if (err) {
                                    throw err;
                                }
                                res.json({
                                    message: 'Successfully added card',
                                    board: result
                                });
                            });
                            if (editField === 'portletCardsComments') {
                                card.portletCardsComments.push(req.body);
                                card.portletCardUpdatedOn = new Date();
                                responseCardResult.markModified('portlet');
                                responseCardResult.save(function(err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    res.json({
                                        message: 'Successfully added comments',
                                        board: result
                                    });
                                });
                            } else {
                                card[editField] = req.body[editField];
                                console.log(req.body)
                                card.portletCardUpdatedOn = new Date();
                                responseCardResult.markModified('portlet');
                                responseCardResult.save(function(err, result) {
                                    if (err) {
                                        throw err;
                                    }
                                    res.json({
                                        message: 'Successfully added value',
                                        board: result
                                    });
                                });
                            }
                        }
                    })
                });

            }
        })
    })

app.route('/move/:movedCardId/:movedFromPortletId/:movedIntoPortletId')
    .put(function(req, res) {
        var movedFromPortletId = req.params.movedFromPortletId;
        var movedIntoPortletId = req.params.movedIntoPortletId;
        var cardId = req.params.movedCardId;

        Board.findOne({ 'portlet.portletId': movedFromPortletId }, function(err, result) {
                var copiedElem;
                if (err) {
                    throw err;
                }
                if (!result) {
                    res.json({
                        message: "portlet card with ID: " + movedFromPortletId + " not found.",
                    });
                }
                result.markModified('portlet');
                var responseResult = result;
                responseResult.portlet.forEach(function(element) {
                    if (element.portletId === req.params.movedFromPortletId) {
                        copiedElem = element.portletCards.splice(index, 1);
                        var index = result.portlet.indexOf(element);
                        element.portletCards.splice(index, 1);
                    }
                });
                responseResult.save(function(err, result) {
                    if (err) {
                        throw err
                    }
                    Board.findOne({ 'portlet.portletId': movedIntoPortletId }, function(err, result) {
                        //console.log(result);
                        result.portlet.forEach(function(portlet) {
                            //console.log(portlet.portletId === movedIntoPortletId)
                            if (portlet.portletId === movedIntoPortletId) {
                                portlet.portletCards.push(copiedElem[0]);
                            }
                        });
                        result.markModified('portlet');
                        result.save(function(err, result) {
                            if (err) {
                                throw err;
                            }
                            res.json({
                                message: 'Successfully added card',
                                board: result
                            });
                        });

                    });
                })





            })
            //console.log(req);

    });

function makeId(pattern) { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return pattern.replace(/[xy-]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'y' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

module.exports = app;