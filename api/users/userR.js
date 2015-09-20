var bcrypt = require('bcrypt-nodejs');
var rememberMe = require('../../modules/rememberMe');
var m = require('../../modules/appConfig').strings.user;


var UserM = require('./userM');

module.exports = function (mainRouter, role) {

	mainRouter.post('/user', rememberMe, function (req, res) {

		if (req.body.password) {
			req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
		}

		UserM.createQ(req.body)
			.then(function (user) {

				req.login(user, function (err) {
					if (err) {
						res.status(404).send(m.login.success);
						return;
					}

					res.status(201).send(m.registration.success);
					return;
				});

			})
			.catch(function (err) {

				if (err.name === 'ValidationError' && err.errors) {
					for (var p in err.errors) {
						if (err.errors.hasOwnProperty(p)) {
							res.status(404).send(err.errors[p].message);
						}
					}
				}

				res.status(404).send(m.registration.unknownError);

			});
	});

	mainRouter.put('/user/:id?', role.can('updateUser'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;
		var userData = req.body;


		UserM.findOneQ(criteria)
			.then(function (user) {

				user.fname = userData.fname;
				user.lname = userData.lname;
				user.email = userData.email;

				if (userData.password && userData.password !== userData.passwordConfirm) {
					res.status(404).send(m.invalidConfirmPasswod);
					return;
				}

				user.saveQ()
					.then(function(){
						res.status(200).json(m.update.success);
					})
					.catch(function(err){
						res.status(404).send(m.update.failure);
					});

			})
			.catch(function (err) {
				res.status(404).send(m.notObtained1);
			})

	});

	mainRouter.get('/user/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;

		UserM.findOneQ(criteria)
			.then(function (user) {
				user.password = undefined;
				user.accessToken = undefined;
				res.status(200).json(user);
			})
			.catch(function (err) {
				res.status(404).send(m.notObtained1);
			})

	});

	mainRouter.get('/users', role.is('loggedIn'), function (req, res) {

		UserM.findQ({})
			.then(function (users) {
				users.forEach(function (user) {
					user.password = undefined;
					user.accessToken = undefined;
				});
				res.status(200).json(users);
			})
			.catch(function (err) {
				res.status(404).send(m.notObtainedN);
			})

	});

	mainRouter.delete('/user/:id?', role.can('removeUser'), function (req, res) {

		UserM.findByIdAndRemoveQ(req.params.id)
			.then(function (user) {
				res.status(200).send(m.removed);
			})
			.catch(function (err) {
				res.status(404).send(m.notRemoved);
			})
	});

}