var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var gravatar = require('gravatar');
var User = require('../models/user');
var teamMember = require('../models/teamMember');



module.exports.findOne = function(index, callback) {
    User.findById(index, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

module.exports.findAll = function(callback) {
    User.find({}, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

module.exports.addNewUser = function(body, callback) {
    User.findOne({ $or: [{ 'facebook.email': body.user.email }, { 'google.email': body.user.email }, { 'local.email': body.user.email }] }, function(err, user) {
        if (err) {
            //console.log(err);
        }
        if (user) {
            user.local.name = body.firstName + ' ' + body.lastName;
            user.local.email = body.user.email;
            user.local.password = bcrypt.hashSync(body.user.password, bcrypt.genSaltSync(8), null);
            user.local.image = gravatar.url(body.user.email, { s: '100', r: 'x', d: 'retro' }, true);




            user.save(function(err, result) {
                if (err) throw err;
                callback({
                    message: "Successfully added user",
                    user: result
                });
            });

        } else {
            var newUser = new User();
            var newTeamMember = new teamMember();

            newUser.local.name = body.firstName + ' ' + body.lastName;
            newUser.local.email = body.user.email;
            newUser.local.password = bcrypt.hashSync(body.user.password, bcrypt.genSaltSync(8), null);
            newUser.local.image = gravatar.url(body.user.email, { s: '100', r: 'x', d: 'retro' }, true);


            newTeamMember.name = newUser.local.name;
            newTeamMember.email = newUser.local.email;
            newTeamMember.image = newUser.local.image;

            newUser.save(function(err, result) {
                if (err) throw err;
                callback({
                    message: "Successfully added user",
                    user: result
                });
            });

            newTeamMember.save(function(err, result) {
                if (err) throw err;
                callback({
                    message: "Successfully added teammember",
                    teammember: result
                });
            });
        }
    });
};


module.exports.editUser = function(body, index, callback) {
    User.findById(index, function(err, result) {
        if (err) throw err;
        if (!result) {
            callback({
                message: "User with ISBN: " + index + " not found.",
            });
        }
        result.name = body.name;
        result.email = body.email;
        result.password = body.password;

        result.save(function(err, result) {
            if (err) throw err;
            callback({
                message: "Successfully updated the User",
                user: result
            });
        });
    });
};

module.exports.deleteUser = function(index, callback) {
    User.remove({ _id: index }, function(err, result) {
        callback({
            message: "Successfully deleted the User",
            user: result
        });
    });
};