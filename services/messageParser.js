/**
 * Created by apu-sing on 25/9/16.
 */
var util = require("../utils/util");
var rules = require("../config/rules");
var helpResponse = require("helpResponse");

var getHandler = function (commands) {
    if (!util.isSet(commands)) {
        return;
    }
    
    var help = function (commands) {
        if (!util.isSet(commands)) {
            return function() {
                helpResponse("root");
            };
        }
        return function () {
            helpResponse(commands[0]);
        }
    };
    
    switch (commands[0]) {
        case "help":
            commands.shift();
            help(commands);
            break;
        case "my-bots":
            
            break;
        case "create-bot":
            break;
    }
};

var parseMessage = function (message) {
    var response = {
        "type": "invalid",
        "message": "Invalid command. Please press /help to get started"
    };
    if (!util.isSet(message) || !message.startsWith("/")) {
        return response;
    }
};

module.exports = parseMessage;