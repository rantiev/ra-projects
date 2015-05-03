myApp.controller('registrationController', ['toaster', 'usersService', '$state', '$scope', function (toaster, usersService, $state, $scope) {

	$scope.submitForm = function () {

		usersService.register({
			email: $scope.raFormInputEmail,
			fname: $scope.raFormInputFirstName,
			lname: $scope.raFormInputLastName,
			password: $scope.raFormInputPassword,
			remember: $scope.raFormInputRememberMe
		}).then(function(){
			$state.go('login');
			toaster.pop("success", "", "You have registered succesfully", 3000);
		});

	}

}]);