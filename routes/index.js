
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
        console.log('done', data);
        res.status(200);
        res.send(data);
    }, function(err) {
        logger.error(err);
        res.status(500);
        res.send(err);
    })
});

router.post('/', flock.router);

flock.events.on('app.install', function (event) {
    addUser(event.userId, event.userToken).then(
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
    // executeMessage(event.message);
    return {
        text: 'Got: '
    };
});

module.exports = router;
