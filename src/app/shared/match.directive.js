export const MatchDirective = {
  require: 'ngModel',
  scope: {
    otherModelValue: '=match'
  },
  link: function(scope, elem, attrs, ctrl) {
    ctrl.$validators.match = function(modelValue) {
      return modelValue === scope.otherModelValue;
    };
    scope.$watch('otherModelValue', function() {
      ctrl.$validate();
    });
  }
};
