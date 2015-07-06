var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

var rememberMe = require('./modules/rememberMe');
var createAccessToken = require('./modules/createAccessToken');

var UserM = require('./api/users/userM');
var UserR = require('./api/users/userR');
var SettingsR = require('./api/settings/settingsR');
var SettingsC = require('./api/settings/settingsC');
var ProjectR = require('./api/projects/projectR');
var TicketR = require('./api/tickets/ticketR');

module.exports = function (app, express, config) {

	var mainRouter = express.Router();

	app.use(session({
		saveUninitialized: false,
		resave: false,
		secret: config.sessionsSecretToken
	}));

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (username, password, done) {

		UserM.findOne({email: username}, function (err, user) {
			if (err) {
				done(err);
			}
			if (user && bcrypt.compareSync(password, user.password)) {
				done(null, user);
			} else {
				done(null, false);
			}
		});

	}));
	passport.serializeUser(function (user, done) {
		if (user) {
			createAccessToken(user, done);
		} else {
			done(null, false);
		}
	});
	passport.deserializeUser(function (token, done) {
		UserM.findOne({accessToken: token}, function (err, user) {
			if (err) {
				done(err);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	});

	app.use(passport.initialize());
	app.use(passport.session());

	mainRouter.post('/login', passport.authenticate('local'), rememberMe, function (req, res) {
		res.status(200).send();
	});
	mainRouter.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
	mainRouter.post('/check', function (req, res) {

		if (!req.user) {
			res.status(404).send('Please Login!');
		}

		res.status(200).send();
	});

	app.use('/', mainRouter);
	app.use('/', UserR);
	app.use('/', SettingsR);
	app.use('/', ProjectR);
	app.use('/', TicketR);

};