myApp.directive('user', function(){
	return {
		restrict: 'A',
		replace: true,
        templateUrl: 'app/components/users/userListItem.html',
		controller: function($scope, projectsService){

			checkBusiness();

			function checkBusiness(){

				var positions;

				_.forEach($scope.projects, function(o){
					positions = _.find(o.positions, {employeeID: $scope.man._id});
					if(positions){
						$scope.man.freedom = false;
						return false;
					}
				});

				if(!positions){
					$scope.man.freedom = true;
				}

			}

			$scope.removeProjectPosition = function(data){
				projectsService.removeProjectPosition(data[0], data[1]).then(function(){
					var proj = _.find($scope.projects, {_id:data[0]});

					if(proj){
						var pos = _.find(proj.positions, {id: data[1]});
						pos.employee = null;
						pos.employeeID = null;
					}

					checkBusiness();

				});
			}

		}
	}
});