//Create admin user
var bcrypt = require('bcrypt-nodejs');
var UserM = require('../api/users/userM');
var adminPass = bcrypt.hashSync('123123123', bcrypt.genSaltSync());


UserM.find({role: 'admin'}, function (err, admin) {

	if (err || admin.length) {
		return;
	}

	UserM.create({
		email: 'admin@gmail.com',
		fname: 'Admin',
		lname: 'Adminov',
		role: 'admin',
		image: 'john_doe.jpg',
		password: adminPass
	}, function (err, settings) {
		if (err) {
			console.log('Admin hasn\'t been created!');
			return;
		}
		console.log('Admin has been created!');
	});

});

//Create default settings
var SettingsM = require('../api/settings/settingsM');
var StatusM = require('../api/statuses/statusM');
var PriorityM = require('../api/priorities/priorityM');

SettingsM.find(function (err, res) {

	if (err || res.length) {
		return;
	}


	var statuses = [
		'To Do',
		'In Progress',
		'Done'
	];
	var statusesPrepared = prepareStatuses(statuses);

	var priorities = [
		'Minor',
		'Major',
		'Critical'
	];
	var prioritiesPrepared = preparePriorities(priorities);

	SettingsM.create({
		statuses: statusesPrepared,
		priorities: prioritiesPrepared,
		incrementTickets: 1
	}, function (err, settings) {
		if (err) {
			console.log('Settings weren\'t created!');
			return;
		}
		console.log('Settings were created!');
	});


});

function prepareStatuses(array) {

	var res = [];

	for (var i = 0; i < array.length; i++) {
		res[i] = new StatusM({
			name: array[i],
			order: i
		});
	}

	return res;
}
function preparePriorities(array) {

	var res = [];
	var colors = [
		'green',
		'orange',
		'red'
	];

	for (var i = 0; i < array.length; i++) {
		res[i] = new PriorityM({
			name: array[i],
			order: i,
			color: colors[i]
		});
	}

	return res;
}

module.exports = {};