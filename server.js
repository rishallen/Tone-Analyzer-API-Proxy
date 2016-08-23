// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var apiController = require('./controllers/api');
var https = require('https');
var fs = require('fs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable All CORS Requests
app.use(cors());


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// endpoint
router.post('/v1/analyze', function(req, res) {
  // console.log('we have arrived!', req.body);
  res.json({
    message: req.body.text
  });
});

// path on my app
// the request is where the http request is passeed through
// express is an object that has keys and one of the keys is router
router.post('/analyze', function (request, response, next) { // function is a callback and it wildo the thing
  // make query params from what we are getting back from the API
  // console.log('this is the request', request);
  console.log('got here', apiController);
  // this is accessing the request, but only the body
  // this is being passed
  // console.log('this is a body request', request.body);
  apiController.getAnalysis(request.body, function (error, apiResponseobject, body) {  // json always patterned as error, results
    // console.log('this is the body response', body);
    // console.log('this is the error', error);
    if (error) { response.status(500).json({ error: error.message }); }
    // if no error, render the results
    console.log('reached success!');
        // console.log('what is in here?', body.body);
    response.json(JSON.parse(body.body));

  });
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
// Setup HTTPS
var options = {
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.pem')
};

var secureServer = https.createServer(options, app).listen(port);
console.log('Magic happens on port ' + port);

module.exports = router;
