var http = require('http');
var path = require('path');

/*var Promise = require("bluebird");*/

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

var _ = require('lodash');

var User = require('./api/users/userM');
var Settings = require('./api/settings/settingsM');
var Project = require('./api/projects/projectM');
var Ticket = require('./api/tickets/ticketM');
var Status = require('./api/statuses/statusM');
var Priority = require('./api/priorities/priorityM');

/*Promise.promisifyAll(Settings);
 Promise.promisifyAll(Project);*/

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

passport.deserializeUser(function (token, done) {
	User.findOne({accessToken: token}, function (err, user) {
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

function CreateAccessToken(user, done) {

	var token = bcrypt.hashSync(user._id);

	User.findOne({accessToken: token}, function (err, existingUser) {

		if (err) {
			done(err);
		}
		if (existingUser) {
			CreateAccessToken(user, done);
		} else {
			user.set('accessToken', token);
			user.save(function (err) {
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
		req.session.cookie.maxAge = 1000 * 60 * 60;
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
			return;
		}

		if (user) {
			req.login(user, function (err) {
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
		res.status(404).send('Please Login!');
	}

	res.status(200).send();
});

app.get('/settings', function (req, res) {

	Settings.findOne(function (err, settings) {

		if (err) {
			res.status(404).send('Please Login!');
			return;
		}

		res.status(200).json(settings);

	});

});


app.post('/project', function (req, res) {

	var projectData = req.body;

	projectData.statuses.forEach(function (value) {
		delete value._id;
	});

	projectData.priorities.forEach(function (value) {
		delete value._id;
	});

	var project = new Project(projectData);

	project.save(function (err, project) {
		if (err) {
			console.log(err);
			res.status(404).send('Project wasn\'t created!');
			return;
		}

		res.status(200).send('Project was created!');
	});


});

app.put('/project/:id?', function (req, res) {

	var projectData = req.body;

	var criteria = req.params.id ? {_id: req.params.id} : null;

	if (!criteria) {
		res.status(404).send('There are some errors, project wasn\'t updated!');
		return;
	}

	Project.findOne(criteria, function (err, proj) {

		if (err) {
			res.status(404).send('There are some errors, project wasn\'t saved!');
			return;
		}

		proj.name = projectData.name;
		proj.description = projectData.description;
		proj.image = projectData.image;

		projectData.statuses.forEach(function (newStatus) {
			var status = proj.statuses.id(newStatus._id);
			if (status) {
				status.name = newStatus.name;
			} else {
				proj.statuses.push(newStatus);
			}
		});

		projectData.priorities.forEach(function (newPriority) {
			var priority = proj.priorities.id(newPriority._id);
			if (priority) {
				priority.name = newPriority.name;
				priority.color = newPriority.color;
			} else {
				proj.priorities.push(newPriority);
			}
		});

		proj.save(function (err, proj) {
			if (err) {
				res.status(404).send('There are some errors, project wasn\'t saved!');
				return;
			}
			res.status(200).send('Project updated');
		});

	});

});

app.delete('/project/:id?', function (req, res) {

	var id = req.params.id ? req.params.id : null;

	if (!id) {
		res.status(404).send('There are some errors, project wasn\'t removed!');
		return;
	}

	Project.findByIdAndRemove(id, function (err) {
		if (err) {
			res.status(404).send('There are some errors, projects can\'t be found!');
			return;
		}
		res.status(200).send(id);
	});

});

app.get('/projects', function (req, res) {

	Project.find({}, function (err, projects) {
		if (err) {
			res.status(404).send('Projects weren\'t obtained!');
			return;
		}
		res.status(200).json(projects);
	});

});

app.get('/project/:id?', function (req, res) {

	var criteria = req.params.id ? {_id: req.params.id} : null;

	Project.findOne(criteria, function (err, project) {
		if (err) {
			res.status(404).send('Project weren\'t obtained!');
			return;
		}
		res.status(200).json(project);
	});

});


app.post('/ticket', function (req, res) {

	Settings.findOne({}, function(err, setting){

		if(err){
			res.status(404).send('I\'m tired to write different error messages already, fk off!');
			return;
		}

		var ticket = new Ticket(req.body);

		ticket.label = req.body.projectName.substr(0,2).toUpperCase() + '-' + setting.incrementTickets;

		setting.incrementTickets++;
		setting.save();

		ticket.save(function (err, ticket) {
			if (err) {
				res.status(404).send('Ticket wasn\'t created!');
				return;
			}
			res.status(200).send('Ticket was created!');
		});

	});

});

app.get('/ticket/:id?', function (req, res) {

	var criteria = req.params.id ? {_id: req.params.id} : null;

	Ticket.findOne(criteria, function (err, ticket) {
		if (err) {
			res.status(404).send('Ticket weren\'t obtained!');
			return;
		}
		res.status(200).json(ticket);
	});

});

app.put('/ticket/:id?', function (req, res) {

	var criteria = req.params.id ? {_id: req.params.id} : null;

	var ticketData = req.body;

	delete ticketData._id;

	Ticket.update(criteria, ticketData, function (err, ticket) {
		if (err) {
			res.status(404).send('There are some errors, ticket wasn\'t saved!');
			return;
		}
		res.status(201).json(ticket);
	});

});

app.delete('/ticket/:id?', function (req, res) {

	Ticket.findByIdAndRemove(req.route.params.id, function (err) {
		if (!err) {
			res.status(404).send('There are some errors, tickets can\'t be found!');
			return;
		}
		res.status(200).send(req.route.params.id);
	});

});

app.get('/tickets/:id?', function (req, res) {

	var criteria = req.params.id ? {project: req.params.id} : null;

	Ticket.find(criteria, function (err, tickets) {
		if (err) {
			res.status(404).send('Tickets weren\'t obtained!');
			return;
		}
		res.status(200).json(tickets);
	});

});

app.get('/users', function (req, res) {

	User.find({}, function (err, users) {
		if (err) {
			res.status(404).send('Users weren\'t obtained!');
			return;
		}

		users.forEach(function (user) {
			delete user.password;
		});

		res.status(200).json(users);
	});

});


var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ra-projects');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

Settings.find(function (err, res) {

	if (!err && !res.length) {

		var statuses = [
			'To Do',
			'In Progress',
			'Done'
		];
		var statusesPrepared = prepareStatuses(statuses);

		var priorities = [
			'Minor',
			'Major',
			'Critical'
		];
		var prioritiesPrepared = preparePriorities(priorities);

		Settings.create({
			statuses: statusesPrepared,
			priorities: prioritiesPrepared,
			incrementTickets: 1
		}, function (err, settings) {
			if (!err) {
				console.log('Settings were created!');
			} else {
				console.log('Settings weren\'t created!');
			}
		});

	}

});


function prepareStatuses(array) {

	var res = [];

	for (var i = 0; i < array.length; i++) {
		res[i] = new Status({
			name: array[i],
			order: i
		});
	}

	return res;
}

function preparePriorities(array) {

	var res = [];
	var colors = [
		'green',
		'orange',
		'red'
	];

	for (var i = 0; i < array.length; i++) {
		res[i] = new Priority({
			name: array[i],
			order: i,
			color: colors[i]
		});
	}

	return res;
}
