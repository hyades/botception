/**
 * Created by aayush on 25/9/16.
 */


var botmodel = require('../models/BotData');
var Q = require('q');


module.exports = function (user, name) {

    var defer = Q.defer();

    botmodel.collection.insert({name: name, user: user, help: 'Help section not updated..'}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve();
    });

    return defer.promise;
};
