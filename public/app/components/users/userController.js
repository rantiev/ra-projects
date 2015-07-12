myApp.controller('userController', ['toaster', '$state', '$scope', 'user', function (toaster, $state, $scope, user) {

	$scope.user = user.data;

}]);