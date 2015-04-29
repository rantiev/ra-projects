var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var _ = require('lodash');
var http = require('http');
var path = require('path');

var app = express();

var db  = require('./api/connectDB.js');

app.set('host', '127.0.0.1');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(function (username, password, done) {
	if(username === 'vasya' && password === 'pupkin') {
		done(null, {firstName: 'Vasya', lastName: 'Pupkin'});
	} else {
		done(null, false);
	}
}));

app.use(session({
	saveUninitialized: false,
	resave: false,
	secret: 'blablalba'
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

app.get('/', function(req, res){
	res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
