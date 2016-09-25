/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/JobData');

var step = function (user, bot, regex) {

    var defer = Q.defer();
    var getXML = function (list) {
        var xml = "<flockml>";
        for (var i = 0; i < list.length; i += 1) {
            var bot = list[i].toJSON();
            xml += "<strong>" + bot.id + "</strong>  ==> " + bot.data + "<br/>";
        }
        xml += "</flockml>";
        return xml;
    };

    var query = {
        user: user,
        bot: bot,
        data: {$regex: regex}
    };

    model.find(query, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            defer.resolve(getXML(res));
        }
    });

    return defer.promise;

};

module.exports = step;

