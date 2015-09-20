angular.module('ra-projects').controller('usersController', ['toaster', '$state', '$scope', 'users', function (toaster, $state, $scope, users) {

	$scope.users = users.data;

}]);