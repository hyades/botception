/**
 * Created by aayush on 25/9/16.
 */


var botmodel = require('../models/BotData');
var Q = require('q');


module.exports = function (user, name) {

    var defer = Q.defer();

    botmodel.findOne({user: user, name: name}, function (err, res) {
        if(err)
            defer.reject(err);
        else{
            res = res.toJSON();
            defer.resolve(res.help);
        }

    });

    return defer.promise;
};
