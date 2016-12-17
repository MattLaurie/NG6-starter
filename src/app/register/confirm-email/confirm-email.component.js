class ConfirmEmailController {
  constructor() {
  }

  needsData(value) {
    return angular.isUndefined(value) || value === null
  }

  confirmEmail() {
    if (!this.step.completed) {
      const code = this.data.code;
      const email = this.data.email;
      const password = this.data.password;
      this.register.setWorking(true);
      this.auth.confirmUser(email, code)
        .then(result => this.auth.signin(email, password))
        .then(() => {
          this.register.setWorking(false);
          this.step.completed = true;
          this.step.error = undefined;
          this.register.nextStep();
        })
        .catch(error => {
          this.register.setWorking(false);
          this.step.completed = false;
          this.step.error = error.message;
        });
    } else {
      this.register.nextStep();
    }
  }
}

export const ConfirmEmailComponent = {
  require: {
    register: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./confirm-email.component.html'),
  controller: ConfirmEmailController
};
