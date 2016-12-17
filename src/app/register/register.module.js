import angular from 'angular';
import {RegisterComponent} from './register.component';
import {CreateAccountComponent} from "./create-account/create-account.component";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";
import {RegisterFinishComponent} from "./register-finish/register-finish.component";

export const RegisterModule = angular.module('app.register', [])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.register', {
        url: '/register',
        views: {
          'content@': {
            component: 'register'
          },
          'toolbar@': {
            component: 'defaultToolbar'
          }
        }
      });
  })
  .component('register', RegisterComponent)
  .component('createAccount', CreateAccountComponent)
  .component('confirmEmail', ConfirmEmailComponent)
  .component('registerFinish', RegisterFinishComponent)
  .name;
