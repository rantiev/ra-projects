myApp.controller('projectController', ['toaster', '$state', '$rootScope', '$scope', 'ticketsService', 'project', 'tickets', 'users', function (toaster, $state, $rootScope, $scope, ticketsService, project, tickets, users) {

	$scope.project = project.data;
	$scope.tickets = tickets.data;
	$scope.users = [];

	users.data.forEach(function (user) {
		$scope.users[user._id] = user;
	});

	$scope.tickets.forEach(function (ticket) {
		var priority = _.find($scope.project.priorities, {_id: ticket.priority});
		if (priority) {
			ticket.color = _.find($scope.project.priorities, {_id: ticket.priority}).color;
		}
	});

	$scope.changeTicketStatus = function (ticket, statusID) {

		var originalTicket = _.find($scope.tickets, {_id: ticket._id});

		if(originalTicket){
			originalTicket.status = statusID;
			ticketsService.update(originalTicket);
		}

	}

/*	$rootScope.currentProject = $scope.project;*/

}]);