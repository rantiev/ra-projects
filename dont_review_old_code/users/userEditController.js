myApp.controller('userEditController', function($scope, usersService, toaster, user) {

	$scope.user = user.data[0];

	$scope.addSkill = function() {
		$scope.user.skills.push({});
	}

	$scope.removeSkill = function(i) {
		$scope.user.skills.splice(i, 1);
	}

	$scope.updateUser = function() {
		var editUserPromise = usersService.updateUser($scope.user);

		editUserPromise.then(function(data) {
			toaster.pop("success", "", "User updated", 3000);
		});
	};

});