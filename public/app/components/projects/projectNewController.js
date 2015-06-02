myApp.controller('projectNewController', ['toaster', 'projectsService', 'settings', '$state', '$scope', function (toaster, projectsService, settings, $state, $scope) {

	$scope.inProgress = 0;

	$scope.project = {
		name: '',
		description: '',
		image: '',
		statuses: settings.data.statuses,
		priorities: settings.data.priorities
	};

	$scope.addStatus = function(){
		$scope.project.statuses.push({name: '', order: 0})
	}

	$scope.addPriority = function(){
		$scope.project.priorities.push({name: '', order: 0})
	}

	$scope.submitForm = function(){

		var project = projectsService.create($scope.project);
		project.then(function(){
			$state.go('main.private.projects');
			toaster.pop("success", "", "Project has been created", 2000);
		});
	}

}]);