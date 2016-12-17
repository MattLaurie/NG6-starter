class CreateAccountController {
  constructor() {
  }

  createAccount() {
    if (!this.step.completed) {
      this.register.setWorking(true);
      const email = this.data.email;
      const password = this.data.password;
      this.auth.registerUser(email, password)
        .then(result => {
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

export const CreateAccountComponent = {
  require: {
    register: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./create-account.component.html'),
  controller: CreateAccountController
};
