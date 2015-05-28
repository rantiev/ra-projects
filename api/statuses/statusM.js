var mongoose = require('mongoose');

var statusSchema = mongoose.Schema({
	name: String,
	order: Number
});

module.exports = mongoose.model('Status', statusSchema);