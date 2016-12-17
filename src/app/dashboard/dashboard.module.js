import angular from 'angular';
import {DashboardComponent} from './dashboard.component';

export const DashboardModule = angular.module('app.dashboard', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'content@': {
            component: 'dashboard'
          },
          'toolbar@': {
            component: 'appToolbar'
          },
          'sidenav@': {
            component: 'appSidenav'
          }
        },
        data: {
          requiresAuth: true
        }
      });
  })
  .component('dashboard', DashboardComponent)
  .name;
