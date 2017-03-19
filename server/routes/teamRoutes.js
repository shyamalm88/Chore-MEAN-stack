var express = require('express');
var router = express.Router();
var teamController = require("../team_controller/team_controller");



var app = express();


app.route('/team')
    .get(function(req, res) {
        teamController.getAllTeams(function(results) { res.json(results); });
    })
    .post(function(req, res) {
        teamController.addNewTeam(req.body, function(results) {
            res.json(results);
        });
    });

app.route('/team/:index')
    .get(function(req, res) {
        teamController.getTeamDetails(req.params, function(results) { res.json(results); });
    })
    .post(function() {
        teamController.addNewTeam(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .put(function(req, res) {
        teamController.editTeam(req.body, req.params.index, function(results) {
            res.json(results);
        });
    })
    .delete(function(req, res) {
        teamController.deleteTeam(req.params.index, function(results) {
            res.json(results);
        });
    });





module.exports = app;