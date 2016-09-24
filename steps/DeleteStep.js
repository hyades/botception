/**
 * Created by aayush on 24/9/16.
 */

var Q = require('q');
var model = require('../models/MainDB');

var deleteStep = function (id) {

    var defer = Q.defer();

    var query = {
        id: id
    };
    model.remove(query, function (err, res) {
        if (err) defer.reject(err);
        else defer.resolve(res);
    });

    return defer.promise;

};


module.exports = deleteStep;

