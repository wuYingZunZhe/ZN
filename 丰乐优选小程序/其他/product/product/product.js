// pages/z_ce/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: ['/static/temp/c1.png', '/static/temp/c2.png', '/static/temp/c3.png'],
    //设置当前完成步数
    Steps: 0,

    // 当步骤为五步时步骤名不可超过五个汉字
    StepsList: ["第一步", "第二步", "第三步", "第四步", "第五步"],
    //步骤为五步时
    progress: 80,
    percent: 25,
    //   progress: 75,
    //   percent: 33,
    // //步骤为三步时
    //   progress: 67,
    //   percent: 50,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})