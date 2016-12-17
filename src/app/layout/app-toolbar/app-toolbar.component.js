class AppToolbarController {
  constructor($mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
  }

  toggleLeftMenu() {
    this.$mdSidenav('left').toggle();
  }
}

export const AppToolbarComponent = {
  template: require('./app-toolbar.component.html'),
  controller: AppToolbarController
};
