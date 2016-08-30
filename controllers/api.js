"use strict";
var config          = require('../config.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
let request        = require('request');
var pick           = require('object.pick');
var extend         = require('extend');
let username       = config.USERNAME;
let password       = config.PASSWORD;

// this is connected to the routes in server.js
  module.exports = {
    //the attribute(analysis) holds the function
    //query = request body from the server.js file
    getAnalysis: function(query, callback) {
      var tone_analyzer = new ToneAnalyzerV3({
        username: username,
        password: password,
        version: 'v3',
        version_date: '2016-05-19',
        qs: pick(['tones', 'sentences'])
    });

    tone_analyzer.tone({
      // this holds the text
      text:  query.text
    }, callback); // takes a function(error, body) this comes from server.js
  }
};
