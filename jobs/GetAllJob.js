/**
 * Created by aayush on 24/9/16.
 */


var Q = require('q');
var model = require('../models/JobData');

var step = function (user, bot) {

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

    var q = {user: user, bot: bot};
    model.find(q, function (err, res) {
        if(err) {
            defer.reject(err);
        }
        else {
            res = getXML(res);
            defer.resolve(res);
        }
    } );

    return defer.promise;

};

module.exports = step;

