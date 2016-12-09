import {LayoutModule} from '../layout.module'

describe('SimpleToolbar', () => {
  let controller, scope;
  beforeEach(window.module(LayoutModule));

  beforeEach(inject(($rootScope, $componentController) => {
    scope = $rootScope.$new();
    controller = $componentController('simpleToolbar', { $scope: scope });
  }));

  it ('should be attached to the scope', () => {
    expect(scope.$ctrl).to.eq(controller);
  });
});
