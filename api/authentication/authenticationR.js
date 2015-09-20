var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rememberMe = require('../../modules/rememberMe');
var createAccessToken = require('../../modules/createAccessToken');

var bcrypt = require('bcrypt-nodejs');

var UserM = require('../users/userM');

module.exports = function (app, mainRouter, role) {

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (username, password, done) {

		UserM.findOneQ({email: username})
			.then(function(user){

				if (user && bcrypt.compareSync(password, user.password)) {
					done(null, user);
				} else {
					done(null, false);
				}

			})
			.catch(function(err){
				done(err);
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
		UserM.findOneQ({accessToken: token})
			.then(function(user){

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}

			})
			.catch(function(err){
				done(err);
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
			return;
		}

		var currentUser = {
			id: req.user._id,
			role: req.user.role
		};

		res.status(200).json(currentUser);
	});

};