/**
 * Created by aayush on 25/9/16.
 */


var Q = require('q');
var moment = require('moment');
var taskModel = require('../models/TaskData');
var taskStepModel = require('../models/TaskStepData');
var runner = require('../runner/runner');


module.exports = function () {

    var defer = Q.defer();

    var timestamp = moment().format('YYMMDDHHmm');
    taskModel.getTasksToRun(timestamp).then (function (tasks) {
        tasks.map(function (task) {
            runner()
        });
    }, function (err) {
        defer.reject(err);
    })

    return defer.promise;

};