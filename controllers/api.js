"use strict";
var keys = require('../keys.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
let request = require('request');
let username = keys.username;
let password = keys.password;

// this is connected to the routes in server.js

  module.exports = {
    //the attribute(analysis) holds the function
    // query = request body from the server.js file
    getAnalysis: function(query, callback) {
      var tone_analyzer = new ToneAnalyzerV3({
        username: username,
        password: password,
        version: 'v3',
        version_date: '2016-05-19',
  });

    tone_analyzer.tone({
      // this holds the text
      text:  query.text
    }, callback); // takes a function(error, body) this comes from server.js
  }
};
// when you require this file, you get the emotion object with the analysis function in it
