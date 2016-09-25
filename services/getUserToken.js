/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/UserData');

var getUserToken = function (user) {

    var defer = Q.defer();

    var q = {userId: user};
    model.findOne(q, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            res = res.toJSON();
            defer.resolve(res.userToken);
        }
    });

    return defer.promise;

};

module.exports = getUserToken;

