/*
 ^
 (?=.*[A-Z].*)   // 1+ upper case
 (?=.*[0-9].*)   // 1+ number
 (?=.*[a-z].*)   // 1+ lower case
 .{8,}           // 8+ characters
 $
 */
const PASSWORD_POLICY_REGEX = /^(?=.*[A-Z].*)(?=.*[0-9].*)(?=.*[a-z].*).{8,}$/;

export const PasswordPolicyDirective = {
  require: 'ngModel',
  link: function(scope, elem, attrs, ctrl) {
    ctrl.$validators.passwordPolicy = function(modelValue, viewValue) {
      return PASSWORD_POLICY_REGEX.test(viewValue);
    };
  }
};
