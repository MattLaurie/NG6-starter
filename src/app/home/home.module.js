import angular from 'angular';
import {HomeComponent} from './home.component';

export const HomeModule = angular.module('app.home', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.home', {
        url: '/',
        views: {
          'content@': {
            component: 'home'
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
  .component('home', HomeComponent)
  .name;
