import './home.component.scss';

class HomeController {
  constructor(AuthService) {
    "ngInject";
    this.auth = AuthService;
  }
}

export const HomeComponent = {
  template: require('./home.component.html'),
  controller: HomeController
};
