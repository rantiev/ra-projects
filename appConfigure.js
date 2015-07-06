var path = require('path');
var bodyParser = require('body-parser');

module.exports = function (app, express) {

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(express.static(path.join(__dirname, 'public')));

};