/**
 * Created by pawan.t on 8/31/2015.
 */
var tmp = require('tmp');
var tmpobj = tmp.dirSync().name;
var clone = require('clone');

var envConfig = {

    "prod_info": {
        elasticSearch:{host:"54.177.120.2:9200"},
        redShardedMongo: {hosts: "localhost:28017", dbName:'PersistenceDB'},
        logs:{transports:[{name : 'das-error-file',level: 'error', filename: '/data/logs/das/das-error-logs.log'},
            {name : 'das-info-file',level: 'info', filename: '/data/logs/das/das-info-logs.log'}],             console:true},
        accessLogs:{filename: '/data/logs/das/das-access-logs.log'},
        https: false,
        httpPort:8000,
        httpsPort:9000,
        influx: {
            server: {
                host: '54.177.147.65',
                port: 8086,
                timePrecision: 'ms'
            },
            db: {
                name: 'server_stats',
                username: 'root',
                password: 'root',
                retentionPolicy: 'testrp'
            },
            series: {
                name: 'execution_time',
                strName: 'string_test'
            }
        }
    },


    "dev": {
        elasticSearch:{host:"54.177.120.2:9200"},
        redShardedMongo: {hosts: "54.157.5.64", dbName:'month_test'},
        secondaryMongo: {hosts: "localhost:27017", dbName:'botceptionDB'},
        logs:{transports:
            [{name : 'das-error-file',level: 'error', filename: '../logs/das/das-error-logs.log'},
                {name : 'das-info-file',level: 'info', filename: '../logs/das/das-info-logs.log'},
                {name : 'das-debug-file',level: 'debug', filename: '../logs/das/das-debug-logs.log'}],
            console:true},
        accessLogs:{filename: '../logs/das/das-access-logs.log'},
        https: false,
        httpPort:8000,
        httpsPort:9000,
        influx: {
            server: {
                host: '54.177.147.65',
                port: 8086,
                timePrecision: 'ms'
            },
            db: {
                name: 'server_stats',
                username: 'root',
                password: 'root',
                retentionPolicy: 'testrp'
            },
            series: {
                name: 'execution_time_local',
                strName: 'string_test'
            }
        }
    }

};

envConfig.test = clone(envConfig.dev);
envConfig.test.accessLogs = {filename: tmpobj};
envConfig.test.logs = {transports:
    [{name : 'das-error-file',level: 'error', filename: tmpobj},
        {name : 'das-info-file',level: 'info', filename: tmpobj},
        {name : 'das-debug-file',level: 'debug', filename: tmpobj}],
    console:true};

exports.envConfig = envConfig;