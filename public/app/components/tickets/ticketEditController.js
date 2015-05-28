myApp.controller('ticketEditController', ['toaster', 'ticketsService', 'ticket', 'project', 'users', '$state', '$scope', function (toaster, ticketsService, ticket, project, users, $state, $scope) {

	$scope.inProgress = 0;

	$scope.users = users.data;

	$scope.project = project.data;

	$scope.ticket = ticket.data;

	$scope.submitForm = function () {
		$scope.inProgress = 1;
		var ticket = ticketsService.update($scope.ticket);
		ticket.then(function () {
			$state.go('main.private.projects');
		});
	}

}]);