/**
 * Created by aayush on 25/9/16.
 */
var botModel = require('../models/BotData');
var Q = require('q');

var getBotList = function (user) {

    var defer = Q.defer();
    var getXML = function (bots) {
        var xml = "<flockml>";
        for (var i = 0; i < bots.length; i += 1) {
            bot = bots[i].toJSON();
            xml += "<strong>" + bot.name + "</strong>  ==> " + bot.description + "<br/>";
        }
        xml += "</flockml>";
        return xml;
    };
    
    botModel.find({user: user}, function (err, res) {
        if(err) {
            defer.reject(err);  
        } else {
            var xml = getXML(res);
            defer.resolve(xml);
        }
    });

    return defer.promise;
};

module.exports = getBotList;