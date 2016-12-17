import {SharedModule} from './shared.module'

describe('PasswordPolicy', () => {
  let scope, form;

  beforeEach(() => {
    window.module(SharedModule);
  });

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    let element = angular.element(
      '<form name="form">' +
        '<input type="password" ng-model="model.password" name="password" password-policy>' +
      '</form>'
    );
    scope.model = { password: undefined };
    $compile(element)(scope);
    scope.$digest();
    form = scope.form;
  }));

  it ('should fail because of no uppercase', () => {
    form.password.$setViewValue('password1');
    expect(form.password.$error).to.have.property('passwordPolicy');
    expect(form.password.$error.passwordPolicy).to.eq(true);
  });

  it ('should fail because of no lowercase', () => {
    form.password.$setViewValue('PASSWORD1');
    expect(form.password.$error).to.have.property('passwordPolicy');
    expect(form.password.$error.passwordPolicy).to.eq(true);
  });

  it ('should fail because of no number', () => {
    form.password.$setViewValue('PASSWORDabc');
    expect(form.password.$error).to.have.property('passwordPolicy');
    expect(form.password.$error.passwordPolicy).to.eq(true);
  });

  it ('should fail because less than 8 characters', () => {
    form.password.$setViewValue('Abc123');
    expect(form.password.$error).to.have.property('passwordPolicy');
    expect(form.password.$error.passwordPolicy).to.eq(true);
  });

  it ('should pass simple', () => {
    form.password.$setViewValue('Password1');
    expect(form.password.$error).to.not.have.property('passwordPolicy');
  });

  it ('should pass longer', () => {
    form.password.$setViewValue('UPPERCASE lowercase number5');
    expect(form.password.$error).to.not.have.property('passwordPolicy');
  });
});
