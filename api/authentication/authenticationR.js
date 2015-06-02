var express = require('express');
var router = express.Router();

router.post('/login', passport.authenticate('local'), RememberMe, function (req, res) {
	res.status(200).send();
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/check', function (req, res) {

	if (!req.user) {
		res.status(404).send('Please Login!');
	}

	res.status(200).send();
});

module.exports = router;