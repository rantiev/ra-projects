var express = require('express');
var router = express.Router();
var SettingsM = require('./settingsM');

router.get('/settings', function (req, res) {

	SettingsM.findOne(function (err, settings) {

		if (err) {
			res.status(404).send('Please Login!');
			return;
		}

		res.status(200).json(settings);

	});

});

module.exports = router;