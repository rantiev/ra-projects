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

//TODO: https private part
//TODO: Registration validation - frontend
//TODO: Project validation
//TODO: Ticket validation

//TODO: Assign user to a project
//TODO: Show only users of the projects user had been assigned for
//TODO: Show only users of the project to the user on ticket creation page

//TODO: Client side messages from serversider

//TODO: refactor css, start using less
//TODO: try GULP
//TODO: start using autoprefixer module

//TODO: Project + User image upload
//TODO: Ticket comments

//TODO: Ticket types
//TODO: Story points
//TODO: Translation
