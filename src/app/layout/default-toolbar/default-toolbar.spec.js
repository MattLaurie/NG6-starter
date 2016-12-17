import {LayoutModule} from '../layout.module'

describe('DefaultToolbar', () => {

  beforeEach(() => {
    window.module(LayoutModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('defaultToolbar', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
