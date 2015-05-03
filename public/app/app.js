var myApp = angular.module('ra-projects', ['ui.router', 'ui.layout', 'toaster', 'ang-drag-drop'])

	.run(['$rootScope', '$state', '$timeout', 'usersService',
		function ($rootScope, $state, $timeout, usersService) {

			$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

				usersService.check()
					.success(function (data, status, headers, config) {

						$rootScope.userCan = true;

						console.log('User can');
						if (toState.name === 'login' || toState.name === 'registration') {
							$timeout(function () {
								$state.go('dashboard');
							});
						}
					})
					.error(function (data, status, headers, config) {

						$rootScope.userCan = false;

						console.log('User can\'t');
						if (toState.name !== 'login' && toState.name !== 'registration') {
							$timeout(function () {
								$state.go('login');
							});
						}
					});

				$rootScope.currentState = toState;

			});

		}]
	)

	.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

		$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/components/login/login.html',
				controller: 'loginController'
			})
			.state('registration', {
				url: '/registration',
				templateUrl: 'app/components/registration/registration.html',
				controller: 'registrationController'
			})
			.state('dashboard', {
				url: '/',
				templateUrl: 'app/components/dashboard/dashboard.html',
				controller: 'dashboardController'
			})
	});