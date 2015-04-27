myApp.directive('project', function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'app/components/projects/projectListItem.html',
		link: function($scope){

			$scope.project.endDate = new Date($scope.project.endDate);
			$scope.project.startDate = new Date($scope.project.startDate);

		}
	}
});