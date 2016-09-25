/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskData');

var step = function (user, bot, name) {

    var defer = Q.defer();
    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: user,
        bot: bot,
        id: id,
        name: name
    };

    model.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;

};

module.exports = step;

