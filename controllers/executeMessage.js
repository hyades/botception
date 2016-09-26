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

exports.sendResponse =sendResponse;
exports.sendImage = function(url, user) {
    getUserToken(user).then(
        function (userToken) {
            flock.callMethod('chat.sendMessage', constants.bot_token, {
                message: {
                    to: user,
                    // from: event.to,
                    // uid: event.uid,
                    // id: event.id,
                    // text: event.text,
                    attachments: [{
                        "title": "attachment title",
                        "description": "attachment description",
                        "views": {
                            "image": {
                                "original": { "src": url, "width": 400, "height": 400 },
                            }
                        },
                    }]
                }
            }, function (response) {
                console.log("Response: " + JSON.stringify(response));
            });
        }
    );
};


exports.sendSimple = function(text, user) {
    getUserToken(user).then(
        function (userToken) {
            flock.callMethod('chat.sendMessage', constants.bot_token, {
                message: {
                    to: user,
                    from: constants.bot_guid,
                    text: text,
                                    }
            }, function (response) {
                console.log("Response: " + JSON.stringify(response));
            });
        }
    );
};

exports.executeMessage = function(message) {
    var parseResult = parseMessage(message);
    if (parseResult.type === "valid") {
        var result = parseResult["handler"]();
        console.log("handdler", parseResult.handler);
        if (typeof result === "string") {
            sendResponse(result, message);
        } else {
            result.then(
                function (response) {
                    console.log('RESPONSE', response)
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

