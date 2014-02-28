
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var login = require('./routes/login');
var index = require('./routes/index');
var log = require('./routes/log');
var activity = require('./routes/activity');
var log_activity = require('./routes/log_activity');
var settings = require('./routes/settings');
// var lifeExp = 83;


var mongoose = require('mongoose');
var models   = require('./models');
// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'HCI';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
//app.get('/', login.view); remove login for now
app.get('/', index.view);
app.get('/log', log.view);
app.post('/log/update', log.update);
app.post('/log_activity', log_activity.add);
app.post('/settings/newGroup', settings.addGroup);
app.post('/settings/newItem', settings.addItem);
app.post('/settings/removeGroup', settings.removeGroup);
app.post('/settings/removeItem', settings.removeItem);
app.get('/activity', activity.view);
app.get('/settings', settings.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
