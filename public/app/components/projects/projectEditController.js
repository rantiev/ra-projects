myApp.controller('projectEditController', ['toaster', 'projectsService', 'project', '$state', '$scope', function (toaster, projectsService, project, $state, $scope) {

	$scope.inProgress = 0;

	$scope.project = project.data;

	$scope.addStatus = function () {
		$scope.project.statuses.push({name: '', order: 0})
	}

	$scope.addPriority = function () {
		$scope.project.priorities.push({name: '', order: 0})
	}

	$scope.submitForm = function () {
		var project = projectsService.update($scope.project);
		project.then(function () {
			$state.go('main.private.projects');
		});
	}

	$scope.removeProject = function () {

		if(confirm("Do you really want to remove project?")){
			var promise = projectsService.delete($scope.project);
			promise.then(function () {
				$state.go('main.private.projects');
			});
		};

	}

}]);