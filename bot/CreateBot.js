/**
 * Created by aayush on 25/9/16.
 */


var botmodel = require('../models/BotData');
var Q = require('q');


module.exports = function (user, name, description) {

    var defer = Q.defer();

    botmodel.collection.insert({name: name, user: user, help: 'Help section not updated..', description: description}, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(name + " bot created");
    });

    return defer.promise;
};
