/*eslint-env node*/
'use strict';

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
// checking Eehita Parameswaran

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


var TradeoffAnalyticsV1 = require('watson-developer-cloud/tradeoff-analytics/v1');

var tradeoff_analytics = new TradeoffAnalyticsV1({
  username: '86c90bba-b4dc-4e1d-9b67-29ec2e273e88',
  password: 'IuWCjrl0ATyJ'
});

// From file
var params = require('problem.json');

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
