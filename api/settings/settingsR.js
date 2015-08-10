var SettingsM = require('./settingsM');

module.exports = function (mainRouter, role) {

	mainRouter.get('/settings', role.can('loggedIn'), function (req, res) {

		SettingsM.findOneQ()
			.then(function(settings){
				res.status(200).json(settings);
			})
			.catch(function(err){
				res.status(404).send();
			});

	});

};