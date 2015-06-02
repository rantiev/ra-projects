var SettingsM = require('./settingsM');
var StatusM = require('../statuses/statusM');
var PriorityM = require('../priorities/priorityM');

SettingsM.find(function (err, res) {

	if (!err && !res.length) {

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
			if (!err) {
				console.log('Settings were created!');
			} else {
				console.log('Settings weren\'t created!');
			}
		});

	}

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