
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var argo = require('argo');
var router = require('argo-url-router');
var resource = require('argo-resource');

var api = argo();
api.use(router);
api.get('/', function(handle){
  handle('request', function(env, next){
    env.response.body = 'Hello, World!';
    next(env)
  });
});

var handler = api.build();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use('/static',express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/firebase', routes.firebase);
app.get('/partials/:name', routes.partials);
app.get('/users', user.list);

app.use('/api', handler.run);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
