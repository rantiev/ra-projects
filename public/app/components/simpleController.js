angular.module('ra-projects').controller('simpleCtrl', ['$scope', 'projectsService', function($scope, projectsService){

	$scope.myFuncCalled = 0;

	$scope.status = null;

	$scope.myFunc = function(){
		$scope.myFuncCalled = 1;
	};

	projectsService.getAll().success(function(data){
		$scope.status = data;
		$scope.myFunc();
	}).error(function(data){
		$scope.status = data;
	});

}]);