myApp.controller('projectNewController', function($scope, toaster, projectsService) {

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

	$scope.newProject = {
		name: 'New Project',
		description: '',
		positions: [],
		startDate: new Date(),
		endDate: new Date(),
		lastPositionID: 0
	};

	$scope.newProject.positions.push(createDefaultPosition());

	function createDefaultPosition() {

		$scope.newProject.lastPositionID++;

		return {
			id: $scope.newProject.lastPositionID,
			type: $scope.positionTypes[0].type,
			title: $scope.positionTypes[0].title,
			employeeID: null,
			employee: null,
			startDate: new Date(),
			endDate: new Date()
		};
	};

	$scope.creationResult = null;

	$scope.addPosition = function() {
		$scope.newProject.positions.push(createDefaultPosition());
	}

	$scope.removePosition = function(i) {
		$scope.newProject.positions.splice(i, 1);
	}

	$scope.createProject = function() {

		for(var i = 0 in $scope.newProject.positions){
			$scope.newProject.positions[i].type = _.find($scope.positionTypes, {title: $scope.newProject.positions[i].title}).type;
		}

		var createProjectPromise = projectsService.createProject($scope.newProject);
		createProjectPromise.then(function(data) {
			$scope.creationResult = 1;
			toaster.pop("success", "", "Project created", 3000);
		});
	};

	$scope.createAnotherProject = function() {
		$scope.creationResult = null;
	};

});