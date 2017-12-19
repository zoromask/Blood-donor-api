var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');

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
app.get('/filter/blood', routes.filterBlood);

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});