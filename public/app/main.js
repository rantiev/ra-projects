myApp.controller('main', function($scope){

	$scope.userLoggedIn = false;

	$scope.currentMan = null;

	$scope.setCurrentMan = function(o){
		$scope.currentMan = o;
	}

	$scope.toggleDeleteProjectsProcess = function(){
		$scope.$broadcast('toggleDeleteProjectsProcess');
	}

	$scope.toggleDeleteUsersProcess = function(){
		$scope.$broadcast('toggleDeleteUsersProcess');
	}

});