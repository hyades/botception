/**
 * Created by aayush on 24/9/16.
 */

var Q = require('q');
var model = require('../models/JobData');

var deleteStep = function (user, bot, id) {

    var defer = Q.defer();

    var query = {
        user: user,
        bot: bot,
        id: id
    };
    model.remove(query, function (err, res) {
        if (err) defer.reject(err);
        else defer.resolve(res);
    });

    return defer.promise;

};


module.exports = deleteStep;

