var mongoose = require('mongoose');

var settingsSchema = mongoose.Schema({
	statuses: Array,
	priorities: Array,
	incrementTickets: Number
});

module.exports = mongoose.model('Settings', settingsSchema);