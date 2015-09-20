var SettingsM = require('../settings/settingsM');
var TicketM = require('./ticketM');
var m = require('../../modules/appConfig').strings.ticket;

module.exports = function (mainRouter, role) {

	mainRouter.post('/ticket', role.can('loggedIn'), function (req, res) {

		SettingsM.findOneQ()
			.then(function (setting) {

				var ticket = new TicketM(req.body);

				ticket.label = req.body.projectName.substr(0, 2).toUpperCase() + '-' + setting.incrementTickets;

				setting.incrementTickets++;
				setting.save();

				ticket.saveQ()
					.then(function(ticket){
						res.status(200).send(m.create.success);
					})
					.catch(function(err){
						res.status(404).send(m.create.failure);
					});

			})
			.catch(function (err) {
				console.log(err);
				res.status(404).send(m.emptySettings);
			});

	});

	mainRouter.put('/ticket/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;

		var ticketData = req.body;

		delete ticketData._id;

		TicketM.updateQ(criteria, ticketData)
			.then(function(ticket){
				res.status(201).json(ticket);
			})
			.catch(function(err){
				res.status(404).send(m.create.failure);
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
			.execQ()
			.then(function(ticket){
				res.status(200).json(ticket);
			})
			.catch(function(err){
				res.status(404).send(m.notObtained1);
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
			.execQ()
			.then(function(tickets){
				res.status(200).json(tickets);
			})
			.catch(function(err){
				res.status(404).send(m.notObtainedN);
			});

	});

	mainRouter.delete('/ticket/:id?', role.can('loggedIn'), function (req, res) {

		var id = req.params.id ? req.params.id : null;

		if (!id) {
			res.status(404).send('There are some errors, ticket wasn\'t removed!');
			return;
		}

		TicketM.findByIdAndRemoveQ(id)
			.then(function(tickets){
				res.status(200).send(m.remove.success);
			})
			.catch(function(err){
				res.status(404).send(m.remove.failure);
			});

	});

}