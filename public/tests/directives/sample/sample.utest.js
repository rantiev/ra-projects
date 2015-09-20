describe('Directive tests', function () {
	beforeEach(module('ra-projects'));
	beforeEach(module('templates'));

	var elm;
	var scope;
	var compile;
	var $httpBackend;

	beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
		scope = $rootScope;
		compile = $compile;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('POST', '/check').respond('ok');
		$httpBackend.when('GET', '/projects').respond('ok');
	}));

	afterEach(function () {
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Should contain right text', function () {
		elm = angular.element('<div data-sample data-sample-class="ra-class-test"></div>');
		compile(elm)(scope);
		scope.$digest();

		elm.text().should.to.equal('Directive template loaded properly.');
	});

	it('Should set default class', function () {
		elm = angular.element('<div data-sample></div>');
		compile(elm)(scope);
		scope.$digest();

		elm.hasClass('ra-class-default').should.to.equal(true);
	});

	it('Should set custom class', function () {
		elm = angular.element('<div data-sample data-sample-class="ra-class-custom"></div>');
		compile(elm)(scope);
		scope.$digest();

		elm.hasClass('ra-class-custom').should.to.equal(true);
	});

});
