myApp.controller('ticketController', ['toaster', 'ticket', '$state', '$scope', function (toaster, ticket, $state, $scope) {

	$scope.ticket = ticket.data;
	$scope.ticket.status = _.find($scope.ticket.project.statuses, {_id: $scope.ticket.status});
	$scope.ticket.priority = _.find($scope.ticket.project.priorities, {_id: $scope.ticket.priority});

}]);