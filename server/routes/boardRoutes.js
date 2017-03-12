var express = require('express');
var router = express.Router();
var boardController = require("../board_controller/board_controller");



var app = express();


app.route('/board')
    .get(function(req, res) {
        boardController.getAllBoards(function(results) { res.json(results); });
    })
    .post(function(req, res) {
        boardController.addNewBoard(req.body, function(results) {
            res.json(results);
        });
    });

app.route('/board/:index')
    .get(function(req, res) {
        boardController.getBoardDetails(req.params, function(results) { res.json(results); });
    })
    .post(function() {
        boardController.addNewBoard(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .put(function(req, res) {
        boardController.editBoard(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .delete(function(req, res) {
        boardController.deleteBoard(req.params.index, function(results) {
            res.json(results);
        });
    });





module.exports = app;