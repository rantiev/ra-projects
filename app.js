var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var config = require('./modules/appConfig');

var app = express();

require('./modules/appInstall');
require('./modules/appConfigure')(app, express, config, mongoose);
require('./modules/appSetupRouting')(app, express, config);
require('./modules/appErrorsHandling')(app);

mongoose.connect('mongodb://127.0.0.1:27017/ra-projects');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.listen(config.port, function () {
	console.log('Express server listening on port ' + config.port);
});