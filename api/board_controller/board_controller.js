var boardDA = require("../models/board");

module.exports.getBoardDetails = function(params, callback) {
    console.log("Fetching details for board with index: " + params.index);
    boardDA.findOne(params.index, callback);
}
module.exports.getAllBoards = function(callback) {
    console.log("Fetching all boards");
    boardDA.findAll(callback);
}
module.exports.addNewBoard = function(body, callback) {
    console.log("Adding new book");
    console.log(body);
    boardDA.addNewBoard(body, callback);
}
module.exports.editBoard = function(body, index, callback) {
    console.log("Editing Board");
    boardDA.editBoard(body, index, callback);
}
module.exports.deleteBoard = function(isbn, callback) {
    console.log("Deleting board");
    boardDA.deleteBoard(isbn, callback);
}