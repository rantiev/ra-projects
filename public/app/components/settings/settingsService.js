myApp.service('settingsService', ['$http', function($http){

	this.getSettings = function (data) {

		return $http.get('/settings', data)
			.success(function (data, status, headers, config) {

			})
			.error(function (data, status, headers, config) {
				console.log('error: Something went wrong!');
			});

	}

}]);