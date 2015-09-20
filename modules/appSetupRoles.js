var ConnectRoles = require('connect-roles');

var role = new ConnectRoles({
	failureHandler: function (req, res, action) {
		res.status(403);
		res.send('Access Denied - You don\'t have permission to: ' + action);
	}
});

role.use('loggedIn', function (req) {
	return !!req.user;
});

role.use('admin', function (req) {
	return req.user.role === 'admin';
});

role.use('updateUser', function (req) {
	return req.user.role === 'admin' || req.user._id == req.params.id;
});

role.use('removeUser', function (req) {
	return req.user.role === 'admin' || req.user._id == req.params.id;
});

module.exports = role;