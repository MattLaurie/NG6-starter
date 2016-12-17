import angular from 'angular';
import {SettingsComponent} from './settings.component';

export const SettingsModule = angular.module('app.settings', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.settings', {
        url: '/settings',
        views: {
          'content@': {
            component: 'settings'
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
  .component('settings', SettingsComponent)
  .name;
