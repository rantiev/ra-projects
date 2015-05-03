myApp.controller('projectController', function($scope, project, users) {

	$scope.project = project.data[0];
	$scope.users = users.data;

});