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
var path = require("path");
var bootstrap = require("express-bootstrap-service");
var d3 = require("d3");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bootstrap.serve);

//Enable All CORS Requests
app.use(cors());


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.get("/",function(req,res){
  // res.sendFile(path + "index.html", { root: __dirname });
  res.send('index.html');
});

router.get('/the_science',function(req,res){
  res.send("the_science.html");
});

router.get('/getting_started',function(req,res){
  res.send("getting_started.html");
});


// endpoint
router.post('/v1/analyze', function(req, res) {
  res.json({
    message: req.body.text
  });
});

// path on my app
router.post('/analyze', function (request, response, next) { // function is a callback and it wildo the thing
  // console.log('this is the request', request);
  console.log('got here', apiController);
  // console.log('this is a body request', request.body);
  apiController.getAnalysis(request.body, function (error, apiResponseobject, body) {  // json always patterned as error, results
    console.log('this is the body response', body);
    // console.log('this is the error', error);
    if (error) { response.status(500).json({ error: error.message }); }
    // console.log('reached success!');
    response.json(JSON.parse(body.body));

  });
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

// print the type of http request that route is referring to
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

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
