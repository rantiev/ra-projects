myApp.controller('ticketNewController', ['toaster', 'ticketsService', 'project', 'users', '$state', '$scope', function (toaster, ticketsService, project, users, $state, $scope) {

	$scope.inProgress = 0;

	$scope.users = users.data;

	$scope.project = project.data;

	$scope.ticket = {
		name: '',
		description: '',
		user: null,
		project: $scope.project._id,
		projectName: $scope.project.name,
		status: null,
		priority: null
	};

	$scope.submitForm = function(){

		var ticket = ticketsService.create($scope.ticket);
		ticket.then(function(){
			$state.go('main.private.projects');
		});
	}

}]);