class RecoverFinishController {
  constructor() {
  }
}

export const RecoverFinishComponent = {
  require: {
    recover: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./recover-finish.component.html'),
  controller: RecoverFinishController
};
