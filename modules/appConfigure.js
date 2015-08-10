var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function (app, express, config, mongoose) {

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(express.static(path.join(__dirname, '..' , 'public')));

	app.use(session({
		saveUninitialized: false,
		resave: false,
		secret: config.sessionsSecretToken,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	}));

};