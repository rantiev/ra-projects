myApp.controller('registrationController', ['toaster', 'usersService', '$state', '$scope', function (toaster, usersService, $state, $scope) {

	$scope.submitForm = function () {

		usersService.register({
			email: $scope.raFormInputEmail,
			fname: $scope.raFormInputFirstName,
			lname: $scope.raFormInputLastName,
			image: $scope.raFormInputImage,
			password: $scope.raFormInputPassword,
			remember: $scope.raFormInputRememberMe
		}).then(
			function success(response){
				$state.go('main.private.projects');
				toaster.pop("success", "", "You have registered succesfully", 3000);
			},
			function error(reason){
				$state.go('main.public.registration');
				toaster.pop("error", "", "You have not registered succesfully", 3000);
			}
		);

	}

}]);