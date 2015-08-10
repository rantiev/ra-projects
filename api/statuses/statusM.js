var mongooseQ = require('mongoose-q')();

var statusSchema = new mongooseQ.Schema({
	name: String,
	order: Number
});

module.exports = mongooseQ.model('Status', statusSchema);