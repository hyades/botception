var rules = require("../config/rules");
var builder = require('xmlbuilder');

var getHelpResponse = function (type, description) {
    var i,
        j,
        rule,
        ruleXML;

    var xml = "<flockml>";
    xml += description;
    xml += "<br/>";
    for (i = 0; i < rules.length; i += 1) {
        rule = rules[i];
        if (rule.type !== type) {
            continue;
        }
        ruleXML = "*";
        for (j = 0; j < rule.command.length; j += 1) {
            ruleXML += " <strong>" + rule.command[j] + "</strong>";
        }
        if (rule.param) {
            for (j = 0; j < rule.param.length; j += 1) {
                ruleXML += " @<i>" + rule.param[j] + "</i>";
            }
        }
        ruleXML += "      ";
        ruleXML += rule.description;
        ruleXML += "<br/>";
        xml += ruleXML;
    }
    xml += "</flockml>";
    console.log(xml);
    return xml;
};

var helpResponse = function (type) {
    var response,
        description;
    switch (type) {
        case "root":
            description = "Try creating a bot to get started";
            response = getHelpResponse(type, description);
            break;
        case "bot":
            description = "Use these commands to program your bot";
            response = getHelpResponse(type, description);
            break;
        case "step":
            description = "Steps are atomic tasks that your bot can perform";
            response = getHelpResponse(type, description);
            break;
        case "task":
            description = "Pipe steps to create tasks and run or schedule them";
            response = getHelpResponse(type, description);
            break;
        default:
            description = "Try one of these commands to get started";
            response = getHelpResponse(type, description);
            break;
    }
    return response;
};

module.exports = helpResponse;