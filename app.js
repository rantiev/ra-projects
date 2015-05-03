var http = require('http');
var path = require('path');

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

var _ = require('lodash');

var User = require('./api/users/userM');

var app = express();

app.set('host', '127.0.0.1');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	saveUninitialized: false,
	resave: false,
	secret: 'Something strange-happens-here_this_summer_sometimes!!!!!////===++-'
}));

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function (username, password, done) {

	User.findOne({email: username}, function (err, user) {
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
		CreateAccessToken(user, done);
	} else {
		done(null, false);
	}
});

passport.deserializeUser(function(token, done) {
	User.findOne({accessToken: token}, function(err, user) {
		if(err){
			done(err);
		}
		if(user){
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

function CreateAccessToken(user, done) {

	var token = bcrypt.hashSync(user._id);

	User.findOne({accessToken: token}, function(err, existingUser) {

		if (err) {
			done(err);
		}
		if (existingUser) {
			CreateAccessToken(user, done);
		} else {
			user.set('accessToken', token);
			user.save(function(err) {
				if (err) {
					done(err);
				}
				done(null, token);
			})
		}
	});
};

function RememberMe(req, res, next) {
	if (req.body.remember) {
		req.session.cookie.maxAge = 1000 * 60 * 3;
	} else {
		req.session.cookie.expires = false;
	}
	next();
};

app.use(passport.initialize());
app.use(passport.session());

app.post('/register', RememberMe, function (req, res) {

	if (req.body.password) {
		req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
	}

	User.create(req.body, function (err, user) {
		if (err) {
			res.status(404).send('There are some errors, user wasn\'t saved!');
		}

		if(user){
			req.login(user, function(err) {
				if (err) {
					res.status(404).send('There are some errors, user wasn\'t saved!');
				}
				res.status(201).send();
			});
		} else {
			res.status(404).send('There are some errors, user wasn\'t saved!');
		}

	});

});

app.post('/login', passport.authenticate('local'), RememberMe, function (req, res) {
	res.status(200).send();
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.post('/check', function (req, res) {

	if (!req.user) {
		res.status(404).send('There are some errors, user wasn\'t saved!');
	}

	res.status(200).send();
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ra-projects');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
