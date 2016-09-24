
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoConnection = require('../persistence/MongoDbConnection').secondaryConnection;
var dbschema = new Schema({});
var Q = require('q');
var logger = require('../logger');




var maindb = mongoConnection.model('botdata', dbschema);
module.exports = maindb;

