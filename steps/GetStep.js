/**
 * Created by aayush on 24/9/16.
 */

var taskstepmodel = require('../models/TaskStepData');
var jobmodel = require('../models/JobData');
var jobdata = require('../models/JobData');

var Q = require('q');

var getStep = function (user, bot, job_id) {
    var defer = Q.defer();
    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: user,
        bot: bot,
        job_id: job_id,
        type: "get",
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


exports.step = getStep;

exports.run = function (step) {

    var defer = Q.defer();

    var q = {id: step.job_id, user: step.user, bot: step.bot};
    jobmodel.findOne(q, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            res = res.toJSON();
            defer.resolve(res.data);
        }
    } );

    return defer.promise;

};




