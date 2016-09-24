/**
 * Created by aayush on 24/9/16.
 */

var model = require('../models/TaskStepData');

var Q = require('q');

var addStep = function (user, bot, data) {
    var defer = Q.defer();
    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: user,
        bot: bot,
        data: data,
        type: "add",
        id: id
    };

    model.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;
};


module.exports = addStep;



