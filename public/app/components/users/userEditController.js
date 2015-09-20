angular.module('ra-projects').controller('userEditController', ['toaster', 'usersService', 'user', '$state', '$rootScope', '$scope', function (toaster, usersService, user, $state, $rootScope, $scope) {

	$scope.inProgress = 0;

	$scope.user = user.data;

	$scope.submitForm = function () {
		$scope.inProgress = 1;
		var user = usersService.update($scope.user);

		user.then(function () {
			$state.go('main.private.user', {id: $scope.user._id });
		}).catch(function(){
			$scope.inProgress = 0;
		});
	}

	$scope.removeUser = function () {

		if(confirm("Do you really want to remove the user?")){
			var promise = usersService.remove($scope.user._id);
			promise.then(function () {
				$rootScope.userCan = 0;
				$rootScope.currentUser = {};
				$state.go('main.public.login');
			});
		};

	}

}]);