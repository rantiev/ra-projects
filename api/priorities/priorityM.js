var mongooseQ = require('mongoose-q')();

var prioritySchema = new mongooseQ.Schema({
	name: String,
	color: String,
	order: Number
});

module.exports = mongooseQ.model('Priority', prioritySchema);