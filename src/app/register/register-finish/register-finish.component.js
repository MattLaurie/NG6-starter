class RegisterFinishController {
  constructor() {
  }
}

export const RegisterFinishComponent = {
  require: {
    register: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./register-finish.component.html'),
  controller: RegisterFinishController
};
