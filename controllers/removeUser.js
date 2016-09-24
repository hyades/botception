var model = require('../models/userDataTable');
var Q = require('q');

var removeUser = function(userId) {
    var defer = Q.defer();
    var obj = {
        userId: userId
    };

    model.remove(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(userId);
    });

    return defer.promise;
};
module.exports = addUser;