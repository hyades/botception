/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskData');

var trigger = function (user, bot, task, nextTime, delta) {

    var defer = Q.defer();

    var query = {
        user: user,
        bot: bot,
        name: task
    };
    model.collection.update(query, {$set: {trigger_type: 'remind', next_time: nextTime, delta: delta}}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve()
    });

    return defer.promise;

};

module.exports = trigger;

