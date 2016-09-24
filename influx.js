/**
 * Created by aayush on 22/2/16.
 */

var influx = require('influx');
var info = require('./config/projectEnv').influx;


exports.dbClient = influx({host: info.server.host, port: info.server.port, username: info.server.username, password: info.server.password, database: info.db.name});
exports.info = info;