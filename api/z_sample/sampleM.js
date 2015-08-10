var mongoose = require('mongoose');

var sampleSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
	statuses: [Status.schema],
	priorities: [Priority.schema]
});

module.exports = mongoose.model('Sample', sampleSchema);