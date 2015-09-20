angular.module('ra-projects').controller('settingsController', ['toaster', 'settingsService', '$state', '$scope', 'settings', function (toaster, settingsService, $state, $scope, settings) {

	$scope.settings = settings.data;

}]);