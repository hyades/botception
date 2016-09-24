/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/TaskStepData');
var request = require('request');

var step = function (user, bot, url, retValuePath) {

    var defer = Q.defer();
    var id = parseInt(Math.random () * 100000000).toString();
    var obj = {
        user: user,
        bot: bot,
        url: url,
        ret_val_path: retValuePath,
        type: "apiget",
        id: id
    };

    model.collection.insert(obj, function (err, res) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(id)
    });

    return defer.promise;

};

exports.step = step;

exports.run = function (step) {


    var defer = Q.defer();

    var url = step.url;
    var ret_val_path = step.ret_val_path;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if(ret_val_path)
                defer.resolve(body[ret_val_path]);
            else
                defer.resolve(body);
        }
        else{
            defer.reject(error);
        }
    });

    return defer.promise;
};
