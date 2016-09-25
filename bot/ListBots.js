/**
 * Created by aayush on 25/9/16.
 */


var botmodel = require('../models/BotData');
var Q = require('q');


module.exports = function (user) {

    var defer = Q.defer();

    botmodel.find({user: user}, function (err, res) {
        if(err)
            defer.reject(err);
        else{
            var names = []
            res.forEach(function (botObj) {
                botObj = botObj.toJSON();
                names.push(botObj.name);
            });
            defer.resolve(names);
        }

    });

    return defer.promise;
};
