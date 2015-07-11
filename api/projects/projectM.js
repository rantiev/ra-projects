var mongoose = require('mongoose');

var StatusM = require('../statuses/statusM');
var PriorityM = require('../priorities/priorityM');

var projectSchema = mongoose.Schema({
	name: String,
	description: String,
	image: String,
	statuses: [StatusM.schema],
	priorities: [PriorityM.schema]
/*	creationDate: Date,
	startDate: Date,
	endDate: Date,
	positions: Array*/
});

module.exports = mongoose.model('Project', projectSchema);