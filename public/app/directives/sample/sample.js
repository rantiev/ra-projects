angular.module('ra-projects').directive('sample', function(){
	return {
		restrict: 'A',
		replace: 'true',
		templateUrl: 'app/directives/sample/sample.html',
		link: function ($scope, $element, $attrs) {
			$scope.className = $attrs.sampleClass || 'ra-class-default';
		}
	}
});