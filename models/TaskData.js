
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoConnection = require('../persistence/MongoDbConnection').secondaryConnection;
var dbschema = new Schema({});
var Q = require('q');
var logger = require('../logger');
var moment = require('moment');

dbschema.statics.getTasksToRun = function (timestamp) {

    var defer = Q.defer();
    var query = {
        next_time: {$lt: timestamp}
    };

    this.find(query, function (err, res) {
        if (err)defer.reject(err);
        else {
            defer.resolve(res);
        }
    });

    return defer.promise;
};


dbschema.statics.setNextTimeOfTask = function (id) {
    var defer = Q.defer();

    this.findOne({id: id}, function (err, res) {
        if(err) defer.reject(err);
        else {
            res = res.toJSON();
            var next_time = moment(res.next_time, 'YYMMDDHHmm').subtract(res.delta, 'minutes').format('YYMMDDHHmm');
            this.update({id: id}, {$set: {next_time: next_time}}, function (err, res) {
                if(err)
                    defer.reject(err);
                else
                    defer.resolve(next_time);
            });
        }
    });

    return defer.promise;
}


var maindb = mongoConnection.model('taskdata', dbschema);
module.exports = maindb;

