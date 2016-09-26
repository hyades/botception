/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskData');

var step = function (user, bot, task, link) {

    var defer = Q.defer();
    var query = {
        user: user,
        bot: bot,
        name: task
    };
    model.collection.update(query, {$addToSet: {links: link}}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve()
    });

    return defer.promise;

};

exports.step = step;



