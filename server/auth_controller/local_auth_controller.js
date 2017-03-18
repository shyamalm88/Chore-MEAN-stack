var userDA = require("../models/localUser");

module.exports.getUserDetails = function(params, callback) {
    console.log("Fetching details for User with index: " + params.index);
    userDA.findOne(params.index, callback);
}
module.exports.getAllUsers = function(callback) {
    console.log("Fetching all Users");
    userDA.findAll(callback);
}
module.exports.addNewUser = function(body, callback) {
    console.log("Adding new User");
    userDA.addNewUser(body, callback);
}
module.exports.editUser = function(body, index, callback) {
    console.log("Editing User");
    userDA.editUser(body, index, callback);
}
module.exports.deleteUser = function(isbn, callback) {
    console.log("Deleting User");
    userDA.deleteUser(isbn, callback);
}