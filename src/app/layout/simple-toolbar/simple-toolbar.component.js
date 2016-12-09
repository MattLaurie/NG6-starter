class SimpleToolbarController {
  constructor($mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
  }

  toggleLeftMenu() {
    this.$mdSidenav('left').toggle();
  }
}

export const SimpleToolbarComponent = {
  template: require('./simple-toolbar.component.html'),
  controller: SimpleToolbarController
};
