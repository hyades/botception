/**
 * Created by apu-sing on 24/9/16.
 */

var constants = require('../config/constants');
var flock = require('flockos');
flock.setAppId(constants.app_id);
flock.setAppSecret(constants.app_secret);

module.exports = flock;