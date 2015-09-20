angular.module('ra-projects').controller('projectsController', ['toaster', '$state', '$scope', 'projects', function (toaster, $state, $scope, projects) {

	$scope.projects = projects.data;

}]);