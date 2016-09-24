var winston = require('winston');
winston.emitErrs = true;
var projectEnv=require('./config/projectEnv');
var logs=projectEnv.logs.transports;
var boolConsole=projectEnv.logs.console;
var getLogger=require('common').getLogger;
var logger=getLogger(logs,boolConsole);
module.exports = logger;
