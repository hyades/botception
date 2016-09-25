var parseMessage = require('../services/messageParser');
var flock = require('../config/flock');
var getUserToken = require('../services/getUserToken');

var sendResponse = function(response, userId) {
    console.log("userid", userId);
    console.log("response", response);
    getUserToken(userId).then(
        function (userToken) {
            flock.callMethod('chat.sendMessage', userToken, {
                message: {
                    to: userId,
                    text: response
                }
            }, function (response) {
                console.log("Response: " + JSON.stringify(response));
            });
        }
    );
};

var executeMessage = function(message) {
    var parseResult = parseMessage(message.text);
    if (parseResult.type === "valid") {
        var result = parseResult["handler"]();
        result = "hell0";
        if (typeof result === "string") {
            sendResponse(result, message.from);
        } else {
            result.then(
                function (response) {
                    sendResponse(response, message.from);
                }, function (err) {
                    sendResponse("Error while parsing command. Please enter /help to enter correct commands", message.from);
                }
            );
        }
    } else {
        sendResponse(parseResult["message"], message.from);
    }
};

module.exports = executeMessage;