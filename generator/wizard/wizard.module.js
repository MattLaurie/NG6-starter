import angular from 'angular';
import {<%= upCaseName %>Component} from './<%= name %>.component';
import {<%= upCaseName %>DummyComponent} from './<%= name %>-dummy/<%= name %>-dummy.component';

export const <%= upCaseName %>Module = angular.module('<%= name %>', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('<%= name %>', {
        url: '/<%= name %>',
        views: {
          'content@': {
            component: '<%= name %>'
          }
        }
      });
  })
  .component('<%= name %>', <%= upCaseName %>Component)
  .component('<%= name %>Dummy', <%= upCaseName %>DummyComponent)
  .name;
