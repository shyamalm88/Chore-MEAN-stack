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



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var path = null;
var mimetype = '';
var originalname = '';
var imageurl = '';
var cardMimetype = '';
app.route("/cardImageUpload")
    .post(multer({ dest: "./uploads/" }).single("portletCardsAttachment"), function(req, res) {
        // console.log("++++++++++++++++++++++++")
        // console.log(req.file);
        path = req.file.path;
        originalname = req.file.originalname;
        mimetype = req.file.mimetype
        if (path) {
            //cloudinary image upload code
            //console.log(cloudinary.url(path, { crop: "fill" }));
            cloudinary.uploader.upload(path, function(result) {

                //delete temp files from uploads
                if (path) {
                    //if path exist then delete
                    fs.unlink(path, function(err) {
                        if (err) throw err;
                        //console.log('successfully deleted ' + path);
                    });
                }
                // editData.coverImageUrl = secureCoverImageUrl;
                // editData.coverImageID = secureCoverImageId;
                // console.log("*************************")
                // console.log(result);
                imageurl = result.secure_url;
                cardMimetype = result.resource_type;
                res.send(result);


            }, { public_id: makeId('xyyxyy-xyxyy-xxyx-xyxyx') + "/" + req.file.originalname, resource_type: "auto" });
        }

    });


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
                result.boardActivity.push({
                    activity: ['Created New Portlet named "' + req.body.portletname + '"'],
                    boardUpdatedyName: result.created_byName,
                    boardUpdatedBy: result.created_by,
                    boardOperation: 'Create Portlet',
                    boardId: result.boardId,
                    boardOperationOn: new Date(),
                })
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
            var pName = '';
            responseResult.portlet.forEach(function(element) {
                if (element.portletId === req.params.portletId) {
                    pName = element.portletName;
                    var index = result.portlet.indexOf(element);
                    responseResult.portlet.splice(index, 1);
                }
            });
            responseResult.boardActivity.push({
                activity: ['Deleted Portlet named "' + pName + '"'],
                boardUpdatedyName: responseResult.created_byName,
                boardUpdatedBy: responseResult.created_by,
                boardOperation: 'Delete Portlet',
                boardId: responseResult.boardId,
                boardOperationOn: new Date(),
            })
            responseResult.save(function(err, result) {
                if (err) throw err;
                res.json({
                    message: 'Successfully deleted the portlet',
                    board: result
                });
            });
        });
    });

app.route('/edit/comments/:commentId/:portletCardId/:editField/:action')
    .put(function(req, res) {
        Board.findOne({ 'portlet.portletCards.portletCardId': req.params.portletCardId }, function(err, result) {
            var responseResult = result;
            responseResult.portlet.forEach(function(element) {
                if (element.portletCardId === req.params.portletId) {
                    element.portletCards.forEach(function(card) {
                        if (card.portletCardId === req.params.portletCardId) {
                            card.portletCardsComments.forEach(function(comments) {
                                if (comments.portletCardCommentId === req.params.commentId) {
                                    if (req.params.action === 'edit') {
                                        comments.portletCardsComments = req.body.portletCardsComments;
                                        responseResult.portletCardUpdatedOn = new Date();
                                        card.portletCardActivity.push({
                                            "portletCardId": req.params.portletCardId,
                                            "activity": ['Edited Comment "' + req.body.portletCardsComments + '"'],
                                            "portletCardCreatedBy": result.created_by,
                                            "portletCardCreatedByName": result.created_byName,
                                            "portletCardOperation": 'Edit Comment',
                                            "portletCardOperationOn": responseResult.portletCardUpdatedOn
                                        });
                                    } else {
                                        var index = card.portletCardsComments.indexOf(comments);
                                        card.portletCardsComments.splice(index, 1);
                                        responseResult.portletCardUpdatedOn = new Date();
                                        card.portletCardActivity.push({
                                            "portletCardId": req.params.portletCardId,
                                            "activity": ['Deleted Comment "' + req.body.portletCardsComments + '"'],
                                            "portletCardCreatedBy": result.created_by,
                                            "portletCardCreatedByName": result.created_byName,
                                            "portletCardOperation": 'Delete Comment',
                                            "portletCardOperationOn": responseResult.portletCardUpdatedOn
                                        });
                                    }
                                }
                            })
                        }
                    })
                }
            });
            responseResult.markModified('portlet');
            responseResult.save(function(err, result) {
                if (err) {
                    throw err;
                }
                res.json({
                    message: 'Successfully added value',
                    board: result
                });
            });
        });
    });


