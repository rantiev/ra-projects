var myApp = angular.module('ra-projects', ['ui.router', 'ui.layout', 'toaster', 'dndLists'])
	.run(['$rootScope', '$state', '$timeout', '$http',
		function ($rootScope, $state, $timeout, $http) {

			$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

				$http({
					url: '/check',
					method: 'post'
				})
					.then(
					function success(response) {
						$rootScope.userCan = 1;
						if (toState.public) {
							$state.go('main.private.projects');
							return;
						}
						$rootScope.currentState = toState;
					},
					function error(reason) {
						$rootScope.userCan = 0;
						if (!toState.public) {
							$state.go('main.public.login');
						}
					}
				);

			});

		}]
	)

	.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', function ($stateProvider, $httpProvider, $urlRouterProvider) {

		$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('main', {
				abstract: true,
				templateUrl: 'app/mainTpl.html',
				controller: 'mainController'
			})
			.state('main.public', {
				abstract: true,
				public: true,
				templateUrl: 'app/publicTpl.html'
			})
			.state('main.public.login', {
				url: '/login',
				public: true,
				templateUrl: 'app/components/login/login.html',
				controller: 'loginController'
			})
			.state('main.public.registration', {
				url: '/registration',
				public: true,
				templateUrl: 'app/components/registration/registration.html',
				controller: 'registrationController'
			})
			.state('main.private', {
				abstract: true,
				templateUrl: 'app/privateTpl.html'
			})
			.state('main.private.projects', {
				url: '/projects',
				templateUrl: 'app/components/projects/projects.html',
				controller: 'projectsController',
				resolve: {
					projects: function (projectsService) {
						return projectsService.getAll();
					}
				}
			})
			.state('main.private.project-new', {
				url: '/project-new',
				templateUrl: 'app/components/projects/projectNew.html',
				controller: 'projectNewController',
				resolve: {
					settings: function (settingsService) {
						return settingsService.getSettings();
					}
				}
			})
			.state('main.private.project', {
				url: '/project/:id',
				templateUrl: 'app/components/projects/project.html',
				controller: 'projectController',
				resolve: {
					project: function ($stateParams, projectsService) {
						return projectsService.getOne($stateParams.id);
					},
					tickets: function ($stateParams, ticketsService) {
						return ticketsService.getAll($stateParams.id);
					}
				}
			})
			.state('main.private.project-edit', {
				url: '/project/:id/edit',
				templateUrl: 'app/components/projects/projectEdit.html',
				controller: 'projectEditController',
				resolve: {
					project: function ($stateParams, projectsService) {
						return projectsService.getOne($stateParams.id);
					}
				}
			})
			.state('main.private.ticket-new', {
				url: '/ticket-new',
				templateUrl: 'app/components/tickets/ticketNew.html',
				controller: 'ticketNewController',
				params: {
					pid: null,
				},
				resolve: {
					project: function ($stateParams, projectsService) {
						return projectsService.getOne($stateParams.pid);
					},
					users: function($stateParams, usersService){
						return usersService.getAll();
					}
				}
			})
			.state('main.private.ticket', {
				url: '/ticket/:id&:projectID',
				templateUrl: 'app/components/tickets/ticket.html',
				controller: 'ticketController',
				resolve: {
					ticket: function ($stateParams, ticketsService) {
						return ticketsService.getOne($stateParams.id);
					}
				}
			})
			.state('main.private.ticket-edit', {
				url: '/ticket/:id&:projectID/edit',
				templateUrl: 'app/components/tickets/ticketEdit.html',
				controller: 'ticketEditController',
				resolve: {

					ticket: function ($stateParams, ticketsService) {
						return ticketsService.getOne($stateParams.id);
					},
					users: function($stateParams, usersService){
						return usersService.getAll();
					}
				}
			})
		/*.state('main.private.settings', {
		 url: '/settings',
		 templateUrl: 'app/components/settings/settings.html',
		 controller: 'settingsController'
		 })
		 .state('main.private.profile', {
		 url: '/profile',
		 templateUrl: 'app/components/profile/profile.html',
		 controller: 'profileController'
		 })*/
	}]);