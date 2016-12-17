import angular from 'angular';
import {SigninComponent} from './signin.component';

export const SigninModule = angular.module('app.signin', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.signin', {
        url: '/signin',
        views: {
          'content@': {
            component: 'signin'
          },
          'toolbar@': {
            component: 'defaultToolbar'
          }
        }
      });
  })
  .component('signin', SigninComponent)
  .name;
