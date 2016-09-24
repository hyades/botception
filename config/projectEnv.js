/**
 * Created by aayush on 27/10/15.
 */
var envConfig = require('./deployConfig').envConfig;
var getProjectEnv = require('common').getProjectEnv;
var projectEnv = getProjectEnv(envConfig, 'NODE_ENV_DAS');
module.exports = projectEnv;
