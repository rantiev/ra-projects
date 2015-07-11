var mongoose = require('mongoose');
var m = require('../../appConfig').strings.user;
var v = require('../../appHelpers').validation;

var userSchema = mongoose.Schema({
	email: {
		type: String,
		validate: v.email(m.invalidEmail),
		required: true
	},
	fname: {
		type: String,
		validate: v.minMaxLength(m.invalidFname),
		required: true
	},
	lname: {
		type: String,
		validate: v.minMaxLength(m.invalidLname),
		required: true
	},
	image: {
		type: String,
		validate: v.minMaxLength(m.invalidImage),
		required: true
	},
	password: {
		type: String,
		validate: v.password(m.invalidPassword),
		required: true
	},
	accessToken: {
		type: String
	}
});

module.exports = mongoose.model('User', userSchema);