Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    step: 0,  // 步骤
    level: 1, // 等级
    count: 9,  // 方块数量
    live: 3,  // 错误次数
    arr: [],  // 问题
    result: []// 结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { level} = this.data;
    this.setData({ width: (wx.getSystemInfoSync().windowWidth - 60) / (level + 2) -  8 })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onClickStart() {
    this.setData({ step: 1 })
  }
})
// 等级 方格 块数
// 1 3 3
// 2 3 4
// 3 4 5
// 4 4 6
// 5 4 7
// 6 5 8
// 7 6 9
// 8 7 10