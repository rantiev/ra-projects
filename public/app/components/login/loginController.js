myApp.controller('loginController', ['toaster', 'usersService', '$state', '$rootScope', '$scope', function (toaster, usersService, $state, $rootScope, $scope) {

	$scope.submitForm = function () {

		usersService.login({
			email: $scope.raFormInputEmail,
			password: $scope.raFormInputPassword,
			remember: $scope.raFormInputRememberMe
		}).then(
			function success(response){
				$state.go('main.private.projects');
				//toaster.pop("success", "", "You have logged in succesfully", 3000);
			},
			function error(reason){
				$state.go('main.public.login');
				toaster.pop("error", "", "Please try to login again.", 3000);
			}
		);

	}

}]);