var ConnectRoles = require('connect-roles');
var role = new ConnectRoles();

role.use('loggedIn', function (req) {
	return req.user ? true : false;
});

module.exports = role;