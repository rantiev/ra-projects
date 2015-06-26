myApp.controller('projectController', ['toaster', '$state', '$rootScope', '$scope', 'ticketsService', 'project', 'tickets' , function (toaster, $state, $rootScope, $scope, ticketsService, project, tickets) {

	$scope.project = project.data;
	$scope.tickets = tickets.data;

	$scope.tickets.forEach(function (ticket) {
		var priority = _.find($scope.project.priorities, {_id: ticket.priority});
		if (priority) {
			ticket.color = _.find($scope.project.priorities, {_id: ticket.priority}).color;
		}
	});

	$scope.changeTicketStatus = function (ticket, statusID) {

		var originalTicket = _.find($scope.tickets, {_id: ticket._id});

		if (originalTicket) {
			originalTicket.status = statusID;
			ticketsService.update(originalTicket);
		}

	}

	$scope.dropCallback = function (event, index, item, external, type, allowedType) {
		$scope.logListEvent('dropped at', event, index, external, type);
		return item;
	};

	$rootScope.currentProject = $scope.project;

}]);