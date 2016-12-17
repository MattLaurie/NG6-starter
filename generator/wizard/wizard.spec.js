import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material-mocks';

import {<%= upCaseName %>Module} from './<%= name %>.module';

describe('<%= upCaseName %>', () => {

  beforeEach(() => {
    window.module(uiRouter);
    window.module(ngMaterial);
    window.module('ngMaterial-mock');
    window.module(<%= upCaseName %>Module);
  });

  describe('with controller', () => {
    let controller, scope;

    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('<%= name %>', { $scope: scope });
    }));

    it ('should be attached to the scope', () => {
      expect(scope.$ctrl).to.eq(controller);
    });
  });
});
