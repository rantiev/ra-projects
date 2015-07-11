var SettingsM = require('./settingsM');

module.exports = function (mainRouter, role) {

	mainRouter.get('/settings', role.can('loggedIn'), function (req, res) {

		SettingsM.findOne(function (err, settings) {

			if (err) {
				res.status(404).send('Please Login!');
				return;
			}

			res.status(200).json(settings);

		});

	});

};