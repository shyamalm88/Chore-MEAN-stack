var teamDA = require("../models/team");

module.exports.getTeamDetails = function(params, callback) {
    console.log("Fetching details for Team with index: " + params.index);
    teamDA.findOne(params.index, callback);
}
module.exports.getAllTeams = function(callback) {
    console.log("Fetching all Teams");
    teamDA.findAll(callback);
}
module.exports.addNewTeam = function(body, callback) {
    console.log("Adding new book");
    teamDA.addNewTeam(body, callback);
}
module.exports.editTeam = function(body, index, callback) {
    console.log("Editing Team");
    teamDA.editTeam(body, index, callback);
}
module.exports.deleteTeam = function(isbn, callback) {
    console.log("Deleting Team");
    teamDA.deleteTeam(isbn, callback);
}