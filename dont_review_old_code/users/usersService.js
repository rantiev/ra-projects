myApp.service('usersService', function ($http) {

	this.check = function () {
		return $http.post('/check');
	}

	this.login = function (data) {
		return $http.post('/login', data)
			.success(function (data, status, headers, config) {
				console.log('User logged in');
			})
			.error(function (data, status, headers, config) {
				console.log('error: user wasn\'t logged in!');
			});
	}

	this.register = function (data) {
		return $http.post('/register', data)
			.success(function (data, status, headers, config) {
				console.log('User created');
			})
			.error(function (data, status, headers, config) {
				console.log('error: user wasn\'t created!');
			});
	}

});