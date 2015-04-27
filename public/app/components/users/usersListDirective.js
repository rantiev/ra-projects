myApp.directive('usersList', function(){
	return {
		restrict: 'A',
		templateUrl: 'app/components/users/usersList.html',
		controller: function($scope, toaster, projectsService, usersService){

			$scope.deleteUser = function(id){
				var deleteUserPromise = usersService.deleteUser(id);
				deleteUserPromise.then(function(data){
					_.remove($scope.users, {_id: data.data});
					toaster.pop("success", "", "User removed", 3000);
				});
			};

			/*$scope.onDrop = function($event, data){
				var updateUserPromise = usersService.updateUser(id);
				updateUserPromise.then(function(data){
					_.remove($scope.users, {_id: data.data});
					toaster.pop("success", "", "User Updated", 3000);
				});
			}*/

			$scope.deleteProcessStarted = 0;

			$scope.$on('toggleDeleteUsersProcess', function(){
				$scope.deleteProcessStarted = !$scope.deleteProcessStarted;
			});

			$scope.$on('psUserAddedToProject', function(){
				usersService.getUsers().then(function(data){
					$scope.users = data.data;
				});

			});

		}
	}
});