class SigninController {
  constructor($state, $mdToast, AuthService) {
    "ngInject";
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.auth = AuthService;
    this.signinForm = {
      email: '',
      password: ''
    };
    this.error = undefined;
    this.working = false;
  }

  signin() {
    this.working = true;
    this.error = undefined;
    const email = this.signinForm.email;
    const password = this.signinForm.password;
    this.auth.signin(email, password)
      .then((result) => {
        this.working = false;
        this.error = undefined;
        const state = this.auth.getRedirectState();
        if (state) {
          this.$state.go(state.url, state.params);
        } else {
          this.$state.go('app.dashboard');
        }
      })
      .catch((error) => {
        this.working = false;
        this.error = error;
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Error signing in')
            .position('top right')
            .hideDelay(1500)
        );
      });
  }
}

export const SigninComponent = {
  template: require('./signin.component.html'),
  controller: SigninController
};

