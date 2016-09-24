/**
 * Created by aayush on 25/9/16.
 */


var Q = require('q');
var moment = require('moment');
var taskModel = require('../models/TaskData');
var runner = require('../runner/runner');


module.exports = function () {

    var defer = Q.defer();

    var timestamp = moment().format('YYMMDDHHmm');
    taskModel.getTasksToRun(timestamp).then (function (tasks) {
        var prArr = [];
        tasks.map(function (task) {
            prArr.push(runner(task));
        });
        Q.allSettled(prArr).then (function () {
            var arr = [];
            tasks.map(function (task) {
                arr.push(taskModel.setNextTimeOfTask(task.id));
            });
            Q.allSettled(arr).then (function () {
                defer.resolve();
            })
        })

    }, function (err) {
        defer.reject(err);
    });

    return defer.promise;

};