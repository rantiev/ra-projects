var role = require('./appSetupRoles');
var rememberMe = require('./rememberMe');
var createAccessToken = require('./createAccessToken');

module.exports = function (app, express, config) {

	var mainRouter = express.Router();

	var SettingsR = require('../api/settings/settingsR')(mainRouter, role);
	var AuthentificationR = require('../api/authentication/authenticationR')(app, mainRouter, role);
	var UserR = require('../api/users/userR')(mainRouter, role);
	var ProjectR = require('../api/projects/projectR')(mainRouter, role);
	var TicketR = require('../api/tickets/ticketR')(mainRouter, role);

	app.use('/', mainRouter);
	app.use(role.middleware());

};