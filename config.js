/**
 * @name config
 * @description Application config
 */
'use strict';

//config
var config = {
  appPort: 4567,
  mongoDb: {
    host: "localhost",
    port: "27017",
    dbName: "storagehome",
    user: "admin",
    password: "password"
  }
};

module.exports = config;