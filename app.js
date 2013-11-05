
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var house = require('./routes/house');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var HouseProvider = require('./db/HouseProvider.js').HouseProvider;

var app = express();

// For stylus.
function compile(str, path) {
  return stylus(str)
         .set('filename', path)
         .use(nib());
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes

app.get('/', routes.index);
app.get('/house/add', house.add); 

// save new house
app.post('/house/add', function(req, res) {
  HouseProvider.save({
    title: req.param('title'),
    price: req.param('price'),
    url: req.param('url')
  }, function(error, houses) {
    res.redirect('/');
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
