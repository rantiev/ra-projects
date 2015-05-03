myApp.directive('position', function(){
	return {
		restrict: 'A',
		templateUrl: 'app/components/position/position.html',
		controller: function($scope, projectsService, usersService){

			getEmployee();

			function getEmployee(){
				if($scope.position.employeeID){
					$scope.position.employee = _.find($scope.users, {_id: $scope.position.employeeID});
				}
			}

			function checkBusiness(user){

				var positions,
					user = _.find($scope.users, {_id: user._id});

				_.forEach($scope.projects, function(o){
					positions = _.find(o.positions, {employeeID: user._id});
					if(positions){
						user.freedom = false;
						return false;
					}
				});

				if(!positions){
					user.freedom = true;
				}

			}

			$scope.fillProjectPosition = function(user){
				if(!$scope.position.employee){
					projectsService.fillProjectPosition($scope.project._id, $scope.position.id, user._id).then(function(){
						$scope.position.employeeID = user._id;
						getEmployee();
						checkBusiness(user);
					});
				}
			}

		}
	}
});