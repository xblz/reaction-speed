Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    level: 1,
    number: 2,
    progress: 0,
    result: null,
    resultState: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '数字记忆测试',
      path: `/pages/home/home`
    }
  },
  countdown() {
    var _self = this;
    _self.rangRun = 0;
    clearInterval(_self.cuntDownCir);
    _self.cuntDownCir = setInterval(function () {
      var precent = _self.rangRun / 2000;
      _self.setData({
        progress: precent * 100
      });
      _self.rangRun = _self.rangRun + 100;
      if (precent >= 1) {
        clearInterval(_self.cuntDownCir);
        _self.setData({
          step: 2,
          progress: 0
        });
      }
    }, 100);
  },
  getNumber() {
    let num = '';
    const { level } = this.data;
    for (let i = 0; i < level; i++) {
      num += Math.ceil(Math.random() * 1000000000 % 9)
    }
    console.log(num)
    return num
  },
  getInput(e) {
    this.setData({ result: e.detail.value })
  },
  onClickStart() {
    this.setData({
      step: 1,
      progress: 0,
      number: this.getNumber(),
      result: '',
      resultState: false
    })
    this.countdown()
  },
  onClickSubmit() {
    if (this.data.result === this.data.number) {
      this.setData({
        resultState: true,
        step: 3
      })
    } else {
      this.setData({
        resultState: false,
        step: 3
      })
    }
  },
  onClickGo() {
    if (this.data.resultState) {
      this.setData({
        level: this.data.level + 1,
        result: '',
        step: 1
      })
      this.setData({
        number: this.getNumber()
      })
      this.countdown()
    } else {
      this.onClickStart()
    }

  }
})