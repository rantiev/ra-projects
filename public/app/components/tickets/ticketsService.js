myApp.service('ticketsService', ['$http', function ($http) {

	this.create = function (ticket) {

		return $http.post('/ticket', ticket)
			.success(function (data, status, headers, config) {
				console.log('ticket was created!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: ticket wasn\'t created!');
			});
		;

	}

	this.update = function (ticket) {

		return $http.put('/ticket/' + ticket._id, ticket)
			.success(function (data, status, headers, config) {
				console.log('ticket was updated!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: ticket wasn\'t updated!');
			});
		;

	}

	this.delete = function (ticket) {

		return $http.delete('/ticket/' + ticket._id)
			.success(function (data, status, headers, config) {
				console.log('ticket was deleted!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: ticket wasn\'t deleted!');
			});
		;

	}

	this.getAll = function () {

		return $http.get('/tickets')
			.success(function (data, status, headers, config) {
				console.log('tickets obtained!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: tickets weren\'t obtained!');
			});
		;

	}

	this.getOne = function (id) {

		return $http.get('/ticket/' + id)
			.success(function (data, status, headers, config) {
				console.log('ticket obtained!');
			})
			.error(function (data, status, headers, config) {
				console.log('error: ticket weren\'t obtained!');
			});
		;

	}

}]);