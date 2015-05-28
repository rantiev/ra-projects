myApp.controller('ticketController', ['toaster', 'project', 'ticket', 'users', '$state', '$scope', function (toaster, project, ticket, users, $state, $scope) {

	$scope.project = project.data;

	$scope.ticket = ticket.data;
	$scope.ticket.status = _.find($scope.project.statuses, {_id: $scope.ticket.status});
	$scope.ticket.priority = _.find($scope.project.priorities, {_id: $scope.ticket.priority});

	$scope.user = _.find(users.data, {_id: $scope.ticket.user});

}]);