/**
 * Created by aayush on 25/9/16.
 */

var Q = require('q');
var taskStepModel = require('../models/TaskStepData');
var stepHandler = require('../runner/stepHandler');



var run = function (id, msg) {
    console.log('running', arguments)

    var defer = Q.defer();
    taskStepModel.findOne({id: id}, function (err, res) {
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
    // console.log(Object.keys(task), typeof task);
    var links = task['links'];

    links.forEach(function (idArray) {
        console.log(idArray)
        var msg = null;
        switch(idArray.length) {
            case 1:
                return run(idArray[0], msg);
            case 2:
                var defer = Q.defer();
                run(idArray[0], msg).then(function (newMsg) {
                    run(idArray[1], newMsg).then(function () {
                        defer.resolve()
                    }, function(err) {defer.reject(err)})
                });
                return defer.promise;
            case 3:
                var defer = Q.defer();
                run(idArray[0], msg).then(function (newMsg) {
                    run(idArray[1], newMsg).then(function (nNewMsg) {
                        run(idArray[2], nNewMsg).then(function () {
                            defer.resolve()
                        }, function(err) {defer.reject(err)})
                    }, function(err) {defer.reject(err)})
                });
                return defer.promise;
        }

    })

};