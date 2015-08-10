var mongooseQ = require('mongoose-q')();
var m = require('../../modules/appConfig').strings.user;
var v = require('../../modules/appHelpers').validation;

var userSchema = new mongooseQ.Schema({
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
	role: {
		type: String
	},
	accessToken: {
		type: String
	}
});

module.exports = mongooseQ.model('User', userSchema);