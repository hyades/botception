/**
 * Created by ruchir.t on 16/07/16.
 */

var express = require('express');
var router = express.Router();


var test = require('../controllers/testController');

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



module.exports = router;

