class RecoverAccountController {
  constructor(AuthService) {
    "ngInject";
    this.auth = AuthService;
  }

  recoverAccount() {
    if (!this.step.completed) {
      this.recover.setWorking(true);
      const email = this.data.email;
      this.auth.forgotPassword(email)
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

export const RecoverAccountComponent = {
  require: {
    recover: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./recover-account.component.html'),
  controller: RecoverAccountController
};


