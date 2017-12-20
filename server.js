var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var cluster = require('cluster');

var app = express();

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

var routes = require('./src/mongodb/index.js');

// api url
app.get('/blood', routes.index);
app.post('/blood/add', routes.addBloodToDB);
app.put('/blood/update/:id', routes.updateBloodToDB);
app.get('/blood/:id', routes.oneBlood);
app.get('/filter/getbyemail', routes.getByEmail);
app.get('/filter/blood', routes.filterBlood);


var workers = process.env.WORKERS || require('os').cpus().length;

if (cluster.isMaster) {

    console.log('start cluster with %s workers', workers);

    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        console.log('worker %s started.', worker.pid);
    }

    cluster.on('exit', function(worker) {
        console.log('worker %s died. restart...', worker.process.pid);
        cluster.fork();
    });

} else {
    // create NodeJS HTTP server using 'app'
    http.createServer(app).listen(app.get('port'), function() {
        console.log("Express server listening on port " + app.get('port'));
    });
}

process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
})