myApp.controller('projectEditController', ['toaster', 'projectsService', 'project', '$state', '$scope', function (toaster, projectsService, project, $state, $scope) {

	$scope.inProgress = 0;

	$scope.project = project.data;

	$scope.addStatus = function () {
		$scope.project.statuses.push({name: '', order: 0})
	};

	$scope.addPriority = function () {
		$scope.project.priorities.push({name: '', order: 0})
	};

	$scope.removeStatus = function(s) {
		_.remove($scope.project.statuses, function(item){
			return item._id === s._id;
		});
	};

	$scope.removePriority = function(p) {
		_.remove($scope.project.priorities, function(item){
			return item._id === p._id;
		});
	};

	$scope.changeItemOrder = function (index, item) {
		item.order = index;
		return item;
	};

	$scope.submitForm = function () {
		var project = projectsService.update($scope.project);
		project.then(function () {
			$state.go('main.private.projects');
			toaster.pop("success", "", "Project has been updated", 2000);
		});
	};

	$scope.removeProject = function () {

		if (confirm("Do you really want to remove project?")) {
			var promise = projectsService.delete($scope.project);
			promise.then(function () {
				$state.go('main.private.projects');
				toaster.pop("success", "", "Project has been removed", 2000);
			});
		}

	};

}]);