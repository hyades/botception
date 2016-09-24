/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskStepData');

var step = function (user, bot, ll) {

    var defer = Q.defer();

    var query = {
        user: user,
        bot: bot
    };
    model.update(query, {$set: {links: ll}}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;

};

module.exports = step;

