var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var properties = require("./properties.js");

var oneDay = 86400000;

var app = express();

app.use(logfmt.requestLogger());

app.use(express.compress());

app.use(express.static(path.join(__dirname,properties.webroot), { maxAge: oneDay }));

app.use(function(req, res, next){
  res.status(404);
  res.send('404 not found');
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send(err);
});

var port = Number(process.env.PORT || properties.defaultPort);
app.listen(port, function() {
  console.log("Listening on " + port);
});