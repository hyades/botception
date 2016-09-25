/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskStepData');
var sendmsg = require('../controllers/executeMessage').sendSimple;

var step = function (user, bot) {

    var defer = Q.defer();
    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: user,
        bot: bot,
        type: "msg",
        id: id
    };

    model.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;

};

exports.step = step;
exports.run = function (step, msg) {
    console.log('running send', arguments)
    var sendmsg = require('../controllers/executeMessage').sendSimple;

    var defer = Q.defer();
    
    sendmsg(msg, step.user);

    defer.resolve();

    return defer.promise;

};
