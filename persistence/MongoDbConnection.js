/**
 * Created by pawan.t on 4/1/2015.
 */
var logger=require('../logger.js');
var mongoose=require('mongoose');
var configParser=require('../ConfigParser/deployConfigParser.js');
var MongoClient = require('mongodb').MongoClient;
var projectConfig=configParser.getProjectConfig();

var Q = require('q');

var getReducedUnshardedConnection = function(){

    var mongoConfig=projectConfig['redUnshardedMongo'];
    var mongoUrl = 'mongodb://'+mongoConfig.hosts+'/'+mongoConfig.dbName;
    var options = {
        db: { native_parser: true },
        server: { poolSize: 5 },
        replset: { rs_name: mongoConfig.replicaSetName },
        user: '',
        pass: ''
    };

    options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1, connectTimeoutMS: 300000 };

    return mongoose.createConnection(mongoUrl, options)
};


var getReducedShardedConnection = function () {

    var mongoConfig=projectConfig['redShardedMongo'];
    var mongoUrl = 'mongodb://'+mongoConfig.hosts+'/'+mongoConfig.dbName;

    var options = {
        db: { native_parser: true },
        server: { poolSize: 5 },
        user: '',
        pass: ''
    };

    options.server.socketOptions =  { keepAlive: 1, connectTimeoutMS: 300000 };

    return mongoose.createConnection(mongoUrl, options);
};

var getSecondaryConnection = function () {

    var mongoConfig=projectConfig['secondaryMongo'];
    var mongoUrl = 'mongodb://'+mongoConfig.hosts+'/'+mongoConfig.dbName;

    var options = {
        db: { native_parser: true },
        server: { poolSize: 5 },
        user: '',
        pass: ''
    };

    options.server.socketOptions = { keepAlive: 1, connectTimeoutMS: 300000 };

    return mongoose.createConnection(mongoUrl, options);
};



var connectMongoDb=function()
{
    //exports.reducedUnshardedConnection = getReducedUnshardedConnection();
    //exports.reducedShardedConnection = getReducedShardedConnection();
    //logger.info('connected to reduced sharded mongo');
    exports.secondaryConnection = getSecondaryConnection();
    logger.info('connected to secondary data mongo');
};

exports.connectMongoDb = connectMongoDb;
