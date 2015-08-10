var mongooseQ = require('mongoose-q')();

var StatusM = require('../statuses/statusM');
var PriorityM = require('../priorities/priorityM');

var projectSchema = new mongooseQ.Schema({
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

module.exports = mongooseQ.model('Project', projectSchema);