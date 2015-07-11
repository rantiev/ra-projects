var ProjectM = require('./projectM');

module.exports = function (mainRouter, role) {

	mainRouter.post('/project', role.can('loggedIn'), function (req, res) {

		var projectData = req.body;

		projectData.statuses.forEach(function (value) {
			delete value._id;
		});

		projectData.priorities.forEach(function (value) {
			delete value._id;
		});

		var project = new ProjectM(projectData);

		project.save(function (err, project) {
			if (err) {
				console.log(err);
				res.status(404).send('Project wasn\'t created!');
				return;
			}

			res.status(200).send('Project was created!');
		});


	});

	mainRouter.put('/project/:id?', role.can('loggedIn'), function (req, res) {

		var projectData = req.body;

		var criteria = req.params.id ? {_id: req.params.id} : null;

		if (!criteria) {
			res.status(404).send('There are some errors, project wasn\'t updated!');
			return;
		}

		ProjectM.findOne(criteria, function (err, proj) {

			if (err) {
				res.status(404).send('There are some errors, project wasn\'t saved!');
				return;
			}

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

			proj.save(function (err, proj) {
				if (err) {
					res.status(404).send('There are some errors, project wasn\'t saved!');
					return;
				}
				res.status(200).send('Project updated');
			});

		});

	});

	mainRouter.delete('/project/:id?', role.can('loggedIn'), function (req, res) {

		var id = req.params.id ? req.params.id : null;

		if (!id) {
			res.status(404).send('There are some errors, project wasn\'t removed!');
			return;
		}

		ProjectM.findByIdAndRemove(id, function (err) {
			if (err) {
				res.status(404).send('There are some errors, projects can\'t be found!');
				return;
			}
			res.status(200).send(id);
		});

	});

	mainRouter.get('/project/:id?', role.can('loggedIn'), function (req, res) {

		var criteria = req.params.id ? {_id: req.params.id} : null;

		ProjectM.findOne(criteria, function (err, project) {
			if (err) {
				res.status(404).send('Project weren\'t obtained!');
				return;
			}

			res.status(200).json(project);
		});

	});

	mainRouter.get('/projects', role.can('loggedIn'), function (req, res) {

		ProjectM.find({}, function (err, projects) {
			if (err) {
				res.status(404).send('Projects weren\'t obtained!');
				return;
			}
			res.status(200).json(projects);
		});

	});

}