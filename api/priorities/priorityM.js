var mongoose = require('mongoose');

var prioritySchema = mongoose.Schema({
	name: String,
	color: String,
	order: Number
});

module.exports = mongoose.model('Priority', prioritySchema);