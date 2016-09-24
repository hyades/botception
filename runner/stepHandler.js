/**
 * Created by aayush on 25/9/16.
 */


var addstep = require('../steps/AddStep');
var apigetstep = require('../steps/APIGetStep');
var displaymsgstep = require('../steps/DisplayMsgStep');
var displaypicstep = require('../steps/DisplayPictureStep');
var getstep = require('../steps/GetStep');
var searchstep = require('../steps/SearchStep');

module.exports = function (step, msg) {


    switch (step.type) {

        case "add":
            return addstep.run(step, msg);
        case "apiget":
            return apigetstep.run(step, msg);
        case "msg":
            return displaymsgstep.run(step, msg);
        case "image":
            return displaypicstep.run(step, msg);
        case "get":
            return getstep.run(step, msg);
        case "search":
            return searchstep.run(step, msg);

    }


}
