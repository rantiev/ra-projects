myApp.controller('projectsController', function($scope, projects, users) {

	$scope.projects = projects.data;
	$scope.users = users.data;

});