myApp.directive('projectsList', function(){
	return {
		restrict: 'A',
		templateUrl: 'app/components/projects/projectsList.html',
		controller: function($scope, toaster, projectsService){

			$scope.orderField = 'creationDate';

			$scope.deleteProcessStarted = 0;

			$scope.$on('toggleDeleteProjectsProcess', function(){
				$scope.deleteProcessStarted = !$scope.deleteProcessStarted;
			});

			$scope.deleteProject = function(id){
				var deleteProjectPromise = projectsService.deleteProject(id);
				deleteProjectPromise.then(function(data){
					_.remove($scope.projects, {_id: data.data});
					toaster.pop("success", "", "Project removed", 3000);
				});
			};

		}
	}
});