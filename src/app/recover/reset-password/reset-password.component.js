class ResetPasswordController {
  constructor() {
  }

  needsData(value) {
    return angular.isUndefined(value) || value === null
  }

  resetPassword() {
    if (!this.step.completed) {
      this.recover.setWorking(true);
      const email = this.data.email;
      const code = this.data.code;
      const password = this.data.password;
      this.auth.resetPassword(email, code, password)
        .then(result => this.auth.signin(email, password))
        .then(result => {
          this.recover.setWorking(false);
          this.step.completed = true;
          this.step.error = undefined;
          this.recover.nextStep();
        })
        .catch(error => {
          this.recover.setWorking(false);
          this.step.completed = false;
          this.step.error = error.message;
        });
    } else {
      this.recover.nextStep();
    }
  }
}

export const ResetPasswordComponent = {
  require: {
    recover: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./reset-password.component.html'),
  controller: ResetPasswordController
};