app.route('/edit/cardcover/:portletCardId/:portletCardImageId')
    .put(function(req, res) {
        Board.findOne({ 'portlet.portletCards.portletCardId': req.params.portletCardId }, function(err, result) {
            var editCardCoverResult = result;
            editCardCoverResult.portlet.forEach(function(element) {
                if (element.portletCardId === req.params.portletId) {
                    element.portletCards.forEach(function(card) {
                        if (card.portletCardId === req.params.portletCardId) {
                            card.portletCardsAttachments.forEach(function(attachments) {
                                if (attachments.portletCardImageId === req.params.portletCardImageId) {
                                    card.portletCardCover = req.body.cardAttachmentUrl;
                                    editCardCoverResult.portletCardUpdatedOn = new Date();
                                    // card.portletCardActivity.push({
                                    //     "portletCardId": req.params.portletCardId,
                                    //     "activity": ['Deleted Attachment "' + req.body.cardAttachmentId + '.' + req.body.cardAttachmentFormat + '"'],
                                    //     "portletCardCreatedBy": result.created_by,
                                    //     "portletCardCreatedByName": result.created_byName,
                                    //     "portletCardOperation": 'Delete Comment',
                                    //     "portletCardOperationOn": editCardCoverResult.portletCardUpdatedOn
                                    // });

                                }
                            })
                        }
                    })
                }
            });
            editCardCoverResult.markModified('portlet');
            editCardCoverResult.save(function(err, result) {
                if (err) {
                    throw err;
                }
                res.json({
                    message: 'Successfully deleted value',
                    board: result
                });
            });
        });
    });

