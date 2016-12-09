import angular from 'angular';
import {ExampleComponent} from './example.component';

export const ExampleModule = angular.module('app.example', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.example', {
        url: '/example',
        views: {
          'content@': {
            component: 'example'
          },
          'toolbar@': {
            component: 'simpleToolbar'
          },
          'sidenav@': {
            component: 'simpleSidenav'
          }
        }
      });
  })
  .component('example', ExampleComponent)
  .name;
