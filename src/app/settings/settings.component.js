import './settings.component.scss';

class SettingsController {
  constructor($state, $mdToast, AuthService) {
    "ngInject";
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.auth = AuthService;
  }

  signout() {
    this.auth.signout()
      .then(() => this.$state.go('app.home', {}, { reload: true }))
      .catch(error => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Error signing out')
            .position('top right')
            .hideDelay(1500)
        );
      });
  }
}

export const SettingsComponent = {
  template: require('./settings.component.html'),
  controller: SettingsController
};

