var express = require('express');
var boardController = require("../board_controller/board_controller");
var router = express.Router();


/* GET api listing. */
router.use('/', (req, res) => {
    res.send('api works');
});

router.get('/board/:index', function(req, res) {
    boardController.getBoardDetails(req.params, function(results) { res.json(results); });
});
router.get('/board', function(req, res) {
    //console.log(req);
    boardController.getAllBoards(function(results) { res.json(results); });
});
router.post('/board', function(req, res) {
    console.log("++++++++++++++++++++++++++++++")
    console.log(req.body);
    console.log("++++++++++++++++++++++++++++++")
    console.log(res);
    boardController.addNewBoard(req.body, function(results) {
        res.json(results);
    });
});
router.put('/board/:index', function(req, res) {
    console.log(req.body)
    boardController.editBoard(req.body, req.params.index, function(results) {
        res.json(results);
    });
});
router.delete('/board/:index', function(req, res) {
    boardController.deleteBoard(req.params.index, function(results) {
        res.json(results);
    });
});


module.exports = router;