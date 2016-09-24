/**
 * Created by aayush on 25/9/16.
 */

var Q = require('q');
var taskStepModel = require('../models/TaskStepData');
var stepHandler = require('../runner/stepHandler');



var run = function (id, msg) {

    var defer = Q.defer();
    taskStepModel.find({id: id}, function (err, res) {
        if (err) {
            defer.reject(err);
        }
        else {
            var step = res.toJSON();
            stepHandler(step, msg).then (function (newMsg) {
                defer.resolve(newMsg);
            }, function (err) {
                defer.reject(err)
            })
        }
    });

    return defer.promise;

};

module.exports = function (task) {

    var links = task.links;
    links.forEach(function (idArray) {
        var msg = null;

    })

};