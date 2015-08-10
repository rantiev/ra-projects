var ProjectM = require('./projectM');
var TicketM = require('../tickets/ticketM')
var m = require('../../modules/appConfig').strings.project;

module.exports = function (mainRouter, role) {

	mainRouter.post('/project', role.can('loggedIn'), function (req, res) {

		var projectData = req.body;

		projectData.statuses.forEach(function (v) {
			delete v._id;
		});

		projectData.priorities.forEach(function (v) {
			delete v._id;
		});

		var project = new ProjectM(projectData);

		project.saveQ()
			.then(function(project){
				res.status(200).send(m.create.success);
			})
			.catch(function(err){
				res.status(404).send(m.create.failure);
			});

	});

	mainRouter.put('/project/:id?', role.can('loggedIn'), function (req, res) {

		var projectData = req.body;

		var criteria = req.params.id ? {_id: req.params.id} : null;

		if (!criteria) {
			res.status(404).send(m.update.failure);
			return;
		}

		ProjectM.findOneQ(criteria)
			.then(function(proj){

				proj.name = projectData.name;
				proj.description = projectData.description;
				proj.image = projectData.image;

				projectData.statuses.forEach(function (newStatus) {
					var status = proj.statuses.id(newStatus._id);
					if (status) {
						status.name = newStatus.name;
						status.order = newStatus.order;
						status.dontRemove = true;
					} else {
						proj.statuses.push(newStatus);
					}
				});

				proj.statuses.forEach(function (item, index) {
					if (!item.dontRemove) {
						proj.statuses.splice(index, 1);
					}
				});

				projectData.priorities.forEach(function (newPriority) {
					var priority = proj.priorities.id(newPriority._id);
					if (priority) {
						priority.name = newPriority.name;
						priority.color = newPriority.color;
						priority.order = newPriority.order;
						priority.dontRemove = true;
					} else {
						proj.priorities.push(newPriority);
					}
				});

				proj.priorities.forEach(function (item, index) {
					if (!item.dontRemove) {
						proj.priorities.splice(index, 1);
					}
				});

				proj.saveQ()
					.then(function(){
						res.status(200).send(m.update.success);
					})
					.catch(function(err){
						res.status(404).send(m.update.failure);
					});

			})
			.catch(function(err){
				res.status(404).send(m.update.failure);
			});

	});

	mainRouter.delete('/project/:id?', role.can('loggedIn'), function (req, res) {

		var id = req.params.id ? req.params.id : null;

		if (!id) {
			res.status(404).send(m.remove.failure);
			return;
		}

		ProjectM.findByIdAndRemoveQ(id)
			.then(function(id){

				TicketM.removeQ({project: id})
					.then(function(id){
						res.status(200).send(m.remove.success);
					})
					.catch(function(err){
						res.status(404).send(m.remove.failure);
					});

			})
			.catch(function(err){
				res.status(404).send(m.remove.failure);
			});

	});

	mainRouter.get('/project/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;

		ProjectM.findOneQ(criteria)
			.then(function(project){
				res.status(200).json(project);
			})
			.catch(function(err){
				res.status(404).send(m.notObtained1);
			});

	});

	mainRouter.get('/projects', role.can('loggedIn'), function (req, res) {

		ProjectM.findQ({})
			.then(function(projects){
				res.status(200).json(projects);
			})
			.catch(function(err){
				res.status(404).send(m.notObtained1);
			});

	});

}