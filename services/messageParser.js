/**
 * Created by apu-sing on 25/9/16.
 */
var util = require("../utils/util");
var rules = require("../config/rules");
var helpResponse = require("./helpResponse");
var getBotList = require("../bot/ListBots");
var createBot = require("../bot/CreateBot");

var getHandler = function (commands) {
    if (!util.isSet(commands)) {
        return;
    }
    var name,
        description = "",
        handler = null;

    var help = function (commands) {
        if (!util.isSet(commands)) {
            return function() {
                return helpResponse("root");
            };
        }
        return function () {
            return helpResponse(commands[0]);
        }
    };

    var firstCommand = commands.shift();
    switch (firstCommand) {
        case "help":
            handler = help(commands);
            break;
        case "my-bots":
            handler = getBotList;
            break;
        case "create-bot":
            if (!util.isSet(commands)) {
                break;
            }
            name = commands.shift();
            if (util.isSet(commands)) {
                description = commands.join(" ");
            }
            handler = function () {
                createBot(name, description);
            };
            break;
    }
    return handler;
};

var parseMessage = function (message) {
    var response = {
        "type": "invalid",
        "message": "Invalid command. Please enter /help to get started"
    }, handler;
    if (!util.isSet(message) || !message.startsWith("/")) {
        return response;
    }
    message = message.substring(1);
    handler = getHandler(message.split(" "));
    if (handler) {
        response.type = "valid";
        response.handler = handler;
    }
    return response;
};

module.exports = parseMessage;