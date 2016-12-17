import ngMaterial from 'angular-material';
import 'angular-material/angular-material-mocks';
import {LayoutModule} from '../layout.module'

describe('AppToolbar', () => {

  beforeEach(() => {
    window.module(ngMaterial);
    window.module('ngMaterial-mock');
    window.module(LayoutModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('appToolbar', {$scope: scope});
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
