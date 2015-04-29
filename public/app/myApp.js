var myApp = angular.module('myApp', ['ui.router', 'ui.layout', 'toaster', 'ang-drag-drop'])

.run(['$rootScope', '$state', '$timeout',
	function ($rootScope, $state, $timeout) {

		$rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

			/*if(toState.name !== 'login'){
				$timeout(function(){
					$state.go('login');
				});
			}*/

		});

	}]
)

.config(function($stateProvider, $httpProvider, $urlRouterProvider) {

    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'app/components/login/login.html',
			controller: 'loginController',
			/*resolve: {
			 users: function($http){
			 return $http({
			 method: 'GET',
			 url: '/users/'
			 });
			 },
			 projects: function($http){
			 return $http({
			 method: 'GET',
			 url: '/projects/'
			 });
			 }
			 }*/
		})
		.state('home', {
			url: '/',
			templateUrl: 'app/components/dashboard/dashboard.html',
			controller: 'dashboardController',
			/*resolve: {
				users: function($http){
					return $http({
						method: 'GET',
						url: '/users/'
					});
				},
				projects: function($http){
					return $http({
						method: 'GET',
						url: '/projects/'
					});
				}
			}*/
		})
		.state('projects', {
			url: '/projects',
			controller: 'projectsController',
			templateUrl: 'app/components/projects/projects.html',
			resolve: {
				users: function($http){
					return $http({
						method: 'GET',
						url: '/users/'
					});
				},
				projects: function($http){
					return $http({
						method: 'GET',
						url: '/projects/'
					});
				}
			}
		})
		.state('projectNew', {
			url: 'project/new',
			templateUrl: 'app/components/projects/projectNew.html',
			controller: 'projectNewController'
		})
		.state('project', {
			url: '/project/:id',
			controller: 'projectController',
			templateUrl: 'app/components/projects/project.html',
			resolve: {
				project: function($http, $stateParams){
					return $http({
						method: 'GET',
						url: '/projects/' + $stateParams.id
					});
				},
				users: function($http){
					return $http({
						method: 'GET',
						url: '/users/'
					});
				}
			}
		})
		.state('projectEdit', {
			url: '/projectEdit/:id',
			controller: 'projectEditController',
			templateUrl: 'app/components/projects/projectEdit.html',
			resolve: {
				project: function($http, $stateParams){
					return $http({
						method: 'GET',
						url: '/projects/' + $stateParams.id
					});
				}
			}
		})
		.state('users', {
			url: '/users',
			controller: 'usersController',
			templateUrl: 'app/components/users/users.html',
			resolve: {
				users: function($http){
					return $http({
						method: 'GET',
						url: '/users/'
					});
				},
				projects: function($http){
					return $http({
						method: 'GET',
						url: '/projects/'
					});
				}
			}
		})
		.state('userNew', {
			url: '/user/new',
            controller: 'userNewController',
            templateUrl: 'app/components/users/userNew.html'
		})
		.state('user', {
			url: '/user/:id',
			controller: 'userController',
			templateUrl: 'app/components/users/user.html',
			resolve: {
				user: function($http, $stateParams){
					return $http({
						method: 'GET',
						url: '/users/' + $stateParams.id
					});
				}
			}
		})
		.state('userEdit', {
			url: '/userEdit/:id',
			controller: 'userEditController',
			templateUrl: 'app/components/users/userEdit.html',
			resolve: {
				user: function($http, $stateParams){
					return $http({
						method: 'GET',
						url: '/users/' + $stateParams.id
					});
				}
			}
		});

});