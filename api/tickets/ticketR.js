var SettingsM = require('../settings/settingsM');
var TicketM = require('./ticketM');

module.exports = function (mainRouter, role) {

	mainRouter.post('/ticket', role.can('loggedIn'), function (req, res) {

		SettingsM.findOne({}, function (err, setting) {

			if (err) {
				res.status(404).send('I\'m tired to write different error messages already, fk off!');
				return;
			}

			var ticket = new TicketM(req.body);

			ticket.label = req.body.projectName.substr(0, 2).toUpperCase() + '-' + setting.incrementTickets;

			setting.incrementTickets++;
			setting.save();

			ticket.save(function (err, ticket) {
				if (err) {
					res.status(404).send('Ticket wasn\'t created!');
					return;
				}
				res.status(200).send('Ticket was created!');
			});

		});

	});

	mainRouter.put('/ticket/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;

		var ticketData = req.body;

		delete ticketData._id;

		TicketM.update(criteria, ticketData, function (err, ticket) {
			if (err) {
				res.status(404).send('There are some errors, ticket wasn\'t saved!');
				return;
			}
			res.status(201).json(ticket);
		});

	});

	mainRouter.get('/ticket/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;
		var popullateQ = [
			{
				path: 'user',
				select: 'fname lname image'
			},
			{
				path: 'project',
				select: '_id statuses priorities'
			}
		];

		TicketM.findOne(criteria)
			.populate(popullateQ)
			.exec(function (err, ticket) {
				if (err) {
					res.status(404).send('Ticket weren\'t obtained!');
					return;
				}
				res.status(200).json(ticket);
			});

	});

	mainRouter.delete('/ticket/:id?', role.can('loggedIn'), function (req, res) {

		var id = req.params.id ? req.params.id : null;

		if (!id) {
			res.status(404).send('There are some errors, ticket wasn\'t removed!');
			return;
		}

		TicketM.findByIdAndRemove(id, function (err) {
			if (err) {
				res.status(404).send('There are some errors, tickets can\'t be found!');
				return;
			}
			res.status(200).send(id);
		});

	});

	mainRouter.get('/tickets/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {project: req.params.id} : null;
		var popullateQ = [
			{
				path: 'user',
				select: 'fname lname image'
			}
		];

		TicketM.find(criteria)
			.populate(popullateQ)
			.exec(function (err, tickets) {
				if (err) {
					res.status(404).send('Tickets weren\'t obtained!');
					return;
				}
				res.status(200).json(tickets);
			});

	});

}