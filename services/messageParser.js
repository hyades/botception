/**
 * Created by apu-sing on 25/9/16.
 */
var util = require("../utils/util");
var rules = require("../config/rules");
var helpResponse = require("./helpResponse");
var getBotList = require("../bot/ListBots");
var createBot = require("../bot/CreateBot");
var addJob = require("../jobs/AddJob");
var getJob = require("../jobs/GetJob");
var getAllJob = require("../jobs/GetAllJob");
var searchJob = require("../jobs/SearchJob");
var addstep = require('../steps/AddStep').step;
var apigetstep = require('../steps/APIGetStep').step;
var displaymsgstep = require('../steps/DisplayMsgStep').step;
var displaypicstep = require('../steps/DisplayPictureStep').step;
var getstep = require('../steps/GetStep').step;
var searchstep = require('../steps/SearchStep').step;
var linkstep = require('../steps/LinkStep').step;
var remind = require('../triggers/RemindTrigger');
var createtask = require('../steps/CreateTask');


var getHandler = function (commands, user) {
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

    var handleStep = function(type, bot, user, commands) {
        switch (type) {
            case "add":
                return function () {
                    return addstep(user, bot, commands.join(" "), 0);
                };
            case "api-get":
                return function () {
                    return apigetstep(user, bot, commands.shift(), commands.shift());
                };
            case "get":
                return function () {
                    return getstep(user, bot, commands.shift());
                };
            case "display-msg":
            case "dm":
                return function () {
                    return displaymsgstep(user, bot);
                };
            case "display-pic":
            case "dp":
                return function () {
                    return displaypicstep(user, bot);
                };
            case "pipe":
                return function () {
                    return linkstep(user, bot, commands.shift(), commands);
                };
            case "repeat":
                return function () {
                    return remind(user, bot, commands.shift(), commands.shift(), commands.shift());
                }
        }
    };

    var handleBot = function (bot, commands, user) {
        if (!util.isSet(commands)) {
            return null;
        }
        var secondCommand = commands.shift();
        switch (secondCommand) {
            case "add":
                return function () {
                    var data = commands.join(" ");
                    return addJob(user, bot, data);
                };
                break;
            case "get":
                return function () {
                    var id = commands[0];
                    return getJob(user, bot, id);
                };
            case "get-all":
                return function () {
                    return getAllJob(user, bot);
                };
            case "search":
                return function () {
                    var data = commands.join(" ");
                    return searchJob(user, bot, data);
                };
                break;
            case "create-step":
            case "cs":
                var thirdCommand = commands.shift();
                return handleStep(thirdCommand, bot, user, commands);
                break;
            case "create-task":
                return function () {
                    return createtask(user, bot, commands.shift());
                }



        }
    };

    var firstCommand = commands.shift();
    switch (firstCommand) {
        case "help":
            handler = help(commands);
            break;
        case "my-bots":
            handler = function () {
                return getBotList(user);
            };
            break;
        case "create-bot":
            if (!util.isSet(commands)) {
                break;
            }
            name = commands.shift();
            if (util.isSet(commands)) {
                description = commands.join(" ");
            }
            console.log(name, user, description);
            handler = function () {
                return createBot(user, name, description);
            };
            break;
        default:
            handler = handleBot(firstCommand, commands, user);
            break;
    }
    return handler;
};

var parseMessage = function (message) {
    var user = message.from;
    message1 = message.text.trim();
    var response = {
        "type": "invalid",
        "message": "Invalid command. Please enter /help to get started"
    }, handler;
    if (!util.isSet(message1) || !message1.startsWith("/")) {
        return response;
    }
    message1 = message1.substring(1);
    handler = getHandler(message1.split(" "), user);
    if (handler) {
        response.type = "valid";
        response.handler = handler;
    }
    return response;
};

module.exports = parseMessage;