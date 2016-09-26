var model = require('../models/UserData');
var Q = require('q');

var addUser = function(userId, userToken) {
    var defer = Q.defer();
    var obj = {
        userId: userId,
        userToken: userToken
    };

    model.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(userId);
    });

    return defer.promise;    
};
module.exports = addUser;