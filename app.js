var express = require('express');
var mongoose = require('mongoose');
var config = require('./appConfig');

var app = express();

require('./appConfigure')(app, express);
require('./appSetupRouting')(app, express, config);

mongoose.connect('mongodb://127.0.0.1:27017/ra-projects');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.listen(config.port, function () {
	console.log('Express server listening on port ' + config.port);
});