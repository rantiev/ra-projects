myApp.controller('infoController', function($scope, projectsService){
	$scope.getProjectName = function(id){
		return projectsService.getProjectName(id);
	}
});