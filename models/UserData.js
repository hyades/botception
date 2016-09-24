var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoConnection = require('../persistence/MongoDbConnection').secondaryConnection;
var dbschema = new Schema({});

var userDataTable = mongoConnection.model('UserData', dbschema);
module.exports = userDataTable;

