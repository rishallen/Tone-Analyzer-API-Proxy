"use strict";
var keys = require('../keys.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
let request = require('request');
let username = keys.username;
let password = keys.password;

// this is connected to the routes in server.js

  module.exports = {
    //the attribute(analysis) holds the function
    getAnalysis: function() {
      var tone_analyzer = new ToneAnalyzerV3({
        username: username,
        password: password,
        version: 'v3',
        version_date: '2016-05-19',
  });

    tone_analyzer.tone({
      text: 'A word is dead when it is said, some say. Emily Dickinson'
    },
    function(err, tone) {
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(tone, null, 2));
    });
  }
};
// when you require this file, you get the emotion object with the analysis function in it
