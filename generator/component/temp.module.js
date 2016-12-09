import angular from 'angular';
import {<%= upCaseName %>Component} from './<%= name %>.component';

export const <%= upCaseName %>Module = angular.module('app.<%= name %>', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.<%= name %>', {
        url: '/<%= name %>',
        views: {
          'content@': {
            component: '<%= name %>'
          }
        }
      });
  })
  .component('<%= name %>', <%= upCaseName %>Component)
  .name;
