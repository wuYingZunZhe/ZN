// pages/deduct/deduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 3,//记录当前点击的类目
    navTextArr: ["今日","本周","本月","累计"],
    pickerArray: ['2018年', '2019年', '2020年'],
    pickerIndex: 2,//
  },
  //导航栏点击切换
  navChange:function(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
  },
  //时间选择器
  pickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value
    })
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