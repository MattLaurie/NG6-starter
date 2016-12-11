import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material-mocks';

import {ExampleModule} from './example.module'

describe('Example', () => {

  beforeEach(() => {
    window.module(uiRouter);
    window.module(ngMaterial);
    window.module('ngMaterial-mock');
    window.module(ExampleModule);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('example', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
