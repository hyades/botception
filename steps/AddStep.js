/**
 * Created by aayush on 24/9/16.
 */

var taskstepmodel = require('../models/TaskStepData');
var jobdata = require('../models/JobData');

var Q = require('q');

var addStep = function (user, bot, data, static) {
    var defer = Q.defer();
    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: user,
        bot: bot,
        data: data,
        static: !!static || false,
        type: "add",
        id: id
    };

    taskstepmodel.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;
};


exports.step = addStep;

exports.run = function (step, msg) {

    var defer = Q.defer();

    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: step.user,
        bot: step.bot,
        data: step.static ? step.data : msg,
        id: step.id
    };

    jobdata.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;

};




