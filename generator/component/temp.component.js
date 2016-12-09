import './<%= name %>.component.scss';

class <%= upCaseName %>Controller {
  constructor() {
  }
}

export const <%= upCaseName %>Component = {
  template: require('./<%= name %>.component.html'),
  controller: <%= upCaseName %>Controller
};
