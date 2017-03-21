var mongoose = require('mongoose');
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
    cards: Array,
    teamname: String,
});

BoardSchema.pre('save', function(next) {
    now = new Date();
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
    var board = new Board({
        name: body.name,
        description: body.description,
        created_by: body.createdby || "",
        closed: false,
        cards: [],
        teamname: body.teamname || "personal board",
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
                message: "Board with ISBN: " + index + " not found.",
            });
        }
        console.log(body)
        result.name = body.name;
        result.description = body.description;
        result.created_by = body.createdby;
        result.closed = body.closed || false;
        result.cards = [];
        result.teamname = body.teamname || "personal board";

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