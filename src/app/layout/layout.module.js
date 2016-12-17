import {DefaultToolbarComponent} from "./default-toolbar/default-toolbar.component";
import {AppToolbarComponent} from "./app-toolbar/app-toolbar.component";
import {AppSidenavComponent} from "./app-sidenav/app-sidenav.component";

export const LayoutModule = angular.module('app.layout', [])
  .component('defaultToolbar', DefaultToolbarComponent)
  .component('appToolbar', AppToolbarComponent)
  .component('appSidenav', AppSidenavComponent)
  .name;
