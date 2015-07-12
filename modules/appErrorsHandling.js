function logErrors(err, req, res, next) {
	if (err) {
		console.log(err);
	}
	next();
};

function clientErrorsHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something blew up!' });
	} else {
		next(err);
	}
}

function errorsHandler(err, req, res, next) {
	res.status(500).send('Something blew up!');
}

module.exports = function (app) {

	app.use(logErrors);
	app.use(clientErrorsHandler);
	app.use(errorsHandler);

};