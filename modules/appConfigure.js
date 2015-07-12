var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function (app, express, config) {

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(express.static(path.join(__dirname, '..' , 'public')));

	app.use(session({
		saveUninitialized: false,
		resave: false,
		secret: config.sessionsSecretToken
	}));

};