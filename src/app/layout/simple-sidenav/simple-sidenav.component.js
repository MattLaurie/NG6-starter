class SimpleSidenavController {
  constructor($mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
  }

  toggleLeftMenu() {
    this.$mdSidenav('left').toggle();
  }
}

export const SimpleSidenavComponent = {
  template: require('./simple-sidenav.component.html'),
  controller: SimpleSidenavController
};
