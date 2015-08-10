myApp.service('settingsService', ['$http', function($http){

	this.get = function (data) {

		return $http.get('/settings', data)
			.error(function (data, status, headers, config) {
				console.log('error: Something went wrong!');
			});

	}

}]);