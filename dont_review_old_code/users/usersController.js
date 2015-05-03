myApp.controller('usersController', function($scope, projects, users) {

	$scope.projects = projects.data;
	$scope.users = users.data;

});