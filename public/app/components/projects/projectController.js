myApp.controller('projectController', ['toaster', '$state', '$rootScope', '$scope', 'ticketsService', 'project', 'tickets' , function (toaster, $state, $rootScope, $scope, ticketsService, project, tickets) {

	$scope.project = project.data;
	$scope.tickets = tickets.data;

	$scope.lists = [];

	$scope.project.statuses.forEach(function (status, i) {
		$scope.lists[i] = [];
	});

	$scope.tickets.forEach(function (ticket) {
		var priority = _.find($scope.project.priorities, {_id: ticket.priority});
		if (priority) {
			ticket.color = _.find($scope.project.priorities, {_id: ticket.priority}).color;
		}

		var index = _.findIndex($scope.project.statuses, {_id: ticket.status});
		if(~index) {
			$scope.lists[index].push(ticket);
		}
	});

	$scope.changeTicketStatus = function (ticket, index) {

		ticket.status = $scope.project.statuses[index]._id;
		ticketsService.update(ticket);

		return ticket;
	}

	$rootScope.currentProject = $scope.project;

}]);