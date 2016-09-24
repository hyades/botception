/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/MainDB');

var step = function (user, bot) {

    var defer = Q.defer();

    var q = {user: user, bot: bot};
    model.find(q, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            var arr = [];
            res.map(function (obj) {obj=obj.toJSON();arr.push(obj.data)});
            defer.resolve(arr);
        }
    } );

    return defer.promise;

};

module.exports = step;

