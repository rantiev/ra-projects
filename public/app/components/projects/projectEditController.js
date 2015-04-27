myApp.controller('projectEditController', function($scope, toaster, project, projectsService) {

	$scope.project = project.data[0];
	$scope.project.startDate = new Date($scope.project.startDate);
	$scope.project.endDate = new Date($scope.project.endDate);

	for(var i = 0; i < $scope.project.positions.length; i++){
		$scope.project.positions[i].startDate = new Date($scope.project.positions[i].startDate);
		$scope.project.positions[i].endDate = new Date($scope.project.positions[i].endDate);
	}

	$scope.positionTypes = [
		{
			type: '.net',
			title: 'Backend: .NET'
		},
		{
			type: 'php',
			title: 'Backend: PHP'
		},
		{
			type: 'fe',
			title: 'Frontend'
		},
		{
			type: 'qa',
			title: 'QA'
		}
	];

	function createDefaultPosition() {
		$scope.project.lastPositionID++;

		return {
			id: $scope.project.lastPositionID,
			type: $scope.positionTypes[0].type,
			title: $scope.positionTypes[0].title,
			employeeID: null,
			employee: null,
			startDate: new Date(),
			endDate: new Date()
		};
	};

	$scope.addPosition = function() {
		$scope.project.positions.push(createDefaultPosition());
	}

	$scope.removePosition = function(i) {
		$scope.project.positions.splice(i, 1);
	}

	$scope.updateProject = function() {

		for(var i = 0 in $scope.project.positions){
			$scope.project.positions[i].type = _.find($scope.positionTypes, {title: $scope.project.positions[i].title}).type;
		}

		var editProjectPromise = projectsService.updateProject($scope.project);
		editProjectPromise.then(function(data) {
			toaster.pop("success", "", "Project updated", 3000);
		});
	};

});