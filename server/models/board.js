var express = require('express');
var mongoose = require('mongoose');


var rString;


// var dbHost = require(dbHost);
// var configDB = require('./../config/database.js');
// mongoose.connect(configDB.url);

var Schema = mongoose.Schema;
var BoardSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    created_at: Date,
    updated_at: Date,
    created_by: String,
    closed: Boolean,
    archived: Boolean,
    portlet: Array,
    teamname: String,
    boardId: String,
    coverImageUrl: String,
    coverImageID: String
});

BoardSchema.pre('save', function(next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

var Board = mongoose.model('Board', BoardSchema);



module.exports.findOne = function(index, callback) {
    Board.findById(index, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

module.exports.findAll = function(callback) {
    Board.find({}, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

module.exports.addNewBoard = function(body, callback) {
    function makeId() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxyxxxx-xxxx-4xxx'.replace(/[xy-]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    rString = makeId();

    var board = new Board({
        name: body.name,
        description: body.description,
        created_by: body.createdby || "",
        closed: false,
        cards: [],
        teamname: body.teamname || "personal board",
        coverImageUrl: '',
        coverImageID: '',
        boardId: rString,
    });
    board.save(function(err, result) {
        if (err) throw err;
        callback({
            message: "Successfully added board",
            board: result
        });
    });
};

module.exports.editBoard = function(body, index, callback) {
    Board.findById(index, function(err, result) {
        if (err) throw err;
        if (!result) {
            callback({
                message: "Board with ID: " + index + " not found.",
            });
        }
        console.log(body)
        result.name = body.name;
        result.description = body.description;
        result.created_by = body.createdby;
        result.closed = body.closed || false;
        result.cards = [];
        //console.log(body.teamname);
        result.teamname = body.teamname || "personal board";
        result.coverImageUrl = body.coverImageUrl;
        result.coverImageID = body.coverImageID;
        result.boardId = body.boardId;

        result.save(function(err, result) {
            if (err) throw err;
            callback({
                message: "Successfully updated the board",
                board: result
            });
        });
    });
};


module.exports.deleteBoard = function(index, callback) {
    Board.remove({ _id: index }, function(err, result) {
        callback({
            message: "Successfully deleted the board",
            board: result
        });
    });
};