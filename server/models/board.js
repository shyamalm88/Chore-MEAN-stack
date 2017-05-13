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
    created_byName: String,
    closed: Boolean,
    archived: Boolean,
    portlet: Array,
    teamname: String,
    boardId: String,
    coverImageUrl: String,
    coverImageID: String,
    boardActivity: Array,
    boardTagLabels: Array,
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
        created_by: body.createdby,
        created_byName: body.createdByName,
        closed: false,
        cards: [],
        teamname: body.teamname,
        coverImageUrl: '',
        coverImageID: '',
        boardId: rString,
        boardTagLabels: [{
                class: 'card-label-green',
                bg: '#4caf50',
                name: 'Green',
                displayName: 'Green',
                portletCardId: [],
                id: makeId('greenxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-yellow',
                bg: '#ffeb3b',
                name: 'Yellow',
                displayName: 'Yellow',
                portletCardId: [],
                id: makeId('yellowxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-orange',
                bg: '#ff9800',
                name: 'Orange',
                displayName: 'Orange',
                portletCardId: [],
                id: makeId('orangexxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-red',
                bg: '#f44336',
                name: 'Red',
                displayName: 'Red',
                portletCardId: [],
                id: makeId('redxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-purple',
                bg: '#673ab7',
                name: 'Purple',
                displayName: 'Purple',
                portletCardId: [],
                id: makeId('purplexxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-blue',
                bg: '#3f51b5',
                name: 'Blue',
                displayName: 'Blue',
                portletCardId: [],
                id: makeId('bluexxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-sky',
                bg: '#2196f3',
                name: 'Sky',
                displayName: 'Sky',
                portletCardId: [],
                id: makeId('skyxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-pink',
                bg: '#e91e63',
                name: 'Pink',
                displayName: 'Pink',
                portletCardId: [],
                id: makeId('pinkxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-violet',
                bg: '#9c27b0',
                name: 'Violet',
                displayName: 'Violet',
                portletCardId: [],
                id: makeId('violetxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-lime',
                bg: '#8bc34a',
                name: 'Lime',
                displayName: 'Lime',
                portletCardId: [],
                id: makeId('limexxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-brown',
                bg: '#795548',
                name: 'Brown',
                displayName: 'Brown',
                portletCardId: [],
                id: makeId('brownxxyy-xyxxy-xayx')
            },
            {
                class: 'card-label-black',
                bg: '#607d8b',
                name: 'Black',
                displayName: 'Black',
                portletCardId: [],
                id: makeId('blackxxyy-xyxxy-xayx')
            }
        ]

    });
    board.boardActivity.push({
        boardCreatedBy: body.createdby,
        boardId: rString,
        boardCreatedByName: body.createdByName,
        boardOperationOn: new Date(),
        boardOperation: 'Create',
        activity: ['Created New Board named "' + body.name + '"']
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
        var editActivity = body;
        var activity = [];

        if (result.name !== editActivity.name) {
            activity.push('updated name as "' + editActivity.name + '"');
        }
        if (result.description !== editActivity.description) {
            activity.push('updated description "' + editActivity.description + '"');
        }
        if (result.teamname !== editActivity.teamname) {
            activity.push('updated team as "' + editActivity.teamname + '"');
        }
        if (result.coverImageUrl !== editActivity.coverImageUrl) {
            if (result.coverImageUrl !== '') {
                activity.push('deleted cover image');
            } else {
                activity.push('updated cover image');
            }
        }
        console.log(activity);
        result.name = body.name;
        result.description = body.description;
        result.closed = body.closed || false;
        result.cards = [];
        //console.log(body.teamname);
        result.teamname = body.teamname;
        result.coverImageUrl = body.coverImageUrl;
        result.coverImageID = body.coverImageID;
        result.boardId = body.boardId;



        result.boardActivity.push({
            activity,
            boardUpdatedyName: result.created_byName,
            boardUpdatedBy: result.created_by,
            boardOperation: 'Update',
            boardId: result.boardId,
            boardOperationOn: new Date(),
        })

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