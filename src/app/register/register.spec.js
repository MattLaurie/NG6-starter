import uiRouter from 'angular-ui-router';
import {RegisterModule} from './register.module'

describe('Register', () => {

  beforeEach(() => {
    window.module(uiRouter);
    window.module($provide => {
      $provide.value('AuthService', {});
    });
    window.module(RegisterModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('register', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
