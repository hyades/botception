/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/JobData');

var step = function (user, bot, regex) {

    var defer = Q.defer();

    var query = {
        user: user,
        bot: bot,
        data: {$regex: regex}
    };

    model.find(query, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            var arr = [];
            res.map(function (obj) {obj=obj.toJSON();arr.push({data: obj.data, id:  obj.id})});
            defer.resolve(arr);
        }
    });

    return defer.promise;

};

module.exports = step;

