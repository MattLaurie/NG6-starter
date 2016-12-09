import {SimpleToolbarComponent} from "./simple-toolbar/simple-toolbar.component";
import {SimpleSidenavComponent} from "./simple-sidenav/simple-sidenav.component";

export const LayoutModule = angular.module('app.layout', [])
  .component('simpleToolbar', SimpleToolbarComponent)
  .component('simpleSidenav', SimpleSidenavComponent)
  .name;
