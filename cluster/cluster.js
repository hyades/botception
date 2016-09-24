/**
 * Created by vijay.sw on 8/25/2015.
 */
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var Main = require('../bin/www');
var env = process.env.NODE_ENV_DAS;

if (env == 'dev' || env == 'test') {
    Main.main();
}

else {
    if (cluster.isMaster) {
        for (var i = 0; i < numCPUs - 1; i++) {
            cluster.fork();
        }
        cluster.on('exit', function (worker, code, signal) {
            console.error('worker %s died. restart...', worker.process.pid);
            console.error((new Date).toUTCString() + ' worker:' + JSON.stringify(worker));
            var fs = require('fs');
            fs.appendFileSync('/data/logs/das/hard-das-errors.log', (new Date).toUTCString() + ' worker:' + JSON.stringify(worker) + '\n');
            cluster.fork();
        });

    }
    else if (cluster.isWorker) {
        Main.main();
    }
    process.on('uncaughtException', function (err) {
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
        var fs = require('fs');
        fs.appendFileSync('/data/logs/das/hard-das-errors.log', (new Date).toUTCString() + ' uncaughtException:' + err.message + '\n');
        console.error(err.stack);
        process.exit(1);
    });

}
