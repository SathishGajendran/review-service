/**
 * @name helper/db/mongo/
 * @description It is a helper module used to create mongo db connection.
 */
'use strict';

//npm modules
var mongoose = require('mongoose'),
  BlueBird = require('bluebird');
//custom module
var config = require('../../../config');

mongoose.Promise = BlueBird;

//creating db connection
let conStr = "mongodb://" + config.mongoDb.host + ":" + config.mongoDb.port + "/" + config.mongoDb.dbName;
let db = mongoose.createConnection(conStr, {
  user: config.mongoDb.user,
  pass: config.mongoDb.password,
  useNewUrlParser: true
});

db.on('connected', function(d) {
  console.log("Mongo DB connected");
});

db.on('disconnected', function(d) {
  console.log("Mongo DB disconnected");
});

db.on('error', function(d) {
  console.log("Connection error");
});

module.exports = db;