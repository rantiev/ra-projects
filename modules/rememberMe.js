function rememeberMe(req, res, next) {
	if (req.body.remember) {
		req.session.cookie.maxAge = 1000 * 60 * 60;
	} else {
		req.session.cookie.expires = false;
	}
	next();
};

module.exports = rememeberMe;