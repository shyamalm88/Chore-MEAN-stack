var mongoose = require('mongoose');
// var dbHost = require(dbHost);
// var configDB = require('./../config/database.js');
// mongoose.connect(configDB.url);

var Schema = mongoose.Schema;
var TeamSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    created_at: Date,
    updated_at: Date,
    created_by: String,
    members: Array
});

TeamSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

var Team = mongoose.model('Team', TeamSchema);



module.exports.findOne = function(index, callback) {
    Team.findById(index, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

module.exports.findAll = function(callback) {
    Team.find({}, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

module.exports.addNewTeam = function(body, callback) {
    var team = new Team({
        name: body.name,
        description: body.description,
        created_by: body.createdby || "",
        closed: false,
        cards: [],
        teamname: body.teamname || "",
    });
    team.save(function(err, result) {
        if (err) throw err;
        callback({
            message: "Successfully added Team",
            team: result
        });
    });
};

module.exports.editTeam = function(body, index, callback) {
    Team.findById(index, function(err, result) {
        if (err) throw err;
        if (!result) {
            callback({
                message: "Team with ISBN: " + index + " not found.",
            });
        }
        result.name = body.name;
        result.description = body.description;
        result.created_by = body.createdby;
        result.save(function(err, result) {
            if (err) throw err;
            callback({
                message: "Successfully updated the Team",
                team: result
            });
        });
    });
};

module.exports.deleteTeam = function(index, callback) {
    Team.remove({ _id: index }, function(err, result) {
        callback({
            message: "Successfully deleted the team",
            team: result
        });
    });
};