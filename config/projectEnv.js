/**
 * Created by aayush on 27/10/15.
 */
var envConfig = require('./deployConfig').envConfig;
var getProjectEnv = function(envConfig, envVariable)
{
    var env=process.env[envVariable];
    console.log("env : "+ JSON.stringify({env:env}));
    if(env==undefined){
        env="dev";
    }
    console.log("env : "+ JSON.stringify({env:env}));
    var projectEnv=envConfig[env];
    return projectEnv;
};
var projectEnv = getProjectEnv(envConfig, 'NODE_ENV_DAS');
module.exports = projectEnv;
