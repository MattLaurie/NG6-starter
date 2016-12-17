import angular from 'angular';
import {RecoverComponent} from './recover.component';
import {RecoverAccountComponent} from "./recover-account/recover-account.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {RecoverFinishComponent} from "./recover-finish/recover-finish.component";

export const RecoverModule = angular.module('app.recover', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.recover', {
        url: '/recover',
        views: {
          'content@': {
            component: 'recover'
          },
          'toolbar@': {
            component: 'defaultToolbar'
          }
        }
      });
  })
  .component('recover', RecoverComponent)
  .component('recoverAccount', RecoverAccountComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('recoverFinish', RecoverFinishComponent)
  .name;
