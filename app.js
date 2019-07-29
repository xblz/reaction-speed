//app.js
App({
  onLaunch: function () {
    const _self = this
    wx.getSystemInfo({
      success: function (res) {
        _self.globalData.platform = res.platform
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        _self.globalData.statusBarHeight = res.statusBarHeight
        _self.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        _self.globalData.statusBarHeight = 0
        _self.globalData.titleBarHeight = 0
      }
    })
  },
  globalData: {
    platform: null,
    statusBarHeight: 0,
    titleBarHeight: 0
  }
})