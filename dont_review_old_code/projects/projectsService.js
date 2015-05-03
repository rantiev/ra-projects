myApp.service('projectsService', function($http){
	/*

	this.getProject = function(projID){
		return _.find(projects, {id: projID});
	}

	this.getProjectName = function(projID){
		var project = _.find(projects, {id: projID});
		if(project){
			return project.name;
		} else {;
			return '';
		}
	}

	this.getProjectsQuantity = function(){
		return projects.length;
	}*/

	this.getProjects = function(){
		return $http({
			method: 'GET',
			url: '/projects'
		});
	}

	this.createProject = function(project){
        project.creationDate = Date.now();
        return $http.post('/projects', {project: project }).
		success(function(data, status, headers, config) {
 			console.log('Project created!');
		}).
		error(function(data, status, headers, config) {
            console.log('error: Project wasn\'t created!');
		});
	}

	this.updateProject = function(project){
		return $http.put('/projects', {project: project }).
			success(function(data, status, headers, config) {
				console.log('Project updated!');
			}).
			error(function(data, status, headers, config) {
				console.log('error: Project wasn\'t updated!');
			});
	}

	this.deleteProject = function(id){
		return $http.delete('/projects/'+id).
			success(function(data, status, headers, config) {
				console.log('Project deleted!');
			}).
			error(function(data, status, headers, config) {
				console.log('error: Project wasn\'t deleted!');
			});
	}

	this.fillProjectPosition = function(projID, posID, emplID){
		return $http.put('/projects',
			{
				projID: projID,
				posID: posID,
				emplID: emplID
			}).
			success(function(data, status, headers, config) {
				console.log('Project updated!');
			}).
			error(function(data, status, headers, config) {
				console.log('error: Project wasn\'t updated!');
			});
	}

	this.removeProjectPosition = function(projID, posID){
		return $http.put('/position/',
			{
				projID: projID,
				posID: posID
			}).
			success(function(data, status, headers, config) {
				console.log('Position updated!');
			}).
			error(function(data, status, headers, config) {
				console.log('error: Position wasn\'t updated!');
			});
	}

	/*this.getProjects = function(){
        return $http({
            method: 'GET',
            url: '/projects'
        });
	}*/

	/*

	this.clearProjectPosition = function(projID, posID){
		if(projID){
			var project = _.find(projects, {id: projID});
			if(project){
				var position = _.find(project.positions, {id: posID});
				if(position){
					position.employeeID = null;
					this.updateProjectPositionEmployee(projID, posID, null);
					return true;
				}
			}
		};
		return false;
	}

	this.updateProjectPositionEmployee = function(projID, posID, emplID){
		if(projID){
			var project = _.find(projects, {id: projID});
			if(project){
				var position = _.find(project.positions, {id: posID});
				if(position){
					if(emplID){
						position.employee = employeesService.getEmployee(emplID);
					} else {
						position.employee = null;
					}
					return true;
				}
			}
		};
		return false;
	}

	this.getPosDates = function(projID, posID){
		if(projID){
			var project = _.find(projects, {id: projID});
			if(project){
				var position = _.find(project.positions, {id: posID});
				if(position){
					return [position.startDate, position.endDate];
				}
			}
		};
		return false;
	}*/

});