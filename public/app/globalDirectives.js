angular.module('ra-projects').directive('dataRaCompareTo', function(){
	return {
		require: 'ngModel',
		scope: {
			otherModelValue: '=dataRaCompareTo'
		},
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.raCompareTo = function(modelValue, viewValue) {

				scope.$watch("otherModelValue", function() {
					ngModel.$validate();
				});

				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}

				if (scope.otherModelValue === viewValue) {
					return true;
				}

				return false;
			};
		}
	};
});