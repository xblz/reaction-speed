Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [
      {
        color: "#ffd200",
        icon: "reaction",
        path: "reaction",
        title: "反应时间",
        content: "测试你的视觉反应"
      },
      {
        color: "#F24646",
        icon: "number",
        path: "number",
        title: "数字记忆",
        content: "尽可能记住你所看到的数字"
      },
      {
        color: "#279EFC",
        icon: "vision",
        path: "vision",
        title: "视觉记忆",
        content: "记住不断增加的方格位置"
      }
    ]
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onClickCard(e) {
    const { path } = e.currentTarget.dataset
    if (path === 'vision') {
      return wx.showToast({ title: '敬请期待', mask: true, icon: 'none' })
    }
    wx.navigateTo({ url: `/pages/${path}/${path}` })
  }
})