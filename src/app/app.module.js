import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';

import {SharedModule} from "./shared/shared.module";
import {LayoutModule} from "./layout/layout.module";
import {HomeModule} from "./home/home.module";
import {ExampleModule} from "./example/example.module";

import 'normalize.css';
import 'angular-material/angular-material.css';
import './app.theme.scss';

angular.module('app', [
  uiRouter,
  ngMaterial,
  ngAnimate,
  ngMessages,
  SharedModule,
  LayoutModule,
  HomeModule,
  ExampleModule
])
.config(($locationProvider, $urlRouterProvider, $stateProvider) => {
  "ngInject";
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      abstract: true
    });
});
