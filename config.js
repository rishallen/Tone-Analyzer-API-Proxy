// setup for production environment using the env variables(process.env)
var config = {};

if (process.env.NODE_ENV === "production") {
  config.PASSWORD = process.env.PASSWORD;
  config.USERNAME = process.env.USERNAME;
} else {
  var keys = require("./keys");
  config.PASSWORD = keys.PASSWORD;
  config.USERNAME = keys.USERNAME;
}

module.exports = config;
