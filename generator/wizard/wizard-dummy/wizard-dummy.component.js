class <%= upCaseName %>DummyController {
  constructor() {
  }
}

export const <%= upCaseName %>DummyComponent = {
  require: {
    <%= name %>: '^'
  },
  bindings: {
    data: '=',
    step: '='
  },
  template: require('./<%= name %>-dummy.component.html'),
  controller: <%= upCaseName %>DummyController
};
