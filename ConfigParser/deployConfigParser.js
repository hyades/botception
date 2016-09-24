/**
 * Created by pawan.t on 3/26/2015.
 */

var envConfig=require('../config/deployConfig').envConfig;

exports.getProjectEnv = function() {
    if (process.env.NODE_ENV_DAS == undefined) {
        return "dev";
    }
    return process.env.NODE_ENV_DAS;
};

exports.getProjectConfig=function()
{
    return envConfig[this.getProjectEnv()];
};



