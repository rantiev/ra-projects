angular.module('ra-projects').service('projectsService', ['$http', function($http){

	this.create = function(project){

		return $http.post('/project', project)
			.success(function (data, status, headers, config) {
				console.log('Project was created!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: Project wasn\'t created!');
			});;

	}

	this.update = function(project){

		return $http.put('/project/' + project._id, project)
			.success(function (data, status, headers, config) {
				console.log('Project was updated!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: Project wasn\'t updated!');
			});;

	}

	this.delete = function(project){

		return $http.delete('/project/' + project._id)
			.success(function (data, status, headers, config) {
				console.log('Project was deleted!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: Project wasn\'t deleted!');
			});;

	}

	this.getAll = function(){

		return $http.get('/projects')
			.success(function (data, status, headers, config) {
				console.log('Projects obtained!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: Projects weren\'t obtained!');
			});;

	}

	this.getOne = function(id){

		return $http.get('/project/' + id)
			.success(function (data, status, headers, config) {
				console.log('Project obtained!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: Project weren\'t obtained!');
			});;

	}

}]);