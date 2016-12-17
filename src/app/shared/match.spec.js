import {SharedModule} from './shared.module'

describe('Match', () => {
  let scope, form;

  beforeEach(() => {
    window.module(SharedModule);
  });

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    let element = angular.element(
      '<form name="form">' +
        '<input type="password" ng-model="model.password" name="password">' +
        '<input type="password" ng-model="model.passwordConfirm" name="password_confirm" match="model.password">' +
      '</form>'
    );
    scope.model = {
      password: undefined,
      passwordConfirm: undefined
    };
    $compile(element)(scope);
    scope.$digest();
    form = scope.form;
  }));

  it ('should not match', () => {
    form.password.$setViewValue('Password1');
    form.password_confirm.$setViewValue('not the same value');
    expect(form.password_confirm.$error).to.have.property('match');
    expect(form.password_confirm.$error.match).to.eq(true);
  });

  it ('should match', () => {
    form.password.$setViewValue('Password1');
    form.password_confirm.$setViewValue('Password1');
    expect(form.password_confirm.$error).to.not.have.property('match');
  });
});
