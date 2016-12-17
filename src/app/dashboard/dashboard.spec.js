import uiRouter from 'angular-ui-router';
import {DashboardModule} from './dashboard.module'

describe('Dashboard', () => {

  beforeEach(() => {
    window.module(uiRouter);
    window.module(DashboardModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('dashboard', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
