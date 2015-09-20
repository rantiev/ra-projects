angular.module('ra-projects').controller('userController', ['toaster', '$state', '$scope', 'user', function (toaster, $state, $scope, user) {

	$scope.user = user.data;

}]);