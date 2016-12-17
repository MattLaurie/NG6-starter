class RecoverAccountController {
  constructor() {
  }

  recoverAccount() {
    if (!step.completed) {
      this.recover.setWorking(true);
      const email = this.data.email;
      this.auth.forgotPassword(email)
        .then(result => {
          this.recover.setWorking(false);
          step.completed = true;
          step.error = undefined;
          this.recover.nextStep();
        })
        .catch(error => {
          this.recover.setWorking(false);
          step.completed = false;
          step.error = error.message;
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


