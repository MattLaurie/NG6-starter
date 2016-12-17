class AppSidenavController {
  constructor($mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
  }

  toggleLeftMenu() {
    this.$mdSidenav('left').toggle();
  }
}

export const AppSidenavComponent = {
  template: require('./app-sidenav.component.html'),
  controller: AppSidenavController
};
