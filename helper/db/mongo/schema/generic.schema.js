/**
 * @name helper/db/mongo/schema/generic.schema
 * @description It is a generic schema used to create Mongoose Model
 */
'use strict';

//npm modules
var mongoose = require('mongoose');

//generic schema
let genericSchema = new mongoose.Schema({
  any: {}
}, {
  strict: false,
  versionKey: false
});

module.exports = genericSchema;