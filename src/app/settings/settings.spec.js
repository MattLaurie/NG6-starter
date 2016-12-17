import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material-mocks';
import {SettingsModule} from './settings.module'

describe('Settings', () => {

  beforeEach(() => {
    window.module(uiRouter);
    window.module(ngMaterial);
    window.module('ngMaterial-mock');
    window.module($provide => {
      $provide.value('AuthService', {});
    });
    window.module(SettingsModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('settings', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
