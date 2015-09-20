var should = chai.should();
/*
describe('Promises resolving', function () {
	beforeEach(module('ra-projects'));

	var $injector;
	var $create_controller;
	var $q;
	var $ctrl;
	var $rootScope;
	var $scope;

	beforeEach(inject(function (_$injector_) {
		$injector = _$injector_;
	}));

	beforeEach(function () {
		$q = $injector.get('$q');
		$create_controller = $injector.get('$controller');
		$rootScope = $injector.get('$rootScope');

		$scope = {};
		//$ctrl = $create_controller('simpleCtrl', {$scope: $scope});
	});

	it('Promise should be resolved', function (done) {

		var deferred = $q.defer();
		var promise = deferred.promise;
		var resolvedValue;

		/!*		deferred.resolve(function(){

		 console.log('resolved');

		 });

		 deferred.reject(function(){

		 console.log('resolved');

		 });*!/

		promise.then(function(v) {
			resolvedValue = v;
			console.log('resolved: ' + resolvedValue);
			done();
		});

		deferred.resolve(999);
		$rootScope.$apply();

		promise.should.eventually.equal(999).notify(done);

	});

});*/

describe('Services tests', function(){
	beforeEach(module('ra-projects'));
	beforeEach(module('templates'));

	var $httpBackend;
	var $injector;
	var $create_controller;
	var $q;
	var $ctrl;
	var $rootScope;
	var $scope;

	beforeEach(inject(function (_$injector_) {
		$injector = _$injector_;
	}));

	beforeEach(function () {
		$httpBackend = $injector.get('$httpBackend');
		$q = $injector.get('$q');
		$create_controller = $injector.get('$controller');
		$rootScope = $injector.get('$rootScope');
		$scope = {};
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});


	it('Projects service getAll method should be triggered and response should be yep data', function(){

		$httpBackend.when('POST', '/check').respond('ok');
		$httpBackend.when('GET', '/projects').respond('yep data');
		$ctrl = $create_controller('simpleCtrl', {$scope: $scope});

		$httpBackend.flush();

		$scope.status.should.equal('yep data');

	});

	it('Projects service getAll method should be triggered and response should be 404', function(){

		$httpBackend.when('POST', '/check').respond('ok');
		$httpBackend.when('GET', '/projects').respond(401, 'nope data');
		$ctrl = $create_controller('simpleCtrl', {$scope: $scope});

		$httpBackend.flush();

		$scope.status.should.equal('nope data');

	});

	it('Test that myFunc has been called once', function(){

		$httpBackend.when('POST', '/check').respond('ok');
		$httpBackend.when('GET', '/projects').respond('yep data');
		$ctrl = $create_controller('simpleCtrl', {$scope: $scope});
		sinon.spy($scope, 'myFunc');

		$httpBackend.flush();

		$scope.myFunc();
		$scope.myFunc();
		$scope.myFunc();
		$scope.myFunc();

		$scope.myFunc.should.have.been.called;
		$scope.myFunc.should.have.callCount(5);

	});

});
