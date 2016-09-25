/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/JobData');

var step = function (user, bot, id) {

    var defer = Q.defer();

    var q = {id: id, user: user, bot: bot};
    model.findOne(q, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            res = res.toJSON();
            defer.resolve(res.data);
        }
    } );

    return defer.promise;

};

module.exports = step;

