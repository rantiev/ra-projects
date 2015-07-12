var bcrypt = require('bcrypt-nodejs');
var rememberMe = require('../../modules/rememberMe');
var m = require('../../modules/appConfig').strings.user;


var UserM = require('./userM');

module.exports = function (mainRouter, role) {

	mainRouter.post('/user', role.can('loggedIn'), rememberMe, function (req, res) {

		if (req.body.password) {
			req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
		}

		UserM.create(req.body, function (err, user) {
			if (err) {
				if(err.name === 'ValidationError' && err.errors){
					for (var p in err.errors) {
						if(err.errors.hasOwnProperty(p)){
							res.status(404).send(err.errors[p].message);
							return;
						}
					}
				}

				res.status(404).send(m.registration.unknownError);
				return;
			}

			if (user) {
				req.login(user, function (err) {
					if (err) {
						res.status(404).send('User wasn\'t logged In!');
					}
					res.status(201).send(m.registration.success);
				});
			} else {
				res.status(404).send(m.registration.unknownError);
			}

		});

	});

	mainRouter.get('/user/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;

		UserM.findOne(criteria, function (err, user) {
			if (err) {
				res.status(404).send('User wasn\'t obtained!');
				return;
			}

			user.password = undefined;

			res.status(200).json(user);
		});

	});

	mainRouter.get('/users', role.can('loggedIn'), function (req, res) {

		UserM.find({}, function (err, users) {
			if (err) {
				res.status(404).send('Users weren\'t obtained!');
				return;
			}

			users.forEach(function (user) {
				user.password = undefined;
			});

			res.status(200).json(users);
		});

	});

}
