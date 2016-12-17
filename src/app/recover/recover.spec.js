import uiRouter from 'angular-ui-router';
import {RecoverModule} from './recover.module'

describe('Recover', () => {

  beforeEach(() => {
    window.module(uiRouter);
    window.module($provide => {
      $provide.value('AuthService', {});
    });
    window.module(RecoverModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('recover', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
