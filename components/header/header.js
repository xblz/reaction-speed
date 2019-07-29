const app = getApp()
Component({
  properties: {
    innerTitle: {
      type: String
    },
    isShowBack: {
      type: String,
      value: "true"
    },
    bgColor: {
      type: String,
      value: "transparent"
    }
  },
  data: {
    someData: {
      statusBarHeight: app.globalData.statusBarHeight,
      titleBarHeight: app.globalData.titleBarHeight
    }
  },
  methods: {
    onClickBack() {
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})