import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';

import {AuthModule} from './shared/auth.module';
import {SharedModule} from './shared/shared.module';
import {LayoutModule} from './layout/layout.module';
import {HomeModule} from './home/home.module';
import {DashboardModule} from "./dashboard/dashboard.module";
import {RegisterModule} from './register/register.module';
import {SigninModule} from './signin/signin.module';
import {RecoverModule} from './recover/recover.module';
import {SettingsModule} from "./settings/settings.module";

import 'md-steppers/dist/md-steppers.min';
import 'md-steppers/dist/md-steppers.min.css';

import 'normalize.css';
import 'angular-material/angular-material.css';
import './app.theme.scss';

angular.module('app', [
  uiRouter,
  ngMaterial,
  ngAnimate,
  ngMessages,
  'md-steppers',
  AuthModule,
  SharedModule,
  LayoutModule,
  HomeModule,
  DashboardModule,
  RegisterModule,
  SigninModule,
  RecoverModule,
  SettingsModule
])
.config(($locationProvider, $urlRouterProvider, $stateProvider) => {
  'ngInject';
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      abstract: true
    });
});
