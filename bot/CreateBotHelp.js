/**
 * Created by aayush on 25/9/16.
 */


var botmodel = require('../models/BotData');
var Q = require('q');


module.exports = function (user, name, helpstring) {

    var defer = Q.defer();

    botmodel.update({name: name, user: user}, {$set: {help: helpstring}}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve();
    });

    return defer.promise;
};
