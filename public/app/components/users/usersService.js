myApp.service('usersService', function($http) {

	this.getUsers = function(id) {
		var getUsersRoute = id ? '/users/' + id : '/users/';
		return $http.get(getUsersRoute).
			success(function(data, status, headers, config) {
				console.log('Users obtained');
			}).
			error(function(data, status, headers, config) {
				console.log('error: Users weren\'t obtained!');
			});
	}

	this.createUser = function(user) {
		user.creationDate = Date.now();
		return $http.post('/users', {user: user }).
			success(function(data, status, headers, config) {
				console.log('User created');
			}).
			error(function(data, status, headers, config) {
				console.log('error: user wasn\'t created!');
			});
	}

	this.updateUser = function(user) {
		return $http.put('/users', {user: user }).
			success(function(data, status, headers, config) {
				console.log('User updated!');
			}).
			error(function(data, status, headers, config) {
				console.log('error: User wasn\'t updated!');
			});
	}

	this.deleteUser = function(id) {
		return $http.delete('/users/' + id).
			success(function(data, status, headers, config) {
				console.log('User deleted');
			}).
			error(function(data, status, headers, config) {
				console.log('error: User wasn\'t deleted!');
			});
	}

	/*this.deleteEmployee = function(id){
	 _.remove(employees, function(o){ return o.id === id; });
	 }

	 this.addEmployeeProject = function(emplID, projID, posID, startDate, endDate){
	 var employee = _.find(employees, {id: emplID });

	 if(employee && !_.find(employee.projects, {posID: posID})) {
	 employee.projects.push({
	 projID: projID,
	 posID: posID,
	 startDate: startDate,
	 endDate: endDate
	 });
	 this.updateEmployeeBusyDates(employee);
	 }
	 }

	 this.removeEmployeeProject = function(emplID, projID, posID){
	 var employee = _.find(employees, {id: emplID });

	 if(employee && _.find(employee.projects, {posID: posID})) {
	 _.remove(employee.projects, {projID: projID});
	 this.updateEmployeeBusyDates(employee);
	 }
	 }

	 this.updateEmployeeBusyDates = function(employee, business){
	 var business;

	 _.forEach(employee.projects, function(o){
	 var posDate = o.endDate;

	 if(!business || business < posDate){
	 business = posDate;
	 }
	 });
	 employee.business = business;
	 }*/

});