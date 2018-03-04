var Zan = require('../../ui/zanui/dist/index');

Page(Object.assign({}, Zan.Stepper, {
  data: {
    stepper1: {
      stepper: 10,
      min: 1,
      max: 20
    },
    showBottomPopup: false
  },

  handleZanStepperChange(e) {
    var componentId = e.componentId;
    var stepper = e.stepper;

    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  },
  toggleBottomPopup() {
    console.info("a");
    this.setData({
      showBottomPopup: !this.data.showBottomPopup
    });
  },
}));