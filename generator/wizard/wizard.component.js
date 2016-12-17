import './<%= name %>.component.scss';

class <%= upCaseName %>Controller {
  constructor($state) {
    "ngInject";
    this.$state = $state;

    this.data = {
    };

    this.selectedStep = 0;
    this.stepProgress = 1;
    this.maxStep = 2;
    this.showBusyText = false;
    this.stepData = [
      { step: 1, completed: false, error: undefined, optional: false, data: {} },
      { step: 2, completed: false, error: undefined, optional: false, data: {} }
    ];
  }

  setWorking(value) {
    this.showBusyText = value;
  }

  cancel() {
    this.$state.go('app.home');
  }

  nextStep() {
    //do not exceed into max step
    if (this.selectedStep >= this.maxStep) {
      return;
    }
    //do not increment this.stepProgress when submitting from previously completed step
    if (this.selectedStep === this.stepProgress - 1) {
      this.stepProgress = this.stepProgress + 1;
    }
    this.selectedStep = this.selectedStep + 1;
  }

  previousStep() {
    if (this.selectedStep > 0) {
      this.selectedStep = this.selectedStep - 1;
    }
  }
}

export const <%= upCaseName %>Component = {
  template: require('./<%= name %>.component.html'),
  controller: <%= upCaseName %>Controller
};
