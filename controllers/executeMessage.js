var parseMessage = require('../services/messageParser');
var flock = require('../config/flock');
var getUserToken = require('../services/getUserToken');
var constants = require('../config/constants');

var getXML = function (res) {
    if (typeof res === "string" && !res.startsWith("<flock")) {
        return "<flockml>" + res + "</flockml>";
    }
    return res;
};

var sendResponse = function(response, event) {
    console.log("userid", event.from);
    console.log("response", response);
    getUserToken(event.from).then(
        function (userToken) {
            flock.callMethod('chat.sendMessage', constants.bot_token, {
                message: {
                    to: event.from,
                    from: event.to,
                    uid: event.uid,
                    id: event.id,
                    text: event.text,
                    attachments: [{
                        "title": "attachment title",
                        "views": {
                            "flockml": getXML(response)
                        }
                    }]
                }
            }, function (response) {
                console.log("Response: " + JSON.stringify(response));
            });
        }
    );
};

var executeMessage = function(message) {
    var parseResult = parseMessage(message);
    if (parseResult.type === "valid") {
        var result = parseResult["handler"]();
        console.log("handdler", parseResult.handler);
        if (typeof result === "string") {
            sendResponse(result, message);
        } else {
            result.then(
                function (response) {
                    sendResponse(response, message);
                }, function (err) {
                    sendResponse("Error while parsing command. Please enter /help to enter correct commands", message);
                }
            );
        }
    } else {
        sendResponse(parseResult["message"], message);
    }
};

module.exports = executeMessage;