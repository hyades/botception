/**
 * Created by aayush on 24/9/16.
 */




var tested = require('../jobs/SearchJob');

var test = function () {

    return tested('user1', 'bot1', '.*fuck.*');


};


module.exports = test;
