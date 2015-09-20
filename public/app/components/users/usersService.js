angular.module('ra-projects').service('usersService', ['toaster', '$http', function (toaster, $http) {

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
		return $http.post('/user', data)
			.success(function (data, status, headers, config) {
				toaster.pop("success", "", data, 3000);
			})
			.error(function (data, status, headers, config) {
				toaster.pop("error", "", data, 3000);
			});
	}

	this.update = function(user){

		return $http.put('/user/' + user._id, user)
			.success(function (data, status, headers, config) {
				toaster.pop("success", "", data, 3000);
			})
			.error(function (data, status, headers, config) {
				toaster.pop("error", "", data, 3000);
			});;

	}

	this.getAll = function(){

		return $http.get('/users')
			.error(function (data, status, headers, config) {
				console.log('error: Users weren\'t obtained!');
			});;

	}

	this.getOne = function(id){

		return $http.get('/user/' + id)
			.error(function (data, status, headers, config) {
				console.log('error: User weren\'t obtained!');
			});

	}

	this.remove = function(id){

		return $http.delete('/user/' + id)
			.success(function (data, status, headers, config) {
				toaster.pop("success", "", data, 3000);
			})
			.error(function (data, status, headers, config) {
				toaster.pop("error", "", data, 3000);
			});;

	}

}]);