var mongooseQ = require('mongoose-q')();
var Schema = mongooseQ.Schema;

var User = require('../users/userM');
var Project = require('../projects/projectM');

var ticketSchema = new mongooseQ.Schema({
	label: String,
	name: String,
	description: String,
	user: String,
	status: String,
	priority: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongooseQ.model('Ticket', ticketSchema);