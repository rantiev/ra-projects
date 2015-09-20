angular.module('ra-projects').controller('ticketNewController', ['toaster', 'ticketsService', 'project', 'users', '$state', '$scope', function (toaster, ticketsService, project, users, $state, $scope) {

	$scope.inProgress = 0;

	$scope.users = users.data;

	$scope.project = project.data;

	console.log(project.data);

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

		console.log($scope.project, $scope.ticket);

		var ticket = ticketsService.create($scope.ticket);
		ticket.then(function(){
			$state.go('main.private.project', {id: $scope.project._id });
			toaster.pop("success", "", "Ticket has been created", 2000);
		});
	}

}]);