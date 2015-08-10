var mongooseQ = require('mongoose-q')();

var settingsSchema = new mongooseQ.Schema({
	statuses: Array,
	priorities: Array,
	incrementTickets: Number
});

module.exports = mongooseQ.model('Settings', settingsSchema);