myApp.controller('ticketEditController', ['toaster', 'ticketsService', 'ticket', 'users', '$state', '$scope', function (toaster, ticketsService, ticket, users, $state, $scope) {

	$scope.inProgress = 0;

	$scope.users = users.data;

	$scope.ticket = ticket.data;

	$scope.submitForm = function () {
		$scope.inProgress = 1;
		var ticket = ticketsService.update($scope.ticket);

		ticket.then(function () {
			$state.go('main.private.project', {id: $scope.ticket.project._id });
			toaster.pop("success", "", "Ticket has been updated", 2000);
		});
	}

	$scope.removeTicket = function () {

		if(confirm("Do you really want to remove the ticket?")){
			var promise = ticketsService.delete($scope.ticket);
			promise.then(function () {
				$state.go('main.private.project', {id: $scope.ticket.project._id });
				toaster.pop("success", "", "Ticket has been removed", 2000);
			});
		};

	}

}]);