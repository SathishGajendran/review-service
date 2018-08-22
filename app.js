/**
 * @name app
 * @description Application main module
 */
'use strict';

//npm modules
var express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./config');

var app = express();

// adding bodyparser middleware to parse body in post request.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello Sathish !!!');
});

// adding modules to server
app.use('/api', require('./modules/api'));
// app.use('/data', require('./modules/review-data-loader'));

//Not found resource handler
app.use(function(req, res) {
  res.status(404).send('Not Found');
});

//Application listener 
app.listen(config.appPort, function() {
  console.log(`Server listening at Port:${ config.appPort }`)
});