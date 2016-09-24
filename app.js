var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose=require('mongoose');
var routes = require('./routes/index');
var logger = require("./logger");
var bodyParser = require('body-parser');
var expressWinston = require('express-winston');
var winston = require('winston');
var configParser=require('./ConfigParser/deployConfigParser.js');
var projectConfig=configParser.getProjectConfig();
var accessLogsfile=projectConfig.accessLogs.filename;
var compression = require('compression');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};

var app = express();
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));
//assign the swig view engine to .html files


app.use(compression())

app.use(allowCrossDomain);

app.use(expressWinston.logger({
    transports: [
        new winston.transports.DailyRotateFile({
            name : 'das-access-file',
            datePattern: '.yyyy-MM-dd',
            filename: accessLogsfile,
            handleExceptions: true,
            json: true,
            colorize: false
        })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
    colorStatus: true // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
}));
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

if(projectConfig.https == true) {
    app.use(function (req, res, next) {
        if (req.url == '/healthCheck') {
            res.status(200);
            res.send("healthCheck Success");
            res.end()
        }

        //else if(req.protocol !== 'https' && !req.secure ) {
        else if (req.get('x-forwarded-proto') != 'https') {
            res.set('x-forwarded-proto', 'https');
            //res.redirect('https://dashboards.spamanalyst.com:9000/');
            res.redirect('https://' + req.get('Host') + req.url);
        }
        else {
            next();
        }
    });
}

app.use('/css', express.static(path.join(__dirname, '..', 'webapp','public', 'css')));
app.use('/fonts', express.static(path.join(__dirname, '..', 'webapp', 'public', 'fonts')));
app.use('/js', express.static(path.join(__dirname, '..', 'webapp', 'public', 'js')));
app.use('/images', express.static(path.join(__dirname, '..', 'webapp', 'public', 'images')));

app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '..', 'webapp', 'public')));

app.use(function(err, req, res, next) {
    var errorObj={};
    errorObj.err_name="APP_FAILURE";
    errorObj.err_stk=err.stack;
    logger.error(JSON.stringify(errorObj));
    res.end("Internal Server Error");
});

module.exports = app;

