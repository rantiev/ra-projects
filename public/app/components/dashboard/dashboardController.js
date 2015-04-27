myApp.controller('dashboardController', function($scope, users, projects) {

	$scope.users = users.data;
	$scope.projects = projects.data;

	$scope.setUser = function(user){
		var newUser = _.find($scope.users, {_id: user._id});
		newUser = user;
		return user;
	}

	$scope.setProject = function(project){
		var newProjects = _.find($scope.projects, {_id: project._id});
		newProjects = project;
		return project;
	}

});