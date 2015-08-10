myApp.controller('userEditController', ['toaster', 'usersService', 'user', '$state', '$scope', function (toaster, usersService, user, $state, $scope) {

	$scope.inProgress = 0;

	$scope.user = user.data;

	$scope.submitForm = function () {
		$scope.inProgress = 1;
		var user = usersService.update($scope.user);

		user.then(function () {
			$state.go('main.private.user', {id: $scope.user._id });
			toaster.pop("success", "", "User has been updated", 2000);
		});
	}

	$scope.removeUser = function () {

		if(confirm("Do you really want to remove the user?")){
			var promise = usersService.remove($scope.user._id);
			promise.then(function () {
				$state.go('main.private.users');
			});
		};

	}

}]);