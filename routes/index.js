
var express = require('express');
var router = express.Router();
var flock = require('../config/flock');

var test = require('../controllers/testController'),
    addUser = require('../controllers/addUser'),
    removeUser = require('../controllers/removeUser'),
    executeMessage = require('../controllers/executeMessage');

router.get('/run', function (req, res) {


});



router.get('/getcb', function (req, res) {
    test().then(function(data) {
        res.status(200);
        console.log('done', data);
        res.send(data);
    }, function(err) {
        res.status(500);
        logger.error(err);
        res.send(err);
    })
});

router.post('/events', flock.router);

flock.events.on('app.install', function (event) {
    addUser(event.userId, userToken).then(
        function (data) {
            var message = "Added user with id: " + data;
            console.log(message);
            res.status(200);
            res.send(message);
        }, function (err) {
            logger.error(err);
            res.status(500);
            res.send(err);
        }
    );
});

flock.events.on('app.uninstall', function(event) {
    removeUser(event.userId).then(
        function (data) {
            var message = "Deleted user with id: " + data;
            console.log(message);
            res.status(200);
            res.send(message);
        }, function (err) {
            logger.error(err);
            res.status(500);
            res.send(err);
        }
    );
});

flock.events.on('chat.receiveMessage', function(event) {
    executeMessage(event.message);
});

module.exports = router;
