var bcrypt = require('bcrypt-nodejs');
var UserM = require('../api/users/userM');

function createAccessToken(user, done) {

	var token = bcrypt.hashSync(user._id);

	UserM.findOne({accessToken: token}, function (err, existingUser) {
		if (err) {
			done(err);
		}
		if (existingUser) {
			createAccessToken(user, done);
		} else {
			user.set('accessToken', token);
			user.save(function (err) {
				if (err) {
					done(err);
				}
				done(null, token);
			});
		}
	});
};

module.exports = createAccessToken;