app.route('/delete/attachments/:portletCardId/:portletCardImageId')
    .put(function(req, res) {
        Board.findOne({ 'portlet.portletCards.portletCardId': req.params.portletCardId }, function(err, result) {
            var responseResult = result;
            responseResult.portlet.forEach(function(element) {
                if (element.portletCardId === req.params.portletId) {
                    element.portletCards.forEach(function(card) {
                        if (card.portletCardId === req.params.portletCardId) {
                            card.portletCardsAttachments.forEach(function(attachments) {
                                if (attachments.portletCardImageId === req.params.portletCardImageId) {
                                    console.log(req.body.cardAttachmentId);
                                    cloudinary.uploader.destroy(req.body.cardAttachmentId, function(imageResult) {
                                        console.log(imageResult);
                                        if (imageResult.result === 'ok') {
                                            console.log('done');
                                        }
                                    }, { resource_type: req.body.cardAttachmentMimetype, invalidate: true });
                                    var index = card.portletCardsAttachments.indexOf(attachments);
                                    if (card.portletCardCover === req.body.cardCoverUrl) {
                                        card.portletCardCover = '';
                                    }
                                    card.portletCardsAttachments.splice(index, 1);
                                    responseResult.portletCardUpdatedOn = new Date();
                                    card.portletCardActivity.push({
                                        "portletCardId": req.params.portletCardId,
                                        "activity": ['Deleted Attachment "' + req.body.cardAttachmentId + '"'],
                                        "portletCardCreatedBy": result.created_by,
                                        "portletCardCreatedByName": result.created_byName,
                                        "portletCardOperation": 'Delete Comment',
                                        "portletCardOperationOn": responseResult.portletCardUpdatedOn
                                    });

                                }
                            })
                        }
                    })
                }
            });
            responseResult.markModified('portlet');
            responseResult.save(function(err, result) {
                if (err) {
                    throw err;
                }
                res.json({
                    message: 'Successfully deleted value',
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
                            "portletCardsAttachments": [],
                            "portletCardCover": '',
                            "portletCardsComments": [],
                            "portletCardsMembers": [],
                            "portletCardsTodo": [],
                            "portletCardsDescription": '',
                            "portletCardDueDate": '',
                            "portletCardActivity": [{
                                "activity": ['Created New Card Named as "' + req.body.cardlabel + '"'],
                                "portletCardId": portletCardId,
                                "portletCardCreatedBy": responseCardResult.created_by,
                                "portletCardCreatedByName": responseCardResult.created_byName,
                                "portletCardOperation": 'Create Card',
                                "portletCardOperationOn": new Date(),
                            }],
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
        var PortletCardId = req.params.portletId;
        var editFieldDiff;
        if (editField === 'portletCardName') {
            editFieldDiff = 'Name';
        } else if (editField === 'portletCardTagLine') {
            editFieldDiff = 'Tagline';
        } else if (editField === 'portletCardsDescription') {
            editFieldDiff = 'Description';
        } else if (editField === 'portletCardDueDate') {
            editFieldDiff = 'Due Date';
        }
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
                    element.portletCards.forEach(function(card) {
                        if (card.portletCardId === req.params.portletId) {
                            if (editField === 'portletCardsComments') {
                                var portletCardCommentId = makeId('oxxay-xyxcy-xayx-xycox');
                                req.body.portletCardCommentId = portletCardCommentId;
                                card[editField].push(req.body);
                                card.portletCardUpdatedOn = new Date();
                                card.portletCardActivity.push({
                                    "portletCardId": card.portletCardId,
                                    "activity": ['Added Comment "' + req.body[editField] + '"'],
                                    "portletCardCreatedBy": result.created_by,
                                    "portletCardCreatedByName": result.created_byName,
                                    "portletCardOperation": 'Edit Comment',
                                    "portletCardOperationOn": new Date()
                                });
                            } else if (editField === 'portletCardsAttachments') {
                                var portletCardImageId = makeId('oxxay-xyxcy-xayx-xycox');
                                req.body.portletCardImageId = portletCardImageId;
                                req.body.cardAttachmentMimetype = cardMimetype;
                                req.body.cardAttachmentOriginalName = originalname;

                                if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || mimetype === 'application/msword') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/doc.svg';
                                } else if (mimetype === 'application/pdf') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/pdf.svg';
                                } else if (mimetype === 'text/plain') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/txt.svg';
                                } else if (mimetype === 'application/vnd.ms-powerpoint' || mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/ppt.svg';
                                } else if (mimetype === 'application/vnd.ms-excel' || mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/xls.svg';
                                } else if (mimetype === 'application/zip' || mimetype === 'application/octet-stream') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/zip.svg';
                                } else if (mimetype === 'image/svg+xml') {
                                    req.body.cardAttachmentThumbnail = 'http://res.cloudinary.com/shyamal/image/upload/v1493410549/icons/svg.svg';
                                } else {
                                    req.body.cardAttachmentThumbnail = imageurl;
                                }

                                card[editField].push(req.body);
                                card.portletCardUpdatedOn = new Date();
                                card.portletCardActivity.push({
                                    "portletCardId": card.portletCardId,
                                    "activity": ['Added New Attachment "<a target="_blank" href="' + req.body.cardAttachmentUrl + '">' + req.body.cardAttachmentId + '</a>"'],
                                    "portletCardCreatedBy": result.created_by,
                                    "portletCardCreatedByName": result.created_byName,
                                    "portletCardOperation": 'Added Attachment',
                                    "portletCardOperationOn": new Date()
                                });
                            } else {
                                card[editField] = req.body[editField];
                                card.portletCardUpdatedOn = new Date();
                                if (editFieldDiff === 'Due Date') {
                                    req.body[editField] = formatDate(new Date(req.body[editField]));

                                }


                                card.portletCardActivity.push({
                                    "portletCardId": card.portletCardId,
                                    "activity": ['Edited card\'s ' + editFieldDiff + ' into "' + req.body[editField] + '"'],
                                    "portletCardCreatedBy": responseCardResult.created_by,
                                    "portletCardCreatedByName": responseCardResult.created_byName,
                                    "portletCardOperation": 'Edit Card',
                                    "portletCardOperationOn": new Date()
                                });
                            }
                        }
                    });
                });
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
                        element.portletCards.forEach(function(card) {
                            if (card.portletCardId === cardId) {
                                copiedElem = card;
                                var index = element.portletCards.indexOf(card);
                                element.portletCards.splice(index, 1);
                            }
                        })
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
                                portlet.portletCards.push(copiedElem);
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

function formatDate(date) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

module.exports = app;