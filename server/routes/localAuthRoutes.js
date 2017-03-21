var express = require('express');
var router = express.Router();
var authController = require("../controller/local_auth_controller");



var app = express();


app.route('/user')
    .get(function(req, res) {
        authController.getAllUsers(function(results) { res.json(results); });
    })
    .post(function(req, res) {
        authController.addNewUser(req.body, function(results) {
            res.json(results);
        });
    });

app.route('/user/:index')
    .get(function(req, res) {
        authController.getUserDetails(req.params, function(results) { res.json(results); });
    })
    .post(function() {
        authController.addNewUser(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .put(function(req, res) {
        authController.editUser(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .delete(function(req, res) {
        authController.deleteUser(req.params.index, function(results) {
            res.json(results);
        });
    });





module.exports = app;