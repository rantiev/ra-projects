angular.module('ra-projects').controller('registrationController', ['usersService', '$state', '$scope', function (usersService, $state, $scope) {

	$scope.submitForm = function () {

		if($scope.raFormInputPassword !== $scope.raFormInputConfirmPassword) {
			//return;
		}

		usersService.register({
			email: $scope.raFormInputEmail,
			fname: $scope.raFormInputFirstName,
			lname: $scope.raFormInputLastName,
			image: $scope.raFormInputImage,
			password: $scope.raFormInputPassword,
			remember: $scope.raFormInputRememberMe
		}).then(
			function success(res){
				$state.go('main.private.projects');
			}
		);

	}

}]);