myApp.controller('projectController', ['toaster', '$state', '$scope', 'project', 'tickets', 'users', function (toaster, $state, $scope, project, tickets, users) {

	$scope.project = project.data;
	$scope.tickets = tickets.data;
	$scope.users = [];

	users.data.forEach(function(user){
		$scope.users[user._id] = user;
	});

	$scope.tickets.forEach(function(ticket){
		var priority = _.find($scope.project.priorities, {_id: ticket.priority});
		if(priority){
			ticket.color = _.find($scope.project.priorities, {_id: ticket.priority}).color;
		}
	});

	console.log($scope.tickets);

}]);