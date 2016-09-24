/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskStepData');

var step = function (user, bot, link) {

    var defer = Q.defer();

    var query = {
        user: user,
        bot: bot
    };
    model.update(query, {$addToSet: {links: link}}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;

};

exports.step = step;



